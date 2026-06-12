"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import ServicePageShell from "@/components/home/travel-easy/ServicePageShell";
import { LuDollarSign } from "@/components/shared/Icons";
import { CURRENCY_CODES } from "@/data/services";

export default function CurrencyPage() {
  const locale = useLocale();
  const t = useTranslations("services");
  const navT = useTranslations("nav");
  const title = t("currency");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UZS");
  const [amount, setAmount] = useState("");
  const [customCurrency, setCustomCurrency] = useState("");

  const reasons = t.raw("detail.currency.reasons");
  const steps = t.raw("detail.currency.steps");
  const rateNote = t("detail.currency.rateNote");
  const resolvedFrom =
    fromCurrency === "OTHER" ? customCurrency.trim() : fromCurrency;
  const inquiryContext = useMemo(
    () =>
      [
        resolvedFrom && toCurrency
          ? `${resolvedFrom} → ${toCurrency}`
          : "",
        amount ? `${t("detail.currency.amountLabel")}: ${amount}` : "",
      ]
        .filter(Boolean)
        .join(", "),
    [amount, resolvedFrom, t, toCurrency],
  );

  return (
    <ServicePageShell
      serviceSlug="currency"
      serviceTitle={title}
      heroTitle={title}
      heroSubtitle={t("currencyDesc")}
      inquiryContext={inquiryContext}
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
            {t("detail.currency.requestTitle")}
          </h2>
          <p className="sectionTitle__text mt-5">
            {t("detail.currency.requestText")}
          </p>
        </div>

        <div className="travel-currency-request mt-24">
          <div className="travel-currency-request__field">
            <label htmlFor="currency-from">
              {t("detail.currency.fromLabel")}
            </label>
            <select
              id="currency-from"
              value={fromCurrency}
              onChange={(event) => setFromCurrency(event.target.value)}
            >
              {CURRENCY_CODES.map((code) => (
                <option key={code} value={code}>
                  {code === "OTHER"
                    ? t("detail.currency.otherCurrency")
                    : code}
                </option>
              ))}
            </select>
          </div>

          <div className="travel-currency-request__arrow" aria-hidden="true">
            →
          </div>

          <div className="travel-currency-request__field">
            <label htmlFor="currency-to">{t("detail.currency.toLabel")}</label>
            <select
              id="currency-to"
              value={toCurrency}
              onChange={(event) => setToCurrency(event.target.value)}
            >
              {CURRENCY_CODES.filter((code) => code !== "OTHER").map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>

          <div className="travel-currency-request__field is-amount">
            <label htmlFor="currency-amount">
              {t("detail.currency.amountLabel")}
            </label>
            <input
              id="currency-amount"
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder={t("detail.currency.amountPlaceholder")}
            />
          </div>

          {fromCurrency === "OTHER" ? (
            <div className="travel-currency-request__field is-wide">
              <label htmlFor="currency-custom">
                {t("detail.currency.customCurrencyLabel")}
              </label>
              <input
                id="currency-custom"
                value={customCurrency}
                onChange={(event) => setCustomCurrency(event.target.value)}
                placeholder={t("detail.currency.customCurrencyPlaceholder")}
              />
            </div>
          ) : null}
        </div>

        <div className="row y-gap-15 pt-24">
          {CURRENCY_CODES.filter((code) => code !== "OTHER").map((currency) => (
            <div className="col-md-4 col-sm-6" key={currency}>
              <button
                type="button"
                className={`travel-currency-chip${fromCurrency === currency ? " is-selected" : ""}`}
                onClick={() => setFromCurrency(currency)}
                aria-pressed={fromCurrency === currency}
              >
                <span>
                  <LuDollarSign size={17} />
                  {currency}
                </span>
                <small>{rateNote}</small>
              </button>
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
