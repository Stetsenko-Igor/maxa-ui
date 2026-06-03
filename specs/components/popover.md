# Popover — Component Spec

The MAXA Popover is a floating, dismissible layer for interactive content that is anchored to a trigger. Use it for compact menus, filters, contextual forms, and rich help content. For non-interactive hover/focus hints, use `Tooltip`.

**Component package:** `@maxa/ui` → `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverClose`, `PopoverAnchor`

**Pattern:** Radix Popover (`Root + Trigger + Portal + Content + Arrow`) with a styled `PopoverContent` wrapper.

## API

```ts
type PopoverSide = "top" | "right" | "bottom" | "left"
type PopoverAlign = "start" | "center" | "end"

interface PopoverContentProps {
  side?: PopoverSide       // default "bottom"
  align?: PopoverAlign     // default "center"
  sideOffset?: number      // default 8
  arrow?: boolean          // default true
}
```

`Popover` is the Radix root and accepts controlled/uncontrolled open props:

- `open`
- `defaultOpen`
- `onOpenChange`

`PopoverTrigger` uses Radix `asChild` when a custom button/control should be the trigger.

## Usage

```tsx
import { Button, Popover, PopoverContent, PopoverTrigger } from "@maxa/ui"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Filters</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom" align="start">
    <div>Popover content</div>
  </PopoverContent>
</Popover>
```

## Visual Contract

- Surface: `--popover-bg` aliases `bg/float`
- Border: `--popover-border` aliases `border/primary`
- Text: `--popover-text` aliases `text/primary`
- Shadow: `--popover-shadow` aliases `shadow-md`
- Radius: `radius-lg`
- Default width: `320px`, max width: viewport-safe `min(320px, calc(100vw - 32px))`
- Z-index: `z-popover`

## Behavior

- Opens from trigger click or controlled state.
- Closes on escape, outside click, or `PopoverClose`.
- Supports focusable and interactive content.
- Does not trap focus; use Dialog for modal workflows.
- Content is portaled by default.

## Accessibility

- Trigger must have an accessible name.
- Use a visible title or `aria-label`/`aria-labelledby` when the popover content needs a name.
- Do not use Popover for critical modal decisions; use Dialog.
- Do not put non-interactive hover help in Popover; use Tooltip.

## Anti-patterns

| Anti-pattern | Use instead |
|--------------|-------------|
| Short hover-only hint | `Tooltip` |
| Modal form or destructive confirmation | Dialog |
| Main navigation menu | Navigation/Menu component |
| Clickable Tooltip content | `Popover` |
