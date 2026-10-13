"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Scroll-linked motion for the homepage:
 * - headlines marked [data-reveal] slide up line by line when 30% into view
 * - section 05 pins on desktop and moves its steps horizontally
 * Nothing runs under prefers-reduced-motion.
 */
export default function Motion() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const splits: SplitText[] = [];
      let cancelled = false;
      document.fonts.ready.then(() => {
        if (cancelled) return;
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          splits.push(
            SplitText.create(el, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, {
                  yPercent: 100,
                  duration: 0.8,
                  ease: "power3.out",
                  stagger: 0.08,
                  scrollTrigger: { trigger: el, start: "top 70%", once: true },
                }),
            }),
          );
        });
        ScrollTrigger.refresh();
      });
      return () => {
        cancelled = true;
        splits.forEach((s) => s.revert());
      };
    });

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const section = document.getElementById("how-we-work");
      const track = section?.querySelector<HTMLElement>("[data-steps]");
      if (!section || !track) return;
      section.classList.add("is-horizontal");
      const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => section.style.setProperty("--steps-progress", self.progress.toFixed(3)),
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        section.classList.remove("is-horizontal");
        section.style.removeProperty("--steps-progress");
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
