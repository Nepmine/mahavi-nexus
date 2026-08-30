import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * The visible half of the BreadcrumbList emitted in JSON-LD — Google wants both,
 * and a trail on the page is what lets a visitor arriving from search climb up.
 */
const Breadcrumbs = ({ trail }: { trail: Crumb[] }) => (
  <nav aria-label="Breadcrumb" className="mb-6">
    <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
      {trail.map((crumb, i) => {
        const last = i === trail.length - 1;
        return (
          <li key={crumb.path} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={14} className="text-muted-foreground/60" aria-hidden />}
            {last ? (
              <span className="text-foreground font-medium" aria-current="page">
                {crumb.name}
              </span>
            ) : (
              <Link href={crumb.path} className="hover:text-primary transition-colors">
                {crumb.name}
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
