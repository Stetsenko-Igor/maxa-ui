# Separator — Component Spec

## Overview

The MAXA Separator is a thin rule that visually or semantically divides groups of content. It wraps Radix `@radix-ui/react-separator` and uses component-level tokens that alias semantic tokens. All styling decisions are expressed through tokens — never hardcoded values.

**Component package:** `@maxa/ui` → `Separator`
**Token source:** `packages/tokens/src/component-separator.css`
**Pattern:** `forwardRef + Radix Separator.Root`

---

## Anatomy

```
[ ────────────────────── ]   horizontal (full width, 1px tall)

[ │ ]                        vertical (full height, 1px wide)
```

A Separator has no children. It renders a single `<div>` via Radix with the appropriate ARIA role.

---

## Props

### `orientation`
- **Type:** `'horizontal' | 'vertical'`
- **Default:** `'horizontal'`
- Horizontal stretches to `100%` width with `--separator-size` height.
- Vertical stretches to `100%` height with `--separator-size` width. Place inside a flex row; the rule uses `align-self: stretch` so it fills the row height.

### `decorative`
- **Type:** `boolean`
- **Default:** `true`
- When `true`, Radix renders `role="none"` — the rule is purely visual and ignored by assistive technology.
- When `false`, Radix renders `role="separator"` with `aria-orientation`, exposing the divide as a meaningful structural boundary (e.g. between menu groups).

All other native `div` attributes (`className`, `id`, `style`, `data-*`) are forwarded.

---

## States

The Separator has no interactive states. It is a static presentational element.

---

## Token Reference

```css
--separator-color: var(--color-border-primary);  /* rule color */
--separator-size:  var(--width-1);                /* 1px thickness */
```

Dark mode is inherited automatically — `--color-border-primary` already resolves to the dark border value under `[data-theme="dark"]`.

---

## Code Example (React)

```tsx
import { Separator } from "@maxa/ui"

{/* Horizontal divider between sections */}
<Separator />

{/* Vertical divider inside a toolbar */}
<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
  <span>Edit</span>
  <Separator orientation="vertical" />
  <span>Delete</span>
</div>

{/* Semantic divider in a menu */}
<Separator decorative={false} />
```

---

## What NOT to do

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `background: #D4D4D4` | `background: var(--separator-color)` |
| `height: 1px` | `height: var(--separator-size)` |
| Wrapping content as children | Render as a standalone sibling element |
| `decorative={false}` for purely visual rules | Keep `decorative` (default) for cosmetic dividers |
| Vertical separator without a flex parent | Place inside a flex row so it can stretch |

---

## Accessibility

- Default `decorative` rules are hidden from assistive tech (`role="none"`).
- Set `decorative={false}` only when the divide carries structural meaning; Radix then emits `role="separator"` and `aria-orientation`.
- Verified with `vitest-axe` (no violations).

---

## Source files

- React component: `packages/ui/src/components/separator/separator.tsx`
- Styles: `packages/ui/src/components/separator/separator.css`
- Tokens: `packages/tokens/src/component-separator.css`
- Tests: `packages/ui/src/components/separator/separator.test.tsx`
