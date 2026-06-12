import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { tours } from "@/data/travelEasy";

export async function seedTours() {
  for (const tour of tours) {
    const multilingual = {
      ...tour,
      published: tour.published ?? true,
      title: { en: tour.title, uz: tour.title, ru: tour.title },
      description: {
        en: tour.description,
        uz: tour.description,
        ru: tour.description,
      },
      includes: {
        en: tour.includes || [],
        uz: tour.includes || [],
        ru: tour.includes || [],
      },
      itinerary: (tour.itinerary || []).map((day) => ({
        title: { en: day.title, uz: day.title, ru: day.title },
        description: {
          en: day.description,
          uz: day.description,
          ru: day.description,
        },
      })),
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "tours", tour.id), multilingual);
  }

  console.log("Tours seeded!");
}
