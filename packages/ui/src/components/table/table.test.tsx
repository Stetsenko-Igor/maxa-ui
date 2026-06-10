import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

function BasicTable() {
  return (
    <Table>
      <TableCaption>Orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead align="right" headerType="numeric" sort="ascending">
            Price
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow selected interactive>
          <TableCell>Postcard</TableCell>
          <TableCell align="right" cellType="numeric" cellSize="lg">
            $48.00
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell align="right">$48.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

describe("Table", () => {
  it("renders semantic table parts", () => {
    render(<BasicTable />)
    expect(screen.getByRole("table", { name: "Orders" })).toBeInTheDocument()
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument()
    expect(screen.getByRole("cell", { name: "Postcard" })).toBeInTheDocument()
  })

  it("applies row state attributes", () => {
    render(<BasicTable />)
    const row = screen.getByRole("cell", { name: "Postcard" }).closest("tr")
    expect(row).toHaveAttribute("data-selected")
    expect(row).toHaveAttribute("data-interactive")
  })

  it("applies alignment and sort attributes", () => {
    render(<BasicTable />)
    const head = screen.getByRole("columnheader", { name: /price/i })
    expect(head).toHaveAttribute("data-align", "right")
    expect(head).toHaveAttribute("data-header-type", "numeric")
    expect(head).toHaveAttribute("aria-sort", "ascending")
  })

  it("applies cell semantic variants", () => {
    render(<BasicTable />)
    const cell = screen.getAllByRole("cell", { name: "$48.00" })[0]
    expect(cell).toHaveAttribute("data-cell-type", "numeric")
    expect(cell).toHaveAttribute("data-cell-size", "lg")
  })

  it("supports Figma cell type aliases", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell cellType="tag">Tag</TableCell>
            <TableCell cellType="input-field">Input field</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )

    expect(screen.getByRole("cell", { name: "Tag" })).toHaveAttribute("data-cell-type", "tag")
    expect(screen.getByRole("cell", { name: "Input field" })).toHaveAttribute(
      "data-cell-type",
      "input-field",
    )
  })

  it("applies checkbox header and cell semantics", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead headerType="checkbox">Select</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell cellType="checkbox">Control</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )

    expect(screen.getByRole("columnheader", { name: "Select" })).toHaveAttribute(
      "data-header-type",
      "checkbox",
    )
    expect(screen.getByRole("cell", { name: "Control" })).toHaveAttribute(
      "data-cell-type",
      "checkbox",
    )
  })

  it("applies density class", () => {
    render(<Table density="lg" data-testid="table" />)
    expect(screen.getByTestId("table")).toHaveClass("maxa-table--lg")
  })

  it("forwards ref to the table element", () => {
    let node: HTMLTableElement | null = null
    render(
      <Table
        ref={(el) => {
          node = el
        }}
      />,
    )
    expect(node?.tagName).toBe("TABLE")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<BasicTable />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
