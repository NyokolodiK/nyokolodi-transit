import { SITE, buildWhatsAppLink } from "./site";

export interface BookingMessageInput {
  reference: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  distanceKm?: number;
  hours?: number;
  vehicle: string;
  passengers: number | string;
  luggage: number | string;
  flightNumber?: string;
  fare: string;
}

export function bookingWhatsAppLink(input: BookingMessageInput): string {
  const lines = [
    `Hello ${SITE.name}, I would like to confirm my booking:`,
    `- Reference: ${input.reference}`,
    `- Name: ${input.name}`,
    `- Phone: ${input.phone}`,
    input.email ? `- Email: ${input.email}` : "",
    `- Service: ${input.service}`,
    `- Route: ${input.pickup} to ${input.dropoff}`,
    `- Date & Time: ${input.date || "As soon as possible"} at ${input.time}`,
    typeof input.hours === "number"
      ? `- Duration: ${input.hours} hour(s) (${input.vehicle})`
      : `- Distance: ${input.distanceKm ?? 0} km (${input.vehicle})`,
    `- Passengers: ${input.passengers} | Luggage: ${input.luggage}`,
    input.flightNumber ? `- Flight: ${input.flightNumber}` : "",
    `- Estimated Fare: ${input.fare}`,
  ].filter(Boolean);

  return buildWhatsAppLink(lines.join("\n"));
}

export interface QuoteMessageInput {
  quoteId: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  serviceType: string;
  estimatedVehicles: string;
  notes?: string;
}

export function quoteWhatsAppLink(input: QuoteMessageInput): string {
  const lines = [
    `Hello ${SITE.name}, I'd like a corporate quote:`,
    `- Quote ID: ${input.quoteId}`,
    `- Company: ${input.companyName}`,
    `- Contact: ${input.contactName}`,
    `- Phone: ${input.phone}`,
    `- Email: ${input.email}`,
    `- Service: ${input.serviceType}`,
    `- Fleet Size: ${input.estimatedVehicles}`,
    input.notes ? `- Notes: ${input.notes}` : "",
  ].filter(Boolean);

  return buildWhatsAppLink(lines.join("\n"));
}

export interface ContactMessageInput {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export function contactWhatsAppLink(input: ContactMessageInput): string {
  const lines = [
    `Hello ${SITE.name},`,
    `- Name: ${input.name}`,
    `- Phone: ${input.phone}`,
    `- Email: ${input.email}`,
    `- Topic: ${input.subject}`,
    `- Message: ${input.message}`,
  ];

  return buildWhatsAppLink(lines.join("\n"));
}
