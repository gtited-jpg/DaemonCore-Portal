import AppLayout from "@/components/AppLayout";
import useRequireAuth from "@/lib/useRequireAuth";
import TicketForm from "@/components/TicketForm";
import { useCallback, useEffect, useState } from "react";
import { listTickets, closeTicket, Ticket } from "@/lib/firestore";
import HoloCard from "@/components/HoloCard";

export default function Tickets() {
  const user = useRequireAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async ()=>{
    if (!user?.email) return;
    setLoading(true);
    try {
      const t = await listTickets(user.email);
      setTickets(t);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => { load(); }, [load]);

  if (!user) return null;

  return (
    <AppLayout>
      <section>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: 12,
          background: "linear-gradient(90deg,#c4b5fd,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>Support Tickets</h1>

        <TicketForm email={user.email!} onCreated={load} />

        <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
          {loading && <div>Loading tickets…</div>}
          {!loading && tickets.length === 0 && <div style={{ opacity: 0.8 }}>No tickets yet.</div>}
          {tickets.map((t) => (
            <HoloCard key={t.id} title={t.subject} subtitle={new Date(t.createdAt?.toDate?.() || Date.now()).toLocaleString()} badge={t.status === "open" ? "Open" : "Closed"}>
              <div style={{ opacity: 0.9, whiteSpace: "pre-wrap" }}>{t.message}</div>
              {t.status === "open" && (
                <button onClick={async ()=>{ await closeTicket(t.id!); load(); }} style={{
                  marginTop: 10, padding: "8px 12px", borderRadius: 8,
                  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(139,92,246,0.45)",
                  color: "#fff", cursor: "pointer", fontWeight: 700
                }}>Mark Resolved</button>
              )}
            </HoloCard>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
