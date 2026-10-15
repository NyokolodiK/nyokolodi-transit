/**
 * Build-time route content generator.
 *
 * Calls the Google Gemini API (free tier) once per route and caches the result
 * in src/data/route-content.json, which the site reads at build/request time.
 * This keeps runtime fast and free while giving every programmatic SEO page
 * unique, route-specific copy.
 *
 * Usage:
 *   npm run generate:routes            # generate only missing routes
 *   npm run generate:routes -- --force # regenerate everything
 *   npm run generate:routes -- --only=centurion-to-or-tambo-airport
 *   npm run generate:routes -- --dry-run   # print prompts, no API calls
 *
 * Requires GEMINI_API_KEY in .env.local (free key: https://aistudio.google.com/app/apikey).
 */
import { readFileSync, promises as fs } from "node:fs";
import path from "node:path";
import { ROUTES, type RouteInfo } from "../src/lib/routes";
import { AVAILABLE_VEHICLES } from "../src/lib/rates";

interface RouteFaq {
  question: string;
  answer: string;
}

interface RouteContent {
  intro: string;
  highlights: string[];
  faqs: RouteFaq[];
  metaDescription?: string;
}

const OUTPUT = path.resolve(process.cwd(), "src/data/route-content.json");

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    try {
      const text = readFileSync(path.resolve(process.cwd(), file), "utf8");
      for (const line of text.split("\n")) {
        const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
        if (!match) continue;
        const key = match[1];
        let value = match[2].trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        if (!(key in process.env)) process.env[key] = value;
      }
    } catch {
      // File is optional.
    }
  }
}

function buildPrompt(route: RouteInfo): string {
  const { origin, destination, distanceKm, travelMinutes, serviceType } = route;
  const facts = [
    `- Origin: ${origin.name} (${origin.region}) - ${origin.blurb}`,
    `- Destination: ${destination.name} (${destination.region}) - ${destination.blurb}`,
    `- Road distance: ${distanceKm} km`,
    `- Typical journey time: about ${travelMinutes} minutes`,
    `- Service type: ${serviceType}`,
    `- Suzuki Dzire sedan (1-4 passengers): from ${route.sedan.display}`,
  ];
  if (AVAILABLE_VEHICLES.some((vehicle) => vehicle.id === "minibus")) {
    facts.push(`- Group shuttle (5-14 passengers): from ${route.minibus.display}`);
  }
  return [
    "You write concise, factual marketing copy for Nyokolodi Transit, a South African private shuttle company.",
    "Write ONLY about the single route described below, in South African / British English.",
    "",
    "VERIFIED FACTS (never contradict or add to these):",
    ...facts,
    "- Available 24/7. A 15% after-hours surcharge applies between 22:00 and 05:59. Tolls and parking are excluded.",
    "",
    "STRICT RULES:",
    "- Do NOT invent landmarks, road names, toll amounts, statistics, pickup times or any fact not listed above.",
    "- Do NOT promise specific timings or guarantees.",
    "- Do not mention competitor companies.",
    "",
    "Return ONLY JSON with this exact shape:",
    "{",
    '  "intro": "2-3 sentence introduction to travelling this route with us",',
    '  "highlights": ["three short selling points, max 12 words each"],',
    '  "faqs": [{"question": "string", "answer": "1-3 sentences"}]  // exactly 4 items',
    '  "metaDescription": "max 155 characters, includes both place names and a call to action"',
    "}",
  ].join("\n");
}

