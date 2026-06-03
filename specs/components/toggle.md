# Toggle — Component Spec

## Overview

The MAXA Toggle is a binary on/off control for immediate, self-contained state changes. It is built on `@radix-ui/react-switch` for accessibility (`role="switch"`, `aria-checked`, keyboard support) and styled entirely through component-level tokens.

Use a Toggle for a setting that takes effect right away. For options submitted as part of a form, prefer a Checkbox.

**Component package:** `@maxa/ui` → `Toggle`
**Token source:** `packages/tokens/src/component-toggle.css`
**Pattern:** `forwardRef + Radix (Switch.Root + Switch.Thumb)`

---

## Anatomy

```
[ track ]
  [ thumb ]
```

- **Track** — the clickable control surface.
- **Thumb** — the circular indicator that moves between off and on.
- **Label** — not built in. Pair with an external `<label>` or pass `aria-label` / `aria-labelledby`.

---

## Size

Toggle has one public visual size: `md`.

```css
--toggle-track-width:  36px;
--toggle-track-height: 20px;
--toggle-thumb-size:   16px;
--toggle-thumb-inset:  2px;
```

Do not expose `sm` or `lg` size props.

---

## States

| State | Trigger | Token |
|-------|---------|-------|
| Off | unchecked | `--toggle-track-bg-off` |
| On | `checked` / `defaultChecked` | `--toggle-track-bg-on` |
| Hover (off) | `:hover` | `--toggle-track-bg-off-hover` |
| Hover (on) | `:hover` + checked | `--toggle-track-bg-on-hover` |
| Focus | `:focus-visible` | `--toggle-focus-ring-color` |
| Error | `error` prop / `data-error` | `--toggle-track-border-error` |
| Disabled | `disabled` attr | `--toggle-disabled-opacity` |

Disabled opacity applies to the whole element. Radix sets `disabled` on the underlying button so pointer and keyboard activation are blocked.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Controlled on/off state. |
| `defaultChecked` | `boolean` | `false` | Initial uncontrolled state. |
| `onCheckedChange` | `(checked: boolean) => void` | — | Called when the value changes. |
| `error` | `boolean` | `false` | Adds error outline and `aria-invalid`. |
| `disabled` | `boolean` | `false` | Disables interaction and dims the control. |
| `aria-label` / `aria-labelledby` | `string` | — | Required when no visible label is associated. |

No `size` prop is supported.

---

## Code Example

```tsx
import { Toggle } from "@maxa/ui"

<Toggle aria-label="Enable notifications" defaultChecked />

<label htmlFor="notifications">Email notifications</label>
<Toggle id="notifications" defaultChecked />

<Toggle aria-label="Invalid setting" error />
<Toggle aria-label="Locked setting" disabled />
```

---

## Do / Don't

| Don't | Do |
|-------|----|
| `<Toggle size="sm" />` | Use the single md Toggle size. |
| Rendering a `<div>` with click handlers | Use the Radix-backed `Toggle` for `role="switch"` and keyboard support. |
| Toggle with no accessible name | Provide a visible `<label>`, `aria-label`, or `aria-labelledby`. |
| Toggle inside a form for deferred submit | Use Checkbox for form values; Toggle is for immediate state changes. |

---

## Files

- Token CSS: `packages/tokens/src/component-toggle.css`
- React component: `packages/ui/src/components/toggle/toggle.tsx`
- Styles: `packages/ui/src/components/toggle/toggle.css`
- Tests: `packages/ui/src/components/toggle/toggle.test.tsx`
