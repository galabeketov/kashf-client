"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
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

const ServicesSection = () => {
  const t = useTranslations("services");
  const locale = useLocale();
  const serviceIcons = {
    tours: <LuMapPin size={28} />,
    rentCar: <LuCar size={28} />,
    transfer: <LuPlane size={28} />,
    business: <LuBriefcase size={28} />,
    driver: <LuUser size={28} />,
    currency: <LuDollarSign size={28} />,
    blog: <LuFileText size={28} />,
    telegram: <LuMessageCircle size={28} />,
    instagram: <FaInstagram size={28} />,
  };

  const services = [
    {
      key: "tours",
      href: "/tours",
      color: "#3B82F6",
      bg: "rgba(59,130,246,0.1)",
    },
    {
      key: "rentCar",
      href: "/rent-car",
      color: "#10B981",
      bg: "rgba(16,185,129,0.1)",
    },
    {
      key: "transfer",
      href: "/transfer",
      color: "#F59E0B",
      bg: "rgba(245,158,11,0.1)",
    },
    {
      key: "business",
      href: "/business",
      color: "#8B5CF6",
      bg: "rgba(139,92,246,0.1)",
    },
    {
      key: "driver",
      href: "/driver",
      color: "#EF4444",
      bg: "rgba(239,68,68,0.1)",
    },
    {
      key: "currency",
      href: "/currency",
      color: "#06B6D4",
      bg: "rgba(6,182,212,0.1)",
    },
    {
      key: "blog",
      href: "/blog",
      color: "#F97316",
      bg: "rgba(249,115,22,0.1)",
    },
    {
      key: "telegram",
      href: "https://t.me/traveleasyuz",
      color: "#0EA5E9",
      bg: "rgba(14,165,233,0.1)",
      external: true,
    },
    {
      key: "instagram",
      href: "https://instagram.com/travel-easy",
      color: "#EC4899",
      bg: "rgba(236,72,153,0.1)",
      external: true,
    },
  ];

  return (
    <section className="layout-pt-md layout-pb-lg">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle -md">
              <h2 className="sectionTitle__title">{t("pageTitle")}</h2>
              <p className="sectionTitle__text mt-5 sm:mt-0">
                {t("pageSubtitle")}
              </p>
              <div className="uzbek-gold-line-center" />
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-40">
          {services.map((service, index) => {
            const href = service.external
              ? service.href
              : `/${locale}${service.href}`;

            return (
              <div
                key={service.key}
                className="col-lg-4 col-sm-6 col-12"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <Link
                  href={href}
                  target={service.external ? "_blank" : undefined}
                  rel={service.external ? "noopener noreferrer" : undefined}
                  className="kashf-service-card d-block rounded-8 border-light px-30 py-30 hover-shadow-2 h-100"
                >
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
                  <div
                    className="text-14 mt-15 fw-500"
                    style={{ color: service.color }}
                  >
                    {t("learnMore")} →
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
