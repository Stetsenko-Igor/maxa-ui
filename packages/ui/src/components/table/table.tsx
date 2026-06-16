import * as React from "react"
import "./table.css"
import { cn } from "../../lib/cn.js"

export type TableDensity = "sm" | "md" | "lg"
export type TableAlign = "left" | "center" | "right"
export type TableSortDirection = "ascending" | "descending" | "none"
export type TableHeaderType = "empty" | "heading" | "sort" | "numeric" | "checkbox"
export type TableCellType =
  | "checkbox"
  | "text"
  | "numeric"
  | "thumbnail"
  | "badge"
  | "tag"
  | "link"
  | "button"
  | "icon-button"
  | "icon"
  | "avatar"
  | "input"
  | "input-field"
  | "loader"
export type TableCellSize = "sm" | "lg"

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  density?: TableDensity
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, density = "md", ...props }, ref) => (
    <div className="maxa-table__container">
      <table
        ref={ref}
        className={cn("maxa-table", `maxa-table--${density}`, className)}
        {...props}
      />
    </div>
  ),
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("maxa-table__header", className)}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("maxa-table__body", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("maxa-table__footer", className)}
    {...props}
  />
))
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
      className={cn("maxa-table__row", className)}
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
  headerType?: TableHeaderType
  sort?: TableSortDirection
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    { className, align = "left", headerType, sort, children, "aria-sort": ariaSort, ...props },
    ref,
  ) => {
    const sortValue = sort && sort !== "none" ? sort : undefined
    const resolvedHeaderType =
      headerType ?? (sort ? "sort" : align === "right" ? "numeric" : "heading")

    return (
      <th
        ref={ref}
        className={cn("maxa-table__head", className)}
        data-align={align}
        data-header-type={resolvedHeaderType}
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
  cellSize?: TableCellSize
  cellType?: TableCellType
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = "left", cellSize, cellType = "text", ...props }, ref) => (
    <td
      ref={ref}
      className={cn("maxa-table__cell", className)}
      data-align={align}
      data-cell-size={cellSize}
      data-cell-type={cellType}
      {...props}
    />
  ),
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("maxa-table__caption", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
