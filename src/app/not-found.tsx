import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageShell from "@/components/PageShell";
import { SERVICES } from "@/content/services";

/**
 * A real 404 status with somewhere to go. It is not indexed — Next sets
 * `noindex` on this route automatically — but a visitor arriving from a stale
 * link should still find the site rather than a dead end.
 */
export default function NotFound() {
  return (
    <PageShell>
      <section
        className="relative overflow-hidden pt-40 pb-24"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl gradient-creative" aria-hidden />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <p className="font-heading text-7xl md:text-8xl font-bold gradient-text-tech mb-6">404</p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            That page has moved on
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-10">
            The address you followed does not exist here. Everything the site does is one of these.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="gradient-tech rounded-full px-8 py-4 text-primary-foreground font-semibold inline-flex items-center gap-2 hover:opacity-90 transition-opacity glow-primary"
            >
              Back to home
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/work"
              className="glass rounded-full px-8 py-4 font-semibold text-foreground inline-flex items-center gap-2 hover:scale-[1.03] transition-transform"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">What we do</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group glass rounded-2xl p-6 hover-lift block border border-border hover:border-primary/30 transition-all duration-300"
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
        </div>
      </section>
    </PageShell>
  );
}
