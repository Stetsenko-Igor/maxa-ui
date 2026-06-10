# @maxa/hooks

Shared React hooks for reusable interaction logic across Maxa products - the home for behavior that components in `@maxa/ui` share but that does not belong inside any single component.

## Status

Placeholder. The package builds and exports only a `version` constant - hooks are planned for a later phase. The package exists now so that workspace wiring, build scripts, and consumers do not change when hooks land.

## Requirements

- React 18 or 19 (peer dependency)

## Usage inside this workspace

```jsonc
// package.json
"dependencies": { "@maxa/hooks": "workspace:^" }
```

```ts
import { version } from "@maxa/hooks"
```

## Usage from GitHub (no npm registry)

Clone the repo, build, then link via `file:`:

```bash
git clone https://github.com/Stetsenko-Igor/maxa-ui.git
cd maxa-ui && pnpm install && pnpm build
# in your project:
pnpm add file:../maxa-ui/packages/hooks
```

See the root [README](../../README.md) for distribution options and caveats.

## Exports

- `version` - package version string (placeholder)

## Planned scope

- Interaction hooks shared by `@maxa/ui` components (focus management, controlled/uncontrolled state, dismissal)
- Product-level hooks that encode Maxa UX patterns
