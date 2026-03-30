import { useState } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  { title: "Fintech Dashboard", category: "tech", color: "from-primary/20 to-accent/10" },
  { title: "Brand Identity System", category: "creative", color: "from-secondary/20 to-pink-200/20" },
  { title: "E-Commerce Platform", category: "tech", color: "from-primary/15 to-blue-200/20" },
  { title: "Product Launch Campaign", category: "creative", color: "from-orange-200/30 to-secondary/10" },
  { title: "AI Analytics Tool", category: "tech", color: "from-accent/15 to-primary/10" },
  { title: "Social Media Rebrand", category: "creative", color: "from-pink-200/20 to-secondary/15" },
];

const PortfolioSection = () => {
  const [filter, setFilter] = useState<"all" | "tech" | "creative">("all");
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 reveal">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Portfolio</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Work That Speaks
          </h2>
          <div className="inline-flex gap-2 glass rounded-full p-1">
            {(["all", "tech", "creative"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                  filter === f
                    ? "gradient-tech text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(({ title, category, color }) => (
            <div
              key={title}
              className="reveal group rounded-2xl overflow-hidden bg-gradient-to-br border border-border hover-lift cursor-pointer"
            >
              <div className={`h-52 bg-gradient-to-br ${color} flex items-center justify-center`}>
                <span className="font-heading text-lg font-bold text-foreground/60 group-hover:text-foreground transition-colors">
                  {title}
                </span>
              </div>
              <div className="p-5 flex items-center justify-between bg-card">
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{category}</p>
                </div>
                <ExternalLink size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
