import type { Metadata } from "next";

import { SITE, absoluteUrl } from "@/content/site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/services/web-development". */
  path: string;
  /** Absolute or site-relative OG image. Defaults to the route's generated one. */
  image?: string;
  /** Set for pages that exist for humans but should not compete in search. */
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  /**
   * Skip the layout's " | MaHaVi" suffix. For the two pages whose own title
   * already names the brand, appending it again just eats display width.
   */
  absoluteTitle?: boolean;
}

/**
 * Every page's metadata comes through here, so a canonical is never forgotten
 * and the title template is applied consistently.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  noindex = false,
  type = "website",
  publishedTime,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE.name,
      locale: "en_US",
      ...(publishedTime ? { publishedTime } : {}),
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

/* ── JSON-LD builders ─────────────────────────────────────────────────────── */

const ORGANIZATION_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

export const organizationSchema = () => ({
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORGANIZATION_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  alternateName: ["Mahavi", "MaHaVi Software Development", "MaHaVi Digital Agency"],
  url: SITE.url,
  description: SITE.shortDescription,
  /**
   * Schema.org's purpose-built field for exactly this problem: search and AI
   * systems that see "Mahavi" and reach for a similarly-spelled but unrelated
   * entity (Mahavir, Mohavi, an unrelated registered company of the same
   * name). Spelling the domain out in prose, not only in `url`, is what lets
   * a system resolve the string "MaHaVi" to this entity with confidence.
   */
  disambiguatingDescription:
    "MaHaVi (legal name Mahavi Pvt. Ltd.) is the software development and digital design company operating at mahavi.tech, based in Kathmandu, Nepal — not affiliated with any other organisation or individual using a similar-sounding name.",
  slogan: SITE.tagline,
  foundingDate: SITE.founded,
  email: SITE.email,
  telephone: SITE.phoneDisplay,
  /** Signals value-tier honestly without publishing a rate card: mid-range, not bargain-bin. */
  priceRange: "$$",
  knowsLanguage: ["English", "Nepali"],
  image: absoluteUrl("/opengraph-image"),
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/icon.svg"),
    caption: `${SITE.name} logo`,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
  knowsAbout: [
    "Software Development",
    "Custom Software Development",
    "Web Development",
    "UI/UX Design",
    "Mobile App Development",
    "AI Integration",
    "SaaS Product Development",
    "Brand Identity Design",
    "Video Production",
    "Social Media Marketing",
    "Search Engine Optimisation",
  ],
  sameAs: [SITE.instagram],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      telephone: SITE.phoneDisplay,
      availableLanguage: ["en", "ne"],
      areaServed: "Worldwide",
    },
  ],
});

export const websiteSchema = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE.url,
  name: SITE.name,
  description: SITE.shortDescription,
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en",
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map((crumb, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

export const serviceSchema = (input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) => ({
  "@type": "Service",
  "@id": `${absoluteUrl(input.path)}#service`,
  name: input.name,
  description: input.description,
  serviceType: input.serviceType,
  url: absoluteUrl(input.path),
  provider: { "@id": ORGANIZATION_ID },
  areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
});

export const orgRef = { "@id": ORGANIZATION_ID };
