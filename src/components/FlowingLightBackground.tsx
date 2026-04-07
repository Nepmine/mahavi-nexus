import { useEffect, useRef } from "react";

const FlowingLightBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollSpeedRef = useRef(0);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Track scroll velocity
    const onScroll = () => {
      const now = performance.now();
      const dt = now - lastScrollRef.current;
      if (dt > 0) {
        scrollSpeedRef.current = Math.min(Math.abs(window.scrollY - (lastScrollRef.current || window.scrollY)) / dt, 1);
      }
      lastScrollRef.current = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Neural line paths - each is a flowing curve
    interface NeuralLine {
      points: { x: number; y: number; vx: number; vy: number }[];
      opacity: number;
      blur: number;
      speed: number;
      hue: number;
      layer: number; // 0=far, 1=mid, 2=near
    }

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const createLine = (layer: number): NeuralLine => {
      const pointCount = 4 + Math.floor(Math.random() * 3);
      const points = [];
      const startX = Math.random() * w();
      const startY = Math.random() * h();
      for (let i = 0; i < pointCount; i++) {
        points.push({
          x: startX + (Math.random() - 0.5) * w() * 0.6,
          y: startY + (Math.random() - 0.5) * h() * 0.4,
          vx: (Math.random() - 0.5) * 0.15 * (layer === 0 ? 0.5 : layer === 1 ? 0.8 : 1),
          vy: (Math.random() - 0.5) * 0.1 * (layer === 0 ? 0.5 : layer === 1 ? 0.8 : 1),
        });
      }

      const hues = [160, 200, 260]; // green-teal, blue, purple
      return {
        points,
        opacity: layer === 0 ? 0.015 : layer === 1 ? 0.025 : 0.03,
        blur: layer === 0 ? 30 : layer === 1 ? 15 : 6,
        speed: 0.3 + Math.random() * 0.3,
        hue: hues[Math.floor(Math.random() * hues.length)],
        layer,
      };
    };

    const lines: NeuralLine[] = [];
    // Far layer (3 lines)
    for (let i = 0; i < 3; i++) lines.push(createLine(0));
    // Mid layer (4 lines)
    for (let i = 0; i < 4; i++) lines.push(createLine(1));
    // Near layer (3 lines)
    for (let i = 0; i < 3; i++) lines.push(createLine(2));

    const drawCurve = (line: NeuralLine) => {
      const pts = line.points;
      if (pts.length < 2) return;

      ctx.save();
      ctx.filter = `blur(${line.blur}px)`;
      ctx.globalAlpha = line.opacity;
      ctx.strokeStyle = `hsla(${line.hue}, 35%, 60%, 1)`;
      ctx.lineWidth = line.layer === 0 ? 80 : line.layer === 1 ? 40 : 20;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);

      for (let i = 1; i < pts.length - 1; i++) {
        const cx = (pts[i].x + pts[i + 1].x) / 2;
        const cy = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, cx, cy);
      }
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      time += 0.016;
      const scrollBoost = 1 + scrollSpeedRef.current * 3;
      scrollSpeedRef.current *= 0.95; // decay

      const cw = w();
      const ch = h();

      ctx.clearRect(0, 0, cw, ch);

      lines.forEach((line) => {
        line.points.forEach((p) => {
          p.x += p.vx * line.speed * scrollBoost;
          p.y += p.vy * line.speed * scrollBoost;

          // Gentle wraparound
          if (p.x < -200) p.x = cw + 200;
          if (p.x > cw + 200) p.x = -200;
          if (p.y < -200) p.y = ch + 200;
          if (p.y > ch + 200) p.y = -200;

          // Add slight wave motion
          p.x += Math.sin(time * 0.3 + p.y * 0.001) * 0.1;
          p.y += Math.cos(time * 0.2 + p.x * 0.001) * 0.08;
        });

        drawCurve(line);
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default FlowingLightBackground;
