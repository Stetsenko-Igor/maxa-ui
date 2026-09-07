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

Packages are not published yet. For tokens alone, clone and build the repository, then pack and install the generated tarball:

```bash
# in the repository checkout
pnpm install
pnpm build
mkdir -p /absolute/path/to/consumer/vendor/maxa
pnpm --filter @maxa/tokens exec pnpm pack --pack-destination /absolute/path/to/consumer/vendor/maxa
# in the consuming project; use the actual generated filename
pnpm add file:vendor/maxa/maxa-tokens-0.1.0.tgz
```

For React components, pack all four MAXA runtime packages and configure local overrides using the root [external consumption recipe](../../README.md#in-an-external-project). Direct source-directory `file:` links are not the verified external route.

## Native CSS and custom themes

Tailwind is not required. `theme.css` is standard CSS and includes all foundation and component tokens plus the MAXA brand scale. It does not include a global reset or load fonts; those are explicit host responsibilities.

For a custom whole-app theme, use the complete foundation bundle without the MAXA brand scale:

```css
@import "@maxa/tokens/core.css";
@import "./client-theme.css";
```

`core.css` includes primitives, semantics, dimensions, typography, shadows, motion, and every component-token stylesheet. It excludes only `themes/maxa.css`; it is not a brand-free design system. The default primary action remains blue and the default typography remains MAXA typography until explicitly overridden.

In `client-theme.css`, declare the complete brand scale on `:root`: `--color-brand-50`, `--color-brand-100`, `--color-brand-200`, `--color-brand-300`, `--color-brand-400`, `--color-brand-500`, `--color-brand-600`, `--color-brand-700`, `--color-brand-800`, `--color-brand-900`, and `--color-brand-950`. Supply approved client values for all eleven tokens. Replacing that teal scale only changes brand roles; a full rebrand also requires reviewing semantic action colors (including hover/active and dark states), fonts, and dimensions. Define needed overrides on `:root` and `:root[data-theme="dark"]` after the core import, and load the selected fonts separately.

The supported boundary is the document root and a whole-app theme. Nested theme scopes and portals crossing those scopes are not supported. Generic variable names such as `--color-*`, `--text-*`, and `--radius-*` can collide with host styles or Tailwind themes. A namespace decision is required before a Concept3D client release; this change preserves existing names and does not provide a Tailwind adapter.

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
