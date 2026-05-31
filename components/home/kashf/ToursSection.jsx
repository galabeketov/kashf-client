"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useLocale, useTranslations } from "next-intl";
import { FaArrowRight, FaStar, LuMapPin } from "@/components/shared/Icons";
import { tours as staticTours } from "@/data/kashf";
import { getPublishedTours } from "@/lib/tours";

const tourLocations = {
  "4-days-uzbekistan-highlights": "Tashkent, Samarkand, Amirsoy",
  "7-days-grand-uzbekistan-escape": "Tashkent, Samarkand, Shakhrisabz, Bukhara",
  "10-days-legendary-adventure": "Tashkent, Samarkand, Bukhara, Khiva, Urganch",
  "custom-private-tour": "Flexible across Uzbekistan",
};

const ToursSection = () => {
  const t = useTranslations("tours");
  const locale = useLocale();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadTours = async () => {
      try {
        const firestoreTours = await getPublishedTours();

        if (!isMounted) return;
        setTours(firestoreTours.length ? firestoreTours : staticTours);
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

  const getTourTitle = (tour) =>
    tour.title?.[locale] || tour.title?.en || tour.title || "";

  const displayTours = tours.length ? tours : staticTours;

  return (
    <section className="layout-pt-lg layout-pb-md" data-aos="fade-up">
      <div className="container">
        <div className="row y-gap-20 justify-between items-end">
          <div className="col-auto">
            <div className="sectionTitle -md">
              <h2 className="sectionTitle__title">{t("sectionTitle")}</h2>
              <p className="sectionTitle__text mt-5 sm:mt-0">
                {t("sectionSubtitle")}
              </p>
              <div className="uzbek-gold-line" />
            </div>
          </div>

          <div className="col-auto md:d-none">
            <Link
              href={`/${locale}/tours`}
              className="button -md btn-uzbek-primary"
            >
              {t("viewAll")}
              <span className="ml-10 d-inline-flex">
                <FaArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden pt-40 sm:pt-20 js-section-slider item_gap-x30">
          <Swiper
            modules={[Navigation]}
            navigation
            speed={500}
            slidesPerView={4}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              520: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 2 },
              1200: { slidesPerView: 4 },
            }}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <SwiperSlide key={`skeleton-${idx}`}>
                    <div className="rounded-4" data-aos="fade">
                      <div
                        style={{
                          background: "#f5f5f5",
                          height: "320px",
                          borderRadius: "12px",
                          animation: "kashfPulse 1.4s ease-in-out infinite",
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))
              : displayTours.map((tour, idx) => (
                  <SwiperSlide key={tour.id} className="h-100">
                    <div
                      data-aos="fade"
                      data-aos-delay={`${(idx + 1) * 100}`}
                      className="h-100"
                    >
                      <div className="uzbek-tour-card rounded-8 hover-inside-slider h-100">
                        <span
                          className="uzbek-dome-ornament"
                          aria-hidden="true"
                        />
                        <div className="tourCard__image position-relative">
                          <div className="cardImage ratio ratio-1:1 rounded-8">
                            <div className="cardImage__content">
                              <Image
                                width={320}
                                height={320}
                                className="col-12 js-lazy w-1/1 h-1/1 object-cover"
                                src={tour.images?.[0] || "/img/tours/1.png"}
                                alt={getTourTitle(tour)}
                              />
                            </div>
                          </div>

                          <div className="cardImage__leftBadge">
                            <div className="py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase bg-dark-1 text-white">
                              {Number(tour.duration) === 0
                                ? t("filterAll")
                                : `${tour.duration} ${t("days")}`}
                            </div>
                          </div>
                        </div>

                        <div className="tourCard__content mt-10">
                          <div className="d-flex items-center justify-between lh-14 mb-10">
                            <div className="text-13 text-light-1">
                              {Number(tour.duration) === 0
                                ? t("filterAll")
                                : `${tour.duration} ${t("days")}`}
                            </div>
                            <div
                              className="d-flex items-center x-gap-5 text-12"
                              style={{ color: "#C9A84C" }}
                            >
                              <FaStar size={12} />
                              <span className="text-dark-1">5.0</span>
                            </div>
                          </div>

                          <h4 className="tourCard__title uzbek-tour-card__title text-dark-1 text-18 lh-16 fw-500">
                            <span>{getTourTitle(tour)}</span>
                          </h4>

                          <div className="d-flex items-center text-light-1 lh-14 text-14 mt-8 uzbek-tour-card__location">
                            <span className="mr-8 text-blue-1 d-inline-flex">
                              <LuMapPin size={14} />
                            </span>
                            <span>
                              {tourLocations[tour.id] || "Uzbekistan"}
                            </span>
                          </div>

                          <div className="row justify-between items-end pt-18 uzbek-tour-card__footer">
                            <div className="col-auto">
                              <div className="text-13 text-light-1">
                                {t("from")}
                                <span className="text-18 fw-600 text-dark-1">
                                  {" "}
                                  US${tour.price || 0}
                                </span>
                              </div>
                              <div className="text-13 text-light-1">
                                {t("perPerson")}
                              </div>
                            </div>

                            <div className="col-auto">
                              <Link
                                href={`/${locale}/tours/${tour.id}`}
                                className="button -sm btn-uzbek-outline-dark"
                              >
                                {t("viewTour")}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        @keyframes kashfPulse {
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
    </section>
  );
};

export default ToursSection;
