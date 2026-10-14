"use client";

import { useEffect, useState } from "react";

export type ThreeSupport = "pending" | "3d" | "fallback";

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Decides whether to run the live 3D canvas or show still fallbacks.
 * Fallback when the visitor prefers reduced motion, the device has 4 or
 * fewer CPU threads, or WebGL is unavailable. `?3d=on`, `?3d=debug` (also
 * reports draw calls on window.__drawCalls), `?3d=still` (frozen poses, for
 * rendering the fallbacks) and `?3d=off` override
 * this for testing.
 */
export function detectThreeSupport(): Exclude<ThreeSupport, "pending"> {
  const override = new URLSearchParams(window.location.search).get("3d");
  if (override === "off") return "fallback";
  if (!hasWebGL()) return "fallback";
  if (override === "on" || override === "debug" || override === "still") return "3d";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "fallback";
  const threads = navigator.hardwareConcurrency;
  if (threads && threads <= 4) return "fallback";
  return "3d";
}

/** "pending" during SSR and the first client render, then "3d" or "fallback". */
export function useIsLowPower(): ThreeSupport {
  const [support, setSupport] = useState<ThreeSupport>("pending");
  useEffect(() => {
    const update = () => setSupport(detectThreeSupport());
    update();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return support;
}
