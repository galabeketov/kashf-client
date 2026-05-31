import { getTourById } from "@/lib/tours";

const localized = (value, locale) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value?.[locale] || value?.en || "";
};

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const tour = await getTourById(slug);

  if (!tour) {
    return { title: "Tour Not Found" };
  }

  const title = localized(tour.title, locale);
  const description = localized(tour.description, locale);

  return {
    title: `${title} | Travel Easy Uzbekistan`,
    description: description?.slice(0, 160),
    keywords: `${title}, Uzbekistan tour, private tour, Silk Road, ${locale === "ru" ? "тур Узбекистан" : "Uzbekistan travel"}`,
    openGraph: {
      title: `${title} | Travel Easy Uzbekistan`,
      description: description?.slice(0, 160),
      images: tour.images?.[0] ? [{ url: tour.images[0] }] : [],
    },
  };
}

export default function TourDetailLayout({ children }) {
  return children;
}
