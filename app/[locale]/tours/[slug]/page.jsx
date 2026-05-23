"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import KashfHeader from "@/components/header/header-kashf";
import KashfFooter from "@/components/footer/kashf";
import { getTourById } from "@/lib/tours";
import { submitInquiry } from "@/lib/inquiries";

const locationById = {
  "4-days-uzbekistan-highlights": "Tashkent, Samarkand, Amirsoy",
  "7-days-grand-uzbekistan-escape": "Tashkent, Samarkand, Shakhrisabz, Bukhara",
  "10-days-legendary-adventure": "Tashkent, Samarkand, Bukhara, Khiva, Urganch",
  "custom-private-tour": "Flexible across Uzbekistan",
};

const localizedTourText = (value, locale) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value?.[locale] || value?.en || value?.uz || value?.ru || "";
};

export default function TourDetailsPage() {
  const { slug } = useParams();
  const locale = useLocale();
  const tTours = useTranslations("tours");
  const tBooking = useTranslations("booking");
  const tNav = useTranslations("nav");

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    groupSize: "",
    message: "",
  });

  useEffect(() => {
    let isMounted = true;

    const loadTour = async () => {
      if (!slug) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const slugValue = Array.isArray(slug) ? slug[0] : slug;
        const firestoreTour = await getTourById(slugValue);
        if (!isMounted) return;
        setTour(firestoreTour);
      } catch {
        if (!isMounted) return;
        setTour(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTour();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await submitInquiry({
        ...formData,
        tourId: Array.isArray(slug) ? slug[0] : slug,
        tourTitle: localizedTourText(tour?.title, locale),
        locale,
      });
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError?.message || "Failed to submit inquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <KashfHeader />
        <section
          className="layout-pt-xl layout-pb-xl"
          style={{ marginTop: "90px" }}
        >
          <div className="container">
            <div
              style={{
                height: "420px",
                borderRadius: "12px",
                background: "#f5f5f5",
                animation: "kashfDetailPulse 1.4s ease-in-out infinite",
              }}
            />
          </div>
        </section>
        <KashfFooter />
        <style jsx global>{`
          @keyframes kashfDetailPulse {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
            100% {
              opacity: 1;
            }
          }
        `}</style>
      </>
    );
  }

  if (!tour) {
    return (
      <>
        <KashfHeader />
        <section className="layout-pt-xl layout-pb-xl">
          <div className="container text-center">
            <h1 className="text-30 fw-600">Tour not found</h1>
            <Link
              href={`/${locale}/tours`}
              className="button -md bg-blue-1 text-white mt-20"
            >
              Back to tours
            </Link>
          </div>
        </section>
        <KashfFooter />
      </>
    );
  }

  const selectedImage = tour.images?.[activeImage] || tour.images?.[0];
  const tourTitle = localizedTourText(tour.title, locale);
  const tourDescription = localizedTourText(tour.description, locale);
  const tourIncludes =
    tour.includes?.[locale] ||
    tour.includes?.en ||
    (Array.isArray(tour.includes) ? tour.includes : []);
  const itinerary = Array.isArray(tour.itinerary) ? tour.itinerary : [];

  return (
    <>
      <KashfHeader />

      <section className="py-10 bg-light-2" style={{ marginTop: "90px" }}>
        <div className="container">
          <div className="row x-gap-10 y-gap-10 items-center text-14 text-light-1">
            <div className="col-auto">
              <Link href={`/${locale}`} className="text-dark-1">
                {tNav("home")}
              </Link>
            </div>
            <div className="col-auto">&gt;</div>
            <div className="col-auto">
              <Link href={`/${locale}/tours`} className="text-dark-1">
                {tTours("pageTitle")}
              </Link>
            </div>
            <div className="col-auto">&gt;</div>
            <div className="col-auto">
              <span className="text-dark-1">{tourTitle}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-sm">
        <div className="container">
          <h1 className="text-30 sm:text-25 fw-600">{tourTitle}</h1>

          <div className="row x-gap-20 y-gap-10 items-center pt-10">
            <div className="col-auto">
              <div className="d-flex x-gap-5 items-center">
                <i className="icon-star text-10 text-yellow-1" />
                <i className="icon-star text-10 text-yellow-1" />
                <i className="icon-star text-10 text-yellow-1" />
                <i className="icon-star text-10 text-yellow-1" />
                <i className="icon-star text-10 text-yellow-1" />
                <span className="text-14 ml-5">5.0</span>
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center text-14">
                <i className="icon-clock text-blue-1 mr-8" />
                <span>
                  {tour.duration === 0
                    ? tTours("filterAll")
                    : `${tour.duration} ${tTours("days")}`}
                </span>
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center text-14">
                <i className="icon-location-2 text-blue-1 mr-8" />
                <span>{locationById[tour.id] || "Uzbekistan"}</span>
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center text-14">
                <i className="icon-customer text-blue-1 mr-8" />
                <span>Private Tour</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pb-md">
        <div className="container">
          <div
            className="rounded-8 overflow-hidden"
            style={{ height: "460px" }}
          >
            <Image
              src={selectedImage || "/img/tours/1.png"}
              alt={tourTitle}
              width={1200}
              height={460}
              className="col-12 h-full object-cover"
            />
          </div>

          <div className="row x-gap-10 y-gap-10 pt-15">
            {(tour.images || []).map((img, idx) => (
              <div className="col-auto" key={`${img}-${idx}`}>
                <button
                  className={`rounded-4 overflow-hidden border ${activeImage === idx ? "border-blue-1" : "border-light"}`}
                  onClick={() => setActiveImage(idx)}
                >
                  <Image
                    src={img}
                    alt={`${tourTitle}-${idx}`}
                    width={110}
                    height={80}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-lg-8">
              <div className="border-top-light pt-30">
                <h2 className="text-22 fw-500">Tour Snapshot</h2>
                <div className="row y-gap-30 justify-between pt-20">
                  <div className="col-md-auto col-6">
                    <div className="d-flex">
                      <i className="icon-clock text-22 text-blue-1 mr-10" />
                      <div className="text-15 lh-15">
                        {tTours("duration")}
                        <br />
                        {tour.duration === 0
                          ? tTours("filterAll")
                          : `${tour.duration} ${tTours("days")}`}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-auto col-6">
                    <div className="d-flex">
                      <i className="icon-customer text-22 text-blue-1 mr-10" />
                      <div className="text-15 lh-15">
                        {tTours("groupSize")}
                        <br />
                        Private
                      </div>
                    </div>
                  </div>

                  <div className="col-md-auto col-6">
                    <div className="d-flex">
                      <i className="icon-route text-22 text-blue-1 mr-10" />
                      <div className="text-15 lh-15">
                        {tTours("destination")}
                        <br />
                        Uzbekistan
                      </div>
                    </div>
                  </div>

                  <div className="col-md-auto col-6">
                    <div className="d-flex">
                      <i className="icon-world text-22 text-blue-1 mr-10" />
                      <div className="text-15 lh-15">
                        {tTours("language")}
                        <br />
                        English, Russian, Uzbek
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-top-light pt-40 mt-40">
                <h2 className="text-22 fw-500">{tTours("overview")}</h2>
                <p className="text-15 mt-20">{tourDescription}</p>
              </div>

              <div className="border-top-light pt-40 mt-40">
                <h2 className="text-22 fw-500">{tTours("included")}</h2>
                <div className="row y-gap-10 pt-20">
                  {tourIncludes.map((item) => (
                    <div className="col-md-6" key={`${tour.id}-${item}`}>
                      <div className="d-flex items-center text-15">
                        <div className="size-26 rounded-full bg-blue-1-05 flex-center mr-10">
                          <i className="icon-check text-blue-1 text-12" />
                        </div>
                        <span>{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-top-light pt-40 mt-40">
                <h2 className="text-22 fw-500">{tTours("itinerary")}</h2>
                <div className="row y-gap-30 pt-20">
                  {itinerary.map((day, idx) => (
                    <div className="col-12" key={`${tour.id}-${idx}`}>
                      <div className="d-flex">
                        <div className="d-flex flex-column items-center mr-20">
                          <div className="size-40 flex-center bg-blue-2 text-blue-1 rounded-full">
                            <div className="text-14 fw-500">{idx + 1}</div>
                          </div>
                          {idx !== itinerary.length - 1 && (
                            <div
                              className="bg-border mt-10"
                              style={{ width: "2px", height: "56px" }}
                            />
                          )}
                        </div>

                        <div>
                          <div className="text-16 lh-15 fw-500">
                            {localizedTourText(day.title, locale)}
                          </div>
                          <div className="text-14 lh-17 text-light-1 mt-10">
                            {localizedTourText(day.description, locale)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div style={{ position: "sticky", top: "100px" }}>
                <div className="px-30 py-30 rounded-4 border-light bg-white shadow-4">
                  <div className="text-14 text-light-1">
                    {tTours("from")}
                    <span className="text-20 fw-500 text-dark-1 ml-5">
                      US${tour.price}
                    </span>
                    <span className="ml-5">/ {tTours("perPerson")}</span>
                  </div>

                  {!submitted ? (
                    <form
                      className="row y-gap-20 pt-30"
                      onSubmit={handleSubmit}
                    >
                      <div className="col-12">
                        {!!error && (
                          <div className="bg-red-1-05 text-red-1 rounded-4 px-20 py-12">
                            {error}
                          </div>
                        )}
                      </div>
                      <div className="col-12">
                        <input
                          className="border-light rounded-4 px-20 py-10 w-1/1"
                          name="name"
                          placeholder={tBooking("name")}
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <input
                          className="border-light rounded-4 px-20 py-10 w-1/1"
                          name="phone"
                          placeholder={tBooking("phone")}
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <input
                          className="border-light rounded-4 px-20 py-10 w-1/1"
                          name="email"
                          type="email"
                          placeholder={tBooking("email")}
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-12">
                        <input
                          className="border-light rounded-4 px-20 py-10 w-1/1"
                          name="date"
                          type="date"
                          aria-label={tBooking("date")}
                          value={formData.date}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-12">
                        <select
                          className="border-light rounded-4 px-20 py-10 w-1/1"
                          name="groupSize"
                          value={formData.groupSize}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>
                            {tBooking("groupSize")}
                          </option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10+</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <textarea
                          className="border-light rounded-4 px-20 py-10 w-1/1"
                          name="message"
                          rows="4"
                          placeholder={tBooking("message")}
                          value={formData.message}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-12">
                        <button
                          className="button -md bg-blue-1 text-white w-1/1"
                          type="submit"
                          disabled={submitting}
                        >
                          {submitting ? "Submitting..." : tBooking("submit")}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center pt-30 pb-10">
                      <div className="size-60 rounded-full bg-blue-1-05 flex-center mx-auto">
                        <i className="icon-check text-blue-1 text-24" />
                      </div>
                      <h4 className="text-20 fw-500 mt-20">
                        {tBooking("successTitle")}
                      </h4>
                      <p className="text-15 mt-10">{tBooking("successText")}</p>
                    </div>
                  )}

                  <div className="border-top-light mt-20 pt-20">
                    <div className="text-14 text-light-1">
                      {tTours("contactDirectly")}
                    </div>
                    <Link
                      href="https://wa.me/998901234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button -md border-blue-1 text-blue-1 w-1/1 mt-12"
                    >
                      WhatsApp
                    </Link>
                  </div>
                </div>

                <div className="px-30">
                  <div className="text-14 text-light-1 mt-30">
                    {tBooking("cancel")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <KashfFooter />
    </>
  );
}
