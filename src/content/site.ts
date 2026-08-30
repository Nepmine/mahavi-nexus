/**
 * One source of truth for everything that has to agree across the site:
 * metadata, JSON-LD, the sitemap, the footer, and every call-to-action.
 * Nothing here may be duplicated as a literal anywhere else.
 */

export const SITE = {
  name: "MaHaVi",
  legalName: "Mahavi Pvt. Ltd.",
  url: "https://mahavi.tech",
  tagline: "Where Technology Meets Creativity",
  shortDescription:
    "MaHaVi is a digital agency blending engineering and creative: web and app development, AI, branding, video and digital marketing for modern brands.",
  founded: "2024",
  email: "contactmahavi@gmail.com",
  /** wa.me expects the number in international form with no punctuation. */
  whatsapp: "9779866140033",
  phoneDisplay: "+977 986 614 0033",
  instagram:
    "https://www.instagram.com/_beyond_visuals_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  address: {
    locality: "Kathmandu",
    region: "Bagmati Province",
    country: "NP",
    countryName: "Nepal",
  },
  /** Where clients actually are — read by schema.org `areaServed`. */
  areaServed: ["Nepal", "Australia", "United States", "United Kingdom", "Worldwide"],
} as const;

export const WHATSAPP_MESSAGE = "Hi, I want to know more about MaHaVi.";

export const whatsappUrl = (message: string = WHATSAPP_MESSAGE) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

/**
 * Absolute URL for a site-relative path. Every canonical is built from this.
 * The root is the bare origin with no trailing slash, which is the form Next
 * normalises canonicals to — the sitemap has to agree with it.
 */
export const absoluteUrl = (path = "/") =>
  path === "/" ? SITE.url : new URL(path, SITE.url).toString().replace(/\/$/, "");
