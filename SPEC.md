# Twofold Website — Design & Build Spec

Oct 14, 2026 · @GalagaliAI

## Overview

Build a one-page marketing website for **Twofold**, an AI-powered digital marketing agency for small businesses in Bangalore, founded by Anirudh Galagali (tech) and his sister (marketing). The site's style is bold condensed type, one flat colour per section and soft clay-like 3D shapes, where each object stands for something Twofold does for a business.

**Goals of the site**

- Make a visitor understand in 5 seconds: Twofold is a marketing team that uses AI, made for small businesses.
- Show the AI edge live (the WhatsApp AI receptionist demo), not just describe it.
- Turn visitors into leads through one action: **request a free AI audit**.
- Be proof of skill in itself: a fast, polished 3D site built in-house.

**Audience:** owners of small local businesses (salons, clinics, gyms, boutiques, bakeries, coaching centres), mostly visiting on a phone over mobile data.

**How to use this doc (for Claude Code):** treat each section as the source of truth. Build in the phase order in *Build plan*, and meet each phase's acceptance criteria before starting the next. Use copy exactly as written; text in \[square brackets\] is a placeholder to keep visible until the founders replace it. Do not copy layouts, 3D models or copy from any third-party template; this is an original design.

**Visual reference:** the homepage mockup on the Twofold design canvas (linked at the end of this doc) shows the intended look of all 7 sections.

## Brand system

Four colours, two typefaces, one logo idea; define them once as design tokens (CSS variables) and use nothing else.

**Colours**

| Token | Hex | Use |
| --- | --- | --- |
| `--orange` | `#FF5A36` | Hero, AI edge and contact section backgrounds; accents on dark |
| `--ink` | `#14161C` | Dark section backgrounds; text on light and orange |
| `--cream` | `#F4F2EC` | Light section backgrounds; text on ink |
| `--lemon` | `#F5D547` | Primary buttons, small highlights, the section counter |
| `--ink-soft` | `#4A4E57` | Body text on cream |
| `--cream-soft` | `#B9BCC4` | Body text on ink |

Text on orange is always `--ink` (white on orange fails contrast). Lemon buttons always carry ink text.

**Typography** (both free on Google Fonts)

| Role | Font | Settings |
| --- | --- | --- |
| Display headlines | Anton | Uppercase, line-height 0.92, letter-spacing -0.01em, `clamp(56px, 11vw, 176px)` |
| Section titles | Anton | Uppercase, `clamp(44px, 7vw, 112px)` |
| Eyebrows, nav, buttons | DM Sans 600 | Uppercase, 13–14px, letter-spacing 0.18em |
| Body | DM Sans 400 | 17–19px, line-height 1.55 |

**Logo:** the wordmark `TWOFOLD` in Anton, preceded by a mark of two shapes: a solid circle (orange or cream) overlapping a rounded square outline. Build it as an inline SVG component so it can sit on any background.

**UI pieces**

- Primary button: lemon pill, ink text, uppercase DM Sans 600, 16px × 28px padding, arrow icon; hover lifts 2px and darkens slightly.
- Secondary button: transparent with 2px border in the section's text colour.
- Eyebrow label: `(01) SECTION NAME` with a 40px line before it.
- Section counter fixed bottom-right: `01 / 07`, updates on scroll.
- Spacing scale: 8, 16, 24, 40, 64, 96, 160px. Page side padding 24px mobile, 64px desktop; max content width 1440px.

## Site structure and copy

One scrolling homepage of 7 full-height sections (min-height 100vh on desktop, content height on mobile), plus a simple `/privacy` page. Nav links scroll to sections.

**Global header** (fixed, transparent, text colour switches with the section behind it): logo left; links `WORK` `SERVICES` `HOW WE WORK` `CONTACT` centre; lemon button `LET'S TALK` right. On mobile: logo + menu button opening a full-screen ink overlay.

### 01 · Hero (orange background)

- Eyebrow: `AI-POWERED MARKETING STUDIO · BANGALORE`
- Headline: **MARKETING WITH A SECOND BRAIN.**
- Subtext: The AI-powered marketing team for small businesses. We get you found, bring in customers, and make sure no enquiry ever goes unanswered.
- Buttons: `GET A FREE AI AUDIT` (primary, scrolls to 07) · `SEE HOW IT WORKS` (secondary, scrolls to 04)
- Bottom left: `SCROLL` with a vertical line. Bottom right: counter `01 / 07`.
- Right half: 3D scene (see 3D concept).

