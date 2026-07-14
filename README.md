# MAXA UI

[![build](https://img.shields.io/github/actions/workflow/status/Stetsenko-Igor/maxa-ui/ci.yml?branch=main&style=flat-square&label=build)](https://github.com/Stetsenko-Igor/maxa-ui/actions/workflows/ci.yml) [![@maxa/ui](https://img.shields.io/github/package-json/v/Stetsenko-Igor/maxa-ui?filename=packages%2Fui%2Fpackage.json&style=flat-square&label=%40maxa%2Fui&color=0d9488)](https://github.com/Stetsenko-Igor/maxa-ui/blob/main/packages/ui/package.json) [![components](https://img.shields.io/badge/components-40-0d9488?style=flat-square)](https://stetsenko-igor.github.io/maxa-ui/docs/components) [![maintained with](https://img.shields.io/badge/maintained%20with-turborepo%20%2B%20pnpm-0d9488?style=flat-square)](https://turborepo.com) [![types](https://img.shields.io/badge/types-TypeScript-3178C6?style=flat-square)](https://www.typescriptlang.org/) [![docs](https://img.shields.io/badge/docs-online-0d9488?style=flat-square)](https://stetsenko-igor.github.io/maxa-ui/)

MAXA UI is the design system repository for Maxa. It packages the shared design language as workspace packages, Figma-ready tokens, React components, documentation, and agent-readable specifications. Packages publish to the GitLab Package Registry (primary); public npm stays an option for external developers - see [`RELEASING.md`](RELEASING.md).

Docs site: https://stetsenko-igor.github.io/maxa-ui/ (deployed from `main` via GitHub Pages)

The goal is to close the gap between design and engineering: the same decisions that shape Figma components also ship as tokens, component APIs, docs, tests, and specs that humans and AI agents can read before building product UI.

## What this repository contains

- `@maxa/tokens` - CSS variables, theme files, TypeScript token exports, and Figma import JSON.
- `@maxa/ui` - accessible React components built on top of the token system.
- `@maxa/icons` - curated system icon package for approved Phosphor icons and Maxa-owned social icons.
- `@maxa/hooks` - shared React hooks package placeholder for reusable interaction logic.
- `@maxa/cli` - experimental read-only design-system introspection commands.
- `@maxa/mcp` - MCP server that exposes the design system to AI agents.
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

This repo is a pnpm workspace. The primary packages are:

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

Formatted field wrappers are exported from the same entrypoint:

```tsx
import { NumberInput, CurrencyInput, PhoneInput } from "@maxa/ui"
```

### Compatibility

`@maxa/ui`, `@maxa/hooks`, and `@maxa/icons` support **React 17, 18, and 19**
(`react`/`react-dom` peer range `^17 || ^18 || ^19`). React 17 is supported via a
`useId` ponyfill in `@maxa/hooks` (native `useId` on 18+, a stable counter fallback
on 17) — intended for client-rendered (SPA) apps.

## Installation / Consumption

The packages are not yet published to any registry. The intended targets are the **GitLab Package Registry** (primary) and, optionally, **public npm** for external developers — see [`RELEASING.md`](RELEASING.md). Until a release is explicitly approved, consumption is source-based (options below).

### Inside this monorepo

Workspace packages reference each other with the `workspace:` protocol:

```jsonc
// package.json of an app or package in this repo
"dependencies": {
  "@maxa/tokens": "workspace:^",
  "@maxa/ui": "workspace:^"
}
```

`pnpm install` links them automatically; `pnpm build` respects the turbo dependency graph.

### In an external project

Be aware of two constraints before choosing an approach:

1. pnpm can install from a git subdirectory (`pnpm add github:Stetsenko-Igor/maxa-ui#path:packages/ui`), but that **does not work here**: the packages ship `dist/` only, and `dist/` is produced by repo-level build scripts (`scripts/*.mjs`, workspace TypeScript config) that do not run during a git install. You would get a package without build output.
2. Subpackages depend on each other (`@maxa/ui` peer-depends on `@maxa/tokens`), so they must be consumed together from the same checkout.

Realistic options, in order of preference:

**Option A - clone, build, link via `file:`**

```bash
git clone https://github.com/Stetsenko-Igor/maxa-ui.git
cd maxa-ui && pnpm install && pnpm build
```

```bash
# in your project
pnpm add file:../maxa-ui/packages/tokens file:../maxa-ui/packages/ui
```

Re-run `pnpm build` in the clone (and reinstall if needed) when pulling updates.

**Option B - git submodule + workspace link**

Add this repo as a submodule and include its packages in your own pnpm workspace:

```bash
git submodule add https://github.com/Stetsenko-Igor/maxa-ui.git vendor/maxa-ui
```

```yaml
# pnpm-workspace.yaml
packages:
  - "vendor/maxa-ui/packages/*"
```

Then depend on `@maxa/ui` with `workspace:^` and build the submodule packages as part of your pipeline. Best when you want to pin an exact commit and track updates through git.

**Option C - registry install (once released)**

When a release is approved, packages publish to the GitLab Package Registry (primary, auth via `.npmrc`) and optionally to public npm, allowing normal `pnpm add @maxa/ui` installs without cloning. The publish flow is documented in [`RELEASING.md`](RELEASING.md). GitHub Packages is not a target.

Each package also has its own README under `packages/<name>/README.md` with package-specific usage.
The package dependency contract is documented in [Package Contracts](docs/package-contracts.md).

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

Release/versioning is intentionally separate from day-to-day package readiness.
Do not run `pnpm changeset version` unless the team has explicitly decided to
start a registry release. See [Release Policy](docs/release-policy.md).
The future release sequence is drafted in [Release Workflow Draft](docs/release-workflow.md).

Useful scripts:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm audit:tokens
pnpm figma:bundle
pnpm build
```

Local git hooks are installed by `pnpm install` through the `prepare` script. The pre-push hook runs the fast design-system guards:

```bash
pnpm audit:tokens
pnpm tokens:reference:check
```

For an emergency push, set `MAXA_SKIP_GIT_HOOKS=1`.

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

Current component API decisions:

- `Button` includes `warning`, `text`, and `fullWidth` alongside the core variants.
- Formatted fields use separate wrappers (`NumberInput`, `CurrencyInput`, `PhoneInput`) instead of expanding `Input.kind`.
- `Alert` uses an explicit `action` slot with `AlertAction`; shorthand action props are intentionally not part of the public API.

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
4. `specs/tokens-reference.md` before choosing color, spacing, radius, or typography

`specs/` is the source of truth for all design decisions. `specs/tokens-reference.md` is auto-generated - regenerate it with `pnpm tokens:reference` after token changes (CI checks it via `pnpm tokens:reference:check`).

The intent is simple: agents should build with the Maxa design system, not invent nearby-looking UI.

## Current status

MAXA UI is under active development. The foundation, token system, documentation site, and core component set are in place. The project is currently moving from primitive components into higher-level product and data-display patterns.

The packages are structured like publishable npm packages (exports maps, `files` lists, peer dependencies), but nothing is published yet - target registries are the GitLab Package Registry (primary) and optionally public npm; see [Installation / Consumption](#installation--consumption) and [`RELEASING.md`](RELEASING.md). Run the full verification pipeline (`pnpm verify`) before tagging any state that external consumers will pin.

## License

Private Maxa repository unless stated otherwise.
