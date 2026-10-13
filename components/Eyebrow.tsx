type EyebrowProps = {
  /** Section number, e.g. 2 renders "(02)". Omit for an unnumbered eyebrow. */
  index?: number;
  children: string;
  className?: string;
};

/** `(02) SECTION NAME` label with a 40px line before it. */
export default function Eyebrow({ index, children, className = "" }: EyebrowProps) {
  return (
    <p className={`t-label flex items-center gap-4 text-(--accent) ${className}`}>
      <span aria-hidden="true" className="h-0.5 w-10 shrink-0 bg-current" />
      <span>
        {index !== undefined && `(${String(index).padStart(2, "0")}) `}
        {children}
      </span>
    </p>
  );
}
