import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase";
import Link from "next/link";

export default function Sidebar() {
  const handleSignOut = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <aside className="w-64 bg-black/30 border-r border-purple-800/40 p-6 flex flex-col justify-between backdrop-blur-sm relative z-20">
      <div>
        <div className="flex items-center mb-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-600 flex items-center justify-center font-bold text-xl">
            D
          </div>
          <h1 className="ml-3 text-lg font-bold text-white">DaemonCore</h1>
        </div>

        <nav className="space-y-3 text-sm">
          <Link href="/dashboard" className="block hover:text-purple-400 transition">
            🛒 My Products
          </Link>
          <Link href="#" className="block hover:text-purple-400 transition">
            🎫 Support Tickets
          </Link>
          <Link href="#" className="block hover:text-purple-400 transition">
            💎 Affiliate
          </Link>
          <Link href="#" className="block hover:text-purple-400 transition">
            📦 Downloads
          </Link>
          <Link href="#" className="block hover:text-purple-400 transition">
            ⚙️ Account Settings
          </Link>
        </nav>
      </div>

      <button
        onClick={handleSignOut}
        className="mt-10 py-2 px-3 text-sm rounded-lg bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/40 transition"
      >
        Sign Out
      </button>
    </aside>
  );
}
