import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { validateInquiry } from "./validation";

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
  const validation = validateInquiry({
    name,
    phone,
    email,
    date,
    groupSize,
    message,
  });

  if (!validation.valid) {
    return { success: false, errorCode: "validation", errors: validation.errors };
  }

  try {
    const reference = await addDoc(collection(db, "inquiries"), {
    ...validation.data,
    tourId: tourId || "",
    tourTitle: tourTitle || "General Inquiry",
    locale: locale || "en",
    status: "new",
    createdAt: serverTimestamp(),
    });
    return { success: true, id: reference.id, errorCode: null };
  } catch {
    return { success: false, id: null, errorCode: "write-failed" };
  }
}
