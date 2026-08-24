# MaxaLogo Component Design

**Date:** 2026-08-24  
**Status:** Implemented — corrected after visual review

## Goal

Add the official MAXA wordmark to `@maxa/ui` as the single reusable React component for product and documentation surfaces. Consumers must be able to discover it in the MAXA UI catalog, import it from the package root, and use the same exact vector geometry that appears in the live product.

## Source of Truth

The source of truth is the user-approved white-on-black wordmark reference supplied on 2026-08-24. Both `A` letterforms have connected apexes with no triangular cuts at the top. The component renders the white wordmark only; the dark background belongs to the consuming surface.

The prototype asset at `AI/Client Side Updates and Improvements/prototypes/header-settings-explorations/assets/maxa-wordmark.svg` is explicitly rejected. Its `A` letterforms are built from disconnected leg paths and omit the apex caps, so it must not be reused as an official logo source.

## Chosen Approach

Render the four official vector paths inline inside a React SVG component.

This approach is preferred over separate `<img>` assets or a CSS mask because it:

- preserves the exact geometry at every size;
- ships with `@maxa/ui` without runtime asset-path configuration;
- keeps the approved white artwork fixed in every use;
- allows React refs, standard SVG attributes, and predictable accessibility;
- prevents consumers from substituting text or recreating the wordmark.

## Public API

```tsx
export interface MaxaLogoProps extends React.SVGAttributes<SVGSVGElement> {
  decorative?: boolean
}
```

Usage:

```tsx
import { MaxaLogo } from "@maxa/ui"

<MaxaLogo />
<MaxaLogo width={116} />
<MaxaLogo width={184} />
<MaxaLogo decorative />
```

Behavior:

- The wordmark is always white and must be placed on a surface with sufficient dark contrast.
- The default width is `120`; height remains automatic through the `1518 262` view box.
- Consumers may provide `width`, `height`, `className`, `style`, and other standard SVG attributes.
- The component does not render a link or choose a destination. Navigation remains the consumer's responsibility.

## Visual Contract

- The SVG view box is `0 0 1518 262`.
- The four approved path definitions preserve connected apexes on both `A` letterforms.
- The wordmark preserves its intrinsic aspect ratio.
- The component has a transparent background.
- The fill remains white in every context and does not switch with the global theme.
- Dark, theme-adaptive, and arbitrary color variants are not supported.

## Component Tokens

The UI component reads component-level color tokens rather than hardcoded colors or primitive tokens:

```css
--maxa-logo-color
```

The token maps directly to white and does not switch with the global Light/Dark theme.

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
- `/docs/components/maxa-logo` with white-on-dark, sizing, usage, and API examples;
- a `Maxa Logo` entry in the documentation sidebar and component overview catalog;
- replacement of text-based `MAXA` imitations in the toolbar/menu pattern documentation with `MaxaLogo`.

The catalog page and dedicated documentation page are the discovery surfaces. Existing product code is not migrated as part of this repository change.

## Testing and Verification

Tests must be written before implementation and cover:

- root-package export;
- exact view box and official path geometry;
- connected `A` apex geometry without top cuts;
- fixed white artwork with no appearance variant;
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
- Dark or theme-adaptive logo variants.
- User-supplied arbitrary brand colors.
- An interactive or linked logo wrapper.
- Creating or publishing a Figma component through this repository-only implementation.
