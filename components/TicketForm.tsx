import { useState } from "react";
import HoloCard from "@/components/HoloCard";
import { createTicket } from "@/lib/firestore";

export default function TicketForm({ email, onCreated }: { email: string; onCreated: () => void; }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const canSubmit = subject.trim().length > 2 && message.trim().length > 4;

  const submit = async () => {
    if (!canSubmit || loading) return;
    setLoading(true);
    try {
      await createTicket(email, subject.trim(), message.trim());
      setSubject("");
      setMessage("");
      onCreated();
      alert("Ticket submitted!");
    } catch (e) {
      console.error(e);
      alert("Failed to submit ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <HoloCard title="Create Support Ticket" subtitle="Describe your issue" badge="Live">
      <div style={{ display: "grid", gap: 10 }}>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          style={{ padding: 10, borderRadius: 10, border: "1px solid rgba(139,92,246,0.35)", background: "rgba(255,255,255,0.06)", color: "#fff" }}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what's happening…"
          rows={4}
          style={{ padding: 10, borderRadius: 10, border: "1px solid rgba(139,92,246,0.35)", background: "rgba(255,255,255,0.06)", color: "#fff", resize: "vertical" }}
        />
        <button
          onClick={submit}
          disabled={!canSubmit || loading}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            background: canSubmit ? "linear-gradient(90deg,#8b5cf6,#7c3aed)" : "rgba(255,255,255,0.1)",
            border: "1px solid rgba(139,92,246,0.45)",
            color: "#fff", cursor: canSubmit ? "pointer" : "not-allowed",
            fontWeight: 700
          }}
        >
          {loading ? "Submitting…" : "Submit Ticket"}
        </button>
      </div>
    </HoloCard>
  );
}
