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
- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **Email:** [Resend](https://resend.com/)
- **Images:** Next.js `<Image />` with WebP optimisation

---

## Bookings, Quotes & Pricing

### How submissions work
All three forms (`BookingModal`, `QuoteModal`, `ContactSection`) submit to a
single Next.js Route Handler at `src/app/api/booking/route.ts`, which emails the
details via **Resend**. Bookings additionally offer a **WhatsApp** button so the
customer can confirm instantly.

### Pricing
Distance-based pricing lives in **one file**: `src/lib/rates.ts`. The fare is:

```
total = max(minimum, distanceKm × ratePerKm)   (+ after-hours surcharge)
```

| Vehicle | Rate / km | Minimum fare | Day charter |
|---|---|---|---|
| Suzuki Dzire (sedan, 1–4 pax) | R11 | R350 | R400/hr (2-hr min) |
| Group Shuttle (minibus, 5–14 pax) | R16 | R550 | R500/hr (2-hr min) |

- **After-hours surcharge:** +15% for pickups between 22:00 and 05:59.
- Day-charter bookings are billed per hour instead of per km.
- Tolls and parking are excluded from the estimate.

Edit `VEHICLES` and `SURCHARGES` in `src/lib/rates.ts` to change any rate — no
other file needs touching. The **Distance (km)** field is entered manually (no
maps/routing API).

### Business details
Phone, WhatsApp, email and addresses are centralised in `src/lib/site.ts`.

### Email setup (Resend)
1. Register a domain (e.g. `nyokoloditransit.co.za`) and create a mailbox.
2. Add and verify the domain in [Resend → Domains](https://resend.com/domains).
3. Create an API key and copy `.env.example` to `.env.local`, then fill in:
   - `RESEND_API_KEY` — your Resend key.
   - `BOOKINGS_FROM_EMAIL` — a sender on your verified domain.
   - `NOTIFICATIONS_EMAIL` — where notifications should arrive (any inbox, incl. Gmail).
4. Restart the dev server. Until the key is set, the API returns
   `503` and the forms fall back to the WhatsApp option.

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
│   │   ├── api/
│   │   │   └── booking/route.ts   # Resend email handler for all forms
│   │   ├── layout.tsx    # Root layout & SEO metadata
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── QuickServicesBar.tsx
│   │   ├── WhyChooseUsSection.tsx
│   │   ├── FleetSection.tsx
│   │   ├── BrandExcellenceSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── BookingModal.tsx
│   │   ├── QuoteModal.tsx
│   │   └── Footer.tsx
│   └── lib/
│       ├── rates.ts      # Fare config + calculation helpers
│       ├── site.ts       # Business contact details
│       └── email.ts      # Resend helpers + email templates
├── .env.example          # Required environment variables
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
