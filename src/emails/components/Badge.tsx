import type { ReactNode } from "react";
import { Text } from "@react-email/components";
import { COLORS, FONT_STACK } from "../theme";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <Text style={badge}>
      <span style={dot} />
      {children}
    </Text>
  );
}

const badge: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: COLORS.brandTint,
  border: `1px solid #CDE9D6`,
  color: COLORS.brandDark,
  borderRadius: "999px",
  padding: "6px 14px",
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "0.02em",
  margin: "0 0 18px",
  fontFamily: FONT_STACK,
};

const dot: React.CSSProperties = {
  display: "inline-block",
  width: "6px",
  height: "6px",
  borderRadius: "999px",
  backgroundColor: COLORS.brandLight,
  marginRight: "8px",
  verticalAlign: "middle",
};
