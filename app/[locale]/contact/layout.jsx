import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return createPageMetadata("contact", locale);
}

export default function ContactLayout({ children }) {
  return children;
}
