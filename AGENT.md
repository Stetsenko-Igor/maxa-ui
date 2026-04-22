# MAXA UI — AI Context

> This file is auto-downloadable: `npx maxa-ui@latest agent`

Component library: @maxa/ui (React + TypeScript + Radix UI + Tailwind v4)

**Status:** Under development — full context available in Phase 4.

Docs: https://ui.maxa.com/docs

## Current Design System Decisions

- MAXA is design-system-first, not Tailwind-first.
- Figma token source of truth lives in `packages/tokens/figma/`.
- Figma collections currently use:
  - `Primitives`
  - `Color modes`
  - `Spacing`
  - `Radius`
  - `Typography`
  - `Containers`
  - `Breakpoints`
- `Primitives` contains:
  - `Colors/...`
  - `Spacing/...`
- Spacing primitives use readable names with px labels, for example:
  - `Spacing/4 (16px)`
  - `Spacing/0․5 (2px)`
- Semantic spacing aliases point to primitive spacing tokens.
- Color semantic tokens point to primitive color tokens in `Primitives/Colors/...`.
- Typography foundation is currently app-oriented, not marketing-oriented.
- Typography uses:
  - `Font family/body = Montserrat`
  - `Font family/mono = Bebas Neue`
- `font-family-display` is intentionally not used for now.
- Current typography roles are:
  - `heading-2xl`, `heading-xl`, `heading-lg`, `heading-md`, `heading-sm`, `heading-xs`
  - `text-lg`, `text-md`, `text-sm`
  - `caption-sm`, `caption-xs`
- Current typography sizes are:
  - `heading-2xl = 40`
  - `heading-xl = 32`
  - `heading-lg = 26`
  - `heading-md = 22`
  - `heading-sm = 18`
  - `heading-xs = 16`
  - `text-lg = 16`
  - `text-md = 14`
  - `text-sm = 12`
  - `caption-sm = 10`
  - `caption-xs = 8`
- Current line heights are:
  - `48, 40, 34, 30, 26, 24, 24, 20, 18, 16, 12`
- Figma import is handled by the local dev plugin in `.knowledge/Figma Import plugin/`.
- Current plugin status:
  - supports paste of `import-bundle.json`
  - supports drag-and-drop of `manifest.json` plus token files
  - shows import progress with autoscroll
  - removes stale variables from collections during re-import
- `packages/tokens/figma/import-bundle.json` must be regenerated before import when token files change.
- Command to regenerate bundle from repo root:
  - `pnpm figma:bundle`
