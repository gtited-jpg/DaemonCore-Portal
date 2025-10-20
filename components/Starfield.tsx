import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const stars = Array.from({ length: 400 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * width,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(11,11,15,0.6)";
      ctx.fillRect(0, 0, width, height);
      for (const star of stars) {
        star.z -= 2;
        if (star.z <= 0) star.z = width;
        const k = 128 / star.z;
        const px = star.x * k + width / 2;
        const py = star.y * k + height / 2;
        if (px < 0 || px >= width || py < 0 || py >= height) continue;
        const size = (1 - star.z / width) * 2;
        ctx.fillStyle = "rgba(140,100,255,1)";
        ctx.fillRect(px, py, size, size);
      }
      requestAnimationFrame(draw);
    };

    draw();
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
