"use client";

import dynamic from "next/dynamic";

// GSAP, ScrollTrigger, SplitText and Lenis are not needed for the first paint,
// so they load in their own chunks after hydration.
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });
const Motion = dynamic(() => import("@/components/Motion"), { ssr: false });

export function SmoothScrollLoader() {
  return <SmoothScroll />;
}

export function MotionLoader() {
  return <Motion />;
}
