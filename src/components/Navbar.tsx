"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Menu, X, Phone, MessageSquare } from "lucide-react";

interface NavbarProps {
  onBookRideClick: () => void;
}

export default function Navbar({ onBookRideClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["home", "services", "fleet", "about", "testimonials", "contact"];
      const scrollPos = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Our Fleet", href: "#fleet", id: "fleet" },
    { label: "About Us", href: "#about", id: "about" },
    { label: "Testimonials", href: "#testimonials", id: "testimonials" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-white/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-2 group">
            <div className="relative h-11 w-44 sm:h-12 sm:w-48 transition-transform duration-200 group-hover:scale-[1.02]">
              <Image
                src="/logo-transparent.png"
                alt="Nyokolodi Transit"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                    isActive
                      ? "text-[#146C36] font-semibold"
                      : "text-gray-700 hover:text-[#146C36]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#146C36] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBookRideClick}
              className="inline-flex items-center gap-2 bg-[#0E4D25] hover:bg-[#09391A] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <Calendar className="w-4 h-4 text-emerald-300" />
              <span>Book a Ride</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="px-5 pt-3 pb-6 space-y-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "text-[#146C36] bg-emerald-50/70 font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#146C36]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-gray-100 space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookRideClick();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#0E4D25] text-white py-3 rounded-full text-base font-medium shadow-md"
              >
                <Calendar className="w-5 h-5 text-emerald-300" />
                <span>Book a Ride</span>
              </button>

              <div className="flex gap-2 pt-1">
                <a
                  href="tel:+27820000000"
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-full text-xs font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-[#146C36]" />
                  <span>Call Us</span>
                </a>
                <a
                  href="https://wa.me/27820000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-100/70 hover:bg-emerald-200 text-[#0E4D25] py-2.5 rounded-full text-xs font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#146C36]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
