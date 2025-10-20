import HoloCard from "@/components/HoloCard";
import { updateProfile } from "firebase/auth";
import { upsertAccount } from "@/lib/firestore";
import { useState } from "react";

export default function AccountPanel({ user }: { user: any }) {
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await updateProfile(user, { displayName, photoURL });
      await upsertAccount(user.uid, { displayName, email: user.email, photoURL });
      alert("Profile updated");
    } catch (e) {
      console.error(e);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <HoloCard title="Account Settings" subtitle={user.email} badge="Profile">
      <div style={{ display: "grid", gap: 10 }}>
        <label style={{ fontSize: 12, opacity: 0.8 }}>Display name</label>
        <input value={displayName} onChange={(e)=>setDisplayName(e.target.value)} style={{ padding: 10, borderRadius: 10, border: "1px solid rgba(139,92,246,0.35)", background: "rgba(255,255,255,0.06)", color: "#fff" }} />

        <label style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>Photo URL</label>
        <input value={photoURL} onChange={(e)=>setPhotoURL(e.target.value)} style={{ padding: 10, borderRadius: 10, border: "1px solid rgba(139,92,246,0.35)", background: "rgba(255,255,255,0.06)", color: "#fff" }} />

        <button onClick={save} disabled={saving} style={{
          marginTop: 8, padding: "10px 14px", borderRadius: 10,
          background: "linear-gradient(90deg,#8b5cf6,#7c3aed)",
          border: "1px solid rgba(139,92,246,0.45)",
          color: "#fff", cursor: "pointer", fontWeight: 700
        }}>{saving ? "Saving…" : "Save Changes"}</button>
      </div>
    </HoloCard>
  );
}
