"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { SITE } from "@/lib/site";

interface FooterProps {
  onBookRideClick: () => void;
}

export default function Footer({ onBookRideClick }: FooterProps) {
  return (
    <footer className="bg-[#072B15] text-white pt-16 pb-12 border-t-4 border-[#199A3F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="relative h-12 w-48 bg-white rounded-2xl p-2 inline-flex items-center shadow-md">
              <Image
                src="/logo-transparent.png"
                alt="Nyokolodi Transit"
                fill
                className="object-contain object-left px-2"
              />
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-sm">
              Safe. Comfortable. Affordable. Dependable shuttle service across
              Gauteng and greater South Africa for airport transfers, corporate
              contracts, and intercity journeys.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Registered, Licensed &amp; Fully Insured Chauffeur Service</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/70">
              <li>
                <Link
                  href="#home"
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#fleet"
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Our Fleet</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Why Choose Us</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Testimonials</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services List */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/70">
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-emerald-500" />
                <span>Airport Transfers (CPT, JNB, HLA, DUR)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-emerald-500" />
                <span>Corporate Staff &amp; Executive Commutes</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-emerald-500" />
                <span>Intercity &amp; Long-Distance Transit</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-emerald-500" />
                <span>Conferences &amp; Event Transport Logistics</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-emerald-500" />
                <span>Full Day Executive Chauffeur Hire</span>
              </li>
            </ul>
          </div>

          {/* Fast Contact & Book */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              24/7 Operations
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-100/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{SITE.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>{SITE.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Centurion, Gauteng &amp; Regional Routes</span>
              </div>
            </div>

            <button
              onClick={onBookRideClick}
              className="w-full flex items-center justify-center gap-2 bg-[#199A3F] hover:bg-[#15803d] text-white py-2.5 px-4 rounded-full text-xs font-bold shadow-md transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4 text-emerald-200" />
              <span>Book a Ride Online</span>
            </button>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-100/50 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Nyokolodi Transit (Pty) Ltd. All
            rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-emerald-200 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-emerald-200 cursor-pointer">
              Terms of Carriage
            </span>
            <span className="hover:text-emerald-200 cursor-pointer">
              Passenger Safety
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
