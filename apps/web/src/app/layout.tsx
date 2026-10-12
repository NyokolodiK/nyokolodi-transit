import type { Metadata } from "next";
import type { ReactNode } from "react";

import { BRAND } from "@nyokolodi/shared";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Premium private passenger transport, airport transfers and corporate shuttle services in South Africa.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-ZA">
      <body className="min-h-dvh bg-brand-background text-brand-text antialiased">{children}</body>
    </html>
  );
}
