import * as React from "react"
import "./table.css"

export type TableDensity = "sm" | "md" | "lg"
export type TableAlign = "left" | "center" | "right"
export type TableSortDirection = "ascending" | "descending" | "none"

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  density?: TableDensity
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, density = "md", ...props }, ref) => (
    <div className="maxa-table__container">
      <table
        ref={ref}
        className={["maxa-table", `maxa-table--${density}`, className].filter(Boolean).join(" ")}
        {...props}
      />
    </div>
  ),
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={["maxa-table__header", className].filter(Boolean).join(" ")} {...props} />
  ),
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={["maxa-table__body", className].filter(Boolean).join(" ")} {...props} />
  ),
)
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={["maxa-table__footer", className].filter(Boolean).join(" ")} {...props} />
  ),
)
TableFooter.displayName = "TableFooter"

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
  subdued?: boolean
  interactive?: boolean
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected = false, subdued = false, interactive = false, ...props }, ref) => (
    <tr
      ref={ref}
      className={["maxa-table__row", className].filter(Boolean).join(" ")}
      data-selected={selected ? "" : undefined}
      data-subdued={subdued ? "" : undefined}
      data-interactive={interactive ? "" : undefined}
      {...props}
    />
  ),
)
TableRow.displayName = "TableRow"

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign
  sort?: TableSortDirection
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, align = "left", sort, children, "aria-sort": ariaSort, ...props }, ref) => {
    const sortValue = sort && sort !== "none" ? sort : undefined

    return (
      <th
        ref={ref}
        className={["maxa-table__head", className].filter(Boolean).join(" ")}
        data-align={align}
        data-sort={sortValue}
        aria-sort={sortValue ?? ariaSort}
        {...props}
      >
        <span className="maxa-table__head-content">
          <span className="maxa-table__head-label">{children}</span>
          {sortValue && (
            <span className="maxa-table__sort-icon" aria-hidden="true">
              {sortValue === "ascending" ? "↑" : "↓"}
            </span>
          )}
        </span>
      </th>
    )
  },
)
TableHead.displayName = "TableHead"

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = "left", ...props }, ref) => (
    <td
      ref={ref}
      className={["maxa-table__cell", className].filter(Boolean).join(" ")}
      data-align={align}
      {...props}
    />
  ),
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={["maxa-table__caption", className].filter(Boolean).join(" ")} {...props} />
  ),
)
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
}

