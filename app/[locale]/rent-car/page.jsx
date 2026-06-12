"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import ServicePageShell from "@/components/home/travel-easy/ServicePageShell";
import {
  FaCheck,
  FaWhatsapp,
  FaTelegramPlane,
  FaInstagram,
  LuCar,
} from "@/components/shared/Icons";
import { contact as staticContact } from "@/data/travelEasy";
import { useSettings } from "@/hooks/useSettings";
import { normalizeContact } from "@/lib/content";
import { trackContact } from "@/lib/analytics";
import { RENTAL_CARS } from "@/data/services";

const withText = (url, text) =>
  `${url}${url.includes("?") ? "&" : "?"}text=${encodeURIComponent(text)}`;

export default function RentCarPage() {
  const locale = useLocale();
  const t = useTranslations("services");
  const navT = useTranslations("nav");
  const title = t("rentCar");
  const [selectedCar, setSelectedCar] = useState("");

  const { settings } = useSettings();
  const contact = normalizeContact(settings?.contact, staticContact);

  const carTranslations = t.raw("detail.rentCar.carList");
  const cars = RENTAL_CARS.map((car) => ({
    ...car,
    ...carTranslations[car.translationIndex],
    name: car.name,
    image: car.image,
    passengers: car.passengers,
  }));
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
      inquiryContext={selectedCar}
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
              <div
                className={`travel-car-card h-100${selectedCar === car.name ? " is-selected" : ""}`}
              >
                <span className="uzbek-dome-ornament" aria-hidden="true" />
                <div className="travel-car-card__image">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 991px) 100vw, 420px"
                  />
                </div>

                <div className="travel-car-card__body">
                  <div className="d-flex items-start justify-between x-gap-15">
                    <div>
                      <h3 className="text-20 fw-600 text-dark-1">{car.name}</h3>
                      <div className="text-14 text-light-1 mt-4">{car.type}</div>
                    </div>
                    <span className="travel-car-card__passengers">
                      {car.passengers} {passengersLabel}
                    </span>
                  </div>

                  <p className="text-14 text-light-1 mt-14">{car.bestFor}</p>

                  <div className="d-flex items-center x-gap-10 pt-20">
                    <button
                      type="button"
                      className="travel-car-card__select"
                      aria-pressed={selectedCar === car.name}
                      onClick={() => setSelectedCar(car.name)}
                    >
                      <LuCar size={16} />
                      {selectedCar === car.name
                        ? t("detail.rentCar.selectedCar")
                        : t("detail.rentCar.selectCar")}
                    </button>
                    <a
                      href={carUrl(car.name, "whatsapp")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="travel-contact-icon is-whatsapp"
                      aria-label={`WhatsApp - ${car.name}`}
                      onClick={trackCar(car.name, "whatsapp")}
                    >
                      <FaWhatsapp size={17} />
                    </a>
                    <a
                      href={carUrl(car.name, "telegram")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="travel-contact-icon is-telegram"
                      aria-label={`Telegram - ${car.name}`}
                      onClick={trackCar(car.name, "telegram")}
                    >
                      <FaTelegramPlane size={17} />
                    </a>
                    <a
                      href={carUrl(car.name, "instagram")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="travel-contact-icon is-instagram"
                      aria-label={`Instagram - ${car.name}`}
                      onClick={trackCar(car.name, "instagram")}
                    >
                      <FaInstagram size={17} />
                    </a>
                  </div>
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
