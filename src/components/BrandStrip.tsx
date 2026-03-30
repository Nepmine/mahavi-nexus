import { Code2, Palette, Smartphone, Globe, Video, Megaphone, Brain, Layers } from "lucide-react";

const icons = [
  { Icon: Code2, label: "Web Development" },
  { Icon: Smartphone, label: "App Development" },
  { Icon: Brain, label: "AI Integration" },
  { Icon: Globe, label: "Digital Strategy" },
  { Icon: Palette, label: "Branding" },
  { Icon: Video, label: "Video Production" },
  { Icon: Megaphone, label: "Social Media" },
  { Icon: Layers, label: "UI/UX Design" },
];

const BrandStrip = () => {
  const doubled = [...icons, ...icons];

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-6 mb-10 text-center">
        <p className="font-heading text-2xl md:text-3xl font-bold text-foreground">
          Building Digital Powerhouses for Modern Brands
        </p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee gap-12">
          {doubled.map(({ Icon, label }, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0 glass rounded-full px-6 py-3">
              <Icon size={20} className="text-primary" />
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandStrip;
