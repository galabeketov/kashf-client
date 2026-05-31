import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export async function submitReview({
  type,
  tourId,
  tourTitle,
  name,
  country,
  rating,
  text,
  locale,
}) {
  return addDoc(collection(db, "reviews"), {
    type,
    tourId: tourId || null,
    tourTitle: tourTitle || null,
    name,
    country,
    rating,
    text,
    locale,
    status: "pending",
    createdAt: serverTimestamp(),
  });
}

export async function getApprovedReviews(type, tourId = null) {
  let q;

  if (type === "tour" && tourId) {
    q = query(
      collection(db, "reviews"),
      where("status", "==", "approved"),
      where("type", "==", "tour"),
      where("tourId", "==", tourId),
    );
  } else {
    q = query(
      collection(db, "reviews"),
      where("status", "==", "approved"),
      where("type", "==", "site"),
    );
  }

  const snap = await getDocs(q);
  const reviews = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  return reviews.sort(
    (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
  );
}
