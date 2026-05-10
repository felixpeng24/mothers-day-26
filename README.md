# mothers-day-26

A photo-first Mother's Day tribute. Built with Vite + React + Tailwind.

Live: [mothersday26.felixpeng.com](https://mothersday26.felixpeng.com)

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Photos

- Files live in `public/photos/` as `01.webp` through `16.webp`.
- All images are WebP, ~1200px on the longest side.
- The CSS center-crops to square via `object-fit: cover`; source images don't need to be pre-cropped.
- To swap a photo: drop a new `NN.webp` into `public/photos/` with the same number.

## Captions

Edit `src/captions.js`. The array index matches the filename:
index `0` → `01.webp`, index `1` → `02.webp`, …

## Deploy (Vercel)

1. Create a Vercel project from the `mothers-day-26` GitHub repo.
2. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
3. Settings → Domains → add `mothersday26.felixpeng.com`.
4. In Porkbun DNS, add a CNAME: host `mothersday26`, value = the target Vercel provides.

No server-side dependencies. Static build only.
