"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  FaFacebook,
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
  LuMail,
  LuMapPin,
  LuPhone,
} from "@/components/shared/Icons";
import { contact as staticContact } from "@/data/kashf";
import { useSettings } from "@/hooks/useSettings";
import { trackContact } from "@/lib/analytics";

const KashfFooter = () => {
  const t = useTranslations("footer");
  const brandT = useTranslations("brand");
  const navT = useTranslations("nav");
  const servicesT = useTranslations("services");
  const locale = useLocale();
  const { settings } = useSettings();
  const contact = settings?.contact || staticContact;
  const location =
    contact?.location?.[locale] || contact?.location?.en || contact.location;
  const socialLinks = [
    {
      key: "whatsapp",
      href: contact?.whatsapp,
      className: "whatsapp",
      icon: <FaWhatsapp size={18} />,
      label: "WhatsApp",
    },
    {
      key: "telegram",
      href: contact?.telegram,
      className: "telegram",
      icon: <FaTelegramPlane size={18} />,
      label: "Telegram",
    },
    {
      key: "facebook",
      href: contact?.facebook,
      className: "facebook",
      icon: <FaFacebook size={18} />,
      label: "Facebook",
    },
    {
      key: "instagram",
      href: contact?.instagram,
      className: "instagram",
      icon: <FaInstagram size={18} />,
      label: "Instagram",
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
          source: "footer",
          tourId: null,
          tourTitle: null,
          locale,
        });
      }
    } catch {}
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const handlePhoneClick = async (event) => {
    event.preventDefault();
    try {
      await trackContact({
        method: "phone",
        source: "footer",
        tourId: null,
        tourTitle: null,
        locale,
      });
    } catch {}
    window.location.href = `tel:${contact.phone}`;
  };

  const handleEmailClick = async (event) => {
    event.preventDefault();
    try {
      await trackContact({
        method: "email",
        source: "footer",
        tourId: null,
        tourTitle: null,
        locale,
      });
    } catch {}
    window.location.href = `mailto:${contact.email}`;
  };

  const quickLinks = [
    { label: navT("home"), href: `/${locale}` },
    { label: navT("tours"), href: `/${locale}/tours` },
    { label: navT("services"), href: `/${locale}/services` },
    { label: navT("blog"), href: `/${locale}/blog` },
    { label: navT("about"), href: `/${locale}/about` },
    { label: navT("contact"), href: `/${locale}/contact` },
  ];

  const popularServices = [
    { label: servicesT("rentCar"), href: `/${locale}/services` },
    { label: servicesT("transfer"), href: `/${locale}/services` },
    { label: servicesT("business"), href: `/${locale}/services` },
    { label: servicesT("driver"), href: `/${locale}/services` },
  ];

  return (
    <footer className="footer -type-1">
      <div className="container">
        <div className="pt-60 pb-60">
          <div className="row y-gap-40 justify-between xl:justify-start">
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <h4 className="text-24 fw-700 lh-1">{brandT("name")}</h4>
              <div className="text-12 text-light-1 mt-5">
                {brandT("tagline")}
              </div>
              <p className="text-15 text-light-1 mt-20">
                {brandT("description")}
              </p>
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

            <div className="col-xl-2 col-lg-4 col-sm-6">
              <h5 className="text-16 fw-500 mb-30">{t("quickLinks")}</h5>
              <div className="d-flex y-gap-10 flex-column">
                {quickLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="text-15">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-sm-6">
              <h5 className="text-16 fw-500 mb-30">{servicesT("pageTitle")}</h5>
              <div className="d-flex y-gap-10 flex-column">
                {popularServices.map((service) => (
                  <Link
                    key={service.label}
                    href={service.href}
                    className="text-15"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-sm-6">
              <h5 className="text-16 fw-500 mb-30">{t("contact")}</h5>
              <div className="y-gap-10 d-flex flex-column">
                <a
                  href={`tel:${contact.phone}`}
                  className="text-15 d-flex items-start"
                  onClick={handlePhoneClick}
                >
                  <LuPhone
                    size={16}
                    className="mr-10 flex-shrink-0"
                    style={{ color: "#C9A84C" }}
                  />
                  <span>{contact.phone}</span>
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-15 d-flex items-start"
                  onClick={handleEmailClick}
                >
                  <LuMail
                    size={16}
                    className="mr-10 flex-shrink-0"
                    style={{ color: "#C9A84C" }}
                  />
                  <span>{contact.email}</span>
                </a>
                <div className="text-15 d-flex items-start">
                  <LuMapPin
                    size={16}
                    className="mr-10 flex-shrink-0"
                    style={{ color: "#C9A84C" }}
                  />
                  <span>{location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20 border-top-light">
          <div className="row justify-between items-center y-gap-10">
            <div className="col-auto">
              <div className="text-14">
                © {new Date().getFullYear()} {brandT("fullName")}.{" "}
                {t("copyright")}
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex x-gap-12 items-center">
                {socialLinks.map((item) => (
                  <a
                    key={`bottom-${item.key}`}
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
      </div>
    </footer>
  );
};

export default KashfFooter;
