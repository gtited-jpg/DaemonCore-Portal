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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        setUserEmail(user.email);
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
    <main style={{ padding: 24 }}>
      <h1 className="text-2xl font-bold">Your Products</h1>

      {!userEmail && <p>Please sign in to view purchases.</p>}
      {userEmail && loading && <p>Loading your purchases…</p>}
      {userEmail && !loading && orders.length === 0 && (
        <p>No purchases found for {userEmail}.</p>
      )}

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          marginTop: 16,
        }}
      >
        {orders.map((o) => (
          <div
            key={o.id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 16,
              background: "#fff",
            }}
          >
            <div style={{ fontWeight: 600 }}>{o.productName}</div>
            <div style={{ opacity: 0.8, fontSize: 14 }}>{o.variantName}</div>
            <div style={{ marginTop: 8, fontSize: 14 }}>
              {o.total} • {o.status} {o.testMode ? "• TEST" : ""}
            </div>
            {o.licenseKey && (
              <div
                style={{
                  marginTop: 10,
                  padding: "8px 10px",
                  background: "#f3f4f6",
                  borderRadius: 8,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: 13,
                  wordBreak: "break-all",
                }}
              >
                License: {o.licenseKey}
                {o.licenseStatus ? ` (${o.licenseStatus})` : ""}
              </div>
            )}
            <div style={{ marginTop: 10 }}>
              {o.receiptUrl && (
                <a
                  href={o.receiptUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #111827",
                    borderRadius: 8,
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  View Receipt
                </a>
              )}
            </div>
            <div style={{ marginTop: 8, opacity: 0.6, fontSize: 12 }}>
              Order ID: {o.id}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
