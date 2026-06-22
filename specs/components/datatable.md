# DataTable — Component Spec

## Overview

DataTable is a higher-level data display component built on top of the `Table` primitive. It adds client-side sorting, optional row selection, optional pagination, loading states, and empty states. Use it when data is known at render time and fits on-page.

The visual model follows the existing Figma table system:

- `Index Header Cell`: empty, heading, sort, numeric, checkbox
- `Index Cell`: checkbox, text, numeric text, thumbnail/preview, badge, link, button, icon button, icon, avatar, input field, loader
- `Table Row`: default, subdued, hover, selected, and combined selected/subdued states

**Component package:** `@maxa/ui` -> `DataTable`
**Token source:** `packages/tokens/src/component-datatable.css`
**Pattern:** `"use client"` function component (generic `DataTable<T>`)

---

## When to use

- Orders lists, admin/account tables, request lists, content grids
- Data fits in memory (client-side sort/filter)
- Structured tabular data with 3–10 columns

## When NOT to use

- Server-side pagination with external data sources → compose `Table` + `Pagination` manually
- Very large datasets (>1000 rows) → server-side rendering
- Non-tabular content → use `DesignCard` grid or list patterns

---

## Props

| Prop                | Type                      | Default                        | Description                                 |
| ------------------- | ------------------------- | ------------------------------ | ------------------------------------------- |
| `columns`           | `ColumnDef<T>[]`          | —                              | Column definitions                          |
| `data`              | `T[]`                     | —                              | Row data array                              |
| `caption`           | `string`                  | —                              | Accessible table caption                    |
| `density`           | `"sm" \| "md" \| "lg"`    | `"md"`                         | Row density                                 |
| `defaultSort`       | `{ key, direction }`      | —                              | Initial sort state                          |
| `selectable`        | `boolean`                 | `false`                        | Adds checkbox column for row selection      |
| `onSelectionChange` | `(ids: string[]) => void` | —                              | Called when selection changes               |
| `rowSubdued`        | `(row, index) => boolean` | —                              | Marks secondary rows with subdued row state |
| `rowId`             | `(row, index) => string`  | index-based                    | Row identity function                       |
| `pageSize`          | `number`                  | —                              | Enables client-side pagination              |
| `loading`           | `boolean`                 | `false`                        | Shows skeleton rows                         |
| `emptyState`        | `ReactNode`               | `<Empty title="No results" />` | Rendered when data is empty                 |

### `ColumnDef<T>`

| Field        | Type                            | Description                                               |
| ------------ | ------------------------------- | --------------------------------------------------------- |
| `key`        | `string`                        | Field key on the row object                               |
| `header`     | `ReactNode`                     | Column header label                                       |
| `align`      | `"left" \| "center" \| "right"` | Column alignment; numeric columns should be right aligned |
| `cell`       | `(row, index) => ReactNode`     | Optional custom cell renderer                             |
| `cellType`   | `TableCellType`                 | Maps content to the table cell semantic variant           |
| `headerType` | `TableHeaderType`               | Overrides derived header semantic variant                 |
| `sortable`   | `boolean`                       | Enables header sort click                                 |
| `width`      | `string`                        | CSS column width (e.g. `"120px"`)                         |

---

## Behavior

- **Sort** — click a sortable `TableHead` toggles ascending → descending → ascending. One column at a time.
- **Select** — checkbox column prepended when `selectable`. Select-all in header selects every row in the full `data` array, not only the current page. It is `indeterminate` when partial selection. `onSelectionChange` receives an array of row IDs.
- **Rows** — data rows are interactive by default and may be marked `subdued` through `rowSubdued`.
- **Row actions** — action columns use `cellType: "icon-button"` and the same bordered `UtilityButton` treatment as Table examples. Use `maxa-table__row-actions` on the group and `maxa-table__row-action` on each button. Prefer direct Edit and Copy buttons followed by a More menu button when the row has multiple secondary actions. Icons stay 16px by 16px in every density.
- **Pagination** — when `pageSize` is set, only the current page slice renders. `Pagination` component renders below the table.
- **Loading** — 5 skeleton rows with Skeleton cells instead of data rows. Table header remains visible.
- **Empty** — when `data.length === 0` and `loading` is false, render the standalone `Empty` surface instead of an empty table header/shell.

---

## Token Reference

```css
--datatable-controls-gap: var(--spacing-3); /* 12px */
--datatable-footer-gap: var(--spacing-3); /* 12px */
```

All other visual values come from `--table-*` tokens (inherited via Table primitive), including header height, cell padding, row heights, content gaps, thumbnail size, and loader bars.

---

## What NOT to do

| ❌ Wrong                                              | ✅ Correct                                                |
| ----------------------------------------------------- | --------------------------------------------------------- |
| Passing server-paginated data without a custom render | Compose `Table` + `Pagination` manually for server paging |
| Using DataTable for card/grid layouts                 | Use card pattern grids                                    |
| Multiple sort columns                                 | One active sort at a time                                 |
| Skip `rowId` when rows may duplicate by index         | Provide a stable ID (e.g. `row => row.id as string`)      |

---

## Source files

- Component: `packages/ui/src/components/datatable/datatable.tsx`
- Styles: `packages/ui/src/components/datatable/datatable.css`
- Tokens: `packages/tokens/src/component-datatable.css`
- Tests: `packages/ui/src/components/datatable/datatable.test.tsx`
