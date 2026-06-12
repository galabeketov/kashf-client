import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return createPageMetadata("rent-car", locale);
}

export default function RentCarLayout({ children }) {
  return children;
}
