"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import KashfHeader from "@/components/header/header-kashf";
import KashfFooter from "@/components/footer/kashf";
import PageHero from "@/components/ui/PageHero";
import ServicesSubnav from "@/components/home/kashf/ServicesSubnav";
import { useSettings } from "@/hooks/useSettings";
import { contact as staticContact } from "@/data/kashf";
import {
  FaInstagram,
  LuBriefcase,
  LuArrowRight,
  LuCar,
  LuDollarSign,
  LuMail,
  LuFileText,
  LuMapPin,
  LuMessageCircle,
  LuPhone,
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

const POPULAR_SERVICE_KEYS = ["tours", "transfer", "rentCar", "driver"];

export default function ServicesPage() {
  const locale = useLocale();
  const t = useTranslations("services");
  const navT = useTranslations("nav");
  const { settings } = useSettings();
  const contact = settings?.contact || staticContact;
  const whatsappUrl = contact?.whatsapp || "https://wa.me/998990621736";
  const phone = contact?.phone || "+998 99 062 17 36";
  const email = contact?.email || "info@travel-easy.uz";
  const telegram = contact?.telegram || "https://t.me/traveleasyuz";

  const otherServices = servicesData.filter(
    (service) => !POPULAR_SERVICE_KEYS.includes(service.key),
  );

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

      <PageHero title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      <ServicesSubnav />

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
                <h2 className="sectionTitle__title">
                  {t("otherServicesTitle")}
                </h2>
                <p className="sectionTitle__text mt-5 sm:mt-0">
                  {t("otherServicesSubtitle")}
                </p>
              </div>
            </div>
          </div>

          <div className="row y-gap-30 pt-40">
            {otherServices.map((service, index) => {
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
                    <div
                      className="d-flex items-center mt-20 x-gap-8 text-14 fw-500"
                      style={{ color: service.color }}
                    >
                      <LuArrowRight size={14} />
                      <span>{t("learnMore")}</span>
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
            <div className="col-lg-7">
              <h3 className="text-28 text-white fw-600">
                {t("contactDirectly")}
              </h3>
              <div className="d-flex flex-column y-gap-10 mt-20 text-white text-16">
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="d-inline-flex items-center x-gap-10 text-white"
                >
                  <LuPhone size={16} />
                  <span>
                    {t("phoneLabel")}: {phone}
                  </span>
                </a>
                <a
                  href={`mailto:${email}`}
                  className="d-inline-flex items-center x-gap-10 text-white"
                >
                  <LuMail size={16} />
                  <span>
                    {t("emailLabel")}: {email}
                  </span>
                </a>
                <Link
                  href={telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-inline-flex items-center x-gap-10 text-white"
                >
                  <LuMessageCircle size={16} />
                  <span>{t("telegramLabel")}</span>
                </Link>
              </div>
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
