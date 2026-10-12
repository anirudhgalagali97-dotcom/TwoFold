# Cattle Co. website

A redesign of [cattleco.farm](https://cattleco.farm): premium A2 milk, ghee, paneer and curd from Gir, Sahiwal and Hallikar cows, delivered across Bengaluru.

Built with Next.js (static export), Tailwind CSS v4, Motion, Phosphor icons, and Three.js (react-three-fiber) for the real-time glass milk bottle in the hero.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out, deploy to any static host (Vercel, Netlify, Cloudflare Pages, S3)
```

## Editing content

All copy, prices, contact details, FAQs and testimonials live in `src/content/site.ts`. Components only render that file.

## Photos

The page is designed to work without photos and switches to real photos automatically once these files exist in `public/images/`:

| File | Used in | Suggested size |
|---|---|---|
| `gir.jpg` | Our herd, large card | 1600 x 1200 |
| `sahiwal.jpg` | Our herd | 800 x 1000 |
| `hallikar.jpg` | Our herd | 800 x 1000 |
| `farm.jpg` | The farm | 1600 x 1000 |

Product images in `public/images/products/` are 3D renders and can be replaced with real product photos (transparent PNG works best).

## Design notes

- Palette: cool milk white and pasture-green ink, with one marigold accent. Follows the system light/dark setting.
- Type: Geist (self-hosted via the `geist` package).
- Shapes: cards 28px radius, media 20px, inputs 14px, buttons pill.
- Motion respects `prefers-reduced-motion` (the bottle stops rotating; reveals and the marquee are disabled).
