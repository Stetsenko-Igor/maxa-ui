# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo

Turborepo + pnpm workspaces. Packages: `@maxa/ui`, `@maxa/tokens`, `@maxa/icons`, `@maxa/hooks`, `@maxa/cli`, `@maxa/mcp`. Docs: `apps/docs` (Next.js 15 + Tailwind v4).

## Commands

```bash
pnpm build              # build all packages (respects turbo dependency graph)
pnpm dev                # start all packages in watch/dev mode in parallel
pnpm test               # run all tests
pnpm typecheck          # typecheck all packages
pnpm lint               # lint all packages
pnpm format             # prettier on all TS/TSX/MD/JSON/CSS/YAML files
pnpm figma:bundle       # regenerate packages/tokens/figma/import-bundle.json

# Single package
pnpm --filter @maxa/ui test
pnpm --filter @maxa/ui test -- --watch

# Token audit (run before committing any CSS/component changes)
node scripts/audit-tokens.mjs
```

## Architecture

### Token system (three layers)

```
Primitives   @theme {}          raw hex/px values — never reference in components
    ↓
Semantic     :root {}           --color-text-primary, --color-action-primary
    ↓
Component    :root {}           --button-primary-bg, --button-size-md-height
    ↓
Component code                  background: var(--button-primary-bg)
```

Dark mode: `data-theme="dark"` on `<html>`. Token overrides live in `[data-theme="dark"] {}` inside `packages/tokens/src/themes/`. Do not write dark selectors in component code.

Type-safe token props are exported from `packages/ui/src/base-tokens.tsx` (`TextColorToken`, `BackgroundColorToken`, etc.) — use these for component prop types that accept token names.

### Component pattern

`forwardRef + cva + Slot (Radix)`. Reference: `packages/ui/src/components/button/`. All styling via CSS variables only — no inline styles, no Tailwind utility classes for design values.

### Specs directory (source of truth for all design decisions)

```
specs/README.md                     overview and workflow
specs/tokens-reference.md           master index of all CSS variable names
specs/foundations/color.md          semantic color token meanings and usage rules
specs/foundations/spacing.md        spacing scale
specs/foundations/typography.md     type scale (Montserrat body, Roboto Mono code)
specs/foundations/radius.md         radius scale
specs/patterns/interactive-hierarchy.md  button variant decision tree
specs/components/button.md          button anatomy, variants, sizes, states
specs/components/input.md           input primitive/form composition model
specs/components/select.md          select/dropdown naming and boundaries
specs/components/date-picker.md     date picker field composition model
```

### Figma token workflow

Token source lives in `packages/tokens/figma/`. After editing token JSON files, run `pnpm figma:bundle` to regenerate `import-bundle.json`. The MAXA Token Importer Figma plugin (`.knowledge/Figma Plugins/MAXA Token Importer/`) fetches the bundle from GitHub Raw — push first, then import in Figma.

### Releases

Uses Changesets (`@changesets/cli`). Add a changeset before opening a PR that bumps a package version.

## Hard rules

- **Never** hardcode hex colors — use `var(--color-*)` tokens
- **Never** hardcode `px` values that exist in the spacing or radius scale
- **Never** use primitive tokens directly in component code — only semantic or component tokens
- **One `primary` button per view** — see `specs/patterns/interactive-hierarchy.md`
- Run `node scripts/audit-tokens.mjs` before committing; exit code 1 means violations

## Before writing any UI code

1. Read `specs/README.md`
2. Read the relevant foundation spec in `specs/foundations/`
3. If building a component, read `specs/components/<name>.md`
4. Look up exact CSS variable names in `specs/tokens-reference.md`
