# Handoff — Input Figma Tokens

Date: 2026-05-27

## Current State

The `Input` component-based token layer has been added and pushed to GitHub.

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

## Figma Auth Situation

ChatGPT UI showed the Figma app connected on 2026-05-27.

However, Codex Figma MCP tools still returned:

```txt
Provided authentication token is expired
code: token_expired
status: 401
```

This likely means the ChatGPT app connection is visible in UI, but the current Codex/Figma MCP tool session still has a stale token.

Recommended after restart:

1. Restart VS Code / Codex session.
2. Start a new chat.
3. Ask Codex to test Figma access again against:
   - file key: `ODH3pmxkKyP8pAslgDb15s`
   - node id: `119:61`
4. If it still fails, disconnect and reconnect Figma in ChatGPT settings, then start another fresh Codex chat.

## Next Practical Steps

1. Import latest `import-bundle.json` through `MAXA Token Importer`.
2. Confirm `Component-based Tokens/Input/...` variables appear in Figma.
3. Build a new Figma Input component set on top of `Input/...` variables.
4. Do not migrate an old Input component as the foundation. Create a clean component set.
5. Suggested component architecture:
   - `Inputs/Input`
   - properties: `size = sm | md | lg`
   - properties: `state = default | hover | focus | error | success | disabled | readonly`
   - component properties for label, hint/helper, required marker, leading icon, trailing action
6. Keep `Select` and `DatePicker` as separate component families, even if React/CSS currently reuse some Input implementation tokens.

## Suggested First Prompt For The New Chat

```txt
Continue MAXA UI from .knowledge/Handoff — 2026-05-27 Input Figma Tokens.md.
First, check Figma MCP access to file ODH3pmxkKyP8pAslgDb15s node 119:61.
Then help me validate that imported Component-based Tokens include Input/... and plan/create the new Figma Input component set.
```
