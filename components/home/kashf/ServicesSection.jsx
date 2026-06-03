"use client";

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
import IslamicPattern from "@/components/ui/IslamicPattern";
import ServiceCard from "@/components/ui/ServiceCard";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";

const serviceIcons = {
  tours:     <LuMapPin size={26} />,
  rentCar:   <LuCar size={26} />,
  transfer:  <LuPlane size={26} />,
  business:  <LuBriefcase size={26} />,
  driver:    <LuUser size={26} />,
  currency:  <LuDollarSign size={26} />,
  blog:      <LuFileText size={26} />,
  telegram:  <LuMessageCircle size={26} />,
  instagram: <FaInstagram size={26} />,
};

const SERVICE_META = [
  { key: "tours",     href: "/tours",                            color: "#1B6CA8", bg: "rgba(27,108,168,0.1)"  },
  { key: "rentCar",   href: "/rent-car",                         color: "#1A7A4A", bg: "rgba(26,122,74,0.1)"   },
  { key: "transfer",  href: "/transfer",                         color: "#C9A84C", bg: "rgba(201,168,76,0.12)" },
  { key: "business",  href: "/business",                         color: "#7C3AED", bg: "rgba(124,58,237,0.1)"  },
  { key: "driver",    href: "/driver",                           color: "#C0392B", bg: "rgba(192,57,43,0.1)"   },
  { key: "currency",  href: "/currency",                         color: "#0891B2", bg: "rgba(8,145,178,0.1)"   },
  { key: "blog",      href: "/blog",                             color: "#EA580C", bg: "rgba(234,88,12,0.1)"   },
  { key: "telegram",  href: "https://t.me/traveleasyuz",         color: "#0EA5E9", bg: "rgba(14,165,233,0.1)", external: true },
  { key: "instagram", href: "https://instagram.com/travel-easy", color: "#EC4899", bg: "rgba(236,72,153,0.1)", external: true },
];

const ServicesSection = () => {
  const t = useTranslations("services");
  const locale = useLocale();

  return (
    <section className="layout-pt-md layout-pb-lg uzn-section-ivory" style={{ position: "relative" }}>
      {/* Faint Islamic pattern centered in background */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        <IslamicPattern size={480} color="#C9A84C" opacity={0.038} animated />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle -md">
              <h2
                className="sectionTitle__title"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t("pageTitle")}
              </h2>
              <p className="sectionTitle__text mt-5 sm:mt-0">
                {t("pageSubtitle")}
              </p>
              <OrnamentalDivider starSize={22} className="uzn-ornament-divider--center" />
            </div>
          </div>
        </div>

        {/* Service cards grid */}
        <div className="row y-gap-24 pt-40">
          {SERVICE_META.map((svc, idx) => {
            const href = svc.external ? svc.href : `/${locale}${svc.href}`;
            return (
              <div
                key={svc.key}
                className="col-lg-4 col-sm-6 col-12"
                data-aos="fade-up"
                data-aos-delay={idx * 45}
              >
                <ServiceCard
                  icon={serviceIcons[svc.key]}
                  title={t(svc.key)}
                  description={t(`${svc.key}Desc`)}
                  href={href}
                  color={svc.color}
                  bg={svc.bg}
                  ctaText={t("learnMore")}
                  external={svc.external}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
