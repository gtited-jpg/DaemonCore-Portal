import AppLayout from "@/components/AppLayout";
import useRequireAuth from "@/lib/useRequireAuth";
import AccountPanel from "@/components/AccountPanel";

export default function Account() {
  const user = useRequireAuth();
  if (!user) return null;

  return (
    <AppLayout>
      <section>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: 12,
          background: "linear-gradient(90deg,#c4b5fd,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>Account</h1>
        <AccountPanel user={user} />
      </section>
    </AppLayout>
  );
}
