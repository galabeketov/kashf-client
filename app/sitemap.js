import { getPublishedTours } from "@/lib/tours";
import { getPublishedPosts } from "@/lib/posts";

export default async function sitemap() {
  const tours = await getPublishedTours();
  const posts = await getPublishedPosts();
  const locales = ["en", "uz", "ru"];
  const baseUrl = "https://travel-easy.uz";

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
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? "daily" : "weekly",
      priority: page === "" ? 1.0 : 0.8,
    })),
  );

  const tourUrls = locales.flatMap((locale) =>
    tours.map((tour) => ({
      url: `${baseUrl}/${locale}/tours/${tour.id}`,
      lastModified: tour.createdAt?.seconds
        ? new Date(tour.createdAt.seconds * 1000)
        : new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    })),
  );

  const postUrls = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.id}`,
      lastModified: post.createdAt?.seconds
        ? new Date(post.createdAt.seconds * 1000)
        : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  );

  return [...staticUrls, ...tourUrls, ...postUrls];
}
