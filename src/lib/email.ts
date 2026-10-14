import { Resend } from "resend";
import { SITE } from "./site";

interface SendNotificationParams {
  subject: string;
  html: string;
  replyTo?: string;
}

interface SendNotificationResult {
  ok: boolean;
  error?: string;
}

export async function sendNotification({
  subject,
  html,
  replyTo,
}: SendNotificationParams): Promise<SendNotificationResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      error: "Email service is not configured (missing RESEND_API_KEY).",
    };
  }

  const from = process.env.BOOKINGS_FROM_EMAIL || `Nyokolodi Transit <${SITE.bookingsEmail}>`;
  const recipients = (process.env.NOTIFICATIONS_EMAIL || SITE.notificationsEmail)
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    return { ok: false, error: "No notification recipients configured." };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: recipients,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function renderRows(rows: Array<{ label: string; value: unknown }>): string {
  return rows
    .filter((row) => row.value !== undefined && row.value !== null && row.value !== "")
    .map(
      (row) => `
        <tr>
          <td style="padding:6px 12px;font-weight:600;color:#374151;white-space:nowrap;vertical-align:top;">${escapeHtml(
            row.label
          )}</td>
          <td style="padding:6px 12px;color:#111827;">${escapeHtml(row.value)}</td>
        </tr>`
    )
    .join("");
}

export function emailShell(title: string, intro: string, rowsHtml: string): string {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;">
      <div style="background:#0E4D25;padding:20px 24px;">
        <h1 style="margin:0;color:#ffffff;font-size:18px;">Nyokolodi Transit</h1>
        <p style="margin:4px 0 0;color:#86efac;font-size:12px;">${escapeHtml(
          SITE.tagline
        )}</p>
      </div>
      <div style="padding:24px;">
        <h2 style="margin:0 0 8px;color:#111827;font-size:16px;">${escapeHtml(title)}</h2>
        <p style="margin:0 0 16px;color:#4b5563;font-size:13px;">${escapeHtml(intro)}</p>
        <table style="width:100%;border-collapse:collapse;background:#FAFDFB;border:1px solid #d1fae5;border-radius:8px;">
          ${rowsHtml}
        </table>
      </div>
      <div style="padding:16px 24px;background:#f9fafb;color:#6b7280;font-size:11px;">
        Sent automatically from the ${escapeHtml(SITE.name)} website.
      </div>
    </div>`;
}
