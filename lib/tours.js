import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export async function getPublishedTours() {
  const q = query(collection(db, "tours"), where("published", "==", true));
  const snap = await getDocs(q);
  const tours = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  return tours.sort(
    (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
  );
}

export async function getTourById(id) {
  const snap = await getDoc(doc(db, "tours", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function getFeaturedTours() {
  const q = query(
    collection(db, "tours"),
    where("published", "==", true),
    where("featured", "==", true),
  );

  const snap = await getDocs(q);
  const tours = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  return tours.sort(
    (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
  );
}
