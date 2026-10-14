import { CheckCircle2, MessageSquare } from "lucide-react";
import { BookingSummary } from "@/lib/booking";
import Alert from "@/components/ui/Alert";
import { Button, ButtonLink } from "@/components/ui/Button";

interface BookingConfirmationProps {
  summary: BookingSummary;
  onClose: () => void;
}

export default function BookingConfirmation({
  summary,
  onClose,
}: BookingConfirmationProps) {
  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 rounded-full bg-[#EAF7EE] text-[#146C36] flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <span className="text-xs font-bold text-[#199A3F] uppercase tracking-wider">
        Booking Received
      </span>
      <h3 className="text-2xl font-black text-gray-900 mt-1">
        Thank You, {summary.name}!
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-sm mx-auto">
        Your shuttle reservation has been recorded and emailed to our dispatch
        team. Tap below to confirm instantly on WhatsApp.
      </p>

      {summary.warning && (
        <div className="mt-3 max-w-md mx-auto">
          <Alert>{summary.warning}</Alert>
        </div>
      )}

      <div className="mt-6 bg-[#FAFDFB] border border-emerald-100 rounded-2xl p-4 text-left space-y-2.5 max-w-md mx-auto">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <span className="text-xs text-gray-500 font-semibold uppercase">
            Booking Reference
          </span>
          <span className="text-sm font-black text-[#146C36]">{summary.reference}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Pickup:</span>
          <span className="font-semibold text-gray-900">{summary.pickup}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Destination:</span>
          <span className="font-semibold text-gray-900">{summary.dropoff}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Time &amp; Date:</span>
          <span className="font-semibold text-gray-900">
            {summary.date || "Today"} @ {summary.time}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Vehicle Assigned:</span>
          <span className="font-semibold text-gray-900">{summary.vehicleLabel}</span>
        </div>
        <div className="flex justify-between text-xs pt-2 border-t border-gray-100">
          <span className="text-gray-500 font-bold">Estimated Total:</span>
          <span className="font-black text-emerald-800 text-sm">{summary.fareDisplay}</span>
        </div>
      </div>

      <div className="mt-6 space-y-2.5">
        <ButtonLink
          href={summary.whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          variant="whatsapp"
          className="w-full text-sm"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Confirm Instantly via WhatsApp</span>
        </ButtonLink>

        <Button
          type="button"
          variant="secondary"
          onClick={onClose}
          className="w-full py-2.5 text-xs"
        >
          Close Window
        </Button>
      </div>
    </div>
  );
}
