import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ClientProviders from "@/components/common/ClientProviders";
import ScrollTop from "@/components/common/ScrollTop";
import "@/styles/index.scss";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const titles = {
    en: "Kashf Uzbekistan — Private Silk Road Tours",
    uz: "Kashf O'zbekiston — Xususiy Ipak Yo'li Turlari",
    ru: "Kashf Узбекистан — Частные туры по Шёлковому пути",
  };

  const descriptions = {
    en: "Discover Uzbekistan's Silk Road with a professional private guide",
    uz: "O'zbekistonning Ipak Yo'li bo'ylab professional gid bilan xususiy turlar",
    ru: "Откройте Шёлковый путь Узбекистана с профессиональным частным гидом",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClientProviders>
        {children}
        <ScrollTop />
      </ClientProviders>
    </NextIntlClientProvider>
  );
}
