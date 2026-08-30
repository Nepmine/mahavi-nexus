import type { MetadataRoute } from "next";

import { SERVICES } from "@/content/services";
import { SITE, absoluteUrl } from "@/content/site";
import { CASE_STUDIES } from "@/content/work";

/**
 * Generated from the route data rather than maintained by hand, so it cannot
 * drift out of date the way a static sitemap.xml always eventually does.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/work"), lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "yearly", priority: 0.8 },
    ...SERVICES.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...CASE_STUDIES.map((study) => ({
      url: absoluteUrl(`/work/${study.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}

export const SITE_URL = SITE.url;
