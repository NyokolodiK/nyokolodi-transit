export function formatTripDate(date?: string): string {
  const value = (date || "").trim();
  if (!value) return "As soon as possible";
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTripTime(time?: string): string {
  const value = (time || "").trim();
  return value || "To be confirmed";
}

/**
 * Normalise a South African phone number into the digits-only form that
 * wa.me expects (e.g. "082 123 4567" -> "27821234567").
 */
export function toWhatsAppNumber(phone?: string): string {
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.startsWith("0")) return `27${digits.slice(1)}`;
  return digits;
}

export function pluralise(count: number, singular: string, plural?: string): string {
  return `${count} ${count === 1 ? singular : plural ?? `${singular}s`}`;
}
