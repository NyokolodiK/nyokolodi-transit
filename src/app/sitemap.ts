import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";

const SITE_URL = "https://nyokolodi-transit.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/shuttle`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const routePages: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: `${SITE_URL}/shuttle/${route.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...routePages];
}
