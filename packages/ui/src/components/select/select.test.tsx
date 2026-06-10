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

  it("supports Home, End, Escape and Space keys with an options array", () => {
    const options = [
      { label: "Alpha", value: "alpha" },
      { label: "Beta", value: "beta" },
      { label: "Gamma", value: "gamma" },
    ]
    render(<Select label="Letter" options={options} />)
    const combobox = screen.getByRole("combobox")

    fireEvent.click(combobox)
    expect(screen.getByRole("listbox")).toBeInTheDocument()

    fireEvent.keyDown(combobox, { key: "End" })
    expect(screen.getByRole("option", { name: "Gamma" })).toHaveClass(
      "maxa-select__option--highlighted",
    )

    fireEvent.keyDown(combobox, { key: "Escape" })
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()

    fireEvent.keyDown(combobox, { key: " " })
    expect(screen.getByRole("listbox")).toBeInTheDocument()

    fireEvent.keyDown(combobox, { key: "Home" })
    fireEvent.keyDown(combobox, { key: "Enter" })

    expect(combobox).toHaveTextContent("Alpha")
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("wraps highlight with ArrowUp", () => {
    render(
      <Select label="Plan" defaultValue="starter">
        <option value="starter">Starter</option>
        <option value="pro">Pro</option>
      </Select>,
    )
    const combobox = screen.getByRole("combobox")

    fireEvent.click(combobox)
    fireEvent.keyDown(combobox, { key: "ArrowUp" })
    expect(screen.getByRole("option", { name: "Pro" })).toHaveClass(
      "maxa-select__option--highlighted",
    )
    fireEvent.keyDown(combobox, { key: "Enter" })
    expect(combobox).toHaveTextContent("Pro")
  })

  it("ignores clicks on disabled options", () => {
    const onValueChange = vi.fn()
    render(
      <Select
        label="Tier"
        defaultValue="free"
        onValueChange={onValueChange}
        options={[
          { label: "Free", value: "free" },
          { label: "Enterprise", value: "enterprise", disabled: true },
        ]}
      />,
    )

    fireEvent.click(screen.getByRole("combobox"))
    const disabledOption = screen.getByRole("option", { name: "Enterprise" })
    expect(disabledOption).toHaveAttribute("aria-disabled", "true")

    fireEvent.click(disabledOption)
    expect(onValueChange).not.toHaveBeenCalled()
    expect(screen.getByRole("listbox")).toBeInTheDocument()
  })

  it("closes when pointing down outside", () => {
    render(
      <Select label="Plan" defaultOpen>
        <option value="one">One</option>
      </Select>,
    )

    expect(screen.getByRole("listbox")).toBeInTheDocument()
    fireEvent.pointerDown(document.body)
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })

  it("highlights options on mouse enter", () => {
    render(
      <Select label="Plan" defaultOpen defaultValue="one">
        <option value="one">One</option>
        <option value="two">Two</option>
      </Select>,
    )

    fireEvent.mouseEnter(screen.getByRole("option", { name: "Two" }))
    expect(screen.getByRole("option", { name: "Two" })).toHaveClass(
      "maxa-select__option--highlighted",
    )
  })

  it("keeps a controlled value and reports changes", () => {
    const onValueChange = vi.fn()
    render(
      <Select label="Plan" value="two" onValueChange={onValueChange}>
        <option value="one">One</option>
        <option value="two">Two</option>
      </Select>,
    )
    const combobox = screen.getByRole("combobox")

    fireEvent.click(combobox)
    fireEvent.click(screen.getByRole("option", { name: "One" }))

    expect(onValueChange).toHaveBeenCalledWith("one")
    expect(combobox).toHaveTextContent("Two")
  })

  it("forwards focus, blur and keydown handlers", () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const onKeyDown = vi.fn((event: React.KeyboardEvent<HTMLSelectElement>) => {
      if (event.key === "ArrowDown") event.preventDefault()
    })
    render(
      <Select label="Plan" onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown}>
        <option value="one">One</option>
      </Select>,
    )
    const combobox = screen.getByRole("combobox")

    fireEvent.focus(combobox)
    fireEvent.blur(combobox)
    fireEvent.keyDown(combobox, { key: "ArrowDown" })

    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(onBlur).toHaveBeenCalledTimes(1)
    expect(onKeyDown).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })
})
