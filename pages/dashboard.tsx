import Head from "next/head";
import Starfield from "@/components/Starfield";
import Header from "@/components/Header";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // ✅ wait until Firebase finishes initializing
    if (!user) {
      router.replace("/"); // redirect only once if not logged in
    }
  }, [loading, user, router]);

  // ✅ graceful loading state
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          color: "white",
          background: "#0b0b0f",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Starfield />
        <p style={{ fontSize: 20, opacity: 0.85 }}>
          🌌 Loading your DaemonCore Dashboard...
        </p>
      </div>
    );
  }

  if (!user) return null; // if still null after loading, redirect triggers above

  return (
    <>
      <Head>
        <title>Dashboard • DaemonCore Portal</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Starfield />
      <Header />
      <main className="container" style={{ paddingTop: 40 }}>
        <div className="card">
          <h1>Hey {user.displayName || "there"} 👋</h1>
          <p>Here are your DaemonCore products. Download anytime.</p>

          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns:
                "repeat(auto-fit, minmax(260px, 1fr))",
              marginTop: 16,
            }}
          >
            <div className="card">
              <h3>Angular • Ultimate</h3>
              <small className="muted">
                Purchased: Lifetime • Status: Active
              </small>
              <br />
              <a
                className="btn"
                href="https://daemoncore.lemonsqueezy.com"
                target="_blank"
                rel="noreferrer"
              >
                Download
              </a>
            </div>

            <div className="card">
              <h3>Django • Pro</h3>
              <small className="muted">
                Purchased: Lifetime • Status: Active
              </small>
              <br />
              <a
                className="btn"
                href="https://daemoncore.lemonsqueezy.com"
                target="_blank"
                rel="noreferrer"
              >
                Download
              </a>
            </div>

            <div className="card">
              <h3>Next.js • Starter</h3>
              <small className="muted">
                Purchased: Lifetime • Status: Active
              </small>
              <br />
              <a
                className="btn"
                href="https://daemoncore.lemonsqueezy.com"
                target="_blank"
                rel="noreferrer"
              >
                Download
              </a>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 18 }}>
          <h3>Invoices & Billing</h3>
          <p>
            Access your invoices and subscriptions via LemonSqueezy
            Customer Portal.
          </p>
          <a className="btn ghost" href="/ls-portal">
            Open Billing Portal
          </a>
        </div>
      </main>
    </>
  );
}
