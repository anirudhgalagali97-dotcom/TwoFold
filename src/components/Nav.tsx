"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { brand, nav } from "@/content/site";
import { Button } from "./ui";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 font-semibold tracking-tight ${className}`} aria-label={`${brand.name} home`}>
      <span aria-hidden className="grid size-8 place-items-center rounded-full bg-accent text-[15px] font-bold text-accent-ink">C</span>
      <span className="text-[17px]">{brand.name}</span>
    </a>
  );
}

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={`mx-auto mt-3 flex h-16 max-w-[1400px] items-center justify-between rounded-full px-4 transition-[background-color,box-shadow,margin] duration-500 sm:px-6 lg:mx-6 xl:mx-auto ${
          scrolled
            ? "mx-3 bg-surface/80 shadow-[0_8px_30px_-16px_rgb(15_30_22/0.35)] ring-1 ring-line backdrop-blur-xl"
            : "mx-3 bg-transparent"
        }`}
      >
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rounded-full px-4 py-2 text-[15px] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button href="#subscribe" className="hidden h-10 px-5 sm:inline-flex">Subscribe</Button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid size-10 place-items-center rounded-full ring-1 ring-inset ring-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-3 mt-2 rounded-[28px] bg-surface p-3 shadow-[0_20px_50px_-20px_rgb(15_30_22/0.4)] ring-1 ring-line lg:hidden"
          >
            <ul className="grid">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-lg hover:bg-surface-2">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button href="#subscribe" onClick={() => setOpen(false)} className="mt-2 w-full">Subscribe</Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
