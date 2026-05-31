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
import { defaultSettings } from "@/data/kashf";
import { useSettings } from "@/hooks/useSettings";
import { trackContact } from "@/lib/analytics";

const CTA = () => {
  const t = useTranslations("cta");
  const locale = useLocale();
  const { settings } = useSettings();
  const contact = settings?.contact || defaultSettings.contact;

  const socialLinks = [
    {
      key: "whatsapp",
      href: contact?.whatsapp,
      label: "WhatsApp",
      className: "whatsapp",
      icon: <FaWhatsapp size={18} />,
    },
    {
      key: "telegram",
      href: contact?.telegram,
      label: "Telegram",
      className: "telegram",
      icon: <FaTelegramPlane size={18} />,
    },
    {
      key: "facebook",
      href: contact?.facebook,
      label: "Facebook",
      className: "facebook",
      icon: <FaFacebook size={18} />,
    },
    {
      key: "instagram",
      href: contact?.instagram,
      label: "Instagram",
      className: "instagram",
      icon: <FaInstagram size={18} />,
    },
  ].filter((item) => !!item.href);

  const handleSocialClick = (method, href) => async (event) => {
    event.preventDefault();
    const trackedMethod =
      method === "whatsapp" || method === "telegram" ? method : null;
    try {
      if (trackedMethod) {
        await trackContact({
          method: trackedMethod,
          source: "cta",
          tourId: null,
          tourTitle: null,
          locale,
        });
      }
    } catch {}
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const handleWhatsApp = async (event) => {
    event.preventDefault();
    const href = contact?.whatsapp || "https://wa.me/998901234567";
    try {
      await trackContact({
        method: "whatsapp",
        source: "cta",
        tourId: null,
        tourTitle: null,
        locale,
      });
    } catch {}
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="layout-pt-md layout-pb-md bg-dark-2 uzbek-cta">
      <div className="container">
        <div className="row y-gap-30 justify-between items-center">
          <div className="col-auto">
            <div className="row y-gap-20 flex-wrap items-center">
              <div className="col-auto">
                <div className="text-white d-inline-flex" aria-hidden="true">
                  <LuMail size={56} />
                </div>
              </div>
              <div className="col-auto">
                <h4 className="text-26 text-white fw-600">{t("title")}</h4>
                <div className="text-white">{t("subtitle")}</div>
              </div>
            </div>
          </div>

          <div className="col-auto">
            <div className="d-flex x-gap-10 y-gap-15 flex-wrap">
              <Link
                href={contact?.whatsapp || "https://wa.me/998901234567"}
                target="_blank"
                rel="noopener noreferrer"
                className="button -md h-60 btn-uzbek-gold"
                onClick={handleWhatsApp}
              >
                {t("whatsapp")}
              </Link>
              <Link
                href={`/${locale}/tours`}
                className="button -md h-60 btn-uzbek-outline"
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
    </section>
  );
};

export default CTA;
