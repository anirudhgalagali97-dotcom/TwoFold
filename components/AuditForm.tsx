export const businessTypes = [
  "Salon",
  "Clinic",
  "Gym",
  "Retail",
  "Food",
  "Education",
  "Services",
  "Other",
] as const;

const field =
  "min-h-12 w-full rounded-2xl border-2 border-ink bg-cream px-4 py-3 text-[17px] text-ink placeholder:text-ink-soft";

/** Free AI audit form (static in Phase 2; Phase 3 adds validation and submit). */
export default function AuditForm() {
  return (
    <form className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="audit-name" className="t-label">Name</label>
        <input id="audit-name" name="name" autoComplete="name" required className={field} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="audit-business" className="t-label">Business name</label>
        <input id="audit-business" name="business" autoComplete="organization" required className={field} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="audit-type" className="t-label">Type of business</label>
        <select id="audit-type" name="type" className={field} defaultValue="">
          <option value="" disabled>Choose one</option>
          {businessTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="audit-phone" className="t-label">WhatsApp number</label>
        <input id="audit-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={field} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="audit-link" className="t-label">
          Website or Instagram link <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input id="audit-link" name="link" type="text" inputMode="url" className={field} />
      </div>
      <button type="submit" className="t-label mt-2 inline-flex min-h-11 items-center justify-center gap-3 self-start rounded-full bg-lemon px-7 py-4 text-ink">
        Get my free audit
      </button>
    </form>
  );
}
