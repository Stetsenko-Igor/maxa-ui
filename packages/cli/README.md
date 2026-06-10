# @maxa/cli

> **EXPERIMENTAL STUB - no commands implemented yet.** The binary only prints its version. Do not depend on this package for any workflow.

Future command-line tooling for the Maxa design system, exposed as the `maxa-ui` binary.

## Current state

Running the built binary does nothing useful yet:

```bash
node packages/cli/dist/index.js
# maxa-ui v0.0.0
```

There are no commands, no flags, and no stable API. Everything below is planned, not built.

## Planned scope

- **Token introspection** - query token names, values, and layers from the terminal (e.g. resolve `--color-action-primary` through the primitive → semantic → component chain)
- **Component scaffolding** - generate a new component skeleton (spec file, component token CSS, React implementation, tests, docs page) that follows repo conventions

## Usage inside this workspace

```bash
pnpm --filter @maxa/cli build
node packages/cli/dist/index.js
```

## Usage from GitHub (no npm registry)

Not recommended while the package is a stub. When it becomes useful: clone the repo, build, then `pnpm add file:../maxa-ui/packages/cli` or run the built binary directly. See the root [README](../../README.md) for distribution options.

## Exports

- `version` - package version string (placeholder)
- `maxa-ui` bin - prints version, nothing else
