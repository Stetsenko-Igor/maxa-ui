import { describe, it, expect, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Input, TextArea } from "./input"

describe("Input", () => {
  it("renders with default props", () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByRole("textbox")
    expect(input).toBeInTheDocument()
    expect(input.closest(".maxa-input-wrapper")).toHaveClass(
      "maxa-input-wrapper--md",
    )
  })

  it("applies size classes", () => {
    const { rerender } = render(<Input size="sm" />)
    expect(document.querySelector(".maxa-input-wrapper")).toHaveClass(
      "maxa-input-wrapper--sm",
    )

    rerender(<Input size="lg" />)
    expect(document.querySelector(".maxa-input-wrapper")).toHaveClass(
      "maxa-input-wrapper--lg",
    )
  })

  it("applies status classes", () => {
    const { rerender } = render(<Input status="error" />)
    expect(document.querySelector(".maxa-input-wrapper")).toHaveClass(
      "maxa-input-wrapper--error",
    )

    rerender(<Input status="success" />)
    expect(document.querySelector(".maxa-input-wrapper")).toHaveClass(
      "maxa-input-wrapper--success",
    )
  })

  it("applies visual state classes", () => {
    render(<Input visualState="focus" />)
    expect(document.querySelector(".maxa-input-wrapper")).toHaveClass(
      "maxa-input-wrapper--visual-focus",
    )
  })

  it("sets aria-invalid when status is error", () => {
    render(<Input status="error" />)
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
  })

  it("sets aria-invalid and hint text from error prop", () => {
    render(<Input error="Required field" />)
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
    expect(screen.getByText("Required field")).toBeInTheDocument()
  })

  it("is disabled when disabled prop is set", () => {
    render(<Input disabled />)
    const input = screen.getByRole("textbox")
    expect(input).toBeDisabled()
    expect(input.closest(".maxa-input-wrapper")).toHaveClass(
      "maxa-input-wrapper--disabled",
    )
  })

  it("renders label linked to input", () => {
    render(<Input label="Email address" required />)
    const label = screen.getByText("Email address")
    expect(label.tagName).toBe("LABEL")
    const input = screen.getByRole("textbox")
    expect(label).toHaveAttribute("for", input.id)
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  it("renders hint text with aria-describedby", () => {
    render(<Input hint="Must be a valid email" />)
    const hint = screen.getByText("Must be a valid email")
    expect(hint).toBeInTheDocument()
    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("aria-describedby", hint.id)
  })

  it("renders leading and trailing icons", () => {
    render(
      <Input
        leadingIcon={<svg data-testid="lead-icon" />}
        trailingIcon={<svg data-testid="trail-icon" />}
      />,
    )
    expect(screen.getByTestId("lead-icon")).toBeInTheDocument()
    expect(screen.getByTestId("trail-icon")).toBeInTheDocument()
    expect(document.querySelector(".maxa-input__field--has-leading")).toBeInTheDocument()
    expect(document.querySelector(".maxa-input__field--has-trailing")).toBeInTheDocument()
  })

  it("renders search input with search affordance", () => {
    render(<Input kind="search" placeholder="Search" />)
    expect(screen.getByRole("searchbox")).toHaveAttribute("type", "search")
    expect(document.querySelector(".maxa-input__field--search")).toBeInTheDocument()
    expect(document.querySelector(".maxa-input__field--has-leading")).toBeInTheDocument()
  })

  it("renders password input with password affordance", () => {
    render(<Input kind="password" placeholder="Password" />)
    const input = screen.getByPlaceholderText("Password")
    expect(input).toHaveAttribute("type", "password")
    expect(document.querySelector(".maxa-input__field--password")).toBeInTheDocument()
    expect(document.querySelector(".maxa-input__field--has-trailing")).toBeInTheDocument()
  })

  it("renders quantity input with stepper controls", () => {
    render(<Input kind="quantity" defaultValue={1} />)
    expect(screen.getByRole("spinbutton")).toHaveAttribute("type", "number")
    expect(screen.getByRole("button", { name: "Decrease value" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Increase value" })).toBeInTheDocument()
  })

  it("applies readonly state", () => {
    render(<Input readOnly defaultValue="Locked" />)
    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("readonly")
    expect(input).toHaveAttribute("aria-disabled", "true")
    expect(input).toHaveAttribute("tabindex", "-1")
    expect(input.closest(".maxa-input-wrapper")).toHaveClass(
      "maxa-input-wrapper--readonly",
    )
  })

  it("keeps readonly textarea out of the tab order", () => {
    render(<TextArea readOnly defaultValue="Locked" />)
    const textarea = screen.getByRole("textbox")
    expect(textarea).toHaveAttribute("readonly")
    expect(textarea).toHaveAttribute("aria-disabled", "true")
    expect(textarea).toHaveAttribute("tabindex", "-1")
  })

  it("renders textarea with counter", () => {
    render(<TextArea label="Message" defaultValue="Hi" characterCounter maxLength={500} />)
    expect(screen.getByRole("textbox")).toBeInstanceOf(HTMLTextAreaElement)
    expect(screen.getByText("2/500")).toBeInTheDocument()
  })

  it("forwards ref to the input element", () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement | null>
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Input label="Email address" hint="We never share it" />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it("has no a11y violations in dark mode", async () => {
    const { container } = render(
      <div data-theme="dark">
        <Input label="Email address" hint="We never share it" />
      </div>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it("calls onClear when the clear button is clicked", () => {
    const onClear = vi.fn()
    render(<Input defaultValue="abc" onClear={onClear} />)

    fireEvent.click(screen.getByRole("button", { name: "Clear value" }))

    expect(onClear).toHaveBeenCalledTimes(1)
    expect(document.querySelector(".maxa-input__clear")).toBeInTheDocument()
  })

  it("calls stepper callbacks for quantity inputs", () => {
    const onIncrement = vi.fn()
    const onDecrement = vi.fn()
    render(<Input kind="quantity" defaultValue={1} onIncrement={onIncrement} onDecrement={onDecrement} />)

    fireEvent.click(screen.getByRole("button", { name: "Increase value" }))
    fireEvent.click(screen.getByRole("button", { name: "Decrease value" }))

    expect(onIncrement).toHaveBeenCalledTimes(1)
    expect(onDecrement).toHaveBeenCalledTimes(1)
  })

  it("blocks pointer and focus interaction on readonly input", () => {
    const onMouseDown = vi.fn()
    const onFocus = vi.fn()
    render(<Input readOnly defaultValue="Locked" onMouseDown={onMouseDown} onFocus={onFocus} />)
    const input = screen.getByRole("textbox")

    fireEvent.mouseDown(input)
    fireEvent.focus(input)

    expect(onMouseDown).toHaveBeenCalledTimes(1)
    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(input).not.toHaveFocus()
  })

  it("forwards mousedown and focus when editable", () => {
    const onMouseDown = vi.fn()
    const onFocus = vi.fn()
    render(<Input onMouseDown={onMouseDown} onFocus={onFocus} />)
    const input = screen.getByRole("textbox")

    fireEvent.mouseDown(input)
    fireEvent.focus(input)

    expect(onMouseDown).toHaveBeenCalledTimes(1)
    expect(onFocus).toHaveBeenCalledTimes(1)
  })

  it("blocks pointer and focus interaction on readonly textarea", () => {
    const onMouseDown = vi.fn()
    const onFocus = vi.fn()
    render(<TextArea readOnly defaultValue="Locked" onMouseDown={onMouseDown} onFocus={onFocus} />)
    const textarea = screen.getByRole("textbox")

    fireEvent.mouseDown(textarea)
    fireEvent.focus(textarea)

    expect(onMouseDown).toHaveBeenCalledTimes(1)
    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(textarea).not.toHaveFocus()
  })

  it("forwards mousedown and focus on editable textarea", () => {
    const onMouseDown = vi.fn()
    const onFocus = vi.fn()
    render(<TextArea onMouseDown={onMouseDown} onFocus={onFocus} />)
    const textarea = screen.getByRole("textbox")

    fireEvent.mouseDown(textarea)
    fireEvent.focus(textarea)

    expect(onMouseDown).toHaveBeenCalledTimes(1)
    expect(onFocus).toHaveBeenCalledTimes(1)
  })

  it("marks controlled inputs with a value as filled", () => {
    render(<Input value="hello" onChange={() => {}} />)
    expect(document.querySelector(".maxa-input-wrapper")).toHaveClass(
      "maxa-input-wrapper--filled",
    )
  })

  it("renders textarea error state with alert role", () => {
    render(<TextArea error="Too long" />)
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
    expect(screen.getByRole("alert")).toHaveTextContent("Too long")
  })

  it("renders disabled textarea with disabled wrapper class", () => {
    render(<TextArea label="Notes" disabled />)
    expect(screen.getByRole("textbox")).toBeDisabled()
    expect(document.querySelector(".maxa-input-wrapper")).toHaveClass(
      "maxa-input-wrapper--disabled",
    )
  })

  it("counts controlled textarea characters", () => {
    render(<TextArea value="hello" onChange={() => {}} characterCounter maxLength={10} />)
    expect(screen.getByText("5/10")).toBeInTheDocument()
  })
})
