"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { a2 } from "@/content/site";
import { Reveal } from "./ui";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

export function WhyA2() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  // Words fill in as the paragraph is read, so the explanation lands in order.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = a2.body.split(" ");

  return (
    <section id="a2" className="bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-10">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-ink-3">Why A2</p>
        <h2 className="sr-only">{a2.title}</h2>
        <p ref={ref} className="mt-6 text-[1.75rem] font-medium leading-[1.25] tracking-[-0.02em] sm:text-4xl md:text-[2.75rem]">
          {reduce
            ? a2.body
            : words.map((w, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                  {w}
                </Word>
              ))}
        </p>

        <dl className="mt-20 grid gap-10 border-t border-line pt-10 sm:grid-cols-3 sm:gap-8">
          {a2.points.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.08}>
              <dt className="text-5xl font-semibold tracking-[-0.04em] md:text-6xl">
                {p.k}
              </dt>
              <dd className="mt-3 max-w-[28ch] text-[15px] leading-relaxed text-ink-2">{p.v}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
