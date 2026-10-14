import "server-only";
import type { AuditInput } from "@/lib/audit";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function rows(lead: AuditInput) {
  return [
    ["Name", lead.name],
    ["Business", lead.business],
    ["Type", lead.type || "Not given"],
    ["WhatsApp", lead.phone],
    ["Website / Instagram", lead.link || "Not given"],
  ] as const;
}

async function sendEmail(lead: AuditInput, apiKey: string, to: string) {
  const from = process.env.AUDIT_FROM_EMAIL || "Twofold Audit <onboarding@resend.dev>";
  const text = rows(lead).map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<h2>New free AI audit request</h2><table cellpadding="6">${rows(lead)
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      subject: `Free AI audit request: ${lead.business}`,
      text,
      html,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text().catch(() => "")}`);
}

async function sendWebhook(lead: AuditInput, url: string) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, source: "twofold-website", submittedAt: new Date().toISOString() }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

/**
 * Forwards a lead to every configured channel (Resend email and/or webhook).
 * Resolves true if at least one channel accepted it.
 */
export async function sendLead(lead: AuditInput): Promise<boolean> {
  const { RESEND_API_KEY, AUDIT_TO_EMAIL, AUDIT_WEBHOOK_URL } = process.env;
  const jobs: Promise<void>[] = [];
  if (RESEND_API_KEY && AUDIT_TO_EMAIL) jobs.push(sendEmail(lead, RESEND_API_KEY, AUDIT_TO_EMAIL));
  if (AUDIT_WEBHOOK_URL) jobs.push(sendWebhook(lead, AUDIT_WEBHOOK_URL));

  if (jobs.length === 0) {
    console.error("[audit] No delivery configured: set RESEND_API_KEY + AUDIT_TO_EMAIL and/or AUDIT_WEBHOOK_URL.");
    return false;
  }
  const results = await Promise.allSettled(jobs);
  results.forEach((r) => {
    if (r.status === "rejected") console.error("[audit] Delivery failed:", r.reason);
  });
  return results.some((r) => r.status === "fulfilled");
}
