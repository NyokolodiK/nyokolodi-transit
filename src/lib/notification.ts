export const NOTIFICATION_ENDPOINT = "/api/booking";

export interface BookingNotification {
  type: "booking";
  reference: string;
  service: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
  vehicle: string;
  distanceKm?: number;
  hours?: number;
  fare: string;
  flightNumber?: string;
  name: string;
  phone: string;
  email: string;
}

export interface QuoteNotification {
  type: "quote";
  quoteId: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  serviceType: string;
  estimatedVehicles: string;
  notes: string;
}

export interface ContactNotification {
  type: "contact";
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export type NotificationPayload =
  | BookingNotification
  | QuoteNotification
  | ContactNotification;

const FALLBACK_ERROR =
  "We couldn't send that automatically, but you can still reach us on WhatsApp.";

/**
 * Client-side helper that posts a notification to the API route.
 * Returns an error message string on failure, or null on success.
 */
export async function submitNotification(
  payload: NotificationPayload
): Promise<string | null> {
  try {
    const response = await fetch(NOTIFICATION_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      return data.error || FALLBACK_ERROR;
    }

    return null;
  } catch {
    return "We couldn't reach the server. Please try again or use WhatsApp.";
  }
}
