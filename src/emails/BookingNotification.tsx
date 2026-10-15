import { Section, Text } from "@react-email/components";
import type { BookingNotification } from "@/lib/notification";
import { COLORS, FONT_STACK } from "./theme";
import { EmailLayout } from "./components/EmailLayout";
import { DetailsCard } from "./components/DetailsCard";
import { ActionButton } from "./components/ActionButton";
import { Badge } from "./components/Badge";
import {
  formatTripDate,
  formatTripTime,
  pluralise,
  toWhatsAppNumber,
} from "./components/format";

export default function BookingNotificationEmail(data: BookingNotification) {
  const trip = `${data.pickup} → ${data.dropoff}`;
  const distanceLabel =
    typeof data.hours === "number"
      ? `${data.hours} hour charter`
      : typeof data.distanceKm === "number"
        ? `${data.distanceKm} km`
        : undefined;

  const customerWhatsApp = `https://wa.me/${toWhatsAppNumber(data.phone)}`;

  return (
    <EmailLayout
      preview={`New booking ${data.reference}: ${trip}`}
      eyebrow="New Booking Request"
      heading={trip}
      intro="A new booking was submitted through the website. Reply to this email to reach the customer directly."
    >
      <Badge>{data.reference}</Badge>

      <DetailsCard
        items={[
          { label: "Service", value: data.service },
          { label: "Pickup", value: data.pickup, wide: true },
          { label: "Drop-off", value: data.dropoff, wide: true },
          { label: "Date", value: formatTripDate(data.date) },
          { label: "Time", value: formatTripTime(data.time) },
          { label: "Vehicle", value: data.vehicle },
          { label: "Passengers", value: pluralise(Number(data.passengers) || 0, "passenger") },
          { label: "Luggage", value: pluralise(Number(data.luggage) || 0, "item") },
          { label: "Distance", value: distanceLabel },
          { label: "Flight Number", value: data.flightNumber },
        ]}
        footer={{ label: "Estimated Fare", value: data.fare }}
      />

      <Text style={sectionLabel}>Customer contact</Text>
      <DetailsCard
        items={[
          { label: "Name", value: data.name },
          { label: "Phone", value: data.phone },
          { label: "Email", value: data.email },
        ]}
      />

      <Section>
        <ActionButton
          href={`mailto:${data.email}?subject=${encodeURIComponent(
            `Your booking ${data.reference} – ${trip}`
          )}`}
          label="Reply to customer"
          background={COLORS.brandDark}
        />
        <ActionButton
          href={customerWhatsApp}
          label="WhatsApp customer"
          background={COLORS.whatsapp}
        />
        <ActionButton
          href={`tel:${data.phone.replace(/\s+/g, "")}`}
          label="Call customer"
          background={COLORS.footerBg}
          color={COLORS.brandDark}
        />
      </Section>
    </EmailLayout>
  );
}

const sectionLabel: React.CSSProperties = {
  margin: "0 0 10px",
  color: COLORS.subtle,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  fontFamily: FONT_STACK,
};
