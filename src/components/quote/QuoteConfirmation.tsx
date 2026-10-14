import { CheckCircle2, MessageSquare } from "lucide-react";
import { QuoteSummary } from "@/lib/quote";
import Alert from "@/components/ui/Alert";
import { Button, ButtonLink } from "@/components/ui/Button";

interface QuoteConfirmationProps {
  summary: QuoteSummary;
  onClose: () => void;
}

export default function QuoteConfirmation({ summary, onClose }: QuoteConfirmationProps) {
  return (
    <div className="text-center py-6">
      <div className="w-16 h-16 rounded-full bg-[#EAF7EE] text-[#146C36] flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <span className="text-xs font-bold text-[#199A3F] uppercase tracking-wider">
        Quote Request Logged
      </span>
      <h3 className="text-2xl font-black text-gray-900 mt-1">
        Thank You, {summary.contactName}!
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-sm mx-auto">
        We&apos;ve received your request and emailed it to our corporate desk.
        We&apos;ll reply to{" "}
        <strong className="text-gray-900">{summary.email}</strong> as soon as
        possible.
      </p>

      {summary.warning && (
        <div className="mt-3 max-w-md mx-auto">
          <Alert>{summary.warning}</Alert>
        </div>
      )}

      <div className="mt-6 bg-[#FAFDFB] border border-emerald-100 rounded-2xl p-4 text-left max-w-md mx-auto text-xs space-y-1.5">
        <div className="flex justify-between font-bold">
          <span className="text-gray-500">Quote ID:</span>
          <span className="text-[#146C36]">{summary.quoteId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Company:</span>
          <span className="font-semibold text-gray-900">{summary.companyName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Service:</span>
          <span className="font-semibold text-gray-900">{summary.serviceType}</span>
        </div>
      </div>

      <div className="mt-6 space-y-2.5 max-w-md mx-auto">
        <ButtonLink
          href={summary.whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          variant="whatsapp"
          className="w-full text-xs"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Send via WhatsApp</span>
        </ButtonLink>

        <Button
          type="button"
          variant="success"
          onClick={onClose}
          className="w-full py-3 text-xs"
        >
          Done
        </Button>
      </div>
    </div>
  );
}
