import { describe, it, expect, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Slider } from "./slider"

describe("Slider", () => {
  it("renders an accessible slider with visible label and value", () => {
    render(<Slider label="Opacity" defaultValue={[40]} showValue />)

    expect(screen.getByText("Opacity")).toBeInTheDocument()
    expect(screen.getByText("40")).toBeInTheDocument()
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "40")
  })

  it("supports marks", () => {
    render(<Slider label="Zoom" marks={[0, 50, 100]} />)

    expect(screen.getByText("0")).toBeInTheDocument()
    expect(screen.getByText("50")).toBeInTheDocument()
    expect(screen.getByText("100")).toBeInTheDocument()
  })

  it("calls onValueChange from keyboard interaction", () => {
    const onValueChange = vi.fn()
    render(<Slider aria-label="Volume" defaultValue={[50]} onValueChange={onValueChange} />)

    screen.getByRole("slider").focus()
    fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowRight" })

    expect(onValueChange).toHaveBeenCalled()
  })

  it("supports disabled state", () => {
    render(<Slider label="Locked" disabled />)

    expect(screen.getByRole("slider")).toHaveAttribute("aria-disabled", "true")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Slider label="Scale" defaultValue={[24]} showValue />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
