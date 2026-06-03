const DomeDecor = ({
  color = "#C9A84C",
  opacity = 0.22,
  className = "",
  inverted = false,
}) => {
  return (
    <div
      className={`uzn-dome-decor ${className}`}
      aria-hidden="true"
      style={{ transform: inverted ? "scaleY(-1)" : undefined }}
    >
      <svg
        viewBox="0 0 1440 160"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ opacity, display: "block", width: "100%" }}
      >
        {/* Ground base line */}
        <line
          x1="0"
          y1="150"
          x2="1440"
          y2="150"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Left dome (smaller) */}
        <g transform="translate(180, 150)">
          {/* Minaret left */}
          <rect x="-8" y="-95" width="6" height="95" fill={color} opacity="0.35" />
          <polygon points="-8,-95 -5,-115 -2,-95" fill={color} opacity="0.5" />
          {/* Main dome body */}
          <path
            d="M-70,0 C-70,-55 -45,-88 0,-92 C45,-88 70,-55 70,0 Z"
            fill={color}
            opacity="0.28"
            stroke={color}
            strokeWidth="1"
          />
          {/* Dome neck */}
          <rect x="-10" y="-18" width="20" height="18" fill={color} opacity="0.22" />
          {/* Finial crescent */}
          <circle cx="0" cy="-96" r="5" fill="none" stroke={color} strokeWidth="1.2" />
          <circle cx="2" cy="-96" r="3.5" fill={color} opacity="0.4" />
          {/* Arch detail lines */}
          <path
            d="M-60,0 C-60,-48 -38,-78 0,-82"
            fill="none"
            stroke={color}
            strokeWidth="0.7"
            opacity="0.4"
          />
          <path
            d="M60,0 C60,-48 38,-78 0,-82"
            fill="none"
            stroke={color}
            strokeWidth="0.7"
            opacity="0.4"
          />
          {/* Minaret right */}
          <rect x="2" y="-95" width="6" height="95" fill={color} opacity="0.35" />
          <polygon points="2,-95 5,-115 8,-95" fill={color} opacity="0.5" />
        </g>

        {/* Center dome (largest - Registan main ivan) */}
        <g transform="translate(720, 150)">
          {/* Left minaret */}
          <rect x="-145" y="-138" width="9" height="138" fill={color} opacity="0.4" />
          <polygon points="-145,-138 -140.5,-165 -136,-138" fill={color} opacity="0.6" />
          <circle cx="-140.5" cy="-168" r="4" fill={color} opacity="0.45" />

          {/* Archway (iwan) */}
          <path
            d="M-100,0 L-100,-60 C-100,-105 -62,-135 0,-138 C62,-135 100,-105 100,-60 L100,0 Z"
            fill={color}
            opacity="0.3"
            stroke={color}
            strokeWidth="1.2"
          />

          {/* Inner arch cutout for depth */}
          <path
            d="M-82,0 L-82,-52 C-82,-92 -52,-116 0,-118 C52,-116 82,-92 82,-52 L82,0 Z"
            fill={color}
            opacity="0.12"
          />

          {/* Main dome on top */}
          <ellipse cx="0" cy="-138" rx="55" ry="26" fill={color} opacity="0.32" stroke={color} strokeWidth="1" />

          {/* Dome finial */}
          <line x1="0" y1="-164" x2="0" y2="-175" stroke={color} strokeWidth="1.5" opacity="0.6" />
          <circle cx="0" cy="-178" r="5" fill="none" stroke={color} strokeWidth="1.2" />
          <circle cx="2.5" cy="-178" r="3.5" fill={color} opacity="0.5" />

          {/* Decorative horizontal band */}
          <rect x="-100" y="-30" width="200" height="5" fill={color} opacity="0.18" rx="2" />
          <rect x="-100" y="-22" width="200" height="2" fill={color} opacity="0.14" />

          {/* Right minaret */}
          <rect x="136" y="-138" width="9" height="138" fill={color} opacity="0.4" />
          <polygon points="136,-138 140.5,-165 145,-138" fill={color} opacity="0.6" />
          <circle cx="140.5" cy="-168" r="4" fill={color} opacity="0.45" />

          {/* Lattice arch detail */}
          <path
            d="M-88,-8 C-88,-90 -58,-120 0,-122 C58,-120 88,-90 88,-8"
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            opacity="0.3"
            strokeDasharray="6 4"
          />
        </g>

        {/* Right dome (smaller, mirror) */}
        <g transform="translate(1260, 150)">
          {/* Minaret left */}
          <rect x="-8" y="-95" width="6" height="95" fill={color} opacity="0.35" />
          <polygon points="-8,-95 -5,-115 -2,-95" fill={color} opacity="0.5" />
          {/* Main dome */}
          <path
            d="M-70,0 C-70,-55 -45,-88 0,-92 C45,-88 70,-55 70,0 Z"
            fill={color}
            opacity="0.28"
            stroke={color}
            strokeWidth="1"
          />
          <rect x="-10" y="-18" width="20" height="18" fill={color} opacity="0.22" />
          <circle cx="0" cy="-96" r="5" fill="none" stroke={color} strokeWidth="1.2" />
          <circle cx="2" cy="-96" r="3.5" fill={color} opacity="0.4" />
          <path
            d="M-60,0 C-60,-48 -38,-78 0,-82"
            fill="none"
            stroke={color}
            strokeWidth="0.7"
            opacity="0.4"
          />
          <path
            d="M60,0 C60,-48 38,-78 0,-82"
            fill="none"
            stroke={color}
            strokeWidth="0.7"
            opacity="0.4"
          />
          {/* Minaret right */}
          <rect x="2" y="-95" width="6" height="95" fill={color} opacity="0.35" />
          <polygon points="2,-95 5,-115 8,-95" fill={color} opacity="0.5" />
        </g>
      </svg>
    </div>
  );
};

export default DomeDecor;
