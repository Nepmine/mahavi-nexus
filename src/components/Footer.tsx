import { Instagram, Linkedin, Youtube, Mail, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  "Web Development",
  "App Development",
  "AI Integration",
  "Digital Marketing",
  "Branding & Design",
  "Business Consulting",
];

const socials = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Youtube, href: "#", label: "YouTube" },
  { Icon: Mail, href: "mailto:surajghimire13579@gmail.com", label: "Email" },
];

const Footer = () => (
  <footer className="pt-20 pb-8 border-t border-border relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] to-transparent" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="lg:col-span-1">
          <a href="#" className="font-heading text-2xl font-bold inline-block mb-4">
            <span className="gradient-text-tech">MaHa</span>
            <span className="gradient-text-creative">Vi</span>
          </a>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Where Technology Meets Creativity. We build digital powerhouses for modern brands.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:scale-110 transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-semibold text-foreground mb-5">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="text-muted-foreground text-sm hover:text-foreground hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-heading font-semibold text-foreground mb-5">Services</h4>
          <ul className="space-y-3">
            {serviceLinks.map((label) => (
              <li key={label}>
                <a href="#services" className="text-muted-foreground text-sm hover:text-foreground inline-flex items-center gap-1 transition-colors duration-200">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-semibold text-foreground mb-5">Get in Touch</h4>
          <div className="space-y-4">
            <a href="mailto:surajghimire13579@gmail.com" className="text-muted-foreground text-sm hover:text-foreground flex items-center gap-2 transition-colors">
              <Mail size={14} />
              surajghimire13579@gmail.com
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 gradient-tech rounded-full px-5 py-2.5 text-primary-foreground text-sm font-semibold hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Start a Project
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="section-divider mb-6" />
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">© 2026 MaHaVi. All rights reserved.</p>
        <p className="text-xs text-muted-foreground/60">Crafted with passion in Nepal 🇳🇵</p>
      </div>
    </div>
  </footer>
);

export default Footer;
