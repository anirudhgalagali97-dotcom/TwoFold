import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary";

type CommonProps = {
  variant?: Variant;
  /** Show the arrow icon (defaults to true for primary). */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

type AsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & { href: string };
type AsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };

export type ButtonProps = AsLink | AsButton;

const base =
  "group t-label inline-flex min-h-11 items-center justify-center gap-3 rounded-full px-7 py-4 " +
  "no-underline transition-[transform,background-color,filter] duration-200 ease-out " +
  "hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Lemon pill, ink text; hover lifts 2px and darkens slightly.
  primary: "bg-lemon text-ink hover:brightness-95",
  // Transparent with a 2px border in the section's text colour.
  secondary: "border-2 border-current bg-transparent text-current py-[14px] px-[26px]",
};

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="18"
      height="18"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1 ${className}`}
    >
      <path
        d="M3 10h13M11 4.5 16.5 10 11 15.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Button(props: ButtonProps) {
  const { variant = "primary", arrow, children, className = "", ...rest } = props;
  const showArrow = arrow ?? variant === "primary";
  const classes = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {showArrow && <ArrowIcon />}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as ComponentPropsWithoutRef<"a">)}>
        {content}
      </a>
    );
  }
  const { type = "button", ...buttonRest } = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
