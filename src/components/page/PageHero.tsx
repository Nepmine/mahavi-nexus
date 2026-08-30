import Breadcrumbs, { type Crumb } from "@/components/page/Breadcrumbs";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  trail?: Crumb[];
  children?: React.ReactNode;
}

/**
 * The homepage hero's vocabulary — cream gradient ground, two blurred blobs,
 * glass eyebrow pill — at a size that suits a page rather than a landing.
 */
const PageHero = ({ eyebrow, title, lead, trail, children }: PageHeroProps) => (
  <section
    className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20"
    style={{ background: "var(--gradient-hero)" }}
  >
    <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl gradient-creative" aria-hidden />
    <div className="absolute -bottom-20 left-0 w-80 h-80 rounded-full opacity-15 blur-3xl gradient-tech" aria-hidden />

    <div className="container mx-auto px-6 relative z-10">
      {trail && <Breadcrumbs trail={trail} />}
      <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{eyebrow}</p>
      <h1 className="font-heading text-4xl md:text-6xl font-bold leading-[1.1] text-foreground max-w-4xl text-balance">
        {title}
      </h1>
      {lead && <p className="mt-6 text-lg text-muted-foreground max-w-2xl text-pretty">{lead}</p>}
      {children}
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" aria-hidden />
  </section>
);

export default PageHero;
