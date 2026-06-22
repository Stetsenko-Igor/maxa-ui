"use client"

import * as React from "react"
import { Checkbox, type CheckedState } from "../checkbox/index.js"
import { Empty } from "../empty/index.js"
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
} from "../pagination/index.js"
import { Skeleton } from "../skeleton/index.js"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  type TableAlign,
  type TableCellType,
  type TableHeaderType,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/index.js"
import "./datatable.css"
import { cn } from "../../lib/cn.js"

export type SortDirection = "ascending" | "descending"

export type ColumnDef<T extends Record<string, unknown>> = {
  key: string
  header: React.ReactNode
  align?: TableAlign
  cell?: (row: T, index: number) => React.ReactNode
  cellType?: TableCellType
  headerType?: TableHeaderType
  sortable?: boolean
  width?: string
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: ColumnDef<T>[]
  data: T[]
  caption?: string
  density?: "sm" | "md" | "lg"
  defaultSort?: { key: string; direction: SortDirection }
  selectable?: boolean
  onSelectionChange?: (ids: string[]) => void
  rowSubdued?: (row: T, index: number) => boolean
  rowId?: (row: T, index: number) => string
  pageSize?: number
  loading?: boolean
  emptyState?: React.ReactNode
  className?: string
}

const SKELETON_ROWS = 5

function SortUpIcon() {
  return (
    <svg
      className="maxa-datatable__sort-icon maxa-datatable__sort-icon--active"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 2L10 8H2L6 2Z" fill="currentColor" />
    </svg>
  )
}

function SortDownIcon() {
  return (
    <svg
      className="maxa-datatable__sort-icon maxa-datatable__sort-icon--active"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 10L2 4H10L6 10Z" fill="currentColor" />
    </svg>
  )
}

function SortBothIcon() {
  return (
    <svg
      className="maxa-datatable__sort-icon"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 1L9 5H3L6 1Z" fill="currentColor" />
      <path d="M6 11L3 7H9L6 11Z" fill="currentColor" />
    </svg>
  )
}

function LoadingCell({ cellType }: { cellType?: TableCellType }) {
  if (cellType === "checkbox") {
    return <Skeleton variant="text" className="maxa-datatable__skeleton-control" />
  }

  if (cellType === "thumbnail") {
    return (
      <Skeleton
        variant="text"
        className="maxa-datatable__skeleton-line maxa-datatable__skeleton-line--title"
      />
    )
  }

  if (cellType === "avatar") {
    return (
      <span className="maxa-table__cell-content">
        <Skeleton variant="circle" className="maxa-datatable__skeleton-avatar" />
        <Skeleton
          variant="text"
          className="maxa-datatable__skeleton-line maxa-datatable__skeleton-line--title"
        />
      </span>
    )
  }

  if (cellType === "badge") {
    return <Skeleton variant="text" className="maxa-datatable__skeleton-badge" />
  }

  if (cellType === "icon-button") {
    return (
      <span className="maxa-datatable__skeleton-actions">
        <Skeleton variant="text" className="maxa-datatable__skeleton-action" />
        <Skeleton variant="text" className="maxa-datatable__skeleton-action" />
        <Skeleton variant="text" className="maxa-datatable__skeleton-action" />
      </span>
    )
  }

  return <Skeleton variant="text" className="maxa-datatable__skeleton-line" />
}

