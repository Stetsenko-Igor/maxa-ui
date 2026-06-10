# @maxa/mcp

MCP (Model Context Protocol) stdio server that exposes the MAXA design system to AI agents: component specs, component status, and the full design token catalog (light + dark values) parsed from `packages/tokens/src/`.

All tools are read-only. Data is loaded from the repository at server startup.

## Setup

Build once from the repo root:

```bash
pnpm --filter @maxa/mcp build
```

### Register in Claude Code

```bash
claude mcp add maxa -- node /path/to/maxa-ui-codex/packages/mcp/dist/cli.js
```

Or run via npx from git (builds on install):

```bash
claude mcp add maxa -- npx -y github:maxadesigns/maxa-ui-codex --workspace @maxa/mcp
```

### Repo root override

By default the server resolves the repo root relative to its own location (`packages/mcp/../..`). To point it at a different checkout, set `MAXA_REPO_ROOT`:

```bash
MAXA_REPO_ROOT=/path/to/maxa-ui-codex node packages/mcp/dist/cli.js
```

## Tools

### `list_components`

Lists every component known to the design system - the union of `specs/components/*.md` and `packages/ui/src/components/`. Status comes from the spec's `Status:` line when present, otherwise inferred (`implemented` / `spec-only`).

```json
{ "name": "table", "status": "shipped", "specPath": "specs/components/table.md", "hasImplementation": true }
```

### `get_component_spec`

Input: `{ "name": "DatePicker" }`

Returns the full markdown spec. Matching is fuzzy: case-insensitive and hyphen-insensitive (`DatePicker`, `date picker`, and `date-picker` all resolve to `specs/components/date-picker.md`). Unknown names return an error listing all valid names.

### `search_tokens`

Input: `{ "query": "button-primary" }`

Case-insensitive substring search over all CSS custom properties in `packages/tokens/src/**/*.css`. Each match includes the light value, the dark value (from `[data-theme="dark"]` blocks) if any, and the source file. Capped at 50 results; the total match count is always reported.

```json
{
  "name": "--button-primary-bg",
  "light": "var(--color-action-primary)",
  "dark": null,
  "sourceFile": "packages/tokens/src/component-button.css"
}
```

### `get_token`

Input: `{ "name": "--color-text-primary" }` (leading `--` optional)

Exact lookup. Returns light/dark values, source file, and the resolved `var()` reference chain (up to 5 hops) for both modes:

```json
{
  "name": "--color-text-primary",
  "light": "var(--color-neutral-950)",
  "dark": "var(--color-neutral-100)",
  "sourceFile": "packages/tokens/src/semantic.css",
  "resolution": {
    "light": [{ "name": "--color-neutral-950", "value": "#1B1A1A" }],
    "dark": [{ "name": "--color-neutral-100", "value": "#F4F3F3" }]
  }
}
```

## Library usage

The parsing utilities are exported for programmatic use and testing:

```ts
import { createServer, loadTokens, searchTokens, listComponents } from "@maxa/mcp"
```

## Development

```bash
pnpm --filter @maxa/mcp build      # compile to dist/
pnpm --filter @maxa/mcp test       # vitest
pnpm --filter @maxa/mcp typecheck  # tsc --noEmit
```
