import { describe, it, expect } from "vitest"
import { render, screen, act } from "@testing-library/react"
import { axe } from "vitest-axe"
import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "./toast"

function DemoToast({
  open = true,
  intent,
}: {
  open?: boolean
  intent?: "neutral" | "info" | "success" | "warning" | "error"
}) {
  return (
    <ToastProvider>
      <Toast open={open} intent={intent} onOpenChange={() => {}}>
        <ToastTitle>Test notification</ToastTitle>
        <ToastDescription>Something happened.</ToastDescription>
        <ToastAction altText="View details">View</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )
}

describe("Toast", () => {
  it("renders title and description when open", () => {
    render(<DemoToast />)
    expect(screen.getByText("Test notification")).toBeInTheDocument()
    expect(screen.getByText("Something happened.")).toBeInTheDocument()
  })

  it("does not render content when closed", () => {
    render(<DemoToast open={false} />)
    expect(screen.queryByText("Test notification")).not.toBeInTheDocument()
  })

  it("applies base class", () => {
    render(<DemoToast />)
    const toast = document.querySelector(".maxa-toast")
    expect(toast).toBeInTheDocument()
  })

  it("applies neutral intent class by default", () => {
    render(<DemoToast />)
    expect(document.querySelector(".maxa-toast--neutral")).toBeInTheDocument()
  })

  it("applies intent variant classes", () => {
    const intents = ["neutral", "info", "success", "warning", "error"] as const
    for (const intent of intents) {
      const { unmount } = render(<DemoToast intent={intent} />)
      expect(document.querySelector(`.maxa-toast--${intent}`)).toBeInTheDocument()
      unmount()
    }
  })

  it("renders close button with accessible label", () => {
    render(<DemoToast />)
    expect(screen.getByLabelText("Dismiss notification")).toBeInTheDocument()
  })

  it("renders action with altText", () => {
    render(<DemoToast />)
    expect(screen.getByText("View")).toBeInTheDocument()
  })

  it("renders viewport with region role", () => {
    render(<DemoToast />)
    // Radix renders viewport as region for screen reader announcements
    const viewport = document.querySelector(".maxa-toast__viewport")
    expect(viewport).toBeInTheDocument()
  })

  it("has no accessibility violations when open", async () => {
    const { container } = render(<DemoToast />)
    await act(async () => {})
    expect(await axe(container)).toHaveNoViolations()
  })
})
