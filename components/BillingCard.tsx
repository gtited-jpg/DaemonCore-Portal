import HoloCard from "@/components/HoloCard";

export default function BillingCard({ id, total, status, createdAt, receiptUrl }: { id: string; total: string; status: string; createdAt: string; receiptUrl?: string | null; }) {
  return (
    <HoloCard title={`Invoice #${id}`} subtitle={new Date(createdAt).toLocaleString()} badge={status}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 700 }}>{total}</div>
        {receiptUrl && (
          <a href={receiptUrl} target="_blank" rel="noreferrer" style={{
            background: "linear-gradient(90deg,#8b5cf6,#7c3aed)",
            color: "#fff", padding: "8px 12px", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 14
          }}>View Receipt</a>
        )}
      </div>
    </HoloCard>
  );
}
