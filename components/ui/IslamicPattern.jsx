"use client";

const IslamicPattern = ({
  size = 220,
  color = "#C9A84C",
  opacity = 0.18,
  animated = false,
  className = "",
}) => {
  const s = size;
  const c = s / 2;
  const R = s * 0.42;
  const r = s * 0.20;

  // 12-point girih star: alternating outer/inner vertices
  const starPoints = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * Math.PI) / 12 - Math.PI / 2;
    const radius = i % 2 === 0 ? R : r;
    return `${(c + radius * Math.cos(angle)).toFixed(2)},${(c + radius * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");

  // Inner hexagon points
  const hexR = r * 0.92;
  const hexPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3 - Math.PI / 6;
    return `${(c + hexR * Math.cos(angle)).toFixed(2)},${(c + hexR * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");

  // Corner squares rotated 45°
  const squareR = r * 1.65;
  const squarePoints = Array.from({ length: 4 }, (_, i) => {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    return `${(c + squareR * Math.cos(angle)).toFixed(2)},${(c + squareR * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");

  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        opacity,
        animation: animated ? "uzn-spin-slow 28s linear infinite" : undefined,
        display: "block",
        pointerEvents: "none",
        userSelect: "none",
      }}
      aria-hidden="true"
    >
      {/* Outer 12-point star */}
      <polygon
        points={starPoints}
        stroke={color}
        strokeWidth="1.2"
        fill={`${color}18`}
      />

      {/* Inner hexagon */}
      <polygon
        points={hexPoints}
        stroke={color}
        strokeWidth="0.9"
        fill={`${color}10`}
      />

      {/* Connecting diamond lines */}
      <polygon
        points={squarePoints}
        stroke={color}
        strokeWidth="0.8"
        fill="none"
        strokeDasharray="4 3"
      />

      {/* Center dot */}
      <circle cx={c} cy={c} r={s * 0.025} fill={color} opacity="0.5" />

      {/* Radial spokes */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * Math.PI) / 6 - Math.PI / 2;
        const x1 = (c + r * 0.3 * Math.cos(angle)).toFixed(2);
        const y1 = (c + r * 0.3 * Math.sin(angle)).toFixed(2);
        const x2 = (c + r * 1.1 * Math.cos(angle)).toFixed(2);
        const y2 = (c + r * 1.1 * Math.sin(angle)).toFixed(2);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="0.6"
            opacity="0.6"
          />
        );
      })}
    </svg>
  );
};

export default IslamicPattern;
