"use client";

import { useLocale, useTranslations } from "next-intl";
import IslamicPattern from "@/components/ui/IslamicPattern";
import ServiceCard from "@/components/ui/ServiceCard";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import { PRIMARY_SERVICES } from "@/data/services";
import ServiceIcon from "@/components/ui/ServiceIcon";

const COLORS = {
  tours: ["#1B6CA8", "rgba(27,108,168,0.1)"],
  rentCar: ["#1A7A4A", "rgba(26,122,74,0.1)"],
  transfer: ["#AD8737", "rgba(201,168,76,0.12)"],
  driver: ["#C0392B", "rgba(192,57,43,0.1)"],
  business: ["#7C3AED", "rgba(124,58,237,0.1)"],
  currency: ["#0891B2", "rgba(8,145,178,0.1)"],
};

const ServicesSection = () => {
  const t = useTranslations("services");
  const locale = useLocale();

  return (
    <section
      className="layout-pt-md layout-pb-lg uzn-section-ivory"
      style={{ position: "relative" }}
    >
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
                {t("otherServicesTitle")}
              </h2>
              <p className="sectionTitle__text mt-5 sm:mt-0">
                {t("otherServicesSubtitle")}
              </p>
              <OrnamentalDivider
                starSize={22}
                className="uzn-ornament-divider--center"
              />
            </div>
          </div>
        </div>

        {/* Service cards grid */}
        <div className="row y-gap-24 pt-40">
          {PRIMARY_SERVICES.map((svc, idx) => {
            const [color, bg] = COLORS[svc.key];
            return (
              <div
                key={svc.key}
                className="col-lg-4 col-sm-6 col-12"
                data-aos="fade-up"
                data-aos-delay={idx * 45}
              >
                <ServiceCard
                  icon={<ServiceIcon name={svc.icon} size={26} />}
                  title={t(svc.key)}
                  description={t(`${svc.key}Desc`)}
                  href={`/${locale}${svc.href}`}
                  color={color}
                  bg={bg}
                  ctaText={t("learnMore")}
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
