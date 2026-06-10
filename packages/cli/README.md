# @maxa/cli

> **EXPERIMENTAL** read-only command-line introspection for the Maxa design system. Do not depend on this package for stable workflows yet.

The package exposes the `maxa-ui` binary. Its current scope is intentionally small: inspect known components and tokens from a local checkout of this repository.

## Current scope

- `components list` - list component specs and implementation status
- `tokens search <query>` - search design token names
- `tokens get <token>` - print one token value and its `var(...)` resolution chain
- `--json` - return machine-readable output for supported commands

Component generators, project scaffolding, install helpers, and mutation commands are intentionally not implemented.

## Usage inside this workspace

```bash
pnpm --filter @maxa/cli build
node packages/cli/dist/index.js --help
node packages/cli/dist/index.js components list
node packages/cli/dist/index.js tokens search button
node packages/cli/dist/index.js tokens get --button-primary-bg --mode dark
```

## Running outside this workspace

The CLI reads token CSS and component specs from the repository. Set `MAXA_REPO_ROOT` when running from another directory:

```bash
MAXA_REPO_ROOT=/path/to/maxa-ui node packages/cli/dist/index.js tokens search color
```

## Usage from GitHub (no npm registry)

This package is not published to npm. For now, clone the repo, build the package, then run the built binary directly or install it from a local file path. See the root [README](../../README.md) for distribution options.

## Exports

- `version` - CLI package version string
- `runCli(argv, io)` - testable command runner
- `maxa-ui` bin - experimental read-only introspection commands
