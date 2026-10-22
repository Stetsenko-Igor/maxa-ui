import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { axe } from "vitest-axe"
import { SegmentedControl, SegmentedControlItem } from "./segmented-control"

describe("SegmentedControl", () => {
  it("renders selected item", () => {
    render(
      <SegmentedControl defaultValue="center">
        <SegmentedControlItem value="left">Left</SegmentedControlItem>
        <SegmentedControlItem value="center">Center</SegmentedControlItem>
      </SegmentedControl>,
    )
    expect(screen.getByRole("button", { name: "Center" })).toHaveAttribute("aria-pressed", "true")
  })

  it("changes uncontrolled value", () => {
    render(
      <SegmentedControl defaultValue="left">
        <SegmentedControlItem value="left">Left</SegmentedControlItem>
        <SegmentedControlItem value="right">Right</SegmentedControlItem>
      </SegmentedControl>,
    )
    fireEvent.click(screen.getByRole("button", { name: "Right" }))
    expect(screen.getByRole("button", { name: "Right" })).toHaveAttribute("aria-pressed", "true")
  })

  it("calls onValueChange", () => {
    const onValueChange = vi.fn()
    render(
      <SegmentedControl value="left" onValueChange={onValueChange}>
        <SegmentedControlItem value="left">Left</SegmentedControlItem>
        <SegmentedControlItem value="right">Right</SegmentedControlItem>
      </SegmentedControl>,
    )
    fireEvent.click(screen.getByRole("button", { name: "Right" }))
    expect(onValueChange).toHaveBeenCalledWith("right")
  })

  it("supports the pill variant without changing selection or disabled behavior", () => {
    const onValueChange = vi.fn()
    render(
      <SegmentedControl variant="pill" defaultValue="all" onValueChange={onValueChange} aria-label="Request status">
        <SegmentedControlItem value="all">All</SegmentedControlItem>
        <SegmentedControlItem value="requested">Requested</SegmentedControlItem>
        <SegmentedControlItem value="cancelled" disabled>Cancelled</SegmentedControlItem>
      </SegmentedControl>,
    )
    expect(screen.getByRole("group", { name: "Request status" })).toHaveClass("maxa-segmented-control--pill")
    fireEvent.click(screen.getByRole("button", { name: "Requested" }))
    expect(screen.getByRole("button", { name: "Requested" })).toHaveAttribute("aria-pressed", "true")
    fireEvent.click(screen.getByRole("button", { name: "Cancelled" }))
    expect(onValueChange).toHaveBeenCalledTimes(1)
    expect(onValueChange).toHaveBeenCalledWith("requested")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <SegmentedControl defaultValue="left" aria-label="Alignment">
        <SegmentedControlItem value="left">Left</SegmentedControlItem>
        <SegmentedControlItem value="center">Center</SegmentedControlItem>
        <SegmentedControlItem value="right">Right</SegmentedControlItem>
      </SegmentedControl>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
