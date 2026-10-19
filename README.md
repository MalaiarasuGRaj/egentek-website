# EGenTek Launchpad

Marketing site for EGenTek's project-based tech internships: home, internship catalogue and details, about, FAQ and contact pages.

It is a static front-end built with [TanStack Start](https://tanstack.com/start) in SPA mode, [Tailwind CSS](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com) components. There is no backend.

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Produce the static site in `dist/client` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint and Prettier checks |
| `npm run format` | Format the project with Prettier |
| `npm run test` | Run the Vitest suite once |

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
2. Vercel reads `vercel.json`: build with `npm run build` and serve `dist/client`.
3. `vercel.json` rewrites page URLs to the single-page shell (`_shell.html`), so deep links such as `/internships/<slug>` work on refresh.

No environment variables are required.
