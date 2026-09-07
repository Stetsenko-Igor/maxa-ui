# MAXA Package Architecture

This is the lightweight package contract for the design system. It exists to keep component work moving without re-litigating ownership between packages.

## Package Roles

### `@maxa/tokens`

The source of truth for design decisions.

Owns:

- CSS custom properties for primitives, semantic tokens, dimensions, typography, and component tokens
- JS/TS token constants for typed non-CSS usage
- Figma import/export token artifacts
- Standard CSS entry points: `theme.css` (complete MAXA theme) and `core.css` (complete foundation/component tokens excluding the MAXA brand scale)

Rule: new visual decisions start here unless they are truly component behavior.

### `@maxa/ui`

The React component package.

Owns:

- Component APIs and behavior
- Accessibility states and interaction behavior
- Component CSS that reads `@maxa/tokens` variables, including the `styles.css` aggregate for HTML/ERB consumers
- Composition helpers used by components

Rule: components consume component-level or semantic tokens. They should not introduce raw color, spacing, radius, typography, or shadow values when a token exists or should exist.

### Future `@maxa/tailwind`

A future adapter package, not a second source of truth.

It may exist when a real consumer needs Tailwind-native access to MAXA tokens.

Expected ownership:

- Tailwind theme mapping
- Utility aliases for MAXA token names
- Optional plugin or preset configuration

Rule: `@maxa/tailwind` mirrors `@maxa/tokens`; it does not define independent design decisions.

## Current Decision

Continue building components in `@maxa/ui` using `@maxa/tokens` as the token source.

Do not create `@maxa/tailwind` yet. Tailwind is currently only used by the docs app as an implementation tool, not as a required public integration.

## Portability boundary

Public token and component CSS must work without Tailwind. React consumers keep their existing imports; HTML/ERB consumers load token CSS and `@maxa/ui/styles.css` via their asset pipeline and implement required behavior and accessibility themselves. React and aggregate CSS entries include component-local border-box normalization for MAXA classes and their pseudo-elements. Neither entry includes a global reset or font loading.

Custom themes use `core.css` plus a complete document-root brand scale and the required semantic action, typography, dimension, and dark-mode overrides. Eleven replacement teal values are not a full rebrand. Whole-app themes are supported; nested scopes and portals crossing scopes are not.

Generic CSS variable names can collide with host themes. A namespace decision is required before a Concept3D client release. The `.maxa-*` class prefix does not block an independent fork: rename it consistently in the fork when its client scope is known. No prefix factory is required now.

## Distribution Contract

Packages are prepared for future npm publishing, but publishing is a separate release step.

Expected package shape:

- public package exports point to built `dist` files, not `src`
- CSS assets are copied into `dist` during package builds
- `files` allowlists keep published tarballs focused on runtime artifacts
- CSS files are listed as side effects so bundlers do not tree-shake component styles
- `@maxa/ui` supports React 17, 18, and 19 peer ranges unless a component explicitly requires a newer React API

Do not publish packages from local WIP. Before any publish attempt, run package builds, package dry-runs, and the full verification pipeline.

## Practical Component Rule

When creating or changing a component:

1. Use existing semantic or component tokens first.
2. If a missing value is reusable design language, add it to `@maxa/tokens`.
3. If a value is component-specific styling, prefer a component token in `@maxa/tokens`.
4. If a value is pure behavior or layout mechanics, keep it in `@maxa/ui`.
5. Keep docs examples importing `@maxa/tokens/theme.css` once at the app root.
