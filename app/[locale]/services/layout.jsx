import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return createPageMetadata("services", locale);
}

export default function ServicesLayout({ children }) {
  return children;
}
