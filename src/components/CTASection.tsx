import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => (
  <section className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 gradient-tech opacity-[0.06]" />
    <div className="absolute inset-0 gradient-creative opacity-[0.04]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[120px] bg-primary" />

    <div className="container mx-auto px-6 relative z-10">
      <div className="reveal text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
          <Sparkles size={14} className="text-accent" />
          <span className="text-sm text-muted-foreground font-medium">Ready to grow?</span>
        </div>

        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Let's Build Something{" "}
          <span className="gradient-text-creative">Powerful Together</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
          Turn your idea into reality with a team that delivers premium quality without the premium price tag.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-3 gradient-tech rounded-full px-10 py-5 text-primary-foreground font-semibold text-lg hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300 glow-primary animate-pulse-glow group"
        >
          Start Your Project Today
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  </section>
);

export default CTASection;
