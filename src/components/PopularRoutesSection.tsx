import Link from "next/link";
import { ArrowRight, Clock, MapPin, Plane, Route as RouteIcon } from "lucide-react";
import { getPopularRoutes } from "@/lib/routes";

export default function PopularRoutesSection() {
  const routes = getPopularRoutes();

  return (
    <section id="routes" className="py-20 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#199A3F] uppercase">
            POPULAR ROUTES
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Where We Drive
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            Fixed-rate private shuttles between Gauteng&apos;s busiest hubs.
            Select a route for live pricing, journey times and instant booking.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route) => (
            <Link
              key={route.slug}
              href={`/shuttle/${route.slug}`}
              className="group rounded-2xl border border-gray-100 bg-[#FAFDFB] p-5 hover:border-[#146C36] hover:bg-white hover:shadow-card transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#EAF9EE] flex items-center justify-center">
                  {route.isAirport ? (
                    <Plane className="w-5 h-5 text-[#146C36]" />
                  ) : (
                    <RouteIcon className="w-5 h-5 text-[#146C36]" />
                  )}
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-[#199A3F] bg-[#EAF9EE] rounded-full px-2.5 py-1">
                  {route.serviceType}
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold text-gray-900 group-hover:text-[#146C36] transition-colors">
                {route.origin.name}
                <span className="text-gray-400 font-normal"> to </span>
                {route.destination.name}
              </h3>

              <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#199A3F]" />
                  {route.distanceKm} km
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#199A3F]" />~{route.travelMinutes} min
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-black text-[#146C36]">
                  from {route.sedan.display}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#146C36] group-hover:gap-2 transition-all">
                  View route
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/shuttle"
            className="inline-flex items-center gap-2 bg-[#0E4D25] hover:bg-[#083E1A] text-white font-bold rounded-full px-7 py-3.5 text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            View all shuttle routes
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-sm text-gray-500">
            Don&apos;t see your route?{" "}
            <Link
              href="/#contact"
              className="font-semibold text-[#146C36] hover:text-[#0E4D25] underline"
            >
              Get in touch
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
