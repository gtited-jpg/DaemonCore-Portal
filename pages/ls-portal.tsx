import Head from "next/head";
import Starfield from "@/components/Starfield";
import Header from "@/components/Header";

export default function LS() {
  return (
    <>
      <Head>
        <title>Billing Portal • DaemonCore</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Starfield />
      <Header />
      <main className="container" style={{paddingTop: 40}}>
        <div className="card">
          <h2>LemonSqueezy Customer Portal</h2>
          <p>This will open the hosted LemonSqueezy portal where customers can see orders, subscriptions, and invoices.</p>
          <p style={{opacity:.85}}>Replace the URL below with your store’s customer-portal link or generate single-use session links server-side.</p>
          <a className="btn" href="https://app.lemonsqueezy.com/my-orders" target="_blank" rel="noreferrer">Open My Orders</a>
        </div>
      </main>
    </>
  );
}
