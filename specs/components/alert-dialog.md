# Alert Dialog

## Purpose

Alert Dialog confirms irreversible, destructive, or high-risk actions that require explicit user attention.

## Anatomy

Built from Dialog primitives with `role="alertdialog"`.

- Trigger
- Content
- Title and description
- Body copy
- Footer with cancel and confirm actions

## Variants

Shares Dialog content sizes: `sm`, `md`, `lg`.

## Layout Contract

Alert Dialog inherits the Direct Mail modal layout from Dialog:

- 500px default content width for destructive confirmations.
- 24px header/body horizontal padding.
- 14px/20px body text for the confirmation message.
- 12px/14px semibold footer actions.
- Secondary cancel and destructive confirm actions must have matching button height and typography.

## Accessibility

Use clear, specific language. Always provide a cancel path and reserve destructive actions for real destructive decisions.
