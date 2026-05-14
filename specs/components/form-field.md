# FormField — Component Spec

## Overview

Wrapper that composes a form control (Input, Select, Checkbox, Radio, etc.) with its label, hint, error, and optional footer/info-icon. Owns the visual rhythm between control and metadata.

**Component package:** `@maxa/ui` → `FormField`
**Token source:** uses semantic + input-component tokens; no FormField-specific tokens beyond the wrapper.
**Pattern:** plain function component (no `forwardRef` — wrapper doesn't need ref) + className composition

---

## Anatomy

```
┌─────────────────────────────────────────────────┐
│ Label *  (i)                                    │  ← label row (optional)
│ ┌─────────────────────────────────────────────┐ │
│ │  control (Input / Select / Checkbox / etc.) │ │  ← children
│ └─────────────────────────────────────────────┘ │
│ Hint or error message                  footerEnd│  ← footer row (optional)
└─────────────────────────────────────────────────┘
```

Three rows, top to bottom:

1. **Label row** — `<label>` + optional required-mark `*` + optional info icon.
   - Renders only if `label` is set.
2. **Control row** — whatever you pass as `children`.
3. **Footer row** — hint or error text, optional `footerEnd` (e.g. character counter, "Forgot password?" link).
   - Renders only if `hint`, `error`, or `footerEnd` is set.

---

## Sizes

| Size | Notes |
|------|-------|
| `sm` | Compact label gap; for dense forms |
| `md` (default) | Standard form layout |
| `lg` | Generous spacing; landing-page forms, marketing |

Size propagates the visual rhythm of label/hint/control spacing. The contained control's size is independent — pass `size` to the control separately.

---

## Status

| Status | How | Visual |
|--------|-----|--------|
| `default` | omitted | Normal label, tertiary hint |
| `success` | `status="success"` | Hint colored `text/success` |
| `error` | `error="..."` (string) | Hint replaced with error text, colored `text/error`. Overrides `status` |

**Critical:** Passing the `error` prop (non-empty string) ALWAYS forces error styling regardless of `status`. The `error` string replaces the `hint` in the footer row.

---

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `children` | `ReactNode` | — | **Required.** The form control to wrap |
| `label` | `string` | — | Label text. Renders `<label htmlFor={htmlFor}>` |
| `htmlFor` | `string` | — | Associates label with the control's `id` |
| `required` | `boolean` | `false` | Renders `*` mark next to label |
| `infoIcon` | `ReactNode` | — | Icon (e.g. info circle) next to label, aria-hidden |
| `hint` | `string` | — | Helper text under the control |
| `hintId` | `string` | — | `id` for hint — pair with control's `aria-describedby` |
| `error` | `string` | — | Error message. Forces error status, replaces hint |
| `footerEnd` | `ReactNode` | — | Right-aligned element in footer row (counter, link) |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | |
| `status` | `"default" \| "success" \| "error"` | `"default"` | Overridden by `error` |
| `className` | `string` | — | Pass-through for layout overrides |

---

## Composition examples

### With Input

```tsx
<FormField
  label="Email"
  htmlFor="email"
  hint="We'll never share your email."
  required
>
  <Input id="email" type="email" aria-describedby="email-hint" />
</FormField>
```

### With error

```tsx
<FormField
  label="Password"
  htmlFor="pwd"
  error="Must be at least 12 characters."
>
  <Input id="pwd" type="password" />
</FormField>
```

### With character counter

```tsx
<FormField
  label="Bio"
  htmlFor="bio"
  footerEnd={<span>{value.length} / 280</span>}
>
  <Input id="bio" as="textarea" />
</FormField>
```

### With Checkbox / Radio group

Pass `htmlFor=""` (no specific control to associate) — the label becomes a group label:

```tsx
<FormField label="Notifications">
  <Stack gap="2">
    <Checkbox label="Email me about new features" />
    <Checkbox label="Email me about security" />
  </Stack>
</FormField>
```

---

## Accessibility

- The `label` element uses `htmlFor` to associate with a control `id`. Make sure to pass matching `id` to the control.
- For hints, pass `hintId` to FormField AND `aria-describedby={hintId}` to the control. Then assistive tech reads "label, hint" when the control gets focus.
- Error messages: same pattern — control should set `aria-invalid="true"` and `aria-describedby={hintId}` so the error is announced.
- `required` is a visual mark only — also pass `required` to the underlying control (`<Input required />`) so HTML validation runs.

---

## DO NOT

- ❌ Use FormField to wrap a Button (it's not a form control with a label).
- ❌ Pass both `error` and `hint` expecting both to render — error wins, replaces hint.
- ❌ Nest FormFields. One FormField per control.
- ❌ Skip `htmlFor` + control `id` — without them the label doesn't bind for screen readers / click-to-focus.
- ❌ Use `footerEnd` for primary actions. Put primary actions in the form's submit row, not in the field footer.
