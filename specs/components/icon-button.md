# IconButton — Component Spec

## Overview

Thin wrapper around `Button` that renders a single icon with no visible label. Required `aria-label` provides the accessible name.

**Component package:** `@maxa/ui` → `IconButton`
**Pattern:** `forwardRef` → forwards everything to `<Button iconOnly />` underneath.
**Source:** `packages/ui/src/components/icon-button/icon-button.tsx`

---

## Anatomy

A square button containing one icon. No text. No label slot — the visual is the icon, the semantic name is `aria-label`.

```
┌────┐
│ ☆  │
└────┘
```

Width = height (square). Dimensions come from `--button-icon-only-{sm,md,lg}-size`.

---

## Sizes

| Size | Square dimension |
|------|------------------|
| `xs` | 24px |
| `sm` | 28px |
| `md` (default) | 36px |
| `lg` | 48px |

`xs` is passed through to Button but Button typically clamps to `sm` icon-only size — verify in implementation.

---

## Variants

Inherits all Button variants: `primary`, `secondary`, `outline`, `ghost`, `link`, `success`, `danger`.

**Most common in practice:**
- `ghost` — toolbar buttons, table-row actions, inline editor controls
- `outline` — toolbar with stronger affordance
- `primary` — single CTA represented as an icon (rare; usually only when space is constrained)

---

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `icon` | `ReactNode` | — | **Required.** The icon to render |
| `aria-label` | `string` | — | **Required.** Accessible name (e.g. "Close", "Edit", "Settings") |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | |

Plus all `ButtonProps` except `iconOnly`, `iconLeading`, `iconTrailing`, `children` (these are managed internally).

---

## Accessibility

- `aria-label` is mandatory at the TypeScript level. Without it, the button is announced by screen readers as just "button" with no purpose.
- Tooltips are recommended for non-obvious icons (Search icon = ok without tooltip; Pencil icon for "Edit" should have a tooltip).
- Focus ring follows the underlying Button variant.

---

## Composition examples

```tsx
<IconButton
  icon={<XIcon />}
  aria-label="Close dialog"
  variant="ghost"
  size="sm"
/>

<IconButton
  icon={<TrashIcon />}
  aria-label="Delete item"
  variant="danger"
/>
```

---

## DO NOT

- ❌ Omit `aria-label` — required by TS, refuse to merge code that bypasses it.
- ❌ Use IconButton when the action benefits from a text label. If "Save" or "Add user" can fit, use Button with `iconLeading`.
- ❌ Pack two icons into IconButton. It's strictly one icon.
- ❌ Reach past it into Button for `iconOnly` directly — use IconButton so the `aria-label` requirement isn't bypassed.

---

## Relationship to Button

IconButton is **not** a separate variant of Button. It is a constraint-wrapper that:
1. Forces `iconOnly={true}` underneath.
2. Reroutes the `icon` prop to `iconLeading`.
3. Promotes `aria-label` to a required prop at the type level.

If you find yourself reaching for `<Button iconOnly icon={...} aria-label="..." />`, switch to `<IconButton icon={...} aria-label="..." />`. They produce the same DOM; IconButton just guards the contract.
