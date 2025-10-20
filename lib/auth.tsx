'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { app } from "./firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  User
} from "firebase/auth";

const AuthContext = createContext<{ user: User | null, loading: boolean, signIn: (p:'google'|'github')=>Promise<void>, signOutNow: ()=>Promise<void> }>({
  user: null, loading: true, signIn: async()=>{}, signOutNow: async()=>{}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u)=>{
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, [auth]);

  async function signIn(providerKey: 'google'|'github') {
    const provider = providerKey === 'github' ? new GithubAuthProvider() : new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async function signOutNow() {
    await signOut(auth);
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signOutNow }}>{children}</AuthContext.Provider>
}

export function useAuth() { return useContext(AuthContext); }
