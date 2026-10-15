import { Button } from "@react-email/components";
import { FONT_STACK } from "../theme";

interface ActionButtonProps {
  href: string;
  label: string;
  background: string;
  color?: string;
}

export function ActionButton({
  href,
  label,
  background,
  color = "#FFFFFF",
}: ActionButtonProps) {
  return (
    <Button
      href={href}
      style={{
        backgroundColor: background,
        color,
        fontFamily: FONT_STACK,
        fontSize: "14px",
        fontWeight: 700,
        textDecoration: "none",
        textAlign: "center" as const,
        display: "block",
        width: "100%",
        boxSizing: "border-box" as const,
        borderRadius: "8px",
        padding: "13px 20px",
        margin: "0 0 10px",
      }}
    >
      {label}
    </Button>
  );
}
