---
"@maxa/ui": patch
"@maxa/tokens": patch
---

Expand touch targets of small interactive elements to meet WCAG 2.2 AA (24px floor) with zero visual change. Tag remove, MultiSelect chip remove, Toggle, Checkbox, and Radio gain an invisible hit area of at least 24px (`--spacing-6`); Slider thumb and the DatePicker calendar trigger take the full 44px via the new `--touch-target-size` dimension token, exposed through `--slider-thumb-hit-area` and `--date-picker-icon-hit-area` component tokens. Verified by element-from-point hit probing at 375px.
