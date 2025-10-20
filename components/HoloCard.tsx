import { motion } from "framer-motion";
import React from "react";

export default function HoloCard({ title, subtitle, children, badge }: { title: string; subtitle?: string; children?: React.ReactNode; badge?: string; }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        borderRadius: 16,
        padding: 20,
        background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
        border: "1px solid rgba(139,92,246,0.35)",
        boxShadow: "0 0 24px rgba(139,92,246,0.25)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -1,
          background:
            "radial-gradient(600px 200px at var(--mx,50%) var(--my,0%), rgba(139,92,246,0.25), transparent 60%)",
          pointerEvents: "none",
          transition: "background-position 0.2s ease",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, background: "linear-gradient(90deg,#c4b5fd,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {title}
          </div>
          {subtitle && <div style={{ opacity: 0.8, fontSize: 13, marginTop: 4 }}>{subtitle}</div>}
        </div>
        {badge && (
          <span style={{ fontSize: 12, padding: "6px 10px", borderRadius: 999, background: "rgba(139,92,246,0.22)", border: "1px solid rgba(139,92,246,0.45)" }}>
            {badge}
          </span>
        )}
      </div>
      <div style={{ marginTop: 12 }}>{children}</div>
    </motion.div>
  );
}
