"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  LuMapPin,
  LuCar,
  LuPlane,
  LuUser,
  LuBriefcase,
  LuDollarSign,
} from "@/components/shared/Icons";

const ITEMS = [
  { slug: "tours", href: "/tours", key: "tours", Icon: LuMapPin },
  { slug: "rent-car", href: "/rent-car", key: "rentCar", Icon: LuCar },
  { slug: "transfer", href: "/transfer", key: "transfer", Icon: LuPlane },
  { slug: "driver", href: "/driver", key: "driver", Icon: LuUser },
  { slug: "business", href: "/business", key: "business", Icon: LuBriefcase },
  { slug: "currency", href: "/currency", key: "currency", Icon: LuDollarSign },
];

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
        {ITEMS.map(({ slug, href, key, Icon }) => (
          <Link
            key={slug}
            href={`/${locale}${href}`}
            className={`services-subnav__item${active === slug ? " is-active" : ""}`}
            aria-current={active === slug ? "page" : undefined}
          >
            <Icon size={17} aria-hidden="true" />
            <span>{t(key)}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
