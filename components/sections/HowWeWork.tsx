import Eyebrow from "@/components/Eyebrow";
import Section from "@/components/Section";
import SceneSlot, { type SceneName } from "@/components/three/SceneSlot";

const steps: { title: string; body: string; scene: SceneName }[] = [
  { title: "Discovery", body: "A call to understand your business and goals.", scene: "step-discovery" },
  { title: "Onboarding", body: "Logins, brand assets and your FAQs, which train your AI assistant.", scene: "step-onboarding" },
  { title: "Setup", body: "In two weeks: website, Google profile, AI assistant and ad accounts, live.", scene: "step-setup" },
  { title: "Grow", body: "Every month: plan, post, run ads, report, improve.", scene: "step-grow" },
];

export default function HowWeWork() {
  return (
    <Section id="how-we-work" labelledBy="how-title" className="py-24 lg:flex lg:flex-col lg:justify-center lg:py-32">
      <div className="container-x flex flex-col gap-10 lg:gap-16">
        <div className="flex flex-col gap-4">
          <Eyebrow index={5}>How we work</Eyebrow>
          <h2 id="how-title" className="t-title" data-reveal>
            Four steps. Every client.
          </h2>
        </div>
        <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6" data-steps>
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-4 border-t-2 border-cream-soft/30 pt-6" data-step>
              <SceneSlot scene={s.scene} className="h-[140px] w-full" />
              <p aria-hidden="true" className="font-display text-[80px] leading-none text-orange md:text-[96px]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-[32px] leading-none uppercase md:text-[36px]">{s.title}</h3>
              <p className="t-body text-cream-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
