# @maxa/hooks

Shared React hooks for reusable interaction logic across Maxa products - the home for behavior that components in `@maxa/ui` share but that does not belong inside any single component.

## Status

Active. Ships the shared interaction hooks used across `@maxa/ui` components:
controlled/uncontrolled state, stable id generation (React 17-safe), and accessible
label/description id wiring.

## Requirements

- React 17, 18, or 19 (peer dependency)

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

- `useControlledState` - controlled/uncontrolled value with an `onChange` callback
- `useFieldId` - resolves a provided id or generates a stable one
- `useId` - `useId` ponyfill: native React 18+ `useId`, with a stable counter fallback for React 17 (client/SPA)
- `useLabelIds` - derives label / side-label / description ids and composed `aria-labelledby` / `aria-describedby`
- `version` - package version string

## Planned scope

- Additional interaction hooks shared by `@maxa/ui` components (focus management, dismissal)
- Product-level hooks that encode Maxa UX patterns
