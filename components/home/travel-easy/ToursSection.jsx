"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useLocale, useTranslations } from "next-intl";
import { FaArrowRight } from "@/components/shared/Icons";
import { tours as staticTours } from "@/data/travelEasy";
import { getPublishedTours } from "@/lib/tours";
import TourCard from "@/components/ui/TourCard";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";

const SkeletonCard = () => (
  <div
    style={{
      borderRadius: "16px",
      height: "370px",
      background: "linear-gradient(135deg, #f5f0e8, #ede8de)",
      animation: "silkPulse 1.6s ease-in-out infinite",
      border: "1px solid rgba(201,168,76,0.12)",
    }}
  />
);

const ToursSection = () => {
  const t = useTranslations("tours");
  const locale = useLocale();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const remote = await getPublishedTours();
        if (!isMounted) return;
        setTours(remote.length ? remote : staticTours);
      } catch {
        if (!isMounted) return;
        setTours(staticTours);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, []);

  const displayTours = tours.length ? tours : staticTours;

  return (
    <section className="layout-pt-lg layout-pb-md travel-section travel-section--ivory">
      <div className="container">
        {/* Section header */}
        <div className="row y-gap-20 justify-between items-end">
          <div className="col-auto">
            <div className="sectionTitle -md">
              <h2
                className="sectionTitle__title"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {t("sectionTitle")}
              </h2>
              <p className="sectionTitle__text mt-5 sm:mt-0">
                {t("sectionSubtitle")}
              </p>
              <OrnamentalDivider starSize={22} />
            </div>
          </div>

          <div className="col-auto md:d-none">
            <Link href={`/${locale}/tours`} className="uzn-btn-primary">
              {t("viewAll")}
              <span className="ml-10 d-inline-flex">
                <FaArrowRight size={13} />
              </span>
            </Link>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden pt-40 sm:pt-24">
          <Swiper
            modules={[Navigation]}
            navigation
            speed={500}
            slidesPerView={4}
            spaceBetween={24}
            breakpoints={{
              0:    { slidesPerView: 1 },
              520:  { slidesPerView: 1 },
              768:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <SwiperSlide key={`sk-${i}`}>
                    <SkeletonCard />
                  </SwiperSlide>
                ))
              : displayTours.slice(0, 8).map((tour, idx) => (
                  <SwiperSlide key={tour.id} style={{ height: "auto" }}>
                    <div
                      style={{ height: "100%" }}
                    >
                      <TourCard
                        tour={tour}
                        locale={locale}
                        t={t}
                        priority={idx === 0}
                      />
                    </div>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>

    </section>
  );
};

export default ToursSection;
