import Link from "next/link";
import OptimizedImage from "@/components/shared/OptimizedImage";
import { normalizeTour } from "@/lib/content";

const locationById = {
  "4-days-uzbekistan-highlights": "Tashkent · Samarkand · Amirsoy",
  "7-days-grand-uzbekistan-escape": "Samarkand · Shakhrisabz · Bukhara",
  "10-days-legendary-adventure": "Samarkand · Bukhara · Khiva",
  "custom-private-tour": "Across Uzbekistan",
};

const PinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function TourCard({ tour, locale, t, href, priority = false }) {
  const item = normalizeTour(tour, locale);
  const cardHref = href || `/${locale}/tours/${item.id}`;
  const location =
    locationById[item.id] ||
    item.location?.[locale] ||
    item.location ||
    "Uzbekistan";
  const priceLabel = item.price
    ? `$${item.price}`
    : (t?.("priceOnRequest") ?? "On request");

  return (
    <Link href={cardHref} className="travel-tour-card">
      <div className="travel-tour-card__media">
        <OptimizedImage
          src={item.images[0]}
          alt={item.title}
          priority={priority}
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          wrapperStyle={{ width: "100%", height: "100%" }}
        />
        <span className="travel-tour-card__duration">
          {item.durationLabel}
        </span>
        <span className="travel-tour-card__price">{priceLabel}</span>
      </div>

      <div className="travel-tour-card__body">
        <div className="travel-tour-card__location">
          <PinIcon />
          <span>{location}</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>

        <div className="travel-tour-card__footer">
          {item.rating ? (
            <span className="travel-tour-card__rating">
              <span aria-hidden="true">★</span>
              {item.rating.toFixed(1)}
              {item.reviewCount ? ` (${item.reviewCount})` : ""}
            </span>
          ) : (
            <span className="travel-tour-card__private">Private tour</span>
          )}
          <span className="travel-tour-card__cta">
            {t?.("viewTour") ?? "View tour"}
            <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}
