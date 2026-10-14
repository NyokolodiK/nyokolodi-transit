"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#199A3F] uppercase">
              GET IN TOUCH
            </span>
          </div>

          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Contact Nyokolodi Transit
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Have questions about our shuttle routes, corporate accounts, or need
            an urgent transfer across Gauteng and greater South Africa? Reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAFDFB] rounded-3xl p-7 border border-emerald-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Direct Contact Information
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF7EE] text-[#146C36] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">
                      Call Us (24/7 Dispatch)
                    </p>
                    <a
                      href="tel:+27820000000"
                      className="text-sm sm:text-base font-bold text-gray-900 hover:text-[#146C36] transition-colors"
                    >
                      +27 (0) 82 000 0000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF7EE] text-[#25D366] flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">
                      WhatsApp Quick Booking
                    </p>
                    <a
                      href="https://wa.me/27820000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-bold text-gray-900 hover:text-[#146C36] transition-colors"
                    >
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF7EE] text-[#146C36] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">
                      Email Inquiries
                    </p>
                    <a
                      href="mailto:info@nyokoloditransit.com"
                      className="text-sm sm:text-base font-bold text-gray-900 hover:text-[#146C36] transition-colors"
                    >
                      info@nyokoloditransit.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF7EE] text-[#146C36] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">
                      Operational Headquarters &amp; Hubs
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      Centurion, Gauteng &amp; Regional Routes
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF7EE] text-[#146C36] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase">
                      Operating Hours
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      24 Hours / 7 Days a Week (Pre-booked rides)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-gray-100 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                Fill in the form below and our team will get back to you promptly.
              </p>

              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kagiso Nyokolodi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 082 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@domain.co.za"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Topic
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Airport Transfer">Airport Transfer</option>
                        <option value="Corporate Account">Corporate Account</option>
                        <option value="Lost Property">Lost Property</option>
                        <option value="Feedback / Compliment">Feedback / Compliment</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="How can we assist you with your journey today?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#146C36]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 bg-[#146C36] hover:bg-[#0E4D25] text-white py-3 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="p-8 text-center bg-[#FAFDFB] border border-emerald-100 rounded-2xl">
                  <div className="w-14 h-14 rounded-full bg-[#EAF7EE] text-[#146C36] flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Thank you, {name}. A member of our support team will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 text-xs font-bold text-[#146C36] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
