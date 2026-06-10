import { describe, expect, it, vi } from "vitest"
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

describe("DatePicker segment typing", () => {
  it("types date segments with keyboard digits", () => {
    render(<DatePicker label="Date" />)
    const input = screen.getByRole("textbox") as HTMLInputElement

    fireEvent.focus(input)
    for (const key of ["5", "4", "2", "0", "2", "5"]) {
      fireEvent.keyDown(input, { key })
    }

    expect(input).toHaveValue("5/4/2025")
  })

  it("ignores digit keys with modifiers", () => {
    render(<DatePicker label="Date" defaultValue="5/4/2025" />)
    const input = screen.getByRole("textbox") as HTMLInputElement

    fireEvent.keyDown(input, { key: "5", ctrlKey: true })

    expect(input).toHaveValue("5/4/2025")
  })

  it("clears segments with Backspace and Delete", () => {
    render(<DatePicker label="Date" defaultValue="5/4/2025" />)
    const input = screen.getByRole("textbox") as HTMLInputElement

    input.setSelectionRange(8, 8)
    fireEvent.keyDown(input, { key: "Backspace" })
    expect(input).toHaveValue("5//2025")

    input.setSelectionRange(0, 1)
    fireEvent.keyDown(input, { key: "Delete" })
    expect(input).toHaveValue("//2025")
  })

  it("replaces a selected month segment and composes two-digit months", () => {
    render(<DatePicker label="Date" defaultValue="5/4/2025" />)
    const input = screen.getByRole("textbox") as HTMLInputElement

    input.setSelectionRange(0, 1)
    fireEvent.keyDown(input, { key: "1" })
    expect(input).toHaveValue("1/4/2025")

    fireEvent.keyDown(input, { key: "2" })
    expect(input).toHaveValue("12/4/2025")
  })

  it("moves between segments with arrows and slash", () => {
    render(<DatePicker label="Date" defaultValue="5/4/2025" />)
    const input = screen.getByRole("textbox") as HTMLInputElement

    input.setSelectionRange(0, 1)
    fireEvent.keyDown(input, { key: "ArrowRight" })
    expect(input.selectionStart).toBe(2)
    expect(input.selectionEnd).toBe(3)

    fireEvent.keyDown(input, { key: "/" })
    expect(input.selectionStart).toBe(4)
    expect(input.selectionEnd).toBe(8)

    fireEvent.keyDown(input, { key: "ArrowLeft" })
    expect(input.selectionStart).toBe(2)
    expect(input.selectionEnd).toBe(3)
  })

  it("normalizes pasted digits into a single date", () => {
    render(<DatePicker label="Date" />)
    const input = screen.getByRole("textbox") as HTMLInputElement

    fireEvent.paste(input, { clipboardData: { getData: () => "04162025" } })

    expect(input).toHaveValue("4/16/2025")
  })

  it("ignores pastes without digits", () => {
    render(<DatePicker label="Date" />)
    const input = screen.getByRole("textbox") as HTMLInputElement

    fireEvent.paste(input, { clipboardData: { getData: () => "abc" } })

    expect(input).toHaveValue("")
  })

  it("normalizes pasted digits into a range", () => {
    render(<DateRangePicker label="Range" />)
    const input = screen.getByRole("textbox") as HTMLInputElement

    fireEvent.paste(input, { clipboardData: { getData: () => "0416202505152025" } })

    expect(input).toHaveValue("4/16/2025 - 5/15/2025")
  })

  it("navigates and types across both range dates", () => {
    render(<DateRangePicker label="Range" defaultValue="4/16/2025 - 5/15/2025" />)
    const input = screen.getByRole("textbox") as HTMLInputElement

    input.setSelectionRange(12, 12)
    fireEvent.keyDown(input, { key: "ArrowLeft" })
    expect(input.selectionStart).toBe(5)
    expect(input.selectionEnd).toBe(9)

    fireEvent.keyDown(input, { key: "ArrowRight" })
    expect(input.selectionStart).toBe(12)
    expect(input.selectionEnd).toBe(13)

    fireEvent.keyDown(input, { key: "6" })
    expect(input).toHaveValue("4/16/2025 - 6/15/2025")
  })
})

