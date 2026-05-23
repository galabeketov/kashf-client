"use client";

import { useLocale, useTranslations } from "next-intl";
import { defaultSettings } from "@/data/kashf";
import { useSettings } from "@/hooks/useSettings";

const FeaturesSection = () => {
  const t = useTranslations("features");
  const locale = useLocale();
  const { settings } = useSettings();
  const features = settings?.features || defaultSettings.features;

  const localized = (value) => value?.[locale] || value?.en || value || "";

  return (
    <section className="layout-pt-md layout-pb-lg">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle -md">
              <h2 className="sectionTitle__title">{t("title")}</h2>
              <p className="sectionTitle__text mt-5 sm:mt-0">{t("subtitle")}</p>
            </div>
          </div>
        </div>

        <div className="row y-gap-20 justify-between pt-40">
          {features.map((item) => (
            <div
              className="col-lg-4 col-sm-6"
              data-aos="fade"
              data-aos-delay={item.delayAnim}
              key={item.id}
            >
              <div className="featureIcon -type-1">
                <div className="d-flex justify-center">
                  <img
                    src={item.icon}
                    alt={localized(item.title)}
                    className="js-lazy"
                  />
                </div>
                <div className="text-center mt-30">
                  <h4 className="text-18 fw-500">{localized(item.title)}</h4>
                  <p className="text-15 mt-10">{localized(item.text)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
