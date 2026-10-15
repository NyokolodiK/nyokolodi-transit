import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RouteLandingPage from "@/components/seo/RouteLandingPage";
import { SITE } from "@/lib/site";
import { getRouteContent } from "@/lib/route-content";
import {
  ROUTES,
  buildBreadcrumbs,
  buildFaqs,
  getRoute,
} from "@/lib/routes";

const SITE_URL = "https://nyokolodi-transit.co.za";

export function generateStaticParams() {
  return ROUTES.map((route) => ({ slug: route.slug }));
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const route = getRoute(params.slug);
  if (!route) return {};

  const { origin, destination, distanceKm, sedan } = route;
  const content = getRouteContent(route.slug);
  const title = `Shuttle from ${origin.name} to ${destination.name} | Nyokolodi Transit`;
  const description =
    content?.metaDescription ||
    `Book a private shuttle from ${origin.name} to ${destination.name} (${distanceKm} km) from ${sedan.display}. 24/7 airport transfers, corporate travel and intercity transport across Gauteng - fixed rates, no hidden extras.`;
  const url = `${SITE_URL}/shuttle/${route.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      images: ["/hero-wide.webp"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/hero-wide.webp"],
    },
  };
}

export default function RoutePage({ params }: { params: { slug: string } }) {
  const route = getRoute(params.slug);
  if (!route) notFound();

  const content = getRouteContent(route.slug);
  const faqs = content?.faqs?.length ? content.faqs : buildFaqs(route);
  const breadcrumbs = buildBreadcrumbs(route);
  const relatedRoutes = route.related
    .map((slug) => getRoute(slug))
    .filter((value): value is NonNullable<typeof value> => Boolean(value));

  const url = `${SITE_URL}/shuttle/${route.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Shuttle from ${route.origin.name} to ${route.destination.name}`,
    serviceType: route.serviceType,
    description: `Private ${route.serviceType.toLowerCase()} from ${route.origin.name} to ${route.destination.name}, ${route.distanceKm} km, available 24/7.`,
    url,
    areaServed: [route.origin.name, route.destination.name, "Gauteng"],
    provider: {
      "@type": "LocalBusiness",
      name: SITE.name,
      telephone: SITE.phoneDisplay,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Lenchen Ave, Rooihuiskraal North",
        addressLocality: "Centurion",
        addressRegion: "Gauteng",
        postalCode: "0157",
        addressCountry: "ZA",
      },
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "ZAR",
      price: route.sedan.total,
      description: `From ${route.sedan.display} for a Suzuki Dzire sedan (1-4 passengers).`,
      availability: "https://schema.org/InStock",
      url,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.href === "/" ? "" : crumb.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RouteLandingPage
        route={route}
        content={content}
        faqs={faqs}
        relatedRoutes={relatedRoutes}
        breadcrumbs={breadcrumbs}
      />
    </>
  );
}
