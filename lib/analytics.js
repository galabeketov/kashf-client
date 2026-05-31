import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export async function trackContact({
  method,
  source,
  tourId,
  tourTitle,
  locale,
}) {
  return addDoc(collection(db, "contactEvents"), {
    method,
    source,
    tourId: tourId || null,
    tourTitle: tourTitle || null,
    locale,
    createdAt: serverTimestamp(),
  });
}

export async function getContactStats() {
  const snap = await getDocs(collection(db, "contactEvents"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
