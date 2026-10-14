"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Users,
  Briefcase,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Gauge,
  Wifi,
  Wind,
  Check,
} from "lucide-react";

interface FleetSectionProps {
  onBookRideClick: () => void;
}

export default function FleetSection({ onBookRideClick }: FleetSectionProps) {
  const angles = [
    {
      id: "front",
      title: "Front 3/4 Exterior",
      subtitle: "Aerodynamic styling & highway stability",
      image: "/fleet-dzire-front-angle-clean.png",
      alt: "Nyokolodi Transit Suzuki Dzire Front Angle",
      tag: "Front Profile",
    },
    {
      id: "rear",
      title: "Rear 3/4 Profile",
      subtitle: "Spacious trunk & rear branding",
      image: "/fleet-dzire-rear-angle-clean.png",
      alt: "Nyokolodi Transit Suzuki Dzire Rear Angle",
      tag: "Rear & Trunk",
    },
    {
      id: "panoramic",
      title: "Dual Fleet Ready",
      subtitle: "Full fleet readiness on standby",
      image: "/fleet-panoramic-clean.webp",
      alt: "Nyokolodi Transit Suzuki Dzire Panoramic Fleet",
      tag: "Full Fleet",
    },
    {
      id: "branding",
      title: "Livery Wrap Detail",
      subtitle: "Distinctive green graphic wrap",
      image: "/branding-door-hq.png",
      alt: "Nyokolodi Transit Door Livery Close-up",
      tag: "Fleet Livery",
    },
    {
      id: "uniform",
      title: "Uniformed Chauffeur",
      subtitle: "People Places Possibilities attire",
      image: "/driver-uniforms-hq.png",
      alt: "Official Nyokolodi Transit Driver Uniform",
      tag: "Chauffeur Standards",
    },
  ];

  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const currentAngle = angles[activeAngleIndex];

  const handlePrev = () => {
    setActiveAngleIndex((prev) => (prev === 0 ? angles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveAngleIndex((prev) => (prev === angles.length - 1 ? 0 : prev + 1));
  };

  const specs = [
    { label: "Passengers", value: "Up to 4 Passengers", icon: <Users className="w-4 h-4 text-[#146C36]" /> },
    { label: "Luggage", value: "378L Boot Space (2 Large + 2 Cabin)", icon: <Briefcase className="w-4 h-4 text-[#146C36]" /> },
    { label: "Climate", value: "Dual-zone Air Conditioning", icon: <Wind className="w-4 h-4 text-[#146C36]" /> },
    { label: "Efficiency", value: "Fuel Efficient & Eco-friendly", icon: <Gauge className="w-4 h-4 text-[#146C36]" /> },
  ];

  const features = [
    "Climate Controlled Dual-Zone Air Conditioning",
    "Onboard USB Smartphone Fast Charging",
    "Daily Sanitized & Deep-Cleaned Interior",
    "Real-Time GPS Fleet Tracking & Speed Governance",
    "Complimentary Bottled Water for Airport Trips",
    "Luggage Assistance by Courteous Chauffeur",
  ];

  return (
    <section id="fleet" className="py-20 md:py-24 bg-[#F7FBF8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#199A3F] uppercase">
              OUR FLEET
            </span>
          </div>

          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Travel in Comfort
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            Our modern fleet of Suzuki Dzire vehicles offers a clean, comfortable
            and reliable travel experience &mdash; perfect for daily corporate
            commutes, airport transfers to OR Tambo and Lanseria, and executive travel across Gauteng.
          </p>
        </div>

        {/* Vehicle Showcase Card */}
        <div className="mt-12 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left: Vehicle Image & Gallery Controls */}
            <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 bg-gradient-to-br from-[#FAFDFB] to-gray-50 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
              {/* Main Photo Container */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-inner border border-gray-100 bg-white group">
                <Image
                  key={currentAngle.id}
                  src={currentAngle.image}
                  alt={currentAngle.alt}
                  fill
                  className="object-cover object-center transition-all duration-500 group-hover:scale-[1.02]"
                />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 bg-[#0E4D25] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 z-10">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{currentAngle.tag}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl text-white text-xs flex items-center justify-between z-10">
                  <span className="font-semibold">{currentAngle.title}</span>
                  <span className="text-emerald-300 text-[11px]">{currentAngle.subtitle}</span>
                </div>
              </div>

              {/* Angle Thumbnails & Carousel Arrows */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Thumbnails */}
                <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 no-scrollbar">
                  {angles.map((ang, i) => (
                    <button
                      key={ang.id}
                      onClick={() => setActiveAngleIndex(i)}
                      className={`relative w-16 h-11 sm:w-20 sm:h-12 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeAngleIndex === i
                          ? "border-[#146C36] ring-2 ring-emerald-500/30 scale-105"
                          : "border-transparent opacity-65 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={ang.image}
                        alt={ang.title}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Prev / Next controls */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous view"
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-[#146C36] hover:text-white hover:border-[#146C36] text-gray-700 flex items-center justify-center transition-all shadow-sm active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next view"
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-[#146C36] hover:text-white hover:border-[#146C36] text-gray-700 flex items-center justify-center transition-all shadow-sm active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Specifications & Amenities */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#199A3F] tracking-wide uppercase">
                  Featured Model
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                  Suzuki Dzire
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-emerald-800 mt-1">
                  Comfortable &bull; Fuel Efficient &bull; Reliable
                </p>

                <p className="text-xs sm:text-sm text-gray-600 mt-4 leading-relaxed">
                  Our flagship Suzuki Dzire sedans deliver high-efficiency comfort with
                  ergonomic seating, generous legroom, and modern safety features.
                  Perfect for executive airport runs, city business, and cross-district journeys.
                </p>

                {/* Key Specs Pills */}
                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  {specs.map((s, i) => (
                    <div
                      key={i}
                      className="bg-[#EAF7EE]/70 rounded-xl p-2.5 flex items-center gap-2 text-xs font-semibold text-gray-800"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-xs flex-shrink-0">
                        {s.icon}
                      </div>
                      <div className="truncate">
                        <p className="text-[10px] text-gray-500 font-medium uppercase">{s.label}</p>
                        <p className="text-xs font-bold text-gray-900 truncate">{s.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Vehicle Amenities Checklist */}
                <div className="mt-6 space-y-2 border-t border-gray-100 pt-5">
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                    Included Amenities:
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-gray-700"
                      >
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#146C36] flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Book CTA */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={onBookRideClick}
                  className="w-full bg-[#0E4D25] hover:bg-[#083E1A] text-white py-3.5 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group active:scale-95"
                >
                  <Zap className="w-4 h-4 text-emerald-300" />
                  <span>Book This Vehicle Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
