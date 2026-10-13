import { HONEYPOT_FIELD, validateAudit } from "@/lib/audit";
import { createRateLimiter } from "@/lib/rateLimit";
import { sendLead } from "@/lib/sendLead";

// 5 requests per IP every 10 minutes, per server instance.
const rateLimit = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
const MAX_BODY_BYTES = 10_000;

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const limit = rateLimit(clientIp(request));
  if (!limit.allowed) {
    return Response.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return Response.json({ ok: false, error: "too_large" }, { status: 413 });
    body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("not an object");
  } catch {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: bots fill every field. Pretend it worked and drop the lead.
  if (typeof body[HONEYPOT_FIELD] === "string" && body[HONEYPOT_FIELD] !== "") {
    return Response.json({ ok: true });
  }

  const result = validateAudit(body);
  if (!result.ok) {
    return Response.json({ ok: false, error: "invalid", fields: result.errors }, { status: 422 });
  }

  const delivered = await sendLead(result.data);
  if (!delivered) return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  return Response.json({ ok: true });
}
