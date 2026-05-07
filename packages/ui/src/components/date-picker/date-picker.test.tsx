import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
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
})
