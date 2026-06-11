# Tag

Status: implemented  
Canonical spec for the MAXA `Tag` component.

## Purpose

Tag is a compact, interactive-capable data label for categories, selected values, entity attributes, and editable/removable metadata.

Use Tag for:

- categories: `Luxury`, `Commercial`, `Investment`
- attributes: `Sea view`, `Prague`, `3 bedrooms`
- entity labels: `VIP client`, `Lead`, `Returning`
- selected or removable values
- applied filters when the interaction is label-like, removable, or selectable

Do not use Tag for system status. Use `Badge` for status, count, quality, or metadata indicators.

## Anatomy

`[ leading icon? ] [ label ] [ remove button? ]` inside a rounded rectangle container.

- Radius: `radius-sm` / `6px`.
- Optional leading icon (`.maxa-tag__icon`, colored `--tag-icon`).
- Optional remove button (`.maxa-tag__remove`): a real `<button type="button">` containing an inline X (`<svg>`) that inherits its color from `color: var(--tag-icon)` set on the button — there is no separate remove-color token. At rest the button is dimmed via `--tag-remove-opacity` (0.65); on hover/focus opacity goes to 1 with a subtle `currentColor` background.
- No generic trailing icon in v1. The trailing position is reserved for removable behavior.

## Props

```ts
type TagAppearance =
  | "gray" | "red" | "orange" | "amber" | "yellow" | "lime"
  | "green" | "emerald" | "teal" | "cyan" | "sky"
  | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose"

type TagEmphasis = "low" | "medium" | "high"
type TagSize = "sm" | "md" | "lg"

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  appearance?: TagAppearance
  emphasis?: TagEmphasis
  size?: TagSize
  removable?: boolean
  onRemove?: () => void
  asChild?: boolean
  icon?: React.ReactNode
  children?: React.ReactNode
}
```

## Appearance

`appearance` is a decorative/category color, not semantic status.

Supported appearances:

- `gray`
- `red`
- `orange`
- `amber`
- `yellow`
- `lime`
- `green`
- `emerald`
- `teal`
- `violet`
- `cyan`
- `sky`
- `blue`
- `indigo`
- `purple`
- `fuchsia`
- `pink`
- `rose`

## Emphasis

- `low` - subtle tinted background.
- `medium` - stronger tinted background.
- `high` - solid background.

## Size

Tag must support:

- `sm`
- `md`
- `lg`

## Intent

Tag intentionally has no `intent` prop.

If a label needs `success`, `warning`, `error`, `info`, or `neutral` semantic state, use `Badge`. If a data label only needs a color bucket, use `appearance`.

## Relationship to Pill / FilterChip

`Pill` is not a core MAXA component right now. The pill shape is a visual form, not enough product semantics to justify a separate API.

Use `Tag` for interactive labels, removable selected values, and label-like filters. If a future filtering surface needs toggle-button semantics, grouped selection behavior, or richer state than Tag can honestly own, define that as a product pattern first and only promote it to a core component after repeated usage.

## Removable

Removable Tag behavior:

- `removable=false`: no remove button.
- `removable=true`: trailing remove button appears.
- `onRemove` fires when the remove button is clicked.
- The remove button stops event propagation (`e.stopPropagation()`) so clicking X does not trigger the Tag's own click handler.
- The remove button is keyboard accessible (real `<button>`, `tabIndex={0}`, focus-visible ring `2px var(--color-border-focus)` offset 1px).
- The accessible label is `Remove {children}` when `children` is a string (e.g. `Remove Luxury`); otherwise it falls back to `"Remove"`.

`asChild` and `removable` are mutually exclusive for v1 because Radix Slot expects one child and removable adds a second interactive child.

## Examples

```tsx
<Tag appearance="violet">VIP client</Tag>
<Tag appearance="teal" emphasis="medium">Prague</Tag>
<Tag appearance="rose" emphasis="high" removable onRemove={handleRemove}>
  Luxury
</Tag>
<Tag size="lg" appearance="blue" removable>
  Commercial
</Tag>
```

## Component Tokens

Tag uses its own component-token namespace, defined in `packages/tokens/src/component-tag.css` and remapped per `[data-appearance][data-emphasis]`:

```css
--tag-bg
--tag-text
--tag-icon            /* leading icon AND remove button share this color */
--tag-border
--tag-remove-opacity  /* rest opacity of the remove button (0.65) */
--tag-radius
--tag-font-family
--tag-font-weight
--tag-size-{sm,md,lg}-{height,padding-x,gap,font,icon,remove}
```

> There is no `--tag-remove-fg` token. It was removed — the remove button's X icon uses `color: var(--tag-icon)` directly in `tag.css`, so the remove glyph always matches the leading-icon color (including white on high-emphasis solid variants). Its rest dimming is controlled by `--tag-remove-opacity`.

Appearance/emphasis mapping (18 hues × 3 emphasis):
- low    → bg `--color-bg-{hue}-subtle`, text/icon `--color-text-{hue}`
- medium → bg `--color-bg-{hue}-muted`,  text/icon `--color-text-{hue}`
- high   → bg `--color-bg-{hue}-strong`, text/icon `--color-base-white`

(Default when no `appearance`/`emphasis` props: `gray` / `low`.)

Tag references the same appearance palette as Badge, but keeps separate `--tag-*` tokens because radius (`radius-sm`, not pill), remove behavior, and future editable states differ.

### Sizes
| Size | Height | Padding-x | Gap | Font | Icon | Remove |
|------|--------|-----------|-----|------|------|--------|
| `sm` | 20px | 6px | 4px | 12px | 12px | 12px |
| `md` (default) | 24px | 8px | 4px | 12px | 14px | 14px |
| `lg` | 28px | 10px | 6px | 14px | 16px | 16px |

## Do / Don't

- Do use Tag for entity labels, categories, and removable values.
- Do keep labels short.
- Do use `appearance` for category color.
- Don't add `intent`.
- Don't use Tag for status.
- Don't introduce `Pill` as a synonym for Tag or Badge.
- Don't add generic trailing icon in v1.
- Don't merge Tag into Badge.
