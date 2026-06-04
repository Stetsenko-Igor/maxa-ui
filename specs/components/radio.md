# Radio — Component Spec

## Overview

The MAXA Radio is a single-choice form control: one option from a mutually exclusive group sharing a `name`. It renders a native `<input type="radio">` for accessibility and browser grouping, with a styled circle overlay driven by component-level tokens.

Use Radio when one option must be selected from a set. Use Checkbox for independent selections and Toggle for immediate on/off settings.

**Component package:** `@maxa/ui` → `Radio`
**Token source:** `packages/tokens/src/component-radio.css`
**Pattern:** `forwardRef` over a native radio input + built-in label shell

---

## Anatomy

```text
[ top label ]
[ radio ] [ side label ]
          [ description ]
```

- **Control** — native input plus visual circle.
- **Top label** — optional label rendered above the row.
- **Side label** — optional label rendered to the right of the radio. `children` may be used as shorthand.
- **Description** — optional helper or validation text below the side label. `helperText` is kept as an alias.

Visible labels are wired with `aria-labelledby`. Description is wired with `aria-describedby`.

---

## Size

Radio has one public visual size: `md`.

```css
--radio-size-md:     20px;
--radio-dot-size-md: 8px;
--radio-row-gap:     8px;
```

Do not expose `sm` or `lg` size props.

---

## States

| State | Trigger | Token |
|-------|---------|-------|
| Unchecked | default | `--radio-bg` + `--radio-border` |
| Checked | `checked` / `defaultChecked` | `--radio-border-checked` + `--radio-dot-color` |
| Hover unchecked | `:hover` | `--radio-border-hover` |
| Hover checked | `:hover` + checked | `--radio-border-checked-hover` + `--radio-dot-color-hover` |
| Focus | `:focus-visible` | `--radio-border-focus` |
| Error | `error` prop | `--radio-border-error` |
| Disabled | `disabled` attr | disabled border, dot, and text tokens |

Radio matches Figma: selected state is a white/transparent circle with blue border and blue dot. It is not a solid blue fill with a white dot.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Groups radios for mutual exclusion. |
| `value` | `string` | — | Submitted form value. |
| `checked` | `boolean` | — | Controlled checked state. |
| `defaultChecked` | `boolean` | — | Initial uncontrolled checked state. |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | — | Native input change handler. |
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
import { Radio } from "@maxa/ui"

<Radio name="plan" value="free" sideLabel="Free" />
<Radio name="plan" value="pro" sideLabel="Pro" defaultChecked />

<Radio
  name="display"
  value="compact"
  label="Display"
  description="Use a denser layout."
>
  Compact mode
</Radio>
```

---

## Do / Don't

| Don't | Do |
|-------|----|
| `<Radio size="sm" />` | Use the single md Radio size. |
| Use `label` for the right-side text | Use `sideLabel` or `children`; reserve `label` for the top label. |
| Fill the selected radio blue | Use the Figma selected treatment: blue border and blue dot. |
| Manage radio exclusivity manually | Use a shared `name` and let the browser handle grouping. |

---

## Files

- Token CSS: `packages/tokens/src/component-radio.css`
- React component: `packages/ui/src/components/radio/radio.tsx`
- Styles: `packages/ui/src/components/radio/radio.css`
- Tests: `packages/ui/src/components/radio/radio.test.tsx`
