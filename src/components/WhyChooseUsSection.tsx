"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Clock,
  UserCheck,
  Car,
  Tag,
  Sparkles,
  ShieldCheck,
  Shirt,
  Award,
} from "lucide-react";

export default function WhyChooseUsSection() {
  const [activeTab, setActiveTab] = useState<"car" | "uniform" | "branding">("car");

  const views = {
    car: {
      image: "/fleet-dzire-front-angle-clean.png",
      alt: "Nyokolodi Transit Suzuki Dzire Chauffeur Vehicle",
      caption: "More than just a ride — we connect people to possibilities.",
      label: "Suzuki Dzire Sedan",
      sublabel: "Comfortable, modern, daily-sanitized fleet",
    },
    uniform: {
      image: "/driver-uniforms-hq.png",
      alt: "Official Nyokolodi Transit Driver Uniforms",
      caption: "People. Places. Possibilities. — Professional Driver Attire",
      label: "Official Chauffeur Uniform",
      sublabel: "Vetted, polite, and uniformed drivers",
    },
    branding: {
      image: "/branding-door-hq.png",
      alt: "Nyokolodi Transit Vehicle Door Branding",
      caption: "Distinctive Nyokolodi livery for verified safety & trust.",
      label: "Verified Livery & Safety",
      sublabel: "Easy-to-identify corporate fleet wrapping",
    },
  };

  const currentView = views[activeTab];

  const features = [
    {
      title: "Reliable & Punctual",
      description: "We value your time.",
      icon: <Clock className="w-5 h-5 text-white" />,
      bg: "bg-[#0E4D25]",
    },
    {
      title: "Professional Drivers",
      description: "Trained, friendly and courteous.",
      icon: <UserCheck className="w-5 h-5 text-white" />,
      bg: "bg-[#0E4D25]",
    },
    {
      title: "Well-Maintained Fleet",
      description: "Clean, modern and comfortable.",
      icon: <Car className="w-5 h-5 text-white" />,
      bg: "bg-[#0E4D25]",
    },
    {
      title: "Affordable Rates",
      description: "Great value for every journey.",
      icon: <Tag className="w-5 h-5 text-white" />,
      bg: "bg-[#0E4D25]",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual: Interactive Picture Showcase */}
          <div className="lg:col-span-6 relative">
            {/* View Selector Pills */}
            <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => setActiveTab("car")}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all ${
                  activeTab === "car"
                    ? "bg-[#146C36] text-white shadow-md shadow-emerald-900/10"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Our Vehicles</span>
              </button>

              <button
                onClick={() => setActiveTab("uniform")}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all ${
                  activeTab === "uniform"
                    ? "bg-[#146C36] text-white shadow-md shadow-emerald-900/10"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Shirt className="w-3.5 h-3.5" />
                <span>Driver Uniforms</span>
              </button>

              <button
                onClick={() => setActiveTab("branding")}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all ${
                  activeTab === "branding"
                    ? "bg-[#146C36] text-white shadow-md shadow-emerald-900/10"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Fleet Branding</span>
              </button>
            </div>

            {/* Photo Card Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-[#FAFDFB] group">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/10]">
                <Image
                  key={activeTab}
                  src={currentView.image}
                  alt={currentView.alt}
                  fill
                  className="object-cover object-center transition-all duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Mockup Green Overlay Quote Badge */}
              <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 max-w-[290px] sm:max-w-[320px] bg-[#0A3D1E]/95 backdrop-blur-md rounded-2xl p-4 text-white shadow-xl border border-emerald-500/20">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                      {currentView.caption}
                    </p>
                    <div className="mt-2 h-0.5 w-10 bg-emerald-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-label bar */}
            <div className="mt-3 flex items-center justify-between px-2 text-xs text-gray-500">
              <span className="flex items-center gap-1.5 font-medium text-gray-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {currentView.label}
              </span>
              <span>Based in Centurion, Gauteng</span>
            </div>
          </div>

          {/* Right Content: Why Choose Us Copy & 2x2 Grid */}
          <div className="lg:col-span-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#199A3F] uppercase">
                WHY CHOOSE NYOKOLODI TRANSIT
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Your Trusted <br className="hidden sm:inline" />
              Travel Partner
            </h2>

            {/* Description */}
            <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
              We are committed to providing professional, reliable and affordable
              shuttle services with a focus on safety, comfort and customer
              satisfaction across Centurion, Pretoria, Johannesburg and wider Gauteng.
            </p>

            {/* 2x2 Features Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-3 rounded-2xl transition-all duration-200 hover:bg-[#FAFDFB]"
                >
                  <div
                    className={`w-11 h-11 rounded-2xl ${feature.bg} flex items-center justify-center flex-shrink-0 shadow-md`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust highlight pill */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3 text-xs text-gray-600">
              <ShieldCheck className="w-5 h-5 text-[#146C36] flex-shrink-0" />
              <span>
                All vehicles feature real-time GPS speed tracking, certified passenger liability insurance, and daily safety pre-checks.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
