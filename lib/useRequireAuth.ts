// lib/useRequireAuth.ts
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";
import { app } from "@/lib/firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signIn = async () => {
    await signInWithPopup(auth, provider);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  return { user, loading, signIn, logOut };
}

// force-auth hook for protected pages
export default function useRequireAuth() {
  const { user, loading, signIn } = useAuth();

  useEffect(() => {
    if (!loading && !user) signIn();
  }, [loading, user]);

  return user;
}
