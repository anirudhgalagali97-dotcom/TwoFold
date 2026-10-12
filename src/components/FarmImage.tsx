"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Shows a farm photo from /public/images. Until the photo file exists the
 * designed fallback renders instead, so the layout never shows a broken image.
 */
export function FarmImage({
  src,
  alt,
  className = "",
  fallback,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  fallback: ReactNode;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // The error can fire before hydration attaches onError, so check once mounted.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {fallback}
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
