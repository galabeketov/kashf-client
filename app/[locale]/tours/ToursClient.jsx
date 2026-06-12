"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Aos from "aos";
import TravelHeader from "@/components/header/travel-header";
import TravelFooter from "@/components/footer/travel-footer";
import TourCard from "@/components/ui/TourCard";
import IslamicPattern from "@/components/ui/IslamicPattern";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import { tours as staticTours } from "@/data/travelEasy";
import { getPublishedTours } from "@/lib/tours";

const filterTourByKey = (tour, key) => {
  if (key === "all") return true;
  if (key === "1-4") return tour.duration >= 1 && tour.duration <= 4;
  if (key === "5-7") return tour.duration >= 5 && tour.duration <= 7;
  if (key === "8+") return tour.duration >= 8;
  return true;
};

const SkeletonCard = () => <div className="travel-skeleton-card" />;

const withTimeout = (promise, milliseconds = 2500) =>
  Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error("REQUEST_TIMEOUT")), milliseconds);
    }),
  ]);

export default function ToursClient({ initialTours = [] }) {
  const t = useTranslations("tours");
  const navT = useTranslations("nav");
  const locale = useLocale();

  const [activeFilter, setActiveFilter] = useState("all");
  const [tours, setTours] = useState(initialTours);
  const [loading, setLoading] = useState(initialTours.length === 0);

  useEffect(() => {
    if (initialTours.length > 0) return;

    let isMounted = true;
    const load = async () => {
      try {
        const remote = await withTimeout(getPublishedTours());
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
    return () => {
      isMounted = false;
    };
  }, [initialTours.length]);

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

  useEffect(() => {
    if (loading) return;

    const frame = window.requestAnimationFrame(() => {
      Aos.refreshHard();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [loading, filteredTours.length]);

  return (
    <>
      <TravelHeader />

      {/* ── Hero ── */}
      <section
        className="uzn-section-dark"
        style={{
          paddingTop: "190px",
          paddingBottom: "70px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Decorative Islamic pattern top-right */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            zIndex: 1,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <IslamicPattern size={260} color="#C9A84C" opacity={0.12} animated />
        </div>
        {/* Bottom-left smaller */}
        <div
          style={{
            position: "absolute",
            bottom: -20,
            left: -20,
            zIndex: 1,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <IslamicPattern size={160} color="#C9A84C" opacity={0.07} animated />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="row justify-center text-center">
            <div className="col-lg-8">
              {/* Bismillah label */}
              <span className="uzn-bismillah" data-aos="fade-down">
                ✦ Silk Road Collection ✦
              </span>

              <h1
                className="text-50 lg:text-40 md:text-32 text-white mt-10"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                data-aos="fade-up"
              >
                {t("pageTitle")}
              </h1>

              <p
                className="mt-16 text-white"
                style={{ opacity: 0.75 }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {t("pageSubtitle")}
              </p>

              <OrnamentalDivider
                starSize={20}
                color="#C9A84C"
                className="mt-20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <nav
        className="py-12"
        style={{
          background: "#FDFAF4",
          borderBottom: "1px solid rgba(201,168,76,0.14)",
        }}
        aria-label="Breadcrumb"
      >
        <div className="container">
          <div className="d-flex x-gap-8 items-center text-13 text-light-1">
            <Link
              href={`/${locale}`}
              className="text-dark-1"
              style={{ fontWeight: 500 }}
            >
              {navT("home")}
            </Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span
              className="text-dark-1"
              style={{ color: "#C9A84C", fontWeight: 600 }}
            >
              {t("pageTitle")}
            </span>
          </div>
        </div>
      </nav>

      {/* ── Tour listing ── */}
      <section
        className="layout-pt-md layout-pb-lg uzn-section-ivory"
        style={{ position: "relative" }}
      >
        <div className="container">
          {/* Filter pills */}
          <div
            className="travel-filter-row mb-40"
            role="group"
            aria-label="Tour duration"
          >
            {filters.map((f) => (
              <button
                key={f.key}
                className={`uzn-filter-pill${activeFilter === f.key ? " active" : ""}`}
                onClick={() => setActiveFilter(f.key)}
                aria-pressed={activeFilter === f.key}
              >
                {f.label}
              </button>
            ))}
            {!loading && (
              <span className="travel-filter-count" aria-live="polite">
                {filteredTours.length}
              </span>
            )}
          </div>

          {/* Grid */}
          <div className="row y-gap-28">
            {/* Skeleton */}
            {loading &&
              Array.from({ length: 4 }).map((_, i) => (
                <div className="col-lg-4 col-sm-6 col-12" key={`sk-${i}`}>
                  <SkeletonCard />
                </div>
              ))}

            {/* Empty state */}
            {!loading && filteredTours.length === 0 && (
              <div className="col-12 text-center py-60">
                <p
                  className="text-18 text-light-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  No tours found for this filter.
                </p>
              </div>
            )}

            {/* Tour cards */}
            {!loading &&
              filteredTours.map((tour, idx) => (
                <div
                  className="col-lg-4 col-sm-6 col-12"
                  key={tour.id}
                  style={{ height: "100%" }}
                >
                  <TourCard
                    tour={tour}
                    locale={locale}
                    t={t}
                    priority={idx < 3}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>

      <TravelFooter />

    </>
  );
}
