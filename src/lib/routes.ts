import { VehicleId, calculateTransferFare, formatZAR } from "./rates";

export type LocationType = "airport" | "city" | "suburb" | "resort";

export interface Location {
  id: string;
  name: string;
  region: string;
  type: LocationType;
  lat: number;
  lng: number;
  blurb: string;
}

/**
 * Service nodes Nyokolodi Transit serves. Coordinates are used to derive
 * realistic road distances (see ROAD_FACTOR) so every programmatic route page
 * shows an accurate fare without a paid directions API.
 */
export const LOCATIONS: Location[] = [
  {
    id: "centurion",
    name: "Centurion",
    region: "Gauteng",
    type: "suburb",
    lat: -25.8603,
    lng: 28.1894,
    blurb:
      "our home base between Pretoria and Johannesburg, with easy access to the N1 and R21.",
  },
  {
    id: "pretoria-cbd",
    name: "Pretoria CBD",
    region: "Gauteng",
    type: "city",
    lat: -25.7479,
    lng: 28.2293,
    blurb:
      "the administrative capital, home to government offices, embassies and Union Buildings.",
  },
  {
    id: "sandton-cbd",
    name: "Sandton CBD",
    region: "Gauteng",
    type: "city",
    lat: -26.1076,
    lng: 28.0567,
    blurb:
      "Africa's richest square mile, packed with corporate head offices, hotels and the Gautrain.",
  },
  {
    id: "or-tambo-airport",
    name: "OR Tambo Airport (JNB)",
    region: "Gauteng",
    type: "airport",
    lat: -26.1392,
    lng: 28.246,
    blurb:
      "South Africa's busiest international gateway in Kempton Park, serving all domestic and international flights.",
  },
  {
    id: "lanseria-airport",
    name: "Lanseria Airport (HLA)",
    region: "Gauteng",
    type: "airport",
    lat: -25.9385,
    lng: 27.9262,
    blurb:
      "the convenient northern-Gauteng airport favoured for private, charter and select commercial flights.",
  },
  {
    id: "johannesburg-cbd",
    name: "Johannesburg CBD",
    region: "Gauteng",
    type: "city",
    lat: -26.2041,
    lng: 28.0473,
    blurb:
      "the economic heart of South Africa, with offices, courts and the historic Maboneng precinct.",
  },
  {
    id: "midrand",
    name: "Midrand",
    region: "Gauteng",
    type: "suburb",
    lat: -25.9992,
    lng: 28.1263,
    blurb:
      "the half-way city between Pretoria and Johannesburg, popular with corporate parks and estates.",
  },
  {
    id: "rosebank",
    name: "Rosebank",
    region: "Gauteng",
    type: "suburb",
    lat: -26.1468,
    lng: 28.0407,
    blurb:
      "an upmarket northern-Johannesburg hub known for its mall, hotels and Gautrain station.",
  },
  {
    id: "menlyn",
    name: "Menlyn",
    region: "Gauteng",
    type: "suburb",
    lat: -25.7836,
    lng: 28.2758,
    blurb:
      "east-Pretoria's business and retail node, anchored by Menlyn Park and Menlyn Maine.",
  },
  {
    id: "kempton-park",
    name: "Kempton Park",
    region: "Gauteng",
    type: "suburb",
    lat: -26.1,
    lng: 28.2333,
    blurb:
      "the East Rand town surrounding OR Tambo Airport, ideal for early-morning flight pickups.",
  },
  {
    id: "roodepoort",
    name: "Roodepoort",
    region: "Gauteng",
    type: "suburb",
    lat: -26.1625,
    lng: 27.8725,
    blurb:
      "a western-Johannesburg residential and commercial area on the West Rand.",
  },
  {
    id: "benoni",
    name: "Benoni",
    region: "Gauteng",
    type: "suburb",
    lat: -26.1885,
    lng: 28.32,
    blurb:
      "an established East Rand town with easy R21 and N12 access to the airport.",
  },
  {
    id: "krugersdorp",
    name: "Krugersdorp",
    region: "Gauteng",
    type: "suburb",
    lat: -26.1,
    lng: 27.7667,
    blurb:
      "a West Rand hub near the Cradle of Humankind and Lanseria Airport.",
  },
  {
    id: "hartbeespoort",
    name: "Hartbeespoort",
    region: "North West",
    type: "resort",
    lat: -25.7433,
    lng: 27.8697,
    blurb:
      "the popular dam and weekend getaway just north-west of Gauteng.",
  },
  {
    id: "vereeniging",
    name: "Vereeniging",
    region: "Gauteng",
    type: "suburb",
    lat: -26.6731,
    lng: 27.9319,
    blurb:
      "a Vaal Triangle industrial and residential centre south of Johannesburg.",
  },
  {
    id: "sun-city",
    name: "Sun City",
    region: "North West",
    type: "resort",
    lat: -25.339,
    lng: 27.099,
    blurb:
      "South Africa's iconic resort and casino in the Pilanesberg, a favourite weekend and conference destination.",
  },
];

