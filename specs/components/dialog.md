# Dialog

## Purpose

Dialog presents a modal surface for focused decisions, short forms, and contained workflows.

## Anatomy

- `DialogTrigger`: opens the modal.
- `DialogContent`: modal panel with overlay.
- `DialogHeader`, `DialogTitle`, `DialogDescription`: semantic heading block.
- `DialogBody`: body copy or form region with modal content typography.
- `DialogFooter`: action row.
- `DialogClose`: close control; supports `inline` for footer actions.

## Variants

- Content size: `sm`, `md`, `lg`.
- Controlled or uncontrolled open state.

## Layout Contract

- Default modal width is 500px; large form modal width is 604px.
- Modal radius is 8px with the Direct Mail shadow treatment.
- Overlay uses the Direct Mail blocking overlay color.
- Header uses 24px padding and a bottom divider.
- Body uses 14px regular text with 20px line-height.
- Footer uses 12px/14px semibold button text through the shared Button component classes.
- Footer cancel actions must use `DialogClose inline` with `maxa-button maxa-button--secondary maxa-button--md`.

## Accessibility

Content uses `role="dialog"`, `aria-modal`, and title/description wiring. Trigger text must clearly name the action.
