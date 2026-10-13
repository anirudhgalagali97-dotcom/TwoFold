# Twofold website

One-page marketing site for **Twofold**, the AI-powered marketing team for small
businesses in Bangalore. `SPEC.md` is the source of truth for design, copy and
behaviour.

**Stack:** Next.js 16 (App Router, TypeScript, Turbopack) · Tailwind CSS 4 ·
three + @react-three/fiber + @react-three/drei · GSAP (ScrollTrigger, SplitText)
· Lenis · Resend (REST) · Vercel Analytics.

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # fill in the values (see below)
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve it on :3000 |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Audit form validation and `/api/audit` tests (Resend mocked, local webhook catcher) |

Useful URL switches for checking the 3D: `?3d=off` (show the still fallbacks),
`?3d=on` (force the live canvas), `?3d=debug` (force it and expose
`window.__drawCalls`), `?3d=still` (frozen poses, used to render the fallbacks).

## Environment variables

Set these in `.env.local` locally and in **Vercel → Project → Settings →
Environment Variables** for Production (and Preview if you want forms to work
there). None of them are ever sent to the browser except `NEXT_PUBLIC_SITE_URL`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | For email leads | Resend API key used by `/api/audit` |
| `AUDIT_TO_EMAIL` | For email leads | Inbox(es) that receive audit requests, comma-separated |
| `AUDIT_FROM_EMAIL` | Recommended | Sender on a domain verified in Resend, e.g. `Twofold <audit@[twofold domain]>`. Defaults to Resend's test sender `onboarding@resend.dev`, which only delivers to your own Resend account email |
| `AUDIT_WEBHOOK_URL` | Optional | n8n / Make / Zapier webhook that also receives each lead as JSON |
| `NEXT_PUBLIC_SITE_URL` | Yes, for launch | Public URL, e.g. `https://[twofold domain]`. Used for canonical links, sitemap, robots, OG tags and JSON-LD. Read at build time, so redeploy after changing it |

At least one delivery channel (Resend email or the webhook) must be configured,
or the form shows the retry message.

## Deploy to Vercel

1. Make this branch the repository's default branch (see "Replacing the default branch" below), or merge it into the default branch.
2. In Vercel: **Add New → Project → Import** `anirudhgalagali97-dotcom/TwoFold`. Framework preset: **Next.js** (detected). Leave build and output settings at their defaults.
3. Add the environment variables above, then **Deploy**.
4. **Analytics:** Project → **Analytics** → **Enable** (Web Analytics, cookieless). The `<Analytics />` component only renders on Vercel builds.
5. **Custom domain:** Project → **Settings → Domains** → add `[twofold domain]` and `www.[twofold domain]`. At your registrar, add the records Vercel shows (usually an `A` record for the apex pointing at Vercel's IP, and a `CNAME` for `www` pointing at `cname.vercel-dns.com`). Choose which one redirects to the other. HTTPS is issued automatically.
6. Set `NEXT_PUBLIC_SITE_URL=https://[twofold domain]` and redeploy.
7. **Resend:** add and verify `[twofold domain]` under Resend → Domains (DNS records at your registrar), then set `AUDIT_FROM_EMAIL` and send a test audit from the live site.
8. Run Lighthouse (Chrome DevTools → Lighthouse → Mobile) on the deployed URL.

## Project layout

```
app/            layout (fonts, metadata, Lenis), page (7 sections), privacy/,
                api/audit/route.ts, sitemap.ts, robots.ts
components/     Header, Footer, Logo, Button, Eyebrow, SectionCounter, Section,
                ServiceCard, AuditForm, Motion (+ MotionLoader), SmoothScroll
  sections/     Hero, Manifesto, Services, AiEdge, HowWeWork, Work, Contact
  chat/         PhoneMockup, ChatDemo, chatScript (the WhatsApp demo script)
  three/        Scene (the one shared canvas), SceneSlot, SceneView, ClayMaterial,
                geometry (cached rounded boxes + extruded SVG), objects/, scenes/
lib/            tokens (brand colours, sections), site (contact placeholders),
                audit (validation), rateLimit, sendLead, useReducedMotion, useIsLowPower
public/         og-image.png, icon.svg, fallback/ (still renders of each scene)
scripts/        render-fallbacks.mjs, render-og.mjs
tests/          audit.test.ts
```

Copy lives in the section components; contact details and other placeholders
live in `lib/site.ts`.

## How the 3D works

- One `<Canvas>` fixed over the page (pointer events off). Each `SceneSlot` is a
  drei `View`: a tracked box whose scene is scissored into the shared canvas.
- Loaded with dynamic imports only after the page has loaded and gone idle, so
  the hero text paints first. DPR is capped at 1.5, geometries and materials
  are shared, and rendering stops when no slot is on screen or the tab is
  hidden (peak about 53 draw calls on desktop).
- Still fallbacks from `public/fallback/` show under `prefers-reduced-motion`,
  when `navigator.hardwareConcurrency <= 4`, or without WebGL.
- After changing a scene, regenerate the stills (and the inline hero
  placeholder) with the site running:

  ```bash
  npm run build && npm start &
  npx -y -p playwright@1.56.1 node scripts/render-fallbacks.mjs http://localhost:3000
  npx -y -p playwright@1.56.1 node scripts/render-og.mjs http://localhost:3000   # OG image
  ```

  (Run `npx playwright install chromium` once if Playwright has no browser.)

## Spam protection and the Upstash upgrade

`/api/audit` has a hidden honeypot field, a 10 KB body cap, server-side
validation and an in-memory rate limit of 5 requests per IP per 10 minutes.
The in-memory limit lives in one server instance, so it resets on cold starts
and isn't shared between Vercel instances. That's fine for launch traffic. If
spam becomes a problem, swap `lib/rateLimit.ts` for
[`@upstash/ratelimit`](https://github.com/upstash/ratelimit-js) with an Upstash
Redis database (Vercel Marketplace → Upstash), keyed by the same client IP.

## Placeholders still to fill

Everything in `[square brackets]` stays visible on the site until replaced.

- `lib/site.ts`: `[email]`, `[phone]`, `[WhatsApp number]`, Instagram `[handle]`,
  LinkedIn `[page]`, `[demo number]`; set `NEXT_PUBLIC_SITE_URL` for `[twofold domain]`
  (JSON-LD leaves out phone and email until they're real values)
- `components/chat/PhoneMockup.tsx`: `[Demo Salon]`
- `components/sections/Work.tsx`: `[Project image]`, `[Client type]`,
  `[Pilot client 1 — result]`, `[Pilot client 2 — result]`
- `app/privacy/page.tsx`: draft text to review, `[Retention period and any other uses]`
- Final name form (Twofold Studio / Twofold Labs); the site says "Twofold" for now
- Resend account + verified sending domain, or the webhook URL
- Whether package prices appear on the site (not shown)

## Replacing the default branch

This branch (`claude/admiring-darwin-v01vgd`) holds the whole Twofold site. The
old Cattle Co. site is on `claude/upbeat-allen-7ap26n`.

1. Archive the old site first: GitHub → **Releases → Draft a new release** →
   **Choose a tag** → type `cattle-co-archive` → **Target**:
   `claude/upbeat-allen-7ap26n` → **Publish release**.
2. GitHub → **Settings → General → Default branch** → switch to
   `claude/admiring-darwin-v01vgd` (optionally rename it to `main` first under
   **Branches**) → **Update**.
3. Delete `claude/upbeat-allen-7ap26n` under **Branches** once the tag exists.
