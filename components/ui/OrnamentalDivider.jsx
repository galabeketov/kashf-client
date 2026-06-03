"use client";

const EightPointStar = ({ size = 28, color = "#C9A84C" }) => {
  const c = size / 2;
  const R = size * 0.46;
  const r = size * 0.22;
  const points = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * Math.PI) / 8 - Math.PI / 2;
    const radius = i % 2 === 0 ? R : r;
    return `${(c + radius * Math.cos(angle)).toFixed(2)},${(c + radius * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block", animation: "uzn-spin-slow 20s linear infinite" }}
    >
      <polygon points={points} fill={color} opacity="0.85" />
      <circle cx={c} cy={c} r={r * 0.55} fill="#FDFAF4" />
      <circle cx={c} cy={c} r={r * 0.28} fill={color} opacity="0.7" />
    </svg>
  );
};

const OrnamentalDivider = ({
  className = "",
  starSize = 28,
  color = "#C9A84C",
}) => {
  return (
    <div className={`uzn-ornament-divider ${className}`} aria-hidden="true">
      <span className="uzn-ornament-divider__star">
        <EightPointStar size={starSize} color={color} />
      </span>
    </div>
  );
};

export default OrnamentalDivider;
