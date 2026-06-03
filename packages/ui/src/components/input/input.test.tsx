import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
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
})
