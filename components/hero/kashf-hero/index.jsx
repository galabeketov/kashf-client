"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useSettings } from "@/hooks/useSettings";
import { trackContact } from "@/lib/analytics";

const KashfHero = () => {
  const t = useTranslations("hero");
  const locale = useLocale();
  const { settings } = useSettings();
  const fallbackStats = t.raw("stats");
  const stats = settings?.stats || fallbackStats;
  const heroBg = settings?.hero?.backgroundImage || "/img/masthead/1/bg.webp";
  const whatsappUrl =
    settings?.contact?.whatsapp || "https://wa.me/998901234567";

  const handleWhatsApp = async (event) => {
    event.preventDefault();
    try {
      await trackContact({
        method: "whatsapp",
        source: "cta",
        tourId: null,
        tourTitle: null,
        locale,
      });
    } catch {}
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="masthead -type-1 z-5">
      <div className="masthead__bg">
        <img alt="image" src={heroBg} className="js-lazy" />
        <div
          className="uzbek-hero-overlay"
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <span
          className="ornament-float"
          style={{ top: "15%", right: "8%", animationDelay: "0s" }}
        >
          ❋
        </span>
        <div className="row justify-center">
          <div className="col-xl-9 col-lg-10 col-md-11">
            <div className="text-center">
              <div
                className="text-14 fw-500 text-uppercase text-white"
                data-aos="fade-up"
              >
                {t("label")}
              </div>

              <h1
                className="text-60 lg:text-40 md:text-30 text-white mt-20"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {t("title")}
              </h1>

              <p
                className="text-white mt-6 md:mt-10"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                {t("subtitle")}
              </p>

              <div
                className="d-flex x-gap-20 y-gap-15 justify-center pt-40 sm:flex-column sm:items-center"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <Link
                  href={`/${locale}/services`}
                  className="button px-40 py-20 h-60 btn-uzbek-primary"
                >
                  {t("exploreBtn")}
                </Link>
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button px-40 py-20 h-60 btn-uzbek-outline"
                  onClick={handleWhatsApp}
                >
                  {t("whatsappBtn")}
                </Link>
              </div>

              <div className="row y-gap-20 justify-center text-center mt-40">
                {stats.map((item, index) => (
                  <div
                    key={`${item.num}-${index}`}
                    className="col-lg-4 col-sm-6"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div className="uzbek-stat-card">
                      <div className="stat-number">{item.num}</div>
                      <div className="text-15 text-white mt-5">
                        {item.label?.[locale] || item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KashfHero;
