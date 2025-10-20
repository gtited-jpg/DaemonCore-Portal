import Head from "next/head";
import Starfield from "@/components/Starfield";
import Header from "@/components/Header";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Account() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(()=>{
    if (!loading && !user) router.replace("/");
  }, [loading, user, router]);

  if (loading || !user) return null;

  return (
    <>
      <Head>
        <title>Account • DaemonCore Portal</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Starfield />
      <Header />
      <main className="container" style={{paddingTop: 40}}>
        <div className="card">
          <h2>Account</h2>
          <p><strong>Name:</strong> {user.displayName || "Your Name"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>UID:</strong> {user.uid}</p>
          <p style={{opacity:.85}}>Manage subscriptions, payment methods, and addresses in the LemonSqueezy portal.</p>
          <a className="btn" href="/ls-portal">Open Billing Portal</a>
        </div>
      </main>
    </>
  );
}
