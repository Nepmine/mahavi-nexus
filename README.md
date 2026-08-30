# MaHaVi — mahavi.tech

The MaHaVi agency site. Next.js 15 (App Router) · React 18 · TypeScript ·
Tailwind CSS · deployed on Vercel.

Every route is prerendered to static HTML at build time. There is no database,
no API and no runtime rendering — the whole site is files on a CDN.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build — prerenders every route |
| `npm start` | Serve the build locally |
| `npm run lint` | ESLint, including `next/core-web-vitals` |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest — the SEO invariants in `src/test/seo.test.ts` |

## Layout

```
src/
├─ app/                     routes — all server components unless noted
│  ├─ layout.tsx            fonts, sitewide metadata, Organization + WebSite JSON-LD
│  ├─ page.tsx              homepage
│  ├─ services/             hub + one page per service, generated from data
│  ├─ work/                 portfolio hub + case-study pages
│  ├─ about/  contact/
│  ├─ sitemap.ts  robots.ts  manifest.ts  not-found.tsx
│  ├─ opengraph-image.tsx   plus one per dynamic segment
│  └─ icon.svg  apple-icon.png  favicon.ico
├─ content/                 the single source of truth — see below
│  ├─ site.ts               name, URL, email, WhatsApp, address, areaServed
│  ├─ services.ts           the eight services, copy and FAQs included
│  └─ work.ts               portfolio items and full case studies
├─ components/              sections, shared page furniture, shadcn/ui primitives
├─ lib/  seo.ts             metadata builder + JSON-LD builders
└─ test/seo.test.ts
```

### Content is data, not markup

Nothing about a service or a case study is written into a component. Add an
entry to `src/content/services.ts` and the site gains a page at
`/services/<slug>`, a card on the homepage, a card on `/services`, a footer
link, a sitemap entry, an OG image, `Service` and `FAQPage` structured data,
and cross-links from whatever else lists it as related. The same is true of
`CASE_STUDIES` in `src/content/work.ts`.

That is deliberate: the way a site quietly loses search performance is a page
that exists but is missing from the sitemap, or a slug that changed in one place
and not the other. Here there is only one place.

## SEO

The reason this is Next.js rather than a single-page app: a crawler receives
finished HTML on the first response. Nothing that must be indexed is fetched in
the browser.

- **Canonicals.** Every page emits one absolute canonical, built by
  `pageMetadata()` in `src/lib/seo.ts`. No page sets metadata any other way.
- **Titles and descriptions.** Unique per route. `src/test/seo.test.ts` fails
  the build's test run if one grows past the length search results actually show.
- **Structured data.** One `@graph` per page. `Organization` and `WebSite` are
  declared once in the layout and referenced by `@id` from every page below —
  `Service`, `FAQPage`, `Article`, `BreadcrumbList`, `CollectionPage`,
  `AboutPage`, `ContactPage`.
- **Sitemap and robots** are generated from the route data (`app/sitemap.ts`,
  `app/robots.ts`), so they cannot drift out of date.
- **Open Graph images** are rendered at build time by `src/lib/og.tsx` — one
  card design, filled per route, so every shared link looks like this site.
- **Internal linking.** The footer carries every page. Service cards on the
  homepage link to their pages, case studies link to the services they used,
  and each service links back to the work that proves it.
- **Redirects.** `next.config.mjs` keeps `/portfolio`, `/projects` and
  `/case-studies` alive as 301s to `/work`.
- **Performance.** Fonts self-hosted via `next/font`, images served as AVIF/WebP
  at the size the layout needs, `_next/static` immutable-cached, no client-side
  data fetching anywhere.

### Changing the canonical domain

`SITE.url` in `src/content/site.ts` is the only place the domain is written.
Everything absolute — canonicals, OG URLs, the sitemap, `robots.txt`, JSON-LD —
is derived from it.

## Deployment

Vercel, from `main`. Framework preset **Next.js** — if the project was
previously configured for Vite, the preset, build command and output directory
all need clearing so Vercel uses its Next.js defaults.

After the first deploy on a new domain: submit `https://mahavi.tech/sitemap.xml`
in Google Search Console and Bing Webmaster Tools. Nothing else is required —
the sitemap is regenerated on every build.
