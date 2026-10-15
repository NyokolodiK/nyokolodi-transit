import { NextResponse } from "next/server";
import {
  autocompletePlaces,
  isPlacesServiceConfigured,
} from "@/lib/places";

interface AutocompletePayload {
  input?: unknown;
  sessionToken?: unknown;
}

export async function POST(request: Request) {
  if (!isPlacesServiceConfigured()) {
    return NextResponse.json(
      { error: "Address autocomplete is not configured." },
      { status: 503 }
    );
  }

  let payload: AutocompletePayload;
  try {
    payload = (await request.json()) as AutocompletePayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const input = typeof payload.input === "string" ? payload.input.trim() : "";
  const sessionToken =
    typeof payload.sessionToken === "string" ? payload.sessionToken : undefined;

  if (input.length < 3) {
    return NextResponse.json({ suggestions: [] });
  }

  const result = await autocompletePlaces(input, sessionToken);

  if (!result.ok) {
    const status = result.configured ? 422 : 503;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ suggestions: result.suggestions ?? [] });
}
