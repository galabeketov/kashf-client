"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import KashfHeader from "@/components/header/header-kashf";
import KashfFooter from "@/components/footer/kashf";
import { tours as staticTours } from "@/data/kashf";
import { getPublishedTours } from "@/lib/tours";

const locationById = {
  "4-days-uzbekistan-highlights": "Tashkent, Samarkand, Amirsoy",
  "7-days-grand-uzbekistan-escape": "Tashkent, Samarkand, Shakhrisabz, Bukhara",
  "10-days-legendary-adventure": "Tashkent, Samarkand, Bukhara, Khiva, Urganch",
  "custom-private-tour": "Flexible across Uzbekistan",
};

const filterTourByKey = (tour, key) => {
  if (key === "all") return true;
  if (key === "1-4") return tour.duration >= 1 && tour.duration <= 4;
  if (key === "5-7") return tour.duration >= 5 && tour.duration <= 7;
  if (key === "8+") return tour.duration >= 8;
  return true;
};

const localizedTourText = (value, locale) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value?.[locale] || value?.en || value?.uz || value?.ru || "";
};

const localizedTourList = (value, locale) => {
  if (Array.isArray(value)) return value;
  const localized = value?.[locale] || value?.en || value?.uz || value?.ru;
  return Array.isArray(localized) ? localized : [];
};

export default function ToursPage() {
  const t = useTranslations("tours");
  const navT = useTranslations("nav");
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState("all");
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadTours = async () => {
      try {
        const firestoreTours = await getPublishedTours();
        if (!isMounted) return;
        setTours(firestoreTours);
      } catch {
        if (!isMounted) return;
        setTours(staticTours);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTours();

    return () => {
      isMounted = false;
    };
  }, []);

  const filters = [
    { key: "all", label: t("filterAll") },
    { key: "1-4", label: t("filter1") },
    { key: "5-7", label: t("filter2") },
    { key: "8+", label: t("filter3") },
  ];

  const filteredTours = useMemo(
    () => tours.filter((tour) => filterTourByKey(tour, activeFilter)),
    [activeFilter, tours],
  );

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
              <span className="text-dark-1">{t("pageTitle")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="d-flex x-gap-10 y-gap-10 flex-wrap mb-30">
            {filters.map((filter) => (
              <button
                key={filter.key}
                className={
                  activeFilter === filter.key
                    ? "button -sm -blue-1 bg-blue-1 text-white"
                    : "button -sm border-blue-1 text-blue-1"
                }
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="row y-gap-30">
            {loading &&
              Array.from({ length: 4 }).map((_, idx) => (
                <div className="col-12" key={`loading-${idx}`}>
                  <div className="border-top-light pt-30">
                    <div
                      style={{
                        width: "100%",
                        height: "180px",
                        borderRadius: "12px",
                        background: "#f5f5f5",
                        animation: "kashfListPulse 1.4s ease-in-out infinite",
                      }}
                    />
                  </div>
                </div>
              ))}

            {!loading && filteredTours.length === 0 && (
              <div className="col-12">
                <div className="border-top-light pt-30">
                  <p className="text-16 text-dark-1">Tours coming soon</p>
                </div>
              </div>
            )}

            {!loading &&
              filteredTours.map((tour, idx) => {
                const tourTitle = localizedTourText(tour.title, locale);
                const tourIncludes = localizedTourList(tour.includes, locale);

                return (
                  <div
                    className="col-12"
                    key={tour.id}
                    data-aos="fade"
                    data-aos-delay={`${idx * 100}`}
                  >
                    <div className="border-top-light pt-30">
                      <div className="row x-gap-20 y-gap-20 items-center">
                        <div className="col-md-auto">
                          <div className="cardImage ratio ratio-1:1 w-250 md:w-1/1 rounded-4">
                            <div className="cardImage__content">
                              <Image
                                width={320}
                                height={320}
                                className="rounded-4 col-12 js-lazy"
                                src={tour.images?.[0] || "/img/tours/1.png"}
                                alt={tourTitle}
                              />
                            </div>

                            <div className="cardImage__wishlist">
                              <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                                <i className="icon-heart text-12" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="col-md">
                          <div className="row x-gap-10 items-center">
                            <div className="col-auto">
                              <p className="text-14 lh-14 mb-5">
                                {Number(tour.duration) === 0
                                  ? t("filterAll")
                                  : `${tour.duration} ${t("days")}`}
                              </p>
                            </div>
                            <div className="col-auto">
                              <div className="size-3 rounded-full bg-light-1 mb-5" />
                            </div>
                            <div className="col-auto">
                              <p className="text-14 lh-14 mb-5">Private Tour</p>
                            </div>
                          </div>

                          <h3 className="text-20 lh-16 fw-500">{tourTitle}</h3>

                          <div className="d-flex items-center text-14 lh-14 mt-8">
                            <i className="icon-location-2 text-16 text-light-1 mr-8" />
                            <span>{locationById[tour.id] || "Uzbekistan"}</span>
                          </div>

                          <p
                            className="text-14 mt-15"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {localizedTourText(tour.description, locale)}
                          </p>

                          <div className="row y-gap-8 mt-15">
                            {tourIncludes.slice(0, 3).map((inc) => (
                              <div className="col-12" key={`${tour.id}-${inc}`}>
                                <div className="d-flex items-center text-14">
                                  <i className="icon-check text-green-2 mr-10" />
                                  <span>{inc}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="col-md-auto text-right md:text-left">
                          <div className="d-flex x-gap-5 items-center justify-end md:justify-start">
                            <i className="icon-star text-10 text-yellow-1" />
                            <i className="icon-star text-10 text-yellow-1" />
                            <i className="icon-star text-10 text-yellow-1" />
                            <i className="icon-star text-10 text-yellow-1" />
                            <i className="icon-star text-10 text-yellow-1" />
                          </div>

                          <div className="text-14 lh-14 text-light-1 mt-10">
                            5.0 rating
                          </div>

                          <div className="text-14 text-light-1 mt-50 md:mt-20">
                            {t("from")}
                          </div>
                          <div className="text-22 lh-12 fw-600 mt-5">
                            US${tour.price || 0}
                          </div>
                          <div className="text-14 text-light-1 mt-5">
                            {t("perPerson")}
                          </div>

                          <Link
                            href={`/${locale}/tours/${tour.id}`}
                            className="button -md -dark-1 bg-blue-1 text-white mt-24"
                          >
                            {t("viewTour")}
                            <div className="icon-arrow-top-right ml-15" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <KashfFooter />
      <style jsx global>{`
        @keyframes kashfListPulse {
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
