import { NextResponse } from "next/server";
import { sendCustomerConfirmation, sendNotification } from "@/lib/email";
import type { NotificationPayload } from "@/lib/notification";

type RawPayload = Record<string, unknown>;

function asString(value: unknown): string {
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

function asNumber(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function asOptionalNumber(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function buildPayload(type: string, raw: RawPayload): NotificationPayload {
  if (type === "booking") {
    return {
      type: "booking",
      reference: asString(raw.reference),
      service: asString(raw.service),
      pickup: asString(raw.pickup),
      dropoff: asString(raw.dropoff),
      date: asString(raw.date),
      time: asString(raw.time),
      passengers: asNumber(raw.passengers),
      luggage: asNumber(raw.luggage),
      vehicle: asString(raw.vehicle),
      distanceKm: asOptionalNumber(raw.distanceKm),
      hours: asOptionalNumber(raw.hours),
      fare: asString(raw.fare),
      flightNumber: asString(raw.flightNumber) || undefined,
      name: asString(raw.name),
      phone: asString(raw.phone),
      email: asString(raw.email),
    };
  }

  if (type === "quote") {
    return {
      type: "quote",
      quoteId: asString(raw.quoteId),
      companyName: asString(raw.companyName),
      contactName: asString(raw.contactName),
      phone: asString(raw.phone),
      email: asString(raw.email),
      serviceType: asString(raw.serviceType),
      estimatedVehicles: asString(raw.estimatedVehicles),
      notes: asString(raw.notes),
    };
  }

  return {
    type: "contact",
    name: asString(raw.name),
    phone: asString(raw.phone),
    email: asString(raw.email),
    subject: asString(raw.subject) || "General Inquiry",
    message: asString(raw.message),
  };
}

export async function POST(request: Request) {
  let raw: RawPayload;
  try {
    raw = (await request.json()) as RawPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const type = asString(raw?.type);

  if (type !== "booking" && type !== "quote" && type !== "contact") {
    return NextResponse.json({ error: "Unknown notification type." }, { status: 400 });
  }

  const payload = buildPayload(type, raw);

  const result = await sendNotification(payload);

  if (!result.ok) {
    const status = result.error?.includes("not configured") ? 503 : 502;
    return NextResponse.json({ error: result.error }, { status });
  }

  const confirmation = await sendCustomerConfirmation(payload);

  return NextResponse.json({
    ok: true,
    confirmationSent: confirmation.ok,
    ...(confirmation.ok ? {} : { confirmationError: confirmation.error }),
  });
}
