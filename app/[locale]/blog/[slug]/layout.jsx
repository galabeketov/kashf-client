import { getPostById } from "@/lib/posts";
import { localizedUrl, SITE_CONFIG } from "@/lib/site-config";

const localized = (value, locale) =>
  typeof value === "string" ? value : value?.[locale] || value?.en || "";

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const post = await getPostById(slug).catch(() => null);
  if (!post) return { title: `Travel Blog | ${SITE_CONFIG.name}` };

  const title = localized(post.title, locale);
  const description = localized(post.excerpt || post.content, locale).slice(0, 160);
  const canonical = localizedUrl(locale, `/blog/${slug}`);

  return {
    title: `${title} | ${SITE_CONFIG.name}`,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        en: localizedUrl("en", `/blog/${slug}`),
        uz: localizedUrl("uz", `/blog/${slug}`),
        ru: localizedUrl("ru", `/blog/${slug}`),
        "x-default": localizedUrl("en", `/blog/${slug}`),
      },
    },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.image ? [post.image] : [],
    },
  };
}

export default function BlogDetailLayout({ children }) {
  return children;
}
