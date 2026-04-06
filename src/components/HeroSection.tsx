import { useState, useEffect } from "react";
import ParticleBackground from "./ParticleBackground";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";

const words = ["Technology", "Innovation", "Intelligence"];
const creativeWords = ["Creativity", "Design", "Vision"];

const HeroSection = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [creativeIdx, setCreativeIdx] = useState(0);
  const [fadeClass, setFadeClass] = useState("opacity-100 translate-y-0");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("opacity-0 translate-y-2");
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % words.length);
        setCreativeIdx((i) => (i + 1) % creativeWords.length);
        setFadeClass("opacity-100 translate-y-0");
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <ParticleBackground />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px] gradient-creative" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] gradient-tech" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-[80px] bg-accent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass-strong rounded-full px-5 py-2.5 mb-10 animate-fade-in">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Innovation-Driven Digital Agency</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Where{" "}
            <span className={`gradient-text-tech inline-block transition-all duration-300 ${fadeClass}`}>
              {words[wordIdx]}
            </span>
            <br />
            Meets{" "}
            <span className={`gradient-text-creative inline-block transition-all duration-300 ${fadeClass}`}>
              {creativeWords[creativeIdx]}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
            We build digital powerhouses for modern brands — blending cutting-edge tech with stunning creative to deliver experiences that convert.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <a
              href="#services"
              className="gradient-tech rounded-full px-9 py-4 text-primary-foreground font-semibold inline-flex items-center gap-2 hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300 glow-primary group"
            >
              Explore Services
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="glass-strong rounded-full px-9 py-4 font-semibold text-foreground inline-flex items-center gap-2 hover-lift hover:border-primary/30 transition-all duration-300"
            >
              Start a Project
            </a>
          </div>

          {/* Trust elements */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {[
              "50+ Projects Delivered",
              "Trusted by 30+ Brands",
              "Full-Stack Expertise",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle size={16} className="text-primary shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
