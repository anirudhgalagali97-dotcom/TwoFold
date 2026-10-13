/**
 * Site-wide facts. Values in [square brackets] are placeholders the founders
 * still need to fill in; they stay visible on the page until replaced.
 */
export const site = {
  name: "Twofold",
  /** Set NEXT_PUBLIC_SITE_URL to the live domain, e.g. https://[twofold domain]. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://twofold.example").replace(/\/$/, ""),
  title: "Twofold — AI-Powered Marketing for Small Businesses in Bangalore",
  description:
    "Websites, Instagram, ads and an AI receptionist that replies to every customer. Twofold is the AI-powered marketing team for small businesses in Bangalore.",
  city: "Bangalore",
  country: "India",
  email: "[email]",
  phone: "[phone]",
  whatsapp: "[WhatsApp number]",
  instagram: "[handle]",
  linkedin: "[page]",
  demoNumber: "[demo number]",
} as const;

/** True while a value is still a [placeholder]. */
export const isPlaceholder = (value: string) => /^\[.*\]$/.test(value.trim());
