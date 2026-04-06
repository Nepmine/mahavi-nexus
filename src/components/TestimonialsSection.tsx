import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah Chen", role: "CEO, NovaTech", text: "MaHaVi transformed our digital presence. The blend of tech precision and creative flair was exactly what we needed." },
  { name: "Marcus Rivera", role: "Founder, Artisan Co", text: "They delivered a brand identity and web platform that exceeded our expectations — on time and under budget." },
  { name: "Aisha Patel", role: "CMO, GrowthLab", text: "Their social media strategy doubled our engagement in 3 months. Truly a team that understands modern marketing." },
];

const TestimonialsSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16 reveal">
        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Testimonials</p>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
          Trusted by Visionaries
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map(({ name, role, text }, i) => (
          <div key={name} className="reveal glass rounded-2xl p-8 hover-lift" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={16} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground mb-6 leading-relaxed">"{text}"</p>
            <div>
              <p className="font-heading font-semibold text-foreground">{name}</p>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
