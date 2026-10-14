"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPickup?: string;
  initialDropoff?: string;
  initialService?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialPickup = "",
  initialDropoff = "",
  initialService = "airport",
}: BookingModalProps) {
  const [tripType, setTripType] = useState<string>(
    initialService || "airport"
  );
  const [pickup, setPickup] = useState<string>(
    initialPickup || "Cape Town Int. Airport (CPT)"
  );
  const [dropoff, setDropoff] = useState<string>(
    initialDropoff || "Cape Town CBD / V&A Waterfront"
  );
  const [pickupDate, setPickupDate] = useState<string>("");
  const [pickupTime, setPickupTime] = useState<string>("09:00");
  const [passengers, setPassengers] = useState<number>(1);
  const [luggage, setLuggage] = useState<number>(1);
  const [vehicle, setVehicle] = useState<string>("Suzuki Dzire (Sedan)");

  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [flightNumber, setFlightNumber] = useState<string>("");

  const [step, setStep] = useState<"details" | "confirmation">("details");
  const [bookingRef, setBookingRef] = useState<string>("");

  if (!isOpen) return null;

  // Calculate estimated fare in South African Rand (R)
  const getEstimatedFare = () => {
    let base = 380;
    if (pickup.includes("Stellenbosch") || dropoff.includes("Stellenbosch")) {
      base = 650;
    } else if (pickup.includes("JNB") || dropoff.includes("JNB")) {
      base = 420;
    } else if (pickup.includes("Pretoria") || dropoff.includes("Pretoria")) {
      base = 680;
    } else if (pickup.includes("CPT") || dropoff.includes("CPT")) {
      base = 380;
    } else if (tripType === "hourly") {
      base = 1850;
    } else {
      base = 320;
    }

    return `R ${base}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `NYO-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setStep("confirmation");
  };

  const generateWhatsAppLink = () => {
    const text = `Hello Nyokolodi Transit, I would like to confirm my booking:
- Reference: ${bookingRef}
- Name: ${customerName}
- Phone: ${customerPhone}
- Route: ${pickup} to ${dropoff}
- Date & Time: ${pickupDate || "As soon as possible"} at ${pickupTime}
- Passengers: ${passengers} (${vehicle})
- Estimated Fare: ${getEstimatedFare()}`;
    return `https://wa.me/27820000000?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === "details" ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#0E4D25] text-white flex items-center justify-center shadow-md">
                <Calendar className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#199A3F] uppercase tracking-wider">
                  Book a Shuttle
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                  Reserve Your Ride
                </h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Type Buttons */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Service Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "airport", label: "Airport Transfer" },
                    { id: "corporate", label: "Corporate" },
                    { id: "intercity", label: "Intercity" },
                    { id: "hourly", label: "Day Charter" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setTripType(cat.id)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                        tripType === cat.id
                          ? "bg-[#146C36] text-white border-[#146C36] shadow-sm"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pickup & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="e.g. Cape Town Int Airport or Sandton"
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Drop-off Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-emerald-800 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      placeholder="e.g. V&A Waterfront or Rosebank"
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Pickup Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Pickup Time
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="time"
                      required
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                    />
                  </div>
                </div>
              </div>

              {/* Passengers, Luggage & Vehicle */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                    Passengers
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#146C36]"
                  >
                    {[1, 2, 3, 4, 6, 8, 12, 14].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "person" : "people"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                    Luggage Bags
                  </label>
                  <select
                    value={luggage}
                    onChange={(e) => setLuggage(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#146C36]"
                  >
                    {[0, 1, 2, 3, 4, 6, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "bag" : "bags"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                    Vehicle Type
                  </label>
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#146C36]"
                  >
                    <option value="Suzuki Dzire (Sedan)">Suzuki Dzire (1-4 pass)</option>
                    <option value="Executive Group Shuttle (Minibus)">
                      Group Shuttle (5-14 pass)
                    </option>
                  </select>
                </div>
              </div>

              {/* Passenger Contact Information */}
              <div className="pt-3 border-t border-gray-100 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sipho Ndlovu"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      WhatsApp / Phone (+27)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 082 123 4567"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                    />
                  </div>
                </div>

                {tripType === "airport" && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Flight Number (Optional for arrival tracking)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. FA 102 or SA 324"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                    />
                  </div>
                )}
              </div>

              {/* Rate Preview Banner */}
              <div className="bg-[#FAFDFB] rounded-2xl p-3.5 border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-gray-500 uppercase">
                    Estimated Fixed Fare
                  </span>
                  <p className="text-xl font-black text-[#146C36]">
                    {getEstimatedFare()}
                  </p>
                </div>
                <div className="text-right text-[11px] text-gray-500">
                  <span className="block font-medium text-emerald-800">
                    No hidden extras
                  </span>
                  <span>Pay cash, Card, or EFT</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#0E4D25] hover:bg-[#083E1A] text-white py-3.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>Confirm &amp; Generate Booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#EAF7EE] text-[#146C36] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold text-[#199A3F] uppercase tracking-wider">
              Booking Received
            </span>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              Thank You, {customerName}!
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-sm mx-auto">
              Your shuttle reservation has been recorded. Our South African
              dispatch team is ready to assist you.
            </p>

            {/* Ticket Card */}
            <div className="mt-6 bg-[#FAFDFB] border border-emerald-100 rounded-2xl p-4 text-left space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-xs text-gray-500 font-semibold uppercase">
                  Booking Reference
                </span>
                <span className="text-sm font-black text-[#146C36]">
                  {bookingRef}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Pickup:</span>
                <span className="font-semibold text-gray-900">{pickup}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Destination:</span>
                <span className="font-semibold text-gray-900">{dropoff}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Time &amp; Date:</span>
                <span className="font-semibold text-gray-900">
                  {pickupDate || "Today"} @ {pickupTime}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Vehicle Assigned:</span>
                <span className="font-semibold text-gray-900">{vehicle}</span>
              </div>
              <div className="flex justify-between text-xs pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-bold">Estimated Total:</span>
                <span className="font-black text-emerald-800 text-sm">
                  {getEstimatedFare()}
                </span>
              </div>
            </div>

            {/* WhatsApp Direct Action */}
            <div className="mt-6 space-y-2.5">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 rounded-full font-bold text-sm shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm Instantly via WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setStep("details");
                  onClose();
                }}
                className="w-full py-2.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
