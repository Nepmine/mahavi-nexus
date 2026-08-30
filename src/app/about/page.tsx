import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Shield, TrendingUp, Zap } from "lucide-react";

import JsonLd from "@/components/JsonLd";
import PageShell from "@/components/PageShell";
import ProcessSection from "@/components/ProcessSection";
import CTABand from "@/components/page/CTABand";
import PageHero from "@/components/page/PageHero";
import { SITE, absoluteUrl } from "@/content/site";
import { CASE_STUDIES } from "@/content/work";
import { breadcrumbSchema, orgRef, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About MaHaVi — A Digital Agency in Kathmandu",
  absoluteTitle: true,
  description:
    "MaHaVi is a digital agency built on two disciplines: engineering and creative. Who we are, how we work, and why clients in Nepal and Australia hire us.",
  path: "/about",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const values = [
  {
    Icon: Zap,
    title: "Lightning Fast Delivery",
    desc: "We move fast without compromising quality. Your project, launched on time.",
  },
  {
    Icon: Shield,
    title: "Battle-Tested Solutions",
    desc: "Scalable architecture built to grow with your business.",
  },
  {
    Icon: TrendingUp,
    title: "Cost-Effective Excellence",
    desc: "Don't let budget limit your vision. Premium quality at smart pricing.",
  },
  {
    Icon: Heart,
    title: "Obsessed With Results",
    desc: "Every pixel, every line of code — designed to convert and delight.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        trail={trail}
        title={
          <>
            Where <span className="gradient-text-tech">technology</span> meets{" "}
            <span className="gradient-text-creative">creativity</span>
          </>
        }
        lead={`${SITE.legalName} is a digital agency built around a simple observation: the engineering shop cannot make it beautiful, and the creative studio cannot make it work. So we do both, under one roof, with one team accountable for the result.`}
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-foreground/80 text-lg leading-relaxed reveal">
              Most projects fail in the gap between two suppliers. The brand agency hands over a set of images; the
              development shop builds something that technically matches and feels nothing like it. Everyone did their
              job and the result is still wrong. We removed the gap by keeping both disciplines on the same team.
            </p>
            <p className="text-foreground/80 text-lg leading-relaxed reveal">
              We work from Kathmandu for clients wherever they are — Nepal, Australia, and further out. That is a real
              advantage on cost, and we are direct about the thing it costs: we cannot sit in your office. So we
              over-communicate instead. A staging URL from the first week, work visible as it happens, and a person who
              answers rather than an account manager who forwards.
            </p>
            <p className="text-foreground/80 text-lg leading-relaxed reveal">
              We are small enough that the people who quote the work are the people who build it. When we say a
              timeline, it is not filtered through a sales layer that will not be there when the deadline arrives.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Why MaHaVi</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              What you can hold us to
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ Icon, title, desc }, i) => (
              <div
                key={title}
                className="reveal glass rounded-2xl p-8 text-center hover-lift"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl gradient-tech mb-5">
                  <Icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 reveal">
              Recent work worth reading about
            </h2>
            <p className="text-muted-foreground mb-10 reveal">
              The clearest way to judge an agency is a project explained in detail.
            </p>
            <div className="grid gap-4">
              {CASE_STUDIES.map((study) => (
                <Link
                  key={study.slug}
                  href={`/work/${study.slug}`}
                  className="reveal group glass rounded-2xl p-8 hover-lift block text-left border border-border hover:border-accent/40 transition-all duration-300"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
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
        </div>
      </section>

      <CTABand />

      <JsonLd
        schemas={[
          breadcrumbSchema(trail),
          {
            "@type": "AboutPage",
            "@id": `${absoluteUrl("/about")}#webpage`,
            url: absoluteUrl("/about"),
            name: "About MaHaVi",
            description:
              "MaHaVi is a digital agency built on two disciplines: engineering and creative. Who we are and how we work.",
            mainEntity: orgRef,
            isPartOf: { "@id": `${absoluteUrl("/")}#website` },
          },
        ]}
      />
    </PageShell>
  );
}
