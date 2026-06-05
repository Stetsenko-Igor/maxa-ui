import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
} from "./pagination"

function Fixture() {
  return (
    <Pagination>
      <PaginationList>
        <PaginationItem><PaginationPrevious href="?page=1" /></PaginationItem>
        <PaginationItem><PaginationLink href="?page=1">1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="?page=2" isActive>2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationNext href="?page=3" /></PaginationItem>
      </PaginationList>
    </Pagination>
  )
}

describe("Pagination", () => {
  it("renders navigation and active page", () => {
    render(<Fixture />)
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute("aria-current", "page")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Fixture />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
