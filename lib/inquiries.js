import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function submitInquiry({
  name,
  phone,
  email,
  date,
  groupSize,
  message,
  tourId,
  tourTitle,
  locale,
}) {
  return addDoc(collection(db, "inquiries"), {
    name,
    phone,
    email,
    date: date || "",
    groupSize: groupSize || "",
    message: message || "",
    tourId: tourId || "",
    tourTitle: tourTitle || "General Inquiry",
    locale: locale || "en",
    status: "new",
    createdAt: serverTimestamp(),
  });
}
