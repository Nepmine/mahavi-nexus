import { useEffect, useRef } from "react";

const FeatherRibbon = () => {
  const ribbonRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);
  const currentY = useRef(0);
  const idlePhase = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = () => {
      // Smooth interpolation toward target
      const target = scrollY.current;
      currentY.current += (target - currentY.current) * 0.06;

      // Idle wave
      idlePhase.current += 0.008;
      const idleX = Math.sin(idlePhase.current) * 12;
      const idleY = Math.cos(idlePhase.current * 0.7) * 8;

      // Scroll-linked parallax (moves up-right as user scrolls down)
      const scrollFactor = currentY.current * 0.35;

      const tx = idleX + scrollFactor * 0.15;
      const ty = idleY - scrollFactor * 0.6;
      const rotate = -15 + Math.sin(idlePhase.current * 0.5) * 2 + scrollFactor * 0.008;

      if (ribbonRef.current) {
        ribbonRef.current.style.transform = `translate(${tx}px, ${ty}px) rotate(${rotate}deg)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={ribbonRef}
      className="absolute pointer-events-none"
      style={{
        top: "-5%",
        left: "-8%",
        width: "75vw",
        maxWidth: "900px",
        zIndex: 1,
        willChange: "transform",
      }}
    >
      <svg
        viewBox="0 0 800 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", filter: "blur(1.5px)" }}
      >
        <defs>
          <linearGradient id="feather-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(160, 40%, 28%)" stopOpacity="0.35" />
            <stop offset="40%" stopColor="hsl(160, 35%, 38%)" stopOpacity="0.30" />
            <stop offset="65%" stopColor="hsl(42, 80%, 55%)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="hsl(12, 70%, 58%)" stopOpacity="0.25" />
          </linearGradient>
          <filter id="feather-glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Single flowing ribbon path — tapered via stroke-width variation */}
        <path
          d="M 20 350 C 120 280, 180 180, 300 200 S 500 120, 600 160 S 720 80, 780 50"
          stroke="url(#feather-grad)"
          strokeWidth="45"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#feather-glow)"
          opacity="0.9"
        />
        {/* Thinner inner highlight for depth */}
        <path
          d="M 20 350 C 120 280, 180 180, 300 200 S 500 120, 600 160 S 720 80, 780 50"
          stroke="url(#feather-grad)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default FeatherRibbon;
