import Link from "next/link";

import { CREATIVE_SERVICES, TECH_SERVICES, type Service } from "@/content/services";

/**
 * Card markup is deliberately duplicated per side rather than parameterised:
 * the two differ in icon colour and in where the spacing sits, and folding
 * that into props made the difference harder to see, not easier.
 */
const ServiceCard = ({ service, side }: { service: Service; side: "tech" | "creative" }) => {
  const { Icon, title, desc, slug } = service;
  return (
    <Link
      href={`/services/${slug}`}
      className="glass rounded-xl p-5 hover-lift group/card block"
      aria-label={`${title} — ${desc}`}
    >
      {side === "tech" ? (
        <>
          <Icon
            size={24}
            className="text-primary mb-3 transition-transform duration-[250ms] group-hover/card:-translate-y-0.5"
          />
          <h4 className="font-heading font-semibold text-foreground mb-1">{title}</h4>
        </>
      ) : (
        <>
          <Icon
            size={24}
            className="text-secondary transition-transform duration-[250ms] group-hover/card:-translate-y-0.5"
          />
          <h4 className="font-heading font-semibold text-foreground mb-1 mt-3">{title}</h4>
        </>
      )}
      <p className="text-muted-foreground text-sm">{desc}</p>
    </Link>
  );
};

const DualExperience = () => {
  return (
    <section id="services" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Our Expertise</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Two Worlds. One Vision.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We bring together structured engineering and free-flowing creativity to deliver complete digital solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4">
          {/* Tech Side */}
          <div className="reveal rounded-2xl p-8 md:p-10 border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full opacity-10 blur-2xl gradient-tech" />
            <h3 className="font-heading text-2xl font-bold mb-2 gradient-text-tech">Technology</h3>
            <p className="text-muted-foreground text-sm mb-8">Precision-engineered digital solutions</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {TECH_SERVICES.map((service) => (
                <ServiceCard key={service.slug} service={service} side="tech" />
              ))}
            </div>
          </div>

          {/* Creative Side */}
          <div
            className="reveal rounded-2xl p-8 md:p-10 border border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent relative overflow-hidden"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full opacity-10 blur-2xl gradient-creative" />
            <h3 className="font-heading text-2xl font-bold mb-2 gradient-text-creative">Creative</h3>
            <p className="text-muted-foreground text-sm mb-8">Bold, expressive visual storytelling</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {CREATIVE_SERVICES.map((service) => (
                <ServiceCard key={service.slug} service={service} side="creative" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualExperience;
