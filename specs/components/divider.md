# Divider — Component Spec

## Overview

The MAXA Divider is a thin rule that visually or semantically divides groups of content. It wraps Radix `@radix-ui/react-separator` and uses component-level tokens that alias semantic tokens. All styling decisions are expressed through tokens — never hardcoded values.

**Divider is the canonical MAXA primitive for dividing content.** `Separator` exists only as a Radix/shadcn compatibility alias built on the same primitive with identical tokens (`--separator-*` reference `--divider-*`). The two must stay visually identical. Use `Divider` in MAXA product code; reach for `Separator` only when matching shadcn/Radix naming in external integrations.

**Component package:** `@maxa/ui` → `Divider`
**Token source:** `packages/tokens/src/component-divider.css`
**Pattern:** `forwardRef + Radix Separator.Root`

---

## Anatomy

```
[ ────────────────────── ]   horizontal (full width, 1px tall)

[ │ ]                        vertical (full height, 1px wide)
```

A Divider has no children. It renders a single `<div>` via Radix with the appropriate ARIA role.

---

## Props

### `orientation`
- **Type:** `'horizontal' | 'vertical'`
- **Default:** `'horizontal'`
- Horizontal stretches to `100%` width with `--divider-size` height.
- Vertical stretches to `100%` height with `--divider-size` width. Place inside a flex row; the rule uses `align-self: stretch` so it fills the row height.

### `decorative`
- **Type:** `boolean`
- **Default:** `true`
- When `true`, Radix renders `role="none"` — the rule is purely visual and ignored by assistive technology.
- When `false`, Radix renders `role="separator"` with `aria-orientation`, exposing the divide as a meaningful structural boundary (e.g. between menu groups).

All other native `div` attributes (`className`, `id`, `style`, `data-*`) are forwarded.

---

## States

The Divider has no interactive states. It is a static presentational element.

---

## Token Reference

```css
--divider-color: var(--color-border-primary);  /* rule color */
--divider-size:  var(--width-1);                /* 1px thickness */
```

Dark mode is inherited automatically — `--color-border-primary` already resolves to the dark border value under `[data-theme="dark"]`.

The `Separator` alias inherits these values:

```css
--separator-color: var(--divider-color);
--separator-size:  var(--divider-size);
```

---

## Code Example (React)

```tsx
import { Divider } from "@maxa/ui"

{/* Horizontal divider between sections */}
<Divider />

{/* Vertical divider inside a toolbar */}
<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
  <span>Edit</span>
  <Divider orientation="vertical" />
  <span>Delete</span>
</div>

{/* Semantic divider in a menu */}
<Divider decorative={false} />
```

---

## What NOT to do

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `background: #D4D4D4` | `background: var(--divider-color)` |
| `height: 1px` | `height: var(--divider-size)` |
| Wrapping content as children | Render as a standalone sibling element |
| `decorative={false}` for purely visual rules | Keep `decorative` (default) for cosmetic dividers |
| Vertical divider without a flex parent | Place inside a flex row so it can stretch |
| Introducing a second visual rule style for `Separator` | Keep `Separator` token-aligned with `Divider` |

---

## Accessibility

- Default `decorative` rules are hidden from assistive tech (`role="none"`).
- Set `decorative={false}` only when the divide carries structural meaning; Radix then emits `role="separator"` and `aria-orientation`.
- Verified with `vitest-axe` (no violations).

---

## Source files

- React component: `packages/ui/src/components/divider/divider.tsx`
- Styles: `packages/ui/src/components/divider/divider.css`
- Tokens: `packages/tokens/src/component-divider.css`
- Tests: `packages/ui/src/components/divider/divider.test.tsx`
- Compatibility alias: `packages/ui/src/components/separator/` + `specs/components/separator.md`
