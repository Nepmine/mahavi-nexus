import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "9779866140033";
const WHATSAPP_MSG = encodeURIComponent("Hi, I want to know more about MaHaVi.");

const FloatingCTA = () => (
  <a
    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-creative flex items-center justify-center text-primary-foreground shadow-elevated animate-float hover:scale-110 active:scale-95 transition-transform animate-pulse-glow"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={24} />
  </a>
);

export default FloatingCTA;
