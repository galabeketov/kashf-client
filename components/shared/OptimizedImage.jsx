"use client";

import { useState } from "react";
import Image from "next/image";

const fallbackBackground = "#eef2f7";

const shouldBypassOptimizer = (src) => {
  if (typeof src !== "string") return false;
  return src.startsWith("https://firebasestorage.googleapis.com/");
};

const OptimizedImage = ({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  wrapperStyle = {},
  imageStyle = {},
  skeletonStyle = {},
  className,
  onClick,
}) => {
  const [loaded, setLoaded] = useState(false);
  const unoptimized = shouldBypassOptimizer(src);

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        position: "relative",
        overflow: "hidden",
        background: fallbackBackground,
        ...wrapperStyle,
      }}
    >
      {!loaded && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(110deg, rgba(255,255,255,0.55) 8%, rgba(255,255,255,0.15) 18%, rgba(255,255,255,0.55) 33%)",
            backgroundSize: "200% 100%",
            animation: "kashfImageShimmer 1.4s ease-in-out infinite",
            ...skeletonStyle,
          }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        unoptimized={unoptimized}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        decoding="async"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          opacity: loaded ? 1 : 0,
          transition: "opacity 240ms ease",
          ...imageStyle,
        }}
        onLoad={() => setLoaded(true)}
      />
      <style jsx global>{`
        @keyframes kashfImageShimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage;
