"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "./ui";

const MilkBottle = dynamic(() => import("./three/MilkBottle"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  // The bottle label is drawn to a canvas, so wait for Geist to load first.
  const [fontsReady, setFontsReady] = useState(false);
  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section id="top" className="relative mx-auto grid min-h-[100dvh] max-w-[1400px] items-center gap-10 px-4 pb-12 pt-28 sm:px-6 md:grid-cols-12 md:gap-6 md:pb-16 md:pt-24 lg:px-10">
      <div className="md:col-span-6 lg:col-span-6">
        <motion.p {...enter(0)} className="mb-6 inline-flex items-center gap-2 rounded-full bg-surface-2 px-4 py-1.5 text-sm text-ink-2">
          Gir, Sahiwal and Hallikar cows
        </motion.p>
        <motion.h1
          {...enter(0.08)}
          className="max-w-[14ch] text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
        >
          A2 milk, bottled <span className="text-ink-3">this morning.</span>
        </motion.h1>
        <motion.p {...enter(0.16)} className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink-2">
          Unpasteurised, unskimmed milk from our desi herd, delivered across Bengaluru in glass bottles within hours of milking.
        </motion.p>
        <motion.div {...enter(0.24)} className="mt-9 flex flex-wrap gap-3">
          <Button href="#subscribe">
            Subscribe <ArrowRight size={18} weight="bold" />
          </Button>
          <Button href="#products" variant="secondary">
            See products
          </Button>
        </motion.div>
      </div>

      <motion.div
        {...(reduce ? {} : { initial: { opacity: 0, scale: 0.97 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1.2, delay: 0.1, ease: EASE } })}
        className="relative md:col-span-6 lg:col-span-6"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-surface-2 sm:aspect-square md:aspect-[4/5] lg:aspect-[5/6]">
          {/* Pasture horizon behind the bottle */}
          <div
            aria-hidden
            className="absolute inset-x-[-20%] bottom-[-55%] h-[95%] rounded-[50%] bg-pasture"
          />
          <div
            aria-hidden
            className="absolute inset-x-[-10%] bottom-[-62%] h-[80%] rounded-[50%] bg-[color-mix(in_oklab,var(--pasture)_80%,black)]"
          />
          <div
            aria-hidden
            className="absolute right-[12%] top-[10%] size-20 rounded-full bg-accent sm:size-24"
          />
          <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
            {fontsReady && <MilkBottle onReady={() => setReady(true)} />}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
