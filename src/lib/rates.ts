export const CURRENCY = "R";

export type VehicleId = "sedan" | "minibus";

export interface VehicleRate {
  id: VehicleId;
  label: string;
  shortLabel: string;
  seats: string;
  ratePerKm: number;
  minimumFare: number;
  charterPerHour: number;
  charterMinimumHours: number;
  /** Whether the vehicle is currently offered for booking. */
  available: boolean;
}

export const VEHICLES: Record<VehicleId, VehicleRate> = {
  sedan: {
    id: "sedan",
    label: "Suzuki Dzire (Sedan)",
    shortLabel: "Suzuki Dzire (1-4 pass)",
    seats: "1-4",
    ratePerKm: 11,
    minimumFare: 350,
    charterPerHour: 400,
    charterMinimumHours: 2,
    available: true,
  },
  minibus: {
    id: "minibus",
    label: "Group Shuttle (Minibus)",
    shortLabel: "Group Shuttle (5-14 pass)",
    seats: "5-14",
    ratePerKm: 16,
    minimumFare: 550,
    charterPerHour: 500,
    charterMinimumHours: 2,
    available: false,
  },
};

export const DEFAULT_VEHICLE: VehicleId = "sedan";

/** Vehicles currently offered for booking, in display order. */
export const AVAILABLE_VEHICLES = Object.values(VEHICLES).filter(
  (vehicle) => vehicle.available
);

export function isVehicleAvailable(id: VehicleId): boolean {
  return Boolean(VEHICLES[id]?.available);
}

export const SURCHARGES = {
  afterHoursPercent: 15,
  afterHoursStartHour: 22,
  afterHoursEndHour: 6,
};

export interface TransferFare {
  distanceKm: number;
  ratePerKm: number;
  distanceCharge: number;
  minimumApplied: boolean;
  baseFare: number;
  afterHours: boolean;
  afterHoursCharge: number;
  total: number;
}

export interface CharterFare {
  hours: number;
  billableHours: number;
  hourlyRate: number;
  minimumApplied: boolean;
  total: number;
}

export function isAfterHours(time: string): boolean {
  if (!time) return false;
  const [hourPart] = time.split(":");
  const hour = Number(hourPart);
  if (Number.isNaN(hour)) return false;
  return hour >= SURCHARGES.afterHoursStartHour || hour < SURCHARGES.afterHoursEndHour;
}

export function calculateTransferFare(params: {
  distanceKm: number;
  vehicle: VehicleId;
  pickupTime?: string;
}): TransferFare {
  const vehicle = VEHICLES[params.vehicle] ?? VEHICLES[DEFAULT_VEHICLE];
  const distanceKm = Math.max(0, Number(params.distanceKm) || 0);
  const distanceCharge = Math.round(distanceKm * vehicle.ratePerKm);
  const minimumApplied = distanceCharge < vehicle.minimumFare;
  const baseFare = Math.max(vehicle.minimumFare, distanceCharge);
  const afterHours = isAfterHours(params.pickupTime ?? "");
  const afterHoursCharge = afterHours
    ? Math.round(baseFare * (SURCHARGES.afterHoursPercent / 100))
    : 0;

  return {
    distanceKm,
    ratePerKm: vehicle.ratePerKm,
    distanceCharge,
    minimumApplied,
    baseFare,
    afterHours,
    afterHoursCharge,
    total: baseFare + afterHoursCharge,
  };
}

export function calculateCharterFare(params: {
  hours: number;
  vehicle: VehicleId;
}): CharterFare {
  const vehicle = VEHICLES[params.vehicle] ?? VEHICLES[DEFAULT_VEHICLE];
  const hours = Math.max(0, Number(params.hours) || 0);
  const billableHours = Math.max(vehicle.charterMinimumHours, Math.ceil(hours));
  return {
    hours,
    billableHours,
    hourlyRate: vehicle.charterPerHour,
    minimumApplied: hours < vehicle.charterMinimumHours,
    total: billableHours * vehicle.charterPerHour,
  };
}

export function formatZAR(amount: number): string {
  return `${CURRENCY} ${Math.round(amount).toLocaleString("en-ZA")}`;
}
