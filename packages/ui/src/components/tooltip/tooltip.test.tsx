import { describe, it, expect, beforeAll, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Tooltip, TooltipProvider } from "./tooltip"

// Radix Tooltip Content relies on ResizeObserver, which jsdom does not provide.
// Polyfill a no-op implementation so the portaled content can mount in tests.
beforeAll(() => {
  if (!("ResizeObserver" in globalThis)) {
    class ResizeObserverStub {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    // @ts-expect-error — assigning a test-only polyfill onto the global
    globalThis.ResizeObserver = ResizeObserverStub
  }
})

function renderTooltip(props?: Partial<React.ComponentProps<typeof Tooltip>>) {
  return render(
    <TooltipProvider delayDuration={0}>
      <Tooltip content="Copy to clipboard" {...props}>
        <button type="button">Copy</button>
      </Tooltip>
    </TooltipProvider>,
  )
}

// Radix opens the tooltip on focus of the trigger; in jsdom this is the most
// reliable open path (pointer hover relies on layout that jsdom does not run).
function openViaFocus() {
  fireEvent.focus(screen.getByRole("button", { name: "Copy" }))
}

describe("Tooltip", () => {
  it("renders the trigger", () => {
    renderTooltip()
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument()
  })

  it("does not render content before interaction", () => {
    renderTooltip()
    expect(screen.queryByText("Copy to clipboard")).not.toBeInTheDocument()
  })

  it("shows content on focus with role tooltip and correct text", async () => {
    renderTooltip()
    openViaFocus()
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument()
    })
    expect(screen.getByRole("tooltip")).toHaveTextContent("Copy to clipboard")
  })

  it("renders the styled content box on open", async () => {
    const { container } = renderTooltip()
    openViaFocus()
    await waitFor(() => {
      expect(container.ownerDocument.querySelector(".maxa-tooltip")).not.toBeNull()
    })
    const box = container.ownerDocument.querySelector(".maxa-tooltip")
    expect(box).toHaveTextContent("Copy to clipboard")
  })

  it("renders the arrow element on open", async () => {
    const { container } = renderTooltip()
    openViaFocus()
    await waitFor(() => {
      expect(
        container.ownerDocument.querySelector(".maxa-tooltip__arrow"),
      ).not.toBeNull()
    })
  })

  it("merges a custom className onto the content box", async () => {
    const { container } = renderTooltip({ className: "my-custom" })
    openViaFocus()
    await waitFor(() => {
      const tip = container.ownerDocument.querySelector(".maxa-tooltip")
      expect(tip).not.toBeNull()
      expect(tip).toHaveClass("my-custom")
    })
  })

  it("supports defaultOpen", async () => {
    renderTooltip({ defaultOpen: true })

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toHaveTextContent("Copy to clipboard")
    })
  })

  it("supports controlled open state", async () => {
    const onOpenChange = vi.fn()
    renderTooltip({ open: true, onOpenChange })

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toHaveTextContent("Copy to clipboard")
    })

    fireEvent.keyDown(screen.getByRole("button", { name: "Copy" }), { key: "Escape" })
    expect(onOpenChange).toHaveBeenCalled()
  })

  it("forwards ref to the content element", async () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip content="Hello" ref={ref}>
          <button type="button">Trigger</button>
        </Tooltip>
      </TooltipProvider>,
    )
    fireEvent.focus(screen.getByRole("button", { name: "Trigger" }))
    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLElement)
    })
    expect(ref.current).toHaveClass("maxa-tooltip")
  })

  it("has no a11y violations", async () => {
    const { container } = render(
      <TooltipProvider>
        <Tooltip content="Copy to clipboard">
          <button type="button">Copy</button>
        </Tooltip>
      </TooltipProvider>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
