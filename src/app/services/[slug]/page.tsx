import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import CTABand from "@/components/page/CTABand";
import FaqList from "@/components/page/FaqList";
import PageHero from "@/components/page/PageHero";
import { SERVICES, getService } from "@/content/services";
import { CASE_STUDIES } from "@/content/work";
import { absoluteUrl } from "@/content/site";
import { breadcrumbSchema, faqSchema, orgRef, pageMetadata, serviceSchema } from "@/lib/seo";

/** Eight known slugs, so all eight pages are static HTML at build time. */
export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }));

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const { Icon } = service;
  const path = `/services/${service.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path },
  ];
  const related = service.related.map(getService).filter(Boolean);
  const proof = CASE_STUDIES.filter((c) => c.services.includes(service.slug));

  return (
    <PageShell>
      <PageHero
        eyebrow={service.side === "tech" ? "Technology" : "Creative"}
        trail={trail}
        title={service.heading}
        lead={service.intro}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {service.stack.map((tool) => (
            <span
              key={tool}
              className="glass rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground"
            >
              {tool}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-16">
            {/* Body copy */}
            <div className="reveal">
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-8 ${
                  service.side === "tech" ? "gradient-tech" : "gradient-creative"
                }`}
              >
                <Icon size={26} className="text-primary-foreground" />
              </div>
              <div className="space-y-6">
                {service.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-foreground/80 text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <aside className="reveal">
              <div className="glass rounded-2xl p-8 lg:sticky lg:top-28">
                <h2 className="font-heading text-xl font-bold text-foreground mb-6">What you get</h2>
                <ul className="space-y-4">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                      <Check size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 w-full gradient-tech rounded-xl py-3.5 text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity glow-primary"
                >
                  Discuss this project
                  <ArrowRight size={18} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {proof.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3 reveal">Proof</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8 reveal">
              This work, in the wild
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {proof.map((study) => (
                <Link
                  key={study.slug}
                  href={`/work/${study.slug}`}
                  className="reveal group glass rounded-2xl p-8 hover-lift block border border-border hover:border-accent/40 transition-all duration-300"
                >
                  <p className="text-sm text-muted-foreground mb-2">
                    {study.client} · {study.clientCountry}
                  </p>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{study.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Read the case study
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqList faqs={service.faqs} heading={`${service.title} — questions we get asked`} />

      {related.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8 reveal">Often paired with</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="reveal group glass rounded-2xl p-6 hover-lift block border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <item.Icon
                    size={22}
                    className={`mb-3 ${item.side === "tech" ? "text-primary" : "text-secondary"}`}
                  />
                  <h3 className="font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        heading="Ready when"
        accent="you are."
        lead={`Tell us what you are trying to build. We will come back with scope, timeline and a number — not a discovery-call funnel.`}
        message={`Hi, I'd like to talk about ${service.title.toLowerCase()}.`}
      />

      <JsonLd
        schemas={[
          breadcrumbSchema(trail),
          serviceSchema({
            name: service.title,
            description: service.metaDescription,
            path,
            serviceType: service.title,
          }),
          faqSchema(service.faqs),
          {
            "@type": "WebPage",
            "@id": `${absoluteUrl(path)}#webpage`,
            url: absoluteUrl(path),
            name: service.metaTitle,
            description: service.metaDescription,
            about: orgRef,
            isPartOf: { "@id": `${absoluteUrl("/")}#website` },
          },
        ]}
      />
    </PageShell>
  );
}
