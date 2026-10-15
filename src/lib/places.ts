/**
 * Address autocomplete via the Google Places API (New) - Autocomplete.
 *
 * Server-side only so the API key stays off the client. Each request bills
 * against the "Autocomplete Requests" SKU (Essentials), which includes 10,000
 * free calls per month. Results are biased to South Africa.
 */

const AUTOCOMPLETE_ENDPOINT =
  "https://places.googleapis.com/v1/places:autocomplete";
const FIELD_MASK = [
  "suggestions.placePrediction.placeId",
  "suggestions.placePrediction.text",
  "suggestions.placePrediction.structuredFormat",
].join(",");
const REQUEST_TIMEOUT_MS = 8000;

interface AutocompletePrediction {
  placeId?: string;
  text?: { text?: string };
  structuredFormat?: {
    mainText?: { text?: string };
    secondaryText?: { text?: string };
  };
}

interface AutocompleteResponse {
  suggestions?: Array<{ placePrediction?: AutocompletePrediction }>;
  error?: { message?: string };
}

export interface PlaceSuggestion {
  placeId: string;
  primary: string;
  secondary: string;
  description: string;
}

export interface AutocompleteResult {
  ok: boolean;
  suggestions?: PlaceSuggestion[];
  error?: string;
  configured: boolean;
}

export function isPlacesServiceConfigured(): boolean {
  return Boolean(process.env.GOOGLE_MAPS_API_KEY);
}

export async function autocompletePlaces(
  input: string,
  sessionToken?: string
): Promise<AutocompleteResult> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      configured: false,
      error: "Address autocomplete is not configured.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(AUTOCOMPLETE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      body: JSON.stringify({
        input,
        includedRegionCodes: ["za"],
        languageCode: "en",
        regionCode: "ZA",
        ...(sessionToken ? { sessionToken } : {}),
      }),
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => ({}))) as AutocompleteResponse;

    if (!response.ok) {
      return {
        ok: false,
        configured: true,
        error:
          data?.error?.message ||
          `Address lookup failed (${response.status}).`,
      };
    }

    const suggestions = (data.suggestions ?? [])
      .map((s) => s.placePrediction)
      .filter((p): p is AutocompletePrediction => Boolean(p?.placeId))
      .map((p) => ({
        placeId: p.placeId as string,
        primary: p.structuredFormat?.mainText?.text ?? p.text?.text ?? "",
        secondary: p.structuredFormat?.secondaryText?.text ?? "",
        description: p.text?.text ?? p.structuredFormat?.mainText?.text ?? "",
      }));

    return { ok: true, configured: true, suggestions };
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    return {
      ok: false,
      configured: true,
      error: aborted
        ? "Address lookup timed out."
        : "Could not reach the address service.",
    };
  } finally {
    clearTimeout(timeout);
  }
}
