# Alert — Component Spec

## Overview

The MAXA Alert (callout) is a contextual feedback box that communicates a status, outcome, or important message inline within a layout. Its stable `Component-based/Alert` tokens alias reusable `feedback`, `background`, `border`, `foreground`, and `text` roles in `Color modes`. Component names exist only in `Component-based`.

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
- **Tokens:** `bg/info-subtle`, `border/info-subtle`, `text/primary`, `fg/info`
- **Role:** `status` (polite)

### `success`
- **Use when:** Confirming a successful, completed action.
- **Tokens:** `bg/success-subtle`, `border/success-subtle`, `text/primary`, `fg/success`
- **Role:** `status` (polite)

### `warning`
- **Use when:** Cautioning the user about a potential issue or required attention.
- **Tokens:** `bg/warning-subtle`, `border/warning-subtle`, `text/primary`, `fg/warning`
- **Role:** `alert` (assertive)

### `error`
- **Use when:** Reporting an error, failure, or destructive consequence.
- **Tokens:** `bg/error-subtle`, `border/error-subtle`, `text/primary`, `fg/error`
- **Role:** `alert` (assertive)

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `intent` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Visual + semantic intent. |
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

- **Role mapping:** `error`/`warning` → `role="alert"` + `aria-live="assertive"` (interrupts the user). `info`/`success` → `role="status"` + `aria-live="polite"` (announced when idle).
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
--alert-info-bg:     var(--color-feedback-info-bg);
--alert-info-border: var(--color-feedback-info-border);
--alert-info-text:   var(--color-feedback-text);
--alert-info-title:  var(--color-feedback-text);
--alert-info-icon:   var(--color-feedback-info-accent);
```

The Light values intentionally preserve the published MAXA UI appearance, including intent-colored borders. Dark mode resolves through the approved bespoke dark palette in `Color modes`.

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

<Alert intent="error">
  We couldn't process your payment. Please try again.
</Alert>
```

---

## What NOT to do

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `background: #E0F2FF` | `background: var(--alert-info-bg)` |
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
