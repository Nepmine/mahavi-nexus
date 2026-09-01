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
  /** Internal detail page at /work/[slug]. */
  slug: string;
  title: string;
  url: string;
  description: string;
  thumbnail: StaticImageData;
}

export interface ProjectItem {
  /** Internal detail page at /work/[slug]. */
  slug: string;
  title: string;
  description: string;
  image: StaticImageData;
  href: string;
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
    slug: "kristina-champion",
    title: "Kristina Champion",
    url: "https://kristinachampion.com/",
    description: "Personal portfolio & brand presence",
    thumbnail: websiteKristina,
  },
  {
    slug: "ids-nepal-weekly",
    title: "IDS Nepal Weekly",
    url: "https://www.idsnepal.com/weeklyArticle",
    description: "News & article publishing platform",
    thumbnail: websiteIds,
  },
  {
    slug: "to-the-left",
    title: "To The Left",
    url: "https://super-cranachan-fa4ff0.netlify.app/",
    description: "Modern landing page experience",
    thumbnail: websiteToTheLeft,
  },
  {
    slug: "manual-is",
    title: "Manual.is",
    url: "https://www.manual.is/",
    description: "Health & wellness platform",
    thumbnail: websiteManual,
  },
];

export const projectItems: ProjectItem[] = [
  {
    slug: "nikunja",
    title: "Nikunja Seva — Radhakundah Platform",
    description:
      "Research and publishing platform for an Australian client: gated scholarly papers, articles, galleries and video, with a full CMS and a 128-endpoint API behind it.",
    image: projectNikunja,
    href: "/work/nikunja",
  },
  {
    slug: "facebook-page-boost-bot",
    title: "Facebook Page Boost Bot",
    description:
      "Automated bot system for strategic Facebook page boosting & audience engagement growth.",
    image: projectFacebookBot,
    href: "/work/facebook-page-boost-bot",
  },
  {
    slug: "pdp-party-of-nepal",
    title: "PDP Party of Nepal",
    description:
      "Digital strategy and creative media collaboration for the PDP Party of Nepal's online presence.",
    image: projectPdpNepal,
    href: "/work/pdp-party-of-nepal",
  },
];

/* ────────────────────────────────────────────────────────────────────────────
   Project detail pages — every website and project card gets a page of its
   own at /work/[slug], even the ones too small for a full case study. Each
   click stays on the site instead of bouncing straight to an external host,
   which is better for time-on-site, internal linking and crawl depth than a
   grid of outbound links ever is. The live link itself still lives on the
   page, as a button rather than the whole card.
   ──────────────────────────────────────────────────────────────────────────── */

export interface ProjectDetail {
  slug: string;
  title: string;
  category: "Website" | "Automation" | "Digital Strategy";
  image: StaticImageData;
  /** External destination, when the work has one to send a visitor to. */
  liveUrl?: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  paragraphs: string[];
  highlights: string[];
  services: string[];
}

