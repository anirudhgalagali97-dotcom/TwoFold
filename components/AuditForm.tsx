"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowIcon } from "@/components/Button";
import {
  businessTypes,
  HONEYPOT_FIELD,
  validateAudit,
  type AuditErrors,
  type AuditField,
} from "@/lib/audit";

type Status = "idle" | "sending" | "success" | "error" | "rate_limited";

const fieldClass =
  "min-h-12 w-full rounded-2xl border-2 bg-cream px-4 py-3 text-[17px] text-ink placeholder:text-ink-soft";

const ORDER: AuditField[] = ["name", "business", "type", "phone", "link"];

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-start gap-2 text-[15px] font-semibold">
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" className="mt-[3px] shrink-0">
        <circle cx="8" cy="8" r="7" fill="var(--ink)" />
        <path d="M8 4.5v4.2M8 11.2v.1" stroke="var(--lemon)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      {message}
    </p>
  );
}

export default function AuditForm() {
  const [errors, setErrors] = useState<AuditErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const result = validateAudit(values);
    if (!result.ok) {
      setErrors(result.errors);
      const first = ORDER.find((f) => result.errors[f]);
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, phone: result.data.phone }),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      if (res.status === 422) {
        const body = await res.json().catch(() => ({}));
        setErrors(body.fields ?? {});
        setStatus("idle");
        return;
      }
      setStatus(res.status === 429 ? "rate_limited" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[320px] flex-col items-start justify-center gap-6">
        <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
          <circle cx="24" cy="24" r="22" fill="var(--ink)" />
          <path d="M14 25l7 7 13-15" fill="none" stroke="var(--lemon)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p ref={successRef} tabIndex={-1} role="status" className="font-display text-[36px] leading-none uppercase md:text-[44px]">
          Thanks! We&apos;ll message you on WhatsApp within one working day.
        </p>
      </div>
    );
  }

  const describe = (f: AuditField, hint?: string) =>
    [hint, errors[f] ? `audit-${f}-error` : undefined].filter(Boolean).join(" ") || undefined;
  const border = (f: AuditField) => (errors[f] ? "border-ink ring-2 ring-ink ring-offset-2 ring-offset-orange" : "border-ink");

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5" noValidate aria-describedby="audit-required-note">
      <p id="audit-required-note" className="text-[15px]">
        Name, business name and WhatsApp number are required.
      </p>

      <div className="flex flex-col gap-2">
        <label htmlFor="audit-name" className="t-label">Name</label>
        <input id="audit-name" name="name" autoComplete="name" required maxLength={100}
          aria-invalid={!!errors.name} aria-describedby={describe("name")} className={`${fieldClass} ${border("name")}`} />
        <FieldError id="audit-name-error" message={errors.name} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="audit-business" className="t-label">Business name</label>
        <input id="audit-business" name="business" autoComplete="organization" required maxLength={120}
          aria-invalid={!!errors.business} aria-describedby={describe("business")} className={`${fieldClass} ${border("business")}`} />
        <FieldError id="audit-business-error" message={errors.business} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="audit-type" className="t-label">Type of business</label>
        <select id="audit-type" name="type" defaultValue="" aria-invalid={!!errors.type}
          aria-describedby={describe("type")} className={`${fieldClass} ${border("type")}`}>
          <option value="">Choose one</option>
          {businessTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <FieldError id="audit-type-error" message={errors.type} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="audit-phone" className="t-label">WhatsApp number</label>
        <input id="audit-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={20}
          placeholder="98765 43210" aria-invalid={!!errors.phone} aria-describedby={describe("phone", "audit-phone-hint")}
          className={`${fieldClass} ${border("phone")}`} />
        <p id="audit-phone-hint" className="text-[15px]">10-digit Indian mobile number. +91 is optional.</p>
        <FieldError id="audit-phone-error" message={errors.phone} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="audit-link" className="t-label">
          Website or Instagram link <span className="tracking-normal normal-case">(optional)</span>
        </label>
        <input id="audit-link" name="link" type="text" inputMode="url" autoComplete="url" maxLength={300}
          aria-invalid={!!errors.link} aria-describedby={describe("link")} className={`${fieldClass} ${border("link")}`} />
        <FieldError id="audit-link-error" message={errors.link} />
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="audit-hp">Company website</label>
        <input id="audit-hp" name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-2 flex flex-col items-start gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          aria-busy={status === "sending"}
          className="group t-label inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-lemon px-7 py-4 text-ink transition-[transform,filter] duration-200 ease-out hover:-translate-y-0.5 hover:brightness-95 disabled:cursor-wait disabled:opacity-80"
        >
          <span>{status === "sending" ? "Sending…" : "Get my free audit"}</span>
          {status === "sending" ? (
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" className="animate-spin">
              <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="2.5" />
              <path d="M10 2.5a7.5 7.5 0 0 1 7.5 7.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            <ArrowIcon />
          )}
        </button>
        <div role="alert" className="empty:hidden">
          {status === "error" && (
            <p className="t-body font-semibold">
              Sorry, that didn&apos;t go through. Please check your connection and try again.
            </p>
          )}
          {status === "rate_limited" && (
            <p className="t-body font-semibold">
              You&apos;ve sent a few requests already. Please wait a few minutes and try again.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
