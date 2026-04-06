import { Zap, Shield, TrendingUp, Heart } from "lucide-react";

const points = [
  { Icon: Zap, title: "Lightning Fast Delivery", desc: "We move fast without compromising quality. Your project, launched on time." },
  { Icon: Shield, title: "Battle-Tested Solutions", desc: "Scalable architecture built to grow with your business." },
  { Icon: TrendingUp, title: "Cost-Effective Excellence", desc: "Don't let budget limit your vision. Premium quality at smart pricing." },
  { Icon: Heart, title: "Obsessed With Results", desc: "Every pixel, every line of code — designed to convert and delight." },
];

const WhyChooseUs = () => (
  <section id="why-us" className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-20 reveal">
        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Why MaHaVi</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">
          Don't Let Budget Limit{" "}
          <span className="gradient-text-tech">Your Vision</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Modern, scalable solutions crafted by a team that cares about your growth as much as you do.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
        {points.map(({ Icon, title, desc }) => (
          <div key={title} className="group glass rounded-2xl p-8 text-center hover-glow border border-transparent hover:border-primary/15 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-tech mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon size={26} className="text-primary-foreground" />
            </div>
            <h3 className="font-heading font-bold text-foreground mb-3 text-lg">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
