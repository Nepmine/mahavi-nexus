import { Globe, Monitor, Smartphone, Bot, Megaphone, PenTool, BarChart3 } from "lucide-react";

const services = [
  { Icon: Globe, title: "Website Development", desc: "High-performance, responsive websites built with modern frameworks and clean code." },
  { Icon: Monitor, title: "Software Solutions", desc: "Custom software tailored to your business workflows and operational needs." },
  { Icon: Smartphone, title: "Mobile App Development", desc: "Native and cross-platform apps that deliver seamless mobile experiences." },
  { Icon: Bot, title: "AI Integration", desc: "Smart automation, chatbots, and machine learning solutions for your business." },
  { Icon: Megaphone, title: "Digital Marketing", desc: "Data-driven marketing strategies that increase visibility and drive conversions." },
  { Icon: PenTool, title: "Content Writing", desc: "Compelling copy and content that engages your audience and builds authority." },
  { Icon: BarChart3, title: "Business Consulting", desc: "Strategic guidance to help you scale, optimize, and grow sustainably." },
];

const ServicesSection = () => (
  <section id="full-services" className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-20 reveal">
        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">What We Do</p>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          Everything Your Business Needs<br className="hidden md:block" /> to Grow —{" "}
          <span className="gradient-text-creative">In One Place</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          We combine technology, creativity, and strategy to build powerful digital ecosystems.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
        {services.map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="group glass rounded-2xl p-7 hover-glow cursor-default border border-transparent hover:border-primary/20 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl gradient-tech flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <Icon size={24} className="text-primary-foreground" />
            </div>
            <h3 className="font-heading font-bold text-foreground mb-2 text-lg">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
