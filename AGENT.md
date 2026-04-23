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
  - `Layout`
  - `Breakpoints`
- `Primitives` contains:
  - `Colors/...`
  - `Spacing/...`
- Spacing primitives use readable names with px labels, for example:
  - `Spacing/4 (16px)`
  - `Spacing/0․5 (2px)`
- Semantic spacing aliases point to primitive spacing tokens.
- MAXA Figma methodology for spacing/layout is now:
  - `Primitives -> Spacing -> Layout`
  - `Primitives` = raw values
  - `Spacing` = universal semantic spacing aliases
  - `Layout` = designer-facing usage layer for Auto layout decisions
- `Layout` uses grouped variable names so Figma shows separate groups:
  - `Stack/*`
  - `Inline/*`
  - `Container/*`
  - `Grid/*`
- Current `Layout` values use responsive modes:
  - `Desktop`
  - `Tablet`
  - `Mobile`
- Current `Layout` tokens include:
  - `Stack/tight`, `Stack/text`, `Stack/default`, `Stack/group`, `Stack/section`
  - `Inline/tight`, `Inline/default`, `Inline/group`
  - `Container/padding`, `Container/max-width`
  - `Grid/gutter`, `Grid/margin`
- `Grid/margin` intentionally stays separate from `Container/padding` by name, even when it aliases it, because the semantics are different.
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
  - plugin version is `MAXA Token Importer v5`
  - supports loading latest `import-bundle.json` from GitHub Raw with the `Load latest from GitHub` button
  - supports paste of `import-bundle.json`
  - supports drag-and-drop of `manifest.json` plus token files
  - shows import progress with autoscroll
  - removes stale variables from collections during re-import
- The plugin cannot read local repo files directly from disk. The no-copy-paste workflow fetches:
  - `https://raw.githubusercontent.com/Stetsenko-Igor/maxa-ui/main/packages/tokens/figma/import-bundle.json`
- `packages/tokens/figma/import-bundle.json` must be regenerated before import when token files change.
- Command to regenerate bundle from repo root:
  - `pnpm figma:bundle`
