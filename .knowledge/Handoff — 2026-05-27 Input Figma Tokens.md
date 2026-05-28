# Handoff — Input Figma Tokens

Date: 2026-05-27

## Current State

The `Input` component-based token layer has been added and pushed to GitHub.

Update from the following conversation:

- Figma MCP access was later available.
- An initial automated attempt to create the Figma Input component was stopped because that creation method did not match Igor's preferred component-building workflow.
- Igor manually created the Figma `Input` component set using the already-imported `Input/...` tokens and established the intended method for future component work.
- Treat the Input token + Figma component stage as done.

Latest pushed commits:

- `7f79c16 feat(tokens): add input component tokens`
- `fdad061 feat(docs): add "Tokens in context" SVG annotation diagram to colors page`

Remote branch:

- `main`
- `origin/main` points at `7f79c16`

Working tree was clean after push.

## What Changed

Added Figma component token source files:

- `packages/tokens/figma/component-input-light.json`
- `packages/tokens/figma/component-input-dark.json`

Updated:

- `packages/tokens/figma/manifest.json`
- `packages/tokens/figma/import-bundle.json`
- `packages/tokens/src/index.test.ts`
- `.knowledge/Component-based Tokens.md`
- `.knowledge/Design System — Current State.md`

The `Component-based Tokens` collection now includes `Button/...` and `Input/...` variables in both `Light` and `Dark` modes.

## Input Token Shape

Key paths now available in the bundle:

- `Input/bg`
- `Input/text`
- `Input/filled-text`
- `Input/placeholder`
- `Input/icon`
- `Input/icon-hover`
- `Input/border`
- `Input/border-hover`
- `Input/border-focus`
- `Input/focus-ring`
- `Input/focus-ring-offset`
- `Input/focus-ring-width`
- `Input/label/text`
- `Input/label/gap`
- `Input/label/weight`
- `Input/hint/text`
- `Input/error/text`
- `Input/error/hint`
- `Input/error/border`
- `Input/error/border-focus`
- `Input/success/hint`
- `Input/success/border`
- `Input/success/border-focus`
- `Input/disabled/bg`
- `Input/disabled/text`
- `Input/disabled/placeholder`
- `Input/disabled/opacity`
- `Input/readonly/bg`
- `Input/readonly/text`
- `Input/size/sm/*`
- `Input/size/md/*`
- `Input/size/lg/*`
- `Input/textarea/*`
- `Input/font-family`
- `Input/font-weight`

## Verification Already Run

All passed:

- `pnpm figma:bundle`
- `pnpm --filter @maxa/tokens test`
- `pnpm audit:tokens`
- `pnpm typecheck`
- `pnpm build`

GitHub raw bundle check returned `HTTP 200`:

- `https://raw.githubusercontent.com/Stetsenko-Igor/maxa-ui/main/packages/tokens/figma/import-bundle.json`

## Figma Component Status

The previously noted Figma authentication issue is no longer the relevant blocker.

Current accepted status:

1. Input tokens are imported into Figma.
2. Igor created the Input component set manually in Figma.
3. Future component generation should follow Igor's demonstrated Figma component-building method rather than the earlier automated component creation attempt.

## Completed Practical Steps

1. Latest `import-bundle.json` was imported through `MAXA Token Importer`.
2. `Component-based Tokens/Input/...` variables are available in Figma.
3. Igor created the clean Figma Input component set on top of `Input/...` variables.
4. Select and DatePicker remain separate component families even if React/CSS later reuse Input-like tokens.

## Next Practical Direction

Move from Input to the next foundation component families and taxonomy decisions:

- Avatars
- Badge
- Filters
- Tags
- Pills
- Tabs
- Toggle
- Tooltips

Important open taxonomy question:

- Badge, Tag, Pill, and Filter are visually similar, but should be separated by purpose, interaction model, and data semantics rather than only by shape.

## Suggested First Prompt For The New Chat

```txt
Continue MAXA UI from .knowledge/Handoff — 2026-05-27 Input Figma Tokens.md.
Input tokens and the Figma Input component set are done.
Help me plan the next foundation component-token families: Avatars, Badge, Filters, Tags, Pills, Tabs, Toggle, and Tooltips.
Pay special attention to how Badge, Tag, Pill, and Filter should be separated even though they look similar.
```
