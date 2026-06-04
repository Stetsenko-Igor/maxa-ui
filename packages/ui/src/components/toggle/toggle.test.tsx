import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Toggle } from "./toggle"

describe("Toggle", () => {
  it("renders with role switch", () => {
    render(<Toggle aria-label="Notifications" />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
  })

  it("is unchecked by default", () => {
    render(<Toggle aria-label="Notifications" />)
    expect(screen.getByRole("switch")).not.toBeChecked()
  })

  it("renders with defaultChecked", () => {
    render(<Toggle aria-label="Notifications" defaultChecked />)
    expect(screen.getByRole("switch")).toBeChecked()
  })

  it("toggles on click", () => {
    const handler = vi.fn()
    render(<Toggle aria-label="Notifications" onCheckedChange={handler} />)
    const toggle = screen.getByRole("switch")
    fireEvent.click(toggle)
    expect(handler).toHaveBeenCalledWith(true)
    expect(toggle).toBeChecked()
  })

  it("renders controlled checked state", () => {
    render(<Toggle aria-label="Notifications" checked onCheckedChange={() => {}} />)
    expect(screen.getByRole("switch")).toBeChecked()
  })

  it("uses the single md visual size", () => {
    render(<Toggle aria-label="Notifications" />)
    expect(screen.getByRole("switch")).toHaveClass("maxa-toggle")
    expect(screen.getByRole("switch")).not.toHaveClass("maxa-toggle--sm")
    expect(screen.getByRole("switch")).not.toHaveClass("maxa-toggle--lg")
  })

  it("renders built-in top label, side label, and description", () => {
    render(
      <Toggle
        label="Notifications"
        sideLabel="Email updates"
        description="Receive product and billing messages."
      />,
    )

    const toggle = screen.getByRole("switch", { name: "Notifications Email updates" })
    expect(toggle).toHaveAccessibleDescription("Receive product and billing messages.")
    expect(screen.getByText("Notifications")).toHaveClass("maxa-toggle-field__label")
    expect(screen.getByText("Email updates")).toHaveClass("maxa-toggle-field__side-label")
    expect(screen.getByText("Receive product and billing messages.")).toHaveClass(
      "maxa-toggle-field__description",
    )
  })

  it("uses children as the side label", () => {
    render(<Toggle label="Privacy">Show online status</Toggle>)
    expect(screen.getByRole("switch", { name: "Privacy Show online status" })).toBeInTheDocument()
  })

  it("preserves explicit aria-label over generated visible labels", () => {
    render(<Toggle aria-label="Custom name" label="Visible label" sideLabel="Visible side label" />)
    expect(screen.getByRole("switch", { name: "Custom name" })).toBeInTheDocument()
  })

  it("is disabled when disabled prop is set", () => {
    const handler = vi.fn()
    render(<Toggle aria-label="Notifications" disabled onCheckedChange={handler} />)
    const toggle = screen.getByRole("switch")
    expect(toggle).toBeDisabled()
    fireEvent.click(toggle)
    expect(handler).not.toHaveBeenCalled()
  })

  it("applies error state via data-error and aria-invalid", () => {
    render(<Toggle aria-label="Notifications" error />)
    const toggle = screen.getByRole("switch")
    expect(toggle).toHaveAttribute("data-error")
    expect(toggle).toHaveAttribute("aria-invalid", "true")
  })

  it("forwards ref to the underlying button element", () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement | null>
    render(<Toggle aria-label="Notifications" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it("has no a11y violations", async () => {
    const { container } = render(
      <Toggle label="Notifications" sideLabel="Email updates" description="Optional notices." />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
