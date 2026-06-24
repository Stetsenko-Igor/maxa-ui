# Alert — Component Spec

## Overview

The MAXA Alert (callout) is a contextual feedback box that communicates a status, outcome, or important message inline within a layout. It uses component-level tokens with light and dark theme values: light mode follows semantic intent surfaces, while dark mode mirrors the Figma reusable Alert surface with muted dark panels, restrained intent borders, a left accent strip, and calm intent icons.

**Component package:** `@maxa/ui` → `Alert`
**Token source:** `packages/tokens/src/component-alert.css`
**Pattern:** `forwardRef + cva` (pure semantic HTML, no Radix)

---

## Anatomy

```
[ icon ] [ title?        ] [ dismiss? ]
         [ body content  ]
```

- **Icon** — leading, decorative (`aria-hidden`). Defaults to an intent-specific inline SVG; overridable via `icon`.
- **Title** — optional bold heading line.
- **Body** — the message (`children`).
- **Dismiss** — optional `×` button (`aria-label="Dismiss"`), fires `onDismiss`.

---

## Intents

Each intent maps to theme-aware component token values.

### `info`
- **Use when:** Neutral, helpful context or tips.
- **Light:** `bg/info-subtle`, `border/info-subtle`, `text/primary`, `fg/info`
- **Dark:** `#003877`, `#0059C2`, `#F4F3F3`, `#54A3F6`
- **Role:** `status` (polite)

### `success`
- **Use when:** Confirming a positive, completed action.
- **Light:** `bg/success-subtle`, `border/success-subtle`, `text/primary`, `fg/positive`
- **Dark:** `#044329`, `#006D0F`, `#F4F3F3`, `#2BB47D`
- **Role:** `status` (polite)

### `warning`
- **Use when:** Cautioning the user about a potential issue or required attention.
- **Light:** `bg/warning-subtle`, `border/warning-subtle`, `text/primary`, `fg/warning`
- **Dark:** `#521D00`, `#B44E00`, `#F4F3F3`, `#E16D00`
- **Role:** `alert` (assertive)

### `danger`
- **Use when:** Reporting an error, failure, or destructive consequence.
- **Light:** `bg/error-subtle`, `border/danger-subtle`, `text/primary`, `fg/negative`
- **Dark:** `#7B0000`, `#D71913`, `#F4F3F3`, `#FF755E`
- **Role:** `alert` (assertive)

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `intent` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Visual + semantic intent. |
| `title` | `ReactNode` | — | Optional bold heading line. |
| `icon` | `ReactNode` | intent default | Leading icon, rendered `aria-hidden`. |
| `action` | `ReactNode` | — | Custom action slot. Prefer `<AlertAction>` inside. |
| `dismissible` | `boolean` | `false` | Shows a `×` dismiss button. Use with `onDismiss`. |
| `onDismiss` | `() => void` | — | Called when the dismiss button is activated. |
| `orientation` | `'horizontal' \| 'vertical'` | derived | Force inline (`horizontal`) or stacked (`vertical`) layout. Without it, layout is auto-derived from `title` presence. |
| `role` | `'alert' \| 'status'` | derived | Override the auto-derived ARIA role. |

All other native `div` attributes are forwarded.

---

## Accessibility

- **Role mapping:** `danger`/`warning` → `role="alert"` + `aria-live="assertive"` (interrupts the user). `info`/`success` → `role="status"` + `aria-live="polite"` (announced when idle).
- **Override:** pass `role` to force `alert` or `status` when the default does not match the message urgency.
- Icons are decorative (`aria-hidden`) — never rely on color/icon alone; the body text carries the meaning.
- The dismiss button has `aria-label="Dismiss"` and `stopsPropagation` so it does not trigger parent click handlers.
- Verified with `vitest-axe` (no violations).

---

## Token Reference

### Shared layout
```css
--alert-radius:       var(--radius-md);   /* 8px */
--alert-padding-x:    var(--spacing-xl);  /* 16px */
--alert-padding-y:    var(--spacing-xl);  /* 16px */
--alert-gap:          var(--spacing-md);  /* 8px */
--alert-icon-size:    var(--spacing-5);   /* 20px */
--alert-font-size:    var(--text-md);     /* 14px */
--alert-font-weight:  var(--font-weight-medium);
--alert-title-size:   var(--text-lg);     /* 16px */
--alert-title-weight: var(--font-weight-bold);
```

### Info intent (example, light mode)
```css
--alert-info-bg:     var(--color-bg-info-subtle);
--alert-info-border: var(--color-border-info-subtle);
--alert-info-text:   var(--color-text-primary);
--alert-info-title:  var(--color-text-primary);
--alert-info-icon:   var(--color-fg-info);
```

Dark mode overrides these component tokens under `[data-theme="dark"]` with the Figma dark Alert values.

---

## Code Example (React + CVA)

```tsx
import { Alert } from "@maxa/ui"

<Alert intent="info" title="Heads up">
  Your trial ends in 3 days.
</Alert>

<Alert intent="success" title="Saved" dismissible onDismiss={() => {}}>
  Your changes have been saved.
</Alert>

<Alert intent="danger">
  We couldn't process your payment. Please try again.
</Alert>
```

---

## What NOT to do

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `background: #EFF6FF` | `background: var(--alert-info-bg)` |
| `border-radius: 8px` | `border-radius: var(--alert-radius)` |
| Color/icon as the only signal | Always include descriptive body text |
| `role="alert"` on a passive `info` message | Let role derive from intent, or pass `role="status"` |
| Dismiss button without `aria-label` | `aria-label="Dismiss"` is built in |

---

## Source files

- React component: `packages/ui/src/components/alert/alert.tsx`
- Styles: `packages/ui/src/components/alert/alert.css`
- Tokens: `packages/tokens/src/component-alert.css`
- Tests: `packages/ui/src/components/alert/alert.test.tsx`
