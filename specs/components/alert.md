# Alert — Component Spec

## Overview

The MAXA Alert (callout) is a contextual feedback box that communicates a status, outcome, or important message inline within a layout. It uses component-level tokens that alias the status/intent semantic tokens. All styling decisions are expressed through tokens — never hardcoded values.

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

Each intent maps to the status/intent semantic token family.

### `info`
- **Use when:** Neutral, helpful context or tips.
- **Background:** `--alert-info-bg` → `bg/info-subtle`
- **Border:** `--alert-info-border` → `border/info-strong`
- **Text/icon:** `text/info`, `fg/info` (blue)
- **Role:** `status` (polite)

### `success`
- **Use when:** Confirming a positive, completed action.
- **Background:** `--alert-success-bg` → `bg/success-subtle`
- **Border:** `--alert-success-border` → `border/success-strong`
- **Text/icon:** `text/success`, `fg/positive` (green)
- **Role:** `status` (polite)

### `warning`
- **Use when:** Cautioning the user about a potential issue or required attention.
- **Background:** `--alert-warning-bg` → `bg/warning-subtle`
- **Border:** `--alert-warning-border` → `border/warning-strong`
- **Text/icon:** `text/warning`, `fg/warning` (orange)
- **Role:** `alert` (assertive)

### `danger`
- **Use when:** Reporting an error, failure, or destructive consequence.
- **Background:** `--alert-danger-bg` → `bg/error-subtle`
- **Border:** `--alert-danger-border` → `border/error`
- **Text/icon:** `text/error`, `fg/negative` (red)
- **Role:** `alert` (assertive)

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `intent` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Visual + semantic intent. |
| `title` | `ReactNode` | — | Optional bold heading line. |
| `icon` | `ReactNode` | intent default | Leading icon, rendered `aria-hidden`. |
| `dismissible` | `boolean` | `false` | Shows a `×` dismiss button. Use with `onDismiss`. |
| `onDismiss` | `() => void` | — | Called when the dismiss button is activated. |
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
--alert-padding-x:    var(--spacing-lg);  /* 12px */
--alert-padding-y:    var(--spacing-lg);  /* 12px */
--alert-gap:          var(--spacing-md);  /* 8px */
--alert-icon-size:    16px;
--alert-font-size:    var(--text-sm);     /* 12px */
--alert-title-weight: var(--font-weight-semibold);
```

### Info intent (example)
```css
--alert-info-bg:     var(--color-bg-info-subtle);
--alert-info-border: var(--color-border-info-strong);
--alert-info-text:   var(--color-text-info);
--alert-info-title:  var(--color-text-info);
--alert-info-icon:   var(--color-fg-info);
```

Dark mode is inherited — the referenced semantic tokens already resolve to dark values under `[data-theme="dark"]`.

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
