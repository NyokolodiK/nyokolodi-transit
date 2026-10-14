"use client";

import React, { useState } from "react";
import {
  X,
  FileText,
  Building2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("Corporate Employee Commute");
  const [estimatedVehicles, setEstimatedVehicles] = useState("1 - 2 Sedans");
  const [notes, setNotes] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteId(`QT-${Math.floor(10000 + Math.random() * 90000)}`);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#0E4D25] text-white flex items-center justify-center shadow-md">
                <FileText className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#199A3F] uppercase tracking-wider">
                  Corporate &amp; Group
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                  Request a Formal Quote
                </h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Company / Organization Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Corporate Head Office / Agency"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Thabo Nkosi"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Phone / WhatsApp (+27)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 082 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Official Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@company.co.za"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Service Required
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#146C36]"
                  >
                    <option value="Corporate Employee Commute">
                      Corporate Staff Commutes
                    </option>
                    <option value="VIP & Executive Chauffeur">
                      VIP &amp; Executive Chauffeur
                    </option>
                    <option value="Conference & Event Transport">
                      Conference &amp; Event Fleet
                    </option>
                    <option value="Long-term Dedicated Fleet">
                      Monthly Dedicated Vehicle Lease
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Fleet Size Needed
                  </label>
                  <select
                    value={estimatedVehicles}
                    onChange={(e) => setEstimatedVehicles(e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#146C36]"
                  >
                    <option value="1 - 2 Sedans">1 - 2 Suzuki Dzires</option>
                    <option value="3 - 5 Vehicles">3 - 5 Sedans</option>
                    <option value="Group Shuttle (Minibus)">
                      Group Shuttle (14 Seater)
                    </option>
                    <option value="Multi-vehicle Fleet">
                      Full Fleet (10+ Vehicles)
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Additional Details / Routing Needs
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your routes, schedule frequency, and billing preferences in South Africa..."
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0E4D25] hover:bg-[#083E1A] text-white py-3.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>Submit Quote Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#EAF7EE] text-[#146C36] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold text-[#199A3F] uppercase tracking-wider">
              Quote Request Logged
            </span>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              Thank You, {contactName}!
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-sm mx-auto">
              Our South African corporate logistics team will send a tailored
              proposal to <strong className="text-gray-900">{email}</strong> within 2 business hours.
            </p>

            <div className="mt-6 bg-[#FAFDFB] border border-emerald-100 rounded-2xl p-4 text-left max-w-md mx-auto text-xs space-y-1.5">
              <div className="flex justify-between font-bold">
                <span className="text-gray-500">Quote ID:</span>
                <span className="text-[#146C36]">{quoteId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Company:</span>
                <span className="font-semibold text-gray-900">{companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Service:</span>
                <span className="font-semibold text-gray-900">{serviceType}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-6 w-full py-3 rounded-full bg-[#146C36] text-white font-bold text-xs shadow-md"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
