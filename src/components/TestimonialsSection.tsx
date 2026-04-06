import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  { name: "Sarah Chen", role: "CEO, NovaTech", text: "MaHaVi transformed our digital presence. The blend of tech precision and creative flair was exactly what we needed.", initials: "SC" },
  { name: "Marcus Rivera", role: "Founder, Artisan Co", text: "They delivered a brand identity and web platform that exceeded our expectations — on time and under budget.", initials: "MR" },
  { name: "Aisha Patel", role: "CMO, GrowthLab", text: "Their social media strategy doubled our engagement in 3 months. Truly a team that understands modern marketing.", initials: "AP" },
  { name: "David Kim", role: "CTO, DataSync", text: "The AI integration they built saved us hundreds of hours per month. Exceptional technical expertise and communication.", initials: "DK" },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const go = (idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setIsAnimating(false);
    }, 250);
  };

  const next = () => go((current + 1) % testimonials.length);
  const prev = () => go((current - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => clearInterval(intervalRef.current);
  }, [current]);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">Testimonials</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Trusted by Visionaries
          </h2>
        </div>

        {/* Desktop: carousel with visible cards */}
        <div className="hidden md:block">
          <div className="grid md:grid-cols-3 gap-6 stagger-children">
            {testimonials.slice(0, 3).map(({ name, role, text, initials }) => (
              <div key={name} className="glass rounded-2xl p-8 hover-lift border border-transparent hover:border-primary/10 transition-all duration-300 relative">
                <Quote size={24} className="text-primary/20 absolute top-6 right-6" />
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full gradient-tech flex items-center justify-center text-primary-foreground font-heading font-bold text-sm">
                    {initials}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground text-sm">{name}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: sliding carousel */}
        <div className="md:hidden reveal">
          <div className={`glass rounded-2xl p-8 transition-all duration-250 ${isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}>
            <Quote size={24} className="text-primary/20 mb-4" />
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={14} className="fill-accent text-accent" />
              ))}
            </div>
            <p className="text-foreground mb-6 leading-relaxed">"{testimonials[current].text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full gradient-tech flex items-center justify-center text-primary-foreground font-heading font-bold text-sm">
                {testimonials[current].initials}
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground text-sm">{testimonials[current].name}</p>
                <p className="text-xs text-muted-foreground">{testimonials[current].role}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:bg-primary/10 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => go(i)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-6" : "bg-border"}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:bg-primary/10 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
