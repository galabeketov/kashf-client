"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { LuMenu, LuMessageCircle, LuPhone, LuX } from "@/components/shared/Icons";
import { contact as staticContact } from "@/data/travelEasy";
import { useSettings } from "@/hooks/useSettings";
import { trackContact } from "@/lib/analytics";
import { normalizeContact } from "@/lib/content";
import BrandLogo from "@/components/ui/BrandLogo";
import ServicesSubnav from "@/components/home/travel-easy/ServicesSubnav";

const LOCALES = ["en", "uz", "ru"];

export default function TravelHeader() {
  const brandT = useTranslations("brand");
  const t = useTranslations("nav");
  const servicesT = useTranslations("services");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { settings } = useSettings();
  const contact = normalizeContact(settings?.contact, staticContact);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const barePath = pathname.replace(/^\/(en|uz|ru)(?=\/|$)/, "") || "/";
  const localize = (path) => (path === "/" ? `/${locale}` : `/${locale}${path}`);
  const navLinks = [
    { label: t("home"), href: "/" },
    { label: t("tours"), href: "/tours" },
    { label: t("services"), href: "/services" },
    { label: t("blog"), href: "/blog" },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ];
  const isHome = barePath === "/";
  const activeService =
    barePath === "/services"
      ? "services"
      : barePath.startsWith("/tours")
        ? "tours"
        : barePath.split("/")[1] || undefined;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const switchLocale = (nextLocale) => {
    router.push(barePath === "/" ? `/${nextLocale}` : `/${nextLocale}${barePath}`);
  };

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
    window.open(contact.whatsapp, "_blank", "noopener,noreferrer");
  };

  return (
    <header
      className={`travel-header ${!isHome || scrolled ? "travel-header--solid" : ""}`}
    >
      <div className="travel-header__inner">
        <Link href={localize("/")} className="travel-brand" aria-label={brandT("fullName")}>
          <BrandLogo name={brandT("name")} tagline={brandT("tagline")} />
        </Link>

        <nav className="travel-nav" aria-label="Primary navigation">
          {navLinks.map((item) => {
            const active =
              item.href === "/"
                ? barePath === "/"
                : barePath === item.href || barePath.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={localize(item.href)}
                className={active ? "is-active" : ""}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="travel-header__actions">
          <div className="travel-locale" aria-label="Language">
            {LOCALES.map((item) => (
              <button
                type="button"
                key={item}
                className={locale === item ? "is-active" : ""}
                onClick={() => switchLocale(item)}
                aria-pressed={locale === item}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <a
            href={contact.whatsapp}
            className="travel-header__cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsApp}
          >
            <LuMessageCircle size={17} />
            <span>{servicesT("whatsappDirect")}</span>
          </a>
          <button
            type="button"
            className="travel-menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <LuMenu size={24} />
          </button>
        </div>
      </div>

      <div
        className={`travel-drawer ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="travel-drawer__backdrop"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
        />
        <div className="travel-drawer__panel" role="dialog" aria-modal="true">
          <div className="travel-drawer__head">
            <span className="travel-brand">
              <BrandLogo
                name={brandT("name")}
                tagline={brandT("tagline")}
                size={46}
              />
            </span>
            <button
              type="button"
              className="travel-menu-button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <LuX size={23} />
            </button>
          </div>

          <nav className="travel-drawer__nav" aria-label="Mobile navigation">
            {navLinks.map((item) => (
              <Link key={item.href} href={localize(item.href)}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="travel-drawer__locale">
            {LOCALES.map((item) => (
              <button
                type="button"
                key={item}
                className={locale === item ? "is-active" : ""}
                onClick={() => switchLocale(item)}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="travel-drawer__contact">
            <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>
              <LuPhone size={18} /> {contact.phone}
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="travel-btn travel-btn--gold"
              onClick={handleWhatsApp}
            >
              {servicesT("whatsappDirect")}
            </a>
          </div>
        </div>
      </div>
      <ServicesSubnav active={activeService} />
    </header>
  );
}
