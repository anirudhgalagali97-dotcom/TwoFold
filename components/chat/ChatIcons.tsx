import type { ChatIcon } from "@/components/chat/chatScript";

export default function ChatIconSvg({ icon, label }: { icon: ChatIcon; label?: string }) {
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };
  if (icon === "tick") {
    return (
      <svg viewBox="0 0 16 16" width="14" height="14" {...a11y} className="inline-block shrink-0">
        <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" {...a11y} className="ml-1 inline-block shrink-0 align-[-3px]">
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="5" cy="5.5" r="2.5" />
        <circle cx="5" cy="14.5" r="2.5" />
        <path d="M7 7 17 15M7 13 17 5" />
      </g>
    </svg>
  );
}
