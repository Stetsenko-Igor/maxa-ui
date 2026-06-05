import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Skeleton } from "./skeleton"

describe("Skeleton", () => {
  it("renders decorative placeholder", () => {
    render(<Skeleton data-testid="skeleton" />)
    expect(screen.getByTestId("skeleton")).toHaveAttribute("aria-hidden", "true")
  })

  it("supports variants", () => {
    render(<Skeleton variant="circle" data-testid="skeleton" />)
    expect(screen.getByTestId("skeleton")).toHaveClass("maxa-skeleton--circle")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Skeleton />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
