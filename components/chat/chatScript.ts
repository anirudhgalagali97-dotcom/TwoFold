export type ChatIcon = "scissors" | "tick";

export type ChatMessage =
  | { from: "customer"; text: string; time?: string }
  | { from: "ai"; text: string; icon?: ChatIcon }
  | { from: "system"; text: string; icon: ChatIcon };

/** WhatsApp demo script (SPEC.md, Interactions → WhatsApp chat demo). */
export const chatScript: ChatMessage[] = [
  { from: "customer", text: "Hi, are you open on Sunday? Want a haircut", time: "11:42 pm" },
  {
    from: "ai",
    text: "Hi! Yes, we're open Sunday 10 am to 6 pm. Would you like me to book a slot?",
    icon: "scissors",
  },
  { from: "customer", text: "4 pm works?" },
  { from: "ai", text: "4 pm Sunday is free. Booked for you! You'll get a reminder on Sunday morning." },
  { from: "system", text: "Appointment booked · added to calendar", icon: "tick" },
];

/** Timings in ms. */
export const chatTiming = {
  typing: 800,
  gap: 1200,
};