export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    slug: "kristina-champion",
    title: "Kristina Champion",
    category: "Website",
    image: websiteKristina,
    liveUrl: "https://kristinachampion.com/",
    metaTitle: "Kristina Champion — Personal Portfolio Website",
    metaDescription:
      "A personal portfolio site built by MaHaVi to give Kristina Champion a single, brand-consistent home for her work and story online.",
    summary:
      "A personal portfolio and brand home, built so a visitor lands somewhere that looks and reads like one considered idea rather than a stack of social profiles.",
    paragraphs: [
      "The brief was a single, self-contained site that could carry a personal brand: a clear introduction, a portfolio of work, and a way to get in touch, all under one address instead of scattered across social bios and link-in-bio tools.",
      "We built the layout around fast page loads and clean typography, so the work on display is never competing with the site for attention. The result reads as considered rather than templated, and it's a page Kristina fully owns.",
      "That ownership matters beyond looks: a personal site under a personal domain keeps the SEO value of every mention and link pointed at something Kristina controls, instead of splitting it across third-party profiles that can change their rules, their layout or their existence at any point.",
      "It's also a page that ages well — the structure holds up as new work gets added, so growing the portfolio later is a content update rather than a redesign.",
    ],
    highlights: [
      "One address instead of a link-in-bio page",
      "Layout built to keep the portfolio, not the chrome, in focus",
      "Fast-loading pages on both desktop and mobile",
    ],
    services: ["web-development", "branding-identity"],
  },
  {
    slug: "ids-nepal-weekly",
    title: "IDS Nepal Weekly",
    category: "Website",
    image: websiteIds,
    liveUrl: "https://www.idsnepal.com/weeklyArticle",
    metaTitle: "IDS Nepal Weekly — Article Publishing Platform",
    metaDescription:
      "A news and article publishing platform MaHaVi built for IDS Nepal, organised around weekly articles rather than a single undifferentiated feed.",
    summary:
      "A publishing platform for IDS Nepal's weekly articles — built to organise recurring content so readers can find this week's piece and last month's just as easily.",
    paragraphs: [
      "IDS Nepal needed somewhere to publish a running series of weekly articles that read well, load fast and stay easy to browse as the archive grows. A generic blog template wasn't the fit — the content is structured around a weekly cadence, and the site needed to reflect that.",
      "We built a publishing layout that foregrounds the current week's article while keeping older pieces genuinely browsable, not buried behind endless pagination — a structure that also gives search engines a clear path into the archive rather than one long undifferentiated feed.",
      "Every article gets its own clean, shareable page rather than living only inside a scrolling feed, which is what lets individual pieces get found, linked and read long after the week they were published in has passed.",
      "That same structure is what makes the site sustainable to run week over week — publishing a new piece doesn't mean fighting the layout to fit it in.",
    ],
    highlights: [
      "Built around a weekly publishing cadence, not a generic blog feed",
      "Archive stays browsable as the article count grows",
      "Clean reading layout tuned for article content",
    ],
    services: ["web-development", "digital-marketing-consulting"],
  },
  {
    slug: "to-the-left",
    title: "To The Left",
    category: "Website",
    image: websiteToTheLeft,
    liveUrl: "https://super-cranachan-fa4ff0.netlify.app/",
    metaTitle: "To The Left — Modern Landing Page",
    metaDescription:
      "A modern landing page experience designed and built by MaHaVi, focused on a clear first impression and a fast path to action.",
    summary:
      "A modern landing page experience, built to make a strong first impression and get a visitor to the point of the page without friction.",
    paragraphs: [
      "A landing page lives or dies in the first few seconds, so the priorities were speed, a clear visual hierarchy, and a message that lands before anyone has to scroll. That meant paring the page back to what actually earns its place above the fold.",
      "The design leans on motion and layout rather than dense copy to hold attention, with every section building toward a single, obvious next step for the visitor to take.",
      "Performance was treated as part of the design, not an afterthought bolted on at the end — a landing page that loads slowly loses the visitor it was built to convert before the message even renders.",
      "Nothing on the page is there by default. Every section earned its place by moving the visitor a step closer to the action the page exists to get.",
    ],
    highlights: [
      "Built for a fast first impression above the fold",
      "Motion and layout used deliberately, not decoratively",
      "One clear call to action carried through the page",
    ],
    services: ["web-development", "branding-identity"],
  },
  {
    slug: "manual-is",
    title: "Manual.is",
    category: "Website",
    image: websiteManual,
    liveUrl: "https://www.manual.is/",
    metaTitle: "Manual.is — Health & Wellness Platform",
    metaDescription:
      "A health and wellness platform MaHaVi designed and built for Manual.is, presenting its offering with a calm, trustworthy interface.",
    summary:
      "A health and wellness platform, designed so information that's genuinely sensitive to a visitor reads as calm and trustworthy rather than clinical.",
    paragraphs: [
      "Health and wellness content has to earn trust before it earns a click, so the design work went into a calm visual language, clear information hierarchy and copy that a visitor can scan without feeling sold to.",
      "The build focused on making the offering easy to understand at a glance, with a clean, responsive interface that holds up whether someone lands from search, social or a direct link.",
      "None of that works if the site itself feels slow or cluttered, so the same attention went into load times and page structure as into the visual design — the two aren't separable for a site whose whole job is to be believed.",
      "The goal throughout was a site a visitor could trust within the first few seconds, well before they read a single line of the offering itself.",
    ],
    highlights: [
      "Calm, trust-building visual language for a health & wellness audience",
      "Content structured to be scannable rather than dense",
      "Responsive across the range of devices real visitors arrive on",
    ],
    services: ["web-development", "branding-identity"],
  },
  {
    slug: "facebook-page-boost-bot",
    title: "Facebook Page Boost Bot",
    category: "Automation",
    image: projectFacebookBot,
    metaTitle: "Facebook Page Boost Bot — Automation Project",
    metaDescription:
      "An automated system MaHaVi built to handle strategic Facebook page boosting and audience engagement growth without manual, day-to-day upkeep.",
    summary:
      "An automated system for strategic Facebook page boosting, built so audience growth keeps running without someone manually managing it day to day.",
    paragraphs: [
      "Growing a Facebook page's reach usually means someone repeating the same boosting and engagement tasks on a schedule. We replaced that manual routine with an automated system that handles the strategy consistently instead of whenever someone remembers to.",
      "The bot runs the boosting logic on its own schedule, freeing the client's time for the content and community side of the page rather than the repetitive mechanics behind it.",
      "It's the kind of project that doesn't need a public face to be worth building well: the value shows up entirely in the hours it gives back and the consistency it holds, not in a page a visitor ever lands on.",
      "Automation like this is only worth having if it can be trusted to run unattended, so it was built to keep working quietly in the background rather than needing to be checked on.",
    ],
    highlights: [
      "Replaces manual, repetitive boosting tasks with an automated schedule",
      "Consistent execution instead of ad-hoc, memory-dependent upkeep",
      "Frees the client's time for content and community, not mechanics",
    ],
    services: ["ai-integration", "social-media"],
  },
  {
    slug: "pdp-party-of-nepal",
    title: "PDP Party of Nepal",
    category: "Digital Strategy",
    image: projectPdpNepal,
    metaTitle: "PDP Party of Nepal — Digital Strategy",
    metaDescription:
      "Digital strategy and creative media work MaHaVi delivered for the PDP Party of Nepal's online presence.",
    summary:
      "Digital strategy and creative media for the PDP Party of Nepal's online presence — planning and producing the material that carries a public-facing identity online.",
    paragraphs: [
      "A political party's online presence has to stay consistent across posts, visuals and messaging produced under real time pressure. We worked on the strategy behind that presence and produced the creative media it runs on.",
      "The work covered planning the digital approach and producing the visual material that puts it into practice, aimed at a consistent, recognisable presence rather than one-off posts.",
      "Keeping the strategy and the production under one roof meant the messaging and the visuals were built to match from the start, instead of a design team interpreting a plan it had no part in shaping.",
      "That alignment is what a public-facing presence needs most: every piece of media traceable back to the same plan, rather than a set of one-off assets that happen to share a logo.",
    ],
    highlights: [
      "Strategy and creative production handled together, not separately",
      "Consistent visual identity across the party's online presence",
      "Media produced to a public-facing standard under real deadlines",
    ],
    services: ["digital-marketing-consulting", "branding-identity"],
  },
];

export const getProjectDetail = (slug: string) => PROJECT_DETAILS.find((p) => p.slug === slug);

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
  /** External destination, when the platform has a public URL to send a visitor to. */
  liveUrl?: string;
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
    liveUrl: "https://radhakundah.com/",
    metaTitle: "Nikunja Seva Case Study — Radhakundah Platform",
    metaDescription:
      "How MaHaVi built Radhakundah for Nikunja Seva Pty Ltd, Australia — a research and publishing platform with gated papers, full-text PDF search and a 128-endpoint API.",
    summary:
      "A research library, a publishing house and a membership platform sharing one codebase — built for an Australian client, delivered end to end, and running as a single service in Azure.",
    facts: [
      { label: "Client", value: "Nikunja Seva Pty Ltd" },
      { label: "Location", value: "Australia" },
      { label: "Engagement", value: "Full-stack build, design to deployment" },
      { label: "Delivered by", value: "MaHaVi — mahavi.tech" },
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
