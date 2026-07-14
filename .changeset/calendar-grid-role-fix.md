---
"@maxa/ui": patch
---

Fix invalid ARIA in Calendar and QuarterPicker panels: day/month/year/quarter grids used `role="grid"` without the required `row`/`gridcell` structure (axe `aria-required-children` violation). The flat button layouts now use `role="group"`; every option button already carries a complete accessible label. A proper ARIA grid with 2D keyboard navigation remains a possible future enhancement.
