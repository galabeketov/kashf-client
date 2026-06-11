import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { validateReview } from "./validation";

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
  const validation = validateReview({ name, country, rating, text });
  if (!validation.valid) {
    return { success: false, errorCode: "validation", errors: validation.errors };
  }

  try {
    const reference = await addDoc(collection(db, "reviews"), {
    type,
    tourId: tourId || null,
    tourTitle: tourTitle || null,
    ...validation.data,
    locale,
    status: "pending",
    createdAt: serverTimestamp(),
    });
    return { success: true, id: reference.id, errorCode: null };
  } catch {
    return { success: false, id: null, errorCode: "write-failed" };
  }
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
