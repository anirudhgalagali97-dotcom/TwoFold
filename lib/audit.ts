/**
 * Audit form validation, shared by the browser form and the /api/audit route.
 * Keep this file free of secrets: it is bundled into client code.
 */
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

export type BusinessType = (typeof businessTypes)[number];

export type AuditInput = {
  name: string;
  business: string;
  type: BusinessType | "";
  phone: string;
  link: string;
};

export type AuditField = keyof AuditInput;
export type AuditErrors = Partial<Record<AuditField, string>>;

/** Name of the hidden honeypot field. Real visitors never fill it in. */
export const HONEYPOT_FIELD = "company_website";

const LIMITS: Record<AuditField, number> = { name: 100, business: 120, type: 20, phone: 20, link: 300 };

export const messages = {
  name: "Please enter your name.",
  business: "Please enter your business name.",
  phone: "Enter a 10-digit Indian mobile number starting with 6, 7, 8 or 9 (you can add +91).",
  tooLong: "That's a bit long. Please shorten it.",
  type: "Please choose a type of business from the list.",
};

/** Strips spaces, dashes, dots and brackets, and a leading +91. Returns 10 digits or null. */
export function normaliseIndianMobile(raw: string): string | null {
  const compact = raw.replace(/[\s\-().]/g, "");
  const match = /^(?:\+91)?([6-9]\d{9})$/.exec(compact);
  return match ? match[1] : null;
}

export function validateAudit(input: Partial<Record<AuditField, unknown>>):
  | { ok: true; data: AuditInput }
  | { ok: false; errors: AuditErrors } {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const data: AuditInput = {
    name: str(input.name),
    business: str(input.business),
    type: str(input.type) as AuditInput["type"],
    phone: str(input.phone),
    link: str(input.link),
  };
  const errors: AuditErrors = {};

  if (!data.name) errors.name = messages.name;
  if (!data.business) errors.business = messages.business;
  const phone = normaliseIndianMobile(data.phone);
  if (!phone) errors.phone = messages.phone;
  if (data.type && !businessTypes.includes(data.type as BusinessType)) errors.type = messages.type;

  (Object.keys(LIMITS) as AuditField[]).forEach((key) => {
    if (!errors[key] && data[key].length > LIMITS[key]) errors[key] = messages.tooLong;
  });

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { ...data, phone: `+91${phone}` } };
}
