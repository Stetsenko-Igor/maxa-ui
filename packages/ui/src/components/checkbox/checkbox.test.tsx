import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { axe } from "vitest-axe"
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

  it("uses the single md visual size", () => {
    render(<Checkbox />)
    expect(document.querySelector(".maxa-checkbox")).toHaveClass("maxa-checkbox")
    expect(document.querySelector(".maxa-checkbox")).not.toHaveClass("maxa-checkbox--sm")
    expect(document.querySelector(".maxa-checkbox")).not.toHaveClass("maxa-checkbox--lg")
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

  it("renders built-in top label, side label, and description", () => {
    render(
      <Checkbox
        label="Permissions"
        sideLabel="Accept terms"
        description="Required to continue."
      />,
    )

    const checkbox = screen.getByRole("checkbox", { name: "Permissions Accept terms" })
    expect(checkbox).toHaveAccessibleDescription("Required to continue.")
    expect(screen.getByText("Permissions")).toHaveClass("maxa-checkbox__top-label")
    expect(screen.getByText("Accept terms")).toHaveClass("maxa-checkbox__side-label")
    expect(screen.getByText("Required to continue.")).toHaveClass("maxa-checkbox__description")
  })

  it("uses children as the side label and keeps helperText as a description alias", () => {
    render(<Checkbox label="Permissions" helperText="Required to continue">Accept terms</Checkbox>)
    expect(screen.getByRole("checkbox", { name: "Permissions Accept terms" })).toHaveAccessibleDescription(
      "Required to continue",
    )
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
    render(<Checkbox id="tos" sideLabel="Terms of service" />)
    const label = document.querySelector("label.maxa-checkbox")
    expect(label).toHaveAttribute("for", "tos")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Checkbox label="Permissions" sideLabel="Accept terms" description="Required to continue." />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
