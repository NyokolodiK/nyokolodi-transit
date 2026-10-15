import { NextResponse } from "next/server";
import {
  computeDrivingDistanceKm,
  isDistanceServiceConfigured,
} from "@/lib/distance";

interface DistancePayload {
  origin?: unknown;
  destination?: unknown;
  originPlaceId?: unknown;
  destinationPlaceId?: unknown;
}

export async function POST(request: Request) {
  if (!isDistanceServiceConfigured()) {
    return NextResponse.json(
      { error: "Distance service is not configured." },
      { status: 503 }
    );
  }

  let payload: DistancePayload;
  try {
    payload = (await request.json()) as DistancePayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const origin = typeof payload.origin === "string" ? payload.origin.trim() : "";
  const destination =
    typeof payload.destination === "string" ? payload.destination.trim() : "";
  const originPlaceId =
    typeof payload.originPlaceId === "string" ? payload.originPlaceId : undefined;
  const destinationPlaceId =
    typeof payload.destinationPlaceId === "string"
      ? payload.destinationPlaceId
      : undefined;

  if (!origin || !destination) {
    return NextResponse.json(
      { error: "Both origin and destination are required." },
      { status: 400 }
    );
  }

  const result = await computeDrivingDistanceKm(
    { address: origin, placeId: originPlaceId },
    { address: destination, placeId: destinationPlaceId }
  );

  if (!result.ok) {
    const status = result.configured ? 422 : 503;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ distanceKm: result.distanceKm });
}
