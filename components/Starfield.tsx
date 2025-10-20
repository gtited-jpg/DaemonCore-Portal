import React, { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const stars = Array.from({ length: 350 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.8 + 0.2,
      r: Math.random() * 1.2 + 0.3
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      // deep nebula glow
      const g1 = ctx.createRadialGradient(w*0.2, h*0.1, 0, w*0.2, h*0.1, Math.max(w,h)*0.8);
      g1.addColorStop(0, "rgba(139,92,246,0.12)");
      g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g1; ctx.fillRect(0,0,w,h);
      const g2 = ctx.createRadialGradient(w*0.9, h*0.2, 0, w*0.9, h*0.2, Math.max(w,h)*0.7);
      g2.addColorStop(0, "rgba(124,58,237,0.14)");
      g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2; ctx.fillRect(0,0,w,h);

      ctx.fillStyle = "white";
      stars.forEach(s => {
        ctx.globalAlpha = 0.7 * s.z + 0.3;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return <canvas id="stars" ref={canvasRef} />;
}
