---
"@maxa/tokens": patch
---

Clamp `--toast-viewport-width` so the toast stack never overflows narrow phone screens: `min(360px, calc(100vw - 2 * var(--spacing-5)))`. Found by the mobile QA sweep at 375px (5px left overflow).
