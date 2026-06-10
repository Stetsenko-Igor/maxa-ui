import { describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { Calendar } from "./calendar"

describe("Calendar", () => {
  it("renders a month grid and selects dates", () => {
    const onSelect = vi.fn()
    render(<Calendar month={new Date(2026, 5, 1)} selected={new Date(2026, 5, 4)} onDateSelect={onSelect} />)
    expect(screen.getByText("June 2026")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: "June 4, 2026" }))
    expect(onSelect).toHaveBeenCalled()
  })

  it("marks current and range states", () => {
    render(
      <Calendar
        month={new Date(2025, 4, 1)}
        currentDate={new Date(2025, 4, 15)}
        rangeStart={new Date(2025, 4, 9)}
        rangeEnd={new Date(2025, 4, 18)}
      />,
    )
    expect(screen.getByRole("button", { name: "May 15, 2025" })).toHaveAttribute("data-current", "true")
    expect(screen.getByRole("button", { name: "May 15, 2025" })).toHaveAttribute("data-in-range", "true")
    expect(screen.getByRole("button", { name: "May 9, 2025" })).toHaveAttribute("data-range-boundary", "true")
    expect(screen.getByRole("button", { name: "May 9, 2025" })).toHaveAttribute("data-range-start", "true")
    expect(screen.getByRole("button", { name: "May 18, 2025" })).toHaveAttribute("data-range-end", "true")
  })

  it("moves between months in uncontrolled mode", () => {
    render(<Calendar defaultMonth={new Date(2026, 5, 1)} />)
    fireEvent.click(screen.getByRole("button", { name: "Next month" }))
    expect(screen.getByText("July 2026")).toBeInTheDocument()
  })

  it("selects month and year from the dropdown views", () => {
    render(<Calendar defaultMonth={new Date(2025, 4, 1)} />)
    fireEvent.click(screen.getByRole("button", { name: "Choose month and year" }))
    expect(document.querySelector(".maxa-calendar__grid")).toBeInTheDocument()
    expect(document.querySelector(".maxa-calendar__picker-panel")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: "Choose year" }))
    fireEvent.click(screen.getByRole("button", { name: "2026" }))
    fireEvent.click(screen.getByRole("button", { name: "Jun" }))
    expect(screen.getByText("June 2026")).toBeInTheDocument()
  })

  it("does not select disabled dates", () => {
    const onSelect = vi.fn()
    render(<Calendar month={new Date(2026, 5, 1)} disabledDates={[new Date(2026, 5, 4)]} onDateSelect={onSelect} />)
    fireEvent.click(screen.getByRole("button", { name: "June 4, 2026" }))
    expect(onSelect).not.toHaveBeenCalled()
  })
})
