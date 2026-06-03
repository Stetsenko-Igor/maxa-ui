# Checkbox — Component Spec

## Overview

The MAXA Checkbox is a binary (or tri-state) form control. It renders a visually hidden native `<input type="checkbox">` for accessibility and behavior, with a styled box overlay driven entirely by component-level tokens that alias semantic tokens. All styling decisions are expressed through tokens — never hardcoded values.

**Component package:** `@maxa/ui` → `Checkbox`
**Token source:** `packages/tokens/src/component-checkbox.css`
**Pattern:** `forwardRef` over a native `<input type="checkbox">` + BEM-style class composition. No `cva`, no Radix wrapper — the native input drives accessibility; sizing/state are plain modifier classes (`maxa-checkbox--<modifier>`).

Supports controlled (`checked` + `onCheckedChange`) and uncontrolled (`defaultChecked`) usage. `checked` accepts `boolean | "indeterminate"`.

---

## Anatomy

```
<label class="maxa-checkbox">
  [ control: hidden input + styled box ] [ content: label + helper? ]
</label>
```

- **Control** (`.maxa-checkbox__control`): wraps the visually hidden native input (`.maxa-checkbox__input`, `opacity: 0`, fills the control box) and the styled `.maxa-checkbox__box`. The box renders the check / dash mark via `::after`.
- **Content** (`.maxa-checkbox__content`): rendered only when `label` or `helperText` is provided. Contains `.maxa-checkbox__label` and optional `.maxa-checkbox__helper`.
- The whole component is a `<label>`; clicking the label text toggles the input. If `id` is supplied it is also applied to `<label htmlFor>` for explicit association.
- The styled box is `aria-hidden` and `pointer-events: none` — all interaction lives on the real input.
- Gap between control and content: `--checkbox-gap` (8px). Gap between label and helper: `--checkbox-content-gap` (4px).

---

## Variants

Checkbox has no color/variant axis like Button. Its only configuration axis is `size` (`sm` / `md`); appearance is determined by **state** (checked, indeterminate, error, disabled). There is a single visual treatment: an outlined box that fills with `action/primary` when checked.

---

## Sizes

| Size | Box | Border width | Check mark (w×h) | Indeterminate dash (w×h) | Radius |
|------|-----|--------------|------------------|--------------------------|--------|
| `sm` | 16×16px (`--checkbox-size-sm`) | 1.5px | 8×6px | 8×2px | `radius-xs` (4px) |
| `md` (default) | 20×20px (`--checkbox-size-md`) | 1.5px | 10×8px | 10×2px | `radius-xs` (4px) |

- Label/helper typography does not scale with `size` — both sizes use `--text-sm` for label and helper.
- Focus ring is 3px wide, offset 2px, for both sizes.

---

## States

| State | How to apply | Behavior / token pattern |
|-------|-------------|---------------------------|
| Unchecked | default | box `--checkbox-bg` + `--checkbox-border` |
| Hover | `:hover` (when not disabled) | border → `--checkbox-border-hover` |
| Focus | input `:focus-visible` | outline `--checkbox-focus-ring-width` (3px) solid `--checkbox-border-focus`, offset `--checkbox-focus-ring-offset` (2px) on the box |
| Checked | `checked={true}` / `defaultChecked` | box bg `--checkbox-bg-checked`, border `--checkbox-border-checked`; check mark via masked SVG colored `--checkbox-mark-color` |
| Indeterminate | `checked="indeterminate"` | input gets `aria-checked="mixed"`; box uses checked bg/border; `::after` renders a dash (`--checkbox-dash-height`, `--checkbox-dash-radius`) |
| Error | `error` prop | adds `maxa-checkbox--error`, sets `aria-invalid="true"`; unchecked border → `--checkbox-border-error`; checked/indeterminate bg → `--checkbox-bg-error-checked`; helper → `--checkbox-helper-error` |
| Disabled | `disabled` prop | adds `maxa-checkbox--disabled`, native input disabled; whole element `opacity: 0.5`, `cursor: default` |

**Indeterminate handling:** the native input cannot represent "indeterminate" via the `checked` attribute, so the component sets `inputRef.indeterminate = true` imperatively (in `useEffect`) and exposes `aria-checked="mixed"` to assistive tech. When `checked === "indeterminate"`, the DOM `checked` attribute is forced to `false`. CSS targets the indeterminate visual via `[aria-checked="mixed"]`.

**Checked color rule:** a checked checkbox uses `action/primary` (blue), NOT brand teal. Checkboxes follow MAXA's "primary = blue" rule.

