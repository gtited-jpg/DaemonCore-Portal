import HoloCard from "@/components/HoloCard";

export default function DownloadCard({ productName, variantName, receiptUrl }: { productName: string; variantName?: string; receiptUrl?: string | null; }) {
  return (
    <HoloCard title={productName} subtitle={variantName} badge="Download">
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {receiptUrl ? (
          <a
            href={receiptUrl}
            target="_blank"
            rel="noreferrer"
            style={{ background: "linear-gradient(90deg,#8b5cf6,#7c3aed)", color: "#fff", padding: "8px 12px", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 14 }}
          >
            Open Receipt & Files
          </a>
        ) : (
          <span style={{ opacity: 0.7 }}>No download link available.</span>
        )}
        <a
          href="https://daemoncore.app/boilerplates.html"
          target="_blank"
          rel="noreferrer"
          style={{ background: "rgba(255,255,255,.1)", color: "#fff", padding: "8px 12px", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 14, border: "1px solid rgba(255,255,255,.25)" }}
        >
          Explore More Kits
        </a>
      </div>
    </HoloCard>
  );
}
