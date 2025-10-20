import CosmicSidebar from "@/components/CosmicSidebar";
import Starfield from "@/components/Starfield";
import Nebula from "@/components/Nebula";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0f", color: "#fff", fontFamily: "Inter, ui-sans-serif, system-ui" }}>
      <Starfield />
      <Nebula />
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16, padding: 16, position: "relative", zIndex: 1 }}>
        <CosmicSidebar />
        <main style={{ padding: 16 }}>{children}</main>
      </div>
    </div>
  );
}
