---
"@maxa/tokens": minor
"@maxa/ui": patch
---

Foundation Excellence P2 cleanup:

- Removed the legacy border aliases `--color-border-default`, `--color-border-brand-strong`, and `--color-border-error-strong`; consumers should use `--color-border-primary`, `--color-border-brand`, and `--color-border-error`.
- Updated Toast stripe tokens and Figma import JSON to use the canonical border token names.
- Replaced DataTable sort glyph inline SVGs with curated `@maxa/icons` usage.
- Added targeted Slider and Tooltip tests for the previously uncovered branches.
- Added docs pages for Motion, Breakpoints, and Interactive Hierarchy.
