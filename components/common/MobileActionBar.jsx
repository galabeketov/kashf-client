"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { LuMap, LuMessageCircle, LuPhone } from "@/components/shared/Icons";
import { contact as staticContact } from "@/data/travelEasy";
import { useSettings } from "@/hooks/useSettings";
import { normalizeContact } from "@/lib/content";
import {
  createPageInquiryMessage,
  createWhatsAppUrl,
} from "@/lib/whatsapp";

export default function MobileActionBar() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const servicesT = useTranslations("services");
  const { settings } = useSettings();
  const contact = normalizeContact(settings?.contact, staticContact);
  const phone = contact.phone.replace(/\s+/g, "");
  const message = createPageInquiryMessage({
    locale,
    title: servicesT("pageTitle"),
    url: `https://travel-easy.uz${pathname}`,
  });

  return (
    <nav className="travel-mobile-actions" aria-label="Quick contact">
      <a href={`tel:${phone}`} className="travel-mobile-actions__item">
        <LuPhone size={19} />
        <span>{servicesT("phoneLabel")}</span>
      </a>
      <a
        href={createWhatsAppUrl(contact.whatsapp, message)}
        target="_blank"
        rel="noopener noreferrer"
        className="travel-mobile-actions__item is-primary"
      >
        <LuMessageCircle size={20} />
        <span>WhatsApp</span>
      </a>
      <Link
        href={`/${locale}/tours`}
        className="travel-mobile-actions__item"
      >
        <LuMap size={19} />
        <span>{t("tours")}</span>
      </Link>
    </nav>
  );
}
