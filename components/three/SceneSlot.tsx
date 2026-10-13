"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { heroPlaceholder } from "@/components/three/heroPlaceholder";
import { useThreeStatus } from "@/components/three/threeStore";

const SceneView = dynamic(() => import("@/components/three/SceneView"), { ssr: false });

export type SceneName =
  | "hero"
  | "manifesto"
  | "service-online"
  | "service-customers"
  | "service-assistant"
  | "edge"
  | "step-discovery"
  | "step-onboarding"
  | "step-setup"
  | "step-grow"
  | "work-demo"
  | "contact";

type SceneSlotProps = {
  scene: SceneName;
  className?: string;
  /** Hover / emphasis state passed to the scene (e.g. faster spin). */
  active?: boolean;
  /** How the still fallback fits the box. */
  fit?: "contain" | "cover";
  /** next/image `sizes` for the still fallback. */
  sizes?: string;
  /** Load the still at high priority (the hero, which is above the fold). */
  eager?: boolean;
};

/**
 * Where a 3D scene renders. Shows a still render from public/fallback/ until
 * the live canvas is ready, and permanently on low-power devices, under
 * reduced motion or without WebGL. Decorative: every meaning is also in text.
 */
export default function SceneSlot({
  scene,
  className = "",
  active,
  fit = "contain",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  eager = false,
}: SceneSlotProps) {
  const status = useThreeStatus();
  const ref = useRef<HTMLDivElement>(null);
  const [el, setEl] = useState<HTMLDivElement | null>(null);

  // Only mount a View for slots that are actually laid out (some are hidden on mobile).
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const ro = new ResizeObserver(([entry]) => {
      setEl(entry.contentRect.width > 0 && entry.contentRect.height > 0 ? node : null);
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" data-scene={scene} className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} ${className}`}>
      <Image
        src={`/fallback/${scene}.webp`}
        alt=""
        fill
        sizes={sizes}
        // Stills are pre-compressed WebP (scripts/render-fallbacks.mjs), so skip the optimizer.
        unoptimized
        preload={eager}
        placeholder={eager && scene === "hero" ? (heroPlaceholder as `data:image/${string}`) : "empty"}
        loading={eager ? undefined : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className={`select-none ${fit === "cover" ? "object-cover" : "object-contain"} transition-opacity duration-500 ${
          status === "ready" ? "opacity-0" : "opacity-100"
        }`}
        draggable={false}
      />
      {status !== "off" && el && <SceneView scene={scene} active={active} el={el} />}
    </div>
  );
}
