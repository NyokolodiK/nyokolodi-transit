"use client";

import React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  Car,
  Users,
  MapPin,
} from "lucide-react";

export default function BrandExcellenceSection() {
  const cards = [
    {
      title: "Uniformed, Vetted Chauffeurs",
      badge: "Professional Attire",
      image: "/driver-uniforms-hq.png",
      alt: "Nyokolodi Transit Driver Uniform - People Places Possibilities",
      description:
        "Our drivers proudly wear the official Nyokolodi Transit uniform with our core motto: People, Places, Possibilities. Every chauffeur is background-checked, defensively trained, and courteous.",
      features: [
        "Official branded uniform for instant security",
        "Trained in defensive driving & executive etiquette",
        "Complimentary luggage assistance at pickup & dropoff",
      ],
    },
    {
      title: "Distinctive Vehicle Livery",
      badge: "Verified Identity",
      image: "/branding-door-hq.png",
      alt: "Nyokolodi Transit Door Wrap Livery Detail",
      description:
        "Travel with total peace of mind. Every vehicle in our fleet features crisp, official Nyokolodi Transit aerodynamic green wrapping, ensuring you can immediately identify your ride.",
      features: [
        "Easily recognizable official green livery wrap",
        "Commercial passenger liability insurance",
        "Daily vehicle inspection & sanitized interiors",
      ],
    },
    {
      title: "Centurion Hub & Fleet Readiness",
      badge: "Scalable Transit",
      image: "/fleet-panoramic-clean.webp",
      alt: "Nyokolodi Transit Suzuki Dzire Fleet Standby in Gauteng",
      description:
        "Based at our Centurion hub, our modern Suzuki Dzire sedans operate on standby across Gauteng for OR Tambo, Lanseria, executive commutes, and multi-vehicle corporate delegations.",
      features: [
        "Real-time GPS fleet tracking & speed governance",
        "Flight delay monitoring with automatic pickup adjustment",
        "Transparent, fixed rates with no hidden surge pricing",
      ],
    },
  ];

  const stats = [
    { value: "99.8%", label: "On-Time Pickups", icon: <Clock className="w-5 h-5 text-[#146C36]" /> },
    { value: "100%", label: "Vetted Chauffeurs", icon: <ShieldCheck className="w-5 h-5 text-[#146C36]" /> },
    { value: "24/7", label: "Dispatch Support", icon: <Car className="w-5 h-5 text-[#146C36]" /> },
    { value: "4.9 ★", label: "Client Satisfaction", icon: <Award className="w-5 h-5 text-[#146C36]" /> },
  ];

  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#199A3F] uppercase">
              PEOPLE &bull; PLACES &bull; POSSIBILITIES
            </span>
          </div>

          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Quality &amp; Standards You Can Trust
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            From our cleanly liveried Suzuki Dzire sedans to our professionally
            uniformed chauffeurs, every aspect of Nyokolodi Transit is designed
            to deliver a premium, worry-free journey.
          </p>
        </div>

        {/* 3 Visual Cards featuring newly added photos */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#FAFDFB] rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[16/11] bg-white overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#0E4D25]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-emerald-300" />
                  <span>{card.badge}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
                    {card.description}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-gray-200/60 pt-4">
                    {card.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2 text-xs text-gray-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#199A3F] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Strip */}
        <div className="mt-14 bg-gradient-to-r from-[#072B15] via-[#0E4D25] to-[#146C36] rounded-3xl p-6 sm:p-8 text-white shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((st, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-2">
                  <div className="text-emerald-300">{st.icon}</div>
                </div>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  {st.value}
                </p>
                <p className="text-xs sm:text-sm text-emerald-200/90 font-medium mt-0.5">
                  {st.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
