# Agent notes

- This is a static front-end (TanStack Start in SPA mode). There is no backend, database or auth.
- Leader quotes live in `src/lib/leader-quotes.ts`. Each leader appears once. Photos are self-hosted in `public/leaders/` and credited through `imageSourceUrl`.
- Only add quotes that have a verifiable primary source (`sourceUrl`). Never invent quotes or represent them as EGenTek endorsements.
- The carousel auto-advances every `QUOTE_ROTATION_MS`. It pauses on hover, on keyboard focus, and when the OS requests reduced motion.
- Run `npm run lint`, `npx tsc --noEmit`, `npm run test` and `npm run build` before shipping.
