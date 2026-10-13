/**
 * Tests for the audit form validation and the /api/audit route.
 * Resend is mocked (no real email is sent) and a local HTTP server stands in
 * for the webhook (n8n / Make). Run with `npm test`.
 */
import assert from "node:assert/strict";
import { createServer, type IncomingMessage } from "node:http";
import type { AddressInfo } from "node:net";
import { after, before, beforeEach, describe, it } from "node:test";
import { normaliseIndianMobile, validateAudit } from "../lib/audit";


describe("normaliseIndianMobile", () => {
  for (const ok of ["9876543210", "+919876543210", "+91 98765 43210", "98765-43210", "6000000000", "(+91) 70000 00000"]) {
    it(`accepts ${ok}`, () => assert.match(normaliseIndianMobile(ok) ?? "", /^[6-9]\d{9}$/));
  }
  for (const bad of ["", "12345", "5876543210", "0987654321", "98765432101", "+1 9876543210", "+92 9876543210", "abcdefghij", "919876543210"]) {
    it(`rejects "${bad}"`, () => assert.equal(normaliseIndianMobile(bad), null));
  }
});

describe("validateAudit", () => {
  it("requires name, business and phone", () => {
    const r = validateAudit({ name: " ", business: "", phone: "" });
    assert.equal(r.ok, false);
    if (!r.ok) assert.deepEqual(Object.keys(r.errors).sort(), ["business", "name", "phone"]);
  });
  it("rejects an unknown business type", () => {
    const r = validateAudit({ name: "A", business: "B", phone: "9876543210", type: "Casino" });
    assert.equal(r.ok, false);
  });
  it("returns a normalised +91 number", () => {
    const r = validateAudit({ name: "Asha", business: "Glow Salon", phone: "98765 43210", type: "Salon" });
    assert.ok(r.ok);
    if (r.ok) assert.equal(r.data.phone, "+919876543210");
  });
});

describe("POST /api/audit", () => {
  let webhookHits: Record<string, unknown>[] = [];
  let resendCalls: { auth: string | null; body: Record<string, unknown> }[] = [];
  let webhookUrl = "";
  const server = createServer(async (req: IncomingMessage, res) => {
    let raw = "";
    for await (const chunk of req) raw += chunk;
    webhookHits.push(JSON.parse(raw));
    res.writeHead(200).end("ok");
  });
  const realFetch = globalThis.fetch;
  let POST: (r: Request) => Promise<Response>;
  let ipCounter = 0;

  const req = (body: unknown, ip = `10.0.0.${++ipCounter}`) =>
    new Request("http://localhost/api/audit", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    });
  const valid = { name: "Asha", business: "Glow <b>Salon</b>", type: "Salon", phone: "+91 98765 43210", link: "instagram.com/glow" };

  before(async () => {
    await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
    webhookUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}/hook`;
    // Mock Resend; let other requests (the local webhook) through.
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input instanceof Request ? input.url : input);
      if (url.startsWith("https://api.resend.com/")) {
        const headers = new Headers(init?.headers);
        resendCalls.push({ auth: headers.get("authorization"), body: JSON.parse(String(init?.body)) });
        return Response.json({ id: "mock-email-id" });
      }
      return realFetch(input, init);
    }) as typeof fetch;
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.AUDIT_TO_EMAIL = "founders@example.com";
    process.env.AUDIT_WEBHOOK_URL = webhookUrl;
    ({ POST } = await import("../app/api/audit/route"));
  });
  after(() => {
    globalThis.fetch = realFetch;
    server.close();
  });
  beforeEach(() => {
    webhookHits = [];
    resendCalls = [];
  });

  it("emails the lead via Resend and posts it to the webhook", async () => {
    const res = await POST(req(valid));
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true });

    assert.equal(resendCalls.length, 1);
    const email = resendCalls[0];
    assert.equal(email.auth, "Bearer re_test_key");
    assert.deepEqual(email.body.to, ["founders@example.com"]);
    assert.match(String(email.body.subject), /Glow <b>Salon<\/b>/);
    assert.match(String(email.body.html), /Glow &lt;b&gt;Salon&lt;\/b&gt;/, "HTML is escaped");
    assert.match(String(email.body.text), /WhatsApp: \+919876543210/);

    assert.equal(webhookHits.length, 1);
    assert.equal(webhookHits[0].phone, "+919876543210");
    assert.equal(webhookHits[0].source, "twofold-website");
  });

  it("rejects invalid numbers with a clear message", async () => {
    const res = await POST(req({ ...valid, phone: "12345" }));
    assert.equal(res.status, 422);
    const body = await res.json();
    assert.match(body.fields.phone, /10-digit Indian mobile number/);
    assert.equal(resendCalls.length + webhookHits.length, 0);
  });

  it("silently drops honeypot submissions", async () => {
    const res = await POST(req({ ...valid, company_website: "http://spam.example" }));
    assert.equal(res.status, 200);
    assert.equal(resendCalls.length + webhookHits.length, 0);
  });

  it("rejects malformed JSON", async () => {
    assert.equal((await POST(req("{not json"))).status, 400);
  });

  it("rate-limits after 5 requests from one IP", async () => {
    const codes = [];
    for (let i = 0; i < 6; i++) codes.push((await POST(req({ ...valid, phone: "1" }, "192.168.1.1"))).status);
    assert.deepEqual(codes, [422, 422, 422, 422, 422, 429]);
  });

  it("still succeeds when only the webhook is configured", async () => {
    delete process.env.RESEND_API_KEY;
    const res = await POST(req(valid));
    assert.equal(res.status, 200);
    assert.equal(resendCalls.length, 0);
    assert.equal(webhookHits.length, 1);
    process.env.RESEND_API_KEY = "re_test_key";
  });

  it("returns 502 when no delivery succeeds", async () => {
    const saved = process.env.AUDIT_WEBHOOK_URL;
    delete process.env.RESEND_API_KEY;
    process.env.AUDIT_WEBHOOK_URL = "http://127.0.0.1:1/closed";
    const res = await POST(req(valid));
    assert.equal(res.status, 502);
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.AUDIT_WEBHOOK_URL = saved;
  });
});
