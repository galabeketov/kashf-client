import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return createPageMetadata("blog", locale);
}

export default function BlogLayout({ children }) {
  return children;
}
