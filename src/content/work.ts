import type { StaticImageData } from "next/image";

import design1 from "@/assets/portfolio/design-1.jpg";
import design2 from "@/assets/portfolio/design-2.jpg";
import design3 from "@/assets/portfolio/design-3.jpg";
import projectFacebookBot from "@/assets/portfolio/project-facebook-bot.jpg";
import projectNikunja from "@/assets/portfolio/project-nikunja-radhakundah.png";
import projectPdpNepal from "@/assets/portfolio/project-pdp-nepal.jpg";
import websiteIds from "@/assets/portfolio/website-ids.png";
import websiteKristina from "@/assets/portfolio/website-kristina.png";
import websiteManual from "@/assets/portfolio/website-manual.png";
import websiteToTheLeft from "@/assets/portfolio/website-totheleft.png";

/**
 * The two showreel clips live in /public rather than being imported: the
 * bundler would fingerprint them into the JS graph, and a video wants to be
 * range-requested straight off the CDN.
 */
const designVideo1 = "/portfolio/design-video-1.mp4";
const designVideo2 = "/portfolio/design-video-2.mp4";

export interface DesignItem {
  type: "image" | "video";
  src: StaticImageData | string;
  title: string;
  /** Videos only: the frame shown until the clip is fetched. */
  poster?: string;
}

export interface WebsiteItem {
  title: string;
  url: string;
  description: string;
  thumbnail: StaticImageData;
}

export interface ProjectItem {
  title: string;
  description: string;
  image: StaticImageData;
  /** Present when the project has a case-study page of its own. */
  href?: string;
}

export const designItems: DesignItem[] = [
  { type: "image", src: design1, title: "3D Environment — Fortress" },
  { type: "video", src: designVideo1, poster: "/portfolio/design-video-1-poster.jpg", title: "Motion Graphics Reel" },
  { type: "image", src: design2, title: "3D Scene — Inferno" },
  { type: "image", src: design3, title: "Award Ceremony Concept" },
  { type: "video", src: designVideo2, poster: "/portfolio/design-video-2-poster.jpg", title: "Visual FX Showcase" },
];

export const websiteItems: WebsiteItem[] = [
  {
    title: "Kristina Champion",
    url: "https://kristinachampion.com/",
    description: "Personal portfolio & brand presence",
    thumbnail: websiteKristina,
  },
  {
    title: "IDS Nepal Weekly",
    url: "https://www.idsnepal.com/weeklyArticle",
    description: "News & article publishing platform",
    thumbnail: websiteIds,
  },
  {
    title: "To The Left",
    url: "https://super-cranachan-fa4ff0.netlify.app/",
    description: "Modern landing page experience",
    thumbnail: websiteToTheLeft,
  },
  {
    title: "Manual.is",
    url: "https://www.manual.is/",
    description: "Health & wellness platform",
    thumbnail: websiteManual,
  },
];

export const projectItems: ProjectItem[] = [
  {
    title: "Nikunja Seva — Radhakundah Platform",
    description:
      "Research and publishing platform for an Australian client: gated scholarly papers, articles, galleries and video, with a full CMS and a 128-endpoint API behind it.",
    image: projectNikunja,
    href: "/work/nikunja",
  },
  {
    title: "Facebook Page Boost Bot",
    description:
      "Automated bot system for strategic Facebook page boosting & audience engagement growth.",
    image: projectFacebookBot,
  },
  {
    title: "PDP Party of Nepal",
    description:
      "Digital strategy and creative media collaboration for the PDP Party of Nepal's online presence.",
    image: projectPdpNepal,
  },
];

/* ────────────────────────────────────────────────────────────────────────────
   Case studies — projects substantial enough to carry a page of their own.
   Every claim here is taken from the delivered project's own documentation.
   ──────────────────────────────────────────────────────────────────────────── */

