# Knocks

Football franchise management prototype built with Next.js, React, TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — generate the static export to `out/`
- `npm run deploy` — build and prep `out/` for GitHub Pages

## Deploy to GitHub Pages

The project is configured for static export (`output: "export"` in [next.config.js](next.config.js)). Build output goes to `out/`.

```bash
npm run deploy
```

Then in the GitHub repo, go to **Settings → Pages** and set the source to the `out/` folder on your branch (or push `out/` to a `gh-pages` branch).
