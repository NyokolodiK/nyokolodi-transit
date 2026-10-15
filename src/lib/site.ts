export const SITE = {
  name: "Nyokolodi Transit",
  tagline: "People · Places · Possibilities",
  phoneDisplay: "+27 (0)64 555 4869",
  phoneE164: "+27645554869",
  whatsappNumber: "27645554869",
  whatsappDisplay: "+27 (0)64 555 4869",
  email: "info@nyokolodi-transit.co.za",
  address: "Lenchen Ave, Rooihuiskraal North, Centurion, 0157, Gauteng",
  bookingsEmail: "bookings@nyokolodi-transit.co.za",
  notificationsEmail: "info@nyokolodi-transit.co.za",
} as const;

export function buildWhatsAppLink(message: string, phone: string = SITE.whatsappNumber): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
