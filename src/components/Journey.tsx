"use client";

import { motion, useReducedMotion } from "motion/react";
import { JarLabel, SunHorizon, Truck } from "@phosphor-icons/react";
import { journey } from "@/content/site";

const stepIcons = [SunHorizon, JarLabel, Truck];
const EASE = [0.16, 1, 0.3, 1] as const;

export function Journey() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="journey-title" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <h2 id="journey-title" className="max-w-[20ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
          Fresh every morning, within hours of milking
        </h2>

        <div className="relative mt-16">
          {/* The line draws from farm to doorstep as the section comes into view. */}
          <motion.div
            aria-hidden
            className="absolute left-7 top-7 hidden h-px origin-left bg-accent md:block"
            style={{ right: "calc(33.333% - 1.75rem)" }}
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.6, ease: EASE }}
          />
          <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
            {journey.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.li
                  key={step.title}
                  className="relative"
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.35, ease: EASE }}
                >
                  <span className="relative grid size-14 place-items-center rounded-full bg-accent text-accent-ink">
                    <Icon size={26} weight="duotone" />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                  <p className="mt-2 max-w-[34ch] leading-relaxed text-ink-2">{step.body}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
