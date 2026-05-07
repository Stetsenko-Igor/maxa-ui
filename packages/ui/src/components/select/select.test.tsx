import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { Select } from "./select"

describe("Select", () => {
  it("renders a labeled select field", () => {
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
    expect(screen.getByText("Dropdown")).toHaveAttribute("for", select.id)
  })

  it("renders error text and aria-invalid", () => {
    render(
      <Select error="Choose an option">
        <option>One</option>
      </Select>,
    )

    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true")
    expect(screen.getByText("Choose an option")).toBeInTheDocument()
  })

  it("applies disabled state", () => {
    render(
      <Select disabled>
        <option>One</option>
      </Select>,
    )

    expect(screen.getByRole("combobox")).toBeDisabled()
    expect(document.querySelector(".maxa-select__field")).toHaveClass(
      "maxa-select__field--disabled",
    )
  })
})
