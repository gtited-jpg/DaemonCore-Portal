import AppLayout from "@/components/AppLayout";
import HoloCard from "@/components/HoloCard";
import useRequireAuth from "@/lib/useRequireAuth";
import { useEffect, useState } from "react";

type Order = {
  id: string;
  email: string;
  status: string;
  total: string;
  productName: string;
  variantName: string;
  testMode: boolean;
  receiptUrl: string | null;
  createdAt: string;
  licenseKey: string | null;
  licenseStatus: string | null;
};

export default function Dashboard() {
  const user = useRequireAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    (async () => {
      try {
        const res = await fetch(`/api/orders?email=${encodeURIComponent(user.email!)}`);
        const data = await res.json();
        setOrders(data.orders || []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.email]);

  if (!user) return null;

  return (
    <AppLayout>
      <section style={{ position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: 12 }}>
          <h1 style={{
            fontSize: "1.9rem", fontWeight: 900, margin: 0,
            background: "linear-gradient(90deg,#c4b5fd,#a78bfa)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            Welcome, {user.displayName?.split(" ")[0] || user.email}
          </h1>
          <div style={{ opacity: 0.8 }}>Access your DaemonCore products and receipts.</div>
        </div>

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", marginTop: 12 }}>
          <HoloCard title="Your Products" subtitle={loading ? "Loading…" : `${orders.length} ${orders.length === 1 ? "product" : "products"}`} badge="Live">
            {(!loading && orders.length === 0) && (
              <div style={{ opacity: 0.8 }}>No purchases found for {user.email}.</div>
            )}
            <div style={{ display: "grid", gap: 12 }}>
              {orders.map((o) => (
                <div key={o.id} style={{ padding: 12, borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(139,92,246,0.3)" }}>
                  <div style={{ fontWeight: 700 }}>{o.productName} <span style={{ opacity: 0.8 }}>• {o.variantName}</span></div>
                  <div style={{ opacity: 0.85, fontSize: 13, marginTop: 4 }}>{o.status} • {o.total} {o.testMode && "• TEST"}</div>
                  {o.licenseKey && (
                    <div style={{ marginTop: 8, padding: "8px 10px", background: "rgba(255,255,255,0.1)", borderRadius: 8, fontFamily: "ui-monospace, Menlo, monospace", wordBreak: "break-all", fontSize: 13 }}>
                      🔑 {o.licenseKey}{o.licenseStatus ? ` (${o.licenseStatus})` : ""}
                    </div>
                  )}
                  <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {o.receiptUrl && (
                      <a href={o.receiptUrl} target="_blank" rel="noreferrer" style={{ background: "linear-gradient(90deg,#8b5cf6,#7c3aed)", color: "#fff", padding: "8px 12px", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>View Receipt</a>
                    )}
                    <a href="https://daemoncore.app/boilerplates.html" target="_blank" rel="noreferrer" style={{ background: "rgba(255,255,255,.1)", color: "#fff", padding: "8px 12px", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 14, border: "1px solid rgba(255,255,255,.25)" }}>Explore More Kits</a>
                  </div>
                  <div style={{ opacity: 0.6, marginTop: 6, fontSize: 12 }}>Order ID: {o.id} • {new Date(o.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </HoloCard>

          <HoloCard title="Announcements" subtitle="What’s new" badge="Pulse">
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li>DaemonKit Angular Starter updates rolling out</li>
              <li>New Cosmic Dashboard v2 released</li>
              <li>Support tickets module coming next</li>
            </ul>
          </HoloCard>

          <HoloCard title="Quick Links" subtitle="Handy shortcuts">
            <div style={{ display: "grid", gap: 8 }}>
              <a href="https://daemoncore.app/boilerplates.html" target="_blank" rel="noreferrer" style={{ color: "#c4b5fd", textDecoration: "none" }}>Boilerplates</a>
              <a href="https://daemoncore.app" target="_blank" rel="noreferrer" style={{ color: "#c4b5fd", textDecoration: "none" }}>Website</a>
              <a href="https://daemoncore.lemonsqueezy.com" target="_blank" rel="noreferrer" style={{ color: "#c4b5fd", textDecoration: "none" }}>Customer Portal</a>
            </div>
          </HoloCard>
        </div>
      </section>
    </AppLayout>
  );
}