export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface CaseStudy {
  slug: string;
  /** Card + hero title. */
  title: string;
  client: string;
  clientCountry: string;
  year: string;
  role: string;
  image: StaticImageData;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  /** Short facts rail under the hero. */
  facts: { label: string; value: string }[];
  /** Headline numbers, all from the delivery documentation. */
  metrics: { value: string; label: string }[];
  sections: CaseStudySection[];
  stack: { group: string; items: string[] }[];
  services: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "nikunja",
    title: "Radhakundah Platform",
    client: "Nikunja Seva Pty Ltd",
    clientCountry: "Australia",
    year: "2026",
    role: "Full-stack design, engineering and delivery",
    image: projectNikunja,
    metaTitle: "Nikunja Seva Case Study — Radhakundah Platform",
    metaDescription:
      "How MaHaVi built Radhakundah for Nikunja Seva Pty Ltd, Australia — a research and publishing platform with gated papers, full-text PDF search and a 128-endpoint API.",
    summary:
      "A research library, a publishing house and a membership platform sharing one codebase — built for an Australian client, delivered end to end, and running as a single service in Azure.",
    facts: [
      { label: "Client", value: "Nikunja Seva Pty Ltd" },
      { label: "Location", value: "Australia" },
      { label: "Engagement", value: "Full-stack build, design to deployment" },
      { label: "Delivered by", value: "Mahavi Pvt. Ltd." },
    ],
    metrics: [
      { value: "128", label: "Documented API endpoints" },
      { value: "28", label: "Database models" },
      { value: "60s", label: "Signed link lifetime on gated papers" },
      { value: "1", label: "Azure service running site and API" },
    ],
    sections: [
      {
        heading: "The brief",
        paragraphs: [
          "Nikunja Seva Pty Ltd needed a public home for a body of scholarly and devotional work centred on Radha Kunda: peer-quality research papers, long-form articles, a blog, photography, recorded talks, and the people behind all of it. The brief asked for a website, a content management system, and an architecture that could carry future modules without being rebuilt.",
          "The hard part was never the pages. It was that a research library, a publishing operation and a media archive have genuinely different needs, and the client's team is small enough that one person has to be able to run all three from the same screen.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "One platform with a public site, a member layer and a staff CMS, served by a single documented API. The public side carries research papers with full citation metadata, articles and blogs, author profiles, photo galleries, a video library, search, and a newsletter. The staff side manages every one of those content types, plus media, taxonomy, redirects, comments, subscribers and an audit trail.",
        ],
        bullets: [
          "Research papers with DOI, journal, volume, issue, page range and keywords — rendered only where filled in",
          "Author records with affiliation, biography, photograph, ORCID identifier and a public profile page",
          "Byline order preserved, with the corresponding author marked",
          "Articles and blogs unified behind one model, so a piece published to both places still has one canonical address",
          "Galleries, a YouTube-backed video library, tags shared across posts and research, and site-wide search",
        ],
      },
      {
        heading: "Papers that are gated without disappearing from search",
        paragraphs: [
          "Research PDFs live in a private container and never receive a public address. Opening one requires a signed-in reader and mints a link that expires in sixty seconds, shown in-page with the download toolbar suppressed. Every open is recorded — who, when, which file, from which address.",
          "Abstracts, citations and metadata stay fully public, so gating the file costs nothing in search visibility. The paper is still indexable, quotable and citable; only the PDF itself is behind the door.",
        ],
      },
      {
        heading: "Search that reads inside the PDFs",
        paragraphs: [
          "Uploaded papers are parsed and their full text folded into the search index. A visitor can find a paper by a phrase buried on page twelve rather than only by its title. Matches are weighted — title outranks abstract, abstract outranks body — so results are ranked rather than merely filtered.",
          "The extracted text drives ranking only and is never returned to a client, so gated papers stay gated while remaining findable.",
        ],
      },
      {
        heading: "SEO built into the platform, not bolted on",
        paragraphs: [
          "The API is the single source of SEO truth: every detail endpoint returns a resolved block — title, description, canonical, robots, Open Graph, Twitter and JSON-LD — with all fallbacks already applied, and the front end renders it verbatim.",
        ],
        bullets: [
          "Renaming published content writes a permanent redirect automatically, and re-points older redirects so a link is never more than one hop from its destination",
          "A post published to both articles and blogs gets one canonical address instead of two copies competing in search results",
          "A paginated sitemap index served from the site's own domain, not the API's",
          "Structured data for every content type — papers carry their DOI and journal, videos their duration and thumbnail",
          "Thin category, tag and search pages are marked noindex so they cannot dilute the pages that matter",
          "Any environment that is not the live site refuses indexing at both the robots and the header level, so a staging copy cannot outrank the real one",
        ],
      },
      {
        heading: "Security that assumes the worst",
        paragraphs: [
          "Authentication is Google sign-in only. There is no password database to breach and no reset flow to abuse. Refresh tokens are stored only as hashes and rotate on every use; the access token never touches browser storage.",
          "A token presented twice — the signature of a stolen session — revokes every session on that account instantly and records the event. Each user gets a devices and sessions panel to end any session individually or sign out everywhere.",
          "Every staff action is written to an audit trail with actor, target and IP, filterable from its own screen and pruned on a twelve-month retention window. The database is dumped, compressed and written to a dedicated backup container on a schedule, with no human step to forget.",
        ],
      },
      {
        heading: "One service instead of two",
        paragraphs: [
          "The website and the API deploy together onto a single Azure App Service rather than one instance each, so the recurring hosting bill carries one instance instead of two. The site reaches the API over an internal address, so traffic between them never leaves the host — no egress charges, no added latency, and no second public endpoint to secure.",
          "Sitemaps and SEO files are proxied through the site's own domain, so the API needs no public hostname, no separate certificate and no DNS record of its own.",
        ],
      },
      {
        heading: "Beyond the brief",
        paragraphs: [
          "Several things were built that the agreed scope did not ask for, because they were cheap to add during the build and expensive to retrofit afterwards.",
        ],
        bullets: [
          "A membership layer: visitors read everything without signing in, and signing in adds full papers, likes and comments — the groundwork three future modules already depend on",
          "Comment moderation, switchable per post, with hidden-comment handling on a dedicated screen",
          "All 128 endpoints published as a live, browsable reference with a built-in console, so the next developer does not reverse-engineer anything",
          "One consistent response envelope with a fixed set of error codes and field-level validation messages",
          "Separate liveness and readiness checks, so the host can take a sick instance out of rotation instead of serving errors",
          "Exactly one protected super-admin re-asserted on every start-up — the site cannot be locked out of its own administration",
        ],
      },
      {
        heading: "An identity built for the subject",
        paragraphs: [
          "A considered palette — white ground, saffron reserved for actions, nila blue for depth, gold as ornament — with a deep-blue night mode applied before the first pixel is painted, so there is no flash of the wrong theme.",
          "The homepage centrepiece is a three-dimensional mandala generated entirely in code, with no model or texture files for a visitor to download. The homepage itself assembles its hero, research, articles, blogs, videos, gallery and updates feed from a single cached request rather than eight, and non-essential reads have defined fallbacks so an interruption degrades one section rather than the whole page.",
        ],
      },
    ],
    stack: [
      { group: "Front end", items: ["Next.js 15 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "Three.js"] },
      { group: "Back end", items: ["Fastify", "TypeScript", "Prisma", "PostgreSQL 16", "Zod"] },
      { group: "Platform", items: ["Azure App Service", "Azure Blob Storage", "Google OAuth", "OpenAPI / Swagger"] },
    ],
    services: ["web-development", "saas-platforms", "branding-identity", "digital-marketing-consulting"],
  },
];

export const getCaseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
