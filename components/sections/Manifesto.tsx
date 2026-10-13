import Eyebrow from "@/components/Eyebrow";
import Section from "@/components/Section";
import SceneSlot from "@/components/three/SceneSlot";

export default function Manifesto() {
  return (
    <Section id="manifesto" labelledBy="manifesto-title" className="flex flex-col justify-center py-24 lg:py-40">
      <SceneSlot scene="manifesto" className="pointer-events-none absolute inset-0 -z-10 hidden !rounded-none !bg-transparent md:block" />
      <div className="container-x flex flex-col items-center gap-10 text-center lg:gap-16">
        <Eyebrow index={2}>Why Twofold</Eyebrow>
        <h2 id="manifesto-title" className="t-title max-w-[1180px]" data-reveal>
          Big-agency results at small-business prices. Because{" "}
          <span className="text-orange">AI does the heavy lifting</span>.
        </h2>
        <p className="t-label text-cream-soft">
          Attention <span aria-hidden="true">→</span>
          <span className="sr-only">to</span> Lead <span aria-hidden="true">→</span>
          <span className="sr-only">to</span> Customer
        </p>
      </div>
    </Section>
  );
}
