import { Section, Text } from "@react-email/components";
import type { ContactNotification } from "@/lib/notification";
import { COLORS } from "./theme";
import { EmailLayout } from "./components/EmailLayout";
import { DetailsCard } from "./components/DetailsCard";
import { ActionButton } from "./components/ActionButton";
import { Badge } from "./components/Badge";
import { toWhatsAppNumber } from "./components/format";

export default function ContactNotificationEmail(data: ContactNotification) {
  const topic = data.subject || "General Inquiry";

  return (
    <EmailLayout
      preview={`New website message (${topic}) from ${data.name}`}
      eyebrow="New Website Message"
      heading={topic}
      intro="A new message was submitted through the website contact form. Reply directly to this email to reach them."
    >
      <Badge>{data.name}</Badge>

      <DetailsCard
        items={[
          { label: "Name", value: data.name },
          { label: "Phone", value: data.phone },
          { label: "Email", value: data.email },
          { label: "Topic", value: data.subject },
          { label: "Message", value: data.message, wide: true },
        ]}
      />

      <Section>
        <ActionButton
          href={`mailto:${data.email}?subject=${encodeURIComponent(
            `Re: ${topic}`
          )}`}
          label="Reply by email"
          background={COLORS.brandDark}
        />
        <ActionButton
          href={`https://wa.me/${toWhatsAppNumber(data.phone)}`}
          label="WhatsApp"
          background={COLORS.whatsapp}
        />
        <ActionButton
          href={`tel:${data.phone.replace(/\s+/g, "")}`}
          label="Call"
          background={COLORS.footerBg}
          color={COLORS.brandDark}
        />
      </Section>
    </EmailLayout>
  );
}
