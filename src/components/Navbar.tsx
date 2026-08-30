"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/work" },
  // Process lives on the homepage only; from anywhere else it needs the path.
  { label: "Process", href: "/#process", homeHref: "#process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A route change leaves the sheet open otherwise.
  useEffect(() => setMobileOpen(false), [pathname]);

  const hrefFor = (link: (typeof navLinks)[number]) =>
    onHome && link.homeHref ? link.homeHref : link.href;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-elevated py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link href="/" className="font-heading text-2xl font-bold tracking-tight" aria-label="MaHaVi — home">
          <span className="gradient-text-tech">MaHa</span>
          <span className="gradient-text-creative">Vi</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={hrefFor(link)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={onHome ? "#contact" : "/contact"}
            className="gradient-tech rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-primary"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-xl p-6 animate-scale-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={hrefFor(link)}
              className="block py-3 text-foreground font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={onHome ? "#contact" : "/contact"}
            className="block mt-4 gradient-tech rounded-full px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Start a Project
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
