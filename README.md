# Nyokolodi Transit 🚗

> **People · Places · Possibilities**
> Reliable shuttle services across Centurion, Pretoria, Johannesburg and wider Gauteng.

---

## Overview

Nyokolodi Transit is a professional shuttle and chauffeur service headquartered in **Centurion, Gauteng, South Africa**. This repository contains the public-facing marketing website built with **Next.js 14** and **Tailwind CSS**.

**Business Address:** Lenchen Ave, Rooihuiskraal North, Centurion, 0157, Gauteng  
**Contact:** +27 (0)12 661 0000 | info@nyokoloditransit.co.za  
**Operating Hours:** 24 / 7

---

## Services

| Service | Description |
|---|---|
| ✈️ Airport Transfers | OR Tambo (JNB) & Lanseria (HLA) — fixed rates, flight monitoring |
| 💼 Corporate Shuttles | Staff commutes, executive transfers, monthly billing |
| 🗺️ Local & Intercity | Centurion · Pretoria · Johannesburg · Sun City & beyond |
| 🎉 Events & Special Transport | Weddings, conferences, group travel |

---

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** TypeScript
- **Icons:** [Lucide React](https://lucide.dev/)
- **Images:** Next.js `<Image />` with WebP optimisation

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
nyokolodi-transit/
├── public/               # Static assets (images, logos, fleet photos)
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Root layout & SEO metadata
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   └── components/
│       ├── Navbar.tsx
│       ├── HeroSection.tsx
│       ├── QuickServicesBar.tsx
│       ├── WhyChooseUsSection.tsx
│       ├── FleetSection.tsx
│       ├── BrandExcellenceSection.tsx
│       ├── TestimonialsSection.tsx
│       ├── ContactSection.tsx
│       ├── BookingModal.tsx
│       ├── QuoteModal.tsx
│       └── Footer.tsx
├── .gitignore
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Brand Colours

| Token | Hex | Usage |
|---|---|---|
| Primary Dark | `#0E4D25` | Navbar, icon backgrounds, hover states |
| Primary | `#146C36` | Buttons, accents, borders |
| Primary Light | `#22C55E` | Highlights, badges, tickers |
| Background Tint | `#FAFDFB` | Section backgrounds |
| Light Green | `#EAF7EE` | Icon wells, card backgrounds |

---

## Deployment

The site is ready for deployment on **Vercel** (recommended) or any Node.js host.

```bash
# Deploy with Vercel CLI
vercel --prod
```

---

© 2026 Nyokolodi Transit (Pty) Ltd. All rights reserved.
