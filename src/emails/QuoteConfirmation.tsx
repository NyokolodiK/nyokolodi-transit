import { Section, Text } from "@react-email/components";
import type { QuoteNotification } from "@/lib/notification";
import { quoteWhatsAppLink } from "@/lib/messages";
import { SITE } from "@/lib/site";
import { COLORS, FONT_STACK } from "./theme";
import { EmailLayout } from "./components/EmailLayout";
import { DetailsCard } from "./components/DetailsCard";
import { ActionButton } from "./components/ActionButton";
import { Badge } from "./components/Badge";
import { Steps } from "./components/Steps";

export default function QuoteConfirmationEmail(data: QuoteNotification) {
  const firstName = data.contactName.split(" ")[0] || data.contactName;

  return (
    <EmailLayout
      preview={`We've received your quote request ${data.quoteId}`}
      eyebrow="Quote Request Received"
      heading={`Thanks, ${firstName}!`}
      intro="We've received your corporate quote request. A member of our team will review your requirements and come back to you within one business day."
    >
      <Badge>{data.quoteId}</Badge>

      <DetailsCard
        items={[
          { label: "Company", value: data.companyName },
          { label: "Contact", value: data.contactName },
          { label: "Service", value: data.serviceType },
          { label: "Fleet Size", value: data.estimatedVehicles },
          { label: "Additional Details", value: data.notes, wide: true },
        ]}
      />

      <Text style={sectionLabel}>What happens next</Text>
      <Steps
        items={[
          "We review your fleet requirements and routes.",
          "You receive a tailored proposal with pricing.",
          "We lock in a schedule and account manager.",
        ]}
      />

      <Section>
        <ActionButton
          href={quoteWhatsAppLink({
            quoteId: data.quoteId,
            companyName: data.companyName,
            contactName: data.contactName,
            phone: data.phone,
            email: data.email,
            serviceType: data.serviceType,
            estimatedVehicles: data.estimatedVehicles,
            notes: data.notes,
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

const sectionLabel: React.CSSProperties = {
  margin: "4px 0 12px",
  color: COLORS.subtle,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  fontFamily: FONT_STACK,
};
