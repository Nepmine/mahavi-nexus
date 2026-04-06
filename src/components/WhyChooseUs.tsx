import { Zap, Shield, TrendingUp, Heart } from "lucide-react";

const points = [
  { Icon: Zap, title: "Lightning Fast Delivery", desc: "We move fast without compromising quality. Your project, launched on time." },
  { Icon: Shield, title: "Battle-Tested Solutions", desc: "Scalable architecture built to grow with your business." },
  { Icon: TrendingUp, title: "Cost-Effective Excellence", desc: "Don't let budget limit your vision. Premium quality at smart pricing." },
  { Icon: Heart, title: "Obsessed With Results", desc: "Every pixel, every line of code — designed to convert and delight." },
];

const WhyChooseUs = () => (
  <section id="why-us" className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-16 reveal">
        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Why MaHaVi</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
          Don't Let Budget Limit Your Vision
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Modern, scalable solutions crafted by a team that cares about your growth as much as you do.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {points.map(({ Icon, title, desc }, i) => (
          <div key={title} className="reveal glass rounded-2xl p-8 text-center hover-lift" style={{ animationDelay: `${i * 0.08}s` }}>
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
);

export default WhyChooseUs;
