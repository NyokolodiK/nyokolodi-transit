import { Column, Row, Section, Text } from "@react-email/components";
import { COLORS, FONT_STACK } from "../theme";

export function Steps({ items }: { items: string[] }) {
  return (
    <Section style={wrapper}>
      {items.map((item, index) => (
        <Row key={index} style={row}>
          <Column style={indexCol}>
            <Text style={number}>{index + 1}</Text>
          </Column>
          <Column style={textCol}>
            <Text style={text}>{item}</Text>
          </Column>
        </Row>
      ))}
    </Section>
  );
}

const wrapper: React.CSSProperties = {
  margin: "0 0 20px",
};

const row: React.CSSProperties = {
  width: "100%",
};

const indexCol: React.CSSProperties = {
  width: "28px",
  verticalAlign: "top",
  padding: "0 0 12px",
};

const number: React.CSSProperties = {
  margin: 0,
  width: "22px",
  height: "22px",
  lineHeight: "22px",
  textAlign: "center" as const,
  borderRadius: "999px",
  backgroundColor: COLORS.brandTint,
  color: COLORS.brandDark,
  fontSize: "12px",
  fontWeight: 700,
  fontFamily: FONT_STACK,
};

const textCol: React.CSSProperties = {
  verticalAlign: "top",
  padding: "1px 0 12px",
};

const text: React.CSSProperties = {
  margin: 0,
  color: COLORS.muted,
  fontSize: "14px",
  lineHeight: "1.5",
  fontFamily: FONT_STACK,
};
