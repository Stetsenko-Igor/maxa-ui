# Package Contracts

MAXA UI packages are structured as publishable packages, but nothing is
published to a registry yet (targets per `RELEASING.md`: GitLab Package Registry
primary, public npm optional). This document describes the dependency contract
we keep ready for registry distribution without starting a release.

## Dependency Rules

- Use `peerDependencies` when the consuming app must provide exactly one shared
  runtime instance or must opt into an app-level stylesheet.
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
| `@maxa/ui`     | Depends on `@maxa/icons` because components import icons directly. Peers on React/React DOM and `@maxa/tokens`; apps must load `@maxa/tokens/theme.css` once at the root. |
| `@maxa/hooks`  | Peers on React/React DOM; currently exports only `version` until shared hooks land.                                                                                       |
| `@maxa/mcp`    | Depends on MCP SDK and `zod`; exposes read-only server/library APIs.                                                                                                      |
| `@maxa/cli`    | Depends on `@maxa/mcp` because the CLI calls MCP/repo inspection utilities at runtime.                                                                                    |

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
