"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { LuCheck } from "@/components/shared/Icons";
import { defaultSettings } from "@/data/kashf";
import { useSettings } from "@/hooks/useSettings";
import { trackContact } from "@/lib/analytics";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";

const AboutSection = () => {
  const t = useTranslations("about");
  const locale = useLocale();
  const { settings } = useSettings();

  const guide = settings?.guide || defaultSettings.guide;
  const contact = settings?.contact || defaultSettings.contact;

  const localized = (value) => value?.[locale] || value?.en || value || "";

  const stats = guide.stats || defaultSettings.guide.stats;
  const checklistItems = stats
    .slice(0, 3)
    .map((item) => localized(item.label))
    .filter(Boolean);

  const handleContactClick =
    (method, href, target = "_blank") =>
    async (event) => {
      event.preventDefault();
      try {
        await trackContact({ method, source: "cta", tourId: null, tourTitle: null, locale });
      } catch {}
      if (target === "_blank") {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = href;
      }
    };

  return (
    <section className="layout-pt-lg layout-pb-lg uzn-section-ivory">
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row y-gap-30 items-center">
          {/* Photo column */}
          <div className="col-lg-6" data-aos="fade-up">
            <div className="uzn-photo-frame" style={{ height: "520px" }}>
              <Image
                src={guide.photo}
                alt={localized(guide.name)}
                width={640}
                height={520}
                className="col-12 h-full"
                style={{ height: "520px", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Content column */}
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <div className="pl-20 lg:pl-0">
              <div
                className="text-14 fw-600 text-uppercase mb-8"
                style={{ color: "#1B6CA8", letterSpacing: "0.14em" }}
              >
                {t("sectionLabel")}
              </div>

              <h2
                className="text-40 lg:text-30 mt-10"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                {localized(guide.name)}
              </h2>

              {/* Ornamental divider below guide name */}
              <OrnamentalDivider starSize={22} />

              <p className="text-16 text-dark-1" style={{ lineHeight: 1.7 }}>
                {localized(guide.bio1)}
              </p>
              <p className="mt-15 text-16 text-dark-1" style={{ lineHeight: 1.7 }}>
                {localized(guide.bio2)}
              </p>

              {/* Checklist */}
              <div className="mt-20 d-flex flex-column y-gap-12">
                {checklistItems.map((item) => (
                  <div className="d-flex items-center" key={item}>
                    <LuCheck
                      size={16}
                      className="mr-10 flex-shrink-0"
                      style={{ color: "#C9A84C" }}
                    />
                    <span className="text-15 text-dark-1">{item}</span>
                  </div>
                ))}
              </div>

              {/* Gold-bordered stat cards */}
              <div className="row y-gap-14 x-gap-14 mt-30">
                {stats.map((item, index) => (
                  <div className="col-sm-6" key={`${item.num}-${index}`}>
                    <div className="uzn-about-stat">
                      <div className="uzn-about-stat__num">{item.num}</div>
                      <div className="text-14 text-light-1 mt-4">
                        {localized(item.label)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="d-flex x-gap-14 y-gap-14 flex-wrap mt-30">
                <Link
                  href={contact.whatsapp || "https://wa.me/998901234567"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uzn-btn-gold"
                  onClick={handleContactClick(
                    "whatsapp",
                    contact.whatsapp || "https://wa.me/998901234567",
                  )}
                >
                  {t("whatsapp")}
                </Link>
                <Link
                  href={`mailto:${contact.email || "hello@kashf.uz"}`}
                  className="uzn-btn-outline-gold"
                  style={{ color: "#1A1A2E", borderColor: "#C9A84C" }}
                  onClick={handleContactClick(
                    "email",
                    `mailto:${contact.email || "hello@kashf.uz"}`,
                    "_self",
                  )}
                >
                  Email
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
