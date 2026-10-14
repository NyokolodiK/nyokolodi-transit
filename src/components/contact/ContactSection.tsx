"use client";

import { useState } from "react";
import { ContactSummary } from "@/lib/contact";
import ContactInfoPanel from "./ContactInfoPanel";
import ContactForm from "./ContactForm";
import ContactConfirmation from "./ContactConfirmation";

export default function ContactSection() {
  const [summary, setSummary] = useState<ContactSummary | null>(null);
  const [formKey, setFormKey] = useState(0);

  const handleReset = () => {
    setSummary(null);
    setFormKey((key) => key + 1);
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
            an urgent transfer across Gauteng and greater South Africa? Reach out
            anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <ContactInfoPanel />
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-gray-100 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                Fill in the form below and our team will get back to you promptly.
              </p>

              {summary ? (
                <ContactConfirmation summary={summary} onReset={handleReset} />
              ) : (
                <ContactForm key={formKey} onSuccess={setSummary} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
