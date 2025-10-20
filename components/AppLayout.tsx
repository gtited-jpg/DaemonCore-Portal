// components/AppLayout.tsx
import React from "react";
import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b0b0f",
        backgroundImage:
          "radial-gradient(1600px 900px at 50% 0%, rgba(124,58,237,0.25), transparent 70%), radial-gradient(800px 800px at 80% 100%, rgba(139,92,246,0.2), transparent 70%)",
        color: "#fff",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 28px",
          borderBottom: "1px solid rgba(139,92,246,0.25)",
          background: "rgba(10,10,16,0.75)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, #a78bfa, #7c3aed)",
                boxShadow: "0 0 10px rgba(139,92,246,0.8)",
              }}
            />
            <h1
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 800,
                background: "linear-gradient(90deg,#c4b5fd,#a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DaemonCore Portal
            </h1>
          </div>
        </Link>

        <nav style={{ display: "flex", gap: 20, fontSize: 14 }}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/tickets">Tickets</Link>
          <Link href="/downloads">Downloads</Link>
          <Link href="/billing">Billing</Link>
          <Link href="/account">Account</Link>
        </nav>
      </header>

      {/* Page Content */}
      <main style={{ flex: 1, padding: "40px 24px", maxWidth: 960, margin: "0 auto", width: "100%" }}>
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "16px 0",
          textAlign: "center",
          fontSize: 12,
          opacity: 0.6,
          borderTop: "1px solid rgba(139,92,246,0.15)",
        }}
      >
        © {new Date().getFullYear()} DaemonCore. All rights reserved.
      </footer>
    </div>
  );
}
