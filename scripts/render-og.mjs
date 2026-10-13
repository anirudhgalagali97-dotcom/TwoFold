/**
 * Renders public/og-image.png (1200×630): orange background, the headline
 * and the two-shape mark, using the site's own fonts and tokens.
 *
 * Usage (site running): npx -y -p playwright@1.56.1 node scripts/render-og.mjs [http://localhost:3000]
 */
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const base = process.argv[2] || "http://localhost:3000";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(`${base}/privacy`, { waitUntil: "networkidle" });
await page.evaluate(() => {
  document.body.innerHTML = `
    <div style="position:fixed;inset:0;background:var(--orange);color:var(--ink);padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden">
      <div style="display:flex;align-items:center;gap:18px">
        <svg viewBox="0 0 46 28" width="92" height="56" aria-hidden="true">
          <rect x="19.5" y="2.5" width="23" height="23" rx="6.5" fill="none" stroke="#14161C" stroke-width="3"/>
          <circle cx="14" cy="14" r="12" fill="#F4F2EC"/>
        </svg>
        <span style="font-family:var(--font-display);font-size:56px;line-height:1;letter-spacing:.02em;text-transform:uppercase">Twofold</span>
      </div>
      <h1 style="font-family:var(--font-display);font-weight:400;text-transform:uppercase;line-height:.92;letter-spacing:-.01em;font-size:132px;margin:0;max-width:980px">Marketing with a second brain.</h1>
      <p style="font-family:var(--font-sans);font-weight:600;text-transform:uppercase;letter-spacing:.18em;font-size:20px;margin:0">AI-powered marketing studio · Bangalore</p>
      <svg viewBox="0 0 46 28" width="520" height="316" aria-hidden="true" style="position:absolute;right:-90px;top:60px;opacity:.16">
        <rect x="19.5" y="2.5" width="23" height="23" rx="6.5" fill="none" stroke="#14161C" stroke-width="2"/>
        <circle cx="14" cy="14" r="12" fill="#14161C"/>
      </svg>
    </div>`;
});
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
const out = path.join(process.cwd(), "public", "og-image.png");
await page.screenshot({ path: out });
console.log("wrote", path.relative(process.cwd(), out));
await browser.close();
