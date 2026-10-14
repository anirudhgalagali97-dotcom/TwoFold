"use client";

import { useId, useState } from "react";
import SceneSlot, { type SceneName } from "@/components/three/SceneSlot";

export type Service = {
  title: string;
  line: string;
  features: string[];
  scene: SceneName;
  signature?: boolean;
};

export default function ServiceCard({ service }: { service: Service }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const listId = useId();
  const dark = service.signature;

  return (
    <article
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={`relative flex flex-col gap-4 rounded-[28px] border-2 p-6 transition-colors duration-300 md:p-8 ${
        dark
          ? "tone-ink bg-tone border-cream-soft/40 hover:border-cream"
          : "border-ink/25 hover:border-ink"
      }`}
    >
      {dark && (
        <p className="t-label absolute top-6 right-6 rounded-full bg-lemon px-3 py-1.5 !text-[12px] text-ink">
          Signature
        </p>
      )}
      <SceneSlot scene={service.scene} active={hovered || open} className="h-[200px] w-full md:h-[220px]" />
      <h3 className="font-display text-[40px] leading-[0.95] uppercase md:text-[48px]">{service.title}</h3>
      <p className="t-body text-(--fg-soft)">{service.line}</p>

      <div
        id={listId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <ul className="flex flex-col gap-2 overflow-hidden">
          {service.features.map((f) => (
            <li key={f} className="flex items-start gap-3 first:pt-2">
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className="mt-[5px] shrink-0">
                <circle cx="8" cy="8" r="4" fill="currentColor" />
              </svg>
              <span className="t-body">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className="mt-auto inline-flex size-12 items-center justify-center self-start rounded-full border-2 border-current"
      >
        <span className="sr-only">
          {open ? "Hide" : "Show"} {service.title} features
        </span>
        <svg
          viewBox="0 0 20 20"
          width="20"
          height="20"
          aria-hidden="true"
          className={`transition-transform duration-300 ease-out ${open ? "rotate-45" : ""}`}
        >
          <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </button>
    </article>
  );
}
