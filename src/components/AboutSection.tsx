import { Target, Eye, Lightbulb, Handshake, Shield } from "lucide-react";

const values = [
  { Icon: Lightbulb, text: "Innovation with purpose" },
  { Icon: Shield, text: "Transparency in work" },
  { Icon: Handshake, text: "Long-term partnerships" },
];

const AboutSection = () => (
  <section id="about" className="section-padding bg-muted/30 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[100px] gradient-creative" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px] gradient-tech" />

    <div className="container mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* Text side */}
        <div className="reveal-left">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">About Us</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            We're Not Just Developers —{" "}
            <span className="gradient-text-tech">We're Growth Partners</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            We are a full-service digital agency specializing in building modern, scalable, and intelligent solutions for businesses.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Our team combines expertise in development, AI, marketing, and strategy to deliver results that matter.
          </p>

          <h4 className="font-heading font-semibold text-foreground mb-4">We believe in:</h4>
          <div className="space-y-3 mb-10">
            {values.map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg gradient-tech/10 bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <span className="text-foreground font-medium">{text}</span>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 gradient-tech rounded-full px-7 py-3.5 text-primary-foreground font-semibold hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300 glow-primary"
          >
            Work With Us
          </a>
        </div>

        {/* Visual side */}
        <div className="reveal-right">
          <div className="grid grid-cols-2 gap-5">
            <div className="glass rounded-2xl p-7 hover-lift border border-primary/10">
              <Target size={32} className="text-primary mb-4" />
              <h4 className="font-heading font-bold text-foreground mb-2">Our Mission</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                To empower businesses with technology and strategy that drives real growth.
              </p>
            </div>
            <div className="glass rounded-2xl p-7 hover-lift border border-secondary/10 mt-8">
              <Eye size={32} className="text-secondary mb-4" />
              <h4 className="font-heading font-bold text-foreground mb-2">Our Vision</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                To become a leading digital solutions provider transforming businesses through innovation.
              </p>
            </div>
          </div>

          {/* Abstract decorative element */}
          <div className="mt-5 glass rounded-2xl p-6 border border-accent/10 hover-lift">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ animationDelay: "0.3s" }} />
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.6s" }} />
            </div>
            <p className="text-sm text-muted-foreground italic">
              "We don't just build products — we build partnerships that last."
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
