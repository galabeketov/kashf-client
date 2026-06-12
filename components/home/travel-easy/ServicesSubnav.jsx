"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { SERVICE_CATALOG } from "@/data/services";
import ServiceIcon from "@/components/ui/ServiceIcon";

/**
 * Booking.com-style secondary service bar. Sticky under the main header,
 * horizontally scrollable on mobile. `active` is the current service slug.
 */
export default function ServicesSubnav({ active }) {
  const locale = useLocale();
  const t = useTranslations("services");

  return (
    <nav className="services-subnav" aria-label="Services">
      <div className="services-subnav__inner">
        {SERVICE_CATALOG.map(({ slug, href, key, icon }) => (
          <Link
            key={slug}
            href={`/${locale}${href}`}
            className={`services-subnav__item${active === slug ? " is-active" : ""}`}
            aria-current={active === slug ? "page" : undefined}
          >
            <ServiceIcon name={icon} size={17} aria-hidden="true" />
            <span>{t(key)}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
