# Switch — Component Spec

## Overview

The MAXA Switch is a binary on/off toggle. It is built on `@radix-ui/react-switch` for accessibility (`role="switch"`, `aria-checked`, keyboard support) and styled entirely through component-level tokens that alias semantic tokens. All styling decisions are expressed through tokens — never hardcoded values.

Use a Switch for an immediate, self-contained state change (a setting that takes effect right away). For options that are submitted as part of a form, prefer a Checkbox.

**Component package:** `@maxa/ui` → `Switch`
**Token source:** `packages/tokens/src/component-switch.css`
**Pattern:** `forwardRef + cva + Radix (Switch.Root + Switch.Thumb)`

---

## Anatomy

```
[ track [ thumb ] ]
```

- **Track** — the pill-shaped background. Color communicates on/off state.
- **Thumb** — the circular knob that slides from left (off) to right (on).
- The Switch has no built-in label. Always pair it with an external `<label>` or pass `aria-label`/`aria-labelledby`.

---

## Variants

The Switch has a single visual style. Its appearance is driven by state (on/off) and the `error` flag rather than by named variants.

### Default (off)
- **Track:** `--switch-track-bg-off` → `action/neutral`
- **Thumb:** `--switch-thumb-bg` → `bg/surface`

### Checked (on)
- **Track:** `--switch-track-bg-on` → `action/brand` (teal)
- **Thumb:** `--switch-thumb-bg` → `bg/surface`
- **DO NOT** use `action/primary` (blue) for the on state — the Switch uses brand teal to read as a distinct toggle affordance.

### Error
- Applied via the `error` prop (or `data-error`).
- Adds an error-colored outline around the track: `--switch-track-border-error` → `border/error`.
- Also sets `aria-invalid="true"` for assistive tech.

---

## Sizes

| Size | Track W × H | Thumb | Travel | Radius |
|------|-------------|-------|--------|--------|
| `sm` | 28 × 16px | 12px | 12px | `--radius-full` |
| `md` | 36 × 20px | 16px | 16px | `--radius-full` |
| `lg` | 44 × 24px | 20px | 20px | `--radius-full` |

Default size is `md`. Thumb inset is a constant `2px` (`--switch-thumb-inset`); travel distance = track width − thumb size − inset.

---

## States

| State | How to apply | Token pattern |
|-------|-------------|---------------|
| Off (default) | unchecked | `--switch-track-bg-off` |
| On | `checked` / `defaultChecked` | `--switch-track-bg-on` |
| Hover (off) | `:hover` | `--switch-track-bg-off-hover` |
| Hover (on) | `:hover` + checked | `--switch-track-bg-on-hover` |
| Focus | `:focus-visible` | `--switch-focus-ring-color` → `border/focus` |
| Error | `error` prop / `data-error` | `--switch-track-border-error` → `border/error` |
| Disabled | `disabled` attr | `opacity: var(--switch-disabled-opacity)` = 50% |

**Disabled rule:** Apply `--switch-disabled-opacity` (50%) to the whole element via `opacity`. Radix sets `disabled` on the underlying button so clicks and keyboard activation are blocked automatically.

**Focus rule:** Focus ring uses `--switch-focus-ring-color` which maps to `--color-border-focus`, rendered with `--switch-focus-ring-width` and `--switch-focus-ring-offset`.

---

## Token Reference

### Track + thumb colors
```css
--switch-track-bg-off:        var(--color-action-neutral);
--switch-track-bg-off-hover:  var(--color-border-secondary);
--switch-track-bg-on:         var(--color-action-brand);
--switch-track-bg-on-hover:   var(--color-action-brand-hover);
--switch-thumb-bg:            var(--color-bg-surface);
```

### Size tokens (md example)
```css
--switch-track-width-md:   36px;
--switch-track-height-md:  20px;
--switch-thumb-size-md:    16px;
--switch-thumb-inset:      2px;
--switch-track-radius:     var(--radius-full);
--switch-thumb-radius:     var(--radius-full);
```

### Focus + error + disabled
```css
--switch-focus-ring-width:    3px;
--switch-focus-ring-offset:   2px;
--switch-focus-ring-color:    var(--color-border-focus);
--switch-track-border-error:  var(--color-border-error);
--switch-error-border-width:  1.5px;
--switch-disabled-opacity:    0.5;
```

---

## Code Example (React + CVA)

```tsx
// Uncontrolled
<Switch aria-label="Enable notifications" defaultChecked />

// Controlled
<Switch
  aria-label="Dark mode"
  checked={enabled}
  onCheckedChange={setEnabled}
/>

// Sizes
<Switch aria-label="Small" size="sm" />
<Switch aria-label="Large" size="lg" />

// Error + disabled
<Switch aria-label="Invalid" error />
<Switch aria-label="Locked" disabled />
```

---

## What NOT to do

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `background: #1A9E8F` | `background: var(--switch-track-bg-on)` |
| `border-radius: 9999px` | `border-radius: var(--switch-track-radius)` |
| Using `action/primary` (blue) for the on state | Use `--switch-track-bg-on` → `action/brand` (teal) |
| Rendering a `<div>` with a click handler | Use the Radix-backed `Switch` for `role="switch"` + keyboard |
| Switch with no accessible name | Provide `aria-label` or `aria-labelledby` |
| Custom disabled colors | Use `--switch-disabled-opacity: 0.5` on the element |
| Switch inside a form for deferred submit | Use a Checkbox for form values; Switch is for immediate state |

---

## Figma component structure

```
Switches/
└── Switch  — size (sm/md/lg) + state (off/on) + error + disabled props
```

The thumb and track are bound to `--switch-*` variables so the single component reflects all sizes and states via variant props.

---

## Source files

- Token CSS: `packages/tokens/src/component-switch.css` (imported by `theme.css`)
- React component: `packages/ui/src/components/switch/switch.tsx`
- Styles: `packages/ui/src/components/switch/switch.css`
- Tests: `packages/ui/src/components/switch/switch.test.tsx`
