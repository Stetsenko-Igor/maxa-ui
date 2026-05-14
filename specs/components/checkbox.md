# Checkbox — Component Spec

## Overview

Boolean control with three checked states: `false`, `true`, `"indeterminate"`. Used in forms, list selection, settings, and bulk-action headers (indeterminate state).

**Component package:** `@maxa/ui` → `Checkbox`
**Token source:** `packages/tokens/src/component-checkbox.css`
**Pattern:** `forwardRef + className composition + native `<input type="checkbox">`` (no Radix wrapper — native input drives accessibility)

---

## Anatomy

```
┌─────────────────────────────────────────┐
│ [ ☐ ]  Label text                       │  ← label row
│        Helper text or error message     │  ← optional content
└─────────────────────────────────────────┘
```

- `control` — the visual box. `<span class="maxa-checkbox__control">` wraps a visually-hidden native `<input>` and a styled `<span class="maxa-checkbox__box">`. Native input drives keyboard/screen-reader behavior.
- `content` — label + helperText, both optional. If no label or helper, the wrapper renders control-only.
- `gap` between control and content: 8px (`--checkbox-gap`)
- `gap` between label and helper: 4px (`--checkbox-content-gap`)

---

## Sizes

| Size | Box | Mark | When |
|------|-----|------|------|
| `sm` | 16×16px | 8×6px check / 2px dash | Compact tables, dense lists |
| `md` (default) | 20×20px | 10×8px check / 2px dash | Forms, settings, default everywhere else |

Border width is `1.5px` for both. Focus ring is 3px offset 2px.

---

## States

| State | How to trigger | Visual |
|-------|----------------|--------|
| Default (unchecked) | `checked={false}` or omitted | `bg/surface` fill, `border/primary` |
| Checked | `checked={true}` | `action/primary` fill + border, white mark |
| Indeterminate | `checked="indeterminate"` | `action/primary` fill + border, white horizontal dash |
| Hover | mouse over | `border/secondary` (only when not checked/disabled) |
| Focus | keyboard focus | 3px focus ring (`border/focus`), offset 2px |
| Error | `error={true}` | `border/error`. When also checked: `border/error` fill (not blue) |
| Disabled | `disabled={true}` | `bg/disabled` fill, `border/disabled`, `text/disabled` mark |

**Critical rules:**
- A checked checkbox uses `action/primary` (blue), NOT `bg/brand-solid` (teal). Checkboxes follow MAXA's "primary = blue" rule.
- Error + checked state overrides the action color with the error border color.

---

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `checked` | `boolean \| "indeterminate"` | — | Pass `"indeterminate"` for bulk-action header state |
| `defaultChecked` | `boolean` | — | Uncontrolled initial state |
| `onCheckedChange` | `(checked: CheckedState) => void` | — | Fires on state change |
| `size` | `"sm" \| "md"` | `"md"` | |
| `error` | `boolean` | `false` | Toggles error styling and `aria-invalid` |
| `disabled` | `boolean` | `false` | |
| `label` | `ReactNode` | — | Renders inside `<label>` next to control |
| `helperText` | `string` | — | Sub-label or error message (color follows `error` prop) |
| `id` | `string` | — | Links `<label>` to `<input>` |

All native `<input>` props pass through.

---

## Composition

**Inside a `FormField`:** prefer passing Checkbox without its own `label` prop — let `FormField` own the label/hint composition.

```tsx
<FormField label="Notifications" hint="We will email you only essentials.">
  <Checkbox />
</FormField>
```

**Standalone with inline label:**

```tsx
<Checkbox label="I agree to the terms" />
```

**Group of related options:** use plain `<fieldset>` + `<legend>`. There is no `CheckboxGroup` primitive (multiple values = native pattern).

---

## Accessibility

- Native `<input type="checkbox">` drives all keyboard/screen-reader behavior. Do NOT replace with a `<div role="checkbox">`.
- `aria-checked="mixed"` is set automatically for indeterminate.
- `aria-invalid="true"` is set when `error={true}`.
- Label must associate with the input via `id` (uncontrolled) or by being wrapped in `<label>` (which the component does by default).

---

## Tokens used

See `specs/tokens-reference.md` → Checkbox Component Tokens for the full list (`--checkbox-*`).

---

## DO NOT

- ❌ Use a checkbox to perform an immediate action — that's a Button. Checkboxes select; Submit commits.
- ❌ Build a "switch" by reskinning a checkbox. Switches are a separate component (planned).
- ❌ Use indeterminate state outside of bulk-action contexts (table headers, parent-of-children selection). It's not a "kinda" state.
- ❌ Override the action color in checked state with brand teal. Checked = blue.
