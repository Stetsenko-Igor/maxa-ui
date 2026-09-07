# Color Explorer verification — 2026-09-08

## Delivered

- Overview / Explore / Reference within the existing Colors documentation page.
- Search and layer/group filters, source light/dark values, dependency navigation,
  actual library CSS references and component documentation links.
- Real Button, Input and Alert previews with curated part inspection, local theme,
  six-digit hex trials and reset. Empty or invalid edits retain the last valid preview.
- Generated inventory: 1,740 total declarations, including 957 color tokens.
  Complete scoped redeclaration preserves transitive CSS alias propagation.
- Updated neutral-scale usage metadata, README and maintenance instructions.

## Evidence

- `pnpm tokens:reference:check`: passed.
- `pnpm test:css-contract`: 7 tests passed, including 3 explorer generator tests.
- `pnpm audit:tokens`: passed.
- Docs TypeScript and ESLint: passed.
- `pnpm --filter @maxa/docs build:netlify`: local production/static export passed;
  56 HTML files verified. This command does not publish.
- `pnpm --filter @maxa/docs test:explorer`: all 6 Chromium tests passed against
  static export. Covers keyboard tabs, semantic/primitive propagation, document
  isolation, dark values, reset, search recovery, component recipe selection,
  invalid/empty edits, Alert title impact and narrow-screen overflow/page errors.
- Desktop (1600px) and mobile (390px) screenshots inspected locally.
- Independent review checked generator, UI, security boundaries and plan fit.
  Corrected misleading whole-component impact badges and basePath-unaware links;
  reviewer confirmed both fixes and no remaining blocking findings.

An initial interaction test targeted the native Input element for its border.
The actual border belongs to `.maxa-input__field`; the corrected test checks the
rendered field container and passes. No component CSS change was required.

## Limits and publication

Impact labels refer to the illustrated parts, not exhaustive component states.
CSS consumers describe library stylesheets, not usage on production screens.
Trials do not persist, export, mutate document-root tokens or edit source/Figma.
The existing Linux Colors overview screenshot baseline requires an intentional
refresh on Linux before remote publication. The full visual snapshot suite was
not claimed as passing or replaced with macOS baselines.

Work stays on `feat/color-token-explorer`. No push, Netlify deployment or registry
publication was performed. The earlier portability checkpoint remains available
as `pre-native-css-portability-2026-09-07`.
