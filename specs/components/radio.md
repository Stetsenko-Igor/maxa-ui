# Radio — Component Spec

## Overview

The MAXA Radio is a single-choice form control: one option from a mutually exclusive group sharing a `name`. It renders a visually hidden native `<input type="radio">` for accessibility and grouping, with a styled circle overlay driven entirely by component-level tokens that alias semantic tokens. All styling decisions are expressed through tokens — never hardcoded values.

**Component package:** `@maxa/ui` → `Radio`
**Token source:** `packages/tokens/src/component-radio.css`
**Pattern:** `forwardRef` over a native `<input type="radio">` + BEM-style class composition. No `cva`, no Radix wrapper — the native input drives grouping and keyboard navigation; sizing/state are plain modifier classes (`maxa-radio--<modifier>`).

---

## Anatomy

```
<label class="maxa-radio">
  [ control: hidden input + styled circle ] [ content: label + helper? ]
</label>
```

- **Control** (`.maxa-radio__control`): wraps the visually hidden native input (`.maxa-radio__input`, `opacity: 0`, fills the control box) and the styled `.maxa-radio__circle`. The selected dot is rendered via `::after`.
- **Content** (`.maxa-radio__content`): rendered only when `label` or `helperText` is provided. Contains `.maxa-radio__label` and optional `.maxa-radio__helper`.
- The whole component is a `<label>`; clicking the label text selects the input. If `id` is supplied it is also applied to `<label htmlFor>` for explicit association.
- The styled circle is `aria-hidden` and `pointer-events: none` — all interaction lives on the real input.
- Gap between control and content: `--radio-gap` (8px). Gap between label and helper: `--radio-content-gap` (4px).

---

## Variants

Radio has no color/variant axis like Button. Its only configuration axis is `size` (`sm` / `md`); appearance is determined by **state** (checked, error, disabled). There is a single visual treatment: an outlined circle that fills with `action/primary` and shows an inverse dot when selected.

---

## Sizes

| Size | Outer circle | Border width | Inner dot | Radius |
|------|--------------|--------------|-----------|--------|
| `sm` | 16×16px (`--radio-size-sm`) | 1.5px | 6×6px (`--radio-dot-size-sm`) | 50% (circle) |
| `md` (default) | 20×20px (`--radio-size-md`) | 1.5px | 8×8px (`--radio-dot-size-md`) | 50% (circle) |

- Label/helper typography does not scale with `size` — both sizes use `--text-sm` for label and helper.
- Focus ring is 3px wide, offset 2px, for both sizes.

---

## States

| State | How to apply | Behavior / token pattern |
|-------|-------------|---------------------------|
| Unchecked | default | circle `--radio-bg` + `--radio-border`, no dot |
| Hover | `:hover` (when not disabled) | border → `--radio-border-hover` |
| Focus | input `:focus-visible` | outline `--radio-focus-ring-width` (3px) solid `--radio-border-focus`, offset `--radio-focus-ring-offset` (2px) on the circle |
| Checked | `checked` / `defaultChecked` | circle bg `--radio-bg-checked`, border `--radio-border-checked`; dot via `::after` colored `--radio-dot-color` |
| Error | `error` prop | adds `maxa-radio--error`, sets `aria-invalid="true"`; unchecked border → `--radio-border-error`; checked bg → `--radio-bg-error-checked` (border stays `--radio-border-error`); helper → `--radio-helper-error` |
| Disabled | `disabled` prop | adds `maxa-radio--disabled`, native input disabled; whole element `opacity: 0.5`, `cursor: default` |

**Grouping rule:** Radio is mutually exclusive within a shared `name`. Checking one auto-unchecks siblings via browser default — do not manage exclusivity in React state unless using controlled mode.

**Checked color rule:** a selected radio uses `action/primary` (blue), NOT brand teal — same "primary = blue" rule as Checkbox.

**Disabled rule:** apply `opacity: 0.5` to the whole `.maxa-radio`. Do not individually re-color circle/label for disabled. (`--radio-bg-disabled`, `--radio-border-disabled` are defined for future use; current CSS relies on opacity.)

---

## Token Reference

### Sizes & geometry
```css
--radio-size-sm:           16px;
--radio-size-md:           20px;
--radio-dot-size-sm:       6px;
--radio-dot-size-md:       8px;
--radio-border-width:      1.5px;
--radio-focus-ring-width:  3px;
--radio-focus-ring-offset: 2px;
```

### Colors — default state
```css
--radio-bg:           var(--color-bg-surface);
--radio-border:       var(--color-border-primary);
--radio-border-hover: var(--color-border-secondary);
--radio-border-focus: var(--color-border-focus);
```

### Colors — checked
```css
--radio-bg-checked:     var(--color-action-primary);
--radio-border-checked: var(--color-action-primary);
--radio-dot-color:      var(--color-text-inverse);
```

### Colors — error
```css
--radio-border-error:     var(--color-border-error);
--radio-bg-error-checked: var(--color-border-error);
```

### Colors — disabled (reserved; current CSS uses opacity 0.5)
```css
--radio-bg-disabled:     var(--color-bg-disabled);
--radio-border-disabled: var(--color-border-tertiary);
```

### Label / helper / spacing
```css
--radio-label-text:   var(--color-text-primary);
--radio-helper-text:  var(--color-text-tertiary);
--radio-helper-error: var(--color-text-error);
--radio-gap:          8px;
--radio-content-gap:  4px;
```

---

## Code Example (React + CVA)

> Note: Radio does not use `cva`. Sizing/state are applied via `maxa-radio--<modifier>` classes inside the component. Consumers configure it through props. There is no `RadioGroup` primitive — group with native `<fieldset>` + `<legend>` and a shared `name`.

```tsx
<fieldset>
  <legend>Notification frequency</legend>
  <Radio name="freq" value="daily" label="Daily" defaultChecked />
  <Radio name="freq" value="weekly" label="Weekly" />
  <Radio name="freq" value="never" label="Never" helperText="No emails at all" />
</fieldset>

// Error + small
<Radio name="plan" value="pro" size="sm" error label="Pro" />
```

**Props summary:** `name?: string` (required for grouping), `value?: string`, `checked?: boolean`, `defaultChecked?: boolean`, `onChange?` (native), `size?: "sm" | "md"` (default `md`), `error?: boolean`, `disabled?: boolean`, `label?: ReactNode`, `helperText?: string`, `id?: string`. All native `<input type="radio">` props pass through.

---

## What NOT to do

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `background: #0265DC` for checked | `var(--radio-bg-checked)` |
| `border-radius: 16px` | `border-radius: 50%` (circle) |
| Styling a custom `<div role="radio">` with no hidden input | Keep the native `<input type="radio">` for a11y |
| Omitting `name` on radios in a group | Share one `name` so they are mutually exclusive |
| Managing exclusivity in React state when uncontrolled | Let the browser handle it via `name` |
| Custom disabled colors | Use `opacity: 0.5` on `.maxa-radio` |
| Overriding checked color with brand teal | Checked = `action/primary` (blue) |
| A single radio used as on/off | Use Checkbox or Toggle |
| Radio for "select one of 5+ items" | Use `Select` |

---

## Figma component structure

```
Forms/
└── Radio  — size (sm/md) × state (unchecked, checked, error, disabled)
            props: label?, helper?
```

The selected dot is a vector mark inside the circle, recolored by `--radio-dot-color`.

---

## Source files

- React component: `packages/ui/src/components/radio/radio.tsx`
- Styles: `packages/ui/src/components/radio/radio.css`
- Component tokens: `packages/tokens/src/component-radio.css`
