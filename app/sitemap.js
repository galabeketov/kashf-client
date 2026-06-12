import { getPublishedTours } from "@/lib/tours";
import { getPublishedPosts } from "@/lib/posts";
import { localizedUrl } from "@/lib/site-config";

export default async function sitemap() {
  const [tours, posts] = await Promise.all([
    getPublishedTours().catch(() => []),
    getPublishedPosts().catch(() => []),
  ]);
  const locales = ["en", "uz", "ru"];
  const staticPages = [
    "",
    "/tours",
    "/services",
    "/blog",
    "/about",
    "/contact",
    "/rent-car",
    "/transfer",
    "/business",
    "/driver",
    "/currency",
  ];

  const staticUrls = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: localizedUrl(locale, page),
      changeFrequency: page === "" ? "daily" : "weekly",
      priority: page === "" ? 1.0 : 0.8,
      alternates: {
        languages: {
          en: localizedUrl("en", page),
          uz: localizedUrl("uz", page),
          ru: localizedUrl("ru", page),
        },
      },
    })),
  );

  const tourUrls = locales.flatMap((locale) =>
    tours.map((tour) => ({
      url: localizedUrl(locale, `/tours/${tour.id}`),
      lastModified: tour.createdAt?.seconds
        ? new Date(tour.createdAt.seconds * 1000)
        : new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: localizedUrl("en", `/tours/${tour.id}`),
          uz: localizedUrl("uz", `/tours/${tour.id}`),
          ru: localizedUrl("ru", `/tours/${tour.id}`),
        },
      },
    })),
  );

  const postUrls = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: localizedUrl(locale, `/blog/${post.id}`),
      lastModified: post.createdAt?.seconds
        ? new Date(post.createdAt.seconds * 1000)
        : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: localizedUrl("en", `/blog/${post.id}`),
          uz: localizedUrl("uz", `/blog/${post.id}`),
          ru: localizedUrl("ru", `/blog/${post.id}`),
        },
      },
    })),
  );

  return [...staticUrls, ...tourUrls, ...postUrls];
}
