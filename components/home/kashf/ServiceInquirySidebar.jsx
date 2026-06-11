"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FaCheck } from "@/components/shared/Icons";
import { submitInquiry } from "@/lib/inquiries";
import { trackContact } from "@/lib/analytics";
import { contact as staticContact } from "@/data/kashf";
import { useSettings } from "@/hooks/useSettings";

const ServiceInquirySidebar = ({ serviceSlug, serviceTitle }) => {
  const locale = useLocale();
  const tBooking = useTranslations("booking");
  const tServices = useTranslations("services");
  const { settings } = useSettings();
  const contact = settings?.contact || staticContact;
  const whatsappUrl = contact?.whatsapp || "https://wa.me/998901234567";

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
    setSubmitting(true);
    setError("");

    try {
      const result = await submitInquiry({
        ...formData,
        tourId: serviceSlug,
        tourTitle: serviceTitle,
        locale,
      });
      if (!result.success) {
        throw new Error(
          result.errorCode === "validation"
            ? Object.values(result.errors || {})[0]
            : "Failed to submit inquiry.",
        );
      }
      await trackContact({
        method: "form",
        source: "service_page",
        tourId: serviceSlug,
        tourTitle: serviceTitle,
        locale,
      });
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError?.message || "Failed to submit inquiry.");
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
        tourTitle: serviceTitle,
        locale,
      });
    } catch {}
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="d-flex justify-end js-pin-content">
      <div className="w-full" style={{ position: "sticky", top: "100px" }}>
        <div className="px-30 py-30 rounded-4 border-light bg-white shadow-4">
          <h3 className="text-24 fw-500 text-dark-1">
            {tServices("sidebarTitle")}
          </h3>

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
                <input
                  className="border-light rounded-4 h-50 px-20 w-1/1 text-15"
                  name="name"
                  placeholder={tBooking("name")}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-12">
                <input
                  className="border-light rounded-4 h-50 px-20 w-1/1 text-15"
                  name="phone"
                  placeholder={tBooking("phone")}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-12">
                <input
                  className="border-light rounded-4 h-50 px-20 w-1/1 text-15"
                  name="email"
                  type="email"
                  placeholder={tBooking("email")}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-12">
                <input
                  className="border-light rounded-4 h-50 px-20 w-1/1 text-15"
                  name="date"
                  type="date"
                  placeholder={tBooking("date")}
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-12">
                <textarea
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
                  {submitting ? tBooking("sending") : tBooking("submit")}
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
              <p className="text-15 mt-10">{serviceTitle}</p>
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
          {tServices("whatsappDirect")}
        </Link>
      </div>
    </div>
  );
};

export default ServiceInquirySidebar;
