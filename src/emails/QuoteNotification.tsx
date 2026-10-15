import { Section, Text } from "@react-email/components";
import type { QuoteNotification } from "@/lib/notification";
import { COLORS } from "./theme";
import { EmailLayout } from "./components/EmailLayout";
import { DetailsCard } from "./components/DetailsCard";
import { ActionButton } from "./components/ActionButton";
import { Badge } from "./components/Badge";
import { toWhatsAppNumber } from "./components/format";

export default function QuoteNotificationEmail(data: QuoteNotification) {
  const company = data.companyName || "Company";

  return (
    <EmailLayout
      preview={`New corporate quote request ${data.quoteId} from ${company}`}
      eyebrow="New Corporate Quote Request"
      heading={company}
      intro="A corporate quote request was submitted through the website. Reply to this email to reach the contact directly."
    >
      <Badge>{data.quoteId}</Badge>

      <DetailsCard
        items={[
          { label: "Company", value: data.companyName },
          { label: "Contact", value: data.contactName },
          { label: "Phone", value: data.phone },
          { label: "Email", value: data.email },
          { label: "Service", value: data.serviceType },
          { label: "Fleet Size", value: data.estimatedVehicles },
          { label: "Additional Details", value: data.notes, wide: true },
        ]}
      />

      <Section>
        <ActionButton
          href={`mailto:${data.email}?subject=${encodeURIComponent(
            `Your quote request ${data.quoteId}`
          )}`}
          label="Reply to contact"
          background={COLORS.brandDark}
        />
        <ActionButton
          href={`https://wa.me/${toWhatsAppNumber(data.phone)}`}
          label="WhatsApp contact"
          background={COLORS.whatsapp}
        />
        <ActionButton
          href={`tel:${data.phone.replace(/\s+/g, "")}`}
          label="Call contact"
          background={COLORS.footerBg}
          color={COLORS.brandDark}
        />
      </Section>
    </EmailLayout>
  );
}
