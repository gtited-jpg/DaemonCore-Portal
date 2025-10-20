// pages/index.tsx
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // === Starfield Animation ===
    const canvas = document.getElementById("stars") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let stars: { x: number; y: number; z: number }[] = [];
    const numStars = 800;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: numStars }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
      }));
    };
    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      if (!ctx) return;
      ctx.fillStyle = "rgba(11,11,15,1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.z -= 2;
        if (star.z <= 0) star.z = canvas.width;
        const k = 128.0 / star.z;
        const px = star.x * k + canvas.width / 2;
        const py = star.y * k + canvas.height / 2;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const size = (1 - star.z / canvas.width) * 2;
          ctx.fillStyle = `rgba(139,92,246,${1 - star.z / canvas.width})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
        color: "#fff",
      }}
    >
      <canvas
        id="stars"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: "#0b0b0f",
        }}
      />

      <main
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        {/* Glowing D logo */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "4px solid rgba(139,92,246,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 0 50px rgba(124,58,237,0.4), 0 0 90px rgba(139,92,246,0.2)",
            animation: "pulse 3s ease-in-out infinite",
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 900,
              background: "linear-gradient(90deg,#c4b5fd,#a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            D
          </span>
        </div>

        <h1
          style={{
            fontWeight: 900,
            fontSize: 36,
            marginTop: 28,
            background: "linear-gradient(90deg,#c4b5fd,#a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome to DaemonCore Portal
        </h1>

        <p
          style={{
            opacity: 0.85,
            maxWidth: 580,
            fontSize: 16,
            marginTop: 10,
            marginBottom: 30,
          }}
        >
          Manage your cosmic boilerplates, view receipts, submit support tickets,
          and control every part of your DaemonCore ecosystem.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <Link href="/downloads" style={linkStyle}>
            🚀 Downloads
          </Link>
          <Link href="/billing" style={linkStyle}>
            💳 Billing
          </Link>
          <Link href="/tickets" style={linkStyle}>
            🧾 Support Tickets
          </Link>
          <Link href="/account" style={linkStyle}>
            👤 My Account
          </Link>
        </div>
      </main>

      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 50px rgba(124, 58, 237, 0.4),
              0 0 90px rgba(139, 92, 246, 0.2);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 80px rgba(124, 58, 237, 0.7),
              0 0 140px rgba(139, 92, 246, 0.4);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 50px rgba(124, 58, 237, 0.4),
              0 0 90px rgba(139, 92, 246, 0.2);
          }
        }
      `}</style>
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  padding: "12px 20px",
  borderRadius: 12,
  border: "1px solid rgba(139,92,246,0.45)",
  background:
    "linear-gradient(90deg, rgba(139,92,246,0.15), rgba(124,58,237,0.15))",
  color: "#fff",
  fontWeight: 600,
  textDecoration: "none",
  transition: "all 0.2s ease",
};
