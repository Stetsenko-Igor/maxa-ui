# DataTable — Component Spec

## Overview

DataTable is a higher-level data display component built on top of the `Table` primitive. It adds client-side sorting, optional row selection, optional pagination, loading states, and empty states. Use it when data is known at render time and fits on-page.

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

| Prop                | Type                      | Default                        | Description                            |
| ------------------- | ------------------------- | ------------------------------ | -------------------------------------- |
| `columns`           | `ColumnDef<T>[]`          | —                              | Column definitions                     |
| `data`              | `T[]`                     | —                              | Row data array                         |
| `caption`           | `string`                  | —                              | Accessible table caption               |
| `density`           | `"sm" \| "md" \| "lg"`    | `"md"`                         | Row density                            |
| `defaultSort`       | `{ key, direction }`      | —                              | Initial sort state                     |
| `selectable`        | `boolean`                 | `false`                        | Adds checkbox column for row selection |
| `onSelectionChange` | `(ids: string[]) => void` | —                              | Called when selection changes          |
| `rowId`             | `(row, index) => string`  | index-based                    | Row identity function                  |
| `pageSize`          | `number`                  | —                              | Enables client-side pagination         |
| `loading`           | `boolean`                 | `false`                        | Shows skeleton rows                    |
| `emptyState`        | `ReactNode`               | `<Empty title="No results" />` | Rendered when data is empty            |

### `ColumnDef<T>`

| Field      | Type                        | Description                       |
| ---------- | --------------------------- | --------------------------------- |
| `key`      | `string`                    | Field key on the row object       |
| `header`   | `ReactNode`                 | Column header label               |
| `cell`     | `(row, index) => ReactNode` | Optional custom cell renderer     |
| `sortable` | `boolean`                   | Enables header sort click         |
| `width`    | `string`                    | CSS column width (e.g. `"120px"`) |

---

## Behavior

- **Sort** — click a sortable `TableHead` toggles ascending → descending → ascending. One column at a time.
- **Select** — checkbox column prepended when `selectable`. Select-all in header is `indeterminate` when partial selection. `onSelectionChange` receives an array of row IDs.
- **Pagination** — when `pageSize` is set, only the current page slice renders. `Pagination` component renders below the table.
- **Loading** — 5 skeleton rows with Skeleton cells instead of data rows. Table header remains visible.
- **Empty** — rendered below the table header when `data.length === 0` and `loading` is false.

---

## Token Reference

```css
--datatable-controls-gap: var(--spacing-3); /* 12px */
--datatable-footer-gap: var(--spacing-3); /* 12px */
```

All other visual values come from `--table-*` tokens (inherited via Table primitive).

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