### 02 · Manifesto (ink background)

- Eyebrow: `(02) WHY TWOFOLD`
- Statement, centred, cream: **BIG-AGENCY RESULTS AT SMALL-BUSINESS PRICES. BECAUSE AI DOES THE HEAVY LIFTING.** ("AI DOES THE HEAVY LIFTING" in orange)
- Bottom strip: `ATTENTION → LEAD → CUSTOMER`

### 03 · Services (cream background)

- Eyebrow: `(03) SERVICES` · Title: **WHAT WE BUILD**
- Three cards, each with a small 3D object on top, title, one line, and a `+` that expands the feature list:
  - **GET ONLINE** — A fast website, a Google profile people trust, and AI chat that answers visitors 24/7. Features: website built in-house · Google Business profile · AI website chat.
  - **GET CUSTOMERS** — Instagram, content and ads that bring the right people to your door. Features: everything in Get Online · Instagram + AI-assisted content · Meta and Google ads · monthly report.
  - **AI BUSINESS ASSISTANT** (ink card, marked `SIGNATURE`) — An AI receptionist that replies, books and follows up, even at 11 pm. Features: everything in Get Customers · WhatsApp AI receptionist · automatic follow-ups and review requests · live results dashboard.

### 04 · The AI edge (orange background)

- Eyebrow: `(04) THE AI EDGE` · Title: **WE DON'T JUST BRING LEADS. WE ANSWER THEM.**
- Left: copy — Most agencies stop once the enquiry arrives. Twofold installs an AI receptionist into your business, so every message gets a reply in seconds, appointments get booked, and nobody falls through the cracks.
- Three bullets: Replies in seconds, day and night · Books appointments automatically · Follows up with people who went quiet
- Right: phone mockup with an animated WhatsApp-style chat (script in *Interactions*).

### 05 · How we work (ink background)

- Eyebrow: `(05) HOW WE WORK` · Title: **FOUR STEPS. EVERY CLIENT.**
- Steps as big numbers:
  1. **DISCOVERY** — A call to understand your business and goals.
  2. **ONBOARDING** — Logins, brand assets and your FAQs, which train your AI assistant.
  3. **SETUP** — In two weeks: website, Google profile, AI assistant and ad accounts, live.
  4. **GROW** — Every month: plan, post, run ads, report, improve.

### 06 · Work (cream background)

- Eyebrow: `(06) WORK` · Title: **RECENT WORK**
- 3 case-study cards: image area, client type, one result line. Until real projects exist, show: `[Pilot client 1 — result]`, `[Pilot client 2 — result]`, and **The Twofold demo bot** — Our own AI receptionist, built in-house. Message it on WhatsApp: \[demo number\].

### 07 · Contact (orange background)

- Eyebrow: `(07) CONTACT` · Title: **LET'S BUILD YOURS.**
- Subtext: Get a free AI audit. We'll check your Google profile, Instagram and how fast you reply to customers, and show you what you're missing. No cost, no pressure.
- Form fields: Name · Business name · Type of business (dropdown: Salon, Clinic, Gym, Retail, Food, Education, Services, Other) · WhatsApp number · Website or Instagram link (optional). Button: `GET MY FREE AUDIT`.
- Success state: "Thanks! We'll message you on WhatsApp within one working day."
- Beside the form: \[email\] · \[WhatsApp number\] · Bangalore, India · Instagram \[handle\] · LinkedIn \[page\]

**Footer** (ink): logo, one line "The AI-powered marketing team for small businesses.", nav links, `© 2026 Twofold`, Privacy link.

## 3D concept

Every 3D object **stands for something Twofold does for a small business**: the storefront is the client, and the objects around it are the tools that grow it. As the visitor scrolls, the objects gather around the storefront. The 3D tells the story; it is never just decoration.

**Look and materials**

