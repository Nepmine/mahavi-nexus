import { MessageCircle } from "lucide-react";

const FloatingCTA = () => (
  <a
    href="#contact"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-creative flex items-center justify-center text-primary-foreground shadow-elevated animate-float hover:scale-110 transition-transform"
    aria-label="Start a project"
  >
    <MessageCircle size={24} />
  </a>
);

export default FloatingCTA;
