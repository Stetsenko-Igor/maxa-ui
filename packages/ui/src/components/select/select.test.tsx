import { describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Select } from "./select"

describe("Select", () => {
  it("renders a labeled custom combobox field", () => {
    render(
      <Select label="Dropdown" defaultValue="">
        <option value="" disabled>
          Placeholder
        </option>
        <option value="one">One</option>
      </Select>,
    )

    const select = screen.getByRole("combobox")
    expect(select).toBeInTheDocument()
    expect(select).toHaveTextContent("Placeholder")
    expect(screen.getByText("Dropdown")).toHaveAttribute("for", select.id)
  })

  it("opens the listbox and selects a value", () => {
    const handleValueChange = vi.fn()
    const handleChange = vi.fn()

    render(
      <Select label="Sort by" defaultValue="newest" onChange={handleChange} onValueChange={handleValueChange}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </Select>,
    )

    fireEvent.click(screen.getByRole("combobox"))
    expect(screen.getByRole("listbox")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("option", { name: "Oldest" }))

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    expect(screen.getByRole("combobox")).toHaveTextContent("Oldest")
    expect(handleValueChange).toHaveBeenCalledWith("oldest")
    expect(handleChange).toHaveBeenCalled()
  })

  it("supports keyboard selection", () => {
    render(
      <Select label="Plan" defaultValue="starter">
        <option value="starter">Starter</option>
        <option value="pro">Pro</option>
      </Select>,
    )

    const combobox = screen.getByRole("combobox")
    fireEvent.keyDown(combobox, { key: "ArrowDown" })
    fireEvent.keyDown(combobox, { key: "ArrowDown" })
    fireEvent.keyDown(combobox, { key: "Enter" })

    expect(combobox).toHaveTextContent("Pro")
  })

  it("renders error text and aria-invalid", () => {
    render(
      <Select error="Choose an option">
        <option value="one">One</option>
      </Select>,
    )

    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true")
    expect(screen.getByText("Choose an option")).toBeInTheDocument()
  })

  it("applies disabled state", () => {
    render(
      <Select disabled>
        <option value="one">One</option>
      </Select>,
    )

    expect(screen.getByRole("combobox")).toBeDisabled()
    expect(document.querySelector(".maxa-select__field")).toHaveClass(
      "maxa-select__field--disabled",
    )
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Select label="Dropdown" defaultValue="one">
        <option value="one">One</option>
        <option value="two">Two</option>
      </Select>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
