"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ExternalLink, Eye, X } from "lucide-react";

import { SITE, whatsappUrl } from "@/content/site";
import {
  designItems,
  projectItems,
  websiteItems,
  type DesignItem,
  type ProjectItem,
  type WebsiteItem,
} from "@/content/work";

type Category = "all" | "design" | "websites" | "projects";

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

  /**
   * Portalled to <body>: the grid this modal opens from sits inside an
   * ancestor with a Tailwind transform utility (translate-y-0), and any
   * transform — even a no-op one — makes that ancestor the containing block
   * for `position: fixed` descendants. Left un-portalled, the "fixed"
   * overlay was actually sizing itself to the portfolio section instead of
   * the viewport.
   */
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-md" />
      <div
        className="relative z-10 glass rounded-2xl overflow-hidden max-w-3xl w-full shadow-elevated animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-background transition-colors"
          aria-label="Close preview"
        >
          <X size={18} />
        </button>
        {item.type === "image" ? (
          <Image
            src={item.src}
            alt={item.title}
            sizes="(max-width: 768px) 100vw, 768px"
            className="w-full max-h-[75vh] object-contain bg-foreground/5"
          />
        ) : (
          <video
            src={item.src as string}
            autoPlay
            muted
            loop
            playsInline
            className="w-full max-h-[75vh] object-contain bg-foreground/5"
          />
        )}
        <div className="p-5">
          <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
          >
            View on Instagram <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
};

/* ── Design Grid ── */
export const DesignGrid = () => {
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
              <Image
                src={item.src}
                alt={item.title}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <VideoThumb src={item.src as string} poster={item.poster} />
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
          href={SITE.instagram}
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

/**
 * The two clips are 800KB between them and sit well below the fold. Autoplaying
 * them from the markup made the browser fetch both before a visitor had scrolled
 * anywhere near the portfolio. The poster frame paints immediately; the clip is
 * attached only once the card is within a screen of the viewport, after which it
 * behaves exactly as before — muted, looping, playing on its own.
 */
const VideoThumb = ({ src, poster }: { src: string; poster?: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <video
      ref={ref}
      src={visible ? src : undefined}
      poster={poster}
      muted
      loop
      autoPlay
      playsInline
      preload="none"
      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
};

/* ── Website Cards ── */
export const WebsiteGrid = ({ items = websiteItems }: { items?: WebsiteItem[] }) => (
  <div className="grid md:grid-cols-2 gap-6">
    {items.map(({ slug, title, description, thumbnail }) => (
      <Link
        key={slug}
        href={`/work/${slug}`}
        className="reveal group glass rounded-2xl overflow-hidden hover-lift cursor-pointer border border-border hover:border-primary/30 transition-all duration-300 relative block"
      >
        {/* Thumbnail */}
        <div className="relative overflow-hidden aspect-video">
          <Image
            src={thumbnail}
            alt={`${title} — website built by MaHaVi`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 text-xs font-semibold text-background bg-primary/80 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Project <ArrowRight size={12} />
          </span>
        </div>
        {/* light sweep */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="relative z-10 p-5">
          <h3 className="font-heading text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </Link>
    ))}
  </div>
);

/* ── Project Cards ── */
const ProjectCardInner = ({ title, description, image, href }: ProjectItem) => (
  <>
    <div className="relative overflow-hidden aspect-video">
      <Image
        src={image}
        alt={`${title} — project by MaHaVi`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="absolute left-0 top-0 h-full w-1 bg-accent/0 group-hover:bg-accent transition-colors duration-300 rounded-l-2xl" />
    <div className="p-5 transition-transform duration-300 group-hover:-translate-y-1">
      <h3 className="font-heading text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        {href === "/work/nikunja" ? "Read the case study" : "View the project"}
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </div>
  </>
);

const projectCardClass =
  "reveal group glass rounded-2xl overflow-hidden border border-border hover:border-accent/40 transition-all duration-300 relative block";

export const ProjectGrid = ({ items = projectItems }: { items?: ProjectItem[] }) => (
  <div className="grid md:grid-cols-2 gap-6">
    {items.map((item) => (
      <Link key={item.slug} href={item.href} className={projectCardClass}>
        <ProjectCardInner {...item} />
      </Link>
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
      window.open(whatsappUrl(), "_blank");
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
