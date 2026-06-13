# Icons

Status: implemented

The MAXA icon system is **Phosphor Icons**, shipped through the `@maxa/icons` package.

## Library and weight

- **Library:** [Phosphor Icons](https://phosphoricons.com) via `@phosphor-icons/react`.
- **Weight:** **Regular** — the system standard and Phosphor's default. Do not mix weights without a product reason.
- **Source of truth:** `@maxa/icons` re-exports all Phosphor icons. Import from `@maxa/icons`, never from `@phosphor-icons/react` directly, so the dependency stays owned by the design system.

```tsx
import { CaretDown, X, Check, MagnifyingGlass } from "@maxa/icons"
```

## Sizing

- Icon size is **16 / 20 / 24px**, set by the consuming component via CSS on a wrapper or via `width`/`height` props.
- The common pattern is an icon that fills a CSS-sized box: pass `width="100%" height="100%"` and size the wrapper with a token.
- **Never** use Phosphor's `size` prop for fixed values — size comes from component tokens (e.g. `--input-icon-md-size`), not hardcoded numbers in JSX.

## Color

- Icons render at **`currentColor`** — they inherit the text color of their context. Never set `fill`/`stroke`/`color` directly on a system icon.
- Color the icon by setting `color` on the parent element via a token.

## Accessibility

- Decorative icons (the common case): `aria-hidden="true"` and `focusable={false}`. The accessible name lives on the parent interactive element via `aria-label`.
- A standalone icon button must have an `aria-label` on the `<button>`, not the icon.

## Social / brand icons

- Provider brand marks (Google, Apple, Facebook, …) live in the `social` namespace of `@maxa/icons` and keep **hardcoded brand colors** — they are brand assets, not system icons, so they intentionally ignore `currentColor`.

```tsx
import { social } from "@maxa/icons"
<social.GoogleIcon width={20} height={20} />
```

- Namespaced to avoid collisions with Phosphor's own `*Icon` aliases and `*Logo` glyphs.

## Custom icons

- MAXA-specific shapes with no Phosphor equivalent (e.g. the DataTable bidirectional sort caret) stay as small inline SVGs inside their component, or graduate into `@maxa/icons` if reused. Keep these rare — prefer a Phosphor icon whenever one fits.

## Migration note

The component library originally used hand-drawn inline SVGs. These were migrated to Phosphor Regular for consistency. Two shapes remain inline because Phosphor has no equivalent: the DataTable bidirectional sort caret (`SortBothIcon`) and the DropdownMenu radio dot.
