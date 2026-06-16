# @maxa/tokens

Design tokens for the Maxa design system: CSS variables (primitives → semantic → component layers), TypeScript token constants, and Figma import JSON. This package owns all design decisions - color, spacing, radius, typography, shadows, motion, and component token aliases.

## Usage inside this workspace

```jsonc
// package.json
"dependencies": { "@maxa/tokens": "workspace:^" }
```

```css
/* Full bundle - primitives, Maxa theme, semantic, dimensions,
   typography, shadows, motion, and all component token files */
@import "@maxa/tokens/theme.css";
```

```ts
// TypeScript constants (radius, spacing, fontFamily, fontSize, fontWeight, ...)
import { spacing, radius } from "@maxa/tokens"
```

## Usage from GitHub (no npm registry)

Clone the repo, build, then link via `file:`:

```bash
git clone https://github.com/Stetsenko-Igor/maxa-ui.git
cd maxa-ui && pnpm install && pnpm build
# in your project:
pnpm add file:../maxa-ui/packages/tokens
```

## CSS layers and import order

`theme.css` is the complete bundle and the recommended entry point. For a custom brand, import the layers individually in this order, replacing `themes/maxa.css` with your own brand file:

```css
@import "@maxa/tokens/primitives.css";   /* raw values - never reference in components */
@import "@maxa/tokens/themes/maxa.css";  /* brand layer (light + dark overrides) */
@import "@maxa/tokens/semantic.css";     /* --color-text-primary, --color-action-primary, ... */
@import "@maxa/tokens/dimensions.css";   /* spacing and radius scales */
@import "@maxa/tokens/typography.css";   /* Montserrat body, system mono code */
@import "@maxa/tokens/shadows.css";
```

Note: `motion.css` and the per-component token files (`component-*.css`) are bundled inside `theme.css` but are not individually exported - use the full bundle if you need them.

## Dark mode

Set `data-theme="dark"` on `<html>`. All dark-mode overrides live in `[data-theme="dark"]` selectors inside the theme files - components never define their own dark styles.

## Figma workflow

Token JSON for Figma lives in `figma/`. After editing token JSON, regenerate the bundle:

```bash
pnpm figma:bundle
```

Then push to GitHub and import via the MAXA Token Importer Figma plugin. See `figma/README.md`.

## Reference

The master index of every CSS variable name is `specs/tokens-reference.md` at the repo root (auto-generated via `pnpm tokens:reference`).
