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
2. Semantic in :root {} → var(--color-content-primary)
3. Component in :root {} → var(--button-bg-primary)

## Dark mode
data-theme="dark" on <html>

## Component pattern
forwardRef + cva + Slot (Radix). See packages/ui/src/components/button/ as reference.
