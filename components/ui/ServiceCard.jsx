import Link from "next/link";

const ArrowIcon = () => (
  <svg
    width="13"
    height="13"
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
 * ServiceCard — premium octagon-icon service card.
 * Props:
 *   icon      — React node (icon element)
 *   title     — string
 *   description — string
 *   href      — link target
 *   color     — icon foreground color
 *   bg        — icon background color
 *   ctaText   — CTA label string (default "Learn more")
 *   external  — bool, open in new tab
 */
const ServiceCard = ({
  icon,
  title,
  description,
  href,
  color = "#1B6CA8",
  bg = "rgba(27,108,168,0.1)",
  ctaText = "Learn more",
  external = false,
}) => {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link href={href} className="service-card-uzbek" {...linkProps}>
      {/* Octagon icon container */}
      <div
        className="service-icon-uzbek"
        style={{ background: bg, color }}
        aria-hidden="true"
      >
        {icon}
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <div className="service-cta">
        {ctaText}
        <ArrowIcon />
      </div>
    </Link>
  );
};

export default ServiceCard;
