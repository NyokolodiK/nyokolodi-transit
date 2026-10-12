import { ArrowRight, CalendarCheck, MapPin, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BRAND } from "@nyokolodi/shared";

const highlights = [
  {
    icon: CalendarCheck,
    title: "Transparent quotations",
    description: "Know the fare before you book, with clear pricing and no surprises.",
  },
  {
    icon: MapPin,
    title: "Reliable scheduling",
    description: "Pre-booked sedans for airport transfers and point-to-point journeys.",
  },
  {
    icon: ShieldCheck,
    title: "Professional drivers",
    description: "Coordinated pickups with trip updates from booking to arrival.",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-6">
      <header className="flex items-center justify-between py-6">
        <Link href="/" className="flex items-center gap-3" aria-label={BRAND.name}>
          <Image
            src="/logo.png"
            alt={`${BRAND.name} logo`}
            width={144}
            height={96}
            priority
            className="h-12 w-auto"
          />
          <span className="sr-only">{BRAND.name}</span>
        </Link>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          Book a trip
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </header>

      <section className="flex flex-1 flex-col items-start justify-center gap-6 py-16">
        <span className="rounded-full bg-brand-background-alt px-4 py-1.5 text-sm font-medium text-brand-primary">
          {BRAND.tagline}
        </span>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-brand-primary sm:text-5xl">
          Premium transport for every journey across South Africa.
        </h1>
        <p className="max-w-2xl text-lg text-brand-text/80">
          Nyokolodi Transit offers airport transfers, private point-to-point rides and corporate
          transport in well-maintained sedans. Book online in minutes and travel with confidence.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-secondary"
          >
            Start a booking
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center rounded-full border border-brand-primary/20 px-6 py-3 text-base font-semibold text-brand-primary transition-colors hover:bg-brand-background-alt"
          >
            Explore services
          </Link>
        </div>
      </section>

      <section className="grid gap-6 border-t border-brand-primary/10 py-12 sm:grid-cols-3">
        {highlights.map(({ icon: Icon, title, description }) => (
          <article key={title} className="rounded-2xl bg-brand-background-alt p-6">
            <Icon className="size-6 text-brand-secondary" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold text-brand-primary">{title}</h2>
            <p className="mt-2 text-sm text-brand-text/80">{description}</p>
          </article>
        ))}
      </section>

      <footer className="border-t border-brand-primary/10 py-8 text-sm text-brand-text/70">
        <p>
          &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
