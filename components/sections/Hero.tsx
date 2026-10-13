import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import Section from "@/components/Section";
import SceneSlot from "@/components/three/SceneSlot";

export default function Hero() {
  return (
    <Section id="hero" labelledBy="hero-title" className="flex flex-col pt-[120px] pb-24 lg:pb-32">
      <div className="container-x grid flex-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="flex min-w-0 flex-col gap-6 md:gap-8">
          <Eyebrow>AI-powered marketing studio · Bangalore</Eyebrow>
          <h1 id="hero-title" className="t-display" data-reveal>
            Marketing with a second brain.
          </h1>
          <p className="t-body max-w-[540px]">
            The AI-powered marketing team for small businesses. We get you found, bring in
            customers, and make sure no enquiry ever goes unanswered.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="#contact">Get a free AI audit</Button>
            <Button href="#ai-edge" variant="secondary">
              See how it works
            </Button>
          </div>
        </div>
        <SceneSlot scene="hero" className="h-[320px] w-full md:h-[440px] lg:h-[min(72svh,660px)]" />
      </div>

      <p className="t-label absolute bottom-8 left-(--gutter) hidden items-center gap-3 md:flex" aria-hidden="true">
        <span className="h-10 w-0.5 bg-current" />
        Scroll
      </p>
    </Section>
  );
}
