import { Code2, Smartphone, Brain, Palette, Video, Megaphone, Monitor, PenLine, TrendingUp, Briefcase } from "lucide-react";

const techServices = [
  { Icon: Code2, title: "Web Development", desc: "Modern, fast, scalable web applications" },
  { Icon: Smartphone, title: "App Development", desc: "Native & cross-platform mobile apps" },
  { Icon: Brain, title: "AI Integration", desc: "Smart automation & machine learning" },
  { Icon: Monitor, title: "SaaS Platforms", desc: "End-to-end product development" },
];

const creativeServices = [
  { Icon: Palette, title: "Branding & Identity", desc: "Logos, style guides, brand systems" },
  { Icon: Video, title: "Video Production", desc: "Motion graphics & cinematic content" },
  { Icon: Megaphone, title: "Digital Marketing", desc: "SEO, paid ads & growth strategies that convert" },
  { Icon: PenLine, title: "Content Writing", desc: "Crafted by writers behind popular YouTube channels & open-source projects", featured: true },
  { Icon: TrendingUp, title: "Social Media", desc: "Strategy, content & community management" },
  { Icon: Briefcase, title: "Business Consulting", desc: "Market positioning, strategy & scalable growth plans" },
];

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
              {techServices.map(({ Icon, title, desc }) => (
                <div key={title} className="glass rounded-xl p-5 hover-lift cursor-default">
                  <Icon size={24} className="text-primary mb-3" />
                  <h4 className="font-heading font-semibold text-foreground mb-1">{title}</h4>
                  <p className="text-muted-foreground text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Creative Side */}
          <div className="reveal rounded-2xl p-8 md:p-10 border border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent relative overflow-hidden" style={{ animationDelay: "0.15s" }}>
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full opacity-10 blur-2xl gradient-creative" />
            <h3 className="font-heading text-2xl font-bold mb-2 gradient-text-creative">Creative</h3>
            <p className="text-muted-foreground text-sm mb-8">Bold, expressive visual storytelling</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {creativeServices.map(({ Icon, title, desc, featured }) => (
                <div key={title} className={`glass rounded-xl p-5 hover-lift cursor-default ${featured ? 'ring-1 ring-secondary/40 bg-secondary/5' : ''}`}>
                  <Icon size={24} className="text-secondary" />
                  <h4 className={`font-heading font-semibold mb-1 mt-3 ${featured ? 'gradient-text-creative' : 'text-foreground'}`}>{title}</h4>
                  <p className="text-muted-foreground text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualExperience;