- Matte clay: `MeshStandardMaterial`, roughness 0.85–1, metalness 0, no textures needed. Every object has thick, softly bevelled edges, like a toy made of clay.
- Clay colours: orange `#FF6B47`, cream `#F1ECE2`, ink-blue `#26314D`, lemon `#F5D547`, muted pink `#E98BA6`, leaf green `#7FC291` for the plant only.
- Soft lighting: one warm key light with soft shadows, a cool fill, ambient/hemisphere light; `ContactShadows` under grounded objects. Optional drei `Environment` preset "city" at low intensity.
- Two ways to build the objects (pick per object): **(a) extruded SVG** — draw the silhouette as an SVG path, load it with three's `SVGLoader`, and turn it into `ExtrudeGeometry` with `bevelEnabled: true` (bevel size 4–8% of the object) for the clay-icon look; best for the star, map pin, chat bubble, lightning bolt, paper plane and key. **(b) composed primitives** — rounded boxes, cylinders and cones grouped together; best for the storefront, megaphone, calendar, phone, browser window and bar chart. No downloaded models, so nothing is copied and the bundle stays small.
- The mockup's flat SVG drawings are the reference for each object's silhouette, proportions and colours.

**Object library**

| Object | Stands for | Built from | Colours |
| --- | --- | --- | --- |
| Storefront (awning, OPEN sign, door, windows, plant) | The client's business | Composed primitives | Cream walls, orange/cream awning, ink-blue door and sign |
| Megaphone | Marketing and ads | Composed primitives (cone + cylinders) | Orange body, ink-blue handle, cream mouthpiece |
| Map pin | Google profile, local SEO | Extruded SVG | Ink-blue or orange, cream centre |
| Star | Reviews | Extruded SVG, rounded points | Lemon |
| Chat bubble with three dots + sparkle | AI replies | Extruded SVG | Cream bubble, orange dots, lemon sparkle |
| Calendar with tick | Bookings | Composed primitives | Cream page, orange header, ink-blue rings and tick |
| Bar chart with rising arrow | Growth and reports | Composed primitives + extruded arrow | Cream/orange bars, lemon arrow |
| Browser window | Website | Composed primitives | Cream page, ink-blue top bar |
| Phone with message lines | Discovery call | Composed primitives | Ink-blue body, orange screen |
| Key | Onboarding (logins, access) | Extruded SVG | Lemon |
| Lightning bolt | Fast setup | Extruded SVG | Orange |
| Paper plane | Contact / send | Extruded SVG (folded faces) | Cream |

**Scene per section**

| Section | Scene |
| --- | --- |
| 01 Hero | Storefront on a round cream plinth; megaphone, chat bubble, map pin and star float around it. Slow idle float; the group tilts up to 8° toward the pointer; on scroll the floating objects drift toward the store. |
| 02 Manifesto | Small megaphone, star, map pin, chat bubble, calendar and bar chart drifting around the statement at different depths, kept away from the centre text. |
| 03 Services | One object per card, rotating slowly, faster on hover: browser window + map pin (Get Online), megaphone + star (Get Customers), chat bubble + calendar (AI Business Assistant). |
| 04 AI edge | The phone chat is the hero. A calendar and a star float beside the phone and pop slightly when the booking chip appears. |
| 05 How we work | One object per step, appearing as each step scrolls in: phone (Discovery), key (Onboarding), lightning bolt (Setup), bar chart (Grow). |
| 06 Work | Only on the demo-bot card: chat bubble and star. |
| 07 Contact | Paper plane flying along a dashed trail, looping slowly. |

**Implementation rule:** one shared `<Canvas>` fixed behind the page (drei `View` or scroll-linked camera/group positions), not a separate canvas per section.

## Interactions and animation

Motion should feel calm and tactile: eased, never bouncy, and all of it off when the visitor prefers reduced motion.

**Scrolling**

- Lenis smooth scroll; GSAP ScrollTrigger for scroll-linked animation.
- Headlines reveal line by line (mask + slide up 100%, 0.8s, ease `power3.out`, 0.08s stagger) when 30% in view.
- Header text colour and the `01 / 07` counter update as each section crosses the viewport centre.
- Section 05: on desktop, pin the section and move the 4 steps horizontally while the shapes move closer; on mobile, stack the steps vertically, no pinning.

**Hover and pointer**

- Hero 3D group tilts toward the pointer (lerp 0.05). On touch devices, use a slow auto-sway instead.
- Buttons lift 2px; the arrow slides 4px right.
- Service cards: border brightens, 3D object spins faster, `+` rotates to `×` and the feature list expands (accessible as a `<button aria-expanded>`).

