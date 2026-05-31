"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import ServicePageShell from "@/components/home/kashf/ServicePageShell";
import { FaCheck, LuUser } from "@/components/shared/Icons";

const packages = [
  {
    name: "Half Day",
    hours: "4 hours",
    text: "City only",
    price: "From $25",
  },
  {
    name: "Full Day",
    hours: "8 hours",
    text: "Any destination",
    price: "From $45",
  },
  {
    name: "Multi Day",
    hours: "Custom",
    text: "Uzbekistan-wide",
    price: "Contact for price",
  },
];

const includes = [
  "Professional driver",
  "Comfortable vehicle",
  "Fuel included",
  "Flexible itinerary",
  "English/Russian speaking",
];

const chips = [
  "City sightseeing",
  "Shopping trips",
  "Day trips",
  "Business meetings",
  "Family travel",
  "Photography tours",
];

export default function DriverPage() {
  const locale = useLocale();
  const t = useTranslations("services");
  const navT = useTranslations("nav");
  const title = t("driver");

  return (
    <ServicePageShell
      serviceSlug="driver"
      serviceTitle={title}
      heroTitle={title}
      heroSubtitle={t("driverDesc")}
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
        <h2 className="sectionTitle__title">About Personal Driver</h2>
        <p className="sectionTitle__text mt-5 sm:mt-0">
          Professional personal driver service for individuals and families.
          Half-day, full-day, or multi-day bookings.
        </p>
      </div>

      <div className="row y-gap-30 pt-30">
        {packages.map((pkg) => (
          <div className="col-md-4" key={pkg.name}>
            <div className="border-light rounded-8 px-20 py-20 h-100 position-relative">
              <span className="uzbek-dome-ornament" aria-hidden="true" />
              <div className="size-60 flex-center rounded-12 bg-blue-2 mb-20">
                <span className="text-blue-1 d-inline-flex">
                  <LuUser size={24} />
                </span>
              </div>
              <h3 className="text-18 fw-500 text-dark-1">{pkg.name}</h3>
              <div className="text-14 text-light-1 mt-5">{pkg.hours}</div>
              <p className="text-15 text-light-1 mt-10">{pkg.text}</p>
              <div className="text-16 fw-500 text-blue-1 mt-15">
                {pkg.price}
              </div>
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
          <h2 className="sectionTitle__title">Popular Uses</h2>
        </div>
        <div className="d-flex flex-wrap x-gap-10 y-gap-10 pt-20">
          {chips.map((chip) => (
            <span
              key={chip}
              className="px-20 py-10 rounded-full bg-blue-2 text-14 text-dark-1"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </ServicePageShell>
  );
}
