import { useEffect, useRef } from "react";

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;

    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight);

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.8 + 0.2,
    }));

    const onResize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.x += 0.15 * s.z;
        if (s.x > w) s.x = 0;
        ctx.globalAlpha = 0.45 + 0.45 * s.z;
        ctx.fillStyle = "#bba6ff";
        ctx.fillRect(s.x, s.y, 2 * s.z, 2 * s.z);
      }
      requestAnimationFrame(tick);
    };
    tick();

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.35 }} />;
}
