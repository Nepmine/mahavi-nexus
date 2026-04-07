import { useEffect, useRef } from "react";

export const useHeroParallax = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const content = hero.querySelector("[data-hero-content]") as HTMLElement;
    if (!content) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroH = hero.offsetHeight;
        const progress = Math.min(scrollY / heroH, 1);

        // Scale down and fade content
        const scale = 1 - progress * 0.06; // 1 → 0.94
        const opacity = 1 - progress * 0.4; // 1 → 0.6
        content.style.transform = `scale(${scale})`;
        content.style.opacity = `${opacity}`;

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return heroRef;
};