/** Origin nodes used to anchor the programmatic route set. */
export const HUB_IDS = [
  "centurion",
  "pretoria-cbd",
  "sandton-cbd",
  "or-tambo-airport",
  "lanseria-airport",
  "johannesburg-cbd",
] as const;

const LOCATION_BY_ID = new Map(LOCATIONS.map((location) => [location.id, location]));
const HUB_SET = new Set<string>(HUB_IDS);

/** Straight-line distances underestimate road travel by roughly this factor. */
const ROAD_FACTOR = 1.3;
const AVERAGE_SPEED_KMH = 70;
const MINUTES_BUFFER = 5;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function haversineKm(a: Location, b: Location): number {
  const earthRadius = 6371;
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * earthRadius * Math.asin(Math.sqrt(h));
}

export function routeDistanceKm(originId: string, destinationId: string): number {
  const origin = LOCATION_BY_ID.get(originId);
  const destination = LOCATION_BY_ID.get(destinationId);
  if (!origin || !destination) return 0;
  return Math.max(1, Math.round(haversineKm(origin, destination) * ROAD_FACTOR));
}

function estimateTravelMinutes(distanceKm: number): number {
  const minutes = (distanceKm / AVERAGE_SPEED_KMH) * 60 + MINUTES_BUFFER;
  return Math.max(15, Math.round(minutes / 5) * 5);
}

export function routeSlug(originId: string, destinationId: string): string {
  return `${originId}-to-${destinationId}`;
}

export interface RouteInfo {
  slug: string;
  origin: Location;
  destination: Location;
  distanceKm: number;
  travelMinutes: number;
  isAirport: boolean;
  serviceType: string;
  sedan: { total: number; display: string };
  minibus: { total: number; display: string };
  related: string[];
}

function buildFare(distanceKm: number, vehicle: VehicleId) {
  const fare = calculateTransferFare({ distanceKm, vehicle });
  return { total: fare.total, display: formatZAR(fare.total) };
}

function resolveServiceType(origin: Location, destination: Location): string {
  if (origin.type === "airport" || destination.type === "airport") {
    return "Airport Transfer";
  }
  if (origin.region !== destination.region) return "Intercity Transfer";
  return "Shuttle Transfer";
}

function buildRouteInfo(origin: Location, destination: Location): RouteInfo {
  const distanceKm = routeDistanceKm(origin.id, destination.id);
  return {
    slug: routeSlug(origin.id, destination.id),
    origin,
    destination,
    distanceKm,
    travelMinutes: estimateTravelMinutes(distanceKm),
    isAirport: origin.type === "airport" || destination.type === "airport",
    serviceType: resolveServiceType(origin, destination),
    sedan: buildFare(distanceKm, "sedan"),
    minibus: buildFare(distanceKm, "minibus"),
    related: [],
  };
}

function buildAllRoutes(): RouteInfo[] {
  const routes: RouteInfo[] = [];
  for (const origin of LOCATIONS) {
    for (const destination of LOCATIONS) {
      if (origin.id === destination.id) continue;
      const touchesHub = HUB_SET.has(origin.id) || HUB_SET.has(destination.id);
      if (!touchesHub) continue;
      routes.push(buildRouteInfo(origin, destination));
    }
  }

  for (const route of routes) {
    route.related = routes
      .filter(
        (candidate) =>
          candidate.slug !== route.slug &&
          (candidate.origin.id === route.origin.id ||
            candidate.destination.id === route.destination.id)
      )
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 6)
      .map((candidate) => candidate.slug);
  }

  return routes.sort((a, b) => a.slug.localeCompare(b.slug));
}

