"use client";

import { useSyncExternalStore } from "react";

/**
 * Shared 3D status: "off" (fallback images), "loading" (canvas code is
 * downloading) or "ready" (canvas drew its first frame; hide the stills).
 */
export type ThreeStatus = "off" | "loading" | "ready";

let status: ThreeStatus = "off";
const listeners = new Set<() => void>();

export function setThreeStatus(next: ThreeStatus) {
  if (next === status) return;
  status = next;
  listeners.forEach((l) => l());
}

export function useThreeStatus() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => status,
    () => "off" as ThreeStatus,
  );
}
