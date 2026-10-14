import { NextResponse } from "next/server";
import { emailShell, renderRows, sendNotification } from "@/lib/email";

type NotificationType = "booking" | "quote" | "contact";

interface NotificationPayload {
  type?: NotificationType;
  [key: string]: unknown;
}

function asString(value: unknown): string {
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

export async function POST(request: Request) {
  let payload: NotificationPayload;
  try {
    payload = (await request.json()) as NotificationPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const type = payload?.type;

  if (type !== "booking" && type !== "quote" && type !== "contact") {
    return NextResponse.json({ error: "Unknown notification type." }, { status: 400 });
  }

  const { subject, title, intro, rows } = buildEmail(type, payload);
  const html = emailShell(title, intro, renderRows(rows));
  const replyTo = asString(payload.email) || undefined;

  const result = await sendNotification({ subject, html, replyTo });

  if (!result.ok) {
    const status = result.error?.includes("not configured") ? 503 : 502;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ ok: true });
}

function buildEmail(
  type: NotificationType,
  payload: NotificationPayload
): {
  subject: string;
  title: string;
  intro: string;
  rows: Array<{ label: string; value: unknown }>;
} {
  if (type === "booking") {
    const reference = asString(payload.reference) || "New request";
    const pickup = asString(payload.pickup);
    const dropoff = asString(payload.dropoff);
    return {
      subject: `New Booking ${reference}: ${pickup} → ${dropoff}`,
      title: `New Booking Request (${reference})`,
      intro: "A new booking was submitted through the website.",
      rows: [
        { label: "Reference", value: reference },
        { label: "Service", value: payload.service },
        { label: "Pickup", value: pickup },
        { label: "Drop-off", value: dropoff },
        { label: "Date", value: payload.date || "As soon as possible" },
        { label: "Time", value: payload.time },
        { label: "Passengers", value: payload.passengers },
        { label: "Luggage", value: payload.luggage },
        { label: "Vehicle", value: payload.vehicle },
        { label: "Distance (km)", value: payload.distanceKm },
        { label: "Estimated Fare", value: payload.fare },
        { label: "Flight Number", value: payload.flightNumber },
        { label: "Customer", value: payload.name },
        { label: "Phone", value: payload.phone },
        { label: "Email", value: payload.email },
      ],
    };
  }

  if (type === "quote") {
    const quoteId = asString(payload.quoteId) || "New request";
    const company = asString(payload.companyName) || "Company";
    return {
      subject: `Corporate Quote Request ${quoteId}: ${company}`,
      title: `Corporate Quote Request (${quoteId})`,
      intro: "A corporate quote request was submitted through the website.",
      rows: [
        { label: "Quote ID", value: quoteId },
        { label: "Company", value: payload.companyName },
        { label: "Contact", value: payload.contactName },
        { label: "Phone", value: payload.phone },
        { label: "Email", value: payload.email },
        { label: "Service", value: payload.serviceType },
        { label: "Fleet Size", value: payload.estimatedVehicles },
        { label: "Additional Details", value: payload.notes },
      ],
    };
  }

  const name = asString(payload.name) || "Website visitor";
  const topic = asString(payload.subject) || "General Inquiry";
  return {
    subject: `Website Message (${topic}) from ${name}`,
    title: `New Contact Message: ${topic}`,
    intro: "A new message was submitted through the website contact form.",
    rows: [
      { label: "Name", value: payload.name },
      { label: "Phone", value: payload.phone },
      { label: "Email", value: payload.email },
      { label: "Topic", value: payload.subject },
      { label: "Message", value: payload.message },
    ],
  };
}
