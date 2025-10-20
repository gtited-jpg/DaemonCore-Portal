import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase";

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
  const [orders, setOrders] = useState<Order[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        setUserEmail(user.email);
        setUserName(user.displayName || user.email.split("@")[0]);
        try {
          const res = await fetch(`/api/orders?email=${encodeURIComponent(user.email)}`);
          const data = await res.json();
          setOrders(data.orders || []);
        } catch (e) {
          console.error(e);
          setOrders([]);
        } finally {
          setLoading(false);
        }
      } else {
        setUserEmail(null);
        setOrders([]);
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 20% 20%, rgba(139,92,246,0.25), transparent 60%), radial-gradient(circle at 80% 80%, rgba(124,58,237,0.3), transparent 70%), #0b0b0f",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        padding: "2rem",
      }}
    >
      <header style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            background: "linear-gradient(90deg,#8b5cf6,#7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome back{userName ? `, ${userName}` : ""} 👋
        </h1>
        <p style={{ opacity: 0.8 }}>
          Access your DaemonCore purchases, license keys, and receipts below.
        </p>
      </header>

      {loading && <p style={{ textAlign: "center" }}>Fetching your cosmic data...</p>}

      {!loading && userEmail && orders.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No purchases found for <strong>{userEmail}</strong>.
        </p>
      )}

      {!loading && orders.length > 0 && (
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-block",
              padding: "0.75rem 1.25rem",
              borderRadius: "9999px",
              background: "rgba(139,92,246,0.15)",
              border: "1px solid rgba(139,92,246,0.4)",
            }}
          >
            You own <strong>{orders.length}</strong>{" "}
            {orders.length === 1 ? "product" : "products"}
          </div>
        </div>
      )}

      <section
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        }}
      >
        {orders.map((o) => (
          <div
            key={o.id}
            style={{
              borderRadius: "16px",
              padding: "1.5rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(139,92,246,0.3)",
              boxShadow: "0 0 20px rgba(139,92,246,0.15)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"),
              (e.currentTarget.style.boxShadow = "0 0 25px rgba(139,92,246,0.35)"))
            }
            onMouseLeave={(e) =>
              ((e.currentTarget.style.transform = "none"),
              (e.currentTarget.style.boxShadow = "0 0 20px rgba(139,92,246,0.15)"))
            }
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>
              {o.productName}{" "}
              <span style={{ opacity: 0.8, fontSize: "0.9rem" }}>{o.variantName}</span>
            </h3>

            <div style={{ opacity: 0.8, fontSize: "0.9rem", marginTop: "0.25rem" }}>
              {o.status} • {o.total} {o.testMode && "(Test Mode)"}
            </div>

            {o.licenseKey && (
              <div
                style={{
                  marginTop: "1rem",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: "0.9rem",
                  wordBreak: "break-all",
                }}
              >
                🔑 License Key: {o.licenseKey}
                {o.licenseStatus ? ` (${o.licenseStatus})` : ""}
              </div>
            )}

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              {o.receiptUrl && (
                <a
                  href={o.receiptUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: "linear-gradient(90deg,#8b5cf6,#7c3aed)",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                  }}
                >
                  View Receipt
                </a>
              )}
              <a
                href="https://daemoncore.app/boilerplates.html"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Explore More Kits
              </a>
            </div>

            <div
              style={{
                opacity: 0.6,
                marginTop: "0.75rem",
                fontSize: "0.8rem",
              }}
            >
              Order ID: {o.id} • {new Date(o.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
