import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { whatsappUrl } from "@/content/site";

const CTABand = ({
  heading = "Start Small.",
  accent = "Scale Big.",
  lead = "Turn your idea into reality with a team that delivers premium quality without the premium price tag.",
  message,
}: {
  heading?: string;
  accent?: string;
  lead?: string;
  message?: string;
}) => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 gradient-tech opacity-[0.07]" aria-hidden />
    <div className="absolute inset-0 gradient-creative opacity-[0.05]" aria-hidden />
    <div className="container mx-auto px-6 relative z-10">
      <div className="reveal text-center max-w-3xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
          {heading} <span className="gradient-text-creative">{accent}</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">{lead}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 gradient-tech rounded-full px-10 py-4 text-primary-foreground font-semibold text-lg hover:opacity-90 hover:scale-[1.03] transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] glow-primary group"
          >
            Start a Project
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={whatsappUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 glass rounded-full px-8 py-4 font-semibold text-foreground hover:scale-[1.03] transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            <MessageCircle size={20} className="text-primary" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default CTABand;
