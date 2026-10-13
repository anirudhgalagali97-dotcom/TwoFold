import type { ReactNode } from "react";
import { sections, type SectionId } from "@/lib/tokens";

type SectionProps = {
  id: SectionId;
  /** Accessible name; points at the section's heading id. */
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

/** A full-height homepage section with its brand tone and counter index. */
export default function Section({ id, labelledBy, className = "", children }: SectionProps) {
  const index = sections.findIndex((s) => s.id === id);
  const { tone } = sections[index];
  return (
    <section
      id={id}
      data-section
      data-index={index}
      data-tone={tone}
      aria-labelledby={labelledBy}
      className={`tone-${tone} bg-tone relative isolate overflow-clip lg:min-h-svh ${className}`}
    >
      {children}
    </section>
  );
}
