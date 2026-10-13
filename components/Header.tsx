"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { navLinks } from "@/lib/tokens";
import { useActiveSection } from "@/lib/useActiveSection";

/** Header height in px; the tone probe sits in its middle. */
const HEADER_PROBE = 44;

export default function Header() {
  const { tone: sectionTone } = useActiveSection(HEADER_PROBE);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const tone = open ? "ink" : sectionTone;

  const close = useCallback(() => {
    setOpen(false);
    menuButton.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    overlay.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !overlay.current) return;
      const items = overlay.current.querySelectorAll<HTMLElement>("a, button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <header
      className={`tone-${tone} fixed inset-x-0 top-0 z-50 transition-colors duration-300`}
    >
      <div className="container-x flex h-[88px] items-center justify-between gap-6">
        <Link
          href="/#hero"
          aria-label="Twofold, back to top"
          className="relative z-10 flex min-h-11 items-center"
          onClick={() => setOpen(false)}
        >
          <Logo tone={tone} />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={`/${link.href}`}
                  className="t-label inline-flex min-h-11 items-center whitespace-nowrap underline-offset-8 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="/#contact" arrow={false} className="whitespace-nowrap">
            Let&apos;s talk
          </Button>
        </div>

        <button
          ref={menuButton}
          type="button"
          className="t-label relative z-10 inline-flex min-h-11 min-w-11 items-center justify-center gap-3 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => (open ? close() : setOpen(true))}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
            {open ? (
              <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            ) : (
              <path d="M3 8h18M3 16h18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          ref={overlay}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="tone-ink bg-tone fixed inset-0 flex flex-col overflow-y-auto px-(--gutter) pt-[120px] pb-10 lg:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={`/${link.href}`}
                    onClick={() => setOpen(false)}
                    className="font-display inline-flex min-h-11 items-center text-[56px] leading-none uppercase"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-10">
            <Button href="/#contact" onClick={() => setOpen(false)}>
              Let&apos;s talk
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
