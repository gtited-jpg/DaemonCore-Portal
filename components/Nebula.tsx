import { useEffect, useRef } from "react";

export default function Nebula() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const gradient = () => {
      const g = ctx.createRadialGradient(w * 0.3, h * 0.3, 50, w * 0.3, h * 0.3, Math.max(w, h));
      g.addColorStop(0, "rgba(139,92,246,0.35)");
      g.addColorStop(0.4, "rgba(124,58,237,0.25)");
      g.addColorStop(1, "rgba(11,11,15,0)");
      return g;
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = gradient();
      ctx.fillRect(0, 0, w, h);
      requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}
