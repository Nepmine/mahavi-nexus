import {
  Brain,
  Code2,
  Megaphone,
  Monitor,
  Palette,
  PenTool,
  Smartphone,
  Video,
  type LucideIcon,
} from "lucide-react";

export type ServiceSide = "tech" | "creative";

export interface Service {
  slug: string;
  /** The card title on the homepage. Do not change without changing the design. */
  title: string;
  /** The card line on the homepage. Do not change without changing the design. */
  desc: string;
  Icon: LucideIcon;
  side: ServiceSide;
  /** <title> for the service page — front-loaded keyword, brand last. */
  metaTitle: string;
  metaDescription: string;
  /** H1 on the service page. */
  heading: string;
  intro: string;
  /** Body paragraphs. Real copy, because thin pages do not rank. */
  body: string[];
  deliverables: string[];
  stack: string[];
  faqs: { q: string; a: string }[];
  related: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    desc: "Modern, fast, scalable web applications",
    Icon: Code2,
    side: "tech",
    metaTitle: "Web Development Services — Fast, SEO-Ready Sites",
    metaDescription:
      "Custom web development with React, Next.js and TypeScript. Server-rendered, Core Web Vitals-tuned sites and web applications built to rank and to convert.",
    heading: "Web Development",
    intro:
      "Websites and web applications that load fast, read well to search engines, and keep working as the business behind them grows.",
    body: [
      "Most sites are slow because of what they ship, not what they say. We build on React and Next.js with server rendering by default, so the page arrives as HTML rather than as a bundle a browser has to assemble first. That is the difference between a crawler indexing your content on the first pass and waiting for a render queue that may never come.",
      "Everything is typed end to end with TypeScript, so a change to a data shape breaks the build rather than a customer's checkout. Images are served in modern formats at the size the layout actually needs. Fonts are self-hosted so there is no third-party round trip before the first word appears.",
      "We work in the open: a staging URL from the first week, deploy previews on every change, and analytics wired in before launch rather than after. You see the site take shape instead of receiving it finished.",
    ],
    deliverables: [
      "Design system and responsive layouts down to 320px",
      "Server-rendered pages with per-route metadata and canonicals",
      "Structured data, sitemap and robots configured for indexing",
      "Core Web Vitals budget agreed up front and measured at launch",
      "CMS or content model where the site needs to be edited without us",
      "Analytics, search-console verification and a launch checklist",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Vercel", "Azure"],
    faqs: [
      {
        q: "How long does a website take to build?",
        a: "A marketing site with a handful of pages is typically three to five weeks from kickoff to launch. A web application with accounts, payments or a dashboard is measured in months, and we scope it in phases so something real is live early rather than everything arriving at the end.",
      },
      {
        q: "Will the site be good for SEO?",
        a: "It is built that way rather than fixed afterwards. Pages are server-rendered so crawlers get real HTML, every route carries its own title, description and canonical, structured data is emitted per content type, and the sitemap is generated from the site's own routes so it cannot drift out of date.",
      },
      {
        q: "Can you rebuild an existing site without losing rankings?",
        a: "Yes. We map every existing URL before anything is rebuilt, keep the ones that earn traffic, and 301 the rest to their closest replacement so link equity follows the content instead of dropping into a 404.",
      },
      {
        q: "Do you hand over the code?",
        a: "The repository is yours. We work in your GitHub organisation where you have one, and hand over the repository, the environment variables and the deployment at the end where you do not.",
      },
    ],
    related: ["saas-platforms", "app-development", "ai-integration"],
  },
  {
    slug: "app-development",
    title: "App Development",
    desc: "Native & cross-platform mobile apps",
    Icon: Smartphone,
    side: "tech",
    metaTitle: "Mobile App Development — iOS & Android",
    metaDescription:
      "Mobile app development for iOS and Android. Cross-platform builds from one codebase, offline-tolerant, with the API and store submission handled end to end.",
    heading: "App Development",
    intro:
      "Mobile apps for iOS and Android, built from one codebase where that is the right call and natively where it is not.",
    body: [
      "The first question is not which framework — it is whether the product needs an app at all. Plenty of ideas are better served by a fast mobile web experience that nobody has to install. When an app genuinely earns its place, cross-platform gets you both stores from one codebase, and we say so plainly when a native build is the honest answer instead.",
      "Phones lose signal. We design for that: local state that survives a dropped connection, requests that retry without duplicating an order, and screens that tell the user what is happening rather than spinning. The API is built alongside the app, not bolted on, so the two agree on every payload.",
      "Store submission is part of the work — icons, screenshots, privacy declarations, review notes and the first release. It is where most timelines slip, so we plan for it rather than discovering it.",
    ],
    deliverables: [
      "iOS and Android builds from a single reviewed codebase",
      "Offline-tolerant data layer with retry and conflict handling",
      "Push notifications, deep links and analytics",
      "Backend API and admin surface where the app needs one",
      "App Store and Play Store submission, assets and release notes",
      "Crash reporting and a post-launch support window",
    ],
    stack: ["React Native", "TypeScript", "Expo", "Node.js", "PostgreSQL", "Firebase"],
    faqs: [
      {
        q: "Native or cross-platform?",
        a: "Cross-platform for anything that is mostly screens, data and forms — one codebase, both stores, materially less to maintain. Native when the product depends on something platform-specific: heavy graphics, background hardware access, or a device API that has no dependable bridge.",
      },
      {
        q: "Do you build the backend too?",
        a: "Yes, and we prefer to. An app and its API are one product; splitting them across two teams is where most integration pain comes from.",
      },
      {
        q: "What happens after launch?",
        a: "Apps need maintenance the day the OS updates. We offer a support window covering OS releases, store policy changes and crash triage, so the app does not quietly break six months in.",
      },
    ],
    related: ["web-development", "saas-platforms", "ai-integration"],
  },
  {
    slug: "ai-integration",
    title: "AI Integration",
    desc: "Smart automation & machine learning",
    Icon: Brain,
    side: "tech",
    metaTitle: "AI Integration & Automation Services",
    metaDescription:
      "Practical AI integration: assistants, document understanding, semantic search and workflow automation, wired into what you already run — with cost control.",
    heading: "AI Integration",
    intro:
      "AI added where it removes real work, wired into the systems you already run — not a chatbot bolted onto a homepage.",
    body: [
      "The useful question is which task currently costs a person hours and tolerates a machine getting it mostly right with a human check. Support triage, document extraction, search that understands a question instead of matching keywords, drafting that a person edits rather than writes. Those pay for themselves. A general-purpose assistant on a marketing page rarely does.",
      "We build with evaluation from the start: a set of real examples with known-good answers, scored on every change, so a prompt or model swap is a measurement rather than a vibe. Cost is a design constraint too — caching, routing cheap requests to smaller models, and a hard ceiling so a runaway loop cannot produce a surprise invoice.",
      "Anything that touches your data gets the boring safeguards: what leaves your infrastructure is decided explicitly, prompts are versioned, outputs are logged, and a person stays in the loop wherever a wrong answer would be expensive.",
    ],
    deliverables: [
      "A scoped use case with a measurable before-and-after",
      "Retrieval over your own documents and data where it applies",
      "An evaluation set and a scoring harness that runs on every change",
      "Cost and rate-limit controls with a hard spend ceiling",
      "Human review paths for anything consequential",
      "Deployment into your existing product and a handover doc",
    ],
    stack: ["Claude API", "OpenAI API", "TypeScript", "Python", "Vector search", "PostgreSQL"],
    faqs: [
      {
        q: "Where does AI actually pay off?",
        a: "Repetitive reading and writing. Classifying and routing inbound messages, pulling structured fields out of invoices or forms, answering questions from a document set, and drafting text a person then edits. Anything requiring a guaranteed-correct answer with no human check is a poor fit.",
      },
      {
        q: "Does our data get used for training?",
        a: "Not on the business API tiers we build against, and we confirm the terms of whichever provider a project uses in writing before any data moves. Where the data cannot leave your infrastructure at all, that constraint shapes the architecture from day one.",
      },
      {
        q: "How do you keep costs predictable?",
        a: "Cache what repeats, send the cheap requests to a smaller model, cap tokens per request, and set a hard monthly ceiling with alerting well before it. You get a projected cost per thousand requests before we build, not after.",
      },
    ],
    related: ["saas-platforms", "web-development", "digital-marketing-consulting"],
  },
  {
    slug: "saas-platforms",
    title: "SaaS Platforms",
    desc: "End-to-end product development",
    Icon: Monitor,
    side: "tech",
    metaTitle: "SaaS Product Development, End to End",
    metaDescription:
      "End-to-end SaaS development: multi-tenant architecture, roles and permissions, an admin console, and an API built to carry the next module without a rewrite.",
    heading: "SaaS Platforms",
    intro:
      "Multi-tenant products built end to end — the customer-facing app, the staff console behind it, and the API that will still make sense to the next developer.",
    body: [
      "A SaaS platform is three products wearing one name: what a customer sees, what your team uses to run it, and the API holding them together. Skip the second and your team ends up in the database. Skip the third and the mobile app you commission next year turns into a rewrite.",
      "We start with the tenancy model, because it is the one decision that is expensive to change later — how accounts, organisations, branches and roles relate, and what a given role may reach. Permissions are enforced at the API, not hidden in the interface, so a screen a user should not see is also an endpoint they cannot call.",
      "Every endpoint is documented as it is written, with one response envelope and a fixed set of error codes, published as a browsable reference. Audit logging, health checks and automated backups go in from the start; they are the things nobody asks for until the day they are the only thing that matters.",
    ],
    deliverables: [
      "Tenancy, roles and permission model enforced at the API",
      "Customer application and internal staff console",
      "Documented API with one response envelope and typed errors",
      "Authentication, sessions and token rotation done properly",
      "Audit trail, health probes and automated backups",
      "Deployment pipeline, environments and a runbook",
    ],
    stack: ["Next.js", "React", "TypeScript", "Fastify", "Prisma", "PostgreSQL", "Azure", "Vercel"],
    faqs: [
      {
        q: "Can you take over an existing platform?",
        a: "Often, yes. We start with a read-only audit — schema, endpoints, auth, deployment — and come back with what is sound, what is load-bearing and fragile, and what we would change first. You get that assessment whether or not you continue with us.",
      },
      {
        q: "How do you handle multi-tenancy?",
        a: "Shared schema with tenant scoping enforced in the data layer for most products, so one migration serves everyone. Where a client's compliance position demands isolation, separate databases per tenant. That decision is made before the first table exists.",
      },
      {
        q: "What about a mobile app later?",
        a: "The API is built as the product's real interface from the beginning, with public, member and staff routes separated by address. A mobile client added later consumes what already exists rather than forcing a redesign.",
      },
    ],
    related: ["web-development", "app-development", "ai-integration"],
  },
  {
    slug: "branding-identity",
    title: "Branding & Identity",
    desc: "Logos, style guides, brand systems",
    Icon: Palette,
    side: "creative",
    metaTitle: "Branding & Visual Identity Design",
    metaDescription:
      "Brand identity design: logo, colour, type, and a usable system with guidelines — so everything your business publishes looks like it came from the same place.",
    heading: "Branding & Identity",
    intro:
      "A logo is the smallest part. What you need is a system that still looks right on a business card, an invoice, a billboard and a phone screen.",
    body: [
      "We start with the parts nobody sees: who you are actually talking to, what you sound like, and what your competitors have already claimed visually. A palette chosen against that brief holds up. One chosen because it looked good in the deck does not survive contact with a real photograph.",
      "The identity ships as a working system — logo in every lockup and file format your team will need, a palette with defined roles rather than a row of swatches, type scale, spacing, iconography, and rules for what to do when something is not covered. Colour is checked for contrast so the brand is legible to everyone and does not fail an accessibility audit later.",
      "Guidelines are written for the people who will use them: your designer, your printer, your intern posting on a Tuesday. Short, specific and full of examples of what not to do.",
    ],
    deliverables: [
      "Primary logo, lockups, monogram and favicon in every needed format",
      "Colour palette with defined roles and checked contrast",
      "Type scale, spacing system and iconography direction",
      "Brand guidelines document with real do and don't examples",
      "Templates: social, presentation, letterhead, invoice",
      "Source files, fully editable and yours",
    ],
    stack: ["Adobe Illustrator", "Photoshop", "Figma", "After Effects"],
    faqs: [
      {
        q: "How many logo options do we see?",
        a: "Three directions, each a genuine strategic route rather than three variations on one idea. We take the chosen route through two rounds of refinement to a finished system.",
      },
      {
        q: "Do we own the artwork?",
        a: "Fully, including editable source files. We hand over the working files, not only exports.",
      },
      {
        q: "Can you refresh a brand without starting over?",
        a: "Yes — that is often the right call when the existing mark has earned recognition. We keep the equity you already have and rebuild the system around it.",
      },
    ],
    related: ["video-production", "social-media", "web-development"],
  },
  {
    slug: "video-production",
    title: "Video Production",
    desc: "Motion graphics & cinematic content",
    Icon: Video,
    side: "creative",
    metaTitle: "Video Production & Motion Graphics",
    metaDescription:
      "Video production and motion graphics: brand films, product explainers, social ads and 3D animation, cut for every platform and delivered with captions.",
    heading: "Video Production",
    intro:
      "Motion graphics, 3D and cinematic content — made for where it will actually be watched, which is usually a phone with the sound off.",
    body: [
      "A film that works on a cinema screen and a nine-second vertical cut are different products, not different exports. We plan both from the same shoot and the same board, so the platform versions are deliberate rather than salvaged.",
      "Most social video is watched muted, so the story has to survive without audio: captions burned in, the point made in the first two seconds, and typography that is legible at thumbnail size. Sound then adds to a piece that already works instead of carrying it.",
      "Our 3D and motion work is built in-house — environments, product renders, title sequences and visual effects — which means changes are a project file away rather than a re-quote.",
      "Video is also the format search engines reward least generously and social platforms reward most, so we plan the surrounding assets at the same time: the thumbnail frames, the stills, the captions file and the description copy. A film with no metadata around it is a file nobody finds twice.",
    ],
    deliverables: [
      "Concept, script and storyboard before anything is shot",
      "Production or full 3D and motion build, as the piece needs",
      "Colour grade, sound design and licensed music",
      "Platform cuts: 16:9, 1:1, 9:16, with burned-in captions",
      "Thumbnail frames and stills pulled from the same material",
      "Masters and platform exports delivered as files you keep",
    ],
    stack: ["After Effects", "Blender", "Cinema 4D", "Premiere Pro", "DaVinci Resolve"],
    faqs: [
      {
        q: "Do you shoot, or is it all animation?",
        a: "Both, and often together. A live shoot with motion-graphic overlays covers more ground than either alone for most brand and product work.",
      },
      {
        q: "How long is a typical turnaround?",
        a: "A social cut is around a week. A full brand film with a shoot runs three to six weeks depending on locations, cast and how many rounds of feedback the piece goes through.",
      },
      {
        q: "Can you work from our existing footage?",
        a: "Yes. Edit, grade, motion graphics and sound on material you already have is a common and much cheaper starting point.",
      },
    ],
    related: ["branding-identity", "social-media", "digital-marketing-consulting"],
  },
  {
    slug: "social-media",
    title: "Social Media",
    desc: "Strategy, content & management",
    Icon: Megaphone,
    side: "creative",
    metaTitle: "Social Media Marketing & Management",
    metaDescription:
      "Social media management: strategy built on what your audience actually engages with, a calendar that ships on time, and reporting tied to business outcomes.",
    heading: "Social Media",
    intro:
      "Strategy, content and day-to-day management — measured against what the business needs, not against a follower count.",
    body: [
      "Followers are the easiest number to move and the least likely to matter. We agree at the start what a good month looks like — qualified enquiries, bookings, sign-ups, sales — and report against that, with reach and engagement as the diagnostics they are.",
      "The strategy comes out of evidence: what your audience already engages with, what your competitors have not claimed, and which platforms your customers are genuinely on. Then a calendar that ships. Consistency beats brilliance on social, and the main reason accounts stall is that nobody had the next two weeks ready.",
      "Community management is part of it. Replies, comments and DMs are where most of the actual conversion happens, and they need answering the same day rather than in the next reporting cycle.",
    ],
    deliverables: [
      "Audience and competitor research, and a platform decision",
      "Content pillars and a monthly calendar approved in advance",
      "Design and copy for every post, in your brand system",
      "Scheduling, publishing and same-day community management",
      "Paid amplification where it earns its place",
      "Monthly report against agreed business outcomes",
    ],
    stack: ["Meta Business Suite", "Instagram", "LinkedIn", "TikTok", "YouTube", "Canva", "Figma"],
    faqs: [
      {
        q: "Which platforms should we be on?",
        a: "Usually fewer than you think. Two done properly outperform five done occasionally. We recommend based on where your customers actually are, not on which platform is currently being written about.",
      },
      {
        q: "Do you handle paid ads as well as organic?",
        a: "Yes. Organic proves what resonates, paid puts money behind the pieces that already worked. Spending on untested creative is the most common way budget disappears.",
      },
      {
        q: "How quickly do results show?",
        a: "Engagement moves within weeks. Enquiries and sales attributable to social typically take two to three months of consistent publishing. Anyone promising faster is describing an ad spend, not a social strategy.",
      },
    ],
    related: ["digital-marketing-consulting", "video-production", "branding-identity"],
  },
  {
    slug: "digital-marketing-consulting",
    title: "Digital Marketing & Consulting",
    desc: "Content writing, strategy & business growth",
    Icon: PenTool,
    side: "creative",
    metaTitle: "Digital Marketing & SEO Consulting",
    metaDescription:
      "SEO and content strategy, conversion-focused copywriting and digital consulting for growing businesses — reporting tied to revenue, not to vanity metrics.",
    heading: "Digital Marketing & Consulting",
    intro:
      "Search, content and strategy — the work that compounds, rather than the spend that stops the day you stop paying.",
    body: [
      "Search is the most durable channel a business can build, because a page that ranks keeps earning after the invoice is paid. We start with what people actually type, map it to what you can honestly claim, and build pages that answer the query properly rather than pages stuffed with the phrase.",
      "Technical SEO comes first, because content on a slow, badly structured site is content nobody finds: crawlable architecture, clean internal linking, correct canonicals, structured data, and Core Web Vitals inside budget. Then the content that earns links and the internal links that pass authority to the pages that sell.",
      "Consulting is the part that sits above all of it — pricing, positioning, which channel deserves the next rupee, and what to stop doing. Often the most valuable output of a month is a shorter list.",
    ],
    deliverables: [
      "Keyword and intent research mapped to real pages",
      "Technical SEO audit with fixes prioritised by impact",
      "Content plan and conversion-focused copywriting",
      "On-page optimisation, internal linking and structured data",
      "Search Console and analytics set up and actually read",
      "Monthly reporting against pipeline, not impressions",
    ],
    stack: ["Google Search Console", "GA4", "Ahrefs", "Screaming Frog", "Looker Studio"],
    faqs: [
      {
        q: "How long does SEO take to work?",
        a: "Technical fixes can move things within weeks. Ranking for competitive commercial terms is a three-to-six month project, and honest agencies say so. What we can promise early is a site that is fully indexable and a plan you can see progress against.",
      },
      {
        q: "Do you guarantee first place on Google?",
        a: "No, and neither can anyone else — the ranking system is not ours to control. What we control is everything Google measures: crawlability, speed, structure, relevance, internal linking and content quality. We do those to a standard, and report the positions honestly.",
      },
      {
        q: "Can you work alongside our in-house team?",
        a: "Frequently how it goes. We set the strategy and the technical foundation, your team writes with the domain knowledge they already have, and we review.",
      },
    ],
    related: ["web-development", "social-media", "ai-integration"],
  },
];

export const TECH_SERVICES = SERVICES.filter((s) => s.side === "tech");
export const CREATIVE_SERVICES = SERVICES.filter((s) => s.side === "creative");

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
