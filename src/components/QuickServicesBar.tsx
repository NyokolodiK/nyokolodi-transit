"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Plane,
  MapPin,
  CalendarDays,
  ChevronRight,
  CheckCircle2,
  X,
  ArrowRight,
} from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  highlights: string[];
  idealFor: string;
}

interface QuickServicesBarProps {
  onSelectService: (serviceId: string) => void;
}

export const servicesData: ServiceItem[] = [
  {
    id: "corporate",
    title: "Corporate Shuttles",
    subtitle: "Transport solutions for businesses",
    icon: <Briefcase className="w-5 h-5 text-[#146C36]" />,
    description:
      "Reliable and professional employee commutes, executive client transfers, and corporate account billing tailored for companies across Centurion, Pretoria, Sandton, Rosebank and Johannesburg.",
    highlights: [
      "Dedicated corporate monthly billing & invoicing",
      "Executive Suzuki Dzire sedans with Wi-Fi & AC",
      "Consistent schedule & live driver tracking",
      "Professional, vetted, and courteous chauffeurs",
    ],
    idealFor: "Corporate firms, financial institutions, and business delegates in Gauteng.",
  },
  {
    id: "airport",
    title: "Airport Transfers",
    subtitle: "On-time, stress-free travel",
    icon: <Plane className="w-5 h-5 text-[#146C36]" />,
    description:
      "Seamless door-to-terminal transfers to and from OR Tambo International (JNB) and Lanseria International Airport (HLA) with complimentary live flight delay tracking.",
    highlights: [
      "Complimentary flight monitoring for delay protection",
      "Meet & Greet terminal greeting with passenger name-board",
      "Assistance with luggage loading and unloading",
      "Fixed rates with no surge pricing",
    ],
    idealFor: "Business travelers, international guests, and holiday travelers.",
  },
  {
    id: "intercity",
    title: "Local & Intercity Transport",
    subtitle: "Across Gauteng and beyond",
    icon: <MapPin className="w-5 h-5 text-[#146C36]" />,
    description:
      "Comfortable long-distance and metropolitan shuttle connections between Centurion, Pretoria, Johannesburg, Sun City, Rustenburg, and countrywide.",
    highlights: [
      "Comfortable air-conditioned long-haul rides",
      "Door-to-door pickup and drop-off anywhere in Gauteng",
      "Rest stops at clean highway service stations",
      "Fuel-efficient modern Suzuki Dzire fleet",
    ],
    idealFor: "Intercity commuters, family travel, and regional corporate charters.",
  },
  {
    id: "events",
    title: "Events & Special Transport",
    subtitle: "Group travel made easy",
    icon: <CalendarDays className="w-5 h-5 text-[#146C36]" />,
    description:
      "Organized transportation logistics for weddings, conferences, sporting events, concerts, funerals, and weekend group excursions.",
    highlights: [
      "Coordinated multi-vehicle fleets on standby",
      "Custom point-to-point itineraries",
      "Designated event driver coordination",
      "Flexible hourly or daily charter rates",
    ],
    idealFor: "Conferences, weddings, tourist groups, and VIP delegations.",
  },
];

export default function QuickServicesBar({
  onSelectService,
}: QuickServicesBarProps) {
  const [activeModalService, setActiveModalService] =
    useState<ServiceItem | null>(null);

  return (
    <section id="services" className="relative -mt-6 sm:-mt-8 z-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Section Header */}
        <div className="md:hidden mb-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-6 bg-[#199A3F] rounded-full" />
            <h3 className="text-xs font-bold text-[#146C36] tracking-wider uppercase">
              OUR SERVICES
            </h3>
          </div>
        </div>

        {/* Services Grid Card / Floating Panel */}
        <div className="bg-white rounded-3xl p-3 sm:p-5 shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {servicesData.map((service, index) => (
              <div
                key={service.id}
                onClick={() => setActiveModalService(service)}
                className={`group p-4 rounded-2xl hover:bg-[#F4FBF6] transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  index !== 0 ? "pt-4 sm:pt-4" : ""
                }`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Service Icon */}
                  <div className="w-11 h-11 rounded-full bg-[#EAF7EE] group-hover:bg-[#146C36] group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-200 shadow-sm">
                    <span className="group-hover:text-white transition-colors duration-200">
                      {React.cloneElement(service.icon as React.ReactElement, {
                        className:
                          "w-5 h-5 text-[#146C36] group-hover:text-white transition-colors",
                      })}
                    </span>
                  </div>

                  {/* Service Text */}
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#146C36] transition-colors leading-tight">
                      {service.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Arrow Chevron */}
                <div className="w-7 h-7 rounded-full bg-gray-50 group-hover:bg-white flex items-center justify-center text-gray-400 group-hover:text-[#146C36] transition-all duration-200 flex-shrink-0 ml-2 group-hover:translate-x-0.5 shadow-sm">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF7EE] text-[#146C36] flex items-center justify-center">
                {activeModalService.icon}
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#199A3F] uppercase tracking-wider">
                  Service Overview
                </span>
                <h3 className="text-xl font-bold text-gray-900">
                  {activeModalService.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              {activeModalService.description}
            </p>

            <div className="bg-[#FAFDFB] rounded-2xl p-4 border border-emerald-50 mb-5">
              <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
                Key Benefits &amp; Features:
              </h5>
              <div className="space-y-2">
                {activeModalService.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#199A3F] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-500 mb-6">
              <span className="font-semibold text-gray-700">Ideal For: </span>
              {activeModalService.idealFor}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const id = activeModalService.id;
                  setActiveModalService(null);
                  onSelectService(id);
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-[#146C36] hover:bg-[#0E4D25] text-white py-3 px-5 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveModalService(null)}
                className="px-5 py-3 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
