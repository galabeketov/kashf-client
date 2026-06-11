import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

export async function getPublishedPosts(maxResults = 24) {
  const q = query(
    collection(db, "posts"),
    where("published", "==", true),
    limit(maxResults),
  );
  const snap = await getDocs(q);
  const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return posts.sort(
    (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
  );
}

export async function getPostById(id) {
  const snap = await getDoc(doc(db, "posts", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function getFeaturedPosts() {
  const q = query(
    collection(db, "posts"),
    where("published", "==", true),
    where("featured", "==", true),
  );
  const snap = await getDocs(q);
  const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return posts.sort(
    (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
  );
}
