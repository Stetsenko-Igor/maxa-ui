import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Alert } from "./alert"

describe("Alert", () => {
  it("renders children", () => {
    render(<Alert>Something happened</Alert>)
    expect(screen.getByText("Something happened")).toBeInTheDocument()
  })

  it("applies default intent=info", () => {
    render(<Alert>Default</Alert>)
    const el = document.querySelector(".maxa-alert")
    expect(el).toHaveClass("maxa-alert--info")
  })

  it("applies intent classes", () => {
    const intents = ["info", "success", "warning", "danger"] as const
    intents.forEach((intent) => {
      const { unmount } = render(<Alert intent={intent}>X</Alert>)
      expect(document.querySelector(".maxa-alert")).toHaveClass(
        `maxa-alert--${intent}`,
      )
      unmount()
    })
  })

  it("renders the title", () => {
    render(<Alert title="Heads up">Body text</Alert>)
    expect(screen.getByText("Heads up")).toHaveClass("maxa-alert__title")
  })

  it("renders a default decorative icon", () => {
    render(<Alert>Body</Alert>)
    const icon = document.querySelector(".maxa-alert__icon")
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute("aria-hidden", "true")
  })

  it("renders a custom icon when provided", () => {
    render(<Alert icon={<svg data-testid="custom-icon" />}>Body</Alert>)
    expect(screen.getByTestId("custom-icon").parentElement).toHaveClass(
      "maxa-alert__icon",
    )
  })

  it("uses role=status for info and success", () => {
    const { rerender } = render(<Alert intent="info">Info</Alert>)
    expect(document.querySelector(".maxa-alert")).toHaveAttribute(
      "role",
      "status",
    )
    rerender(<Alert intent="success">Success</Alert>)
    expect(document.querySelector(".maxa-alert")).toHaveAttribute(
      "role",
      "status",
    )
  })

  it("uses role=alert for warning and danger", () => {
    const { rerender } = render(<Alert intent="warning">Warn</Alert>)
    expect(document.querySelector(".maxa-alert")).toHaveAttribute(
      "role",
      "alert",
    )
    rerender(<Alert intent="danger">Danger</Alert>)
    expect(document.querySelector(".maxa-alert")).toHaveAttribute(
      "role",
      "alert",
    )
  })

  it("sets aria-live=assertive for alert role and polite for status role", () => {
    const { rerender } = render(<Alert intent="danger">D</Alert>)
    expect(document.querySelector(".maxa-alert")).toHaveAttribute(
      "aria-live",
      "assertive",
    )
    rerender(<Alert intent="info">I</Alert>)
    expect(document.querySelector(".maxa-alert")).toHaveAttribute(
      "aria-live",
      "polite",
    )
  })

  it("honors a role override", () => {
    render(
      <Alert intent="danger" role="status">
        Override
      </Alert>,
    )
    expect(document.querySelector(".maxa-alert")).toHaveAttribute(
      "role",
      "status",
    )
  })

  it("does not render dismiss button by default", () => {
    render(<Alert>No dismiss</Alert>)
    expect(document.querySelector(".maxa-alert__dismiss")).toBeNull()
  })

  it("renders dismiss button with aria-label when dismissible", () => {
    render(<Alert dismissible>Dismissible</Alert>)
    const btn = screen.getByRole("button", { name: "Dismiss" })
    expect(btn).toHaveClass("maxa-alert__dismiss")
  })

  it("fires onDismiss when dismiss button clicked", () => {
    const onDismiss = vi.fn()
    render(
      <Alert dismissible onDismiss={onDismiss}>
        Dismissible
      </Alert>,
    )
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it("dismiss button stops propagation", () => {
    const parentClick = vi.fn()
    const onDismiss = vi.fn()
    render(
      <div onClick={parentClick}>
        <Alert dismissible onDismiss={onDismiss}>
          Body
        </Alert>
      </div>,
    )
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }))
    expect(onDismiss).toHaveBeenCalled()
    expect(parentClick).not.toHaveBeenCalled()
  })

  it("forwards ref", () => {
    let node: HTMLDivElement | null = null
    render(<Alert ref={(el) => { node = el }}>Body</Alert>)
    expect(node).not.toBeNull()
    expect(node).toHaveClass("maxa-alert")
  })

  it("merges custom className", () => {
    render(<Alert className="custom">X</Alert>)
    expect(document.querySelector(".maxa-alert")).toHaveClass("custom")
  })

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Alert intent="success" title="Saved" dismissible>
        Your changes have been saved.
      </Alert>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
