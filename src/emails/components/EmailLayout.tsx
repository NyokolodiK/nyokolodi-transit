import type { ReactNode } from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { SITE } from "@/lib/site";
import { COLORS, FONT_STACK } from "../theme";

interface EmailLayoutProps {
  preview: string;
  heading: string;
  intro?: string;
  eyebrow?: string;
  children: ReactNode;
}

export function EmailLayout({
  preview,
  heading,
  intro,
  eyebrow,
  children,
}: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={wordmark}>{SITE.name}</Text>
            <Text style={tagline}>{SITE.tagline}</Text>
          </Section>
          <Section style={accentBar}>&nbsp;</Section>

          <Section style={content}>
            {eyebrow && <Text style={eyebrowStyle}>{eyebrow}</Text>}
            <Heading style={headingStyle}>{heading}</Heading>
            {intro && <Text style={introStyle}>{intro}</Text>}
            {children}
          </Section>

          <Section style={footer}>
            <Text style={footerName}>{SITE.name}</Text>
            <Text style={footerText}>{SITE.address}</Text>
            <Text style={footerText}>
              <Link href={`tel:${SITE.phoneE164}`} style={footerLink}>
                {SITE.phoneDisplay}
              </Link>
              {"  ·  "}
              <Link href={`mailto:${SITE.bookingsEmail}`} style={footerLink}>
                {SITE.bookingsEmail}
              </Link>
            </Text>
            <Hr style={hr} />
            <Text style={footerMeta}>
              Sent automatically from the {SITE.name} website. This mailbox is
              monitored 24/7.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = {
  backgroundColor: COLORS.bg,
  margin: 0,
  padding: "24px 12px",
  fontFamily: FONT_STACK,
};

const container: React.CSSProperties = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: COLORS.card,
  borderRadius: "16px",
  overflow: "hidden",
  border: `1px solid ${COLORS.border}`,
};

const header: React.CSSProperties = {
  backgroundColor: COLORS.brandDark,
  padding: "28px 32px 24px",
};

const wordmark: React.CSSProperties = {
  margin: 0,
  color: "#FFFFFF",
  fontSize: "22px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  fontFamily: FONT_STACK,
};

const tagline: React.CSSProperties = {
  margin: "6px 0 0",
  color: "#86EFAC",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontFamily: FONT_STACK,
};

const accentBar: React.CSSProperties = {
  backgroundColor: COLORS.brandLight,
  height: "4px",
  lineHeight: "4px",
  fontSize: "1px",
};

const content: React.CSSProperties = {
  padding: "30px 32px 24px",
};

const eyebrowStyle: React.CSSProperties = {
  margin: "0 0 6px",
  color: COLORS.brand,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontFamily: FONT_STACK,
};

const headingStyle: React.CSSProperties = {
  margin: "0 0 12px",
  color: COLORS.text,
  fontSize: "22px",
  fontWeight: 800,
  lineHeight: "1.3",
  fontFamily: FONT_STACK,
};

const introStyle: React.CSSProperties = {
  margin: "0 0 22px",
  color: COLORS.muted,
  fontSize: "14px",
  lineHeight: "1.6",
  fontFamily: FONT_STACK,
};

const footer: React.CSSProperties = {
  backgroundColor: COLORS.footerBg,
  padding: "24px 32px",
  textAlign: "center" as const,
  borderTop: `1px solid ${COLORS.border}`,
};

const footerName: React.CSSProperties = {
  margin: 0,
  color: COLORS.brandDark,
  fontSize: "13px",
  fontWeight: 700,
  fontFamily: FONT_STACK,
};

const footerText: React.CSSProperties = {
  margin: "5px 0 0",
  color: COLORS.subtle,
  fontSize: "12px",
  lineHeight: "1.6",
  fontFamily: FONT_STACK,
};

const footerLink: React.CSSProperties = {
  color: COLORS.brand,
  textDecoration: "none",
  fontWeight: 600,
};

const hr: React.CSSProperties = {
  borderColor: COLORS.border,
  margin: "16px 0",
};

const footerMeta: React.CSSProperties = {
  margin: 0,
  color: COLORS.faint,
  fontSize: "11px",
  lineHeight: "1.6",
  fontFamily: FONT_STACK,
};
