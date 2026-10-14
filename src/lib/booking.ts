import {
  VEHICLES,
  VehicleId,
  calculateCharterFare,
  calculateTransferFare,
  formatZAR,
} from "./rates";

export const SERVICE_CATEGORIES = [
  { id: "airport", label: "Airport Transfer" },
  { id: "corporate", label: "Corporate" },
  { id: "intercity", label: "Intercity" },
  { id: "hourly", label: "Day Charter" },
] as const;

export type ServiceId = (typeof SERVICE_CATEGORIES)[number]["id"];

export const SERVICE_LABELS: Record<string, string> = {
  airport: "Airport Transfer",
  corporate: "Corporate Shuttle",
  intercity: "Intercity Transfer",
  hourly: "Day Charter",
};

export function normalizeService(service: string): ServiceId {
  const aliases: Record<string, ServiceId> = { events: "hourly" };
  const normalized = (aliases[service] ?? service) as ServiceId;
  return SERVICE_CATEGORIES.some((category) => category.id === normalized)
    ? normalized
    : "airport";
}

export interface FareValues {
  service: string;
  vehicle: VehicleId;
  distanceKm: string;
  charterHours: string;
  pickupTime: string;
}

export interface FareResult {
  isCharter: boolean;
  vehicleRate: (typeof VEHICLES)[VehicleId];
  distanceKm: number;
  billableHours: number;
  total: number;
  display: string;
  explanation: string;
}

/**
 * Pure fare resolver shared by the booking form and its live preview.
 * Transfer: max(minimum, km x rate) (+ after-hours surcharge).
 * Charter: billable hours x hourly rate.
 */
export function resolveFare(values: FareValues): FareResult {
  const vehicle = (values.vehicle ?? "sedan") as VehicleId;
  const vehicleRate = VEHICLES[vehicle];
  const isCharter = values.service === "hourly";
  const distanceKm = Number(values.distanceKm) || 0;
  const hours = Number(values.charterHours) || 0;

  const transferFare = calculateTransferFare({
    distanceKm,
    vehicle,
    pickupTime: values.pickupTime,
  });
  const charterFare = calculateCharterFare({ hours, vehicle });
  const total = isCharter ? charterFare.total : transferFare.total;

  let explanation: string;
  if (isCharter) {
    explanation = `${charterFare.billableHours} hr${
      charterFare.billableHours === 1 ? "" : "s"
    } × ${formatZAR(charterFare.hourlyRate)}/hr`;
  } else {
    const parts = [`${distanceKm} km × ${formatZAR(vehicleRate.ratePerKm)}/km`];
    if (transferFare.minimumApplied) {
      parts.push(`minimum ${formatZAR(vehicleRate.minimumFare)} applied`);
    }
    if (transferFare.afterHours) {
      parts.push("+15% after-hours");
    }
    explanation = parts.join(" · ");
  }

  return {
    isCharter,
    vehicleRate,
    distanceKm,
    billableHours: charterFare.billableHours,
    total,
    display: formatZAR(total),
    explanation,
  };
}

export interface BookingSummary {
  reference: string;
  name: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  vehicleLabel: string;
  fareDisplay: string;
  whatsAppLink: string;
  warning?: string;
}
