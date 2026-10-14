"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import Modal from "@/components/ui/Modal";
import ModalHeader from "@/components/ui/ModalHeader";
import { BookingSummary } from "@/lib/booking";
import BookingForm from "./BookingForm";
import BookingConfirmation from "./BookingConfirmation";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPickup?: string;
  initialDropoff?: string;
  initialService?: string;
}

export default function BookingModal({ isOpen, onClose, ...initial }: BookingModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-xl">
      <BookingModalContent onClose={onClose} {...initial} />
    </Modal>
  );
}

function BookingModalContent({
  onClose,
  initialPickup = "",
  initialDropoff = "",
  initialService = "airport",
}: Omit<BookingModalProps, "isOpen">) {
  const [summary, setSummary] = useState<BookingSummary | null>(null);

  if (summary) {
    return <BookingConfirmation summary={summary} onClose={onClose} />;
  }

  return (
    <>
      <ModalHeader
        eyebrow="Book a Shuttle"
        title="Reserve Your Ride"
        icon={<Calendar className="w-5 h-5 text-emerald-300" />}
      />
      <BookingForm
        initialService={initialService}
        initialPickup={initialPickup}
        initialDropoff={initialDropoff}
        onSuccess={setSummary}
      />
    </>
  );
}
