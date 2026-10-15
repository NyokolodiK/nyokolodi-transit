import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nyokolodi-transit.co.za"),
  title: "Nyokolodi Transit | Reliable Shuttle Services in Gauteng, South Africa",
  description:
    "Safe. Comfortable. Affordable. Dependable shuttle services, airport transfers, corporate transport, and intercity travel across Gauteng and greater South Africa.",
  keywords: [
    "Gauteng shuttle service",
    "Nyokolodi Transit",
    "OR Tambo airport transfer",
    "Lanseria airport shuttle",
    "Corporate transport Gauteng",
    "Suzuki Dzire shuttle",
    "Intercity transport Gauteng",
  ],
  openGraph: {
    title: "Nyokolodi Transit | People, Places, Possibilities",
    description: "Safe. Comfortable. Affordable shuttle services across Gauteng and greater South Africa.",
    images: ["/fleet-panoramic-clean.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo-transparent.png" />
      </head>
      <body className="font-sans antialiased bg-[#FAFDFB] text-gray-900 selection:bg-nyokolodi-green selection:text-white">
        {children}
      </body>
    </html>
  );
}
