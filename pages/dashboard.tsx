import AppLayout from "@/components/AppLayout";
import useRequireAuth from "@/lib/useRequireAuth";
import Starfield from "@/components/Starfield";

export default function Dashboard() {
  const user = useRequireAuth();

  if (!user) return null;

  return (
    <AppLayout>
      <Starfield />
      <section className="relative z-10 p-8 text-white">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-violet-600 bg-clip-text text-transparent">
          Welcome, {user.displayName?.split(" ")[0]} 🌌
        </h1>
        <p className="opacity-70 mb-8">
          Here are your active DaemonCore products and tools.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "DaemonKit Angular", desc: "Full SaaS boilerplate — Angular + Firebase + Stripe", status: "Active" },
            { title: "DaemonKit Next.js", desc: "Ultimate SaaS foundation — Next.js 14 + Auth + DB + Payments", status: "Active" },
            { title: "DaemonCore Affiliate", desc: "Earn up to 40% promoting DaemonCore", status: "Active" },
          ].map((card, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-purple-600/40 shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
              <h2 className="text-xl font-bold text-purple-300">{card.title}</h2>
              <p className="text-sm opacity-80 mt-2">{card.desc}</p>
              <span className="inline-block mt-4 text-xs px-3 py-1 rounded-full bg-purple-600/30 border border-purple-500/40">
                {card.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
