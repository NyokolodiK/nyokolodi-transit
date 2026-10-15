"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Luggage,
  MapPin,
  MessageSquare,
  Phone,
  Plane,
  Route as RouteIcon,
  ShieldCheck,
  Users,
} from "lucide-react";
import Button from "@/components/ui/Button";
import BookingModal from "@/components/booking/BookingModal";
import { SITE, buildWhatsAppLink } from "@/lib/site";
import { isVehicleAvailable } from "@/lib/rates";
import type { RouteContent } from "@/lib/route-content";
import {
  Breadcrumb,
  RouteFaq,
  RouteInfo,
} from "@/lib/routes";

interface RouteLandingPageProps {
  route: RouteInfo;
  content?: RouteContent | null;
  faqs: RouteFaq[];
  relatedRoutes: RouteInfo[];
  breadcrumbs: Breadcrumb[];
}

const INCLUDED = [
  { icon: Car, label: "Door-to-door pickup and drop-off" },
  { icon: Luggage, label: "Luggage assistance and generous boot space" },
  { icon: Clock, label: "Flight and traffic monitoring" },
  { icon: CreditCard, label: "Cash, card or EFT - no hidden extras" },
  { icon: ShieldCheck, label: "Fully insured, licensed chauffeurs" },
  { icon: Users, label: "Child seats on request at no charge" },
];

