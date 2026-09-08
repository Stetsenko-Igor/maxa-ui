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

## Namespaced delivery for new clients

The additive namespaced distribution separates reusable recipes from the complete MAXA profile:

| Entry                                     | Responsibility                                                                                                                            |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `@maxa/tokens/namespaced/core.css`        | Non-brand primitive palettes and reusable component aliases; incomplete without a theme.                                                  |
| `@maxa/tokens/namespaced/themes/maxa.css` | MAXA decisions: brand teal, semantic mappings including blue primary actions, foundations, and component literals/direct palette choices. |
| `@maxa/tokens/namespaced/theme.css`       | Imports both files to reconstruct the complete MAXA appearance.                                                                           |

```tsx
import "@maxa/tokens/namespaced/theme.css"
import { Button } from "@maxa/ui/namespaced"
```

For HTML/ERB, import `@maxa/ui/namespaced/styles.css` after the token theme. Use `data-maxa-theme="dark"` on `<html>`; host `data-theme` does not select this token mode. Owned variables use `--maxa-` followed by the logical name, for example `--maxa-color-action-primary` and `--maxa-button-primary-bg`. The prefix identifies the library, not a client brand. Generated React inline helpers, local CSS variables, and animation names use the matching namespace; vendor Radix variables remain intact. No generic variable aliases are injected.

A client theme imports `namespaced/core.css` plus a complete reviewed theme instead of the MAXA profile. To start with MAXA defaults and adjust selected roles, import `namespaced/theme.css` followed by root-level overrides. Primary-action colors can be changed independently of the teal brand scale: review primary, hover, active, foreground, and focus recipes in both modes rather than aliasing every action to brand. A full rebrand also reviews typography, dimensions, motion, shadows, and component decisions. No actual Concept3D theme or scaffold is included.

Do not load legacy and namespaced UI styles together: component classes are shared. Whole-document themes remain the contract; nested scopes are unsupported. Fonts are loaded explicitly by the host. Namespacing avoids owned generic token collisions, not arbitrary global CSS rules. Source token names, values, Figma identities, and legacy exports remain unchanged.

## Legacy native CSS and custom themes

Tailwind is not required. `theme.css` is standard CSS and includes all foundation and component tokens plus the MAXA brand scale. It does not include a global reset or load fonts; those are explicit host responsibilities.

For a custom whole-app theme, use the complete foundation bundle without the MAXA brand scale:

```css
@import "@maxa/tokens/core.css";
@import "./client-theme.css";
```

`core.css` includes primitives, semantics, dimensions, typography, shadows, motion, and every component-token stylesheet. It excludes only `themes/maxa.css`; it is not a brand-free design system. The default primary action remains blue and the default typography remains MAXA typography until explicitly overridden.

In `client-theme.css`, declare the complete brand scale on `:root`: `--color-brand-50`, `--color-brand-100`, `--color-brand-200`, `--color-brand-300`, `--color-brand-400`, `--color-brand-500`, `--color-brand-600`, `--color-brand-700`, `--color-brand-800`, `--color-brand-900`, and `--color-brand-950`. Supply approved client values for all eleven tokens. Replacing that teal scale only changes brand roles; a full rebrand also requires reviewing semantic action colors (including hover/active and dark states), fonts, and dimensions. Define needed overrides on `:root` and `:root[data-theme="dark"]` after the core import, and load the selected fonts separately.

The supported boundary is the document root and a whole-app theme. Nested theme scopes and portals crossing those scopes are not supported. Generic variable names such as `--color-*`, `--text-*`, and `--radius-*` can collide with host styles or Tailwind themes. New clients should use the resolved `--maxa-*` namespaced contract above. Legacy names remain compatible; no Tailwind adapter is supplied.

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
