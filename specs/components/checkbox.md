# Checkbox — Component Spec

## Overview

The MAXA Checkbox is a binary or indeterminate selection control. It renders a native `<input type="checkbox">` for accessibility and behavior, with a styled box overlay driven by component-level tokens.

Use Checkbox for selecting one or more options. Use Radio for mutually exclusive choices and Toggle for immediate on/off settings.

**Component package:** `@maxa/ui` → `Checkbox`
**Token source:** `packages/tokens/src/component-checkbox.css`
**Pattern:** `forwardRef` over a native checkbox input + built-in label shell

---

## Anatomy

```text
[ top label ]
[ box ] [ side label ]
        [ description ]
```

- **Control** — native input plus visual box.
- **Top label** — optional label rendered above the row.
- **Side label** — optional label rendered to the right of the checkbox. `children` may be used as shorthand.
- **Description** — optional helper or validation text below the side label. `helperText` is kept as an alias.

Visible labels are wired with `aria-labelledby`. Description is wired with `aria-describedby`.

---

## Size

Checkbox has one public visual size: `md`.

```css
--checkbox-size-md:        20px;
--checkbox-mark-width-md:  10px;
--checkbox-mark-height-md: 8px;
--checkbox-row-gap:        8px;
```

Do not expose `sm` or `lg` size props.

---

## States

| State | Trigger | Token |
|-------|---------|-------|
| Unchecked | default | `--checkbox-bg` + `--checkbox-border` |
| Checked | `checked` / `defaultChecked` | `--checkbox-bg-checked` |
| Indeterminate | `checked="indeterminate"` | `--checkbox-bg-checked` + dash mark |
| Hover unchecked | `:hover` | `--checkbox-border-hover` |
| Hover checked | `:hover` + checked | `--checkbox-bg-checked-hover` |
| Focus | `:focus-visible` | `--checkbox-border-focus` |
| Error | `error` prop | `--checkbox-border-error`; description uses `--checkbox-helper-error` |
| Disabled | `disabled` attr | disabled box and text tokens |

Checkbox matches Figma: checked and indeterminate states use a dark neutral fill (`#2d2d2e`) with a white mark. They are not blue.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean | "indeterminate"` | — | Controlled checked state. |
| `defaultChecked` | `boolean` | `false` | Initial uncontrolled checked state. |
| `onCheckedChange` | `(checked: CheckedState) => void` | — | Called when the value changes. |
| `label` | `ReactNode` | — | Optional top label. |
| `sideLabel` | `ReactNode` | — | Optional right-side label. |
| `children` | `ReactNode` | — | Shorthand for right-side label content. |
| `description` | `ReactNode` | — | Optional helper text below the right-side label. |
| `helperText` | `ReactNode` | — | Alias for `description`. |
| `containerClassName` | `string` | — | Class name for the outer label wrapper. |
| `error` | `boolean` | `false` | Adds error border and `aria-invalid`. |
| `disabled` | `boolean` | `false` | Disables interaction and applies disabled colors. |

No `size` prop is supported.

---

## Code Example

```tsx
import { Checkbox } from "@maxa/ui"

<Checkbox sideLabel="Accept terms" defaultChecked />

<Checkbox
  label="Permissions"
  sideLabel="Accept terms"
  description="Required to continue."
/>

<Checkbox checked="indeterminate" sideLabel="Select all" />
```

---

## Do / Don't

| Don't | Do |
|-------|----|
| `<Checkbox size="sm" />` | Use the single md Checkbox size. |
| Use `label` for the right-side text | Use `sideLabel` or `children`; reserve `label` for the top label. |
| Use a blue checked fill | Use the Figma dark checked fill and white mark. |
| Use opacity for disabled | Use disabled component tokens for box and text colors. |

---

## Files

- Token CSS: `packages/tokens/src/component-checkbox.css`
- React component: `packages/ui/src/components/checkbox/checkbox.tsx`
- Styles: `packages/ui/src/components/checkbox/checkbox.css`
- Tests: `packages/ui/src/components/checkbox/checkbox.test.tsx`