function validate(parsed: unknown, route: RouteInfo): RouteContent {
  const value = parsed as Partial<RouteContent>;
  const problems: string[] = [];

  if (!value || typeof value.intro !== "string" || value.intro.trim().length < 40) {
    problems.push("intro too short/ missing");
  }
  if (!Array.isArray(value.highlights) || value.highlights.length < 3) {
    problems.push("need >=3 highlights");
  } else if (value.highlights.some((h) => typeof h !== "string" || !h.trim())) {
    problems.push("empty highlight");
  }
  if (!Array.isArray(value.faqs) || value.faqs.length < 3) {
    problems.push("need >=3 faqs");
  } else if (
    value.faqs.some(
      (faq) =>
        !faq ||
        typeof faq.question !== "string" ||
        typeof faq.answer !== "string" ||
        !faq.question.trim() ||
        !faq.answer.trim()
    )
  ) {
    problems.push("malformed faq");
  }
  if (
    typeof value.metaDescription !== "string" ||
    value.metaDescription.trim().length < 40
  ) {
    problems.push("metaDescription missing");
  }

  if (problems.length > 0) {
    throw new Error(`Invalid response for ${route.slug}: ${problems.join(", ")}`);
  }

  return {
    intro: value.intro!.trim(),
    highlights: value.highlights!.map((h) => h.trim()),
    faqs: value.faqs!.map((faq) => ({
      question: faq.question.trim(),
      answer: faq.answer.trim(),
    })),
    metaDescription: value.metaDescription!.trim().slice(0, 160),
  };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function requestGemini(
  route: RouteInfo,
  apiKey: string,
  model: string
): Promise<RouteContent> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ role: "user", parts: [{ text: buildPrompt(route) }] }],
    generationConfig: {
      temperature: 0.7,
      responseMimeType: "application/json",
      maxOutputTokens: 1200,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text();
    const error = new Error(
      `Gemini ${response.status}: ${detail.slice(0, 300)}`
    ) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  const data = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text =
    data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("") ??
    "";

  if (!text.trim()) throw new Error(`Empty response for ${route.slug}`);

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON response for ${route.slug}: ${text.slice(0, 200)}`);
  }

  return validate(parsed, route);
}

async function generateWithRetry(
  route: RouteInfo,
  apiKey: string,
  model: string,
  delayMs: number
): Promise<RouteContent> {
  const maxAttempts = 4;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await requestGemini(route, apiKey, model);
    } catch (error) {
      const status = (error as { status?: number }).status;
      const retryable = status === 429 || (status !== undefined && status >= 500);
      if (!retryable || attempt === maxAttempts - 1) throw error;
      const wait = delayMs * (attempt + 2);
      console.warn(`  ! ${(error as Error).message} - retrying in ${Math.round(wait / 1000)}s`);
      await sleep(wait);
    }
  }
  throw new Error(`Exhausted retries for ${route.slug}`);
}

async function loadExisting(): Promise<Record<string, RouteContent>> {
  try {
    const text = await fs.readFile(OUTPUT, "utf8");
    const parsed = JSON.parse(text) as Record<string, RouteContent>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function save(data: Record<string, RouteContent>) {
  const sorted = Object.fromEntries(
    Object.keys(data)
      .sort()
      .map((key) => [key, data[key]])
  );
  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.writeFile(OUTPUT, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
}

async function main() {
  loadEnv();

  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const dryRun = args.includes("--dry-run");
  const onlyArg = args.find((arg) => arg.startsWith("--only="));
  const only = onlyArg ? onlyArg.slice("--only=".length) : null;

  let targets = ROUTES;
  if (only) {
    targets = ROUTES.filter((route) => route.slug === only);
    if (targets.length === 0) {
      console.error(`No route matches "${only}".`);
      process.exit(1);
    }
  }

  if (dryRun) {
    console.log(`[dry-run] ${targets.length} route(s). Example prompt:\n`);
    console.log(buildPrompt(targets[0]));
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const delayMs = Number(process.env.GEMINI_DELAY_MS || 4500);

  if (!apiKey) {
    console.error(
      "Missing GEMINI_API_KEY. Add it to .env.local.\n" +
        "Get a free key at https://aistudio.google.com/app/apikey"
    );
    process.exit(1);
  }

  const existing = await loadExisting();
  const queue = force || only ? targets : targets.filter((route) => !existing[route.slug]);

  console.log(
    `Routes: ${ROUTES.length} total, ${queue.length} to generate ` +
      `(model: ${model}, ~${Math.round(delayMs / 1000)}s spacing).`
  );

  if (queue.length === 0) {
    console.log("Nothing to do. Use --force to regenerate.");
    return;
  }

  let index = 0;
  let failures = 0;
  for (const route of queue) {
    index += 1;
    process.stdout.write(`[${index}/${queue.length}] ${route.slug} ... `);
    try {
      existing[route.slug] = await generateWithRetry(route, apiKey, model, delayMs);
      process.stdout.write("ok\n");
    } catch (error) {
      failures += 1;
      process.stdout.write(`FAILED: ${(error as Error).message}\n`);
    }
    await save(existing);
    if (index < queue.length) await sleep(delayMs);
  }

  console.log(
    `\nSaved ${Object.keys(existing).length} entries to ` +
      `${path.relative(process.cwd(), OUTPUT)}` +
      (failures ? ` (${failures} failed).` : ".")
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
