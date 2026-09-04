import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb"

describe("Breadcrumb", () => {
  it("renders semantic breadcrumb navigation", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Designs</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    )
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument()
    expect(screen.getByText("Designs")).toHaveAttribute("aria-current", "page")
  })

  it("renders collapsed middle items as an interactive trigger", () => {
    render(<BreadcrumbEllipsis />)
    expect(screen.getByRole("button", { name: "More pages" })).toHaveAttribute("type", "button")
  })

  it("renders a chevron icon separator by default, not a literal slash", () => {
    render(<BreadcrumbSeparator data-testid="sep" />)
    const separator = screen.getByTestId("sep")
    expect(separator).not.toHaveTextContent("/")
    expect(separator.querySelector("svg")).toBeInTheDocument()
  })

  it("renders an optional leading icon on BreadcrumbLink and BreadcrumbPage", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" iconLeading={<svg data-testid="home-icon" />}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage iconLeading={<svg data-testid="page-icon" />}>Designs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    )
    expect(screen.getByTestId("home-icon")).toBeInTheDocument()
    expect(screen.getByTestId("page-icon")).toBeInTheDocument()
  })

  it("omits the leading-icon wrapper when no icon is passed", () => {
    render(
      <BreadcrumbLink href="/" data-testid="link">Dashboard</BreadcrumbLink>,
    )
    expect(screen.getByTestId("link").querySelector(".maxa-breadcrumb__icon")).toBeNull()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Designs</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
