import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Progress } from "./progress"

describe("Progress", () => {
  it("renders an accessible progressbar", () => {
    render(<Progress value={40} label="Upload" showValue />)
    const progress = screen.getByRole("progressbar")
    expect(progress).toHaveAttribute("aria-valuenow", "40")
    expect(screen.getByText("Upload")).toBeInTheDocument()
    expect(screen.getByText("40%")).toBeInTheDocument()
  })

  it("clamps values", () => {
    render(<Progress value={160} showValue />)
    expect(screen.getByText("100%")).toBeInTheDocument()
  })

  it("supports intents and sizes", () => {
    render(<Progress value={20} intent="success" size="sm" />)
    expect(screen.getByRole("progressbar")).toHaveClass("maxa-progress--success", "maxa-progress--sm")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Progress value={64} label="Loading templates" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
