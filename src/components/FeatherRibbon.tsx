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
      const target = scrollY.current;
      currentY.current += (target - currentY.current) * 0.05;

      idlePhase.current += 0.006;
      const idleX = Math.sin(idlePhase.current) * 8;
      const idleY = Math.cos(idlePhase.current * 0.6) * 5;

      const scrollFactor = currentY.current * 0.35;

      const tx = idleX + scrollFactor * 0.12;
      const ty = idleY - scrollFactor * 0.55;
      const rotate = -25 + Math.sin(idlePhase.current * 0.4) * 1.5 + scrollFactor * 0.006;

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
        top: "-8%",
        left: "-5%",
        width: "65vw",
        maxWidth: "820px",
        zIndex: 1,
        willChange: "transform",
      }}
    >
      <svg
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", filter: "blur(0.8px)" }}
      >
        <defs>
          <linearGradient id="feather-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(160, 40%, 30%)" stopOpacity="0.4" />
            <stop offset="35%" stopColor="hsl(155, 35%, 40%)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="hsl(48, 75%, 52%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(18, 70%, 55%)" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id="feather-spine-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(160, 35%, 35%)" stopOpacity="0.5" />
            <stop offset="50%" stopColor="hsl(48, 60%, 50%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(18, 60%, 50%)" stopOpacity="0.35" />
          </linearGradient>
          <filter id="feather-soft">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left barbs — soft curved strands */}
        <path
          d="M 80 420 Q 100 380, 140 360 Q 160 340, 180 310 Q 195 280, 210 260"
          stroke="url(#feather-grad)" strokeWidth="14" strokeLinecap="round" fill="none"
          filter="url(#feather-soft)" opacity="0.6"
        />
        <path
          d="M 120 390 Q 150 340, 190 300 Q 220 260, 250 230"
          stroke="url(#feather-grad)" strokeWidth="16" strokeLinecap="round" fill="none"
          filter="url(#feather-soft)" opacity="0.65"
        />
        <path
          d="M 160 360 Q 200 300, 250 250 Q 280 220, 300 195"
          stroke="url(#feather-grad)" strokeWidth="18" strokeLinecap="round" fill="none"
          filter="url(#feather-soft)" opacity="0.7"
        />
        <path
          d="M 200 330 Q 240 270, 290 220 Q 320 190, 340 170"
          stroke="url(#feather-grad)" strokeWidth="16" strokeLinecap="round" fill="none"
          filter="url(#feather-soft)" opacity="0.65"
        />
        <path
          d="M 240 300 Q 280 250, 330 200 Q 360 170, 380 150"
          stroke="url(#feather-grad)" strokeWidth="14" strokeLinecap="round" fill="none"
          filter="url(#feather-soft)" opacity="0.55"
        />

        {/* Right barbs — mirrored curved strands */}
        <path
          d="M 200 460 Q 190 400, 210 350 Q 230 300, 240 270"
          stroke="url(#feather-grad)" strokeWidth="14" strokeLinecap="round" fill="none"
          filter="url(#feather-soft)" opacity="0.6"
        />
        <path
          d="M 230 420 Q 230 360, 260 300 Q 280 260, 290 235"
          stroke="url(#feather-grad)" strokeWidth="16" strokeLinecap="round" fill="none"
          filter="url(#feather-soft)" opacity="0.65"
        />
        <path
          d="M 270 390 Q 280 320, 310 260 Q 330 230, 340 205"
          stroke="url(#feather-grad)" strokeWidth="18" strokeLinecap="round" fill="none"
          filter="url(#feather-soft)" opacity="0.7"
        />
        <path
          d="M 310 360 Q 320 300, 350 240 Q 370 210, 385 185"
          stroke="url(#feather-grad)" strokeWidth="16" strokeLinecap="round" fill="none"
          filter="url(#feather-soft)" opacity="0.65"
        />
        <path
          d="M 350 330 Q 360 280, 390 220 Q 410 190, 420 165"
          stroke="url(#feather-grad)" strokeWidth="14" strokeLinecap="round" fill="none"
          filter="url(#feather-soft)" opacity="0.55"
        />

        {/* Central spine — the feather quill */}
        <path
          d="M 60 470 Q 150 380, 250 280 Q 350 180, 450 100 Q 500 60, 540 30"
          stroke="url(#feather-spine-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />

        {/* Tapered tip highlight */}
        <path
          d="M 450 100 Q 490 65, 540 30"
          stroke="url(#feather-spine-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default FeatherRibbon;
