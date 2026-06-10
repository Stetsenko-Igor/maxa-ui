# @maxa/icons

Shared icon package for Maxa-owned icon assets. Icons will ship as React SVG components sized and colored through the `@maxa/tokens` system.

## Status

Placeholder. The package builds and exports only a `version` constant - SVG icon components are planned for a later phase. The package exists now so that workspace wiring, build scripts, and consumers do not change when icons land.

## Requirements

- React 18 or 19 (peer dependency)

## Usage inside this workspace

```jsonc
// package.json
"dependencies": { "@maxa/icons": "workspace:^" }
```

```ts
import { version } from "@maxa/icons"
```

## Usage from GitHub (no npm registry)

Clone the repo, build, then link via `file:`:

```bash
git clone https://github.com/Stetsenko-Igor/maxa-ui.git
cd maxa-ui && pnpm install && pnpm build
# in your project:
pnpm add file:../maxa-ui/packages/icons
```

See the root [README](../../README.md) for distribution options and caveats.

## Exports

- `version` - package version string (placeholder)

## Planned scope

- React SVG icon components with consistent viewBox and sizing
- Color inheritance via `currentColor` so icons follow semantic text tokens
- Figma icon library parity
