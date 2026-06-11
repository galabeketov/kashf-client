"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FaCheck, FaStar } from "react-icons/fa";
import { submitReview } from "@/lib/reviews";

const ReviewForm = ({ type, tourId, tourTitle, onSuccess }) => {
  const locale = useLocale();
  const t = useTranslations("reviews");
  const [hovered, setHovered] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    rating: 0,
    text: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setFieldErrors({});

    setSubmitting(true);
    try {
      const result = await submitReview({
        type,
        tourId,
        tourTitle,
        name: formData.name,
        country: formData.country,
        rating: formData.rating,
        text: formData.text,
        locale,
      });
      if (!result.success) {
        if (result.errorCode === "validation") {
          setFieldErrors(result.errors || {});
          setError(Object.values(result.errors || {})[0] || "Check the form.");
          return;
        }
        throw new Error("Failed to submit review.");
      }
      setSubmitted(true);
      onSuccess?.();
    } catch (submitError) {
      setError(submitError?.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="border-light rounded-8 px-30 py-30">
        <div className="d-flex items-center text-green-2">
          <span className="text-20 mr-10 d-inline-flex">
            <FaCheck />
          </span>
          <div>
            <div className="text-18 fw-500">{t("successTitle")}</div>
            <div className="text-14 mt-5">{t("successText")}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-light rounded-8 px-30 py-30">
      <h3 className="text-22 fw-500">{t("writeReview")}</h3>

      <form className="row y-gap-20 pt-20" onSubmit={onSubmit}>
        {!!error && (
          <div className="col-12">
            <div className="bg-red-1-05 text-red-1 rounded-4 px-20 py-12">
              {error}
            </div>
          </div>
        )}

        <div className="col-12">
          <div className="text-14 fw-500 mb-10">Rating *</div>
          <div className="d-flex x-gap-8">
            {Array.from({ length: 5 }).map((_, index) => {
              const value = index + 1;
              const isFilled = (hovered || formData.rating) >= value;
              return (
                <button
                  type="button"
                  key={value}
                  onMouseEnter={() => setHovered(value)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, rating: value }))
                  }
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    color: isFilled ? "#C9A84C" : "#ddd",
                  }}
                  aria-label={`Rate ${value}`}
                  aria-pressed={formData.rating === value}
                >
                  <FaStar size={24} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-sm-6">
          <input
            className="border-light rounded-4 h-50 px-20 w-1/1 text-15"
            name="name"
            placeholder={t("yourName")}
            value={formData.name}
            onChange={onChange}
            required
            aria-invalid={Boolean(fieldErrors.name)}
          />
        </div>

        <div className="col-sm-6">
          <input
            className="border-light rounded-4 h-50 px-20 w-1/1 text-15"
            name="country"
            placeholder={t("yourCountry")}
            value={formData.country}
            onChange={onChange}
            required
            aria-invalid={Boolean(fieldErrors.country)}
          />
        </div>

        <div className="col-12">
          <textarea
            rows="4"
            className="border-light rounded-4 px-20 py-15 w-1/1 text-15"
            name="text"
            placeholder={t("yourReview")}
            value={formData.text}
            onChange={onChange}
            required
            aria-invalid={Boolean(fieldErrors.text)}
          />
        </div>

        <div className="col-12">
          <button
            className="travel-btn travel-btn--primary"
            type="submit"
            disabled={submitting}
          >
            {submitting ? t("submitting") : t("submit")}
          </button>
          <div className="text-13 text-light-1 mt-10">{t("moderated")}</div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
