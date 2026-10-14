"use client";

import { useEffect, useState } from "react";
import { sections, type Tone } from "@/lib/tokens";

type ActiveSection = {
  /** 0-based index of the section crossing the viewport centre. */
  index: number;
  /** Tone of the section currently behind the given probe line. */
  tone: Tone;
};

/**
 * Tracks which homepage section is at a horizontal probe line.
 * `probe` is a viewport Y position in px, or "center".
 */
export function useActiveSection(probe: number | "center" = "center"): ActiveSection {
  const [state, setState] = useState<ActiveSection>({ index: 0, tone: sections[0].tone });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = probe === "center" ? window.innerHeight / 2 : probe;
      const els = document.querySelectorAll<HTMLElement>("[data-section]");
      let next: ActiveSection | null = null;
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= y && rect.bottom > y) {
          next = {
            index: Number(el.dataset.index ?? 0),
            tone: (el.dataset.tone as Tone) ?? "ink",
          };
        }
      });
      if (next) {
        const { index, tone } = next;
        setState((prev) => (prev.index === index && prev.tone === tone ? prev : next!));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [probe]);

  return state;
}
