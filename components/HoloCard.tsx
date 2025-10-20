// components/HoloCard.tsx
import React from "react";

export default function HoloCard({
  title,
  subtitle,
  badge,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        background:
          "radial-gradient(circle at top left, rgba(139,92,246,0.15), transparent 60%), radial-gradient(circle at bottom right, rgba(124,58,237,0.15), transparent 60%), rgba(15,15,25,0.75)",
        border: "1px solid rgba(139,92,246,0.35)",
        borderRadius: 18,
        padding: 22,
        boxShadow:
          "0 0 35px rgba(124,58,237,0.15), inset 0 0 20px rgba(139,92,246,0.05)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2
            style={{
              margin: 0,
              fontWeight: 800,
              fontSize: 18,
              background: "linear-gradient(90deg,#c4b5fd,#a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <div
              style={{
                opacity: 0.8,
                fontSize: 14,
                color: "#ccc",
                marginTop: 4,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {badge && (
          <span
            style={{
              alignSelf: "center",
              background: "rgba(139,92,246,0.2)",
              border: "1px solid rgba(139,92,246,0.5)",
              color: "#d9c3ff",
              padding: "4px 10px",
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {badge}
          </span>
        )}
      </div>

      <div style={{ marginTop: 14, color: "#f5f3ff" }}>{children}</div>
    </div>
  );
}
