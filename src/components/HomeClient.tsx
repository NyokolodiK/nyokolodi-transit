"use client";

import React, { ReactNode, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuickServicesBar from "@/components/QuickServicesBar";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import FleetSection from "@/components/FleetSection";
import BrandExcellenceSection from "@/components/BrandExcellenceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/Footer";
import BookingModal from "@/components/booking/BookingModal";
import QuoteModal from "@/components/quote/QuoteModal";

interface HomeClientProps {
  popularRoutes: ReactNode;
}

export default function HomeClient({ popularRoutes }: HomeClientProps) {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // States to pre-populate booking modal
  const [bookingPickup, setBookingPickup] = useState("");
  const [bookingDropoff, setBookingDropoff] = useState("");
  const [bookingService, setBookingService] = useState("airport");

  const handleOpenBooking = (
    pickup: string = "",
    dropoff: string = "",
    service: string = "airport"
  ) => {
    setBookingPickup(pickup);
    setBookingDropoff(dropoff);
    setBookingService(service);
    setBookingModalOpen(true);
  };

  const handleSelectService = (serviceId: string) => {
    setBookingService(serviceId);
    setBookingModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#FAFDFB]">
      {/* Navigation Bar */}
      <Navbar onBookRideClick={() => handleOpenBooking()} />

      {/* Hero Section */}
      <HeroSection
        onBookRideClick={() => handleOpenBooking()}
        onGetQuoteClick={() => setQuoteModalOpen(true)}
      />

      {/* Floating Services Quick Bar */}
      <QuickServicesBar onSelectService={handleSelectService} />

      {/* Why Choose Us ("Your Trusted Travel Partner") */}
      <WhyChooseUsSection />

      {/* Our Fleet ("Travel in Comfort") */}
      <FleetSection onBookRideClick={() => handleOpenBooking()} />

      {/* Popular Shuttle Routes (server-rendered for SEO) */}
      {popularRoutes}

      {/* Brand Excellence & Standards Showcase */}
      <BrandExcellenceSection />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* Direct Contact & Support */}
      <ContactSection />

      {/* Footer */}
      <Footer onBookRideClick={() => handleOpenBooking()} />

      {/* Interactive Booking Wizard Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialPickup={bookingPickup}
        initialDropoff={bookingDropoff}
        initialService={bookingService}
      />

      {/* Interactive Quote Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </main>
  );
}
