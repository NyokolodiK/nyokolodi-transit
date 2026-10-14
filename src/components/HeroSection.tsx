"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  ArrowRight,
  FileText,
  ShieldCheck,
  Users,
  Tag,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import { SITE } from "@/lib/site";

interface HeroSectionProps {
  onBookRideClick: () => void;
  onGetQuoteClick: () => void;
}

const ROUTES = [
  "OR Tambo Airport",
  "Lanseria Airport",
  "Sandton CBD",
  "Pretoria CBD",
  "Johannesburg CBD",
  "Menlyn Park",
];

export default function HeroSection({
  onBookRideClick,
  onGetQuoteClick,
}: HeroSectionProps) {
  const [activeRoute, setActiveRoute] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActiveRoute((p) => (p + 1) % ROUTES.length),
      2400
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="w-full overflow-hidden bg-[#081E10]">

      {/* ── Top info bar ── */}
      <div className="bg-[#0E4D25] border-b border-[#146C36]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5 text-emerald-200 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
              {SITE.address}
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#22C55E]" />
              Available 24 / 7
            </span>
          </div>
          <a
            href={`tel:${SITE.phoneE164}`}
            className="flex items-center gap-1.5 text-[#22C55E] font-semibold text-[11px] sm:text-xs hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            {SITE.phoneDisplay}
          </a>
        </div>
      </div>

      {/* ── Main hero ── */}
      <div className="relative">
        {/* Background image */}
        <div className="absolute inset-0 select-none pointer-events-none">
          <Image
            src="/hero.png"
            alt=""
            fill
            priority
            quality={95}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Dark overlay — heavier on left for text, lighter on right to show cars */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(8,30,16,0.93) 0%, rgba(8,30,16,0.85) 35%, rgba(8,30,16,0.50) 60%, rgba(8,30,16,0.15) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
          <div className="max-w-[560px]">

            {/* Eyebrow */}
            <p className="text-[#22C55E] text-[11px] sm:text-xs font-bold tracking-[0.30em] uppercase mb-4">
              PEOPLE · PLACES · POSSIBILITIES
            </p>

            {/* Headline */}
            <h1
              className="font-black text-white leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)" }}
            >
              Reliable Shuttle
              <br />
              <span className="text-[#22C55E]">Services</span>
            </h1>

            {/* Animated route ticker */}
            <div className="mt-5 flex items-center gap-2 text-sm">
              <span className="text-white/50">Serving</span>
              <div className="relative h-5 overflow-hidden min-w-[180px]">
                {ROUTES.map((route, i) => (
                  <span
                    key={route}
                    className="absolute inset-0 flex items-center font-semibold text-[#22C55E] transition-all duration-500"
                    style={{
                      opacity: i === activeRoute ? 1 : 0,
                      transform: `translateY(${i === activeRoute ? "0" : "120%"})`,
                    }}
                  >
                    {route}
                  </span>
                ))}
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-white/30" />
            </div>

            {/* Subheading */}
            <p
              className="mt-5 font-bold text-white"
              style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
            >
              Safe.&nbsp; Comfortable.&nbsp; Affordable.
            </p>

            {/* Body */}
            <p className="mt-3 text-white/65 text-sm sm:text-base leading-relaxed max-w-md">
              Nyokolodi Transit provides dependable shuttle services across
              Gauteng. Whether it&apos;s a daily commute, corporate transport
              or special trip, we get you there safely and on time.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={onBookRideClick}
                className="inline-flex items-center gap-2 bg-[#146C36] hover:bg-[#0E4D25] text-white font-bold rounded-full px-7 py-3.5 text-sm shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                Book a Ride
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onGetQuoteClick}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-full px-7 py-3.5 text-sm border-2 border-white shadow transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                <FileText className="w-4 h-4 text-[#146C36]" />
                Get a Quote
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-x-7 gap-y-3">
              {[
                { icon: ShieldCheck, line1: "Safe &", line2: "Secure Travel" },
                { icon: Users,       line1: "Comfortable",   line2: "& Modern Fleet" },
                { icon: Tag,         line1: "Affordable",    line2: "Rates" },
              ].map(({ icon: Icon, line1, line2 }) => (
                <div key={line2} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#146C36] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-[11px] font-bold leading-tight"
                       dangerouslySetInnerHTML={{ __html: line1 }} />
                    <p className="text-white/55 text-[10px] leading-tight">{line2}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
