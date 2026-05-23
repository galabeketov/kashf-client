"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const CTA = () => {
  const t = useTranslations("cta");
  const locale = useLocale();

  return (
    <section className="layout-pt-md layout-pb-md bg-dark-2">
      <div className="container">
        <div className="row y-gap-30 justify-between items-center">
          <div className="col-auto">
            <div className="row y-gap-20 flex-wrap items-center">
              <div className="col-auto">
                <div className="icon-newsletter text-60 sm:text-40 text-white" />
              </div>
              <div className="col-auto">
                <h4 className="text-26 text-white fw-600">{t("title")}</h4>
                <div className="text-white">{t("subtitle")}</div>
              </div>
            </div>
          </div>

          <div className="col-auto">
            <div className="d-flex x-gap-10 y-gap-15 flex-wrap">
              <Link
                href="https://wa.me/998901234567"
                target="_blank"
                rel="noopener noreferrer"
                className="button -md h-60 bg-blue-1 text-white"
              >
                {t("whatsapp")}
              </Link>
              <Link
                href={`/${locale}/tours`}
                className="button -md h-60 border-white -outline-white text-white"
              >
                {t("viewTours")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
