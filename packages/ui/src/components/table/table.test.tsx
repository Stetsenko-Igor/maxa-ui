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
          <TableHead align="right" sort="ascending">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow selected interactive>
          <TableCell>Postcard</TableCell>
          <TableCell align="right">$48.00</TableCell>
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
    expect(head).toHaveAttribute("aria-sort", "ascending")
  })

  it("applies density class", () => {
    render(<Table density="lg" data-testid="table" />)
    expect(screen.getByTestId("table")).toHaveClass("maxa-table--lg")
  })

  it("forwards ref to the table element", () => {
    let node: HTMLTableElement | null = null
    render(<Table ref={(el) => { node = el }} />)
    expect(node?.tagName).toBe("TABLE")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<BasicTable />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

