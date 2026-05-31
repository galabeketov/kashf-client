"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import ServicePageShell from "@/components/home/kashf/ServicePageShell";

const currencies = ["USD", "EUR", "GBP", "RUB", "KZT"];

const reasons = [
  "Better rates than airport",
  "Safe and transparent",
  "Home/hotel delivery available",
];

const steps = [
  "Contact on WhatsApp",
  "Confirm amount and rate",
  "Exchange at agreed location",
];

export default function CurrencyPage() {
  const locale = useLocale();
  const t = useTranslations("services");
  const navT = useTranslations("nav");
  const title = t("currency");

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
        <h2 className="sectionTitle__title">About Currency Exchange</h2>
        <p className="sectionTitle__text mt-5 sm:mt-0">
          We offer currency exchange at competitive rates. USD, EUR, GBP, RUB,
          KZT and more. Safe, fast, convenient.
        </p>
      </div>

      <div className="table-responsive mt-30">
        <table className="table-5 -border-bottom w-1/1">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Buy</th>
              <th>Sell</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => (
              <tr key={currency}>
                <td>{currency}</td>
                <td>Contact for today's rate</td>
                <td>Contact for today's rate</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-40">
        <div className="border-light rounded-8 px-30 py-30 bg-yellow-1-05">
          <h3 className="text-20 fw-500 text-dark-1">Important Note</h3>
          <p className="text-15 mt-10 text-light-1">
            Rates change daily. Contact us on WhatsApp for today's exact rates
            before exchanging.
          </p>
        </div>
      </div>

      <div className="pt-50">
        <div className="sectionTitle -md">
          <h2 className="sectionTitle__title">Why Use Our Service</h2>
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
          <h2 className="sectionTitle__title">How It Works</h2>
        </div>
        <div className="row y-gap-20 pt-20">
          {steps.map((step, index) => (
            <div className="col-md-4" key={step}>
              <div className="featureIcon -type-1 h-100">
                <div className="size-50 flex-center rounded-full bg-blue-2 text-blue-1 fw-600">
                  {index + 1}
                </div>
                <div className="text-18 fw-500 mt-20">{step}</div>
                <p className="text-15 mt-10 text-light-1">
                  Quick and secure exchange process.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ServicePageShell>
  );
}
