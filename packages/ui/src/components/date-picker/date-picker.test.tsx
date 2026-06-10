import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { DatePicker, DateRangePicker, QuarterPicker } from "./date-picker"

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

  it("wires the visible label to the date input", () => {
    render(<DatePicker label="Date Picker" />)
    const input = screen.getByRole("textbox")

    expect(screen.getByText("Date Picker")).toHaveAttribute("for", input.id)
  })

  it("opens calendar and selects a date", () => {
    render(<DatePicker label="Date Picker" />)
    fireEvent.click(screen.getByRole("button", { name: "Open calendar" }))
    fireEvent.click(screen.getByRole("button", { name: "May 4, 2025" }))
    expect(screen.getByRole("textbox")).toHaveValue("5/4/2025")
  })

  it("supports single-day quick presets with confirmation", () => {
    render(<DatePicker label="Date Picker" quickSelect="inline" confirmSelection defaultOpen />)

    fireEvent.click(screen.getByRole("button", { name: "Tomorrow" }))
    fireEvent.click(screen.getByRole("button", { name: "Apply" }))

    expect(screen.getByRole("textbox")).toHaveValue("5/16/2025")
  })

  it("shows the more preset menu for single-day picker", () => {
    render(<DatePicker label="Date Picker" quickSelect="more" confirmSelection defaultOpen />)

    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: /More/ }))
    expect(screen.getByRole("menu")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("menuitem", { name: "Last 30 days" }))
    fireEvent.click(screen.getByRole("button", { name: "Apply" }))

    expect(screen.getByRole("textbox")).toHaveValue("4/16/2025")
  })

  it("supports time picker dropdown with confirmation", () => {
    render(<DatePicker label="Date Picker" defaultValue="5/9/2025" timePicker confirmSelection defaultOpen />)

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    fireEvent.click(screen.getByDisplayValue("8:00 am"))
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("option", { name: "9:30 am" }))
    expect(screen.getByDisplayValue("9:30 am")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: "Apply" }))
    expect(screen.getByRole("textbox", { name: "Date Picker" })).toHaveValue("5/9/2025 9:30 am")
  })

  it("toggles the time dropdown via the clock icon button", () => {
    render(<DatePicker label="Date Picker" defaultValue="5/9/2025" timePicker defaultOpen />)
    const clockButton = screen.getByRole("button", { name: "Open time picker" })

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    expect(clockButton).toHaveAttribute("aria-expanded", "false")

    fireEvent.click(clockButton)
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    expect(clockButton).toHaveAttribute("aria-expanded", "true")

    fireEvent.click(clockButton)
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("marks the active time option as selected in the dropdown", () => {
    render(<DatePicker label="Date Picker" defaultValue="5/9/2025" timePicker defaultOpen defaultTimeDropdownOpen />)
    const selected = screen.getByRole("option", { name: "8:00 am" })

    expect(selected).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("option", { name: "6:00 am" })).toHaveAttribute("aria-selected", "false")
  })

  it("applies a custom typed time value", () => {
    render(<DatePicker label="Date Picker" defaultValue="5/9/2025" timePicker defaultOpen />)

    fireEvent.change(screen.getByDisplayValue("8:00 am"), { target: { value: "10:45 am" } })
    fireEvent.click(screen.getByRole("button", { name: "Apply" }))

    expect(screen.getByRole("textbox", { name: "Date Picker" })).toHaveValue("5/9/2025 10:45 am")
  })

  it("normalizes pasted or changed single-date digits", () => {
    render(<DatePicker label="Date Picker" />)
    const input = screen.getByRole("textbox") as HTMLInputElement

    fireEvent.change(input, { target: { value: "4162025" } })
    expect(input).toHaveValue("4/16/2025")
  })

  it("carries invalid month and day digits while normalizing changed input", () => {
    render(<DatePicker label="Date Picker" />)
    const input = screen.getByRole("textbox") as HTMLInputElement

    fireEvent.change(input, { target: { value: "132025" } })

    expect(input).toHaveValue("1/3/2025")
  })

  it("closes an open picker when clicking outside", () => {
    render(<DatePicker label="Date Picker" />)
    fireEvent.click(screen.getByRole("button", { name: "Open calendar" }))

    expect(screen.getByRole("dialog", { name: "Choose date" })).toBeInTheDocument()

    fireEvent.pointerDown(document.body)

    expect(screen.queryByRole("dialog", { name: "Choose date" })).not.toBeInTheDocument()
  })

  it("opens range calendar and applies a range", () => {
    render(<DateRangePicker label="Date Picker" />)
    fireEvent.click(screen.getByRole("button", { name: "Open date range calendar" }))
    fireEvent.click(screen.getByRole("button", { name: "May 9, 2025" }))
    fireEvent.click(screen.getByRole("button", { name: "June 18, 2025" }))
    fireEvent.click(screen.getByRole("button", { name: "Apply" }))
    expect(screen.getByRole("textbox")).toHaveValue("5/9/2025 - 6/18/2025")
  })

  it("updates the range draft from presets", () => {
    render(<DateRangePicker label="Date Picker" />)
    fireEvent.click(screen.getByRole("button", { name: "Open date range calendar" }))
    fireEvent.click(screen.getByRole("button", { name: "Last 30 days" }))

    expect(screen.getByDisplayValue("4/16/2025")).toBeInTheDocument()
    expect(screen.getByDisplayValue("5/15/2025")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Last 30 days" })).toHaveAttribute("data-selected", "true")

    fireEvent.click(screen.getByRole("button", { name: "Apply" }))

    expect(screen.getByRole("textbox")).toHaveValue("4/16/2025 - 5/15/2025")
  })

  it("normalizes changed range input digits", () => {
    render(<DateRangePicker label="Date Picker" />)
    const input = screen.getByRole("textbox") as HTMLInputElement

    fireEvent.change(input, { target: { value: "416202505152025" } })

    expect(input).toHaveValue("4/16/2025 - 5/15/2025")
  })

  it("opens quarter picker and selects a quarter", () => {
    render(<QuarterPicker label="Quarter Picker" defaultValue="Q1/2025" />)
    fireEvent.click(screen.getByRole("button", { name: "Open quarter picker" }))
    fireEvent.click(screen.getByRole("button", { name: "Next year" }))
    fireEvent.click(screen.getByRole("button", { name: "Q3" }))
    expect(screen.getByRole("textbox")).toHaveValue("Q3/2026")
  })

  it("selects quarter year from the year dropdown", () => {
    render(<QuarterPicker label="Quarter Picker" defaultValue="Q1/2025" />)
    fireEvent.click(screen.getByRole("button", { name: "Open quarter picker" }))
    fireEvent.click(screen.getByRole("button", { name: "Choose quarter year" }))
    fireEvent.click(screen.getByRole("button", { name: "2026" }))
    fireEvent.click(screen.getByRole("button", { name: "Q4" }))
    expect(screen.getByRole("textbox")).toHaveValue("Q4/2026")
  })

  it("keeps the quarter field active and opens year selection as an overlay", () => {
    render(<QuarterPicker label="Quarter Picker" defaultValue="Q1/2025" />)
    const input = screen.getByRole("textbox")

    fireEvent.focus(input)

    expect(input.closest(".maxa-date-picker__field")).toHaveClass("maxa-date-picker__field--open")
    expect(document.querySelector(".maxa-date-picker__quarter-grid")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Q1" })).toHaveAttribute("data-selected", "true")

    fireEvent.click(screen.getByRole("button", { name: "Choose quarter year" }))

    expect(document.querySelector(".maxa-date-picker__quarter-grid")).toBeInTheDocument()
    expect(document.querySelector(".maxa-date-picker__quarter-year-panel")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Choose quarter year" })).toHaveClass(
      "maxa-date-picker__quarter-title--active",
    )
  })
})