**WhatsApp chat demo (section 04)**

Plays once when the phone is 40% in view, with a typing indicator (0.8s) before each AI message and 1.2s between messages. A `Replay` button below the phone restarts it. Script:

1. Customer, 11:42 pm: "Hi, are you open on Sunday? Want a haircut"
2. AI: "Hi! Yes, we're open Sunday 10 am to 6 pm. Would you like me to book a slot? 💇" (use an inline SVG icon instead of the emoji)
3. Customer: "4 pm works?"
4. AI: "4 pm Sunday is free. Booked for you! You'll get a reminder on Sunday morning."
5. System chip: "✓ Appointment booked · added to calendar" (lemon chip; the tick as an SVG icon)

The header of the phone chat shows "\[Demo Salon\] · AI assistant" with a small `Powered by Twofold` label.

**Audit form (section 07)**

- Client-side validation: name, business name and a 10-digit Indian mobile number (allow optional `+91`) are required.
- On submit, POST to a server route `/api/audit` that forwards the lead to the founders (email via Resend and/or a webhook to an automation tool such as n8n or Make, set by env variables). Never expose keys in the browser.
- Button shows a spinner while sending; show the success message on 200, a friendly retry message otherwise.
- Basic spam protection: a hidden honeypot field and simple rate limiting on the route.

## Tech stack

Next.js with React Three Fiber, deployed on Vercel; use current stable versions of each package at build time.

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router), TypeScript |
| Styling | Tailwind CSS with the brand tokens as CSS variables |
| 3D | three, @react-three/fiber, @react-three/drei |
| Animation | GSAP + ScrollTrigger, Lenis |
| Fonts | `next/font/google`: Anton, DM Sans |
| Form backend | Next.js route handler `/api/audit`; Resend for email; optional webhook |
| Analytics | Vercel Analytics or Plausible (no cookie banner needed) |
| Hosting | Vercel, custom domain \[twofold domain\] |

**Project structure**

```
app/
  layout.tsx          fonts, metadata, Lenis provider
  page.tsx            the 7 sections in order
  privacy/page.tsx
  api/audit/route.ts  form handler
components/
  Header.tsx  Footer.tsx  Logo.tsx  Button.tsx  SectionCounter.tsx
  sections/   Hero.tsx  Manifesto.tsx  Services.tsx  AiEdge.tsx
              HowWeWork.tsx  Work.tsx  Contact.tsx
  three/      Scene.tsx (shared canvas)  ClayMaterial.tsx
              objects/ (Storefront, Megaphone, MapPin, Star, ChatBubble, Calendar,
                       BarChart, BrowserWindow, Phone, Key, Bolt, PaperPlane)
              scenes/ (HeroScene, ManifestoScene, ServiceObject,
                       StepsScene, ContactScene)
  chat/       PhoneMockup.tsx  ChatDemo.tsx  chatScript.ts
lib/          tokens.ts  useReducedMotion.ts  useIsLowPower.ts
public/       og-image.png  fallback/ (still renders of each scene)
```

**Environment variables:** `RESEND_API_KEY`, `AUDIT_TO_EMAIL`, `AUDIT_WEBHOOK_URL` (optional).

## Performance, accessibility and SEO

The site must load fast on a mid-range Android phone over 4G; the 3D is an enhancement, never a requirement.

**Performance targets:** Lighthouse mobile Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95; LCP < 2.5s; CLS < 0.1.

- Load the 3D canvas lazily (dynamic import, `ssr: false`) after the hero text has painted; the hero headline is real HTML and is the LCP element.
- Cap device pixel ratio at 1.5; keep total draw calls under \~60; reuse geometries and materials; pause rendering when the canvas is off-screen or the tab is hidden (`frameloop="demand"` where possible).
- Low-power fallback: if `prefers-reduced-motion`, `navigator.hardwareConcurrency <= 4` or WebGL is unavailable, show still PNG/WebP renders of each scene from `public/fallback/` instead of the live canvas.
- Fonts via `next/font` with `display: swap`; images via `next/image`.

**Accessibility**

