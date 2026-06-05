# Progress

## Purpose

Progress communicates determinate completion for uploads, generation, imports, campaign setup, or multi-step workflows.

## Anatomy

- Meta row: optional label and percent value.
- Track: neutral background.
- Indicator: intent-colored fill.

## Variants

- Size: `sm`, `md`.
- Intent: `brand`, `success`, `warning`, `error`.
- Value visibility: hidden or visible percent.

Use `brand` while work is actively running. Use `success`, `warning`, and `error` only when the state changes the next decision or action.

## Accessibility

Built on Radix Progress. Values are clamped between `0` and `max`, and exposed through progressbar semantics.
