import { Code2, Smartphone, Brain, Palette, Video, Megaphone, Monitor, PenTool } from "lucide-react";

const techServices = [
  { Icon: Code2, title: "Web Development", desc: "Modern, fast, scalable web applications" },
  { Icon: Smartphone, title: "App Development", desc: "Native & cross-platform mobile apps" },
  { Icon: Brain, title: "AI Integration", desc: "Smart automation & machine learning" },
  { Icon: Monitor, title: "SaaS Platforms", desc: "End-to-end product development" },
];

const creativeServices = [
  { Icon: Palette, title: "Branding & Identity", desc: "Logos, style guides, brand systems" },
  { Icon: Video, title: "Video Production", desc: "Motion graphics & cinematic content" },
  { Icon: Megaphone, title: "Social Media", desc: "Strategy, content & management" },
  { Icon: PenTool, title: "UI/UX Design", desc: "User-centered, beautiful interfaces" },
];

const DualExperience = () => {
  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Our Expertise</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-5">
            Two Worlds. <span className="gradient-text-creative">One Vision.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            We bring together structured engineering and free-flowing creativity to deliver complete digital solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tech Side */}
          <div className="reveal-left rounded-3xl p-8 md:p-10 border border-primary/15 bg-gradient-to-br from-primary/[0.04] to-transparent relative overflow-hidden">
            <div className="absolute top-4 right-4 w-40 h-40 rounded-full opacity-10 blur-3xl gradient-tech" />
            <h3 className="font-heading text-2xl font-bold mb-2 gradient-text-tech">Technology</h3>
            <p className="text-muted-foreground text-sm mb-8">Precision-engineered digital solutions</p>
            <div className="grid sm:grid-cols-2 gap-4 stagger-children">
              {techServices.map(({ Icon, title, desc }) => (
                <div key={title} className="glass rounded-xl p-5 hover-glow cursor-default group border border-transparent hover:border-primary/15 transition-all duration-300">
                  <Icon size={24} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-heading font-semibold text-foreground mb-1">{title}</h4>
                  <p className="text-muted-foreground text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Creative Side */}
          <div className="reveal-right rounded-3xl p-8 md:p-10 border border-secondary/15 bg-gradient-to-br from-secondary/[0.04] to-transparent relative overflow-hidden">
            <div className="absolute top-4 right-4 w-40 h-40 rounded-full opacity-10 blur-3xl gradient-creative" />
            <h3 className="font-heading text-2xl font-bold mb-2 gradient-text-creative">Creative</h3>
            <p className="text-muted-foreground text-sm mb-8">Bold, expressive visual storytelling</p>
            <div className="grid sm:grid-cols-2 gap-4 stagger-children">
              {creativeServices.map(({ Icon, title, desc }) => (
                <div key={title} className="glass rounded-xl p-5 hover-glow cursor-default group border border-transparent hover:border-secondary/15 transition-all duration-300">
                  <Icon size={24} className="text-secondary mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-heading font-semibold text-foreground mb-1 mt-3">{title}</h4>
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
