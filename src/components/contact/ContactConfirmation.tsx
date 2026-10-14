import { CheckCircle2, MessageSquare } from "lucide-react";
import { ContactSummary } from "@/lib/contact";
import Alert from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";

interface ContactConfirmationProps {
  summary: ContactSummary;
  onReset: () => void;
}

export default function ContactConfirmation({
  summary,
  onReset,
}: ContactConfirmationProps) {
  return (
    <div className="p-8 text-center bg-[#FAFDFB] border border-emerald-100 rounded-2xl">
      <div className="w-14 h-14 rounded-full bg-[#EAF7EE] text-[#146C36] flex items-center justify-center mx-auto mb-3">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <h4 className="text-lg font-bold text-gray-900">Message Sent!</h4>
      <p className="text-xs text-gray-600 mt-1">
        Thank you, {summary.name}. We&apos;ve emailed your message to our team
        and will get back to you shortly.
      </p>

      {summary.warning && (
        <div className="mt-3">
          <Alert>{summary.warning}</Alert>
        </div>
      )}

      <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
        <ButtonLink
          href={summary.whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          variant="whatsapp"
          className="py-2.5 px-5 text-xs"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Send via WhatsApp</span>
        </ButtonLink>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-bold text-[#146C36] hover:underline px-3 py-2.5"
        >
          Send another message
        </button>
      </div>
    </div>
  );
}
