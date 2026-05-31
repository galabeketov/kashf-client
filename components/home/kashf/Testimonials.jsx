"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { useLocale, useTranslations } from "next-intl";
import { FaStar } from "@/components/shared/Icons";
import { defaultSettings } from "@/data/kashf";
import { useSettings } from "@/hooks/useSettings";

const Testimonials = () => {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const { settings } = useSettings();
  const testimonials = settings?.testimonials || defaultSettings.testimonials;

  const localized = (value) => value?.[locale] || value?.en || value || "";

  return (
    <section className="layout-pt-lg layout-pb-lg bg-blue-2">
      <div className="container">
        <div className="row y-gap-40 justify-between">
          <div className="col-xl-5 col-lg-6" data-aos="fade-up">
            <h2 className="text-30">{t("title")}</h2>
            <p className="mt-20">{t("subtitle")}</p>

            <div className="row y-gap-30 pt-60 lg:pt-40">
              <div className="col-sm-5 col-6">
                <div className="text-30 lh-15 fw-600">500+</div>
                <div className="text-light-1 lh-15">Happy travelers</div>
              </div>
              <div className="col-sm-5 col-6">
                <div className="text-30 lh-15 fw-600">5.0</div>
                <div className="text-light-1 lh-15">Overall rating</div>
                <div className="d-flex x-gap-5 items-center pt-10">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      className="text-blue-1 d-inline-flex"
                      key={`stat-star-${index}`}
                    >
                      <FaStar size={10} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div
              className="overflow-hidden js-testimonials-slider-3"
              data-aos="fade-up"
              data-aos-delay="50"
            >
              <Swiper
                scrollbar={{
                  el: ".js-kashf-scrollbar",
                  draggable: true,
                }}
                modules={[Scrollbar]}
              >
                {testimonials.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="row items-center x-gap-15 y-gap-20">
                      <div className="col-auto">
                        <Image
                          width={80}
                          height={80}
                          src={item.avatar}
                          alt={item.name}
                          className="js-lazy rounded-circle"
                        />
                      </div>
                      <div className="col-auto">
                        <h5 className="text-16 fw-500">{item.name}</h5>
                        <div className="text-15 text-light-1 lh-15">
                          {localized(item.country)}
                        </div>
                        <div className="text-13 text-light-1 lh-15 mt-5">
                          {item.tour}
                        </div>
                      </div>
                    </div>

                    <p className="text-18 fw-500 text-dark-1 mt-30 sm:mt-20">
                      {localized(item.text)}
                    </p>
                    <div className="d-flex x-gap-5 items-center pt-15">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <span className="text-blue-1 d-inline-flex" key={i}>
                          <FaStar size={10} />
                        </span>
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="d-flex items-center mt-60 sm:mt-20">
                <div className="text-dark-1 fw-500">01</div>
                <div className="slider-scrollbar bg-border ml-20 mr-20 w-max-300 js-kashf-scrollbar" />
                <div className="text-dark-1 fw-500">0{testimonials.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
