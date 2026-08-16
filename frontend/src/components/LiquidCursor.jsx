import { useEffect, useRef } from "react";

const isCoarsePointer = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function LiquidCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isCoarsePointer() || prefersReducedMotion()) return undefined;

    document.documentElement.classList.add("liquid-cursor-active");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: -100, y: -100 };
    const head = { x: -100, y: -100, vx: 0, vy: 0 };
    const mid = { x: -100, y: -100 };
    const tail = { x: -100, y: -100 };
    let hovering = false;
    let dark = false;
    let visible = false;
    const ripples = [];

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      visible = true;
      const t = e.target;
      hovering = !!(
        t.closest &&
        t.closest("a, button, [role='button'], input, select, textarea, label, summary, [data-cursor]")
      );
      const el = document.elementFromPoint(e.clientX, e.clientY);
      dark = !!(el && el.closest && el.closest("[data-cursor-theme='dark']"));
    };
    const onDown = (e) => {
      ripples.push({ x: e.clientX, y: e.clientY, t: 0 });
    };
    const onLeave = () => {
      visible = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    const drawBlob = (x, y, r, stretch, angle, fill, stroke) => {
      ctx.save();
      ctx.translate(x * dpr, y * dpr);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.ellipse(0, 0, r * stretch * dpr, (r / Math.max(stretch, 0.6)) * dpr, 0, 0, Math.PI * 2);
      ctx.fillStyle = fill;
      ctx.globalAlpha = 0.9;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1.25 * dpr;
      ctx.strokeStyle = stroke;
      ctx.stroke();
      ctx.restore();
    };

    const tick = () => {
      const k = 0.16;
      const damp = 0.72;
      head.vx = (head.vx + (mouse.x - head.x) * k) * damp;
      head.vy = (head.vy + (mouse.y - head.y) * k) * damp;
      head.x += head.vx;
      head.y += head.vy;
      mid.x += (head.x - mid.x) * 0.22;
      mid.y += (head.y - mid.y) * 0.22;
      tail.x += (mid.x - tail.x) * 0.16;
      tail.y += (mid.y - tail.y) * 0.16;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (visible) {
        const speed = Math.hypot(head.vx, head.vy);
        const stretch = 1 + Math.min(speed * 0.045, 0.9);
        const angle = Math.atan2(head.vy, head.vx);
        const fill = dark ? "#0B2545" : "#F4EEE2";
        const stroke = dark ? "#F4EEE2" : "#0B2545";
        const baseR = hovering ? 16 : 11;

        ctx.globalAlpha = 0.45;
        drawBlob(tail.x, tail.y, baseR * 0.45, 1, 0, fill, "transparent");
        ctx.globalAlpha = 0.65;
        drawBlob(mid.x, mid.y, baseR * 0.68, 1 + Math.min(speed * 0.02, 0.4), angle, fill, "transparent");
        ctx.globalAlpha = 1;
        drawBlob(
          head.x,
          head.y,
          baseR,
          hovering ? Math.min(stretch, 1.15) * 1.25 : stretch,
          angle,
          fill,
          stroke
        );
      }

      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const rp = ripples[i];
        rp.t += 1;
        const p = rp.t / 38;
        if (p >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        const radius = 8 + p * 46;
        ctx.beginPath();
        ctx.arc(rp.x * dpr, rp.y * dpr, radius * dpr, 0, Math.PI * 2);
        ctx.strokeStyle = dark ? "#F4EEE2" : "#0B2545";
        ctx.globalAlpha = (1 - p) * 0.55;
        ctx.lineWidth = 1.5 * dpr;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("liquid-cursor-active");
    };
  }, []);

  if (isCoarsePointer() || prefersReducedMotion()) return null;

  return (
    <canvas
      ref={canvasRef}
      data-testid="liquid-cursor-canvas"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  );
}
