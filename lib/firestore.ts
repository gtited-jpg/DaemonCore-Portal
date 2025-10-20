import { getFirestore, collection, addDoc, serverTimestamp, query, where, orderBy, getDocs, updateDoc, doc, setDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";

const db = getFirestore(app);

export type Ticket = {
  id?: string;
  email: string;
  subject: string;
  message: string;
  status: "open" | "closed";
  createdAt?: any;
};

export async function createTicket(email: string, subject: string, message: string) {
  const ref = await addDoc(collection(db, "tickets"), {
    email,
    subject,
    message,
    status: "open",
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function listTickets(email: string) {
  const q = query(
    collection(db, "tickets"),
    where("email", "==", email),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Ticket[];
}

export async function closeTicket(ticketId: string) {
  const ref = doc(db, "tickets", ticketId);
  await updateDoc(ref, { status: "closed" });
}

export async function upsertAccount(uid: string, data: { displayName?: string; email?: string; photoURL?: string }) {
  const ref = doc(db, "account", uid);
  await setDoc(ref, data, { merge: true });
}
