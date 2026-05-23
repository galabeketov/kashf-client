import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { defaultSettings } from "@/data/kashf";

export async function getSettings() {
  try {
    const snap = await getDoc(doc(db, "site", "settings"));
    if (snap.exists()) return snap.data();
    return defaultSettings;
  } catch {
    return defaultSettings;
  }
}
