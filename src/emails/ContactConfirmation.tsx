import { Section, Text } from "@react-email/components";
import type { ContactNotification } from "@/lib/notification";
import { contactWhatsAppLink } from "@/lib/messages";
import { SITE } from "@/lib/site";
import { COLORS, FONT_STACK } from "./theme";
import { EmailLayout } from "./components/EmailLayout";
import { DetailsCard } from "./components/DetailsCard";
import { ActionButton } from "./components/ActionButton";
import { Badge } from "./components/Badge";

export default function ContactConfirmationEmail(data: ContactNotification) {
  const firstName = data.name.split(" ")[0] || data.name;

  return (
    <EmailLayout
      preview={`We've received your message, ${firstName}`}
      eyebrow="Message Received"
      heading={`Thanks, ${firstName}!`}
      intro="Your message has landed with our team. We usually reply within a few hours during the day, and always within one business day."
    >
      <Badge>We&apos;ll be in touch soon</Badge>

      <DetailsCard
        items={[
          { label: "Topic", value: data.subject },
          { label: "Your message", value: data.message, wide: true },
        ]}
      />

      <Text style={note}>
        Need a faster response? Message us on WhatsApp and we&apos;ll get back to
        you right away.
      </Text>

      <Section>
        <ActionButton
          href={contactWhatsAppLink({
            name: data.name,
            phone: data.phone,
            email: data.email,
            subject: data.subject,
            message: data.message,
          })}
          label="Chat on WhatsApp"
          background={COLORS.whatsapp}
        />
        <ActionButton
          href={`tel:${SITE.phoneE164}`}
          label={`Call us on ${SITE.phoneDisplay}`}
          background={COLORS.footerBg}
          color={COLORS.brandDark}
        />
      </Section>
    </EmailLayout>
  );
}

const note: React.CSSProperties = {
  margin: "0 0 22px",
  padding: "14px 16px",
  backgroundColor: COLORS.brandTint,
  borderRadius: "10px",
  color: COLORS.brandDark,
  fontSize: "13px",
  lineHeight: "1.55",
  fontFamily: FONT_STACK,
};
