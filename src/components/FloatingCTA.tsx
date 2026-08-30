import { MessageCircle } from "lucide-react";

import { whatsappUrl } from "@/content/site";

const FloatingCTA = () => (
  <a
    href={whatsappUrl()}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-creative flex items-center justify-center text-primary-foreground shadow-elevated animate-float hover:scale-110 active:scale-95 transition-transform animate-pulse-glow"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={24} />
  </a>
);

export default FloatingCTA;
