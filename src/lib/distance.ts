/**
 * Driving-distance lookup via the Google Routes API.
 *
 * Server-side only: the API key must never be exposed to the browser, so this
 * is called from the `/api/distance` route handler. Requests use only basic
 * features (TRAFFIC_UNAWARE) so they bill against the cheap "Compute Routes
 * Essentials" SKU, which includes 10,000 free calls per month.
 */

const ROUTES_ENDPOINT =
  "https://routes.googleapis.com/directions/v2:computeRoutes";
const FIELD_MASK = "routes.distanceMeters";
const REQUEST_TIMEOUT_MS = 8000;

interface ComputeRoutesResponse {
  routes?: Array<{ distanceMeters?: number }>;
  error?: { message?: string };
}

export interface DistanceResult {
  ok: boolean;
  distanceKm?: number;
  error?: string;
  /** false when no API key is configured (caller should fall back silently). */
  configured: boolean;
}

export interface RouteEndpoint {
  address: string;
  placeId?: string;
}

export function isDistanceServiceConfigured(): boolean {
  return Boolean(process.env.GOOGLE_MAPS_API_KEY);
}

/** A Routes API waypoint is either a place ID or a free-text address. */
function toWaypoint(endpoint: RouteEndpoint) {
  if (endpoint.placeId) {
    const placeId = endpoint.placeId.replace(/^places\//, "");
    return { placeId };
  }
  return { address: endpoint.address };
}

export async function computeDrivingDistanceKm(
  origin: RouteEndpoint,
  destination: RouteEndpoint
): Promise<DistanceResult> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      configured: false,
      error: "Distance service is not configured.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(ROUTES_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      body: JSON.stringify({
        origin: toWaypoint(origin),
        destination: toWaypoint(destination),
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_UNAWARE",
        regionCode: "ZA",
        units: "METRIC",
      }),
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => ({}))) as ComputeRoutesResponse;

    if (!response.ok) {
      return {
        ok: false,
        configured: true,
        error:
          data?.error?.message || `Distance lookup failed (${response.status}).`,
      };
    }

    const meters = data.routes?.[0]?.distanceMeters;
    if (typeof meters !== "number" || meters <= 0) {
      return {
        ok: false,
        configured: true,
        error: "No driving route found between those locations.",
      };
    }

    return { ok: true, configured: true, distanceKm: Math.round(meters / 1000) };
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    return {
      ok: false,
      configured: true,
      error: aborted
        ? "Distance lookup timed out."
        : "Could not reach the distance service.",
    };
  } finally {
    clearTimeout(timeout);
  }
}
