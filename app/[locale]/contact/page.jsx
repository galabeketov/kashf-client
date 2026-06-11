"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import KashfHeader from "@/components/header/header-kashf";
import KashfFooter from "@/components/footer/kashf";
import {
  FaCheck,
  FaFacebook,
  FaInstagram,
  FaTelegramPlane,
  FaWhatsapp,
  LuMail,
  LuMapPin,
  LuPhone,
} from "@/components/shared/Icons";
import { contact as staticContact } from "@/data/kashf";
import { submitInquiry } from "@/lib/inquiries";
import { useSettings } from "@/hooks/useSettings";
import { trackContact } from "@/lib/analytics";

export default function ContactPage() {
  const locale = useLocale();
  const t = useTranslations("contact");
  const navT = useTranslations("nav");
  const tBooking = useTranslations("booking");
  const { settings } = useSettings();
  const contact = settings?.contact || staticContact;
  const location =
    contact?.location?.[locale] || contact?.location?.en || contact.location;
  const socialLinks = [
    {
      key: "whatsapp",
      href: contact?.whatsapp,
      label: "WhatsApp",
      className: "whatsapp",
      icon: <FaWhatsapp size={18} />,
    },
    {
      key: "telegram",
      href: contact?.telegram,
      label: "Telegram",
      className: "telegram",
      icon: <FaTelegramPlane size={18} />,
    },
    {
      key: "facebook",
      href: contact?.facebook,
      label: "Facebook",
      className: "facebook",
      icon: <FaFacebook size={18} />,
    },
    {
      key: "instagram",
      href: contact?.instagram,
      label: "Instagram",
      className: "instagram",
      icon: <FaInstagram size={18} />,
    },
  ].filter((item) => !!item.href);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setFieldErrors({});

    try {
      const result = await submitInquiry({
        ...formData,
        tourId: "",
        tourTitle: "General Inquiry",
        locale,
      });
      if (!result.success) {
        if (result.errorCode === "validation") {
          setFieldErrors(result.errors || {});
          setError(Object.values(result.errors || {})[0] || "Check the form.");
          return;
        }
        throw new Error("Failed to submit inquiry.");
      }
      await trackContact({
        method: "form",
        source: "contact_page",
        tourId: null,
        tourTitle: null,
        locale,
      });
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError?.message || "Failed to submit inquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleContactClick =
    (method, href, target = "_self") =>
    async (event) => {
      event.preventDefault();
      const allowedMethods = ["whatsapp", "telegram", "email", "phone", "form"];
      try {
        if (allowedMethods.includes(method)) {
          await trackContact({
            method,
            source: "contact_page",
            tourId: null,
            tourTitle: null,
            locale,
          });
        }
      } catch {}

      if (target === "_blank") {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }
      window.location.href = href;
    };

  return (
    <>
      <KashfHeader />

      <section
        style={{
          background: "linear-gradient(135deg, #051036 0%, #0d2268 100%)",
          paddingTop: "130px",
          paddingBottom: "60px",
        }}
      >
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-lg-8">
              <h1
                className="text-50 lg:text-40 md:text-30 text-white"
                data-aos="fade-up"
              >
                {t("pageTitle")}
              </h1>
              <p
                className="text-white mt-15"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {t("pageSubtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-light-2">
        <div className="container">
          <div className="row x-gap-10 y-gap-10 items-center text-14 text-light-1">
            <div className="col-auto">
              <Link href={`/${locale}`} className="text-dark-1">
                {navT("home")}
              </Link>
            </div>
            <div className="col-auto">&gt;</div>
            <div className="col-auto">
              <span className="text-dark-1">{navT("contact")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-lg-4" data-aos="fade-up">
              <h2 className="text-30">{t("title")}</h2>

              <div className="d-flex items-start border-light rounded-8 px-20 py-20 mb-20 mt-30">
                <div className="size-50 flex-center rounded-full bg-blue-2 mr-15">
                  <LuPhone size={20} className="text-blue-1" />
                </div>
                <div>
                  <div className="text-13 text-light-1">{t("phone")}</div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-16 fw-500 text-dark-1"
                    onClick={handleContactClick(
                      "phone",
                      `tel:${contact.phone}`,
                    )}
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              <div className="d-flex items-start border-light rounded-8 px-20 py-20 mb-20">
                <div className="size-50 flex-center rounded-full bg-blue-2 mr-15">
                  <LuMail size={20} className="text-blue-1" />
                </div>
                <div>
                  <div className="text-13 text-light-1">{t("email")}</div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-16 fw-500 text-dark-1"
                    onClick={handleContactClick(
                      "email",
                      `mailto:${contact.email}`,
                    )}
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="d-flex items-start border-light rounded-8 px-20 py-20 mb-20">
                <div className="size-50 flex-center rounded-full bg-blue-2 mr-15">
                  <LuMapPin size={20} className="text-blue-1" />
                </div>
                <div>
                  <div className="text-13 text-light-1">{t("location")}</div>
                  <span className="text-16 fw-500 text-dark-1">{location}</span>
                </div>
              </div>

              <Link
                href={contact.whatsapp || "https://wa.me/998901234567"}
                target="_blank"
                rel="noopener noreferrer"
                className="button -md -blue-1 bg-blue-1 text-white col-12 h-60 mt-20"
                onClick={handleContactClick(
                  "whatsapp",
                  contact.whatsapp || "https://wa.me/998901234567",
                  "_blank",
                )}
              >
                {t("whatsappBtn")}
              </Link>

              <div className="mt-20">
                <div className="text-14 text-light-1 mb-10">Social</div>
                <div className="d-flex x-gap-12">
                  {socialLinks.map((item) => (
                    <a
                      key={item.key}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-icon ${item.className}`}
                      aria-label={item.label}
                      onClick={handleContactClick(
                        item.key,
                        item.href,
                        "_blank",
                      )}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="col-lg-7 offset-lg-1"
              data-aos="fade-up"
              data-aos-delay="100"
              id="write-review"
            >
              <div className="border-light rounded-8 px-40 py-40 shadow-2">
                <h3 className="text-24 fw-500">{t("formTitle")}</h3>

                {!submitted ? (
                  <form className="row y-gap-20 pt-30" onSubmit={handleSubmit}>
                    {!!error && (
                      <div className="col-12">
                        <div className="bg-red-1-05 text-red-1 rounded-4 px-20 py-12">
                          {error}
                        </div>
                      </div>
                    )}
                    <div className="col-sm-6">
                      <input
                        className="border-light rounded-4 h-50 px-20 w-1/1 text-15"
                        name="name"
                        placeholder={tBooking("name")}
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        aria-invalid={Boolean(fieldErrors.name)}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        className="border-light rounded-4 h-50 px-20 w-1/1 text-15"
                        name="phone"
                        placeholder={tBooking("phone")}
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        aria-invalid={Boolean(fieldErrors.phone)}
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
                        aria-invalid={Boolean(fieldErrors.email)}
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        rows="6"
                        className="border-light rounded-4 px-20 py-15 w-1/1 text-15"
                        name="message"
                        placeholder={tBooking("message")}
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12">
                      <button
                        className="travel-btn travel-btn--primary"
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
                      {t("successTitle")}
                    </h4>
                    <p className="text-15 mt-10">{t("successText")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <KashfFooter />
    </>
  );
}
