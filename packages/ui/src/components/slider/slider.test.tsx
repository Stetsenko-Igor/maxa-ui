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

  it("uses range-specific thumb labels", () => {
    render(<Slider label="Price" defaultValue={[20, 80]} />)

    expect(screen.getByRole("slider", { name: "Price minimum" })).toBeInTheDocument()
    expect(screen.getByRole("slider", { name: "Price maximum" })).toBeInTheDocument()
  })

  it("uses ordinal labels for middle range thumbs", () => {
    render(<Slider defaultValue={[20, 50, 80]} />)

    expect(screen.getByRole("slider", { name: "Minimum value" })).toBeInTheDocument()
    expect(screen.getByRole("slider", { name: "Value 2" })).toBeInTheDocument()
    expect(screen.getByRole("slider", { name: "Maximum value" })).toBeInTheDocument()
  })

  it("does not override an explicit accessible name", () => {
    render(<Slider label="Visible label" aria-label="Precise value" />)

    const root = document.querySelector(".maxa-slider")
    expect(root).toHaveAttribute("aria-label", "Precise value")
    expect(root).not.toHaveAttribute("aria-labelledby")
    expect(screen.getByRole("slider", { name: "Visible label" })).toBeInTheDocument()
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
