import { useState, useRef, useEffect } from "react";
import { ExternalLink, X, Eye } from "lucide-react";

import design1 from "@/assets/portfolio/design-1.jpg";
import design2 from "@/assets/portfolio/design-2.jpg";
import design3 from "@/assets/portfolio/design-3.jpg";
import designVideo1 from "@/assets/portfolio/design-video-1.mp4";
import designVideo2 from "@/assets/portfolio/design-video-2.mp4";

const WHATSAPP_NUMBER = "9779866140033";
const WHATSAPP_MSG = encodeURIComponent("Hi, I want to know more about MaHaVi.");
const INSTAGRAM_URL = "https://www.instagram.com/_beyond_visuals_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

type Category = "all" | "design" | "websites" | "projects";

interface DesignItem {
  type: "image" | "video";
  src: string;
  title: string;
}

interface WebsiteItem {
  title: string;
  url: string;
  description: string;
}

interface ProjectItem {
  title: string;
  description: string;
}

const designItems: DesignItem[] = [
  { type: "image", src: design1, title: "3D Environment — Fortress" },
  { type: "video", src: designVideo1, title: "Motion Graphics Reel" },
  { type: "image", src: design2, title: "3D Scene — Inferno" },
  { type: "image", src: design3, title: "Award Ceremony Concept" },
  { type: "video", src: designVideo2, title: "Visual FX Showcase" },
];

const websiteItems: WebsiteItem[] = [
  { title: "Kristina Champion", url: "https://kristinachampion.com/", description: "Personal portfolio & brand presence" },
  { title: "IDS Nepal Weekly", url: "https://www.idsnepal.com/weeklyArticle", description: "News & article publishing platform" },
  { title: "Creative Landing", url: "https://super-cranachan-fa4ff0.netlify.app/", description: "Modern landing page experience" },
  { title: "Manual.is", url: "https://www.manual.is/", description: "Health & wellness platform" },
];

const projectItems: ProjectItem[] = [
  { title: "Facebook Page Boost Bot", description: "Automated bot system for strategic Facebook page boosting & audience engagement growth." },
  { title: "PDP Party of Nepal", description: "Digital strategy and creative media collaboration for the PDP Party of Nepal's online presence." },
];

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "design", label: "Design" },
  { key: "websites", label: "Websites" },
  { key: "projects", label: "Projects" },
];

/* ── Modal for design previews ── */
const DesignModal = ({ item, onClose }: { item: DesignItem; onClose: () => void }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-md" />
      <div
        className="relative z-10 glass rounded-2xl overflow-hidden max-w-3xl w-full shadow-elevated animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-background transition-colors"
        >
          <X size={18} />
        </button>
        {item.type === "image" ? (
          <img src={item.src} alt={item.title} className="w-full max-h-[75vh] object-contain bg-foreground/5" />
        ) : (
          <video src={item.src} autoPlay muted loop className="w-full max-h-[75vh] object-contain bg-foreground/5" />
        )}
        <div className="p-5">
          <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
          >
            View on Instagram <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

/* ── Design Grid ── */
const DesignGrid = () => {
  const [modal, setModal] = useState<DesignItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {designItems.map((item) => (
          <div
            key={item.title}
            className="reveal group relative rounded-2xl overflow-hidden cursor-pointer border border-border hover:border-primary/30 transition-all duration-300"
            onClick={() => setModal(item)}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <VideoThumb src={item.src} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="flex items-center justify-between w-full">
                <span className="text-background font-heading font-semibold text-sm">{item.title}</span>
                <Eye size={16} className="text-background/80" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
        >
          See more on Instagram <ExternalLink size={14} />
        </a>
      </div>
      {modal && <DesignModal item={modal} onClose={() => setModal(null)} />}
    </>
  );
};

const VideoThumb = ({ src }: { src: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      autoPlay
      playsInline
      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
};

/* ── Website Cards ── */
const WebsiteGrid = () => (
  <div className="grid md:grid-cols-2 gap-6">
    {websiteItems.map(({ title, url, description }) => (
      <a
        key={title}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="reveal group glass rounded-2xl p-6 hover-lift cursor-pointer border border-border hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
      >
        {/* light sweep */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Live Site <ExternalLink size={13} />
          </span>
        </div>
      </a>
    ))}
  </div>
);

/* ── Project Cards ── */
const ProjectGrid = () => (
  <div className="grid md:grid-cols-2 gap-6">
    {projectItems.map(({ title, description }) => (
      <div
        key={title}
        className="reveal group glass rounded-2xl p-6 border border-border hover:border-accent/40 transition-all duration-300 relative overflow-hidden"
      >
        <div className="absolute left-0 top-0 h-full w-1 bg-accent/0 group-hover:bg-accent transition-colors duration-300 rounded-l-2xl" />
        <div className="pl-3 transition-transform duration-300 group-hover:-translate-y-1">
          <h3 className="font-heading text-lg font-bold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    ))}
  </div>
);

/* ── Main Section ── */
const PortfolioSection = () => {
  const [active, setActive] = useState<Category>("all");
  const [transitioning, setTransitioning] = useState(false);

  const switchCategory = (cat: Category) => {
    if (cat === active) return;
    setTransitioning(true);
    setTimeout(() => {
      setActive(cat);
      setTransitioning(false);
    }, 200);
  };

  const handleViewMore = () => {
    const btn = document.activeElement as HTMLElement;
    btn?.classList.add("scale-95");
    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`, "_blank");
      btn?.classList.remove("scale-95");
    }, 250);
  };

  const renderContent = () => {
    switch (active) {
      case "design":
        return <DesignGrid />;
      case "websites":
        return <WebsiteGrid />;
      case "projects":
        return <ProjectGrid />;
      default:
        return (
          <>
            <h3 className="font-heading text-xl font-bold text-foreground mb-4 reveal">Design Work</h3>
            <DesignGrid />
            <h3 className="font-heading text-xl font-bold text-foreground mb-4 mt-12 reveal">Websites</h3>
            <WebsiteGrid />
            <h3 className="font-heading text-xl font-bold text-foreground mb-4 mt-12 reveal">Other Projects</h3>
            <ProjectGrid />
          </>
        );
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Portfolio</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
            Work That Speaks
          </h2>

          {/* Filter Tabs */}
          <div className="inline-flex gap-1 glass rounded-full p-1.5">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => switchCategory(key)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === key
                    ? "gradient-tech text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          className={`transition-all duration-200 ${
            transitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          {renderContent()}
        </div>

        {/* View More → WhatsApp */}
        <div className="text-center mt-16 reveal">
          <button
            onClick={handleViewMore}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-creative text-primary-foreground font-semibold text-lg shadow-elevated hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse-glow"
          >
            View More
            <ExternalLink size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
