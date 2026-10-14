"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuickServicesBar from "@/components/QuickServicesBar";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import FleetSection from "@/components/FleetSection";
import BrandExcellenceSection from "@/components/BrandExcellenceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import QuoteModal from "@/components/QuoteModal";

export default function Home() {
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

  const handleBookWithRoute = (pickup: string, dropoff: string) => {
    setBookingPickup(pickup);
    setBookingDropoff(dropoff);
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
