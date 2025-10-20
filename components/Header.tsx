import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth";

export default function Header() {
  const { user, signOutNow } = useAuth();

  return (
    <div className="nav">
      <div className="nav-inner container">
        <div className="brand">
          <Image src="/logo.svg" alt="DaemonCore" width={120} height={32} priority />
          <span style={{opacity:.8}}>Portal</span>
        </div>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <Link href="https://www.daemoncore.app" target="_blank">Main Site</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/account">Account</Link>
          {user ? (
            <button className="btn ghost" onClick={signOutNow}>Sign out</button>
          ) : (
            <Link className="btn ghost" href="/">Sign in</Link>
          )}
        </div>
      </div>
    </div>
  )
}
