import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import GoogleAnalytics from "@/components/shared/GoogleAnalytics";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const titles = {
    en: "Travel Easy Uzbekistan — Tours, Transfers & More",
    uz: "Travel Easy O'zbekiston — Turlar, Transferlar va Ko'proq",
    ru: "Travel Easy Узбекистан — Туры, Трансферы и Многое Другое",
  };

  const descriptions = {
    en: "Your all-in-one travel partner in Uzbekistan. Private tours, airport transfer, rent a car, business support and more.",
    uz: "O'zbekistondagi universal sayohat hamkoringiz. Xususiy turlar, aeroport transferi, avtomobil ijarasi va boshqalar.",
    ru: "Ваш универсальный партнёр по путешествиям в Узбекистане. Частные туры, трансфер, аренда авто и многое другое.",
  };

  const keywords = {
    en: "Uzbekistan tours, private tour guide Uzbekistan, Samarkand tour, Bukhara tour, Silk Road travel, Tashkent guide, airport transfer Tashkent",
    uz: "O'zbekiston turlari, xususiy gid, Samarqand turi, Buxoro turi, Ipak yo'li, Toshkent gidi",
    ru: "Туры по Узбекистану, частный гид Узбекистан, тур Самарканд, тур Бухара, Шёлковый путь",
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    metadataBase: new URL("https://travel-easy.uz"),
    title,
    description,
    manifest: "/manifest.json",
    themeColor: "#1B6CA8",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "Travel Easy",
    },
    icons: {
      icon: "/img/icons/icon-192.png",
      apple: "/img/icons/icon-192.png",
    },
    keywords: keywords[locale] || keywords.en,
    openGraph: {
      type: "website",
      locale: locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : "en_US",
      url: `https://travel-easy.uz/${locale}`,
      siteName: "Travel Easy Uzbekistan",
      title,
      description,
      images: [
        {
          url: "/img/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Travel Easy Uzbekistan",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://travel-easy.uz/${locale}`,
      languages: {
        en: "https://travel-easy.uz/en",
        uz: "https://travel-easy.uz/uz",
        ru: "https://travel-easy.uz/ru",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      {children}
    </NextIntlClientProvider>
  );
}
