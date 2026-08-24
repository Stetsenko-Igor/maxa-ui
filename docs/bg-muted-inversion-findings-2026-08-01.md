# Findings: neutral ladder, zebra naming, bg-muted inversion (RESOLVED)

_Date: 2026-08-01_

**Status: RESOLVED — approved 2026-08-06; bg-page calibrated 2026-08-24.**
Light `bg-muted` maps to Neutral/100 `#F4F3F3`; dark remains Neutral/975
`#161616`. Light `bg-page` now maps to Neutral/75 `#F5F6FA`, matching the live
product Designer background. Neutral/25 remains in the primitive palette
without a semantic consumer. Table zebra remains a separate role:
`Table/row-bg-striped` → `bg-neutral-surface` → Neutral/50.

> **2026-08-04 update:** the cell-level zebra recommendation below is superseded.
> Striping is implemented at the row level as `Table/row-bg-striped`, with cells
> transparent. See `docs/table-token-architecture-plan-2026-08-01.md`.
>
> **2026-08-06 resolution:** Light `bg-muted` moved to Neutral/100. The dark-mode
> mapping and the separate zebra-row role were intentionally preserved.
>
> **2026-08-24 product calibration:** Light `bg-page` moved from Neutral/50
> `#FAFAFA` to the new Neutral/75 `#F5F6FA`, matching the live product Designer
> style while preserving Neutral/50 for striped rows and neutral surface tints.

---

## Context — why this came up

Started from "where is `bg-neutral-surface` used?" (answer: 0 consumers) and a
Figma table zebra-striping question. That surfaced two deeper issues in the
background-color system:

1. Two overlapping bg ladders (elevation vs neutral scale) with colliding values.
2. `bg-muted` is inverted between light and dark relative to `bg-page`.

---

## Original zebra proposal (superseded by the row-level decision)

**Superseded token name: `--table-cell-bg-striped` → `var(--color-bg-neutral-surface)`**

- Odd rows stay `--table-cell-bg` = `bg-surface` (white light / neutral-900 dark).
- Even rows = new `--table-cell-bg-striped` = `bg-neutral-surface` (neutral-50 light / neutral-925~950 dark).
- Cell-level, applied via `.maxa-table__row[data-striped] > .maxa-table__cell` (same pattern as existing row states in `packages/ui/src/components/table/table.css`).
- Cross-theme safe: striped is darker than default row in BOTH themes.
- At the time, this would have given `bg-neutral-surface` its first consumer.

---

## The two orthogonal ladders (conceptual model)

- **Elevation family** (`page → surface → float → muted → overlay`): "how raised
  is this container." Structural height. `bg-surface` = raised content.
- **Neutral scale** (`neutral-surface → subtle → muted → on-muted → strong`):
  pure neutral gray steps, NO elevation meaning. For decorative fills inside
  components (zebra, skeleton, badge bg, slider track, header tint).

Selection rule (now documented in `specs/foundations/color.md`):

- Element has elevation meaning (card, input, modal, floating) → elevation family.
- Need a neutral decorative fill/tint with no height meaning → neutral scale.

Already used correctly in code: `table-header-bg` = `bg-neutral-muted`;
skeleton/badge/slider = `bg-neutral-subtle`.

---

## The bg-muted inversion (resolved)

Recessed metaphor from `specs/foundations/color.md:63` calls muted
"Recessed/sunken zones". Before the resolution, its Light value was lighter
than the page, which inverted that relationship:

| Token | Light before | Light current | Dark |
|---|---|---|---|
| `bg-page` | Neutral/50 `#FAFAFA` | Neutral/75 `#F5F6FA` | Neutral/950 `#1A1919` |
| `bg-muted` | Neutral/25 `#FCFCFC` | Neutral/100 `#F4F3F3` | Neutral/975 `#161616` |
| `bg-surface` | White `#FFFFFF` | White `#FFFFFF` | Neutral/900 `#2A2A2B` |

- Dark: `muted < page < surface` — unchanged; the metaphor holds.
- Light: `muted(100) < page(75) < surface` — the inversion is removed.

Only the Light alias changed. The Dark alias was already correct and remains
Neutral/975.

### White-ceiling constraint (why light can't mirror dark)

White is the absolute brightness ceiling. In dark, elevation grows upward freely
(`975 → 950 → 900 → 800`). In light it's crushed against white: `surface` and
`float` are BOTH `#FFFFFF` — indistinguishable by color, separated only by
border/shadow. So light elevation is inherently low-contrast; the themes are NOT
brightness-mirrors and cannot be.

---

## Neutral primitive scale — `packages/tokens/src/primitives.css`

- Neutral/25 `#FCFCFC` — retained as a primitive; no semantic consumer yet.
- Neutral/50 `#FAFAFA` — neutral surface tint and striped/zebra table rows.
- Neutral/75 `#F5F6FA` — live-product page canvas.
- Neutral/100 `#F4F3F3` — recessed `bg-muted`, disabled and subtle fills.
- Neutral/200 `#EDEDED`.
- Neutral/300 `#E4E4E4`.

Dark end: Neutral/700 `#6B6B6D`, 800 `#444445`, 900 `#2A2A2B`,
925 `#232324`, 950 `#1A1919`, 975 `#161616`, and 1000 `#0D0D0D`.

---

## Options considered

1. **neutral-200 `#EDEDED`** — recessed reads clearly, clean monotone ladder
   (`muted < page < surface`). Larger ripple (all 10 consumers visibly grayer).
   Value collides with `bg-neutral-muted`.
2. **neutral-100 `#F4F3F3` — chosen.** It creates a visible but restrained
   recessed step without making component fills heavy. Sharing the primitive
   with `bg-disabled`, `bg-neutral-subtle`, `action-neutral-subtle`, and
   `border-tertiary` is acceptable because those semantic roles remain distinct.
3. **No value change — doc only** — accept the white ceiling; reword muted in
   color.md from "recessed/sunken" to "subtle fill offset from page." Zero ripple.

With muted/subdued on Neutral/100 and striped on Neutral/50, table rows have a
clean ladder: default white → striped Neutral/50 → subdued Neutral/100.

---

## Ripple — Light consumers darkened; Dark unaffected

Representative consumers include `--input-readonly-bg` (component-input.css:35), `--calendar-range-footer-bg`
(component-calendar.css:47), `--date-picker-range-footer-bg`
(component-date-picker.css:13), `--empty-icon-bg` (component-empty.css:14),
`--progress-bg` (component-progress.css:4), `--segmented-control-bg`
(component-segmented-control.css:4), `--table-row-bg-subdued`
(component-table.css:35), `--table-thumbnail-bg` (component-table.css:72),
plus direct use in `packages/ui/src/components/toast/toast.css:113,143`.

These are fill/recessed contexts, so the darker Light value is conceptually
correct. The Foundation Colors and Table previews were reviewed after the change.

---

## Documentation drift found along the way

- `bg-page` and `bg-muted` values were corrected in `specs/foundations/color.md`.
- Neutral status-background names and values were aligned with `semantic.css`.
- The elevation-vs-neutral-scale selection rule is now documented.

---

## Resolution checklist

1. Light `bg-muted` selected: Neutral/100.
2. CSS, Figma variables, Figma export JSON, generated bundle, and reference docs updated.
3. Zebra remains row-level via `Table/row-bg-striped`; cells remain transparent.
4. Token audit, unit tests, typecheck, docs build, and visual preview completed.
