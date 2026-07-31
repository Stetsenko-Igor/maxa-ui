---
"@maxa/tokens": patch
---

Sync the Alert feedback palette with the reviewed Figma aliases. Light success, warning, and
error surfaces now use their 100 palette steps, with coordinated border and accent adjustments.
Dark feedback roles use the manually tuned Blue, Green, Orange, Red, and Neutral aliases from
the Foundation file while preserving the existing semantic and component variable IDs.

Add eight `Component-based/Alert/color/*/action` and `action-hover` aliases for Info, Success,
Warning, and Error so Figma Alert buttons can bind to stable component tokens while resolving
theme changes through `Color modes`.
