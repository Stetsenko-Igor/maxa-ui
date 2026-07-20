# Toast — Component Spec

## Overview

Toast is a short-lived notification that appears in a viewport corner, communicates a system event or action result, and auto-dismisses after a configurable duration. Built on Radix `@radix-ui/react-toast`.

**Component package:** `@maxa/ui` → `Toast`, `ToastProvider`, `ToastViewport`, `ToastTitle`, `ToastDescription`, `ToastClose`, `ToastAction`  
**Token source:** `packages/tokens/src/component-toast.css`  
**Pattern:** `forwardRef + Radix Toast.*` (no cva — states handled via Radix data attributes)

---

## Anatomy

```
┌─────────────────────────────────────────────────────┐
│ [intent stripe] │ [icon?] [Title]               [✕] │
│                 │ [Description text]                 │
│                 │ [Action button?]                   │
└─────────────────────────────────────────────────────┘
```

- **Stripe** — 4px left border in intent color (same pattern as Alert)
- **Title** — required, 1 line preferred
- **Description** — optional, secondary supporting text
- **Close** — always present; accessible dismiss button
- **Action** — optional; single CTA (e.g., "Undo", "View")

---

## Props

### `Toast`
- `intent?: "neutral" | "info" | "success" | "warning" | "error"` — default `"neutral"`
- `duration?: number` — ms before auto-dismiss; default from `ToastProvider` (5000)
- `open`, `onOpenChange` — for controlled usage
- All Radix `Toast.Root` props forwarded

### `ToastProvider`
- `swipeDirection?: "up" | "down" | "left" | "right"` — default `"right"`
- `duration?: number` — default duration for all toasts; default `5000`

### `ToastViewport`
- `hotkey?: string[]` — keyboard shortcut to focus viewport; default `["F8"]`

### `ToastAction`
- `altText: string` — **required** by Radix; screen-reader description of the action

---

## Intent Colors

| Intent | Stripe color | Icon color |
|--------|-------------|-----------|
| neutral | `--color-border-primary` | `--color-fg-secondary` |
| info | `--color-border-info-strong` | `--color-fg-info` |
| success | `--color-border-success-strong` | `--color-fg-success` |
| warning | `--color-border-warning-strong` | `--color-fg-warning` |
| error | `--color-border-error-strong` | `--color-fg-error` |

---

## Behavior

- **Auto-dismiss** after `duration` ms. Pauses on hover (Radix built-in).
- **Swipe to dismiss** in configured direction.
- **Stack** — up to 3 toasts stack in the viewport; older toasts are pushed up.
- **Keyboard** — `F8` focuses the toast region; Escape closes the focused toast.
- **Screen readers** — Radix uses `role="region"` on viewport + `aria-label`; each toast is announced live.

---

## Viewport Position

The default viewport is bottom-right. Use CSS to reposition:

```css
.maxa-toast__viewport {
  bottom: var(--spacing-5);
  right: var(--spacing-5);
}
/* Top-center variant */
.maxa-toast__viewport[data-position="top-center"] {
  top: var(--spacing-5);
  bottom: auto;
  left: 50%;
  right: auto;
  transform: translateX(-50%);
}
```

---

## Usage

### Imperative (recommended)

```tsx
// 1. Wrap app in ToastProvider + ToastViewport
export default function App() {
  return (
    <ToastProvider>
      {children}
      <ToastViewport />
    </ToastProvider>
  )
}

// 2. Trigger via useToast()
function SaveButton() {
  const { toast } = useToast()
  return (
    <Button onClick={() => toast({ title: "Saved", intent: "success" })}>
      Save
    </Button>
  )
}
```

### Declarative (controlled)

```tsx
<Toast open={open} onOpenChange={setOpen} intent="info">
  <ToastTitle>Import complete</ToastTitle>
  <ToastDescription>48 designs were imported successfully.</ToastDescription>
  <ToastAction altText="View designs">View</ToastAction>
  <ToastClose />
</Toast>
```

---

## Token Reference

```css
--toast-bg:             var(--color-bg-float);
--toast-border:         var(--color-border-primary);
--toast-radius:         var(--radius-lg);
--toast-shadow:         var(--shadow-lg);
--toast-padding-x:      var(--spacing-4);   /* 16px */
--toast-padding-y:      var(--spacing-3);   /* 12px */
--toast-gap:            var(--spacing-2);   /* 8px */
--toast-width:          360px;
--toast-z:              var(--z-toast);     /* 1700 */
--toast-title-color:    var(--color-text-primary);
--toast-title-size:     var(--text-md);
--toast-desc-color:     var(--color-text-secondary);
--toast-desc-size:      var(--text-sm);
--toast-stripe-width:   var(--width-4);
```

---

## What NOT to do

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| Use Toast for destructive confirmation | Use `AlertDialog` |
| Use Toast for persistent errors | Use inline `Alert` |
| Omit `altText` on `ToastAction` | Always provide; required by Radix |
| Show more than 3 concurrent toasts | Queue extras; Radix stacks up to 3 by default |
| Use Toast for marketing messages | Toast is for system feedback only |

---

## Accessibility

- `ToastViewport` renders with `role="region"` and `aria-label`.
- Each toast is announced live by Radix's internal `aria-live`.
- Action `altText` is used by screen readers.
- Focus management: Tab cycles through toast actions; Escape dismisses.
- Verified with `vitest-axe`.

---

## Source files

- React component: `packages/ui/src/components/toast/toast.tsx`
- Styles: `packages/ui/src/components/toast/toast.css`
- Tokens: `packages/tokens/src/component-toast.css`
- Tests: `packages/ui/src/components/toast/toast.test.tsx`
