# EGenTek Launchpad

Marketing site for EGenTek's project-based tech internships: home, internship catalogue and details, about, FAQ and contact pages.

It is a static front-end, pre-rendered at build time, built with [TanStack Start](https://tanstack.com/start) in SPA mode, [Tailwind CSS](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com) components. There is no backend.

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000.

## Scripts

| Command           | What it does                             |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the local dev server               |
| `npm run build`   | Produce the static site in `dist/client` |
| `npm run preview` | Serve the production build locally       |
| `npm run lint`    | Run ESLint and Prettier checks           |
| `npm run format`  | Format the project with Prettier         |
| `npm run test`    | Run the Vitest suite once                |

## Project structure

- `src/routes/` — file-based routes. `__root.tsx` is the app shell.
- `src/components/` — page components and the shadcn/ui primitives in `ui/`.
- `src/lib/programs.ts` — internship catalogue data.
- `src/lib/leader-quotes.ts` — homepage leader quotes (see below).
- `public/leaders/` — self-hosted leader photos.

## Editing leader quotes

Quotes are in `src/lib/leader-quotes.ts`. Each entry needs a verifiable `sourceUrl` and a photo in `public/leaders/` with its Wikimedia Commons (or other licensed) source in `imageSourceUrl`. Each leader should appear once.

## Deployment (Vercel)

1. Import the repository in Vercel.
2. Vercel reads `vercel.json`: it runs `npm run build` and serves `dist/client`.
3. Set `VITE_SITE_URL` to the production address, for example `https://www.example.com`. It makes the social image links and `sitemap.xml` absolute. The site still builds without it.

Every page is pre-rendered at build time (including each internship), so the site works without client-side routing. Unknown URLs show the styled 404 page through the prerendered `404.html`.