export default function RouteLandingPage({
  route,
  content,
  faqs,
  relatedRoutes,
  breadcrumbs,
}: RouteLandingPageProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { origin, destination, distanceKm, travelMinutes } = route;
  const showMinibus = isVehicleAvailable("minibus");
  const openBooking = () => setBookingOpen(true);
  const whatsappLink = buildWhatsAppLink(
    `Hello ${SITE.name}, I'd like a quote for a shuttle from ${origin.name} to ${destination.name}.`
  );

  return (
    <div className="min-h-screen bg-[#FAFDFB]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="relative h-10 w-40 sm:h-11 sm:w-44">
            <Image
              src="/logo-transparent.png"
              alt={SITE.name}
              fill
              priority
              className="object-contain object-left"
            />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${SITE.phoneE164}`}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#146C36] hover:text-[#0E4D25]"
            >
              <Phone className="w-4 h-4" />
              {SITE.phoneDisplay}
            </a>
            <button
              onClick={openBooking}
              className="inline-flex items-center gap-2 bg-[#0E4D25] hover:bg-[#083E1A] text-white px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium shadow-md transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4 text-emerald-300" />
              <span>Book a Ride</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#081E10]">
        <div className="absolute inset-0 select-none pointer-events-none">
          <Image
            src="/hero-wide.webp"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-40"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(8,30,16,0.95) 0%, rgba(8,30,16,0.80) 45%, rgba(8,30,16,0.45) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-emerald-100/60">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.href} className="flex items-center gap-1.5">
                    {isLast ? (
                      <span className="text-emerald-300 font-semibold">
                        {crumb.name}
                      </span>
                    ) : (
                      <>
                        <Link
                          href={crumb.href}
                          className="hover:text-white transition-colors"
                        >
                          {crumb.name}
                        </Link>
                        <ChevronRight className="w-3 h-3 text-emerald-500" />
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-[#22C55E] text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-4">
              {route.isAirport ? (
                <Plane className="w-4 h-4" />
              ) : (
                <RouteIcon className="w-4 h-4" />
              )}
              {route.serviceType}
            </p>
            <h1
              className="font-black text-white leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.25rem)" }}
            >
              Shuttle from {origin.name} to{" "}
              <span className="text-[#22C55E]">{destination.name}</span>
            </h1>
            <p className="mt-4 text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl">
              Private, door-to-door transfers between {origin.name} and{" "}
              {destination.name} - available 24/7. Fixed, transparent pricing,
              professional chauffeurs and a comfortable ride every time.
            </p>

            {/* Stats */}
            <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl">
              {[
                { icon: RouteIcon, label: "Distance", value: `${distanceKm} km` },
                { icon: Clock, label: "Journey time", value: `~${travelMinutes} min` },
                { icon: Calendar, label: "Availability", value: "24 / 7" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-sm"
                >
                  <Icon className="w-4 h-4 text-[#22C55E] mb-1.5" />
                  <p className="text-[10px] uppercase tracking-wider text-white/45">
                    {label}
                  </p>
                  <p className="text-white font-bold text-sm">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={openBooking}
                className="inline-flex items-center gap-2 bg-[#146C36] hover:bg-[#0E4D25] text-white font-bold rounded-full px-7 py-3.5 text-sm shadow-lg transition-all hover:scale-[1.02] active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                Book This Route
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-full px-7 py-3.5 text-sm shadow-lg transition-all hover:scale-[1.02] active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Fare cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div
          className={`grid grid-cols-1 gap-4 ${
            showMinibus ? "md:grid-cols-2" : "max-w-xl"
          }`}
        >
          <FareCard
            name="Suzuki Dzire Sedan"
            capacity="1 - 4 passengers"
            price={route.sedan.display}
            highlight={false}
            onBook={openBooking}
          />
          {showMinibus && (
            <FareCard
              name="Group Shuttle (Minibus)"
              capacity="5 - 14 passengers"
              price={route.minibus.display}
              highlight
              onBook={openBooking}
            />
          )}
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Estimates based on a {distanceKm} km road distance. Tolls and parking
          excluded. After-hours pickups (22:00 - 05:59) carry a 15% surcharge,
          shown before you confirm.
        </p>
      </section>

      {/* Why choose */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Why travellers choose Nyokolodi for {origin.name} to{" "}
              {destination.name}
            </h2>
            <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              {content?.intro ??
                `${origin.name} is ${origin.blurb} ${destination.name} is ${destination.blurb} We connect the two with a dependable, pre-booked private transfer - no meters, no detours and no surprises.`}
            </p>
            {content?.highlights && content.highlights.length > 0 && (
              <ul className="mt-5 space-y-2">
                {content.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#199A3F] mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INCLUDED.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF9EE] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#146C36]" />
                  </div>
                  <span className="text-sm text-gray-700 pt-1.5">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full h-64 sm:h-80 lg:h-[420px]">
            <Image
              src="/fleet-two-dzires-clean.webp"
              alt={`Nyokolodi Transit fleet servicing ${origin.name} to ${destination.name}`}
              fill
              className="object-cover rounded-3xl shadow-card"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight text-center">
            Booking your {origin.name} to {destination.name} shuttle
          </h2>
          <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                step: "01",
                title: "Request your trip",
                body: `Enter your pickup and drop-off, date and passenger count for ${origin.name} to ${destination.name}.`,
              },
              {
                step: "02",
                title: "Confirm instantly",
                body: "Receive your fare and booking reference, then confirm on WhatsApp with one tap.",
              },
              {
                step: "03",
                title: "Travel in comfort",
                body: "Your professional chauffeur arrives on time so you reach your destination relaxed.",
              },
            ].map(({ step, title, body }) => (
              <div
                key={step}
                className="rounded-3xl border border-emerald-50 bg-[#FAFDFB] p-6 shadow-card"
              >
                <span className="text-4xl font-black text-[#22C55E]/30">
                  {step}
                </span>
                <h3 className="mt-2 text-lg font-bold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight text-center">
          {origin.name} to {destination.name}: frequently asked questions
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-emerald-100 bg-white p-5 shadow-card open:shadow-md"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                <span className="font-semibold text-gray-900 text-sm sm:text-base">
                  {faq.question}
                </span>
                <ChevronRight className="w-5 h-5 text-[#146C36] flex-shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Related routes */}
      {relatedRoutes.length > 0 && (
        <section className="bg-white border-t border-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Popular shuttle routes
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Explore other routes we serve across Gauteng and beyond.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedRoutes.map((related) => (
                <Link
                  key={related.slug}
                  href={`/shuttle/${related.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-emerald-100 bg-[#FAFDFB] px-4 py-3.5 hover:border-[#146C36] hover:bg-white transition-all"
                >
                  <MapPin className="w-4 h-4 text-[#146C36] flex-shrink-0" />
                  <span className="flex-1 text-sm font-medium text-gray-800">
                    {related.origin.name} to {related.destination.name}
                  </span>
                  <span className="text-xs font-bold text-[#146C36]">
                    from {related.sedan.display}
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href="/shuttle"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#146C36] hover:text-[#0E4D25]"
            >
              View all shuttle routes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* CTA band */}
      <section className="bg-[#0E4D25]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Ready to book {origin.name} to {destination.name}?
            </h2>
            <p className="mt-1.5 text-emerald-100/80 text-sm">
              Reserve online in under a minute, or reach us any time on{" "}
              {SITE.phoneDisplay}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={openBooking}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#0E4D25] font-bold rounded-full px-6 py-3 text-sm shadow-lg transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              Book Now
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-full px-6 py-3 text-sm shadow-lg transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#072B15] text-emerald-100/70 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <p className="text-white font-bold">Nyokolodi Transit</p>
            <p>
              {SITE.address} · {SITE.phoneDisplay}
            </p>
            <p>Company Reg: 2019/000000/07 · VAT Registered</p>
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/" className="hover:text-emerald-300 transition-colors">
              Home
            </Link>
            <Link
              href="/shuttle"
              className="hover:text-emerald-300 transition-colors"
            >
              Shuttle Routes
            </Link>
            <Link
              href="/#contact"
              className="hover:text-emerald-300 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-white/10 text-[11px] text-emerald-100/40">
          &copy; {new Date().getFullYear()} Nyokolodi Transit (Pty) Ltd. All
          rights reserved.
        </div>
      </footer>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialPickup={origin.name}
        initialDropoff={destination.name}
        initialService={route.isAirport ? "airport" : "intercity"}
      />
    </div>
  );
}

function FareCard({
  name,
  capacity,
  price,
  highlight,
  onBook,
}: {
  name: string;
  capacity: string;
  price: string;
  highlight: boolean;
  onBook: () => void;
}) {
  return (
    <div
      className={`rounded-3xl p-6 shadow-card border bg-white ${
        highlight ? "border-[#146C36] ring-1 ring-[#146C36]/20" : "border-emerald-50"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900">{name}</h3>
            {highlight && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF9EE] px-2 py-0.5 text-[10px] font-bold text-[#146C36] uppercase tracking-wide">
                <BadgeCheck className="w-3 h-3" /> Groups
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> {capacity}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-gray-400">
            from
          </p>
          <p className="text-2xl font-black text-[#146C36]">{price}</p>
        </div>
      </div>
      <ul className="mt-4 space-y-1.5">
        {[
          "Private, door-to-door transfer",
          "Luggage included",
          "Flexible pickup time",
        ].map((line) => (
          <li key={line} className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#199A3F]" />
            {line}
          </li>
        ))}
      </ul>
      <Button
        variant={highlight ? "primary" : "success"}
        className="w-full mt-5"
        onClick={onBook}
      >
        <Calendar className="w-4 h-4" />
        Book this vehicle
      </Button>
    </div>
  );
}
