import { useEffect } from "react";

export const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply stagger delay for grouped children
            const el = entry.target as HTMLElement;
            const delay = el.style.animationDelay || el.dataset.revealDelay;
            if (delay) {
              el.style.transitionDelay = delay;
            }
            el.classList.add("visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};
