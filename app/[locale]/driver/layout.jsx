import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return createPageMetadata("driver", locale);
}

export default function DriverLayout({ children }) {
  return children;
}
