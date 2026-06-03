"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useSettings } from "@/hooks/useSettings";
import { trackContact } from "@/lib/analytics";
import IslamicPattern from "@/components/ui/IslamicPattern";

const CrescentStar = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Crescent moon */}
    <path
      d="M30 8 C18 8 10 18 10 30 C10 42 18 52 30 52 C22 52 16 44 16 30 C16 16 22 8 30 8Z"
      fill="#C9A84C"
      opacity="0.85"
    />
    {/* Star (5-point) */}
    <polygon
      points="40,12 41.8,17.5 47.5,17.5 43,21 44.8,26.5 40,23 35.2,26.5 37,21 32.5,17.5 38.2,17.5"
      fill="#C9A84C"
      opacity="0.9"
    />
  </svg>
);

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
    <section className="masthead -type-1 z-5" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background image */}
      <div className="masthead__bg">
        <img alt="Uzbekistan landscape" src={heroBg} className="js-lazy" />
        <div className="uzn-hero-overlay" style={{ position: "absolute", inset: 0, zIndex: 1 }} />
      </div>

      {/* Islamic Pattern — top right, large */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <IslamicPattern size={280} color="#C9A84C" opacity={0.14} animated />
      </div>

      {/* Islamic Pattern — bottom left, smaller */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "-30px",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <IslamicPattern size={180} color="#C9A84C" opacity={0.09} animated />
      </div>

      {/* Floating crescent top-left */}
      <div
        className="uzn-crescent"
        style={{ top: "18%", left: "6%", zIndex: 2 }}
      >
        <CrescentStar />
      </div>

      {/* Floating crescent bottom-right (delayed) */}
      <div
        className="uzn-crescent uzn-crescent--delay"
        style={{ bottom: "22%", right: "7%", zIndex: 2, opacity: 0.55 }}
      >
        <CrescentStar />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 3 }}>
        <div className="row justify-center">
          <div className="col-xl-9 col-lg-10 col-md-11">
            <div className="text-center">
              {/* Bismillah label */}
              <span
                className="uzn-bismillah"
                data-aos="fade-down"
              >
                ✦ {t("label")} ✦
              </span>

              <h1
                className="text-60 lg:text-40 md:text-30 text-white mt-10"
                data-aos="fade-up"
                data-aos-delay="100"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
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
                  className="uzn-btn-primary px-40 py-20 h-60"
                >
                  {t("exploreBtn")}
                </Link>
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uzn-btn-outline-gold px-40 py-20 h-60"
                  onClick={handleWhatsApp}
                >
                  {t("whatsappBtn")}
                </Link>
              </div>

              <div className="row y-gap-20 justify-center text-center mt-50">
                {stats.map((item, index) => (
                  <div
                    key={`${item.num}-${index}`}
                    className="col-lg-4 col-sm-6"
                    data-aos="fade-up"
                    data-aos-delay={300 + index * 80}
                  >
                    <div className="uzn-stat-card">
                      <div className="uzn-stat-num">{item.num}</div>
                      <div className="text-15 text-white mt-8">
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
