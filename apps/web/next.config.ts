import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: [
    "@nyokolodi/shared",
    "@nyokolodi/ui",
    "@nyokolodi/database",
    "@nyokolodi/booking",
    "@nyokolodi/pricing",
    "@nyokolodi/fleet",
    "@nyokolodi/routing",
    "@nyokolodi/ai",
    "@nyokolodi/payments",
    "@nyokolodi/notifications",
  ],
};

export default nextConfig;
