import { Lightbulb, PenTool, Code2, Rocket, TrendingUp } from "lucide-react";

const steps = [
  { Icon: Lightbulb, title: "Ideate", desc: "We understand your vision and goals", color: "from-primary to-primary" },
  { Icon: PenTool, title: "Design", desc: "Wireframes and stunning visual concepts", color: "from-primary to-accent" },
  { Icon: Code2, title: "Build", desc: "Clean code, tested and performant", color: "from-accent to-secondary" },
  { Icon: Rocket, title: "Launch", desc: "Deploy, test, and go live confidently", color: "from-secondary to-secondary" },
  { Icon: TrendingUp, title: "Scale", desc: "Optimize and grow with data-driven insights", color: "from-secondary to-primary" },
];

const ProcessSection = () => (
  <section id="process" className="section-padding">
    <div className="container mx-auto px-6">
      <div className="text-center mb-20 reveal">
        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Our Process</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
          From Idea to <span className="gradient-text-creative">Impact</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-primary via-accent to-secondary opacity-30" />

        {steps.map(({ Icon, title, desc }, i) => (
          <div key={title} className="reveal flex-1 flex flex-col items-center text-center relative" style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="w-24 h-24 rounded-2xl gradient-tech flex items-center justify-center mb-5 relative z-10 shadow-elevated group hover:scale-110 transition-transform duration-300">
              <Icon size={32} className="text-primary-foreground" />
              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{i + 1}</span>
              </div>
            </div>
            <h3 className="font-heading font-bold text-foreground mb-2 text-lg">{title}</h3>
            <p className="text-muted-foreground text-sm max-w-[180px] leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
