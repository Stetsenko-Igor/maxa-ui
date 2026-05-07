# MAXA Package Architecture

This is the lightweight package contract for the design system. It exists to keep component work moving without re-litigating ownership between packages.

## Package Roles

### `@maxa/tokens`

The source of truth for design decisions.

Owns:

- CSS custom properties for primitives, semantic tokens, dimensions, typography, and component tokens
- JS/TS token constants for typed non-CSS usage
- Figma import/export token artifacts
- Theme bundles such as `@maxa/tokens/theme.css`

Rule: new visual decisions start here unless they are truly component behavior.

### `@maxa/ui`

The React component package.

Owns:

- Component APIs and behavior
- Accessibility states and interaction behavior
- Component CSS that reads `@maxa/tokens` variables
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

## Practical Component Rule

When creating or changing a component:

1. Use existing semantic or component tokens first.
2. If a missing value is reusable design language, add it to `@maxa/tokens`.
3. If a value is component-specific styling, prefer a component token in `@maxa/tokens`.
4. If a value is pure behavior or layout mechanics, keep it in `@maxa/ui`.
5. Keep docs examples importing `@maxa/tokens/theme.css` once at the app root.