**Error + checked:** the error border color overrides the action color for both the checked and indeterminate fills.

**Disabled rule:** apply `opacity: 0.5` to the whole `.maxa-checkbox`. Do not individually re-color box/label for disabled. (`--checkbox-bg-disabled`, `--checkbox-border-disabled`, `--checkbox-mark-disabled` are defined for future use; current CSS relies on opacity.)

---

## Token Reference

### Sizes & geometry
```css
--checkbox-size-sm:           16px;
--checkbox-size-md:           20px;
--checkbox-radius:            var(--radius-xs);
--checkbox-border-width:      1.5px;
--checkbox-focus-ring-width:  3px;
--checkbox-focus-ring-offset: 2px;
--checkbox-mark-width-md:     10px;
--checkbox-mark-height-md:    8px;
--checkbox-mark-width-sm:     8px;
--checkbox-mark-height-sm:    6px;
--checkbox-dash-height:       2px;
--checkbox-dash-radius:       1px;
```

### Colors — default state
```css
--checkbox-bg:           var(--color-bg-surface);
--checkbox-border:       var(--color-border-primary);
--checkbox-border-hover: var(--color-border-secondary);
--checkbox-border-focus: var(--color-border-focus);
--checkbox-mark-color:   var(--color-text-inverse);
```

### Colors — checked / indeterminate
```css
--checkbox-bg-checked:     var(--color-action-primary);
--checkbox-border-checked: var(--color-action-primary);
```

### Colors — error
```css
--checkbox-border-error:     var(--color-border-error);
--checkbox-bg-error-checked: var(--color-border-error);
```

### Colors — disabled (reserved; current CSS uses opacity 0.5)
```css
--checkbox-bg-disabled:     var(--color-bg-disabled);
--checkbox-border-disabled: var(--color-border-tertiary);
--checkbox-mark-disabled:   var(--color-text-disabled);
```

### Label / helper / spacing
```css
--checkbox-label-text:   var(--color-text-primary);
--checkbox-helper-text:  var(--color-text-tertiary);
--checkbox-helper-error: var(--color-text-error);
--checkbox-gap:          8px;
--checkbox-content-gap:  4px;
```

---

## Code Example (React + CVA)

> Note: Checkbox does not use `cva`. Sizing/state are applied via `maxa-checkbox--<modifier>` classes inside the component. Consumers configure it through props.

```tsx
// Uncontrolled
<Checkbox label="Accept terms" defaultChecked />

// Controlled tri-state
<Checkbox
  checked={state}                 // true | false | "indeterminate"
  onCheckedChange={setState}
  label="Select all"
/>

// Error + helper
<Checkbox
  error
  label="Required"
  helperText="You must agree to continue"
/>

// Small, with explicit id for label association
<Checkbox id="tos" size="sm" label="Terms of service" />
```

**Props summary:** `checked?: boolean | "indeterminate"`, `defaultChecked?: boolean`, `onCheckedChange?: (checked) => void`, `size?: "sm" | "md"` (default `md`), `error?: boolean`, `disabled?: boolean`, `label?: ReactNode`, `helperText?: string`, `id?: string`. All native `<input>` props pass through.

---

## What NOT to do

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `background: #0265DC` for checked | `var(--checkbox-bg-checked)` |
| `border-radius: 4px` | `var(--checkbox-radius)` |
| Styling a custom `<div role="checkbox">` with no hidden input | Keep the native `<input type="checkbox">` for a11y |
| Passing `checked={undefined}` and expecting indeterminate | Pass `checked="indeterminate"` |
| Custom disabled colors | Use `opacity: 0.5` on `.maxa-checkbox` |
| Relying on the `:indeterminate` pseudo-class | Style via `[aria-checked="mixed"]` (the component sets it) |
| Overriding checked color with brand teal | Checked = `action/primary` (blue) |
| Using a checkbox to fire an immediate action | Checkboxes select; a Button commits |

---

## Figma component structure

```
Forms/
└── Checkbox  — size (sm/md) × state (unchecked, checked, indeterminate, error, disabled)
               props: label?, helper?
```

The check mark and indeterminate dash are vector marks inside the box, recolored by `--checkbox-mark-color`.

---

## Source files

- React component: `packages/ui/src/components/checkbox/checkbox.tsx`
- Styles: `packages/ui/src/components/checkbox/checkbox.css`
- Component tokens: `packages/tokens/src/component-checkbox.css`
- Tests: `packages/ui/src/components/checkbox/checkbox.test.tsx`
