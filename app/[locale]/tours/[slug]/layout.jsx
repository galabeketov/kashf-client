import { getTourById } from "@/lib/tours";
import { localizedUrl, SITE_CONFIG } from "@/lib/site-config";
import { tours as staticTours } from "@/data/travelEasy";

const localized = (value, locale) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value?.[locale] || value?.en || "";
};

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const remoteTour = await getTourById(slug).catch(() => null);
  const tour =
    remoteTour || staticTours.find((item) => item.id === slug) || null;

  if (!tour) {
    return {
      title: "Tour Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = localized(tour.title, locale);
  const description = localized(tour.description, locale);
  const path = `/tours/${slug}`;
  const canonical = localizedUrl(locale, path);

  return {
    title: `${title} | ${SITE_CONFIG.name}`,
    description: description?.slice(0, 160),
    keywords: `${title}, Uzbekistan tour, private tour, Silk Road, ${locale === "ru" ? "тур Узбекистан" : "Uzbekistan travel"}`,
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        en: localizedUrl("en", path),
        uz: localizedUrl("uz", path),
        ru: localizedUrl("ru", path),
        "x-default": localizedUrl("en", path),
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_CONFIG.name,
      title: `${title} | ${SITE_CONFIG.name}`,
      description: description?.slice(0, 160),
      images: tour.images?.[0] ? [{ url: tour.images[0] }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_CONFIG.name}`,
      description: description?.slice(0, 160),
      images: tour.images?.[0] ? [tour.images[0]] : [],
    },
  };
}

export default function TourDetailLayout({ children }) {
  return children;
}
