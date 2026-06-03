# Tooltip — Component Spec

## Overview

The MAXA Tooltip is a floating, non-interactive hint shown on hover or keyboard focus of a trigger element. It wraps Radix Tooltip for accessibility and positioning, and renders on an inverse (dark) surface so it reads as an overlay distinct from page content. All styling is expressed through tokens — never hardcoded values.

**Component package:** `@maxa/ui` → `Tooltip`, `TooltipProvider`
**Token source:** `packages/tokens/src/component-tooltip.css`
**Pattern:** `forwardRef + Radix Tooltip (Provider + Root + Trigger + Portal + Content + Arrow)`

---

## Anatomy

```
[ trigger ]
     │ (hover / focus, after delayDuration)
     ▼
┌──────────────────────┐
│ tooltip content      │
└──────────▼───────────┘
         (arrow)
```

- **Trigger** — the focusable element the tooltip describes. Passed as `children`, rendered via Radix `asChild`, so the trigger keeps its own semantics (button, link, etc.).
- **Content** — the floating box. Receives the forwarded `ref`.
- **Arrow** — a small pointer rendered against the trigger side; fill matches the content background.

---

## Composition

`TooltipProvider` must wrap the app (or a subtree) once. It shares a single open delay and a pointer grace period across all tooltips, which prevents flicker when moving between adjacent triggers.

```tsx
// app root
<TooltipProvider>
  <App />
</TooltipProvider>
```

The `Tooltip` convenience component composes the rest internally:

```
Root → Trigger(asChild) → Portal → Content → Arrow
```

---

## Props

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `content` | `ReactNode` | — | Tooltip body. Keep short — not for rich/interactive content. |
| `children` | `ReactNode` | — | The trigger element. Must be a single focusable element. |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Preferred side of the trigger. |
| `align` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment along the side. |
| `delayDuration` | `number` | `200` | Hover delay before opening, in ms. |
| `sideOffset` | `number` | `6` | Gap between trigger and content, in px. |
| `open` / `defaultOpen` / `onOpenChange` | — | — | Forwarded to Radix Root for controlled / uncontrolled use. |

The forwarded `ref` points at the **Content** element. Remaining props spread onto Radix `Content`.

---

## States

| State | How it appears | Token / mechanism |
|-------|---------------|-------------------|
| Closed | Not in the DOM (portaled on open) | `data-state="closed"` exit animation |
| Opening | Fades + scales in | `data-state="delayed-open"`, `--duration-fast` / `--easing-standard` |
| Open | Fully visible overlay | `--tooltip-bg` / `--tooltip-text` |

**Motion:** entrance uses `var(--duration-fast) var(--easing-standard)`. Honors `prefers-reduced-motion: reduce` (animation disabled).

**Layering:** content `z-index` is `var(--z-tooltip)` (1600) — above popovers, modals, and overlays.

---

## Token Reference

```css
--tooltip-bg:          var(--color-bg-inverse);    /* dark surface */
--tooltip-text:        var(--color-text-inverse);  /* white */
--tooltip-radius:      var(--radius-sm);            /* 6px */
--tooltip-max-width:   240px;
--tooltip-padding-x:   var(--spacing-md);           /* 8px */
--tooltip-padding-y:   var(--spacing-xs);           /* 4px */
--tooltip-font-family: var(--font-body);            /* Montserrat */
--tooltip-font-size:   var(--text-sm);              /* 12px */
--tooltip-font-weight: var(--font-weight-medium);
--tooltip-line-height: 16px;
```

The arrow `fill` references `--tooltip-bg` so it always matches the content surface (including dark mode).

---

## Code Example

```tsx
import { Tooltip, TooltipProvider } from "@maxa/ui"

// once, near the app root
<TooltipProvider>
  {/* … */}
</TooltipProvider>

// usage
<Tooltip content="Copy to clipboard">
  <Button aria-label="Copy"><CopyIcon /></Button>
</Tooltip>

<Tooltip content="Aligned to the right edge" side="right" align="start">
  <Button variant="ghost">Hover me</Button>
</Tooltip>
```

---

## Accessibility

- The trigger is wired to the tooltip via Radix; the content carries `role="tooltip"`.
- Opens on hover **and** keyboard focus; closes on blur, `Escape`, or pointer leave.
- Tooltips are not focus targets and must not contain interactive content — use a Popover for that.
- Always give icon-only triggers an `aria-label`; the tooltip text is supplementary, not a replacement for an accessible name.

---

## What NOT to do

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `background: #1A1A1A` | `background: var(--tooltip-bg)` |
| `z-index: 1600` | `z-index: var(--z-tooltip)` |
| Putting buttons/links inside `content` | Use a Popover for interactive overlays |
| Omitting `TooltipProvider` | Mount one `TooltipProvider` near the app root |
| Icon-only trigger with no label | Add `aria-label` to the trigger |

---

## Source files

- React component: `packages/ui/src/components/tooltip/tooltip.tsx`
- Styles: `packages/ui/src/components/tooltip/tooltip.css`
- Tokens: `packages/tokens/src/component-tooltip.css`
- Tests: `packages/ui/src/components/tooltip/tooltip.test.tsx`