function DataTableInner<T extends Record<string, unknown>>(
  {
    columns,
    data,
    caption,
    density = "md",
    defaultSort,
    selectable = false,
    onSelectionChange,
    rowSubdued,
    rowId = (_row, index) => String(index),
    pageSize,
    loading = false,
    emptyState,
    className,
  }: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const [sort, setSort] = React.useState<{ key: string; direction: SortDirection } | null>(
    defaultSort ?? null,
  )
  const [page, setPage] = React.useState(1)
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())

  const sortedData = React.useMemo(() => {
    if (!sort) return data
    return [...data].sort((a, b) => {
      const av = a[sort.key]
      const bv = b[sort.key]
      const aStr = av == null ? "" : String(av)
      const bStr = bv == null ? "" : String(bv)
      const cmp = aStr.localeCompare(bStr, undefined, { numeric: true, sensitivity: "base" })
      return sort.direction === "ascending" ? cmp : -cmp
    })
  }, [data, sort])

  const totalPages = pageSize ? Math.ceil(sortedData.length / pageSize) : 1
  const safePage = Math.min(page, Math.max(1, totalPages))

  const pageData = React.useMemo(() => {
    if (!pageSize) return sortedData
    const start = (safePage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, safePage, pageSize])

  const allIds = React.useMemo(() => data.map((row, i) => rowId(row, i)), [data, rowId])

  function toggleSort(key: string) {
    setSort((prev) => {
      if (prev?.key !== key) return { key, direction: "ascending" }
      if (prev.direction === "ascending") return { key, direction: "descending" }
      return { key, direction: "ascending" }
    })
    setPage(1)
  }

  function toggleRow(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      onSelectionChange?.(Array.from(next))
      return next
    })
  }

  function toggleAll(checked: CheckedState) {
    if (checked === true) {
      const next = new Set(allIds)
      setSelectedIds(next)
      onSelectionChange?.(Array.from(next))
    } else {
      setSelectedIds(new Set())
      onSelectionChange?.([])
    }
  }

  const allChecked: CheckedState =
    selectedIds.size === 0 ? false : selectedIds.size === allIds.length ? true : "indeterminate"

  const cols = selectable
    ? [{ key: "__select__", header: null, sortable: false } as ColumnDef<T>, ...columns]
    : columns

  const isEmpty = !loading && data.length === 0

  if (isEmpty) {
    return (
      <div ref={ref} className={cn("maxa-datatable", className)}>
        <div className="maxa-datatable__empty maxa-datatable__empty--standalone">
          {emptyState ?? <Empty title="No results" size="sm" />}
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className={cn("maxa-datatable", className)}>
      <Table density={density}>
        {caption && <TableCaption>{caption}</TableCaption>}
        <colgroup>
          {cols.map((col) => (
            <col
              key={col.key}
              style={
                col.key === "__select__"
                  ? { width: "var(--table-checkbox-cell-width)" }
                  : col.width
                    ? { width: col.width }
                    : undefined
              }
            />
          ))}
        </colgroup>
        <TableHeader>
          <TableRow>
            {cols.map((col) => {
              if (col.key === "__select__") {
                return (
                  <TableHead key="__select__" headerType="checkbox">
                    <Checkbox
                      checked={allChecked}
                      onCheckedChange={toggleAll}
                      aria-label="Select all rows"
                    />
                  </TableHead>
                )
              }
              const isActive = sort?.key === col.key
              const sortDir = isActive ? sort!.direction : undefined
              return (
                <TableHead
                  key={col.key}
                  align={col.align ?? "left"}
                  headerType={
                    col.headerType ??
                    (col.sortable ? "sort" : col.align === "right" ? "numeric" : "heading")
                  }
                  {...(sortDir ? { sort: sortDir } : {})}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      className="maxa-datatable__sort-btn"
                      onClick={() => toggleSort(col.key)}
                      aria-label={`Sort by ${typeof col.header === "string" ? col.header : col.key}`}
                    >
                      {col.header}
                      {isActive && sort!.direction === "ascending" ? (
                        <SortUpIcon />
                      ) : isActive && sort!.direction === "descending" ? (
                        <SortDownIcon />
                      ) : (
                        <SortBothIcon />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading
            ? Array.from({ length: SKELETON_ROWS }, (_, rowIdx) => (
                <TableRow key={`skeleton-${rowIdx}`}>
                  {cols.map((col) => {
                    const cellType: TableCellType =
                      col.key === "__select__" ? "checkbox" : (col.cellType ?? "text")

                    return (
                      <TableCell key={col.key} align={col.align ?? "left"} cellType={cellType}>
                        <div className="maxa-datatable__skeleton-cell">
                          <LoadingCell cellType={cellType} />
                        </div>
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            : pageData.map((row, pageIdx) => {
                  const globalIdx = (safePage - 1) * (pageSize ?? pageData.length) + pageIdx
                  const id = rowId(row, globalIdx)
                  const isSelected = selectedIds.has(id)
                  const isSubdued = rowSubdued?.(row, globalIdx) ?? false
                  return (
                    <TableRow key={id} selected={isSelected} subdued={isSubdued} interactive>
                      {cols.map((col) => {
                        if (col.key === "__select__") {
                          return (
                            <TableCell key="__select__" cellType="checkbox">
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => toggleRow(id)}
                                aria-label={`Select row ${globalIdx + 1}`}
                              />
                            </TableCell>
                          )
                        }
                        return (
                          <TableCell
                            key={col.key}
                            align={col.align ?? "left"}
                            cellType={col.cellType ?? "text"}
                          >
                            {col.cell
                              ? col.cell(row, globalIdx)
                              : ((row[col.key] as React.ReactNode) ?? null)}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
              })}
        </TableBody>
      </Table>

      {pageSize && totalPages > 1 && (
        <div className="maxa-datatable__footer">
          <Pagination>
            <PaginationList>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  aria-disabled={safePage <= 1}
                  onClick={(e) => {
                    e.preventDefault()
                    if (safePage > 1) setPage(safePage - 1)
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={p === safePage}
                    onClick={(e) => {
                      e.preventDefault()
                      setPage(p)
                    }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  aria-disabled={safePage >= totalPages}
                  onClick={(e) => {
                    e.preventDefault()
                    if (safePage < totalPages) setPage(safePage + 1)
                  }}
                />
              </PaginationItem>
            </PaginationList>
          </Pagination>
        </div>
      )}
    </div>
  )
}

// forwardRef erases generics, so cast back to a generic-preserving signature.
const DataTable = React.forwardRef(DataTableInner) as (<T extends Record<string, unknown>>(
  props: DataTableProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement) & { displayName?: string }

DataTable.displayName = "DataTable"

export { DataTable }
