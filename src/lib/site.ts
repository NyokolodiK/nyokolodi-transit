export const SITE = {
  name: "Nyokolodi Transit",
  tagline: "People · Places · Possibilities",
  phoneDisplay: "+27 (0)12 661 0000",
  phoneE164: "+27126610000",
  whatsappNumber: "27126610000",
  whatsappDisplay: "+27 (0)12 661 0000",
  email: "info@nyokoloditransit.co.za",
  address: "Lenchen Ave, Rooihuiskraal North, Centurion, 0157, Gauteng",
  bookingsEmail: "bookings@nyokoloditransit.co.za",
  notificationsEmail: "info@nyokoloditransit.co.za",
} as const;

export function buildWhatsAppLink(message: string, phone: string = SITE.whatsappNumber): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
