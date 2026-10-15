import type { ReactNode } from "react";
import { Column, Row, Section, Text } from "@react-email/components";
import { COLORS, FONT_STACK } from "../theme";

export interface DetailItem {
  label: string;
  value?: ReactNode;
  wide?: boolean;
}

interface DetailsCardProps {
  items: DetailItem[];
  footer?: { label: string; value: ReactNode };
}

function isVisible(value: ReactNode): boolean {
  return value !== undefined && value !== null && value !== "";
}

export function DetailsCard({ items, footer }: DetailsCardProps) {
  const visible = items.filter((item) => isVisible(item.value));

  return (
    <Section style={card}>
      {visible.map((item, index) => (
        <Row
          key={`${item.label}-${index}`}
          style={{
            ...row,
            borderTop: index === 0 ? "none" : `1px solid ${COLORS.border}`,
          }}
        >
          <Column style={labelCol}>
            <Text style={label}>{item.label}</Text>
          </Column>
          <Column style={item.wide ? valueColWide : valueCol}>
            <Text style={value}>{item.value}</Text>
          </Column>
        </Row>
      ))}

      {footer && (
        <Row style={footerRow}>
          <Column style={labelCol}>
            <Text style={footerLabel}>{footer.label}</Text>
          </Column>
          <Column style={{ ...valueCol, textAlign: "right" }}>
            <Text style={footerValue}>{footer.value}</Text>
          </Column>
        </Row>
      )}
    </Section>
  );
}

const card: React.CSSProperties = {
  border: `1px solid ${COLORS.border}`,
  borderRadius: "12px",
  overflow: "hidden",
  margin: "0 0 20px",
  backgroundColor: COLORS.card,
  width: "100%",
};

const row: React.CSSProperties = {
  width: "100%",
};

const labelCol: React.CSSProperties = {
  padding: "11px 16px",
  width: "42%",
  verticalAlign: "top",
};

const valueCol: React.CSSProperties = {
  padding: "11px 16px",
  width: "58%",
  textAlign: "right",
  verticalAlign: "top",
};

const valueColWide: React.CSSProperties = {
  padding: "11px 16px",
  width: "58%",
  verticalAlign: "top",
};

const label: React.CSSProperties = {
  margin: 0,
  color: COLORS.subtle,
  fontSize: "13px",
  fontFamily: FONT_STACK,
};

const value: React.CSSProperties = {
  margin: 0,
  color: COLORS.text,
  fontSize: "13px",
  fontWeight: 600,
  fontFamily: FONT_STACK,
  whiteSpace: "pre-wrap",
};

const footerRow: React.CSSProperties = {
  width: "100%",
  backgroundColor: COLORS.brandTint,
  borderTop: `1px solid #CDE9D6`,
};

const footerLabel: React.CSSProperties = {
  margin: 0,
  color: COLORS.brandDark,
  fontSize: "13px",
  fontWeight: 700,
  fontFamily: FONT_STACK,
};

const footerValue: React.CSSProperties = {
  margin: 0,
  color: COLORS.brandDark,
  fontSize: "16px",
  fontWeight: 800,
  fontFamily: FONT_STACK,
};
