import ParticleBackground from "./ParticleBackground";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <ParticleBackground />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl gradient-creative" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-15 blur-3xl gradient-tech" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Innovation-Driven Digital Agency</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Where{" "}
            <span className="gradient-text-tech">Technology</span>
            <br />
            Meets{" "}
            <span className="gradient-text-creative">Creativity</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            We build digital powerhouses for modern brands — blending cutting-edge tech with stunning creative to deliver experiences that convert.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <a
              href="#services"
              className="gradient-tech rounded-full px-8 py-4 text-primary-foreground font-semibold inline-flex items-center gap-2 hover:opacity-90 transition-all glow-primary group"
            >
              Explore Services
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="glass rounded-full px-8 py-4 font-semibold text-foreground inline-flex items-center gap-2 hover-lift"
            >
              Start a Project
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
