import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { app } from "@/lib/firebase";

export default function SignIn() {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/dashboard");
    });
    return () => unsub();
  }, [router]);

  const signIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <main style={{
      minHeight:"100vh", display:"grid", placeItems:"center",
      background:"radial-gradient(circle at 20% 20%, rgba(139,92,246,.25), transparent 60%), radial-gradient(circle at 80% 80%, rgba(124,58,237,.3), transparent 70%), #0b0b0f",
      color:"#fff", fontFamily:"Inter, sans-serif", padding:"2rem"
    }}>
      <div style={{
        maxWidth:480, width:"100%",
        background:"rgba(255,255,255,0.06)",
        border:"1px solid rgba(139,92,246,0.35)",
        borderRadius:16, padding:"2rem",
        boxShadow:"0 0 40px rgba(139,92,246,0.25)"
      }}>
        <h1 style={{
          fontSize:"2rem", fontWeight:800, margin:0,
          background:"linear-gradient(90deg,#8b5cf6,#7c3aed)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"
        }}>DaemonCore Portal</h1>
        <p style={{opacity:.8, marginTop:8}}>Sign in with Google to access your products.</p>

        <button onClick={signIn} style={{
          marginTop:16, width:"100%",
          background:"linear-gradient(90deg,#8b5cf6,#7c3aed)",
          color:"#fff", border:"none",
          padding:"12px 16px", borderRadius:10,
          fontWeight:700, fontSize:16, cursor:"pointer"
        }}>Continue with Google</button>

        <p style={{opacity:.6, fontSize:12, marginTop:12}}>
          By continuing you agree to the Terms & Privacy.
        </p>
      </div>
    </main>
  );
}
