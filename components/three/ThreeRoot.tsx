"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { setThreeStatus } from "@/components/three/threeStore";
import { useIsLowPower } from "@/lib/useIsLowPower";

const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

/**
 * Loads the shared 3D canvas only after the page (and the hero headline,
 * the LCP element) has painted, and only on capable devices.
 */
export default function ThreeRoot() {
  const support = useIsLowPower();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (support !== "3d") {
      setThreeStatus("off");
      return;
    }
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      setThreeStatus("loading");
      setLoad(true);
    };
    const idle = () =>
      "requestIdleCallback" in window ? window.requestIdleCallback(start, { timeout: 2500 }) : setTimeout(start, 600);
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", idle);
    };
  }, [support]);

  return load && support === "3d" ? <Scene /> : null;
}
