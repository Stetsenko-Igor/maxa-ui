import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Spinner } from "./spinner"

describe("Spinner", () => {
  it("renders status by default", () => {
    render(<Spinner label="Loading designs" />)
    expect(screen.getByRole("status", { name: "Loading designs" })).toHaveClass("maxa-spinner")
  })

  it("supports sizes", () => {
    render(<Spinner size="lg" label="Loading" />)
    expect(screen.getByRole("status")).toHaveClass("maxa-spinner--lg")
  })

  it("supports appearances", () => {
    render(<Spinner appearance="inverted" label="Loading" />)
    expect(screen.getByRole("status")).toHaveClass("maxa-spinner--inverted")
  })

  it("keeps tone as a compatibility alias", () => {
    render(<Spinner tone="inverse" label="Loading" />)
    expect(screen.getByRole("status")).toHaveClass("maxa-spinner--inverted")
  })

  it("can be decorative", () => {
    render(<Spinner decorative data-testid="spinner" />)
    const spinner = screen.getByTestId("spinner")
    expect(spinner).toHaveAttribute("aria-hidden", "true")
    expect(screen.queryByRole("status")).toBeNull()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Spinner label="Loading dashboard" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
