import Link from "next/link";
import OptimizedImage from "@/components/shared/OptimizedImage";

const tourLocations = {
  "4-days-uzbekistan-highlights": "Tashkent · Samarkand · Amirsoy",
  "7-days-grand-uzbekistan-escape": "Samarkand · Shakhrisabz · Bukhara",
  "10-days-legendary-adventure": "Samarkand · Bukhara · Khiva",
  "custom-private-tour": "Across Uzbekistan",
};

const StarOrnament = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <polygon
      points="13,0 15.5,8.5 24,5.5 21,13 24,20.5 15.5,17.5 13,26 10.5,17.5 2,20.5 5,13 2,5.5 10.5,8.5"
      fill="currentColor"
      opacity="0.9"
    />
    <circle cx="13" cy="13" r="3.5" fill="currentColor" opacity="0.55" />
    <circle cx="13" cy="13" r="1.5" fill="#FDFAF4" />
  </svg>
);

const PinIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
    aria-hidden="true"
  >
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/**
 * TourCard — reusable premium Silk Road tour card.
 * Props:
 *   tour   — tour object (Firestore or static)
 *   locale — active locale ("en" | "uz" | "ru")
 *   t      — useTranslations("tours") (optional, English fallbacks used if omitted)
 *   href   — override destination href (optional)
 */
const TourCard = ({ tour, locale, t, href, variant = "kashf" }) => {
  const title = tour.title?.[locale] || tour.title?.en || tour.title || "";
  const description =
    tour.description?.[locale] ||
    tour.description?.en ||
    tour.description ||
    "";
  const duration = Number(tour.duration);
  const durationLabel =
    duration === 0
      ? (t?.("filterAll") ?? "Custom")
      : `${duration} ${t?.("days") ?? "days"}`;
  const location = tourLocations[tour.id] || "Uzbekistan";
  // Use translation key if available; plain string fallback avoids showing the key
  const priceLabel =
    tour.price > 0 ? `$${tour.price}` : (t?.("priceOnRequest") ?? "On request");
  const cardHref = href ?? `/${locale}/tours/${tour.id}`;
  const viewLabel = t?.("viewTour") ?? "View Tour";

  if (variant === "gotrip") {
    return (
      <Link
        href={cardHref}
        className="tourCard -type-1 rounded-4 hover-inside-slider"
        style={{ height: "100%", display: "block" }}
      >
        <div className="tourCard__image position-relative">
          <div className="cardImage ratio ratio-1:1">
            <div className="cardImage__content">
              <OptimizedImage
                src={tour.images?.[0] || "/img/tours/1.png"}
                alt={title}
                sizes="(max-width: 768px) 100vw, 360px"
                wrapperStyle={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>

          <div className="cardImage__leftBadge">
            <div className="py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase bg-blue-1 text-white">
              {durationLabel}
            </div>
          </div>
        </div>

        <div className="tourCard__content mt-10">
          <div className="d-flex items-center lh-14 mb-5">
            <div className="text-14 text-light-1">{durationLabel}</div>
            <div className="size-3 bg-light-1 rounded-full ml-10 mr-10" />
            <div className="text-14 text-light-1">{location}</div>
          </div>

          <h4 className="tourCard__title text-dark-1 text-18 lh-16 fw-500">
            <span>{title}</span>
          </h4>

          <p className="text-light-1 lh-14 text-14 mt-5">
            {description || " "}
          </p>

          <div className="row justify-between items-center pt-15">
            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="d-flex items-center x-gap-5">
                  <div className="icon-star text-yellow-1 text-10" />
                  <div className="icon-star text-yellow-1 text-10" />
                  <div className="icon-star text-yellow-1 text-10" />
                  <div className="icon-star text-yellow-1 text-10" />
                  <div className="icon-star text-yellow-1 text-10" />
                </div>
              </div>
            </div>

            <div className="col-auto">
              <div className="text-14 text-light-1">
                From
                <span className="text-16 fw-500 text-dark-1">
                  {" "}
                  {priceLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 text-14 fw-500 text-blue-1">{viewLabel}</div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={cardHref}
      className="tour-card-uzbek"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      {/* ── Image — fixed height, never grows ── */}
      <div
        className="tour-card-uzbek__image"
        style={{ height: 220, flexShrink: 0 }}
      >
        <OptimizedImage
          src={tour.images?.[0] || "/img/tours/1.png"}
          alt={title}
          sizes="(max-width: 768px) 100vw, 360px"
          wrapperStyle={{ width: "100%", height: "220px" }}
        />

        {/* Rotating 8-point gold star — top right */}
        <div className="tour-card-uzbek__corner-ornament">
          <StarOrnament />
        </div>

        {/* Duration pill — top left */}
        <div className="tour-card-uzbek__duration">{durationLabel}</div>

        {/* Gold price badge — bottom right */}
        <div className="tour-card-uzbek__price-overlay">{priceLabel}</div>
      </div>

      {/* ── Content — flex column so footer stays at bottom ── */}
      <div
        className="tour-card-uzbek__content"
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        {/* Location */}
        <div className="tour-card-uzbek__location">
          <PinIcon />
          {location}
        </div>

        {/* Title */}
        <h3>{title}</h3>

        {/* Description — takes all remaining vertical space */}
        <p style={{ flex: 1 }}>{description || " "}</p>

        {/* Footer — always pinned to bottom */}
        <div className="tour-card-uzbek__footer" style={{ marginTop: "auto" }}>
          <div className="stars" aria-label="5 stars">
            ★★★★★
          </div>
          <span
            className="cta"
            style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
          >
            {viewLabel} <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
