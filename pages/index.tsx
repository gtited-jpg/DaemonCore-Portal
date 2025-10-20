import Head from "next/head";
import Starfield from "@/components/Starfield";
import Header from "@/components/Header";
import { useAuth } from "@/lib/auth";

export default function Home() {
  const { user, loading, signIn } = useAuth();

  return (
    <>
      <Head>
        <title>DaemonCore Portal</title>
        <meta name="description" content="Sign in to access your DaemonCore purchases, downloads, and licenses." />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Starfield />
      <Header />
      <main className="container" style={{paddingTop: 40}}>
        <section className="grid">
          <div className="card">
            <h1>Welcome to your DaemonCore Portal</h1>
            <p>Access your purchases, licenses, invoices, and instant downloads.</p>
            {loading ? <p>Loading...</p> : (
              !user ? (
                <div style={{display:'flex', gap:12, marginTop:16}}>
                  <button className="btn" onClick={()=>signIn('google')}>Sign in with Google</button>
                  <button className="btn ghost" onClick={()=>signIn('github')}>GitHub</button>
                </div>
              ) : (
                <div style={{marginTop:16}}>
                  <a href="/dashboard" className="btn">Go to Dashboard</a>
                </div>
              )
            )}
            <small className="muted" style={{display:'block', marginTop:16}}>You own 100% of your purchased code and rights.</small>
          </div>
          <div className="card">
            <h3>What you’ll find inside</h3>
            <ul>
              <li>🔑 License keys &amp; activations</li>
              <li>📦 Instant downloads for all purchases</li>
              <li>🧾 Invoices and billing history</li>
              <li>📣 Early access to new boilerplates</li>
            </ul>
            <p style={{opacity:.85}}>Have issues? <a href="mailto:contact@daemoncore.app">contact@daemoncore.app</a></p>
          </div>
        </section>
      </main>
    </>
  );
}
