import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return createPageMetadata("tours", locale);
}

export default function ToursLayout({ children }) {
  return children;
}
