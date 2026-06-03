import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Radio } from "./radio"

describe("Radio", () => {
  it("renders unchecked by default", () => {
    render(<Radio name="test" />)
    expect(screen.getByRole("radio")).not.toBeChecked()
  })

  it("renders checked", () => {
    render(<Radio name="test" checked onChange={() => {}} />)
    expect(screen.getByRole("radio")).toBeChecked()
  })

  it("applies size class md by default", () => {
    render(<Radio name="test" />)
    expect(document.querySelector(".maxa-radio")).toHaveClass("maxa-radio--md")
  })

  it("applies size class sm", () => {
    render(<Radio name="test" size="sm" />)
    expect(document.querySelector(".maxa-radio")).toHaveClass("maxa-radio--sm")
  })

  it("applies error class and aria-invalid", () => {
    render(<Radio name="test" error />)
    expect(document.querySelector(".maxa-radio")).toHaveClass("maxa-radio--error")
    expect(screen.getByRole("radio")).toHaveAttribute("aria-invalid", "true")
  })

  it("is disabled when disabled prop is set", () => {
    render(<Radio name="test" disabled />)
    expect(screen.getByRole("radio")).toBeDisabled()
    expect(document.querySelector(".maxa-radio")).toHaveClass("maxa-radio--disabled")
  })

  it("renders label text", () => {
    render(<Radio name="test" label="Option A" />)
    expect(screen.getByText("Option A")).toBeInTheDocument()
  })

  it("renders helper text", () => {
    render(<Radio name="test" helperText="Select one option" />)
    expect(screen.getByText("Select one option")).toBeInTheDocument()
  })

  it("calls onChange when clicked", () => {
    const handler = vi.fn()
    render(<Radio name="test" onChange={handler} />)
    fireEvent.click(screen.getByRole("radio"))
    expect(handler).toHaveBeenCalled()
  })

  it("forwards ref to input element", () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement | null>
    render(<Radio name="test" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it("links label to input via htmlFor", () => {
    render(<Radio id="opt-a" name="test" label="Option A" />)
    expect(document.querySelector("label.maxa-radio")).toHaveAttribute("for", "opt-a")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(<Radio name="test" label="Option A" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
