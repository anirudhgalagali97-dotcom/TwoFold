import Eyebrow from "@/components/Eyebrow";
import Section from "@/components/Section";
import SceneSlot from "@/components/three/SceneSlot";
import { site } from "@/lib/site";

export default function Work() {
  return (
    <Section id="work" labelledBy="work-title" className="py-24 lg:py-40">
      <div className="container-x flex flex-col gap-10 lg:gap-16">
        <div className="flex flex-col gap-4">
          <Eyebrow index={6}>Work</Eyebrow>
          <h2 id="work-title" className="t-title" data-reveal>
            Recent work
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {[1, 2].map((n) => (
            <article key={n} className="flex flex-col gap-4">
              <div className="flex h-[260px] items-center justify-center rounded-3xl bg-ink/10 text-ink-soft md:h-[300px]">
                [Project image]
              </div>
              <p className="t-label text-ink-soft">[Client type]</p>
              <h3 className="font-display text-[32px] leading-none uppercase md:text-[36px]">
                [Pilot client {n} — result]
              </h3>
            </article>
          ))}
          <article className="flex flex-col gap-4">
            <div className="tone-ink bg-tone relative h-[260px] overflow-hidden rounded-3xl md:h-[300px]">
              <SceneSlot scene="work-demo" className="absolute inset-4" />
            </div>
            <p className="t-label text-ink-soft">Built in-house</p>
            <h3 className="font-display text-[32px] leading-none uppercase md:text-[36px]">The Twofold demo bot</h3>
            <p className="t-body text-ink-soft">
              Our own AI receptionist, built in-house. Message it on WhatsApp: {site.demoNumber}.
            </p>
          </article>
        </div>
      </div>
    </Section>
  );
}