describe("DatePicker interactions", () => {
  it("cancels a draft selection in confirm mode", () => {
    render(<DatePicker label="Date" confirmSelection defaultOpen />)

    fireEvent.click(screen.getByRole("button", { name: "May 4, 2025" }))
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }))

    expect(screen.getByRole("textbox")).toHaveValue("")
    expect(screen.queryByRole("dialog", { name: "Choose date" })).not.toBeInTheDocument()
  })

  it("applies inline single presets and reports the apply payload", () => {
    const onDateApply = vi.fn()
    render(<DatePicker label="Date" quickSelect="inline" defaultOpen onDateApply={onDateApply} />)

    fireEvent.click(screen.getByRole("button", { name: "Yesterday" }))
    fireEvent.click(screen.getByRole("button", { name: "Today" }))
    fireEvent.click(screen.getByRole("button", { name: "Apply" }))

    expect(screen.getByRole("textbox")).toHaveValue("5/15/2025")
    expect(onDateApply).toHaveBeenCalledWith({ date: new Date(2025, 4, 15), time: undefined })
  })

  it("closes the more menu when pointing elsewhere in the popover", () => {
    render(<DatePicker label="Date" quickSelect="more" defaultOpen defaultMoreOpen />)

    expect(screen.getByRole("menu")).toBeInTheDocument()

    fireEvent.pointerDown(screen.getByRole("dialog", { name: "Choose date" }))

    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
  })

  it("closes the time dropdown when pointing elsewhere in the popover", () => {
    render(<DatePicker label="Date" timePicker defaultOpen defaultTimeDropdownOpen />)

    expect(screen.getByRole("listbox")).toBeInTheDocument()

    fireEvent.pointerDown(screen.getByRole("dialog", { name: "Choose date" }))

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("keeps a controlled value when selecting a date", () => {
    const onDateSelect = vi.fn()
    render(
      <DatePicker label="Date" value="5/9/2025" onChange={() => {}} onDateSelect={onDateSelect} />,
    )

    fireEvent.click(screen.getByRole("button", { name: "Open calendar" }))
    fireEvent.click(screen.getByRole("button", { name: "May 4, 2025" }))

    expect(onDateSelect).toHaveBeenCalledWith(new Date(2025, 4, 4))
    expect(screen.getByRole("textbox")).toHaveValue("5/9/2025")
  })

  it("does not open the calendar when disabled", () => {
    render(<DatePicker label="Date" disabled />)
    const input = screen.getByRole("textbox")

    fireEvent.focus(input)

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Open calendar" })).toBeDisabled()
    expect(input.closest(".maxa-date-picker__field")).toHaveClass(
      "maxa-date-picker__field--disabled",
    )
  })

  it("restarts the range when selecting an earlier or extra date", () => {
    render(<DateRangePicker label="Range" />)
    fireEvent.click(screen.getByRole("button", { name: "Open date range calendar" }))

    fireEvent.click(screen.getByRole("button", { name: "May 9, 2025" }))
    fireEvent.click(screen.getByRole("button", { name: "May 2, 2025" }))

    expect(screen.getByDisplayValue("5/2/2025")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "May 20, 2025" }))
    expect(screen.getByDisplayValue("5/20/2025")).toBeInTheDocument()

    fireEvent.click(screen.getAllByRole("button", { name: "May 27, 2025" })[0]!)
    expect(screen.getByDisplayValue("5/27/2025")).toBeInTheDocument()
    expect(screen.queryByDisplayValue("5/20/2025")).not.toBeInTheDocument()
  })

  it("cancels the range popover without applying", () => {
    const onRangeApply = vi.fn()
    render(<DateRangePicker label="Range" onRangeApply={onRangeApply} />)
    fireEvent.click(screen.getByRole("button", { name: "Open date range calendar" }))
    fireEvent.click(screen.getByRole("button", { name: "May 9, 2025" }))
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }))

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    expect(onRangeApply).not.toHaveBeenCalled()
    expect(screen.getByRole("textbox")).toHaveValue("")
  })

  it("navigates quarter years backwards and pages the year panel", () => {
    const onQuarterSelect = vi.fn()
    render(<QuarterPicker label="Quarter" defaultValue="Q2/2025" onQuarterSelect={onQuarterSelect} />)

    fireEvent.click(screen.getByRole("button", { name: "Open quarter picker" }))
    fireEvent.click(screen.getByRole("button", { name: "Previous year" }))
    fireEvent.click(screen.getByRole("button", { name: "Choose quarter year" }))

    const prevRange = screen.getAllByRole("button", { name: "Previous year range" })
    expect(prevRange).toHaveLength(2)
    fireEvent.click(prevRange[0]!)
    fireEvent.click(prevRange[1]!)

    const nextRange = screen.getAllByRole("button", { name: "Next year range" })
    fireEvent.click(nextRange[0]!)
    fireEvent.click(nextRange[1]!)

    expect(screen.getByText("2014 - 2025")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "2020" }))
    fireEvent.click(screen.getByRole("button", { name: "Q1" }))

    expect(onQuarterSelect).toHaveBeenCalledWith({ quarter: 1, year: 2020 })
    expect(screen.getByRole("textbox")).toHaveValue("Q1/2020")
  })

  it("falls back to the current year when the quarter value cannot be parsed", () => {
    render(<QuarterPicker label="Quarter" defaultValue="bogus" />)
    const input = screen.getByRole("textbox")
    const year = new Date().getFullYear()

    fireEvent.change(input, { target: { value: "still bogus" } })
    fireEvent.focus(input)
    fireEvent.click(screen.getByRole("button", { name: "Q2" }))

    expect(input).toHaveValue(`Q2/${year}`)
  })
})
