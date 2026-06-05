# Spinner

## Purpose

Spinner communicates an indeterminate loading state for compact surfaces such as buttons, toolbar actions, panels, and inline fetch states.

## Anatomy

- Root: circular animated status indicator.
- Label: accessible name supplied through `label`; visually hidden by default because the component is purely graphical.

## Variants

- Size: `sm`, `md`, `lg`.
- Appearance: `white`, `primary`, `greyscale`, `inverted`.
- Mode: semantic status by default, decorative when loading copy already exists nearby.

## Accessibility

- Use `role="status"` with an accessible label for standalone loading.
- Use `decorative` when the parent already exposes loading state or text.
- Motion slows under `prefers-reduced-motion`.
