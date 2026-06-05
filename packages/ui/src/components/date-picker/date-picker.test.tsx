import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { DatePicker, DateRangePicker } from "./date-picker"

describe("DatePicker", () => {
  it("renders a single date field", () => {
    render(<DatePicker label="Date Picker" />)
    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("placeholder", "mm/dd/yyyy")
    expect(screen.getByText("Date Picker")).toHaveAttribute("for", input.id)
  })

  it("renders a range date field", () => {
    render(<DateRangePicker label="Date Picker" />)
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "mm/dd/yyyy - mm/dd/yyyy",
    )
  })

  it("renders error text and aria-invalid", () => {
    render(<DatePicker error="Select a valid date" />)
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
    expect(screen.getByText("Select a valid date")).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<DatePicker label="Date Picker" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it("opens calendar and selects a date", () => {
    render(<DatePicker label="Date Picker" />)
    fireEvent.click(screen.getByRole("button", { name: "Open calendar" }))
    fireEvent.click(screen.getByRole("button", { name: "June 4, 2026" }))
    expect(screen.getByRole("textbox")).toHaveValue("6/4/2026")
  })

  it("opens range calendar and applies a range", () => {
    render(<DateRangePicker label="Date Picker" />)
    fireEvent.click(screen.getByRole("button", { name: "Open date range calendar" }))
    fireEvent.click(screen.getByRole("button", { name: "May 9, 2025" }))
    fireEvent.click(screen.getByRole("button", { name: "June 18, 2025" }))
    fireEvent.click(screen.getByRole("button", { name: "Apply" }))
    expect(screen.getByRole("textbox")).toHaveValue("5/9/2025 - 6/18/2025")
  })
})
