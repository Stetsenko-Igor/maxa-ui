# MAXA UI

MAXA UI is the design system repository for Maxa. It packages the shared design language as npm packages, Figma-ready tokens, React components, documentation, and agent-readable specifications.

The goal is to close the gap between design and engineering: the same decisions that shape Figma components also ship as tokens, component APIs, docs, tests, and specs that humans and AI agents can read before building product UI.

## What this repository contains

- `@maxa/tokens` - CSS variables, theme files, TypeScript token exports, and Figma import JSON.
- `@maxa/ui` - accessible React components built on top of the token system.
- `@maxa/icons` - shared icon package placeholder for Maxa-owned icon assets.
- `@maxa/hooks` - shared React hooks package placeholder for reusable interaction logic.
- `@maxa/cli` - tooling package placeholder for future design-system automation.
- `@maxa/mcp` - integration package placeholder for future AI/MCP workflows.
- `apps/docs` - local documentation site with component examples and usage guidance.
- `specs` - agent-readable design system contracts for foundations, components, and patterns.
- `packages/tokens/figma` - import-ready Figma variable collections and bundles.

## Why it exists

Maxa product work moves faster when design decisions are explicit and reusable. This repository gives designers, engineers, and AI agents a single source of truth for:

- visual tokens and themes
- component behavior and accessibility
- component naming and ownership boundaries
- Figma variable import files
- docs examples for implementation
- specs that prevent invented colors, spacing, and interaction patterns

## Architecture

The system follows a layered model:

```text
Primitive tokens
  -> semantic tokens
    -> component tokens
      -> React components
        -> product patterns
```

Package ownership:

- `@maxa/tokens` owns design decisions: color, spacing, radius, typography, shadows, component token aliases, and Figma JSON.
- `@maxa/ui` owns component behavior: React APIs, accessibility, composition, states, and component CSS that reads tokens.
- `apps/docs` owns documentation and visual examples.
- `specs` owns durable contracts for humans and AI agents.

Future adapters, such as Tailwind, should mirror the token system. They must not become a second source of truth.

## Packages

This repo is a pnpm workspace. The primary npm packages are:

```text
packages/tokens  -> @maxa/tokens
packages/ui      -> @maxa/ui
packages/icons   -> @maxa/icons
packages/hooks   -> @maxa/hooks
packages/cli     -> @maxa/cli
packages/mcp     -> @maxa/mcp
```

At the app root, import the theme once:

```ts
import "@maxa/tokens/theme.css"
```

Then import components from `@maxa/ui`:

```tsx
import { Button, Select, Dialog } from "@maxa/ui"
```

## Development

Install dependencies:

```bash
pnpm install
```

Run the docs site:

```bash
pnpm dev
```

Run the full verification pipeline:

```bash
pnpm verify
```

Useful scripts:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm audit:tokens
pnpm figma:bundle
pnpm build
```

## Figma workflow

Figma variables are generated from `packages/tokens/figma`.

Use:

```bash
pnpm figma:bundle
```

Then import the generated bundle or the manifest-backed token files into Figma. See `packages/tokens/figma/README.md` for import order, naming rules, and validation notes.

## Component workflow

Every production component should have:

- a component spec in `specs/components`
- component CSS backed by semantic or component tokens
- React implementation in `packages/ui/src/components`
- tests for behavior and accessibility-sensitive states
- docs examples in `apps/docs`
- Figma token JSON when the component introduces component-level design values

Do not hardcode design values in component code when a token exists. Run:

```bash
pnpm audit:tokens
```

before committing design-system changes.

## AI agent workflow

This repository is intentionally structured for AI-assisted product work.

Before changing UI, agents should read:

1. `specs/architecture.md`
2. the relevant `specs/components/<component>.md`
3. the relevant docs page in `apps/docs`
4. token references before choosing color, spacing, radius, or typography

The intent is simple: agents should build with the Maxa design system, not invent nearby-looking UI.

## Current status

MAXA UI is under active development. The foundation, token system, documentation site, and core component set are in place. The project is currently moving from primitive components into higher-level product and data-display patterns.

The packages are structured for future npm distribution, but publishing is a separate release step. Before publishing, run the full verification pipeline and package dry-runs for `@maxa/tokens` and `@maxa/ui`.

## License

Private Maxa repository unless stated otherwise.
