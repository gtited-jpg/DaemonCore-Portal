import AppLayout from "@/components/AppLayout";
import useRequireAuth from "@/lib/useRequireAuth";
import { useEffect, useState } from "react";
import BillingCard from "@/components/BillingCard";

type Order = {
  id: string;
  status: string;
  total: string;
  createdAt: string;
  receiptUrl: string | null;
};

export default function Billing() {
  const user = useRequireAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    (async () => {
      try {
        const res = await fetch(`/api/orders?email=${encodeURIComponent(user.email!)}`);
        const data = await res.json();
        const mapped = (data.orders || []).map((o: any) => ({
          id: o.id, status: o.status, total: o.total, createdAt: o.createdAt, receiptUrl: o.receiptUrl
        }));
        setOrders(mapped);
      } catch (e) {
        console.error(e);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.email]);

  if (!user) return null;

  return (
    <AppLayout>
      <section>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: 12,
          background: "linear-gradient(90deg,#c4b5fd,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>Billing</h1>

        {loading && <div>Loading invoices…</div>}
        {!loading && orders.length === 0 && <div style={{ opacity: 0.8 }}>No invoices found.</div>}

        <div style={{ display: "grid", gap: 12 }}>
          {orders.map((o) => (
            <BillingCard key={o.id} id={o.id} status={o.status} total={o.total} createdAt={o.createdAt} receiptUrl={o.receiptUrl} />
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