- All 3D canvases `aria-hidden`; every meaning they carry is also in text.
- Contrast: text meets 4.5:1 (ink on orange and lemon, cream on ink). Never white text on orange.
- Real `<button>`, `<a>`, `<label>` elements; visible focus rings (2px lemon outline on dark, ink on light).
- Reduced motion: no smooth scroll, no pinning, no reveal animations; the chat demo shows all messages at once.
- The chat demo region uses `aria-live="polite"` only after the visitor presses Replay.

**SEO**

- Title: "Twofold — AI-Powered Marketing for Small Businesses in Bangalore"
- Meta description: "Websites, Instagram, ads and an AI receptionist that replies to every customer. Twofold is the AI-powered marketing team for small businesses in Bangalore."
- Open Graph image 1200×630 (orange background, headline, the two shapes).
- One `<h1>` (the hero headline); section titles are `<h2>`.
- `LocalBusiness`/`ProfessionalService` JSON-LD with name, city Bangalore, \[phone\], \[email\], URL.
- `sitemap.xml` and `robots.txt`.

**Mobile layout rules**

- Below 768px: single column; hero 3D sits under the text at 320px tall; headlines use the `clamp` minimums; services cards stack; the phone mockup sits below the AI edge copy.
- Tap targets ≥ 44px; no horizontal scrolling anywhere.

## Build plan for Claude Code

Six phases, in order; finish each phase's checks before starting the next, and commit at the end of every phase.

1. **Foundation**
   - Set up Next.js + TypeScript + Tailwind; add brand tokens, Anton and DM Sans, Logo, Button, Header, Footer, SectionCounter.
   - Done when: the header and footer render on a blank page in all three background colours, and the lint and type checks pass.
2. **Static sections**
   - Build all 7 sections with the exact copy from *Site structure and copy*, responsive, no 3D and no animation yet. Use grey boxes where 3D will go.
   - Done when: the page reads correctly at 375px, 768px and 1440px widths with no horizontal scroll, and all nav links scroll to their sections.
3. **Contact form**
   - Build the form, validation, `/api/audit` route, email via Resend, honeypot and rate limiting.
   - Done when: a test submission arrives in `AUDIT_TO_EMAIL`, invalid numbers are rejected with a clear message, and no secret appears in client bundles.
4. **Motion**
   - Add Lenis, ScrollTrigger reveals, the section counter, the header colour switch, the section 05 horizontal steps and the WhatsApp chat demo with Replay.
   - Done when: every animation is disabled under `prefers-reduced-motion`, and the chat plays once in view and replays on demand.
5. **3D**
   - Build the shared canvas, clay material and shapes, then each scene in the *3D concept* table, plus the low-power fallback images.
   - Done when: the 3D runs smoothly on a mid-range phone, rendering pauses off-screen, and the fallback shows when WebGL is off.
6. **Polish and launch**
   - Add SEO metadata, JSON-LD, OG image, sitemap, robots, analytics and the privacy page; run Lighthouse and fix issues; deploy to Vercel on the custom domain.
   - Done when: the targets in *Performance, accessibility and SEO* are met on the deployed URL.

**Rules for the build**

- No copying from third-party templates or their 3D assets; all 3D objects are built in code from primitives or extruded SVG paths.
- Keep placeholders in \[square brackets\] visible; never invent client names, results or testimonials.
- Keep components small and named as in the project structure, so the founders can edit copy easily.

## Open items and placeholders

These are the facts the founders still need to supply; Claude Code keeps each placeholder visible until it is filled.

- [ ] Final name form and domain: Twofold Studio or Twofold Labs, and \[twofold domain\]
- [ ] Contact details: \[email\], \[WhatsApp number\], Instagram \[handle\], LinkedIn \[page\]
- [ ] Co-founder's name for the about/footer copy, if wanted
- [ ] Demo bot WhatsApp number: \[demo number\]
- [ ] Pilot client case studies: \[Pilot client 1\], \[Pilot client 2\] with real results and images
- [ ] Resend account and sending domain, or the webhook URL for leads
- [ ] Privacy page text (what the audit form collects and how it is used)
- [ ] Decide whether package prices appear on the site (currently not shown)

**Design reference:** [Twofold Homepage Mockup](https://claude.ai/artifact/Wra9xfxMsfqqVpuuYGtzUY) shows all 7 sections in this spec's colours, type and layout. The 3D there is a flat CSS stand-in; build the real scenes as described in *3D concept*. The mockup link only works for others once it is shared from its Share menu.
