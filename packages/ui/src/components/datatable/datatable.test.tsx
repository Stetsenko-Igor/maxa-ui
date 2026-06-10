import * as React from "react"
import { describe, it, expect, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { DataTable, type ColumnDef } from "./datatable"

type Row = { id: string; name: string; status: string; date: string }

const COLUMNS: ColumnDef<Row>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "status", header: "Status" },
  { key: "date", header: "Date", sortable: true, align: "right", cellType: "numeric" },
]

const DATA: Row[] = [
  { id: "1", name: "Branding Kit", status: "Active", date: "2025-06-01" },
  { id: "2", name: "Annual Report", status: "Draft", date: "2025-03-15" },
  { id: "3", name: "Social Pack", status: "Active", date: "2025-07-20" },
  { id: "4", name: "Ad Campaign", status: "Archived", date: "2025-01-10" },
]

const ROW_ID = (row: Row) => row.id

describe("DataTable", () => {
  it("renders all rows", () => {
    render(<DataTable columns={COLUMNS} data={DATA} rowId={ROW_ID} />)
    expect(screen.getByText("Branding Kit")).toBeInTheDocument()
    expect(screen.getByText("Annual Report")).toBeInTheDocument()
  })

  it("renders column headers", () => {
    render(<DataTable columns={COLUMNS} data={DATA} rowId={ROW_ID} />)
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Status")).toBeInTheDocument()
  })

  it("renders empty state when data is empty", () => {
    render(<DataTable columns={COLUMNS} data={[]} />)
    expect(screen.getByText("No results")).toBeInTheDocument()
  })

  it("renders custom empty state", () => {
    render(<DataTable columns={COLUMNS} data={[]} emptyState={<p>Nothing here</p>} />)
    expect(screen.getByText("Nothing here")).toBeInTheDocument()
  })

  it("renders skeleton rows when loading", () => {
    render(<DataTable columns={COLUMNS} data={[]} loading />)
    expect(document.querySelector(".maxa-skeleton")).toBeInTheDocument()
    expect(document.querySelector(".maxa-skeleton--rect")).not.toBeInTheDocument()
    expect(screen.queryByText("No results")).not.toBeInTheDocument()
  })

  it("sorts ascending on first header click", () => {
    render(<DataTable columns={COLUMNS} data={DATA} rowId={ROW_ID} />)
    fireEvent.click(screen.getByLabelText("Sort by Name"))
    // After asc sort, "Ad Campaign" comes first alphabetically
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Ad Campaign")
  })

  it("sorts descending on second header click", () => {
    render(<DataTable columns={COLUMNS} data={DATA} rowId={ROW_ID} />)
    const sortBtn = screen.getByLabelText("Sort by Name")
    fireEvent.click(sortBtn)
    fireEvent.click(sortBtn)
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Social Pack")
  })

  it("updates row order and aria-sort through the sort cycle", () => {
    render(<DataTable columns={COLUMNS} data={DATA} rowId={ROW_ID} />)
    const sortBtn = screen.getByLabelText("Sort by Name")
    const nameHeader = screen.getByRole("columnheader", { name: /name/i })

    // Unsorted: original data order, no aria-sort on the header
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Branding Kit")
    expect(nameHeader).not.toHaveAttribute("aria-sort")

    fireEvent.click(sortBtn)
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Ad Campaign")
    expect(nameHeader).toHaveAttribute("aria-sort", "ascending")

    fireEvent.click(sortBtn)
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Social Pack")
    expect(nameHeader).toHaveAttribute("aria-sort", "descending")

    // Third click cycles back to ascending
    fireEvent.click(sortBtn)
    expect(screen.getAllByRole("row")[1]).toHaveTextContent("Ad Campaign")
    expect(nameHeader).toHaveAttribute("aria-sort", "ascending")
  })

  it("calls onSelectionChange when row selected", () => {
    const onChange = vi.fn()
    render(
      <DataTable
        columns={COLUMNS}
        data={DATA}
        rowId={ROW_ID}
        selectable
        onSelectionChange={onChange}
      />,
    )
    const checkboxes = screen.getAllByRole("checkbox")
    // first checkbox is select-all, second is first row
    fireEvent.click(checkboxes[1])
    expect(onChange).toHaveBeenCalledWith(["1"])
  })

  it("selects and deselects all rows via the header checkbox", () => {
    const onChange = vi.fn()
    render(
      <DataTable
        columns={COLUMNS}
        data={DATA}
        rowId={ROW_ID}
        selectable
        onSelectionChange={onChange}
      />,
    )
    const selectAll = screen.getByRole("checkbox", { name: "Select all rows" })

    fireEvent.click(selectAll)
    expect(onChange).toHaveBeenLastCalledWith(["1", "2", "3", "4"])

    fireEvent.click(selectAll)
    expect(onChange).toHaveBeenLastCalledWith([])
  })

  it("accumulates selection across individual rows", () => {
    const onChange = vi.fn()
    render(
      <DataTable
        columns={COLUMNS}
        data={DATA}
        rowId={ROW_ID}
        selectable
        onSelectionChange={onChange}
      />,
    )

    fireEvent.click(screen.getByRole("checkbox", { name: "Select row 1" }))
    expect(onChange).toHaveBeenLastCalledWith(["1"])

    fireEvent.click(screen.getByRole("checkbox", { name: "Select row 3" }))
    expect(onChange).toHaveBeenLastCalledWith(["1", "3"])

    fireEvent.click(screen.getByRole("checkbox", { name: "Select row 1" }))
    expect(onChange).toHaveBeenLastCalledWith(["3"])
  })

  it("renders pagination when pageSize is set", () => {
    render(<DataTable columns={COLUMNS} data={DATA} rowId={ROW_ID} pageSize={2} />)
    expect(screen.getByLabelText("Pagination")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument() // page 2 link
  })

  it("disables previous/next at pagination boundaries", () => {
    render(<DataTable columns={COLUMNS} data={DATA} rowId={ROW_ID} pageSize={2} />)
    const previous = screen.getByRole("link", { name: "Go to previous page" })
    const next = screen.getByRole("link", { name: "Go to next page" })

    // First page: previous disabled, first two rows shown
    expect(previous).toHaveAttribute("aria-disabled", "true")
    expect(next).toHaveAttribute("aria-disabled", "false")
    expect(screen.getByText("Branding Kit")).toBeInTheDocument()
    expect(screen.queryByText("Social Pack")).not.toBeInTheDocument()

    fireEvent.click(next)

    // Last page: next disabled, last two rows shown
    expect(next).toHaveAttribute("aria-disabled", "true")
    expect(previous).toHaveAttribute("aria-disabled", "false")
    expect(screen.getByText("Social Pack")).toBeInTheDocument()
    expect(screen.queryByText("Branding Kit")).not.toBeInTheDocument()

    // Clicking next on the last page does not advance further
    fireEvent.click(next)
    expect(screen.getByText("Social Pack")).toBeInTheDocument()

    fireEvent.click(previous)
    expect(screen.getByText("Branding Kit")).toBeInTheDocument()
    expect(previous).toHaveAttribute("aria-disabled", "true")

    // Clicking previous on the first page does not go back further
    fireEvent.click(previous)
    expect(screen.getByText("Branding Kit")).toBeInTheDocument()
  })

  it("maps column and row semantic variants to table primitives", () => {
    render(
      <DataTable
        columns={COLUMNS}
        data={DATA}
        rowId={ROW_ID}
        rowSubdued={(row) => row.status === "Archived"}
      />,
    )

    const dateHeader = screen.getByRole("columnheader", { name: /date/i })
    expect(dateHeader).toHaveAttribute("data-align", "right")
    expect(dateHeader).toHaveAttribute("data-header-type", "sort")

    const archivedRow = screen.getByRole("cell", { name: "Ad Campaign" }).closest("tr")
    expect(archivedRow).toHaveAttribute("data-subdued")

    const dateCell = screen.getByRole("cell", { name: "2025-01-10" })
    expect(dateCell).toHaveAttribute("data-cell-type", "numeric")
    expect(dateCell).toHaveAttribute("data-align", "right")
  })

  it("forwards ref to the root element", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<DataTable ref={ref} columns={COLUMNS} data={DATA} rowId={ROW_ID} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass("maxa-datatable")
  })

  it("forwards ref to the root element in the empty state", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<DataTable ref={ref} columns={COLUMNS} data={[]} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass("maxa-datatable")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <DataTable columns={COLUMNS} data={DATA} rowId={ROW_ID} caption="Test designs" />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
