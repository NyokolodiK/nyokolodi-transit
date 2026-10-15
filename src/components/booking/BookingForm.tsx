"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ArrowRight, Calendar, Clock, Mail, Route } from "lucide-react";
import {
  AVAILABLE_VEHICLES,
  DEFAULT_VEHICLE,
  VehicleId,
  isVehicleAvailable,
} from "@/lib/rates";
import {
  BookingSummary,
  SERVICE_LABELS,
  normalizeService,
  resolveFare,
} from "@/lib/booking";
import { BookingNotification } from "@/lib/notification";
import { bookingWhatsAppLink } from "@/lib/messages";
import { useNotificationSubmit } from "@/hooks/useNotificationSubmit";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import AddressInput, { PlaceSelection } from "@/components/ui/AddressInput";
import ServiceCategorySelector from "./ServiceCategorySelector";
import FareSummary from "./FareSummary";

export interface BookingFormValues {
  service: string;
  pickup: string;
  dropoff: string;
  distanceKm: string;
  charterHours: string;
  pickupDate: string;
  pickupTime: string;
  passengers: string;
  luggage: string;
  vehicle: VehicleId;
  name: string;
  phone: string;
  email: string;
  flightNumber: string;
}

interface BookingFormProps {
  initialService: string;
  initialPickup: string;
  initialDropoff: string;
  onSuccess: (summary: BookingSummary) => void;
}

interface DistanceEndpoint {
  address: string;
  placeId?: string;
}

const MINIBUS_AVAILABLE = AVAILABLE_VEHICLES.some(
  (vehicle) => vehicle.id === "minibus"
);

const PASSENGER_OPTIONS = MINIBUS_AVAILABLE
  ? [1, 2, 3, 4, 6, 8, 12, 14]
  : [1, 2, 3, 4];

function createDefaultValues(
  service: string,
  pickup: string,
  dropoff: string
): BookingFormValues {
  return {
    service: normalizeService(service || "airport"),
    pickup: pickup || "",
    dropoff: dropoff || "",
    distanceKm: "",
    charterHours: "4",
    pickupDate: "",
    pickupTime: "09:00",
    passengers: "1",
    luggage: "1",
    vehicle: "sedan",
    name: "",
    phone: "",
    email: "",
    flightNumber: "",
  };
}

