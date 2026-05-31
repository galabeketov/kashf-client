"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import ServicePageShell from "@/components/home/kashf/ServicePageShell";
import { FaLanguage, LuCar, LuMapPin, LuUser } from "@/components/shared/Icons";

const services = [
  {
    icon: "language",
    title: "Interpretation",
    text: "EN/RU/UZ, business meetings, conferences",
  },
  {
    icon: "map",
    title: "Venue booking",
    text: "Conference rooms, restaurants, hotels",
  },
  {
    icon: "car",
    title: "Business transport",
    text: "Airport transfer, inter-city, multi-day",
  },
  {
    icon: "assistant",
    title: "Personal assistant",
    text: "Full-day support, scheduling, coordination",
  },
];

const reasons = ["Local knowledge", "Multi-language", "Professional service"];

export default function BusinessPage() {
  const locale = useLocale();
  const t = useTranslations("services");
  const navT = useTranslations("nav");
  const title = t("business");
  const serviceIcons = {
    language: <FaLanguage size={24} />,
    map: <LuMapPin size={24} />,
    car: <LuCar size={24} />,
    assistant: <LuUser size={24} />,
  };

  return (
    <ServicePageShell
      serviceSlug="business"
      serviceTitle={title}
      heroTitle={title}
      heroSubtitle={t("businessDesc")}
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
        <h2 className="sectionTitle__title">About Business Support</h2>
        <p className="sectionTitle__text mt-5 sm:mt-0">
          Professional business support for foreign companies and delegations
          visiting Uzbekistan. Interpretation, logistics, venue booking.
        </p>
      </div>

      <div className="row y-gap-30 pt-30">
        {services.map((item) => (
          <div className="col-sm-6" key={item.title}>
            <div className="featureIcon -type-1 h-100 position-relative">
              <span className="uzbek-dome-ornament" aria-hidden="true" />
              <div className="d-flex justify-center">
                <div className="size-60 flex-center rounded-12 bg-blue-2">
                  <span className="text-blue-1 d-inline-flex">
                    {serviceIcons[item.icon]}
                  </span>
                </div>
              </div>
              <div className="text-center mt-30">
                <h4 className="text-18 fw-500">{item.title}</h4>
                <p className="text-15 mt-10 text-light-1">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-50">
        <div className="sectionTitle -md">
          <h2 className="sectionTitle__title">Why Choose Us</h2>
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
        <div className="border-light rounded-8 px-30 py-30 bg-blue-2">
          <h3 className="text-20 fw-500 text-dark-1">Past Clients</h3>
          <p className="text-15 mt-10 text-light-1">
            We have assisted delegations from Germany, South Korea, UAE, and
            Russia.
          </p>
        </div>
      </div>
    </ServicePageShell>
  );
}
