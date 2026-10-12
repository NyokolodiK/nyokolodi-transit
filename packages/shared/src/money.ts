export type MinorUnits = number;

export function assertIntegerMinorUnits(value: number): void {
  if (!Number.isInteger(value)) {
    throw new RangeError("Money must be expressed as integer minor units (cents).");
  }
}

export function assertNonNegativeMinorUnits(value: number): void {
  assertIntegerMinorUnits(value);
  if (value < 0) {
    throw new RangeError("Money amount cannot be negative.");
  }
}

export function addMinorUnits(...values: MinorUnits[]): MinorUnits {
  return values.reduce((total, value) => {
    assertIntegerMinorUnits(value);
    return total + value;
  }, 0);
}

export function applyPercent(amount: MinorUnits, percent: number): MinorUnits {
  assertIntegerMinorUnits(amount);
  return Math.round((amount * percent) / 100);
}

export function clampMinimum(amount: MinorUnits, minimum: MinorUnits): MinorUnits {
  assertIntegerMinorUnits(amount);
  assertIntegerMinorUnits(minimum);
  return Math.max(amount, minimum);
}

export function formatZar(amount: MinorUnits): string {
  assertIntegerMinorUnits(amount);
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
  }).format(amount / 100);
}
