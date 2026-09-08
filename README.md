# MAXA UI

[![build](https://img.shields.io/github/actions/workflow/status/Stetsenko-Igor/maxa-ui/ci.yml?branch=main&style=flat-square&label=build)](https://github.com/Stetsenko-Igor/maxa-ui/actions/workflows/ci.yml) [![@maxa/ui](https://img.shields.io/github/package-json/v/Stetsenko-Igor/maxa-ui?filename=packages%2Fui%2Fpackage.json&style=flat-square&label=%40maxa%2Fui&color=0d9488)](https://github.com/Stetsenko-Igor/maxa-ui/blob/main/packages/ui/package.json) [![components](https://img.shields.io/badge/components-42-0d9488?style=flat-square)](https://maxa-ui.netlify.app/docs/components) [![maintained with](https://img.shields.io/badge/maintained%20with-turborepo%20%2B%20pnpm-0d9488?style=flat-square)](https://turborepo.com) [![types](https://img.shields.io/badge/types-TypeScript-3178C6?style=flat-square)](https://www.typescriptlang.org/) [![docs](https://img.shields.io/badge/docs-online-0d9488?style=flat-square)](https://maxa-ui.netlify.app/)

MAXA UI is the design system repository for Maxa. It packages the shared design language as workspace packages, Figma-ready tokens, React components, documentation, and agent-readable specifications. Packages are not published yet. The intended target is the GitLab Package Registry (primary); public npm stays an option for external developers - see [`RELEASING.md`](RELEASING.md).

Primary docs: https://maxa-ui.netlify.app/

GitHub Pages mirror: https://stetsenko-igor.github.io/maxa-ui/

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

Tailwind is not required. At the app root, import the standard CSS theme once:

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

For HTML or Rails ERB, load `@maxa/tokens/theme.css` and `@maxa/ui/styles.css` through your asset pipeline. The latter aggregates component styles without JavaScript; markup, state, keyboard handling, focus management, and accessibility remain the host application’s responsibility. React imports already include component CSS.

React imports and `@maxa/ui/styles.css` include component-local `border-box` sizing for MAXA classes and their pseudo-elements. Neither CSS entry includes a global reset or font files. Configure the host reset and load the chosen fonts explicitly. For a custom whole-app theme, use `@maxa/tokens/core.css` plus a complete root-level theme; see the [tokens README](packages/tokens/README.md).

### New-client integration: namespaced delivery

Use the matching namespaced token and React entries for a new client application:

```tsx
import "@maxa/tokens/namespaced/theme.css"
import { Button } from "@maxa/ui/namespaced"
```

HTML/ERB consumers pair `@maxa/tokens/namespaced/theme.css` with `@maxa/ui/namespaced/styles.css`. Set `data-maxa-theme="dark"` on `<html>` for this delivery. Public owned variables use `--maxa-*`; the prefix identifies the library, not the client brand. This avoids collisions with generic host token names while preserving vendor variables such as Radix properties.

The namespaced full theme combines `namespaced/core.css` (non-brand palettes and reusable component aliases) with `namespaced/themes/maxa.css` (MAXA semantic, typography, geometry, motion, shadow, and component decisions). Blue primary actions remain separate from teal brand roles. A client may override primary-action recipes independently, but a complete rebrand still requires reviewing the whole theme. No Concept3D palette or scaffold is supplied yet.

Load only one UI delivery variant per document: both variants use the same component classes. Existing generic exports and Figma identities remain unchanged; legacy `core.css` still contains MAXA defaults and is not neutral. See the [tokens contract](packages/tokens/README.md#namespaced-delivery-for-new-clients) for details. Whole-document themes and explicit host font loading remain required; nested scopes and React 16 support are not added.

### Compatibility

`@maxa/ui`, `@maxa/hooks`, and `@maxa/icons` support **React 17, 18, and 19**
(`react`/`react-dom` peer range `^17 || ^18 || ^19`). React 17 is supported via a
`useId` ponyfill in `@maxa/hooks` (native `useId` on 18+, a stable counter fallback
on 17) — intended for client-rendered (SPA) apps. React 16 is outside this contract; historical Localist React 16 installations require an upgrade or a separate integration assessment.

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
2. Subpackages depend on each other (`@maxa/ui` depends on `@maxa/tokens`, `@maxa/icons`, and `@maxa/hooks`), so they must be consumed together from the same checkout.

Realistic options, in order of preference:

**Option A - build and install packed tarballs (verified by package smoke)**

```bash
git clone https://github.com/Stetsenko-Igor/maxa-ui.git
cd maxa-ui
pnpm install
pnpm build
mkdir -p /absolute/path/to/consumer/vendor/maxa
pnpm --filter '@maxa/ui...' -r exec pnpm pack --pack-destination /absolute/path/to/consumer/vendor/maxa
```

This packs UI and its workspace dependencies (tokens, icons, and hooks), rewriting `workspace:` ranges. In the consuming app, add the following to `package.json`; retain the app’s supported React/React DOM dependencies:

```json
{
  "dependencies": {
    "@maxa/ui": "file:vendor/maxa/maxa-ui-0.1.0.tgz",
    "@maxa/tokens": "file:vendor/maxa/maxa-tokens-0.1.0.tgz"
  },
  "pnpm": {
    "overrides": {
      "@maxa/ui": "file:vendor/maxa/maxa-ui-0.1.0.tgz",
      "@maxa/tokens": "file:vendor/maxa/maxa-tokens-0.1.0.tgz",
      "@maxa/icons": "file:vendor/maxa/maxa-icons-0.1.0.tgz",
      "@maxa/hooks": "file:vendor/maxa/maxa-hooks-0.0.1.tgz"
    }
  }
}
```

Run `pnpm install` in the consuming app. Adjust paths and versioned filenames to the actual pack output. Overrides keep transitive MAXA dependencies on the local tarballs instead of looking for unpublished registry packages. Rebuild, repack, and reinstall when updating. Direct `file:` links to source package directories are not the verified external consumption path.

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

The Colors page has two views: **Overview** combines the color model and reference
tables, while **Tokens** provides a read-only browser with search on the left,
source values, dependencies, and component CSS usage. Open
`/docs/foundations/colors#tokens` locally. The browser follows the site theme.

Values, dependencies, and component CSS references are generated from native
stylesheets. After changing those sources, run `pnpm tokens:reference`; CI checks
freshness with `pnpm tokens:reference:check`.
See [Color Token Browser](docs/color-token-explorer.md) for usage and maintenance.

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
- Status color vocabulary is `info`/`success`/`warning`/`error` everywhere, with `destructive` reserved for interactive actions (e.g. `Button variant="destructive"`) — see [Color Token Naming Migration](docs/color-token-naming-migration-2026-07.md) for the full rename history and consumer migration steps.

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
