import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import CTABand from "@/components/page/CTABand";
import PageHero from "@/components/page/PageHero";
import { getService } from "@/content/services";
import { SITE, absoluteUrl } from "@/content/site";
import { CASE_STUDIES, PROJECT_DETAILS, getCaseStudy, getProjectDetail } from "@/content/work";
import { breadcrumbSchema, orgRef, pageMetadata } from "@/lib/seo";

export const generateStaticParams = () => [
  ...CASE_STUDIES.map((c) => ({ slug: c.slug })),
  ...PROJECT_DETAILS.map((p) => ({ slug: p.slug })),
];

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const study = getCaseStudy(slug);
  if (study) {
    return pageMetadata({
      title: study.metaTitle,
      description: study.metaDescription,
      path: `/work/${study.slug}`,
      type: "article",
    });
  }

  const detail = getProjectDetail(slug);
  if (detail) {
    return pageMetadata({
      title: detail.metaTitle,
      description: detail.metaDescription,
      path: `/work/${detail.slug}`,
      type: "article",
    });
  }

  return {};
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const study = getCaseStudy(slug);
  if (study) return <CaseStudyView study={study} />;

  const detail = getProjectDetail(slug);
  if (detail) return <ProjectDetailView detail={detail} />;

  notFound();
}

function CaseStudyView({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  const path = `/work/${study.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: study.client, path },
  ];
  const services = study.services.map(getService).filter(Boolean);

  return (
    <PageShell>
      <PageHero
        eyebrow={`${study.client} · ${study.clientCountry}`}
        trail={trail}
        title={study.title}
        lead={study.summary}
      >
        <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {study.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5">{fact.label}</dt>
              <dd className="text-sm font-medium text-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Hero artwork */}
      <section className="pb-4">
        <div className="container mx-auto px-6">
          <div className="reveal relative aspect-[1200/630] rounded-2xl overflow-hidden border border-border shadow-elevated">
            <Image
              src={study.image}
              alt={`${study.title} — built by ${SITE.name} for ${study.client}`}
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
          {study.liveUrl && (
            <div className="mt-6 reveal">
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 gradient-tech rounded-full px-8 py-3.5 text-primary-foreground font-semibold hover:opacity-90 hover:scale-[1.03] transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] glow-primary"
              >
                Visit the live platform
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Numbers */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="reveal glass rounded-2xl p-8 text-center hover-lift">
                <p className="font-heading text-4xl md:text-5xl font-bold gradient-text-tech">{metric.value}</p>
                <p className="text-sm text-muted-foreground mt-3">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative */}
      <article className="pb-8">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-16">
            {study.sections.map((section) => (
              <section key={section.heading} className="reveal">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                  {section.heading}
                </h2>
                <div className="space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="text-foreground/80 text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-7 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-muted-foreground leading-relaxed">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </article>

      {/* Stack */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 reveal">
              What it is built on
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {study.stack.map((group) => (
                <div key={group.group} className="reveal glass rounded-2xl p-6">
                  <h3 className="font-heading font-bold text-foreground mb-4">{group.group}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services used */}
      {services.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8 reveal">Services on this project</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="reveal group glass rounded-2xl p-6 hover-lift block border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <service.Icon
                    size={22}
                    className={`mb-3 ${service.side === "tech" ? "text-primary" : "text-secondary"}`}
                  />
                  <h3 className="font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{service.desc}</p>
                </Link>
              ))}
            </div>
            <Link
              href="/work"
              className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline reveal"
            >
              See all work
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      )}

      <CTABand
        heading="Want one"
        accent="like this?"
        lead="Platforms of this size start with a scoping conversation, not a template. Tell us what you are trying to build."
        message={`Hi, I saw the ${study.client} case study and I'd like to talk about a project.`}
      />

      <JsonLd
        schemas={[
          breadcrumbSchema(trail),
          {
            "@type": "Article",
            "@id": `${absoluteUrl(path)}#article`,
            headline: `${study.client} — ${study.title}`,
            description: study.metaDescription,
            url: absoluteUrl(path),
            author: orgRef,
            publisher: orgRef,
            inLanguage: "en",
            about: {
              "@type": "CreativeWork",
              name: study.title,
              creator: orgRef,
              ...(study.liveUrl ? { sameAs: [study.liveUrl] } : {}),
            },
            mentions: [{ "@type": "Organization", name: study.client }],
          },
          {
            "@type": "WebPage",
            "@id": `${absoluteUrl(path)}#webpage`,
            url: absoluteUrl(path),
            name: study.metaTitle,
            description: study.metaDescription,
            isPartOf: { "@id": `${absoluteUrl("/")}#website` },
          },
        ]}
      />
    </PageShell>
  );
}

function ProjectDetailView({ detail }: { detail: (typeof PROJECT_DETAILS)[number] }) {
  const path = `/work/${detail.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: detail.title, path },
  ];
  const services = detail.services.map(getService).filter(Boolean);

  return (
    <PageShell>
      <PageHero eyebrow={detail.category} trail={trail} title={detail.title} lead={detail.summary} />

      {/* Hero artwork */}
      <section className="pb-4">
        <div className="container mx-auto px-6">
          <div className="reveal relative aspect-[1200/630] rounded-2xl overflow-hidden border border-border shadow-elevated">
            <Image
              src={detail.image}
              alt={`${detail.title} — built by ${SITE.name}`}
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Narrative */}
      <article className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-5">
            {detail.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="reveal text-foreground/80 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="max-w-3xl mx-auto mt-7 space-y-3">
            {detail.highlights.map((item) => (
              <li key={item} className="reveal flex gap-3 text-muted-foreground leading-relaxed">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          {detail.liveUrl && (
            <div className="max-w-3xl mx-auto mt-10 reveal">
              <a
                href={detail.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 gradient-tech rounded-full px-8 py-3.5 text-primary-foreground font-semibold hover:opacity-90 hover:scale-[1.03] transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] glow-primary"
              >
                Visit the live site
                <ExternalLink size={16} />
              </a>
            </div>
          )}

          {detail.category === "Website" && (
            <div className="max-w-3xl mx-auto mt-6 reveal">
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                <ArrowLeft size={14} />
                Back to work
              </Link>
            </div>
          )}
        </div>
      </article>

      {/* Services used */}
      {services.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8 reveal">Services on this project</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="reveal group glass rounded-2xl p-6 hover-lift block border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <service.Icon
                    size={22}
                    className={`mb-3 ${service.side === "tech" ? "text-primary" : "text-secondary"}`}
                  />
                  <h3 className="font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{service.desc}</p>
                </Link>
              ))}
            </div>
            <Link
              href="/work"
              className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline reveal"
            >
              See all work
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      )}

      <CTABand
        heading="Want one"
        accent="like this?"
        lead="Every project starts with a scoping conversation, not a template. Tell us what you are trying to build."
        message={`Hi, I saw the ${detail.title} project and I'd like to talk about a project.`}
      />

      <JsonLd
        schemas={[
          breadcrumbSchema(trail),
          {
            "@type": "CreativeWork",
            "@id": `${absoluteUrl(path)}#creativework`,
            name: detail.title,
            description: detail.metaDescription,
            url: absoluteUrl(path),
            creator: orgRef,
            ...(detail.liveUrl ? { sameAs: [detail.liveUrl] } : {}),
          },
          {
            "@type": "WebPage",
            "@id": `${absoluteUrl(path)}#webpage`,
            url: absoluteUrl(path),
            name: detail.metaTitle,
            description: detail.metaDescription,
            isPartOf: { "@id": `${absoluteUrl("/")}#website` },
          },
        ]}
      />
    </PageShell>
  );
}
