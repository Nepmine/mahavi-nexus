import { Instagram, Linkedin, Youtube, Mail } from "lucide-react";

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <a href="#" className="font-heading text-xl font-bold">
            <span className="gradient-text-tech">MaHa</span>
            <span className="gradient-text-creative">Vi</span>
          </a>
          <p className="text-sm text-muted-foreground mt-1">Where Technology Meets Creativity</p>
        </div>

        <div className="flex items-center gap-6">
          {[
            { Icon: Instagram, href: "#" },
            { Icon: Linkedin, href: "#" },
            { Icon: Youtube, href: "#" },
            { Icon: Mail, href: "mailto:hello@mahavi.com" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-primary transition-all"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">© 2026 MaHaVi. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
