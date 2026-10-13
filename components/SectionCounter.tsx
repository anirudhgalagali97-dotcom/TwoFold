"use client";

import { sections } from "@/lib/tokens";
import { useActiveSection } from "@/lib/useActiveSection";

const pad = (n: number) => String(n).padStart(2, "0");

/** Fixed bottom-right `01 / 07` counter, updated as sections cross the centre. */
export default function SectionCounter() {
  const { index } = useActiveSection("center");
  return (
    <p
      className="t-label pointer-events-none fixed right-(--gutter) bottom-6 z-40 rounded-full bg-lemon px-3 py-1.5 text-ink tabular-nums"
      aria-hidden="true"
    >
      {pad(index + 1)} / {pad(sections.length)}
    </p>
  );
}
