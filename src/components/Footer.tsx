import Link from "next/link";
import { Instagram, Mail, MessageCircle } from "lucide-react";

import { SITE, whatsappUrl } from "@/content/site";
import { CASE_STUDIES } from "@/content/work";
import { CREATIVE_SERVICES, TECH_SERVICES } from "@/content/services";

const socials = [
  { Icon: Instagram, href: SITE.instagram, label: "MaHaVi on Instagram", external: true },
  { Icon: MessageCircle, href: whatsappUrl(), label: "Chat with MaHaVi on WhatsApp", external: true },
  { Icon: Mail, href: `mailto:${SITE.email}`, label: `Email MaHaVi at ${SITE.email}`, external: false },
];

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => (
  <div>
    <h2 className="font-heading text-sm font-bold text-foreground mb-4">{title}</h2>
    <ul className="space-y-2.5">
      {links.map(({ label, href }) => (
        <li key={href}>
          <Link href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="container mx-auto px-6">
      {/* Sitewide links — every page is one click from every other page, which
          is as much for crawlers as it is for visitors. */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <FooterColumn
          title="Technology"
          links={TECH_SERVICES.map((s) => ({ label: s.title, href: `/services/${s.slug}` }))}
        />
        <FooterColumn
          title="Creative"
          links={CREATIVE_SERVICES.map((s) => ({ label: s.title, href: `/services/${s.slug}` }))}
        />
        <FooterColumn
          title="Work"
          links={[
            { label: "All work", href: "/work" },
            ...CASE_STUDIES.map((c) => ({ label: c.title, href: `/work/${c.slug}` })),
          ]}
        />
        <FooterColumn
          title="Company"
          links={[
            { label: "About", href: "/about" },
            { label: "Our process", href: "/#process" },
            { label: "Contact", href: "/contact" },
            { label: "All services", href: "/services" },
          ]}
        />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border">
        <div>
          <Link href="/" className="font-heading text-xl font-bold">
            <span className="gradient-text-tech">MaHa</span>
            <span className="gradient-text-creative">Vi</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">{SITE.tagline}</p>
          <p className="text-sm text-muted-foreground mt-1">
            <a href={`mailto:${SITE.email}`} className="hover:text-primary transition-colors">
              {SITE.email}
            </a>
          </p>
        </div>

        <div className="flex items-center gap-6">
          {socials.map(({ Icon, href, label, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-[1.03] transition-all duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {SITE.legalName} All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
