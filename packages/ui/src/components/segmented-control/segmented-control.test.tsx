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
