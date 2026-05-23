"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Social from "@/components/common/social/Social";
import { contact as staticContact, tours } from "@/data/kashf";
import { useSettings } from "@/hooks/useSettings";

const KashfFooter = () => {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");
  const locale = useLocale();
  const { settings } = useSettings();
  const contact = settings?.contact || staticContact;
  const location =
    contact?.location?.[locale] || contact?.location?.en || contact.location;

  const quickLinks = [
    { label: navT("home"), href: `/${locale}` },
    { label: navT("tours"), href: `/${locale}/tours` },
    { label: navT("about"), href: `/${locale}/about` },
    { label: navT("contact"), href: `/${locale}/contact` },
  ];

  return (
    <footer className="footer -type-1">
      <div className="container">
        <div className="pt-60 pb-60">
          <div className="row y-gap-40 justify-between xl:justify-start">
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <h4 className="text-24 fw-700">KASHF</h4>
              <p className="text-15 text-light-1 mt-20">{t("description")}</p>
              <div className="d-flex x-gap-20 items-center mt-20">
                <Social />
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
              <h5 className="text-16 fw-500 mb-30">{t("popularTours")}</h5>
              <div className="d-flex y-gap-10 flex-column">
                {tours.slice(0, 3).map((tour) => (
                  <Link
                    key={tour.id}
                    href={`/${locale}/tours/${tour.id}`}
                    className="text-15"
                  >
                    {tour.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-sm-6">
              <h5 className="text-16 fw-500 mb-30">{t("contact")}</h5>
              <div className="y-gap-10 d-flex flex-column">
                <a href={`tel:${contact.phone}`} className="text-15">
                  {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`} className="text-15">
                  {contact.email}
                </a>
                <div className="text-15">{location}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20 border-top-light">
          <div className="row justify-between items-center y-gap-10">
            <div className="col-auto">
              <div className="text-14">
                © {new Date().getFullYear()} KASHF. {t("copyright")}
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex x-gap-20 items-center">
                <Social />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default KashfFooter;
