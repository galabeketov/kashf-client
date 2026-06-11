"use client";

import Link from "next/link";
import { usePathname, useRouter as useNextRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  LuBriefcase,
  LuCar,
  LuMail,
  LuMenu,
  LuMessageCircle,
  LuPhone,
  LuPlane,
  LuX,
} from "@/components/shared/Icons";
import { trackContact } from "@/lib/analytics";
import { useSettings } from "@/hooks/useSettings";
import { contact as staticContact } from "@/data/kashf";

const LOCALES = ["en", "uz", "ru"];
const COMPANY_NAME = "TE-UZB Trip";
const COMPANY_EMAIL = "uztrip13@gmail.com";

const POPULAR_SERVICES = [
  { key: "tours", href: "/tours", icon: <LuBriefcase size={14} /> },
  { key: "transfer", href: "/transfer", icon: <LuPlane size={14} /> },
  { key: "rentCar", href: "/rent-car", icon: <LuCar size={14} /> },
  { key: "driver", href: "/driver", icon: <LuPhone size={14} /> },
];

const HeaderKashf = () => {
  const brandT = useTranslations("brand");
  const t = useTranslations("nav");
  const servicesT = useTranslations("services");
  const locale = useLocale();
  const { settings } = useSettings();
  const contact = settings?.contact || staticContact;
  const whatsappUrl = contact?.whatsapp || "https://wa.me/998990621736";
  const phone = contact?.phone || "+998 99 062 17 36";
  const telegram = contact?.telegram || "https://t.me/traveleasyuz";
  const brandLogo = "/img/icons/icon-192.png";
  const nextRouter = useNextRouter();
  const pathname = usePathname();
  const [navbar, setNavbar] = useState(false);

  const stripLocale = (path = "/") => {
    const segments = path.split("/").filter(Boolean);
    if (segments.length && LOCALES.includes(segments[0])) {
      const nextPath = `/${segments.slice(1).join("/")}`;
      return nextPath === "/" ? "/" : nextPath.replace(/\/$/, "") || "/";
    }
    return path === "" ? "/" : path;
  };

  const localizedPath = (path) => {
    if (path === "/") return `/${locale}`;
    return `/${locale}${path}`;
  };

  const currentPath = stripLocale(pathname || "/");
  const noHeroPages = [
    "/tours/",
    "/rent-car",
    "/transfer",
    "/business",
    "/driver",
    "/currency",
    "/blog/",
  ];
  const isNoHeroPage = noHeroPages.some((pathPart) =>
    currentPath.includes(pathPart),
  );
  const isSticky = isNoHeroPage || navbar;
  const headerBg = isSticky ? "is-sticky" : "";
  const serviceGradient = "linear-gradient(135deg, #051036 0%, #0d2268 100%)";

  const headerStyle = isNoHeroPage
    ? {
        background: serviceGradient,
        boxShadow: "none",
      }
    : isSticky
      ? {
          backgroundColor: "var(--uzn-dark)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.32)",
        }
      : {};

  const navLinks = [
    { label: t("home"), href: "/" },
    { label: t("tours"), href: "/tours" },
    { label: t("services"), href: "/services" },
    { label: t("blog"), href: "/blog" },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/") return currentPath === "/";
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  const switchLocale = (targetLocale) => {
    const barePath = stripLocale(pathname || "/");
    const targetPath =
      barePath === "/" ? `/${targetLocale}` : `/${targetLocale}${barePath}`;
    nextRouter.push(targetPath);
  };

  useEffect(() => {
    const changeBackground = () => setNavbar(window.scrollY >= 10);
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  const handleWhatsApp = async (event) => {
    event.preventDefault();
    try {
      await trackContact({
        method: "whatsapp",
        source: "header",
        tourId: null,
        tourTitle: null,
        locale,
      });
    } catch {}
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <header className={`header -type-1 ${headerBg}`} style={headerStyle}>
        <div className="header__container px-30 sm:px-20">
          <div className="row justify-between items-center">
            {/* Logo */}
            <div className="col-auto">
              <div className="d-flex items-center">
                <Link
                  href={localizedPath("/")}
                  className="header-logo mr-20"
                  style={{ textDecoration: "none" }}
                >
                  <div className="uzn-brand-wrap">
                    <img
                      src={brandLogo}
                      alt={COMPANY_NAME}
                      className="uzn-brand-mark"
                    />
                    <div>
                      <div className="uzn-logo-name">{brandT("name")}</div>
                      <span className="uzn-logo-sub">{brandT("tagline")}</span>
                    </div>
                  </div>
                </Link>

                {/* Desktop nav */}
                <div className="header-menu">
                  <div className="header-menu__content">
                    <nav className="menu js-navList">
                      <ul className="menu__nav text-white -is-active">
                        {navLinks.map((item) => (
                          <li
                            key={item.href}
                            className={isActive(item.href) ? "current" : ""}
                          >
                            <Link
                              href={localizedPath(item.href)}
                              className="uzn-nav-link"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side actions */}
            <div className="col-auto">
              <div className="d-flex items-center">
                {/* Locale pill — desktop */}
                <div className="mr-20 lg:d-none">
                  <div className="uzn-locale-pill">
                    {LOCALES.map((loc) => (
                      <button
                        key={loc}
                        className={locale === loc ? "active" : ""}
                        onClick={() => switchLocale(loc)}
                      >
                        {loc.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA buttons — desktop */}
                <div className="d-flex items-center is-menu-opened-hide md:d-none">
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uzn-btn-gold px-28 h-46"
                    style={{ fontSize: "14px" }}
                    onClick={handleWhatsApp}
                  >
                    {servicesT("whatsappDirect")}
                  </Link>
                  <Link
                    href={localizedPath("/services")}
                    className="uzn-btn-outline-gold px-28 h-46 ml-12"
                    style={{ fontSize: "14px" }}
                  >
                    {t("allServices")}
                  </Link>
                </div>

                {/* Mobile hamburger + locale */}
                <div className="d-none xl:d-flex x-gap-16 items-center pl-24 text-white">
                  <div className="uzn-locale-pill">
                    {LOCALES.map((loc) => (
                      <button
                        key={`m-${loc}`}
                        className={locale === loc ? "active" : ""}
                        onClick={() => switchLocale(loc)}
                      >
                        {loc.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <button
                    className="d-flex items-center text-inherit text-20"
                    data-bs-toggle="offcanvas"
                    aria-controls="mobile-sidebar_menu"
                    data-bs-target="#mobile-sidebar_menu"
                  >
                    <LuMenu size={22} />
                  </button>

                  {/* Mobile offcanvas */}
                  <div
                    className="offcanvas offcanvas-start mobile_menu-contnet"
                    tabIndex="-1"
                    id="mobile-sidebar_menu"
                    aria-labelledby="offcanvasMenuLabel"
                    data-bs-scroll="true"
                  >
                    <div className="pro-header d-flex align-items-center justify-between border-bottom-light">
                      <Link
                        href={localizedPath("/")}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="uzn-brand-wrap">
                          <img
                            src={brandLogo}
                            alt={COMPANY_NAME}
                            className="uzn-brand-mark"
                            style={{ width: "36px", height: "36px" }}
                          />
                          <div>
                            <div
                              className="uzn-logo-name"
                              style={{ fontSize: "20px" }}
                            >
                              {brandT("name")}
                            </div>
                            <span className="uzn-logo-sub">
                              {brandT("tagline")}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <div
                        className="fix-icon"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        <LuX size={18} />
                      </div>
                    </div>

                    <div className="p-20">
                      <nav className="menu js-navList">
                        <ul className="menu__nav -is-active d-block">
                          {navLinks.map((item) => (
                            <li
                              key={`mobile-${item.href}`}
                              className={`${isActive(item.href) ? "current" : ""} py-10`}
                              data-bs-dismiss="offcanvas"
                            >
                              <Link href={localizedPath(item.href)}>
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </nav>

                      <div className="mt-20">
                        <div
                          className="uzn-locale-pill"
                          style={{ width: "100%", justifyContent: "center" }}
                        >
                          {LOCALES.map((loc) => (
                            <button
                              key={`mob-pill-${loc}`}
                              className={locale === loc ? "active" : ""}
                              onClick={() => switchLocale(loc)}
                              style={{ flex: 1 }}
                            >
                              {loc.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="d-flex flex-column y-gap-10 mt-20">
                        <div className="text-13 text-dark-1 fw-600">
                          {COMPANY_NAME}
                        </div>
                        <div className="text-13 text-light-1">
                          <strong>{servicesT("phoneLabel")}: </strong>
                          {phone}
                        </div>
                        <a href={`mailto:${COMPANY_EMAIL}`} className="text-14">
                          {COMPANY_EMAIL}
                        </a>
                        <Link
                          href={telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-14"
                        >
                          {servicesT("telegramLabel")}
                        </Link>
                        <Link
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="uzn-btn-gold h-50 text-center"
                          onClick={handleWhatsApp}
                        >
                          {servicesT("whatsappDirect")}
                        </Link>
                        <Link
                          href={localizedPath("/services")}
                          className="uzn-btn-primary h-50 text-center"
                          data-bs-dismiss="offcanvas"
                        >
                          {t("allServices")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="uzn-popular-bar md:d-none"
            style={{ borderTop: "1px solid rgba(255,255,255,0.18)" }}
          >
            <div className="uzn-popular-left">
              <span className="uzn-popular-title">{t("popularServices")}</span>
              <div className="uzn-popular-chips">
                {POPULAR_SERVICES.map((service) => (
                  <Link
                    key={`popular-${service.key}`}
                    href={localizedPath(service.href)}
                    className="uzn-popular-chip"
                  >
                    {service.icon}
                    <span>{servicesT(service.key)}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="uzn-popular-contact">
              <span className="uzn-company-pill">{COMPANY_NAME}</span>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="uzn-contact-link"
              >
                <LuPhone size={13} />
                {phone}
              </a>
              <a href={`mailto:${COMPANY_EMAIL}`} className="uzn-contact-link">
                <LuMail size={13} />
                {COMPANY_EMAIL}
              </a>
              <Link
                href={telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="uzn-contact-link"
              >
                <LuMessageCircle size={14} />
                <span>{servicesT("telegramLabel")}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderKashf;
