import Image from "next/image";

export default function BrandLogo({
  name,
  tagline,
  size = 50,
  className = "",
}) {
  return (
    <span className={`travel-brand-logo ${className}`.trim()}>
      <span className="travel-brand-logo__mark">
        <Image
          src="/img/brand/travel-easy-emblem.svg"
          alt=""
          width={size}
          height={size}
          priority
        />
      </span>
      <span className="travel-brand-logo__copy">
        <strong>{name}</strong>
        <small>{tagline}</small>
      </span>
    </span>
  );
}
