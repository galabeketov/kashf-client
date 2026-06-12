import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return createPageMetadata("about", locale);
}

export default function AboutLayout({ children }) {
  return children;
}
