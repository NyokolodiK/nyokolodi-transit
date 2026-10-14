"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import Modal from "@/components/ui/Modal";
import ModalHeader from "@/components/ui/ModalHeader";
import { QuoteSummary } from "@/lib/quote";
import QuoteForm from "./QuoteForm";
import QuoteConfirmation from "./QuoteConfirmation";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg">
      <QuoteModalContent onClose={onClose} />
    </Modal>
  );
}

function QuoteModalContent({ onClose }: { onClose: () => void }) {
  const [summary, setSummary] = useState<QuoteSummary | null>(null);

  if (summary) {
    return <QuoteConfirmation summary={summary} onClose={onClose} />;
  }

  return (
    <>
      <ModalHeader
        eyebrow="Corporate & Group"
        title="Request a Formal Quote"
        icon={<FileText className="w-5 h-5 text-emerald-300" />}
      />
      <QuoteForm onSuccess={setSummary} />
    </>
  );
}
