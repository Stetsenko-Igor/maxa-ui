# Badge, Tag, and Pill Architecture

Status: superseded handoff  
Source reference: Direct Mail Audience Figma file, Badge node `6020:18341`  
Related components: Badge, Tag, FilterChip/Pill, DecorativeLabel

> **Badge is now implemented.** The canonical Badge spec is `specs/components/badge.md`.
> The canonical Tag spec is `specs/components/tag.md`.
> The current accepted Badge/Tag plan is `.knowledge/Badge and Tag Component Plan.md`.
> Older guidance in this file that gives Tag an `intent` prop is superseded.
> Decision: the Figma reference colors here come from a foreign design system
> (`nonSemantic-*` variables) and were **intentionally not adopted** — Badge uses
> MAXA's existing semantic palette. The `--color-intent-*` token shape proposed
> below was **not** used; instead a single `--color-bg-{intent}-muted` tier was
> added over existing primitives.

## Context

The current system has local documentation badges, but not a proper Badge component. These local docs badges should not be treated as the design system Badge. Searching for "Badge" should eventually find the real component only.

The reviewed Figma reference separates a useful model:

- `intent`: Neutral, Informative, Positive, Negative, Warning
- `emphasis`: Low, Medium, High
- `appearance`: Grey, Blue, Green, Red, Orange, Raspberry, Magenta, Purple, Grape, Violet, Cyan, Teal, Aquamarine, Emerald, Outline
- optional leading/trailing icon
- optional label

The important takeaway is that `neutral` is valid, but it should be owned by Badge/Tag/Pill intent usage, not exist as a vague global background token with unclear application.

## Component Boundaries

### Badge

Badges are compact status or metadata markers. They are not user-editable controls and must not be removable.

Recommended props:

```ts
type BadgeIntent = "neutral" | "info" | "success" | "warning" | "error"
type BadgeEmphasis = "low" | "medium" | "high"
type BadgeSize = "sm" | "md" | "lg"

type BadgeProps = {
  intent?: BadgeIntent
  emphasis?: BadgeEmphasis
  size?: BadgeSize
  icon?: React.ReactNode
  trailingIcon?: React.ReactNode
  children?: React.ReactNode
}
```

Recommended examples:

```tsx
<Badge intent="neutral" emphasis="low">Low</Badge>
<Badge intent="neutral" emphasis="medium">Medium</Badge>
<Badge intent="neutral" emphasis="high">High</Badge>
<Badge intent="success" emphasis="low">Active</Badge>
```

### Tag

Tags represent applied labels, categories, or selected values. They may be removable. Tag intentionally has no semantic `intent`; use `appearance` for color buckets and `Badge` for status.

Recommended props:

```ts
type TagAppearance =
  | "grey" | "blue" | "green" | "red" | "orange"
  | "raspberry" | "magenta" | "purple" | "grape" | "violet"
  | "cyan" | "teal" | "aquamarine" | "emerald"
type TagEmphasis = "low" | "medium" | "high"
type TagSize = "sm" | "md" | "lg"

type TagProps = {
  appearance?: TagAppearance
  emphasis?: TagEmphasis
  size?: TagSize
  removable?: boolean
  onRemove?: () => void
  icon?: React.ReactNode
  children: React.ReactNode
}
```

Recommended examples:

```tsx
<Tag appearance="grey">Segment</Tag>
<Tag appearance="blue" removable onRemove={handleRemove}>Audience</Tag>
<Tag appearance="violet" emphasis="high">VIP client</Tag>
```

### FilterChip / Pill

Pills or filter chips are interactive controls. They represent selected filters, toggles, or compact options.

Recommended props:

```ts
type FilterChipProps = {
  selected?: boolean
  removable?: boolean
  disabled?: boolean
  onPressedChange?: (selected: boolean) => void
  onRemove?: () => void
  children: React.ReactNode
}
```

Use FilterChip/Pill for filtering and selection. Do not overload Tag with toggle behavior unless the interaction is truly tag editing.

