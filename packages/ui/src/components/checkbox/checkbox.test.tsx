import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Checkbox } from "./checkbox"

describe("Checkbox", () => {
  it("renders unchecked by default", () => {
    render(<Checkbox />)
    expect(screen.getByRole("checkbox")).not.toBeChecked()
  })

  it("renders with defaultChecked", () => {
    render(<Checkbox defaultChecked />)
    expect(screen.getByRole("checkbox")).toBeChecked()
  })

  it("renders controlled checked state", () => {
    render(<Checkbox checked={true} onCheckedChange={() => {}} />)
    expect(screen.getByRole("checkbox")).toBeChecked()
  })

  it("applies size class md by default", () => {
    render(<Checkbox />)
    expect(document.querySelector(".maxa-checkbox")).toHaveClass("maxa-checkbox--md")
  })

  it("applies size class sm", () => {
    render(<Checkbox size="sm" />)
    expect(document.querySelector(".maxa-checkbox")).toHaveClass("maxa-checkbox--sm")
  })

  it("applies error class and aria-invalid", () => {
    render(<Checkbox error />)
    expect(document.querySelector(".maxa-checkbox")).toHaveClass("maxa-checkbox--error")
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true")
  })

  it("is disabled when disabled prop is set", () => {
    render(<Checkbox disabled />)
    expect(screen.getByRole("checkbox")).toBeDisabled()
    expect(document.querySelector(".maxa-checkbox")).toHaveClass("maxa-checkbox--disabled")
  })

  it("renders label text", () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByText("Accept terms")).toBeInTheDocument()
  })

  it("renders helper text", () => {
    render(<Checkbox helperText="Required to continue" />)
    expect(screen.getByText("Required to continue")).toBeInTheDocument()
  })

  it("calls onCheckedChange when clicked", () => {
    const handler = vi.fn()
    render(<Checkbox onCheckedChange={handler} />)
    fireEvent.click(screen.getByRole("checkbox"))
    expect(handler).toHaveBeenCalledWith(true)
  })

  it("sets aria-checked=mixed for indeterminate", () => {
    render(<Checkbox checked="indeterminate" onCheckedChange={() => {}} />)
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed")
  })

  it("forwards ref to input element", () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement | null>
    render(<Checkbox ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it("links label to input via htmlFor", () => {
    render(<Checkbox id="tos" label="Terms of service" />)
    const label = document.querySelector("label.maxa-checkbox")
    expect(label).toHaveAttribute("for", "tos")
  })
})
