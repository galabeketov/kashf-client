"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import ServicePageShell from "@/components/home/kashf/ServicePageShell";
import { FaCheck, LuCar } from "@/components/shared/Icons";

const vehicleTypes = [
  {
    name: "Sedan",
    passengers: "1-3 pax",
    bestFor: "City trips and airport runs",
    price: "From $40/day",
  },
  {
    name: "SUV",
    passengers: "1-4 pax",
    bestFor: "Mountain and city travel",
    price: "From $60/day",
  },
  {
    name: "Minivan",
    passengers: "1-7 pax",
    bestFor: "Family and group trips",
    price: "From $80/day",
  },
];

const includes = [
  "Fuel",
  "Insurance",
  "Driver (optional)",
  "Airport pickup",
  "24/7 support",
  "All destinations",
];

const steps = ["Contact us", "Choose vehicle", "Enjoy your ride"];

export default function RentCarPage() {
  const locale = useLocale();
  const t = useTranslations("services");
  const navT = useTranslations("nav");
  const title = t("rentCar");

  return (
    <ServicePageShell
      serviceSlug="rent-car"
      serviceTitle={title}
      heroTitle={title}
      heroSubtitle={t("rentCarDesc")}
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
        <h2 className="sectionTitle__title">About Rent a Car</h2>
        <p className="sectionTitle__text mt-5 sm:mt-0">
          Comfortable private vehicles for any trip in Uzbekistan. Sedans, SUVs,
          and minivans available with or without driver.
        </p>
      </div>

      <div className="row y-gap-30 pt-30">
        {vehicleTypes.map((vehicle) => (
          <div className="col-lg-4 col-sm-6" key={vehicle.name}>
            <div className="border-light rounded-8 px-20 py-20 h-100 position-relative">
              <span className="uzbek-dome-ornament" aria-hidden="true" />
              <div className="size-60 flex-center rounded-12 bg-blue-2 mb-20">
                <span className="text-blue-1 d-inline-flex">
                  <LuCar size={24} />
                </span>
              </div>
              <h3 className="text-18 fw-500 text-dark-1">{vehicle.name}</h3>
              <div className="text-14 text-light-1 mt-5">
                {vehicle.passengers}
              </div>
              <p className="text-14 text-light-1 mt-10">{vehicle.bestFor}</p>
              <div className="text-16 fw-500 text-blue-1 mt-15">
                {vehicle.price}
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
                  Simple booking and flexible vehicle options.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ServicePageShell>
  );
}
