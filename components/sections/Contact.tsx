import AuditForm from "@/components/AuditForm";
import Eyebrow from "@/components/Eyebrow";
import Section from "@/components/Section";
import SceneSlot from "@/components/three/SceneSlot";

const details: { label?: string; value: string }[] = [
  { label: "Email", value: "[email]" },
  { label: "WhatsApp", value: "[WhatsApp number]" },
  { label: "Location", value: "Bangalore, India" },
  { value: "Instagram [handle]" },
  { value: "LinkedIn [page]" },
];

export default function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title" className="py-24 lg:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <div className="flex min-w-0 flex-col gap-6 md:gap-8">
          <Eyebrow index={7}>Contact</Eyebrow>
          <h2 id="contact-title" className="t-title" data-reveal>
            Let&apos;s build yours.
          </h2>
          <p className="t-body max-w-[560px]">
            Get a free AI audit. We&apos;ll check your Google profile, Instagram and how fast you
            reply to customers, and show you what you&apos;re missing. No cost, no pressure.
          </p>
          <SceneSlot scene="contact" className="h-[180px] w-full md:h-[220px]" />
          <ul className="flex flex-col gap-2" aria-label="Contact details">
            {details.map((d) => (
              <li key={d.value} className="t-body font-semibold">
                {d.label && <span className="sr-only">{d.label}: </span>}
                {d.value}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative min-w-0 rounded-[28px] border-2 border-ink p-6 md:p-10">
          <AuditForm />
        </div>
      </div>
    </Section>
  );
}
