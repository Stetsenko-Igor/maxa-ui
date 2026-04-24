# MAXA UI — Claude Code Context

Monorepo: Turborepo + pnpm workspaces
Packages: @maxa/ui, @maxa/tokens, @maxa/icons, @maxa/hooks, @maxa/cli, @maxa/mcp
Docs: apps/docs (Next.js 15)

## Commands
- `pnpm build` — build all packages
- `pnpm test` — run all tests
- `pnpm typecheck` — typecheck all
- `pnpm --filter @maxa/ui test` — test single package

## Token layers
1. Primitives in @theme {} → Tailwind utilities
2. Semantic in :root {} → var(--color-text-primary)
3. Component in :root {} → var(--button-primary-bg)

## Dark mode
data-theme="dark" on <html>

## Component pattern
forwardRef + cva + Slot (Radix). See packages/ui/src/components/button/ as reference.

---

## Agent Instructions — Read Before Writing UI Code

MAXA is design-system-first. All design values come from tokens. Never hardcode colors, spacing, or radius.

### Before writing any component or CSS:

1. Read `specs/README.md` — understand the spec structure
2. Read the relevant foundation spec in `specs/foundations/`
3. If building a component, read `specs/components/<name>.md`
4. For button variant decisions, read `specs/patterns/interactive-hierarchy.md`
5. Look up exact CSS variable names in `specs/tokens-reference.md`

### Hard rules

- **Never** hardcode hex colors: use `var(--color-*)` tokens
- **Never** hardcode `px` values that exist in the spacing or radius scale
- **Never** use primitive tokens directly in component code — only semantic or component tokens
- **One `primary` button per view** — see `specs/patterns/interactive-hierarchy.md`
- Dark mode is handled at the token level via `data-theme="dark"` — do not write separate dark selectors for colors

### Token enforcement

Run the audit script to check for violations before committing:
```bash
node scripts/audit-tokens.mjs
```

Exit code 1 = violations found. Fix them before submitting.

### Token architecture summary

```
Primitives (raw hex/px)
  ↓
Semantic tokens   --color-text-primary, --color-action-primary
  ↓
Component tokens  --button-primary-bg, --button-size-md-height
  ↓
Component code    (only references semantic or component tokens)
```
