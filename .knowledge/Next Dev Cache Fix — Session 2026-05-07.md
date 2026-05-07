# Next Dev Cache Fix — Session 2026-05-07

## Problem

The docs app showed a Next.js runtime error:

```text
Cannot find module './567.js'
Require stack:
- apps/docs/.next/server/webpack-runtime.js
- apps/docs/.next/server/pages/_document.js
```

The visible browser symptom was `Internal Server Error`.

## Root Cause

`next dev` and `next build` were sharing the same `apps/docs/.next` directory.

When `pnpm --filter @maxa/docs build` ran while the docs dev server was alive, the build process rewrote `.next`. The running dev server then tried to load stale server chunks from its previous graph.

This was a cache ownership problem, not a component/page bug.

## Fix

`apps/docs/next.config.ts` now separates dev and build output:

- development server: `.next-dev`
- production build: `.next`

`apps/docs/package.json` also uses stable Webpack dev by default:

```bash
pnpm --filter @maxa/docs dev
```

Turbopack remains available as an explicit opt-in:

```bash
pnpm --filter @maxa/docs dev:turbo
```

`.next-dev/` is ignored in git.

## Verification

Validated the failure mode directly:

1. Started docs dev server on `http://localhost:3000`.
2. Confirmed `/docs/introduction` returned `200`.
3. Ran `pnpm --filter @maxa/docs build` while the dev server remained running.
4. Confirmed `/docs/introduction` and `/docs/components` still returned `200`.

Production build also passed.

## Future Rule

Do not make dev and production builds share the same Next output directory in this repo. If the docs app changes Next build tooling again, preserve separate cache ownership.

