import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import CTABand from "@/components/page/CTABand";
import PageHero from "@/components/page/PageHero";
import { CREATIVE_SERVICES, SERVICES, TECH_SERVICES, type Service } from "@/content/services";
import { absoluteUrl } from "@/content/site";
import { breadcrumbSchema, orgRef, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services — Software, Apps, AI & Design",
  description:
    "Everything MaHaVi does: custom software development, web and app development, UI/UX and brand design, AI integration, video production and SEO consulting.",
  path: "/services",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

const ServiceRow = ({ service, tone }: { service: Service; tone: "tech" | "creative" }) => {
  const { Icon, title, intro, slug } = service;
  return (
    <Link
      href={`/services/${slug}`}
      className="reveal group glass rounded-2xl p-6 hover-lift flex flex-col border border-border hover:border-primary/30 transition-all duration-300"
    >
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
          tone === "tech" ? "gradient-tech" : "gradient-creative"
        }`}
      >
        <Icon size={22} className="text-primary-foreground" />
      </div>
      <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{intro}</p>
      {/* mt-auto pins the CTA to the bottom so it lines up across the row
          regardless of how long each description runs. */}
      <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Learn more
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
};

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Services"
        trail={trail}
        title={
          <>
            Two disciplines, <span className="gradient-text-tech">one</span>{" "}
            <span className="gradient-text-creative">team</span>
          </>
        }
        lead="Engineering that holds up under load and creative that people remember — bought together, from the same people, so nothing gets lost between two agencies."
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 gradient-text-tech reveal">Technology</h2>
            <p className="text-muted-foreground mb-8 reveal">Precision-engineered digital solutions.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TECH_SERVICES.map((service) => (
                <ServiceRow key={service.slug} service={service} tone="tech" />
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 gradient-text-creative reveal">Creative</h2>
            <p className="text-muted-foreground mb-8 reveal">Bold, expressive visual storytelling.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CREATIVE_SERVICES.map((service) => (
                <ServiceRow key={service.slug} service={service} tone="creative" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand
        heading="Not sure which you need?"
        accent="Ask us."
        lead="Describe the problem rather than the solution. We will tell you what it actually takes — including when the answer is less than you expected."
      />

      <JsonLd
        schemas={[
          breadcrumbSchema(trail),
          {
            "@type": "CollectionPage",
            "@id": `${absoluteUrl("/services")}#webpage`,
            url: absoluteUrl("/services"),
            name: "Services",
            description:
              "Custom software development, web and app development, UI/UX and brand design, AI integration, video production and SEO consulting.",
            about: orgRef,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: SERVICES.map((service, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: service.title,
                url: absoluteUrl(`/services/${service.slug}`),
              })),
            },
          },
        ]}
      />
    </PageShell>
  );
}
