# Radio — Component Spec

## Overview

Single-choice control within a mutually-exclusive group. One option from a set of two-or-more. Used in forms, settings, plan selectors.

**Component package:** `@maxa/ui` → `Radio`
**Token source:** `packages/tokens/src/component-radio.css`
**Pattern:** `forwardRef + className composition + native `<input type="radio">`` (no Radix wrapper)

---

## Anatomy

```
┌─────────────────────────────────────────┐
│ ( ● )  Label text                       │  ← label row
│        Helper text or error message     │  ← optional content
└─────────────────────────────────────────┘
```

- `control` — `<span class="maxa-radio__control">` wraps a visually-hidden native `<input type="radio">` and a styled `<span class="maxa-radio__circle">`. Native input drives grouping (shared `name`) and keyboard nav.
- `content` — label + helperText, both optional.
- `gap` between control and content: 8px (`--radio-gap`)
- `gap` between label and helper: 4px (`--radio-content-gap`)

---

## Sizes

| Size | Outer | Inner dot | When |
|------|-------|-----------|------|
| `sm` | 16×16px | 6×6px | Compact lists, dense forms |
| `md` (default) | 20×20px | 8×8px | Standard forms, plan selectors |

Border width: `1.5px`. Focus ring: 3px offset 2px.

---

## States

| State | How | Visual |
|-------|-----|--------|
| Default (unchecked) | `checked={false}` or omitted | `bg/surface` fill, `border/primary` outline, no dot |
| Checked | `checked={true}` | `action/primary` border (1.5px), `action/primary` fill + white dot OR (current impl) `bg-checked` fill with white dot |
| Hover | mouse over (not checked/disabled) | `border/secondary` outline |
| Focus | keyboard focus | 3px focus ring (`border/focus`), offset 2px |
| Error | `error={true}` | `border/error` outline; checked + error = `border/error` fill |
| Disabled | `disabled={true}` | `bg/disabled` fill, `border/disabled` |

**Critical:** Radio is mutually exclusive within a `name` group. Checking one auto-unchecks the others via browser default — do not manage this in state unless using controlled mode.

---

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `name` | `string` | — | **Required for grouping.** All radios in the same group share `name` |
| `value` | `string` | — | The value submitted when this radio is selected |
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | — | Uncontrolled initial state |
| `onChange` | native `onChange` | — | Native input change event |
| `size` | `"sm" \| "md"` | `"md"` | |
| `error` | `boolean` | `false` | |
| `disabled` | `boolean` | `false` | |
| `label` | `ReactNode` | — | |
| `helperText` | `string` | — | |
| `id` | `string` | — | |

All native `<input type="radio">` props pass through.

---

## Composition — Radio groups

There is no `RadioGroup` component primitive. Use native HTML:

```tsx
<fieldset>
  <legend>Notification frequency</legend>
  <Radio name="freq" value="daily" label="Daily" defaultChecked />
  <Radio name="freq" value="weekly" label="Weekly" />
  <Radio name="freq" value="never" label="Never" />
</fieldset>
```

Inside a `FormField`:

```tsx
<FormField label="Plan" hint="You can change later.">
  <Radio name="plan" value="free" label="Free" />
  <Radio name="plan" value="pro" label="Pro" />
</FormField>
```

---

## Accessibility

- Native `<input type="radio">` provides arrow-key navigation between siblings sharing the same `name`.
- Wrap a group in `<fieldset>` + `<legend>` for screen-reader grouping (unless `FormField` already provides this).
- `aria-invalid="true"` is set when `error={true}`.

---

## Tokens used

See `specs/tokens-reference.md` → Radio Component Tokens (`--radio-*`).

---

## DO NOT

- ❌ Use a single radio "on/off" — use a Checkbox or Switch.
- ❌ Forget to set `name` on every radio in a group — radios without a shared `name` won't be mutually exclusive.
- ❌ Manage exclusivity in React state if uncontrolled — let the browser handle it via `name`.
- ❌ Use radio for "select one from a list of 5+ items" — use `Select` instead.
