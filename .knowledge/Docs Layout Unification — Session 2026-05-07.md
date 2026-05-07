# Docs Layout Unification — Session 2026-05-07

## Current Goal

Unify all MAXA docs pages under the same centered component documentation layout used by:

- `/docs/components/button`
- `/docs/components/input`
- `/docs/components/select`
- `/docs/components/date-picker`

The user noticed older pages were still left-aligned and visually inconsistent:

- `/docs/components`
- `/docs/introduction`
- `/docs/installation`
- `/docs/foundations/colors`
- `/docs/foundations/spacing`
- `/docs/foundations/radius`
- `/docs/foundations/typography`

## What Was Done

Added a shared docs page shell:

- `apps/docs/app/_components/docs-page-layout.tsx`

It exports:

- `DocsPageLayout`
  - uses the same `.docs-component-page` grid as component pages
  - centers content via `.docs-component-content`
  - supports right-side `On this page` navigation
  - accepts `eyebrow`, `title`, `lead`, `toc`, and `children`
- `DocsPageSection`
  - standard section wrapper
  - adds consistent top divider, heading, optional description, and scroll margin

Updated pages:

- `apps/docs/app/docs/components/page.tsx`
- `apps/docs/app/docs/introduction/page.tsx`
- `apps/docs/app/docs/installation/page.tsx`
- `apps/docs/app/docs/foundations/colors/page.tsx`
- `apps/docs/app/docs/foundations/spacing/page.tsx`
- `apps/docs/app/docs/foundations/radius/page.tsx`
- `apps/docs/app/docs/foundations/typography/page.tsx`

## Verification

Ran:

```bash
pnpm --filter @maxa/docs build
```

Result:

- Next.js production build passed
- Static pages generated successfully, including:
  - `/docs/components`
  - `/docs/introduction`
  - `/docs/installation`
  - `/docs/foundations/colors`
  - `/docs/foundations/spacing`
  - `/docs/foundations/radius`
  - `/docs/foundations/typography`
  - component pages for Button, Input, Select, Date Picker

## Architecture Decision Captured

We discussed whether MAXA should be Tailwind-first like shadcn/ui or Untitled UI.

Current conclusion:

- MAXA is currently token-first, not Tailwind-first.
- This is correct for a reusable design system intended to be adapted to other brands or clients.
- The source of truth should remain semantic/component tokens, not utility classes inside TSX.
- Tailwind should be added later as an integration layer, not as the core architecture.

Recommended future package split:

- `@maxa/tokens`
- `@maxa/ui`
- `@maxa/tailwind`

The future `@maxa/tailwind` package can map MAXA tokens into a Tailwind preset/plugin while preserving the existing token-driven React components.

## Important Local State

Current product changes are not committed yet.

Expected changed files for this task:

- `apps/docs/app/_components/docs-page-layout.tsx` (new)
- `apps/docs/app/docs/components/page.tsx`
- `apps/docs/app/docs/introduction/page.tsx`
- `apps/docs/app/docs/installation/page.tsx`
- `apps/docs/app/docs/foundations/colors/page.tsx`
- `apps/docs/app/docs/foundations/spacing/page.tsx`
- `apps/docs/app/docs/foundations/radius/page.tsx`
- `apps/docs/app/docs/foundations/typography/page.tsx`

Unrelated local changes still exist and should not be reverted or included unless the user explicitly asks:

- `.claude/CLAUDE.md`
- `graphify-out/`

## Next Suggested Steps

1. Run `pnpm typecheck` and `pnpm lint`.
2. Optionally run Playwright screenshots for the updated docs pages.
3. If everything looks good, commit only the docs layout files.
4. Later, design the `@maxa/tailwind` integration layer.

## Dev Server Fix

The previous `Internal Server Error` caveat is fixed.

Root cause:

- `next dev` and `next build` both wrote to `apps/docs/.next`
- running a production build while dev was alive could invalidate dev server chunks
- the browser then showed errors like `Cannot find module './567.js'`

Current fix:

- dev server writes to `apps/docs/.next-dev`
- production build writes to `apps/docs/.next`
- `.next-dev/` is ignored in git
- `pnpm --filter @maxa/docs dev` uses stable Webpack dev by default
- Turbopack remains opt-in via `pnpm --filter @maxa/docs dev:turbo`

See also:

- `Next Dev Cache Fix — Session 2026-05-07.md`
