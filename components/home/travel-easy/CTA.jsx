"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  FaFacebook,
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
  LuMail,
} from "@/components/shared/Icons";
import { defaultSettings } from "@/data/travelEasy";
import { useSettings } from "@/hooks/useSettings";
import { trackContact } from "@/lib/analytics";
import DomeDecor from "@/components/ui/DomeDecor";

const CrescentFloat = ({ style }) => (
  <div className="uzn-crescent" style={style} aria-hidden="true">
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26 6 C15 6 7 15 7 26 C7 37 15 46 26 46 C19 46 13 39 13 26 C13 13 19 6 26 6Z"
        fill="#C9A84C"
        opacity="0.8"
      />
      <polygon
        points="35,9 36.6,14 42,14 37.8,17.2 39.4,22.2 35,19 30.6,22.2 32.2,17.2 28,14 33.4,14"
        fill="#C9A84C"
        opacity="0.85"
      />
    </svg>
  </div>
);

const CTA = () => {
  const t = useTranslations("cta");
  const locale = useLocale();
  const { settings } = useSettings();
  const contact = settings?.contact || defaultSettings.contact;

  const socialLinks = [
    { key: "whatsapp",  href: contact?.whatsapp,  label: "WhatsApp", className: "whatsapp",  icon: <FaWhatsapp size={18} />       },
    { key: "telegram",  href: contact?.telegram,  label: "Telegram", className: "telegram",  icon: <FaTelegramPlane size={18} />  },
    { key: "facebook",  href: contact?.facebook,  label: "Facebook", className: "facebook",  icon: <FaFacebook size={18} />       },
    { key: "instagram", href: contact?.instagram, label: "Instagram", className: "instagram", icon: <FaInstagram size={18} />     },
  ].filter((item) => !!item.href);

  const handleSocialClick = (method, href) => async (event) => {
    event.preventDefault();
    const trackedMethod = method === "whatsapp" || method === "telegram" ? method : null;
    try {
      if (trackedMethod) {
        await trackContact({ method: trackedMethod, source: "cta", tourId: null, tourTitle: null, locale });
      }
    } catch {}
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const handleWhatsApp = async (event) => {
    event.preventDefault();
    const href = contact?.whatsapp || "https://wa.me/998990621736";
    try {
      await trackContact({ method: "whatsapp", source: "cta", tourId: null, tourTitle: null, locale });
    } catch {}
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="layout-pt-md uzn-section-dark" style={{ paddingBottom: 0 }}>
      {/* Floating crescents */}
      <CrescentFloat style={{ top: "20%", right: "5%", zIndex: 2 }} />
      <CrescentFloat style={{ bottom: "30%", left: "4%", zIndex: 2, animationDelay: "4s", opacity: 0.45 }} />

      <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "60px" }}>
        <div className="row y-gap-30 justify-between items-center">
          <div className="col-auto">
            <div className="row y-gap-20 flex-wrap items-center">
              <div className="col-auto">
                <div className="text-white d-inline-flex" aria-hidden="true">
                  <LuMail size={52} style={{ opacity: 0.72 }} />
                </div>
              </div>
              <div className="col-auto">
                <h4
                  className="text-28 text-white fw-700"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t("title")}
                </h4>
                <div className="text-white mt-4" style={{ opacity: 0.78 }}>
                  {t("subtitle")}
                </div>
              </div>
            </div>
          </div>

          <div className="col-auto">
            <div className="d-flex x-gap-12 y-gap-14 flex-wrap">
              <Link
                href={contact?.whatsapp || "https://wa.me/998990621736"}
                target="_blank"
                rel="noopener noreferrer"
                className="uzn-btn-gold h-56"
                onClick={handleWhatsApp}
              >
                {t("whatsapp")}
              </Link>
              <Link
                href={`/${locale}/tours`}
                className="uzn-btn-outline-gold h-56"
              >
                {t("viewTours")}
              </Link>
            </div>

            <div className="d-flex x-gap-12 pt-20">
              {socialLinks.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-icon ${item.className}`}
                  aria-label={item.label}
                  onClick={handleSocialClick(item.key, item.href)}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dome silhouette at bottom of CTA section */}
      <DomeDecor color="#C9A84C" opacity={0.28} />
    </section>
  );
};

export default CTA;
