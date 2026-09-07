# Package Contracts

MAXA UI packages are structured as publishable packages, but nothing is
published to a registry yet (targets per `RELEASING.md`: GitLab Package Registry
primary, public npm optional). This document describes the dependency contract
we keep ready for registry distribution without starting a release.

## Dependency Rules

- Use `peerDependencies` when the consuming app must provide exactly one shared
  runtime instance. Explicit stylesheet loading does not by itself make a token package a peer.
- Use `dependencies` when a package imports another package at runtime and the
  consumer should not manage that dependency directly.
- Use `devDependencies` for local build, typecheck, test, and docs tooling only.
- Workspace references are allowed in source manifests. `pnpm pack` must rewrite
  them before publication; `pnpm pack:smoke` verifies that packed manifests do
  not leak `workspace:` ranges.

## Current Packages

| Package        | Runtime contract                                                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@maxa/tokens` | Owns CSS token files and TypeScript token exports. No runtime peers.                                                                                                      |
| `@maxa/icons`  | Depends on `@phosphor-icons/react`; peers on React/React DOM so consumers keep one React tree.                                                                            |
| `@maxa/ui`     | Depends on `@maxa/icons`, `@maxa/hooks`, and `@maxa/tokens`. Peers on React/React DOM 17–19; apps explicitly load token CSS once at the document root. |
| `@maxa/hooks`  | Peers on React/React DOM; provides shared hooks including the React 17 `useId` fallback.                                                                                       |
| `@maxa/mcp`    | Depends on MCP SDK and `zod`; exposes read-only server/library APIs.                                                                                                      |
| `@maxa/cli`    | Depends on `@maxa/mcp` because the CLI calls MCP/repo inspection utilities at runtime.                                                                                    |

## CSS consumption contract

`@maxa/tokens/theme.css` is standard CSS with all foundation/component tokens and the MAXA brand scale. `@maxa/tokens/core.css` excludes only that brand scale and requires a complete root-level client theme. Replacing the eleven brand values is not a full rebrand: action semantics, typography, dimensions, and dark states need explicit review.

`@maxa/ui/styles.css` aggregates component CSS for HTML/ERB asset pipelines. It does not implement React behaviors or accessibility. Existing React JS imports continue to include their component styles. Both React and aggregate CSS entries include component-local border-box normalization for MAXA classes and their pseudo-elements; document elements remain untouched. No global reset or font files are included. Tailwind is optional; no adapter is provided.

Whole-app themes at the document root are supported. Nested theme scopes and portals across those scopes are unsupported. Existing generic token names may collide with host themes; settle the namespace contract before a Concept3D client release. React 16 is outside the supported React 17–19 range.

## Smoke Coverage

`pnpm pack:smoke` checks package readiness without publishing:

- package `main`, `module`, `types`, `exports`, and `bin` targets exist
- bin files are executable and have shebangs
- built ESM uses explicit relative file extensions
- packed manifests do not contain `workspace:` dependency ranges
- packed tarballs install into a temporary consumer project
- JS-only packages import in Node
- `@maxa/ui` and `@maxa/tokens/theme.css` resolve from the consumer project
- a Vite React app imports `@maxa/tokens/theme.css`, renders `@maxa/ui`
  components, and builds successfully

This smoke is intentionally a package-readiness guard. It is not a release
command and does not publish packages.
