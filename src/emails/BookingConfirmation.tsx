import { Section, Text } from "@react-email/components";
import type { BookingNotification } from "@/lib/notification";
import { bookingWhatsAppLink } from "@/lib/messages";
import { SITE } from "@/lib/site";
import { COLORS, FONT_STACK } from "./theme";
import { EmailLayout } from "./components/EmailLayout";
import { DetailsCard } from "./components/DetailsCard";
import { ActionButton } from "./components/ActionButton";
import { Badge } from "./components/Badge";
import { Steps } from "./components/Steps";
import {
  formatTripDate,
  formatTripTime,
  pluralise,
} from "./components/format";

export default function BookingConfirmationEmail(data: BookingNotification) {
  const trip = `${data.pickup} → ${data.dropoff}`;
  const distanceLabel =
    typeof data.hours === "number"
      ? `${data.hours} hour charter`
      : typeof data.distanceKm === "number"
        ? `${data.distanceKm} km`
        : undefined;

  const firstName = data.name.split(" ")[0] || data.name;

  return (
    <EmailLayout
      preview={`We've received your booking ${data.reference}`}
      eyebrow="Booking Received"
      heading={`Thank you, ${firstName}!`}
      intro={`Your shuttle request has been received. Our dispatch team is checking availability and will confirm your booking shortly — you don't need to do anything else.`}
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

      <Text style={sectionLabel}>What happens next</Text>
      <Steps
        items={[
          "We review your route and confirm vehicle availability.",
          "You receive a confirmation with your final fare.",
          "Your driver's details are shared before pickup.",
        ]}
      />

      <Text style={note}>
        The fare above is a guide. Final pricing is confirmed before your trip
        and may vary with waiting time, extra stops, tolls or after-hours
        service.
      </Text>

      <Section>
        <ActionButton
          href={bookingWhatsAppLink({
            reference: data.reference,
            name: data.name,
            phone: data.phone,
            email: data.email,
            service: data.service,
            pickup: data.pickup,
            dropoff: data.dropoff,
            date: data.date,
            time: data.time,
            distanceKm: data.distanceKm,
            hours: data.hours,
            vehicle: data.vehicle,
            passengers: data.passengers,
            luggage: data.luggage,
            flightNumber: data.flightNumber,
            fare: data.fare,
          })}
          label="Confirm on WhatsApp"
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

const note: React.CSSProperties = {
  margin: "0 0 22px",
  padding: "14px 16px",
  backgroundColor: COLORS.amberTint,
  borderRadius: "10px",
  color: COLORS.amber,
  fontSize: "12.5px",
  lineHeight: "1.55",
  fontFamily: FONT_STACK,
};
