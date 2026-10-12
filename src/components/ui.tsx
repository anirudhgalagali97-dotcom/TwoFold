"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades content up as it enters the viewport. Static under reduced motion. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 h-12 text-[15px] font-medium transition-[transform,background-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]";

export const buttonStyles = {
  primary: `${base} bg-accent text-accent-ink hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-12px_rgb(227_155_45/0.7)]`,
  secondary: `${base} bg-transparent text-ink ring-1 ring-inset ring-line hover:bg-surface-2`,
  dark: `${base} bg-ink text-bg hover:-translate-y-0.5`,
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: keyof typeof buttonStyles }) {
  return <a {...props} className={`${buttonStyles[variant]} ${className}`} />;
}
