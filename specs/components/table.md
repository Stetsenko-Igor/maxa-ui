# Table

Status: shipped
Package: `@maxa/ui`
Source: `packages/ui/src/components/table`
Token source: `packages/tokens/src/component-table.css`

## Purpose

`Table` renders dense, semantic tabular data using native table elements. It is the primitive layer for admin lists, order summaries, campaign records, package rows, and future DataTable patterns.

## Architecture Decision

Expose `TableRow` as a public semantic part, not as a data-model component.

Use:

- `Table`
- `TableHeader`
- `TableBody`
- `TableFooter`
- `TableRow`
- `TableHead`
- `TableCell`
- `TableCaption`

Do not add a generic `Row` component that accepts an object, columns, or render callbacks. That belongs to a future `DataTable` abstraction built on top of these primitives.

## Figma Mapping

The MAXA Figma table reference separates:

- Header cells: empty, heading, sortable, numeric, checkbox.
- Body cells: checkbox, text, numeric text, thumbnail / preview, tag / badge, link, button, icon button, icon, avatar, input field, loader.
- Rows: subdued, selected, hover, and combinations of those states.

The code maps this to semantic parts:

- Header cell variants map to `TableHead` with `headerType`, `align`, and `sort`.
- Body cell variants map to `TableCell` with `cellType`, `cellSize`, and composition with existing components.
- Row states map to `TableRow` props: `selected`, `subdued`, `interactive`.

## Product Row Pattern

Most MAXA product tables are selectable lists. Default table examples should include a leading checkbox header/cell and selected rows should pair `TableRow selected` with a checked checkbox.

Row actions should be consistent across Table and DataTable examples:

- Use `TableCell cellType="icon-button"` for the action cell.
- Use the same bordered `UtilityButton` treatment for row actions:
  `maxa-table__row-actions` on the group and `maxa-table__row-action` on each button.
- Show direct Edit and Copy actions before the More actions button when space allows.
- Use the Figma icon set for this cell: PencilSimple, Copy, and DotsThreeVertical.
- Use 16px by 16px icons for row action buttons in every density.
- Do not mix ghost `IconButton`, custom unbordered buttons, or mismatched icon sizes in row action cells.

## API

### Table

| Prop      | Type                   | Default | Description                               |
| --------- | ---------------------- | ------- | ----------------------------------------- |
| `density` | `"sm" \| "md" \| "lg"` | `"md"`  | Controls row height and vertical padding. |

Extends `React.TableHTMLAttributes<HTMLTableElement>`.

### TableRow

| Prop          | Type      | Default | Description                             |
| ------------- | --------- | ------- | --------------------------------------- |
| `selected`    | `boolean` | `false` | Applies selected row background.        |
| `subdued`     | `boolean` | `false` | Applies subdued row background.         |
| `interactive` | `boolean` | `false` | Enables hover state for clickable rows. |

Extends `React.HTMLAttributes<HTMLTableRowElement>`.

### TableHead

| Prop         | Type                                                        | Default     | Description                                                |
| ------------ | ----------------------------------------------------------- | ----------- | ---------------------------------------------------------- |
| `align`      | `"left" \| "center" \| "right"`                             | `"left"`    | Aligns header content.                                     |
| `headerType` | `"empty" \| "heading" \| "sort" \| "numeric" \| "checkbox"` | derived     | Maps the header to the Figma header-cell semantic variant. |
| `sort`       | `"ascending" \| "descending" \| "none"`                     | `undefined` | Displays sort indicator and sets `aria-sort`.              |

Extends `React.ThHTMLAttributes<HTMLTableCellElement>`.

### TableCell

| Prop       | Type                                                                                                                                              | Default  | Description                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------- |
| `align`    | `"left" \| "center" \| "right"`                                                                                                                   | `"left"` | Aligns cell content.                                          |
| `cellType` | `"checkbox" \| "text" \| "numeric" \| "thumbnail" \| "badge" \| "tag" \| "link" \| "button" \| "icon-button" \| "icon" \| "avatar" \| "input" \| "input-field" \| "loader"` | `"text"` | Maps the cell to the Figma body-cell semantic variant. `tag` and `input-field` are Figma-name aliases for the existing badge/tag and input compositions. |
| `cellSize` | `"sm" \| "lg"`                                                                                                                                    | density  | Overrides a specific cell to the Figma small or large height. |

Extends `React.TdHTMLAttributes<HTMLTableCellElement>`.

## Accessibility

- Use native `<table>` semantics.
- Use `TableCaption` when the table needs an accessible name.
- Use `scope="col"` or `scope="row"` on header cells where needed.
- Use `TableHead sort="ascending"` or `"descending"` for sorted columns so `aria-sort` is set.
- Do not use tables for layout-only grids.

## Styling

- Uses component tokens only.
- Container owns border, radius, background, and horizontal overflow.
- Rows own selected/subdued/interactive states.
- Caption renders as a small muted table label above the bordered table.
- Header cells use semibold table-heading typography, not regular body text.
- Cells own alignment, padding, content type hooks, small/large height overrides, thumbnail helper, icon helper, text stack helper, input-field composition, and loader helper.

## Future DataTable

`DataTable` can later compose these primitives with:

- Column definitions.
- Client/server sorting.
- Pagination.
- Row selection state.
- Empty/loading states.
- Column visibility and density controls.
