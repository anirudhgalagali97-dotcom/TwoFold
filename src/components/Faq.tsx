"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react";
import { contact, faqs, tel } from "@/content/site";

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  const reduce = useReducedMotion();
  return (
    <div className="rounded-[28px] bg-surface ring-1 ring-line">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left text-lg font-medium"
        >
          {q}
          <Plus
            size={20}
            weight="bold"
            className={`shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[60ch] px-7 pb-7 leading-relaxed text-ink-2">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 md:py-32 lg:px-10">
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">Questions, answered</h2>
          <p className="mt-5 max-w-[36ch] leading-relaxed text-ink-2">
            Anything else? Call us on{" "}
            <a href={tel(contact.phones[0])} className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-4">
              {contact.phones[0]}
            </a>{" "}
            or write to{" "}
            <a href={`mailto:${contact.email}`} className="font-medium text-ink underline decoration-accent decoration-2 underline-offset-4">
              {contact.email}
            </a>
            .
          </p>
        </div>
        <div className="grid gap-3 md:col-span-8">
          {faqs.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
