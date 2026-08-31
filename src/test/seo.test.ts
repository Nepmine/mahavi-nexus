import { describe, expect, it } from "vitest";

import { SERVICES } from "@/content/services";
import { SITE, absoluteUrl, whatsappUrl } from "@/content/site";
import { CASE_STUDIES, PROJECT_DETAILS, projectItems, websiteItems } from "@/content/work";
import sitemap from "@/app/sitemap";

/** What `metadata.title.template` in app/layout.tsx appends to every page. */
const TITLE_SUFFIX = ` | ${SITE.name}`;

/**
 * These are the invariants that quietly break a site's search performance and
 * that nobody notices by looking at the page: a duplicate slug, a route missing
 * from the sitemap, a title that gets truncated in the result. Each one is
 * cheap to assert and expensive to discover in Search Console three months on.
 */

describe("site constants", () => {
  it("has an https canonical origin with no trailing slash", () => {
    expect(SITE.url).toMatch(/^https:\/\//);
    expect(SITE.url.endsWith("/")).toBe(false);
  });

  it("builds absolute URLs consistently", () => {
    expect(absoluteUrl("/")).toBe(SITE.url);
    expect(absoluteUrl("/services")).toBe(`${SITE.url}/services`);
    expect(absoluteUrl("/services/web-development")).toBe(`${SITE.url}/services/web-development`);
  });

  it("encodes the WhatsApp prefill", () => {
    expect(whatsappUrl("a b")).toBe(`https://wa.me/${SITE.whatsapp}?text=a%20b`);
  });
});

describe("services", () => {
  it("has unique slugs", () => {
    const slugs = SERVICES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses lowercase kebab-case slugs", () => {
    for (const service of SERVICES) expect(service.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("keeps titles inside the ~60 character search-result cut", () => {
    // The layout appends " | MaHaVi", so the rendered title is longer than the
    // literal — that suffix is what pushes a title over the display width.
    for (const service of SERVICES) {
      const rendered = `${service.metaTitle}${TITLE_SUFFIX}`;
      expect(rendered.length, `${service.slug} rendered title "${rendered}"`).toBeLessThanOrEqual(62);
      expect(service.metaTitle.length).toBeGreaterThan(20);
    }
  });

  it("keeps descriptions inside the ~160 character snippet", () => {
    for (const service of SERVICES) {
      expect(service.metaDescription.length, `${service.slug} description`).toBeLessThanOrEqual(165);
      expect(service.metaDescription.length).toBeGreaterThan(70);
    }
  });

  it("has enough body copy per page to be worth indexing", () => {
    for (const service of SERVICES) {
      const words = service.body.join(" ").split(/\s+/).length;
      expect(words, `${service.slug} body`).toBeGreaterThan(120);
    }
  });

  it("only cross-links to services that exist", () => {
    const slugs = new Set(SERVICES.map((s) => s.slug));
    for (const service of SERVICES) {
      for (const related of service.related) {
        expect(slugs.has(related), `${service.slug} → ${related}`).toBe(true);
      }
      expect(service.related).not.toContain(service.slug);
    }
  });

  it("carries FAQ entries for the FAQPage schema", () => {
    for (const service of SERVICES) {
      expect(service.faqs.length, `${service.slug} faqs`).toBeGreaterThanOrEqual(3);
      for (const faq of service.faqs) {
        expect(faq.q.endsWith("?")).toBe(true);
        expect(faq.a.length).toBeGreaterThan(60);
      }
    }
  });
});

describe("case studies", () => {
  it("has unique slugs and real metadata", () => {
    const slugs = CASE_STUDIES.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const study of CASE_STUDIES) {
      expect(`${study.metaTitle}${TITLE_SUFFIX}`.length, study.slug).toBeLessThanOrEqual(62);
      expect(study.metaDescription.length).toBeLessThanOrEqual(170);
      expect(study.sections.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("only claims services the site actually offers", () => {
    const slugs = new Set(SERVICES.map((s) => s.slug));
    for (const study of CASE_STUDIES) {
      for (const service of study.services) expect(slugs.has(service), service).toBe(true);
    }
  });

  it("is reachable from the portfolio grid", () => {
    for (const study of CASE_STUDIES) {
      expect(projectItems.some((p) => p.href === `/work/${study.slug}`), study.slug).toBe(true);
    }
  });
});

describe("portfolio links", () => {
  it("points external website cards at absolute https URLs", () => {
    for (const site of websiteItems) expect(site.url).toMatch(/^https:\/\//);
  });

  it("gives every portfolio card an internal detail page", () => {
    for (const site of websiteItems) {
      expect(PROJECT_DETAILS.some((p) => p.slug === site.slug), site.slug).toBe(true);
    }
    for (const project of projectItems) {
      const hasCaseStudy = CASE_STUDIES.some((c) => c.slug === project.slug);
      const hasDetail = PROJECT_DETAILS.some((p) => p.slug === project.slug);
      expect(hasCaseStudy || hasDetail, project.slug).toBe(true);
      expect(project.href).toBe(`/work/${project.slug}`);
    }
  });
});

describe("project details", () => {
  it("has unique slugs and real metadata", () => {
    const slugs = PROJECT_DETAILS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const detail of PROJECT_DETAILS) {
      expect(`${detail.metaTitle}${TITLE_SUFFIX}`.length, detail.slug).toBeLessThanOrEqual(62);
      expect(detail.metaDescription.length).toBeGreaterThan(70);
      expect(detail.metaDescription.length).toBeLessThanOrEqual(170);
      expect(detail.paragraphs.join(" ").split(/\s+/).length, detail.slug).toBeGreaterThan(60);
    }
  });

  it("only claims services the site actually offers", () => {
    const slugs = new Set(SERVICES.map((s) => s.slug));
    for (const detail of PROJECT_DETAILS) {
      for (const service of detail.services) expect(slugs.has(service), service).toBe(true);
    }
  });

  it("does not collide with case-study slugs", () => {
    const caseSlugs = new Set(CASE_STUDIES.map((c) => c.slug));
    for (const detail of PROJECT_DETAILS) expect(caseSlugs.has(detail.slug)).toBe(false);
  });
});

describe("sitemap", () => {
  const urls = sitemap().map((entry) => entry.url);

  it("lists every static route once", () => {
    expect(new Set(urls).size).toBe(urls.length);
    for (const path of ["/", "/services", "/work", "/about", "/contact"]) {
      expect(urls).toContain(absoluteUrl(path));
    }
  });

  it("lists every service, case-study and project-detail page", () => {
    for (const service of SERVICES) expect(urls).toContain(absoluteUrl(`/services/${service.slug}`));
    for (const study of CASE_STUDIES) expect(urls).toContain(absoluteUrl(`/work/${study.slug}`));
    for (const detail of PROJECT_DETAILS) expect(urls).toContain(absoluteUrl(`/work/${detail.slug}`));
  });

  it("only lists absolute URLs on the canonical origin", () => {
    for (const url of urls) expect(url.startsWith(SITE.url)).toBe(true);
  });
});
