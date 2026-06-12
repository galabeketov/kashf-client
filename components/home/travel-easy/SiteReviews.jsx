"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useLocale, useTranslations } from "next-intl";
import { FaStar } from "react-icons/fa";
import { getApprovedReviews } from "@/lib/reviews";

const SiteReviews = () => {
  const t = useTranslations("reviews");
  const locale = useLocale();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const items = await getApprovedReviews("site");
      if (!mounted) return;
      setReviews(items);
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const average = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce(
      (sum, item) => sum + (Number(item.rating) || 0),
      0,
    );
    return total / reviews.length;
  }, [reviews]);

  if (!reviews.length) return null;

  return (
    <section className="layout-pt-md layout-pb-lg bg-blue-2">
      <div className="container">
        <div className="row y-gap-20 justify-between items-end">
          <div className="col-auto">
            <div className="sectionTitle -md">
              <h2 className="sectionTitle__title">{t("sectionTitle")}</h2>
              <p className="sectionTitle__text mt-5 sm:mt-0">
                {t("sectionSubtitle")}
              </p>
              <div className="d-flex items-center x-gap-10 mt-15">
                <div className="text-24 fw-600">{average.toFixed(1)}</div>
                <div style={{ color: "#C9A84C" }}>
                  <FaStar size={18} />
                </div>
                <div className="text-15 text-light-1">
                  {reviews.length} {t("totalReviews")}
                </div>
              </div>
            </div>
          </div>
          <div className="col-auto md:d-none">
            <Link
              href={`/${locale}/contact#write-review`}
              className="button -md btn-uzbek-primary"
            >
              {t("writeReview")}
            </Link>
          </div>
        </div>

        <div className="pt-30">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-white rounded-8 px-20 py-20 h-100 border-light">
                  <div className="d-flex x-gap-5" style={{ color: "#C9A84C" }}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        key={`${review.id}-${index}`}
                        size={14}
                        style={{
                          opacity: index < Number(review.rating) ? 1 : 0.25,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-15 mt-15">{review.text}</p>
                  <div className="text-14 fw-500 mt-15">
                    {review.name} {review.country ? `· ${review.country}` : ""}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default SiteReviews;
