"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  FaCheck,
  FaWhatsapp,
  FaTelegramPlane,
  FaInstagram,
} from "@/components/shared/Icons";
import { submitInquiry } from "@/lib/inquiries";
import { trackContact } from "@/lib/analytics";
import { contact as staticContact } from "@/data/travelEasy";
import { useSettings } from "@/hooks/useSettings";
import { normalizeContact } from "@/lib/content";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const ServiceInquirySidebar = ({
  serviceSlug,
  serviceTitle,
  inquiryContext = "",
}) => {
  const locale = useLocale();
  const tBooking = useTranslations("booking");
  const tServices = useTranslations("services");
  const { settings } = useSettings();
  const contact = normalizeContact(settings?.contact, staticContact);
  const whatsappUrl = contact.whatsapp;
  const telegramUrl = contact.telegram;
  const instagramUrl = contact.instagram;
  const requestTitle = inquiryContext
    ? `${serviceTitle}: ${inquiryContext}`
    : serviceTitle;
  const messengerText = tServices("messengerTemplate", {
    service: serviceTitle,
    selection: inquiryContext || tServices("selectionNotSet"),
  });

  const trackAndOpen = (method) => () => {
    trackContact({
      method,
      source: "service_page",
      tourId: serviceSlug,
      tourTitle: requestTitle,
      locale,
    }).catch(() => {});
  };

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const result = await submitInquiry({
        ...formData,
        message: [inquiryContext, formData.message].filter(Boolean).join("\n\n"),
        tourId: serviceSlug,
        tourTitle: requestTitle,
        locale,
      });
      if (!result.success) {
        const validationField = Object.keys(result.errors || {})[0];
        throw new Error(
          result.errorCode === "validation"
            ? tBooking(`errors.${validationField}`)
            : tBooking("errors.submit"),
        );
      }
      await trackContact({
        method: "form",
        source: "service_page",
        tourId: serviceSlug,
        tourTitle: requestTitle,
        locale,
      });
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError?.message || tBooking("errors.submit"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsApp = async (event) => {
    event.preventDefault();
    try {
      await trackContact({
        method: "whatsapp",
        source: "service_page",
        tourId: serviceSlug,
        tourTitle: requestTitle,
        locale,
      });
    } catch {}
    window.open(
      createWhatsAppUrl(whatsappUrl, messengerText),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="d-flex justify-end js-pin-content">
      <div className="w-full travel-service-sidebar">
        <div className="px-30 py-30 rounded-4 border-light bg-white shadow-4">
          <h3 className="text-24 fw-500 text-dark-1">
            {tServices("sidebarTitle")}
          </h3>
          <p className="text-14 text-light-1 mt-8">
            {tServices("noPriceNote")}
          </p>

          {inquiryContext ? (
            <div className="travel-inquiry-context mt-20" aria-live="polite">
              <span>{tServices("selectedLabel")}</span>
              <strong>{inquiryContext}</strong>
            </div>
          ) : null}

          {!submitted ? (
            <form className="row y-gap-20 pt-30" onSubmit={handleSubmit}>
              {!!error && (
                <div className="col-12">
                  <div className="bg-red-1-05 text-red-1 rounded-4 px-20 py-12">
                    {error}
                  </div>
                </div>
              )}

              <div className="col-12">
                <label className="travel-field-label" htmlFor={`${serviceSlug}-name`}>
                  {tBooking("name")}
                </label>
                <input
                  id={`${serviceSlug}-name`}
                  className="border-light rounded-4 h-50 px-20 w-1/1 text-15"
                  name="name"
                  placeholder={tBooking("name")}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-12">
                <label className="travel-field-label" htmlFor={`${serviceSlug}-phone`}>
                  {tBooking("phone")}
                </label>
                <input
                  id={`${serviceSlug}-phone`}
                  className="border-light rounded-4 h-50 px-20 w-1/1 text-15"
                  name="phone"
                  placeholder={tBooking("phone")}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-12">
                <label className="travel-field-label" htmlFor={`${serviceSlug}-email`}>
                  {tBooking("email")}
                </label>
                <input
                  id={`${serviceSlug}-email`}
                  className="border-light rounded-4 h-50 px-20 w-1/1 text-15"
                  name="email"
                  type="email"
                  placeholder={tBooking("email")}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-12">
                <label className="travel-field-label" htmlFor={`${serviceSlug}-date`}>
                  {tBooking("date")}
                </label>
                <input
                  id={`${serviceSlug}-date`}
                  className="border-light rounded-4 h-50 px-20 w-1/1 text-15"
                  name="date"
                  type="date"
                  placeholder={tBooking("date")}
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-12">
                <label className="travel-field-label" htmlFor={`${serviceSlug}-message`}>
                  {tBooking("message")}
                </label>
                <textarea
                  id={`${serviceSlug}-message`}
                  rows="5"
                  className="border-light rounded-4 px-20 py-15 w-1/1 text-15"
                  name="message"
                  placeholder={tBooking("message")}
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-12">
                <button
                  className="button -md -dark-1 bg-blue-1 text-white h-60 px-40 col-12"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting
                    ? tBooking("sending")
                    : tBooking("serviceSubmit")}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-40">
              <div className="size-60 rounded-full bg-blue-1-05 flex-center mx-auto">
                <span className="text-blue-1 d-inline-flex">
                  <FaCheck size={24} />
                </span>
              </div>
              <h4 className="text-22 fw-500 mt-20">
                {tServices("requestSent")}
              </h4>
              <p className="text-15 mt-10">{requestTitle}</p>
              <p className="text-14 text-light-1 mt-8">
                {tBooking("successText")}
              </p>
              <a
                href={createWhatsAppUrl(whatsappUrl, messengerText)}
                target="_blank"
                rel="noopener noreferrer"
                className="button -md bg-blue-1 text-white mt-20"
                onClick={handleWhatsApp}
              >
                <FaWhatsapp size={18} className="mr-10" />
                {tServices("whatsappDirect")}
              </a>
            </div>
          )}
        </div>

        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button -md bg-blue-1 text-white h-60 col-12 mt-15"
          onClick={handleWhatsApp}
        >
          <FaWhatsapp size={18} className="mr-10" />
          {tServices("whatsappDirect")}
        </Link>

        <div className="d-flex x-gap-10 mt-15">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button -md border-light text-dark-1 h-50 col-6"
            onClick={trackAndOpen("telegram")}
          >
            <FaTelegramPlane size={17} className="mr-10" />
            {tServices("telegramLabel")}
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button -md border-light text-dark-1 h-50 col-6"
            onClick={trackAndOpen("instagram")}
          >
            <FaInstagram size={17} className="mr-10" />
            {tServices("instagram")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceInquirySidebar;
