# DolbomON Frontend

DolbomON is a senior-care web app for daily health checks, voice-friendly care flows, AI emotional care chat, family visibility, and welfare worker dashboards.

## Tech Stack

- React, TypeScript, Vite
- Tailwind CSS with `@tailwindcss/vite`
- React Router
- Axios
- Supabase client
- Zustand
- React Hook Form, Zod, `@hookform/resolvers`
- Vitest, React Testing Library
- Playwright
- ESLint, Prettier

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

The dev server binds to `0.0.0.0` for local and container-friendly access.

## Environment Variables

```bash
VITE_APP_NAME=DolbomON
VITE_API_BASE_URL=http://localhost:4000
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_ENABLE_MOCK=true
```

Supabase is optional in local mock mode. The app will not crash when Supabase variables are empty and `VITE_ENABLE_MOCK=true`.

## Commands

```bash
npm run dev
npm run typecheck
npm run lint
npm run format
npm run format:check
npm run test
npm run test:watch
npm run test:e2e
npm run build
npm run preview
npm run check
```

`npm run check` runs typecheck, lint, Prettier check, unit tests, and production build.

## Folder Structure

```text
src/
  app/          App shell, router, providers
  pages/        Route-level screens
  features/     Domain feature modules
  components/   Shared layout, UI, and senior-friendly components
  lib/          API, Supabase, and utility helpers
  styles/       CSS tokens
  types/        Shared domain types
```

## Notes

- Keep UI mobile-first, high contrast, and senior-friendly.
- Keep components accessible with semantic HTML, visible focus states, labels, and large touch targets.
- Future Supabase work should live behind `src/lib/supabase.ts` and feature-level data access helpers.
- Future PWA work can add a manifest, service worker, offline strategy, and install prompts without changing the current routing foundation.