export const ROUTES: RouteInfo[] = buildAllRoutes();

export const ROUTE_BY_SLUG = new Map(ROUTES.map((route) => [route.slug, route]));

export function getRoute(slug: string): RouteInfo | null {
  return ROUTE_BY_SLUG.get(slug) ?? null;
}

/** Curated high-intent routes featured on the home page. */
export const POPULAR_ROUTE_SLUGS = [
  "centurion-to-or-tambo-airport",
  "or-tambo-airport-to-centurion",
  "pretoria-cbd-to-or-tambo-airport",
  "sandton-cbd-to-or-tambo-airport",
  "centurion-to-lanseria-airport",
  "lanseria-airport-to-sandton-cbd",
  "johannesburg-cbd-to-or-tambo-airport",
  "centurion-to-sandton-cbd",
  "pretoria-cbd-to-johannesburg-cbd",
] as const;

export function getPopularRoutes(): RouteInfo[] {
  return POPULAR_ROUTE_SLUGS.map((slug) => ROUTE_BY_SLUG.get(slug)).filter(
    (route): route is RouteInfo => Boolean(route)
  );
}

export interface RouteGroup {
  hub: Location;
  routes: RouteInfo[];
}

/** Routes grouped by hub origin, for the /shuttle index page. */
export function routesByHub(): RouteGroup[] {
  return HUB_IDS.map((hubId) => {
    const hub = LOCATION_BY_ID.get(hubId)!;
    return {
      hub,
      routes: ROUTES.filter((route) => route.origin.id === hubId),
    };
  });
}

export interface RouteFaq {
  question: string;
  answer: string;
}

export function buildFaqs(route: RouteInfo): RouteFaq[] {
  const { origin, destination, distanceKm, travelMinutes, sedan } = route;
  const faqs: RouteFaq[] = [
    {
      question: `How much does a shuttle from ${origin.name} to ${destination.name} cost?`,
      answer: `Our estimate for the ${distanceKm} km trip starts at ${sedan.display} for a Suzuki Dzire sedan (1-4 passengers). The exact fare is confirmed on booking and includes no hidden extras.`,
    },
    {
      question: `How long does the drive from ${origin.name} to ${destination.name} take?`,
      answer: `The journey is roughly ${distanceKm} km and typically takes about ${travelMinutes} minutes in normal traffic. We monitor traffic and allow extra time for peak-hour travel so you arrive comfortably.`,
    },
    {
      question: `Do you operate 24/7 between ${origin.name} and ${destination.name}?`,
      answer: `Yes. Nyokolodi Transit operates 24 hours a day, 7 days a week. Pickups between 22:00 and 05:59 carry a 15% after-hours surcharge, shown clearly before you confirm.`,
    },
    {
      question: `Can I book a return trip or a full-day charter?`,
      answer: `Absolutely. You can book a return transfer or a day charter billed per hour - R400/hour for the sedan and R500/hour for the group shuttle, with a 2-hour minimum.`,
    },
  ];

  if (route.isAirport) {
    faqs.splice(2, 0, {
      question: `Do you track flights for airport pickups?`,
      answer: `Yes. Share your flight number when booking and we monitor it in real time, adjusting your pickup if the flight is delayed. Your driver is waiting in the arrivals area with a name board for meet-and-greet pickups.`,
    });
  }

  return faqs;
}

export interface Breadcrumb {
  name: string;
  href: string;
}

export function buildBreadcrumbs(route: RouteInfo): Breadcrumb[] {
  return [
    { name: "Home", href: "/" },
    { name: "Shuttle Routes", href: "/shuttle" },
    {
      name: `${route.origin.name} to ${route.destination.name}`,
      href: `/shuttle/${route.slug}`,
    },
  ];
}
