"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import ServicePageShell from "@/components/home/kashf/ServicePageShell";
import { LuDollarSign } from "@/components/shared/Icons";

export default function CurrencyPage() {
  const locale = useLocale();
  const t = useTranslations("services");
  const navT = useTranslations("nav");
  const title = t("currency");

  const currencies = t.raw("detail.currency.currencies");
  const reasons = t.raw("detail.currency.reasons");
  const steps = t.raw("detail.currency.steps");
  const rateNote = t("detail.currency.rateNote");

  return (
    <ServicePageShell
      serviceSlug="currency"
      serviceTitle={title}
      heroTitle={title}
      heroSubtitle={t("currencyDesc")}
      breadcrumb={
        <div className="row x-gap-10 y-gap-10 items-center text-14 text-light-1">
          <div className="col-auto">
            <Link href={`/${locale}`} className="text-dark-1">
              {navT("home")}
            </Link>
          </div>
          <div className="col-auto">&gt;</div>
          <div className="col-auto">
            <Link href={`/${locale}/services`} className="text-dark-1">
              {navT("services")}
            </Link>
          </div>
          <div className="col-auto">&gt;</div>
          <div className="col-auto">
            <span className="text-dark-1">{title}</span>
          </div>
        </div>
      }
    >
      <div className="sectionTitle -md">
        <h2 className="sectionTitle__title">{t("detail.currency.aboutTitle")}</h2>
        <p className="sectionTitle__text mt-5 sm:mt-0">
          {t("detail.currency.aboutText")}
        </p>
      </div>

      <div className="pt-30">
        <div className="sectionTitle -md">
          <h2 className="sectionTitle__title">
            {t("detail.currency.currenciesTitle")}
          </h2>
        </div>
        <div className="row y-gap-15 pt-20">
          {currencies.map((currency) => (
            <div className="col-md-4 col-sm-6" key={currency}>
              <div className="d-flex items-center justify-between border-light rounded-8 px-20 py-15">
                <span className="d-flex items-center text-16 fw-500 text-dark-1">
                  <span className="size-40 flex-center rounded-full bg-blue-2 text-blue-1 mr-15">
                    <LuDollarSign size={18} />
                  </span>
                  {currency}
                </span>
                <span className="text-13 text-light-1">{rateNote}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-40">
        <div className="border-light rounded-8 px-30 py-30 bg-yellow-1-05">
          <h3 className="text-20 fw-500 text-dark-1">
            {t("detail.currency.noteTitle")}
          </h3>
          <p className="text-15 mt-10 text-light-1">
            {t("detail.currency.noteText")}
          </p>
        </div>
      </div>

      <div className="pt-50">
        <div className="sectionTitle -md">
          <h2 className="sectionTitle__title">
            {t("detail.currency.whyTitle")}
          </h2>
        </div>
        <div className="row y-gap-15 pt-20">
          {reasons.map((reason) => (
            <div className="col-sm-4" key={reason}>
              <div className="border-light rounded-8 px-20 py-20 h-100">
                <div className="text-18 fw-500 text-dark-1">{reason}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-50">
        <div className="sectionTitle -md">
          <h2 className="sectionTitle__title">
            {t("detail.currency.stepsTitle")}
          </h2>
        </div>
        <div className="row y-gap-20 pt-20">
          {steps.map((step, index) => (
            <div className="col-md-4" key={step.title}>
              <div className="featureIcon -type-1 h-100">
                <div className="size-50 flex-center rounded-full bg-blue-2 text-blue-1 fw-600">
                  {index + 1}
                </div>
                <div className="text-18 fw-500 mt-20">{step.title}</div>
                <p className="text-15 mt-10 text-light-1">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ServicePageShell>
  );
}
