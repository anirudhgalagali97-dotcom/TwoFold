import type { Tone } from "@/lib/tokens";

type LogoProps = {
  /** Background the logo sits on; picks a circle colour that stands out. */
  tone?: Tone;
  className?: string;
};

/** Two shapes (solid circle over a rounded-square outline) + TWOFOLD wordmark. */
export function LogoMark({ tone = "ink", className }: LogoProps) {
  const circle = tone === "orange" ? "var(--cream)" : "var(--orange)";
  return (
    <svg
      viewBox="0 0 46 28"
      width="46"
      height="28"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="19.5"
        y="2.5"
        width="23"
        height="23"
        rx="6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <circle cx="14" cy="14" r="12" fill={circle} />
    </svg>
  );
}

export default function Logo({ tone = "ink", className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark tone={tone} />
      <span className="font-display text-[28px] leading-none tracking-[0.02em] uppercase">
        Twofold
      </span>
    </span>
  );
}
