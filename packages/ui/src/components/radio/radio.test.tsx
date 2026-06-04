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

  it("uses the single md visual size", () => {
    render(<Radio name="test" />)
    expect(document.querySelector(".maxa-radio")).toHaveClass("maxa-radio")
    expect(document.querySelector(".maxa-radio")).not.toHaveClass("maxa-radio--sm")
    expect(document.querySelector(".maxa-radio")).not.toHaveClass("maxa-radio--lg")
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

  it("renders built-in top label, side label, and description", () => {
    render(
      <Radio
        name="test"
        label="Plan"
        sideLabel="Pro"
        description="Best for growing teams."
      />,
    )

    const radio = screen.getByRole("radio", { name: "Plan Pro" })
    expect(radio).toHaveAccessibleDescription("Best for growing teams.")
    expect(screen.getByText("Plan")).toHaveClass("maxa-radio__top-label")
    expect(screen.getByText("Pro")).toHaveClass("maxa-radio__side-label")
    expect(screen.getByText("Best for growing teams.")).toHaveClass("maxa-radio__description")
  })

  it("uses children as the side label and keeps helperText as a description alias", () => {
    render(<Radio name="test" label="Plan" helperText="Select one option">Option A</Radio>)
    expect(screen.getByRole("radio", { name: "Plan Option A" })).toHaveAccessibleDescription(
      "Select one option",
    )
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
    render(<Radio id="opt-a" name="test" sideLabel="Option A" />)
    expect(document.querySelector("label.maxa-radio")).toHaveAttribute("for", "opt-a")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Radio name="test" label="Plan" sideLabel="Option A" description="Select one option." />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
