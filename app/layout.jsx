import ScrollTop from "@/components/common/ScrollTop";
import ClientProviders from "@/components/common/ClientProviders";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import "aos/dist/aos.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import { SITE_CONFIG } from "@/lib/site-config";
import { headers } from "next/headers";

export const metadata = {
  metadataBase: new URL(SITE_CONFIG.clientUrl),
  title: `${SITE_CONFIG.name} | Tours and Travel Services`,
  description:
    "Private tours, car rental, transfers, drivers, business support and travel services across Uzbekistan.",
  applicationName: SITE_CONFIG.name,
  category: "travel",
};

export default async function RootLayout({ children }) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-next-intl-locale");
  const locale = ["en", "uz", "ru"].includes(requestedLocale)
    ? requestedLocale
    : "en";

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@400;500;600;700&family=Jost:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientProviders>
          <main>
            {children}
            <ScrollTop />
          </main>
        </ClientProviders>
      </body>
    </html>
  );
}
