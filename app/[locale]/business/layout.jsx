import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return createPageMetadata("business", locale);
}

export default function BusinessLayout({ children }) {
  return children;
}
