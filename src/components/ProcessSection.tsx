import { Lightbulb, PenTool, Code2, Rocket, TrendingUp } from "lucide-react";

const steps = [
  { Icon: Lightbulb, title: "Ideate", desc: "We understand your vision and goals" },
  { Icon: PenTool, title: "Design", desc: "Wireframes and stunning visual concepts" },
  { Icon: Code2, title: "Build", desc: "Clean code, tested and performant" },
  { Icon: Rocket, title: "Launch", desc: "Deploy, test, and go live confidently" },
  { Icon: TrendingUp, title: "Scale", desc: "Optimize and grow with data-driven insights" },
];

const ProcessSection = () => (
  <section id="process" className="py-24">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16 reveal">
        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Our Process</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
          From Idea to Impact
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary via-accent to-secondary" />

        {steps.map(({ Icon, title, desc }, i) => (
          <div key={title} className="reveal flex-1 flex flex-col items-center text-center relative" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="w-20 h-20 rounded-full gradient-tech flex items-center justify-center mb-4 relative z-10 shadow-elevated">
              <Icon size={28} className="text-primary-foreground" />
            </div>
            <h3 className="font-heading font-bold text-foreground mb-1">{title}</h3>
            <p className="text-muted-foreground text-sm max-w-[160px]">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
