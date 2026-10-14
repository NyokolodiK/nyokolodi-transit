"use client";

import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Kagiso Molosiwa",
      role: "Operations Director, Mining Logistics",
      location: "Sandton CBD & OR Tambo International Airport",
      rating: 5,
      comment:
        "Nyokolodi Transit completely transformed our executive airport transfers. Their Suzuki Dzire sedans are immaculately clean, the drivers are always in full uniform and 10 minutes early, and the corporate billing is effortless.",
      badge: "Corporate Charter",
    },
    {
      name: "Dr. Tumelo Kgosi",
      role: "Senior Consultant, Health Advisory",
      location: "OR Tambo International Airport (JNB) to Centurion",
      rating: 5,
      comment:
        "Landing into OR Tambo after long travel, having a liveried Nyokolodi Transit car and a professional chauffeur waiting with my name sign is pure relief. Safe driving, great air-conditioning, and genuine hospitality.",
      badge: "Airport Transfer",
    },
    {
      name: "Lerato Molefe",
      role: "Regional Procurement Manager",
      location: "Johannesburg to Pretoria & Regional",
      rating: 5,
      comment:
        "We rely on Nyokolodi Transit for all intercity movements. Far safer, quieter, and more dependable than standard taxis. The onboard Wi-Fi and charging let me work without disruption throughout the trip.",
      badge: "Intercity Route",
    },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-24 bg-[#FAFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#199A3F] uppercase">
              CLIENT TESTIMONIALS
            </span>
          </div>

          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Trusted by Travelers Across Gauteng &amp; Beyond
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Hear from corporate executives, business travelers, and daily commuters who
            count on Nyokolodi Transit every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between relative group hover:-translate-y-1"
            >
              <div>
                {/* Rating & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-[#146C36] bg-[#EAF7EE] px-2.5 py-0.5 rounded-full">
                    {t.badge}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-emerald-200/80 mb-2" />

                <p className="text-sm text-gray-700 leading-relaxed italic mb-6">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Author info */}
              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0E4D25] text-white flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0">
                  {t.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-gray-900">{t.name}</h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#199A3F]" />
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">{t.role}</p>
                  <p className="text-[10px] text-gray-400">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
