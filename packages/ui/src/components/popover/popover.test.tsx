import { describe, it, expect, beforeAll } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { axe } from "vitest-axe"
import {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

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

function renderPopover() {
  return render(
    <Popover>
      <PopoverTrigger asChild>
        <button type="button">Open filters</button>
      </PopoverTrigger>
      <PopoverContent>
        <p>Filter options</p>
        <PopoverClose>Done</PopoverClose>
      </PopoverContent>
    </Popover>,
  )
}

function openPopover() {
  fireEvent.click(screen.getByRole("button", { name: "Open filters" }))
}

describe("Popover", () => {
  it("renders the trigger", () => {
    renderPopover()
    expect(screen.getByRole("button", { name: "Open filters" })).toBeInTheDocument()
  })

  it("does not render content before interaction", () => {
    renderPopover()
    expect(screen.queryByText("Filter options")).not.toBeInTheDocument()
  })

  it("opens content on trigger click", async () => {
    renderPopover()
    openPopover()
    await waitFor(() => {
      expect(screen.getByText("Filter options")).toBeInTheDocument()
    })
  })

  it("renders the styled content box and arrow on open", async () => {
    const { container } = renderPopover()
    openPopover()
    await waitFor(() => {
      expect(container.ownerDocument.querySelector(".maxa-popover")).not.toBeNull()
    })
    expect(container.ownerDocument.querySelector(".maxa-popover__arrow")).not.toBeNull()
  })

  it("merges custom className onto the content box", async () => {
    const { container } = render(
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <button type="button">Open</button>
        </PopoverTrigger>
        <PopoverContent className="custom-popover">Content</PopoverContent>
      </Popover>,
    )

    await waitFor(() => {
      const content = container.ownerDocument.querySelector(".maxa-popover")
      expect(content).not.toBeNull()
      expect(content).toHaveClass("custom-popover")
    })
  })

  it("can hide the arrow", async () => {
    const { container } = render(
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <button type="button">Open</button>
        </PopoverTrigger>
        <PopoverContent arrow={false}>Content</PopoverContent>
      </Popover>,
    )

    await waitFor(() => {
      expect(container.ownerDocument.querySelector(".maxa-popover")).not.toBeNull()
    })
    expect(container.ownerDocument.querySelector(".maxa-popover__arrow")).toBeNull()
  })

  it("closes via PopoverClose", async () => {
    renderPopover()
    openPopover()
    await waitFor(() => {
      expect(screen.getByText("Filter options")).toBeInTheDocument()
    })
    fireEvent.click(screen.getByRole("button", { name: "Done" }))
    await waitFor(() => {
      expect(screen.queryByText("Filter options")).not.toBeInTheDocument()
    })
  })

  it("forwards ref to the content element", async () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>
    render(
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <button type="button">Open</button>
        </PopoverTrigger>
        <PopoverContent ref={ref}>Content</PopoverContent>
      </Popover>,
    )

    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLElement)
    })
    expect(ref.current).toHaveClass("maxa-popover")
  })

  it("exports PopoverAnchor", () => {
    render(
      <Popover>
        <PopoverAnchor>
          <span>Anchor</span>
        </PopoverAnchor>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    )

    expect(screen.getByText("Anchor")).toBeInTheDocument()
  })

  it("has no a11y violations when closed", async () => {
    const { container } = renderPopover()
    expect(await axe(container)).toHaveNoViolations()
  })
})
