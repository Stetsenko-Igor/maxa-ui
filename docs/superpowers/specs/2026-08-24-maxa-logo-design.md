# MaxaLogo Component Design

**Date:** 2026-08-24  
**Status:** Awaiting written-spec review

## Goal

Add the official MAXA wordmark to `@maxa/ui` as the single reusable React component for product and documentation surfaces. Consumers must be able to discover it in the MAXA UI catalog, import it from the package root, and use the same exact vector geometry that appears in the live product.

## Source of Truth

The component uses the official 1518 × 262 wordmark geometry from:

`AI/Client Side Updates and Improvements/prototypes/header-settings-explorations/assets/maxa-wordmark.svg`

The vector matches the supplied white-on-black reference and the wordmark visible in the live dashboard, login, and Designer screenshots. The component renders the wordmark only; the black or white background belongs to the consuming surface.

## Chosen Approach

Render the four official vector paths inline inside a React SVG component.

This approach is preferred over separate `<img>` assets or a CSS mask because it:

- preserves the exact geometry at every size;
- ships with `@maxa/ui` without runtime asset-path configuration;
- supports controlled light and dark appearances from one component;
- allows React refs, standard SVG attributes, and predictable accessibility;
- prevents consumers from substituting text or recreating the wordmark.

## Public API

```tsx
export type MaxaLogoAppearance = "dark" | "light"

export interface MaxaLogoProps extends React.SVGAttributes<SVGSVGElement> {
  appearance?: MaxaLogoAppearance
  decorative?: boolean
}
```

Usage:

```tsx
import { MaxaLogo } from "@maxa/ui"

<MaxaLogo />
<MaxaLogo appearance="light" width={116} />
<MaxaLogo appearance="dark" width={184} />
<MaxaLogo decorative />
```

Behavior:

- `appearance="dark"` is the default and renders the dark wordmark for light surfaces.
- `appearance="light"` renders the white wordmark for dark surfaces.
- The default width is `120`; height remains automatic through the `1518 262` view box.
- Consumers may provide `width`, `height`, `className`, `style`, and other standard SVG attributes.
- The component does not render a link or choose a destination. Navigation remains the consumer's responsibility.

## Visual Contract

- The SVG view box is `0 0 1518 262`.
- The four official path definitions are copied without geometric modification.
- The wordmark preserves its intrinsic aspect ratio.
- The component has a transparent background.
- Light and dark appearances change only the fill color; they do not modify geometry, spacing, or proportions.
- Arbitrary named color variants are not supported. Brand consistency is more important than open-ended recoloring.

## Component Tokens

The UI component reads component-level color tokens rather than hardcoded colors or primitive tokens:

```css
--maxa-logo-color-dark
--maxa-logo-color-light
```

The token source maps the dark wordmark to the approved static MAXA ink value and the light wordmark to white. These colors do not switch with the global Light/Dark theme because each appearance describes the contrast of the mark itself.

## Accessibility

- By default the SVG uses `role="img"` and the accessible name `MAXA`.
- A consumer-supplied `aria-label` overrides the default accessible name.
- `decorative` removes the image role and sets `aria-hidden="true"` for cases where adjacent text or a parent link already provides the accessible name.
- The component must pass the repository's axe-based accessibility test.

## Package and Documentation Integration

Implementation includes:

- `packages/ui/src/components/maxa-logo/` with component, styles, tests, and barrel export;
- root export from `packages/ui/src/index.ts`;
- component-token source and generated token reference updates;
- `specs/components/maxa-logo.md`;
- `/docs/components/maxa-logo` with default, light-on-dark, dark-on-light, sizing, usage, and API examples;
- a `Maxa Logo` entry in the documentation sidebar and component overview catalog;
- replacement of text-based `MAXA` imitations in the toolbar/menu pattern documentation with `MaxaLogo`.

The catalog page and dedicated documentation page are the discovery surfaces. Existing product code is not migrated as part of this repository change.

## Testing and Verification

Tests must be written before implementation and cover:

- root-package export;
- exact view box and official path geometry;
- default dark appearance;
- light appearance;
- standard SVG prop and ref forwarding;
- default accessible name;
- decorative behavior;
- axe accessibility;
- docs typecheck and production build;
- token audit and generated-reference freshness;
- package entrypoint smoke test.

The final verification command is `pnpm verify`.

## Non-Goals

- A separate MAXA symbol or abstract mark component.
- Raster PNG exports.
- User-supplied arbitrary brand colors.
- An interactive or linked logo wrapper.
- Creating or publishing a Figma component through this repository-only implementation.