### DecorativeLabel

The gradient labels from the Figma `Additional` section should not be part of the core Tag component. They are campaign/marketing visual labels.

Recommended names:

- `DecorativeLabel`
- `MarketingLabel`
- `AudienceLabel`

Keep these experimental or product-specific until they have repeated usage.

## Color Token Strategy

Do not blindly promote existing `bg-neutral-*` tokens to Figma. They were already present in CSS/specs, but their usage was unclear. Reframe the neutral colors around badge/tag/pill intent.

Preferred semantic shape:

```css
--color-intent-neutral-bg-low
--color-intent-neutral-bg-medium
--color-intent-neutral-bg-high
--color-intent-neutral-fg
--color-intent-neutral-fg-inverse
```

Repeat the same structure for:

- `info`
- `success`
- `warning`
- `error`

The Figma reference uses these light-mode values:

| Intent | Low bg | Medium bg | High bg | Text |
|---|---:|---:|---:|---:|
| neutral | `#EAEDF0` | `#DEE3E7` | `#555F6D` | `#272E35` |
| info | `#E5EEFF` | `#D7E4FF` | `#3062D4` | `#113997` |
| success | `#D8F8E7` | `#C6F1DA` | `#1D7C4D` | `#0E4E30` |
| warning | `#FFE8D1` | `#FCDEC0` | `#F59638` | `#7A4510` |
| error | `#FEE6E6` | `#FCD9D9` | `#C53434` | `#6F2020` |

High emphasis generally uses white or inverted text:

```css
--color-intent-neutral-fg-inverse: #FFFFFF;
```

## Component Tokens

Badge should consume component tokens rather than hardcoding semantic intent tokens directly:

```css
--badge-bg
--badge-fg
--badge-icon
--badge-border
--badge-height
--badge-radius
--badge-gap
--badge-padding-x
```

Variant mapping example:

```css
[data-intent="neutral"][data-emphasis="low"] {
  --badge-bg: var(--color-intent-neutral-bg-low);
  --badge-fg: var(--color-intent-neutral-fg);
  --badge-icon: var(--color-intent-neutral-fg);
}

[data-intent="neutral"][data-emphasis="high"] {
  --badge-bg: var(--color-intent-neutral-bg-high);
  --badge-fg: var(--color-intent-neutral-fg-inverse);
  --badge-icon: var(--color-intent-neutral-fg-inverse);
}
```

Tag should have its own component tokens:

```css
--tag-bg
--tag-fg
--tag-icon
--tag-remove-fg
--tag-border
--tag-height
--tag-radius
--tag-gap
--tag-padding-x
```

Removable Tag behavior:

- `removable=false`: no remove icon
- `removable=true`: trailing remove icon button appears
- remove button must be keyboard accessible
- remove icon should have an accessible label such as `Remove {tag label}`

## Recommended Implementation Order

1. Create a real Badge spec and component.
2. Add intent tokens for Badge, starting with neutral/info/success/warning/error.
3. Create real Tag component with `removable`.
4. Create FilterChip/Pill separately for interactive selection.
5. Move current docs-only badges away from "Badge" terminology.
6. Keep gradient labels out of core. Revisit as `DecorativeLabel` only after product usage is confirmed.

## Decisions To Confirm

- Whether to use `info/success/error/warning` or `informative/positive/negative/warning` in public component props.
- Whether `pending` and `update` are true intents or product-specific appearances.
- Large size is accepted now. Badge and Tag both use `sm | md | lg`.
- Whether the expanded decorative palette should become `accent/*` tokens or stay component-local.

## Current Recommendation

Keep `neutral`, but make it intentional:

- yes: `Badge intent="neutral"`
- no: `Tag intent="neutral"`; Tag uses `appearance`, not `intent`
- yes: `FilterChip` neutral selected/unselected states
- no: vague global `bg-neutral-*` tokens without component ownership
