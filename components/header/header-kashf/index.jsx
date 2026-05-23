"use client";

import Link from "next/link";
import { usePathname, useRouter as useNextRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const LOCALES = ["en", "uz", "ru"];

const HeaderKashf = () => {
  const t = useTranslations("nav");
  const locale = useLocale();
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

  const navLinks = [
    { label: t("home"), href: "/" },
    { label: t("tours"), href: "/tours" },
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
    const changeBackground = () => {
      setNavbar(window.scrollY >= 10);
    };

    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <header className={`header -type-1 ${navbar ? "bg-dark-1 is-sticky" : ""}`}>
      <div className="header__container px-30 sm:px-20">
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="d-flex items-center">
              <Link
                href={localizedPath("/")}
                className="header-logo mr-20 text-white fw-700 text-24"
              >
                KASHF
              </Link>

              <div className="header-menu">
                <div className="header-menu__content">
                  <nav className="menu js-navList">
                    <ul className="menu__nav text-white -is-active">
                      {navLinks.map((item) => (
                        <li
                          key={item.href}
                          className={isActive(item.href) ? "current" : ""}
                        >
                          <Link href={localizedPath(item.href)}>
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

          <div className="col-auto">
            <div className="d-flex items-center">
              <div className="d-flex items-center x-gap-10 mr-20 lg:d-none">
                <button
                  className={`button -sm ${locale === "en" ? "bg-blue-1 text-white" : "border-blue-1 text-blue-1"}`}
                  onClick={() => switchLocale("en")}
                >
                  EN
                </button>
                <button
                  className={`button -sm ${locale === "uz" ? "bg-blue-1 text-white" : "border-blue-1 text-blue-1"}`}
                  onClick={() => switchLocale("uz")}
                >
                  UZ
                </button>
                <button
                  className={`button -sm ${locale === "ru" ? "bg-blue-1 text-white" : "border-blue-1 text-blue-1"}`}
                  onClick={() => switchLocale("ru")}
                >
                  RU
                </button>
              </div>

              <div className="d-flex items-center ml-20 is-menu-opened-hide md:d-none">
                <Link
                  href="https://wa.me/998901234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button px-30 fw-400 text-14 -white bg-white h-50 text-dark-1"
                >
                  WhatsApp
                </Link>
                <Link
                  href={localizedPath("/tours")}
                  className="button px-30 fw-400 text-14 border-white -outline-white h-50 text-white ml-20"
                >
                  Explore Tours
                </Link>
              </div>

              <div className="d-none xl:d-flex x-gap-20 items-center pl-30 text-white">
                <div className="d-flex items-center x-gap-10">
                  <button
                    className={`button -sm ${locale === "en" ? "bg-blue-1 text-white" : "border-blue-1 text-blue-1"}`}
                    onClick={() => switchLocale("en")}
                  >
                    EN
                  </button>
                  <button
                    className={`button -sm ${locale === "uz" ? "bg-blue-1 text-white" : "border-blue-1 text-blue-1"}`}
                    onClick={() => switchLocale("uz")}
                  >
                    UZ
                  </button>
                  <button
                    className={`button -sm ${locale === "ru" ? "bg-blue-1 text-white" : "border-blue-1 text-blue-1"}`}
                    onClick={() => switchLocale("ru")}
                  >
                    RU
                  </button>
                </div>
                <div>
                  <button
                    className="d-flex items-center icon-menu text-inherit text-20"
                    data-bs-toggle="offcanvas"
                    aria-controls="mobile-sidebar_menu"
                    data-bs-target="#mobile-sidebar_menu"
                  />

                  <div
                    className="offcanvas offcanvas-start  mobile_menu-contnet "
                    tabIndex="-1"
                    id="mobile-sidebar_menu"
                    aria-labelledby="offcanvasMenuLabel"
                    data-bs-scroll="true"
                  >
                    <div className="pro-header d-flex align-items-center justify-between border-bottom-light">
                      <Link
                        href={localizedPath("/")}
                        className="fw-700 text-20"
                      >
                        KASHF
                      </Link>

                      <div
                        className="fix-icon"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        <i className="icon icon-close"></i>
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

                      <div className="d-flex x-gap-10 mt-20">
                        <button
                          className={`button -sm ${locale === "en" ? "bg-blue-1 text-white" : "border-blue-1 text-blue-1"}`}
                          onClick={() => switchLocale("en")}
                        >
                          EN
                        </button>
                        <button
                          className={`button -sm ${locale === "uz" ? "bg-blue-1 text-white" : "border-blue-1 text-blue-1"}`}
                          onClick={() => switchLocale("uz")}
                        >
                          UZ
                        </button>
                        <button
                          className={`button -sm ${locale === "ru" ? "bg-blue-1 text-white" : "border-blue-1 text-blue-1"}`}
                          onClick={() => switchLocale("ru")}
                        >
                          RU
                        </button>
                      </div>

                      <div className="d-flex flex-column y-gap-10 mt-20">
                        <Link
                          href="https://wa.me/998901234567"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button px-30 fw-400 text-14 -white bg-white h-50 text-dark-1 border-light"
                        >
                          WhatsApp
                        </Link>
                        <Link
                          href={localizedPath("/tours")}
                          className="button px-30 fw-400 text-14 border-dark-1 -outline-dark-1 h-50 text-dark-1"
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
      </div>
    </header>
  );
};

export default HeaderKashf;
