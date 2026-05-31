"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import ServicePageShell from "@/components/home/kashf/ServicePageShell";
import { FaCheck, LuPlane } from "@/components/shared/Icons";

const transferOptions = [
  { title: "Airport → Hotel", text: "From $15, sedan" },
  { title: "Airport → Any City", text: "From $30, depends on distance" },
];

const includes = [
  "Flight tracking",
  "Meet & greet with name sign",
  "Help with luggage",
  "Free waiting time (60 min)",
  "Air-conditioned vehicle",
  "24/7 availability",
];

const routes = [
  ["Airport → City Center", "$15"],
  ["Airport → Samarkand", "$120"],
  ["Airport → Bukhara", "$200"],
  ["Airport → Custom", "Contact"],
];

const steps = [
  "Share flight details",
  "We track your flight",
  "Driver meets you at arrivals",
];

export default function TransferPage() {
  const locale = useLocale();
  const t = useTranslations("services");
  const navT = useTranslations("nav");
  const title = t("transfer");

  return (
    <ServicePageShell
      serviceSlug="transfer"
      serviceTitle={title}
      heroTitle={title}
      heroSubtitle={t("transferDesc")}
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
        <h2 className="sectionTitle__title">About Airport Transfer</h2>
        <p className="sectionTitle__text mt-5 sm:mt-0">
          Reliable airport transfers to/from Tashkent International Airport.
          Meet & greet service, flight tracking, no hidden fees.
        </p>
      </div>

      <div className="row y-gap-30 pt-30">
        {transferOptions.map((option) => (
          <div className="col-md-6" key={option.title}>
            <div className="border-light rounded-8 px-20 py-20 h-100 position-relative">
              <span className="uzbek-dome-ornament" aria-hidden="true" />
              <div className="size-60 flex-center rounded-12 bg-blue-2 mb-20">
                <span className="text-blue-1 d-inline-flex">
                  <LuPlane size={24} />
                </span>
              </div>
              <h3 className="text-18 fw-500 text-dark-1">{option.title}</h3>
              <p className="text-15 text-light-1 mt-10">{option.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-50">
        <div className="sectionTitle -md">
          <h2 className="sectionTitle__title">What's Included</h2>
        </div>
        <div className="row y-gap-15 pt-20">
          {includes.map((item) => (
            <div className="col-sm-6" key={item}>
              <div className="d-flex items-center border-light rounded-8 px-20 py-15">
                <span className="text-blue-1 mr-15 d-inline-flex">
                  <FaCheck size={14} />
                </span>
                <span className="text-15 text-dark-1">{item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-50">
        <div className="sectionTitle -md">
          <h2 className="sectionTitle__title">Popular Routes</h2>
        </div>
        <div className="table-responsive mt-20">
          <table className="table-5 -border-bottom w-1/1">
            <thead>
              <tr>
                <th>Route</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {routes.map(([route, price]) => (
                <tr key={route}>
                  <td>{route}</td>
                  <td>{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
                  Smooth airport pickup from arrival to destination.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ServicePageShell>
  );
}
