import ChatDemo from "@/components/chat/ChatDemo";
import Eyebrow from "@/components/Eyebrow";
import Section from "@/components/Section";
import SceneSlot from "@/components/three/SceneSlot";

const points = [
  "Replies in seconds, day and night",
  "Books appointments automatically",
  "Follows up with people who went quiet",
];

export default function AiEdge() {
  return (
    <Section id="ai-edge" labelledBy="ai-edge-title" className="py-24 lg:py-40">
      <div className="container-x grid items-center gap-16 md:grid-cols-[1.2fr_1fr] lg:gap-24">
        <div className="flex min-w-0 flex-col gap-6 md:gap-8">
          <Eyebrow index={4}>The AI edge</Eyebrow>
          <h2 id="ai-edge-title" className="t-title" data-reveal>
            We don&apos;t just bring leads. We answer them.
          </h2>
          <p className="t-body max-w-[560px]">
            Most agencies stop once the enquiry arrives. Twofold installs an AI receptionist into
            your business, so every message gets a reply in seconds, appointments get booked, and
            nobody falls through the cracks.
          </p>
          <ul className="flex flex-col gap-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[17px] font-semibold md:text-[18px]">
                <svg viewBox="0 0 26 26" width="26" height="26" aria-hidden="true" className="shrink-0">
                  <circle cx="13" cy="13" r="12" fill="var(--ink)" />
                  <path d="M8 13.5 11.5 17 18 9.5" fill="none" stroke="var(--lemon)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex flex-col items-center gap-5">
          <SceneSlot scene="edge" className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 hidden !bg-transparent md:block" />
          <ChatDemo />
        </div>
      </div>
    </Section>
  );
}
