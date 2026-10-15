import rawContent from "@/data/route-content.json";

export interface RouteFaq {
  question: string;
  answer: string;
}

export interface RouteContent {
  intro: string;
  highlights: string[];
  faqs: RouteFaq[];
  metaDescription?: string;
}

/**
 * AI-generated, per-route copy cached at build time.
 * Regenerate with `npm run generate:routes` (requires GEMINI_API_KEY).
 * When a slug is missing, the UI falls back to template copy.
 */
const CONTENT = rawContent as Record<string, RouteContent | undefined>;

export function getRouteContent(slug: string): RouteContent | null {
  return CONTENT[slug] ?? null;
}

export function hasRouteContent(): boolean {
  return Object.keys(CONTENT).length > 0;
}
