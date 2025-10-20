// pages/index.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b0b0f",
        backgroundImage:
          "radial-gradient(1200px 600px at 20% -10%, rgba(139,92,246,.15), transparent 60%), radial-gradient(1200px 800px at 100% 20%, rgba(124,58,237,.18), transparent 55%)",
        color: "#fff",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, #a78bfa, #7c3aed)",
            boxShadow: "0 0 15px rgba(139,92,246,0.8)",
          }}
        />
        <h1
          style={{
            margin: 0,
            fontWeight: 900,
            background: "linear-gradient(90deg,#c4b5fd,#a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          DaemonCore Portal
        </h1>
      </div>

      <p style={{ opacity: 0.85, maxWidth: 600, marginBottom: 24 }}>
        Welcome to your cosmic control center.  
        Manage purchases, support tickets, and your DaemonCore account in one place.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 16,
          marginTop: 10,
        }}
      >
        <Link href="/downloads" style={linkStyle}>
          Downloads
        </Link>
        <Link href="/billing" style={linkStyle}>
          Billing
        </Link>
        <Link href="/tickets" style={linkStyle}>
          Support Tickets
        </Link>
        <Link href="/account" style={linkStyle}>
          My Account
        </Link>
      </div>
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  padding: "10px 18px",
  borderRadius: 10,
  border: "1px solid rgba(139,92,246,0.4)",
  background: "rgba(139,92,246,0.15)",
  color: "#fff",
  fontWeight: 600,
  textDecoration: "none",
  transition: "all 0.2s",
};
