import type { ReactElement } from "react";
import { render } from "@react-email/render";
import { Resend } from "resend";
import { SITE } from "./site";
import type {
  BookingNotification,
  ContactNotification,
  NotificationPayload,
  QuoteNotification,
} from "./notification";
import BookingNotificationEmail from "@/emails/BookingNotification";
import BookingConfirmationEmail from "@/emails/BookingConfirmation";
import QuoteNotificationEmail from "@/emails/QuoteNotification";
import QuoteConfirmationEmail from "@/emails/QuoteConfirmation";
import ContactNotificationEmail from "@/emails/ContactNotification";
import ContactConfirmationEmail from "@/emails/ContactConfirmation";

interface SendResult {
  ok: boolean;
  error?: string;
}

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  return apiKey ? new Resend(apiKey) : null;
}

function getFrom(): string {
  return process.env.BOOKINGS_FROM_EMAIL || `${SITE.name} <${SITE.bookingsEmail}>`;
}

function getBusinessRecipients(): string[] {
  return (process.env.NOTIFICATIONS_EMAIL || SITE.notificationsEmail)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function buildBusinessEmail(payload: NotificationPayload): {
  subject: string;
  element: ReactElement;
} {
  if (payload.type === "booking") {
    return {
      subject: `New Booking ${payload.reference}: ${payload.pickup} → ${payload.dropoff}`,
      element: <BookingNotificationEmail {...payload} />,
    };
  }

  if (payload.type === "quote") {
    return {
      subject: `Corporate Quote Request ${payload.quoteId}: ${payload.companyName}`,
      element: <QuoteNotificationEmail {...payload} />,
    };
  }

  return {
    subject: `Website Message (${payload.subject}) from ${payload.name}`,
    element: <ContactNotificationEmail {...payload} />,
  };
}

function buildCustomerEmail(payload: NotificationPayload): {
  subject: string;
  element: ReactElement;
} | null {
  if (!payload.email) return null;

  if (payload.type === "booking") {
    return {
      subject: `Booking received — ${payload.reference} | ${SITE.name}`,
      element: <BookingConfirmationEmail {...payload} />,
    };
  }

  if (payload.type === "quote") {
    return {
      subject: `Quote request received — ${payload.quoteId} | ${SITE.name}`,
      element: <QuoteConfirmationEmail {...payload} />,
    };
  }

  return {
    subject: `We received your message | ${SITE.name}`,
    element: <ContactConfirmationEmail {...payload} />,
  };
}

/**
 * Sends the internal notification email to the business inboxes.
 */
export async function sendNotification(
  payload: NotificationPayload
): Promise<SendResult> {
  const resend = getResend();
  if (!resend) {
    return {
      ok: false,
      error: "Email service is not configured (missing RESEND_API_KEY).",
    };
  }

  const recipients = getBusinessRecipients();
  if (recipients.length === 0) {
    return { ok: false, error: "No notification recipients configured." };
  }

  const { subject, element } = buildBusinessEmail(payload);
  const html = await render(element);

  const { error } = await resend.emails.send({
    from: getFrom(),
    to: recipients,
    subject,
    html,
    ...(payload.email ? { replyTo: payload.email } : {}),
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

/**
 * Sends a branded confirmation email back to the person who submitted
 * the form. Failures here are non-fatal to the request.
 */
export async function sendCustomerConfirmation(
  payload: NotificationPayload
): Promise<SendResult> {
  const built = buildCustomerEmail(payload);
  if (!built) {
    return { ok: false, error: "No customer email address provided." };
  }

  const resend = getResend();
  if (!resend) {
    return {
      ok: false,
      error: "Email service is not configured (missing RESEND_API_KEY).",
    };
  }

  const html = await render(built.element);

  const { error } = await resend.emails.send({
    from: getFrom(),
    to: payload.email,
    subject: built.subject,
    html,
    replyTo: SITE.bookingsEmail,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
