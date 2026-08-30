import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import { DesignGrid, ProjectGrid, WebsiteGrid } from "@/components/PortfolioSection";
import CTABand from "@/components/page/CTABand";
import PageHero from "@/components/page/PageHero";
import { absoluteUrl } from "@/content/site";
import { CASE_STUDIES, projectItems, websiteItems } from "@/content/work";
import { breadcrumbSchema, orgRef, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Work — Websites, Platforms & Creative Projects",
  description:
    "Selected MaHaVi work: a research and publishing platform for an Australian client, live client websites, automation projects, 3D design and motion graphics.",
  path: "/work",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
];

export default function WorkPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Portfolio"
        trail={trail}
        title={
          <>
            Work that <span className="gradient-text-creative">speaks</span>
          </>
        }
        lead="Platforms, websites and creative work for clients in Nepal, Australia and beyond — with the detail behind the ones worth explaining properly."
      />

      {/* Case studies first: they are the pages with something to read. */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 reveal">Case studies</h2>
          <div className="grid gap-6">
            {CASE_STUDIES.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="reveal group glass rounded-2xl p-8 md:p-10 hover-lift block border border-border hover:border-accent/40 transition-all duration-300"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {study.client}
                  </span>
                  <span className="text-xs text-muted-foreground">{study.clientCountry}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{study.year}</span>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {study.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-3xl">{study.summary}</p>
                <div className="mt-8 flex flex-wrap gap-8">
                  {study.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="font-heading text-3xl font-bold gradient-text-tech">{metric.value}</p>
                      <p className="text-xs text-muted-foreground mt-1 max-w-[140px]">{metric.label}</p>
                    </div>
                  ))}
                </div>
                <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read the case study
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 reveal">Websites</h2>
          <WebsiteGrid />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 reveal">Projects</h2>
          <ProjectGrid />
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 reveal">
            Design &amp; motion
          </h2>
          <DesignGrid />
        </div>
      </section>

      <CTABand
        heading="Your project"
        accent="next."
        lead="Every one of these started as a conversation about a problem. Start yours."
      />

      <JsonLd
        schemas={[
          breadcrumbSchema(trail),
          {
            "@type": "CollectionPage",
            "@id": `${absoluteUrl("/work")}#webpage`,
            url: absoluteUrl("/work"),
            name: "Our Work",
            description:
              "Selected MaHaVi work: platforms, client websites, automation projects and creative production.",
            about: orgRef,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                ...CASE_STUDIES.map((study, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: `${study.client} — ${study.title}`,
                  url: absoluteUrl(`/work/${study.slug}`),
                })),
                ...websiteItems.map((site, i) => ({
                  "@type": "ListItem",
                  position: CASE_STUDIES.length + i + 1,
                  name: site.title,
                  url: site.url,
                })),
                ...projectItems
                  .filter((project) => !project.href)
                  .map((project, i) => ({
                    "@type": "ListItem",
                    position: CASE_STUDIES.length + websiteItems.length + i + 1,
                    name: project.title,
                  })),
              ],
            },
          },
        ]}
      />
    </PageShell>
  );
}
