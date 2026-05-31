# Tag

Status: planned / partially implemented  
Canonical spec for the MAXA `Tag` component.

## Purpose

Tag is a compact data label for categories, selected values, entity attributes, and editable/removable metadata.

Use Tag for:

- categories: `Luxury`, `Commercial`, `Investment`
- attributes: `Sea view`, `Prague`, `3 bedrooms`
- entity labels: `VIP client`, `Lead`, `Returning`
- selected or removable values

Do not use Tag for system status. Use `Badge` for status, count, quality, or metadata indicators.

## Anatomy

`[ leading icon? ] [ label ] [ remove button? ]` inside a rounded rectangle container.

- Radius: `radius-sm` / `6px`.
- Optional leading icon.
- Optional remove button.
- No generic trailing icon in v1. The trailing position is reserved for removable behavior.

## Props

```ts
type TagAppearance =
  | "grey" | "blue" | "green" | "red" | "orange"
  | "raspberry" | "magenta" | "purple" | "grape" | "violet"
  | "cyan" | "teal" | "aquamarine" | "emerald"

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

- `grey`
- `blue`
- `green`
- `red`
- `orange`
- `raspberry`
- `magenta`
- `purple`
- `grape`
- `violet`
- `cyan`
- `teal`
- `aquamarine`
- `emerald`

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

## Removable

Removable Tag behavior:

- `removable=false`: no remove button.
- `removable=true`: trailing remove button appears.
- `onRemove` fires when the remove button is clicked.
- Remove button must stop event propagation.
- Remove button must be keyboard accessible.
- Remove button must have an accessible label such as `Remove Luxury`.

`asChild` and `removable` are mutually exclusive for v1 because Radix Slot expects one child and removable adds a second interactive child.

## Examples

```tsx
<Tag appearance="violet">VIP client</Tag>
<Tag appearance="teal" emphasis="medium">Prague</Tag>
<Tag appearance="raspberry" emphasis="high" removable onRemove={handleRemove}>
  Luxury
</Tag>
<Tag size="lg" appearance="blue" removable>
  Commercial
</Tag>
```

## Component Tokens

Tag should use its own component-token namespace:

```css
--tag-bg
--tag-text
--tag-icon
--tag-remove-fg
--tag-border
--tag-radius
--tag-size-{sm,md,lg}-{height,padding-x,gap,font,icon,remove}
```

Tag may reference the same appearance palette as Badge, but it must keep separate `--tag-*` tokens because radius, remove behavior, and future editable states are different.

## Do / Don't

- Do use Tag for entity labels, categories, and removable values.
- Do keep labels short.
- Do use `appearance` for category color.
- Don't add `intent`.
- Don't use Tag for status.
- Don't add generic trailing icon in v1.
- Don't merge Tag into Badge.
