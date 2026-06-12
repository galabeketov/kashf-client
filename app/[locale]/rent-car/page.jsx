"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import ServicePageShell from "@/components/home/kashf/ServicePageShell";
import {
  FaCheck,
  FaWhatsapp,
  FaTelegramPlane,
  FaInstagram,
  LuCar,
} from "@/components/shared/Icons";
import { contact as staticContact } from "@/data/kashf";
import { useSettings } from "@/hooks/useSettings";
import { normalizeContact } from "@/lib/content";
import { trackContact } from "@/lib/analytics";

const withText = (url, text) =>
  `${url}${url.includes("?") ? "&" : "?"}text=${encodeURIComponent(text)}`;

export default function RentCarPage() {
  const locale = useLocale();
  const t = useTranslations("services");
  const navT = useTranslations("nav");
  const title = t("rentCar");

  const { settings } = useSettings();
  const contact = normalizeContact(settings?.contact, staticContact);

  const cars = t.raw("detail.rentCar.carList");
  const includes = t.raw("detail.rentCar.includes");
  const steps = t.raw("detail.rentCar.steps");
  const passengersLabel = t("detail.rentCar.passengersLabel");

  const carUrl = (carName, method) => {
    const message =
      locale === "uz"
        ? `Assalomu alaykum! Men "${carName}" avtomobilini ijaraga olmoqchiman.`
        : locale === "ru"
          ? `Здравствуйте! Хочу арендовать автомобиль «${carName}».`
          : `Hello! I'd like to rent the "${carName}".`;

    if (method === "whatsapp") return withText(contact.whatsapp, message);
    if (method === "telegram") return contact.telegram;
    return contact.instagram;
  };

  const trackCar = (carName, method) => () => {
    trackContact({
      method,
      source: "rent_car",
      tourId: "rent-car",
      tourTitle: carName,
      locale,
    }).catch(() => {});
  };

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
        <h2 className="sectionTitle__title">{t("detail.rentCar.aboutTitle")}</h2>
        <p className="sectionTitle__text mt-5 sm:mt-0">
          {t("detail.rentCar.aboutText")}
        </p>
      </div>

      <div className="pt-30">
        <div className="sectionTitle -md">
          <h2 className="sectionTitle__title">
            {t("detail.rentCar.vehiclesTitle")}
          </h2>
          <p className="sectionTitle__text mt-5 sm:mt-0">
            {t("detail.rentCar.vehiclesSubtitle")}
          </p>
        </div>

        <div className="row y-gap-30 pt-30">
          {cars.map((car) => (
            <div className="col-lg-6" key={car.name}>
              <div className="border-light rounded-8 px-20 py-20 h-100 position-relative">
                <span className="uzbek-dome-ornament" aria-hidden="true" />
                <div className="d-flex items-center">
                  <div className="size-60 flex-center rounded-12 bg-blue-2 mr-15">
                    <span className="text-blue-1 d-inline-flex">
                      <LuCar size={24} />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-18 fw-500 text-dark-1">{car.name}</h3>
                    <div className="text-14 text-light-1">{car.type}</div>
                  </div>
                </div>

                <div className="d-flex items-center justify-between mt-15 text-14 text-light-1">
                  <span>{car.bestFor}</span>
                  <span className="text-dark-1 fw-500">
                    {car.passengers} {passengersLabel}
                  </span>
                </div>

                <div className="d-flex items-center x-gap-10 pt-20">
                  <a
                    href={carUrl(car.name, "whatsapp")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button -sm bg-blue-1 text-white px-20 py-10"
                    onClick={trackCar(car.name, "whatsapp")}
                  >
                    <FaWhatsapp size={15} className="mr-10" />
                    {t("detail.rentCar.requestCar")}
                  </a>
                  <a
                    href={carUrl(car.name, "telegram")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-40 flex-center rounded-full bg-blue-2 text-blue-1"
                    aria-label="Telegram"
                    onClick={trackCar(car.name, "telegram")}
                  >
                    <FaTelegramPlane size={16} />
                  </a>
                  <a
                    href={carUrl(car.name, "instagram")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-40 flex-center rounded-full bg-blue-2 text-blue-1"
                    aria-label="Instagram"
                    onClick={trackCar(car.name, "instagram")}
                  >
                    <FaInstagram size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-50">
        <div className="sectionTitle -md">
          <h2 className="sectionTitle__title">
            {t("detail.rentCar.includesTitle")}
          </h2>
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
          <h2 className="sectionTitle__title">
            {t("detail.rentCar.stepsTitle")}
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
