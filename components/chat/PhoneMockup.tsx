import type { ReactNode } from "react";

/** Phone frame with a WhatsApp-style chat header. */
export default function PhoneMockup({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[340px] rounded-[48px] bg-ink p-3.5 shadow-[0_40px_70px_-30px_rgba(20,22,28,0.6)]">
      <div className="flex h-[600px] flex-col overflow-hidden rounded-[36px] bg-cream text-ink">
        <div className="flex items-center gap-3 bg-ink px-5 pt-6 pb-4 text-cream">
          <span aria-hidden="true" className="size-10 shrink-0 rounded-full bg-orange" />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[15px] font-semibold">[Demo Salon] · AI assistant</span>
            <span className="text-[12px] text-cream-soft">Powered by Twofold</span>
          </div>
        </div>
        {children}
        <div aria-hidden="true" className="flex items-center gap-2 px-3.5 pt-2 pb-4">
          <div className="flex-1 rounded-full bg-cream-soft/40 px-4 py-3 text-[13px] text-ink-soft">Message</div>
          <span className="size-10 rounded-full bg-ink" />
        </div>
      </div>
    </div>
  );
}
