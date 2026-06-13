"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { LuArrowRight, LuMessageCircle } from "@/components/shared/Icons";
import { useSettings } from "@/hooks/useSettings";
import { contact as staticContact } from "@/data/travelEasy";
import { normalizeContact } from "@/lib/content";
import { trackContact } from "@/lib/analytics";
import {
  createPageInquiryMessage,
  createWhatsAppUrl,
} from "@/lib/whatsapp";

export default function TravelHero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const { settings } = useSettings();
  const contact = normalizeContact(settings?.contact, staticContact);
  const stats = settings?.stats || t.raw("stats");

  const handleWhatsApp = async (event) => {
    event.preventDefault();
    try {
      await trackContact({
        method: "whatsapp",
        source: "hero",
        tourId: null,
        tourTitle: null,
        locale,
      });
    } catch {}
    const message = createPageInquiryMessage({
      locale,
      title: t("title"),
      url: window.location.href,
    });
    window.open(
      createWhatsAppUrl(contact.whatsapp, message),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section className="travel-hero">
      <Image
        src="/img/travel-easy/registan-hero-source.png"
        alt="Registan Square in Samarkand at sunrise"
        fill
        priority
        quality={86}
        sizes="100vw"
        className="travel-hero__image"
      />
      <div className="travel-hero__overlay" />
      <div className="travel-hero__pattern" aria-hidden="true" />

      <div className="container travel-hero__content">
        <div className="travel-hero__copy">
          <span className="travel-eyebrow">{t("label")}</span>
          <h1>{t("title")}</h1>
          <p>{t("subtitle")}</p>

          <div className="travel-hero__actions">
            <Link href={`/${locale}/tours`} className="travel-btn travel-btn--primary">
              {t("exploreBtn")}
              <LuArrowRight size={18} />
            </Link>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="travel-btn travel-btn--glass"
              onClick={handleWhatsApp}
            >
              <LuMessageCircle size={18} />
              {t("whatsappBtn")}
            </a>
          </div>

          <div className="travel-hero__trust" aria-label="Travel Easy highlights">
            {stats.slice(0, 3).map((item, index) => (
              <div key={`${item.num}-${index}`}>
                <strong>{item.num}</strong>
                <span>{item.label?.[locale] || item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
