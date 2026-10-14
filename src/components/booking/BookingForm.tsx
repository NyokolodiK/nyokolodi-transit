"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, Calendar, Clock, Mail, MapPin, Route } from "lucide-react";
import { VEHICLES, VehicleId } from "@/lib/rates";
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
    formState: { errors },
  } = useForm<BookingFormValues>({
    defaultValues: createDefaultValues(initialService, initialPickup, initialDropoff),
  });

  const { submit, isSubmitting, error } = useNotificationSubmit();
  const values = watch();
  const passengers = watch("passengers");

  const fare = resolveFare({
    service: values.service,
    vehicle: values.vehicle,
    distanceKm: values.distanceKm,
    charterHours: values.charterHours,
    pickupTime: values.pickupTime,
  });

  // Keep the vehicle aligned with passenger capacity.
  useEffect(() => {
    setValue("vehicle", Number(passengers) > 4 ? "minibus" : "sedan");
  }, [passengers, setValue]);

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
          <Input
            type="text"
            placeholder="e.g. Centurion or OR Tambo (JNB)"
            icon={<MapPin className="w-4 h-4" />}
            {...register("pickup", { required: "Pickup location is required" })}
          />
        </Field>

        <Field label="Drop-off Location" error={errors.dropoff?.message}>
          <Input
            type="text"
            placeholder="e.g. Sandton, Pretoria or Lanseria (HLA)"
            icon={<MapPin className="w-4 h-4" />}
            {...register("dropoff", { required: "Drop-off location is required" })}
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
          hint={`Fare is R${fare.vehicleRate.ratePerKm}/km (minimum R${fare.vehicleRate.minimumFare}). Enter your best estimate.`}
        >
          <Input
            type="number"
            min={1}
            step={1}
            placeholder="e.g. 45"
            icon={<Route className="w-4 h-4" />}
            {...register("distanceKm", {
              required: "Estimated distance is required",
              min: { value: 1, message: "Enter at least 1 km" },
            })}
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
            {[1, 2, 3, 4, 6, 8, 12, 14].map((n) => (
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
            {Object.values(VEHICLES).map((v) => (
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
