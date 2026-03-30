import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 gradient-tech opacity-[0.07]" />
    <div className="absolute inset-0 gradient-creative opacity-[0.05]" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="reveal text-center max-w-3xl mx-auto">
        <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6">
          Start Small.{" "}
          <span className="gradient-text-creative">Scale Big.</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Turn your idea into reality with a team that delivers premium quality without the premium price tag.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 gradient-tech rounded-full px-10 py-4 text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all glow-primary animate-pulse-glow group"
        >
          Let's Build Something Powerful
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  </section>
);

export default CTASection;
