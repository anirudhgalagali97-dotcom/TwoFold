/**
 * Brand tokens. The CSS variables in app/globals.css are the source for
 * styling; these mirror them for code that cannot read CSS (3D, OG image).
 */
export const colors = {
  orange: "#FF5A36",
  ink: "#14161C",
  cream: "#F4F2EC",
  lemon: "#F5D547",
  inkSoft: "#4A4E57",
  creamSoft: "#B9BCC4",
} as const;

/** Clay colours for the 3D objects (see SPEC.md, 3D concept). */
export const clay = {
  orange: "#FF6B47",
  cream: "#F1ECE2",
  inkBlue: "#26314D",
  lemon: "#F5D547",
  pink: "#E98BA6",
  leaf: "#7FC291",
} as const;

export type Tone = "orange" | "ink" | "cream";

export type SectionId =
  | "hero"
  | "manifesto"
  | "services"
  | "ai-edge"
  | "how-we-work"
  | "work"
  | "contact";

/** The 7 homepage sections in order, with the background tone of each. */
export const sections: { id: SectionId; tone: Tone }[] = [
  { id: "hero", tone: "orange" },
  { id: "manifesto", tone: "ink" },
  { id: "services", tone: "cream" },
  { id: "ai-edge", tone: "orange" },
  { id: "how-we-work", tone: "ink" },
  { id: "work", tone: "cream" },
  { id: "contact", tone: "orange" },
];

/** Header and footer navigation. */
export const navLinks: { label: string; href: `#${SectionId}` }[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "How we work", href: "#how-we-work" },
  { label: "Contact", href: "#contact" },
];
