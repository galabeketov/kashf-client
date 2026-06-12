import { createPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return createPageMetadata("transfer", locale);
}

export default function TransferLayout({ children }) {
  return children;
}
