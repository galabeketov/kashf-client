"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import KashfHeader from "@/components/header/header-kashf";
import KashfFooter from "@/components/footer/kashf";
import {
  FaInstagram,
  LuBriefcase,
  LuCar,
  LuDollarSign,
  LuFileText,
  LuMapPin,
  LuMessageCircle,
  LuPlane,
  LuUser,
} from "@/components/shared/Icons";
import { trackContact } from "@/lib/analytics";

const servicesData = [
  {
    key: "tours",
    href: "/tours",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.1)",
    price: "From $99",
  },
  {
    key: "rentCar",
    href: "/rent-car",
    color: "#10B981",
    bg: "rgba(16,185,129,0.1)",
    price: "From $40/day",
  },
  {
    key: "transfer",
    href: "/transfer",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    price: "From $15",
  },
  {
    key: "business",
    href: "/business",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.1)",
    price: "From $50",
  },
  {
    key: "driver",
    href: "/driver",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.1)",
    price: "From $25",
  },
  {
    key: "currency",
    href: "/currency",
    color: "#06B6D4",
    bg: "rgba(6,182,212,0.1)",
    price: "Contact for rate",
  },
  {
    key: "blog",
    href: "/blog",
    color: "#F97316",
    bg: "rgba(249,115,22,0.1)",
    price: "Free",
  },
  {
    key: "telegram",
    href: "https://t.me/traveleasyuz",
    color: "#0EA5E9",
    bg: "rgba(14,165,233,0.1)",
    external: true,
    price: "Instant support",
  },
  {
    key: "instagram",
    href: "https://instagram.com/travel-easy",
    color: "#EC4899",
    bg: "rgba(236,72,153,0.1)",
    external: true,
    price: "Follow us",
  },
];

export default function ServicesPage() {
  const locale = useLocale();
  const t = useTranslations("services");
  const navT = useTranslations("nav");
  const whatsappUrl = "https://wa.me/998901234567";
  const serviceIcons = {
    tours: <LuMapPin size={24} />,
    rentCar: <LuCar size={24} />,
    transfer: <LuPlane size={24} />,
    business: <LuBriefcase size={24} />,
    driver: <LuUser size={24} />,
    currency: <LuDollarSign size={24} />,
    blog: <LuFileText size={24} />,
    telegram: <LuMessageCircle size={24} />,
    instagram: <FaInstagram size={24} />,
  };

  const handleWhatsApp = async (event) => {
    event.preventDefault();
    try {
      await trackContact({
        method: "whatsapp",
        source: "service_page",
        tourId: null,
        tourTitle: null,
        locale,
      });
    } catch {}
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <KashfHeader />

      <section
        style={{
          background: "linear-gradient(135deg, #051036 0%, #0d2268 100%)",
          paddingTop: "130px",
          paddingBottom: "60px",
        }}
      >
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-lg-8">
              <h1
                className="text-50 lg:text-40 md:text-30 text-white"
                data-aos="fade-up"
              >
                {t("pageTitle")}
              </h1>
              <p
                className="text-white mt-15"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {t("pageSubtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

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
              <span className="text-dark-1">{navT("services")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">{t("pageTitle")}</h2>
                <p className="sectionTitle__text mt-5 sm:mt-0">
                  {t("pageSubtitle")}
                </p>
              </div>
            </div>
          </div>

          <div className="row y-gap-30 pt-40">
            {servicesData.map((service, index) => {
              const href = service.external
                ? service.href
                : `/${locale}${service.href}`;

              return (
                <div
                  className="col-lg-4 col-sm-6 col-12"
                  key={service.key}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <Link
                    href={href}
                    target={service.external ? "_blank" : undefined}
                    rel={service.external ? "noopener noreferrer" : undefined}
                    className="kashf-service-card d-block rounded-8 border-light px-30 py-30 hover-shadow-2 h-100 position-relative"
                  >
                    <span className="uzbek-dome-ornament" aria-hidden="true" />
                    <div
                      className="d-flex items-center justify-center rounded-12 mb-20"
                      style={{
                        width: "60px",
                        height: "60px",
                        background: service.bg,
                        color: service.color,
                      }}
                    >
                      {serviceIcons[service.key]}
                    </div>

                    <h3 className="text-18 fw-500 text-dark-1 mb-8">
                      {t(service.key)}
                    </h3>
                    <p className="text-14 text-light-1 lh-16">
                      {t(`${service.key}Desc`)}
                    </p>
                    <div className="d-flex items-center justify-between mt-20">
                      <div
                        className="text-14 fw-500"
                        style={{ color: service.color }}
                      >
                        {service.price}
                      </div>
                      <span className="button -sm px-20 py-10 bg-blue-1 text-white">
                        {t("learnMore")}
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-md bg-dark-2">
        <div className="container">
          <div className="row y-gap-20 justify-between items-center">
            <div className="col-lg-8">
              <h3 className="text-28 text-white fw-600">
                {t("contactDirectly")}
              </h3>
            </div>
            <div className="col-auto">
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button -md h-60 bg-blue-1 text-white"
                onClick={handleWhatsApp}
              >
                {t("whatsappDirect")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <KashfFooter />
    </>
  );
}
