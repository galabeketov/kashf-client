import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return createPageMetadata("currency", locale);
}

export default function CurrencyLayout({ children }) {
  return children;
}
