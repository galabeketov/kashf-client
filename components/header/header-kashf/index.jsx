"use client";

import Link from "next/link";
import { usePathname, useRouter as useNextRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LuMenu, LuX } from "@/components/shared/Icons";
import { trackContact } from "@/lib/analytics";
import { useSettings } from "@/hooks/useSettings";
import { contact as staticContact } from "@/data/kashf";

const LOCALES = ["en", "uz", "ru"];

const HeaderKashf = () => {
  const brandT = useTranslations("brand");
  const t = useTranslations("nav");
  const locale = useLocale();
  const { settings } = useSettings();
  const contact = settings?.contact || staticContact;
  const whatsappUrl = contact?.whatsapp || "https://wa.me/998901234567";
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
      <header
        className={`header -type-1 ${headerBg}`}
        style={
          isSticky
            ? {
                backgroundColor: "var(--uzn-dark)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.32)",
              }
            : {}
        }
      >
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
                  <div className="uzn-logo-name">{brandT("name")}</div>
                  <span className="uzn-logo-sub">{brandT("tagline")}</span>
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
                    WhatsApp
                  </Link>
                  <Link
                    href={localizedPath("/tours")}
                    className="uzn-btn-outline-gold px-28 h-46 ml-12"
                    style={{ fontSize: "14px" }}
                  >
                    Explore Tours
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
                        <div
                          className="uzn-logo-name"
                          style={{ fontSize: "20px" }}
                        >
                          {brandT("name")}
                        </div>
                        <span className="uzn-logo-sub">
                          {brandT("tagline")}
                        </span>
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
                        <Link
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="uzn-btn-gold h-50 text-center"
                          onClick={handleWhatsApp}
                        >
                          WhatsApp
                        </Link>
                        <Link
                          href={localizedPath("/tours")}
                          className="uzn-btn-primary h-50 text-center"
                          data-bs-dismiss="offcanvas"
                        >
                          Explore Tours
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderKashf;
