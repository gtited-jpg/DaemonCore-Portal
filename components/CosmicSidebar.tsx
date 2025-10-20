import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useRouter } from "next/router";

const NavItem = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} style={{
    display: "block",
    padding: "10px 12px",
    borderRadius: 10,
    textDecoration: "none",
    color: "#fff",
    border: "1px solid transparent"
  }}
  onMouseEnter={(e)=>{ e.currentTarget.style.background="rgba(139,92,246,0.2)"; e.currentTarget.style.borderColor="rgba(139,92,246,0.45)"; }}
  onMouseLeave={(e)=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="transparent"; }}
  >
    {label}
  </Link>
);

export default function CosmicSidebar() {
  const router = useRouter();
  const onSignOut = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    router.replace("/");
  };

  return (
    <aside style={{
      width: 260, padding: 16, background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(139,92,246,0.35)", borderRadius: 16, position: "sticky",
      top: 16, height: "fit-content", zIndex: 2
    }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <img src="/daemoncore.svg" width={36} height={36} alt="D" />
        <div style={{ marginLeft: 10, fontWeight: 800, fontSize: 18,
          background: "linear-gradient(90deg,#8b5cf6,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          DaemonCore
        </div>
      </div>
      <nav style={{ display: "grid", gap: 8 }}>
        <NavItem href="/dashboard" label="🛒 My Products" />
        <NavItem href="/tickets" label="🎫 Support Tickets" />
        <NavItem href="/downloads" label="📦 Downloads" />
        <NavItem href="/billing" label="💳 Billing" />
        <NavItem href="/account" label="⚙️ Account Settings" />
      </nav>
      <button
        onClick={onSignOut}
        style={{
          marginTop: 14, width: "100%", padding: "10px 12px",
          borderRadius: 10, background: "rgba(139,92,246,0.2)",
          border: "1px solid rgba(139,92,246,0.45)", color: "#fff", cursor: "pointer"
        }}
      >
        Sign Out
      </button>
    </aside>
  );
}