export default function BookingForm({
  initialService,
  initialPickup,
  initialDropoff,
  onSuccess,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<BookingFormValues>({
    defaultValues: createDefaultValues(initialService, initialPickup, initialDropoff),
  });

  const { submit, isSubmitting, error } = useNotificationSubmit();
  const values = watch();
  const passengers = watch("passengers");

  const [distanceStatus, setDistanceStatus] = useState<
    "idle" | "loading" | "auto" | "error"
  >("idle");
  const [distanceNote, setDistanceNote] = useState("");
  const lastLookupRef = useRef("");
  const pickupPlaceIdRef = useRef<string | undefined>(undefined);
  const dropoffPlaceIdRef = useRef<string | undefined>(undefined);

  const lookupDistance = useCallback(
    async (origin: DistanceEndpoint, destination: DistanceEndpoint) => {
      const from = origin.address.trim();
      const to = destination.address.trim();
      if (!from || !to) return;

      const key = `${origin.placeId ?? from}||${destination.placeId ?? to}`;
      if (key === lastLookupRef.current) return;
      lastLookupRef.current = key;

      setDistanceStatus("loading");
      setDistanceNote("");

      try {
        const response = await fetch("/api/distance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            origin: from,
            destination: to,
            originPlaceId: origin.placeId,
            destinationPlaceId: destination.placeId,
          }),
        });

        if (response.status === 503) {
          // Distance service not configured - keep manual entry, no error.
          lastLookupRef.current = "";
          setDistanceStatus("idle");
          return;
        }

        const data = (await response.json().catch(() => ({}))) as {
          distanceKm?: number;
          error?: string;
        };

        if (!response.ok || typeof data.distanceKm !== "number") {
          lastLookupRef.current = "";
          setDistanceStatus("error");
          setDistanceNote(
            data.error || "Couldn't calculate the distance automatically."
          );
          return;
        }

        setValue("distanceKm", String(data.distanceKm), {
          shouldValidate: true,
          shouldDirty: true,
        });
        setDistanceStatus("auto");
        setDistanceNote(
          `Auto-calculated ${data.distanceKm} km - adjust if needed.`
        );
      } catch {
        lastLookupRef.current = "";
        setDistanceStatus("error");
        setDistanceNote(
          "Couldn't reach the distance service. Enter the distance manually."
        );
      }
    },
    [setValue]
  );

  const distanceField = register("distanceKm", {
    required: "Estimated distance is required",
    min: { value: 1, message: "Enter at least 1 km" },
  });

  const fare = resolveFare({
    service: values.service,
    vehicle: values.vehicle,
    distanceKm: values.distanceKm,
    charterHours: values.charterHours,
    pickupTime: values.pickupTime,
  });

  // Keep the vehicle aligned with passenger capacity, ignoring vehicles
  // that are not currently offered.
  useEffect(() => {
    const vehicle: VehicleId = Number(passengers) > 4 ? "minibus" : "sedan";
    setValue("vehicle", isVehicleAvailable(vehicle) ? vehicle : DEFAULT_VEHICLE);
  }, [passengers, setValue]);

  const triggerDistanceLookup = useCallback(() => {
    void lookupDistance(
      { address: getValues("pickup"), placeId: pickupPlaceIdRef.current },
      { address: getValues("dropoff"), placeId: dropoffPlaceIdRef.current }
    );
  }, [lookupDistance, getValues]);

  const onSubmit = async (data: BookingFormValues) => {
    const reference = `NYO-${Math.floor(100000 + Math.random() * 900000)}`;
    const serviceLabel = SERVICE_LABELS[data.service] ?? data.service;
    const flightNumber =
      data.service === "airport" ? data.flightNumber : undefined;
    const distanceKm = fare.isCharter ? undefined : fare.distanceKm;
    const hours = fare.isCharter ? fare.billableHours : undefined;

    const payload: BookingNotification = {
      type: "booking",
      reference,
      service: serviceLabel,
      pickup: data.pickup,
      dropoff: data.dropoff,
      date: data.pickupDate,
      time: data.pickupTime,
      passengers: Number(data.passengers),
      luggage: Number(data.luggage),
      vehicle: fare.vehicleRate.label,
      distanceKm,
      hours,
      fare: fare.display,
      flightNumber,
      name: data.name,
      phone: data.phone,
      email: data.email,
    };

    const result = await submit(payload);

    onSuccess({
      reference,
      name: data.name,
      pickup: data.pickup,
      dropoff: data.dropoff,
      date: data.pickupDate,
      time: data.pickupTime,
      vehicleLabel: fare.vehicleRate.label,
      fareDisplay: fare.display,
      warning: result.ok ? undefined : result.error,
      whatsAppLink: bookingWhatsAppLink({
        reference,
        name: data.name,
        phone: data.phone,
        email: data.email,
        service: serviceLabel,
        pickup: data.pickup,
        dropoff: data.dropoff,
        date: data.pickupDate,
        time: data.pickupTime,
        distanceKm,
        hours,
        vehicle: fare.vehicleRate.label,
        passengers: data.passengers,
        luggage: data.luggage,
        flightNumber,
        fare: fare.display,
      }),
    });
  };

  const distanceHint =
    distanceStatus === "loading"
      ? "Calculating distance..."
      : distanceStatus === "auto" || distanceStatus === "error"
        ? distanceNote
        : `Fare is R${fare.vehicleRate.ratePerKm}/km (minimum R${fare.vehicleRate.minimumFare}). We'll estimate the distance from your addresses.`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <ServiceCategorySelector
        value={values.service}
        onChange={(id) =>
          setValue("service", id, { shouldValidate: true, shouldDirty: true })
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Pickup Location" error={errors.pickup?.message}>
          <Controller
            name="pickup"
            control={control}
            rules={{ required: "Pickup location is required" }}
            render={({ field }) => (
              <AddressInput
                name={field.name}
                value={field.value}
                invalid={Boolean(errors.pickup)}
                placeholder="e.g. Centurion or OR Tambo (JNB)"
                onChange={(value) => {
                  field.onChange(value);
                  pickupPlaceIdRef.current = undefined;
                }}
                onBlur={triggerDistanceLookup}
                onPlaceSelect={(selection: PlaceSelection) => {
                  pickupPlaceIdRef.current = selection.placeId;
                  void lookupDistance(
                    {
                      address: selection.description,
                      placeId: selection.placeId,
                    },
                    {
                      address: getValues("dropoff"),
                      placeId: dropoffPlaceIdRef.current,
                    }
                  );
                }}
              />
            )}
          />
        </Field>

        <Field label="Drop-off Location" error={errors.dropoff?.message}>
          <Controller
            name="dropoff"
            control={control}
            rules={{ required: "Drop-off location is required" }}
            render={({ field }) => (
              <AddressInput
                name={field.name}
                value={field.value}
                invalid={Boolean(errors.dropoff)}
                placeholder="e.g. Sandton, Pretoria or Lanseria (HLA)"
                onChange={(value) => {
                  field.onChange(value);
                  dropoffPlaceIdRef.current = undefined;
                }}
                onBlur={triggerDistanceLookup}
                onPlaceSelect={(selection: PlaceSelection) => {
                  dropoffPlaceIdRef.current = selection.placeId;
                  void lookupDistance(
                    {
                      address: getValues("pickup"),
                      placeId: pickupPlaceIdRef.current,
                    },
                    {
                      address: selection.description,
                      placeId: selection.placeId,
                    }
                  );
                }}
              />
            )}
          />
        </Field>
      </div>

      {fare.isCharter ? (
        <Field
          label="Charter Duration (hours)"
          error={errors.charterHours?.message}
          hint={`${fare.vehicleRate.charterPerHour} ZAR/hour · ${fare.vehicleRate.charterMinimumHours}-hour minimum.`}
        >
          <Input
            type="number"
            min={1}
            step={1}
            icon={<Clock className="w-4 h-4" />}
            {...register("charterHours", {
              required: "Charter duration is required",
              min: { value: 1, message: "Enter at least 1 hour" },
            })}
          />
        </Field>
      ) : (
        <Field
          label="Estimated Distance (km)"
          error={errors.distanceKm?.message}
          hint={distanceHint}
        >
          <Input
            type="number"
            min={1}
            step={1}
            placeholder="e.g. 45"
            icon={<Route className="w-4 h-4" />}
            {...distanceField}
            onChange={(event) => {
              distanceField.onChange(event);
              if (distanceStatus === "auto" || distanceStatus === "error") {
                setDistanceStatus("idle");
                setDistanceNote("");
              }
            }}
          />
        </Field>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Pickup Date" error={errors.pickupDate?.message}>
          <Input
            type="date"
            icon={<Calendar className="w-4 h-4" />}
            {...register("pickupDate", { required: "Pickup date is required" })}
          />
        </Field>

        <Field label="Pickup Time" error={errors.pickupTime?.message}>
          <Input
            type="time"
            icon={<Clock className="w-4 h-4" />}
            {...register("pickupTime", { required: "Pickup time is required" })}
          />
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Field label="Passengers">
          <Select {...register("passengers")}>
            {PASSENGER_OPTIONS.map((n) => (
              <option key={n} value={String(n)}>
                {n} {n === 1 ? "person" : "people"}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Luggage Bags">
          <Select {...register("luggage")}>
            {[0, 1, 2, 3, 4, 6, 8].map((n) => (
              <option key={n} value={String(n)}>
                {n} {n === 1 ? "bag" : "bags"}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Vehicle Type">
          <Select {...register("vehicle")}>
            {AVAILABLE_VEHICLES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.shortLabel}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="pt-3 border-t border-gray-100 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Full Name" error={errors.name?.message}>
            <Input
              type="text"
              placeholder="e.g. Sipho Ndlovu"
              {...register("name", { required: "Your name is required" })}
            />
          </Field>

          <Field label="WhatsApp / Phone (+27)" error={errors.phone?.message}>
            <Input
              type="tel"
              placeholder="e.g. 082 123 4567"
              {...register("phone", {
                required: "Phone number is required",
                minLength: { value: 9, message: "Enter a valid phone number" },
              })}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Email" error={errors.email?.message}>
            <Input
              type="email"
              placeholder="you@example.co.za"
              icon={<Mail className="w-4 h-4" />}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
          </Field>

          {values.service === "airport" && (
            <Field label="Flight Number (optional)">
              <Input
                type="text"
                placeholder="e.g. FA 102 or SA 324"
                {...register("flightNumber")}
              />
            </Field>
          )}
        </div>
      </div>

      <FareSummary display={fare.display} explanation={fare.explanation} />

      {error && <Alert>{error}</Alert>}

      <Button type="submit" variant="primary" isLoading={isSubmitting} className="w-full">
        <span>Confirm &amp; Generate Booking</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
    </form>
  );
}
