import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { ROUTES, routesByHub } from "@/lib/routes";

const SITE_URL = "https://nyokoloditransit.co.za";

export const metadata: Metadata = {
  title: "Shuttle Routes Across Gauteng & Beyond | Nyokolodi Transit",
  description:
    "Browse all Nyokolodi Transit shuttle routes, including airport transfers to OR Tambo and Lanseria and private transfers between Centurion, Pretoria, Sandton, Johannesburg and more.",
  alternates: { canonical: `${SITE_URL}/shuttle` },
  openGraph: {
    title: "Shuttle Routes Across Gauteng & Beyond | Nyokolodi Transit",
    description:
      "Browse all Nyokolodi Transit shuttle routes across Gauteng and beyond.",
    url: `${SITE_URL}/shuttle`,
    siteName: SITE.name,
    type: "website",
    images: ["/hero-wide.webp"],
  },
};

export default function ShuttleIndexPage() {
  const groups = routesByHub();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Nyokolodi Transit shuttle routes",
    numberOfItems: ROUTES.length,
    itemListElement: ROUTES.map((route, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${route.origin.name} to ${route.destination.name}`,
      url: `${SITE_URL}/shuttle/${route.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-[#FAFDFB]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <header className="bg-[#081E10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-emerald-300 text-sm font-semibold hover:text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to home
          </Link>
          <h1
            className="mt-4 font-black text-white tracking-tight"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            Shuttle Routes We Serve
          </h1>
          <p className="mt-3 text-emerald-100/70 text-sm sm:text-base max-w-2xl leading-relaxed">
            Nyokolodi Transit runs private, door-to-door shuttles across Gauteng
            and beyond 24/7. Choose your route below for live pricing, journey
            times and instant booking. Don&apos;t see your route?{" "}
            <Link href="/#contact" className="text-emerald-300 underline">
              Contact us
            </Link>{" "}
            or call {SITE.phoneDisplay}.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        {groups.map(({ hub, routes }) => (
          <section key={hub.id}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#EAF9EE] flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#146C36]" />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight">
                  From {hub.name}
                </h2>
                <p className="text-xs text-gray-500">{hub.blurb}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {routes.map((route) => (
                <Link
                  key={route.slug}
                  href={`/shuttle/${route.slug}`}
                  className="group rounded-2xl border border-emerald-100 bg-white px-4 py-4 hover:border-[#146C36] hover:shadow-card transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {hub.name}
                        <span className="text-gray-400 font-normal"> to </span>
                        {route.destination.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {route.distanceKm} km · ~{route.travelMinutes} min
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#146C36] whitespace-nowrap">
                      from {route.sedan.display}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="bg-[#072B15] text-emerald-100/60 py-8 text-center text-xs">
        <p>
          &copy; {new Date().getFullYear()} Nyokolodi Transit (Pty) Ltd. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}
