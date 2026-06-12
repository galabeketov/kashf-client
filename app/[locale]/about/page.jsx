"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import TravelHeader from "@/components/header/travel-header";
import TravelFooter from "@/components/footer/travel-footer";
import PageHero from "@/components/ui/PageHero";
import { defaultSettings } from "@/data/travelEasy";
import { useSettings } from "@/hooks/useSettings";
import { SITE_CONFIG, localizedUrl } from "@/lib/site-config";

const GUIDE_SEO_COPY = {
  en: {
    title: "Private local guide for tours across Uzbekistan",
    intro:
      "Looking for an English-speaking private guide in Uzbekistan? Samandar Ikromov organizes personal tours in Tashkent, Samarkand, Bukhara, Khiva, Shakhrisabz and the mountain regions.",
    details:
      "Tours can include a licensed local guide, private transport, airport pickup, hotel support and a flexible itinerary for individuals, families, business guests and small private groups.",
    languages: "Guide languages: English, Russian and Uzbek.",
  },
  uz: {
    title: "O'zbekiston bo'ylab xususiy mahalliy gid",
    intro:
      "O'zbekistonda tajribali xususiy gid qidiryapsizmi? Samandar Ikromov Toshkent, Samarqand, Buxoro, Xiva, Shahrisabz va tog'li hududlarda shaxsiy turlar tashkil qiladi.",
    details:
      "Turlarga mahalliy gid, xususiy transport, aeroportdan kutib olish, mehmonxona bo'yicha yordam va oila, biznes mehmonlari hamda kichik guruhlar uchun moslashuvchan marshrut kirishi mumkin.",
    languages: "Gid tillari: o'zbek, rus va ingliz tillari.",
  },
  ru: {
    title: "Частный местный гид по Узбекистану",
    intro:
      "Ищете русскоязычного частного гида по Узбекистану? Самандар Икромов организует индивидуальные экскурсии по Ташкенту, Самарканду, Бухаре, Хиве, Шахрисабзу и горным районам.",
    details:
      "Можно заказать местного гида, личный транспорт, встречу в аэропорту, помощь с отелем и гибкий маршрут для индивидуальных туристов, семей, деловых гостей и небольших частных групп.",
    languages: "Языки гида: русский, английский и узбекский.",
  },
};

export default function AboutPage() {
  const locale = useLocale();
  const t = useTranslations("about");
  const navT = useTranslations("nav");
  const { settings } = useSettings();

  const guide = settings?.guide || defaultSettings.guide;
  const features = settings?.features || defaultSettings.features;
  const contact = settings?.contact || defaultSettings.contact;

  const localized = (value) => value?.[locale] || value?.en || value || "";

  const stats = guide.stats || defaultSettings.guide.stats;
  const guideName = localized(guide.name);
  const seoCopy = GUIDE_SEO_COPY[locale] || GUIDE_SEO_COPY.en;
  const guideJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_CONFIG.clientUrl}/#guide`,
    name: guideName,
    jobTitle: localized(guide.title),
    description: `${localized(guide.bio1)} ${localized(guide.bio2)}`,
    image: `${SITE_CONFIG.clientUrl}${guide.photo}`,
    url: localizedUrl(locale, "/about"),
    worksFor: {
      "@type": "TravelAgency",
      "@id": `${SITE_CONFIG.clientUrl}/#organization`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.clientUrl,
    },
    knowsLanguage: ["English", "Russian", "Uzbek"],
    sameAs: [
      contact.instagram,
      contact.telegram,
      contact.facebook,
    ].filter(Boolean),
  };

  return (
    <>
      <TravelHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd) }}
      />

      <PageHero title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      <section className="py-10 bg-light-2">
        <div className="container">
          <div className="row x-gap-10 y-gap-10 items-center text-14 text-light-1">
            <div className="col-auto">
              <Link href={`/${locale}`} className="text-dark-1">
                {navT("home")}
              </Link>
            </div>
            <div className="col-auto">&gt;</div>
            <div className="col-auto">
              <span className="text-dark-1">{navT("about")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30 items-center">
            <div className="col-lg-5" data-aos="fade-up">
              <div
                className="rounded-8 overflow-hidden"
                style={{ height: "560px" }}
              >
                <Image
                  src={guide.photo}
                  alt={`${guideName} — ${localized(guide.title)}`}
                  width={560}
                  height={560}
                  className="col-12 h-full object-cover"
                />
              </div>
            </div>

            <div
              className="col-lg-6 offset-lg-1"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="text-14 fw-500 text-uppercase text-blue-1">
                {t("sectionLabel")}
              </div>
              <h2 className="text-40 lg:text-30 mt-10">
                {guideName}
              </h2>
              <div className="text-16 text-blue-1 fw-500 mt-8">
                {localized(guide.title)}
              </div>

              <p className="text-15 mt-20">{localized(guide.bio1)}</p>
              <p className="text-15 mt-15">{localized(guide.bio2)}</p>

              <div className="row y-gap-15 x-gap-15 mt-30">
                {stats.map((item, index) => (
                  <div className="col-sm-6" key={`${item.num}-${index}`}>
                    <div className="border-light rounded-8 px-20 py-20 text-center">
                      <div className="text-28 fw-700 text-blue-1">
                        {item.num}
                      </div>
                      <div className="text-14 text-light-1 mt-5">
                        {localized(item.label)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex x-gap-15 y-gap-15 flex-wrap mt-30">
                <Link
                  href={contact.whatsapp || "https://wa.me/998990621736"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button -md -blue-1 bg-blue-1 text-white"
                >
                  {t("whatsapp")}
                </Link>
                <Link
                  href={`/${locale}/tours`}
                  className="button -md border-blue-1 -outline-blue-1 text-blue-1"
                >
                  {t("viewTours")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-md bg-light-2">
        <div className="container">
          <div className="row justify-center">
            <div className="col-lg-9">
              <h2 className="text-30 fw-600">{seoCopy.title}</h2>
              <p className="text-16 lh-17 mt-20">{seoCopy.intro}</p>
              <p className="text-16 lh-17 mt-15">{seoCopy.details}</p>
              <p className="text-16 fw-500 mt-15">{seoCopy.languages}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg bg-light-2">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">{t("whyTitle")}</h2>
                <p className="sectionTitle__text mt-5 sm:mt-0">
                  {t("whySubtitle")}
                </p>
              </div>
            </div>
          </div>

          <div className="row y-gap-20 justify-between pt-40">
            {features.map((item) => (
              <div
                className="col-lg-4 col-sm-6"
                data-aos="fade"
                data-aos-delay={item.delayAnim}
                key={item.id}
              >
                <div className="featureIcon -type-1">
                  <div className="d-flex justify-center">
                    <img
                      src={item.icon}
                      alt={localized(item.title)}
                      className="js-lazy"
                    />
                  </div>
                  <div className="text-center mt-30">
                    <h4 className="text-18 fw-500">{localized(item.title)}</h4>
                    <p className="text-15 mt-10">{localized(item.text)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TravelFooter />
    </>
  );
}
