"use client";

import IslamicPattern from "@/components/ui/IslamicPattern";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";

/**
 * Shared dark Silk-Road hero used across inner pages
 * (tours / services / about / contact / blog) so every page shares
 * the same Islamic-pattern dark background.
 */
export default function PageHero({ label, title, subtitle }) {
  return (
    <section
      className="uzn-section-dark"
      style={{
        paddingTop: "130px",
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
            {label ? (
              <span className="uzn-bismillah" data-aos="fade-down">
                {label}
              </span>
            ) : null}

            <h1
              className="text-50 lg:text-40 md:text-32 text-white mt-10"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              data-aos="fade-up"
            >
              {title}
            </h1>

            {subtitle ? (
              <p
                className="mt-16 text-white"
                style={{ opacity: 0.75 }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {subtitle}
              </p>
            ) : null}

            <OrnamentalDivider starSize={20} color="#C9A84C" className="mt-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
