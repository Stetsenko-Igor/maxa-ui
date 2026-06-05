import { describe, it, expect, beforeAll, vi } from "vitest"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { axe } from "vitest-axe"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu"

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

function renderMenu(onRequest = vi.fn()) {
  return render(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button">Request</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Request</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={onRequest}>Request Design</DropdownMenuItem>
          <DropdownMenuItem disabled>Template Requests</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Cancel request</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>,
  )
}

function openMenu() {
  fireEvent.pointerDown(screen.getByRole("button", { name: "Request" }), {
    button: 0,
    ctrlKey: false,
  })
}

describe("DropdownMenu", () => {
  it("renders the trigger", () => {
    renderMenu()
    expect(screen.getByRole("button", { name: "Request" })).toBeInTheDocument()
  })

  it("does not render menu content before interaction", () => {
    renderMenu()
    expect(screen.queryByText("Request Design")).not.toBeInTheDocument()
  })

  it("opens menu content on trigger click", async () => {
    renderMenu()
    openMenu()
    await waitFor(() => {
      expect(screen.getByText("Request Design")).toBeInTheDocument()
    })
  })

  it("renders styled content, item, label, separator, and destructive item", async () => {
    const { container } = renderMenu()
    openMenu()
    await waitFor(() => {
      expect(container.ownerDocument.querySelector(".maxa-dropdown-menu")).not.toBeNull()
    })
    expect(container.ownerDocument.querySelector(".maxa-dropdown-menu__item")).not.toBeNull()
    expect(container.ownerDocument.querySelector(".maxa-dropdown-menu__label")).not.toBeNull()
    expect(container.ownerDocument.querySelector(".maxa-dropdown-menu__separator")).not.toBeNull()
    expect(screen.getByText("Cancel request")).toHaveClass(
      "maxa-dropdown-menu__item--destructive",
    )
  })

  it("merges custom className onto content and item", async () => {
    const { container } = render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <button type="button">Open</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="custom-menu">
          <DropdownMenuItem className="custom-item">Action</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    await waitFor(() => {
      const content = container.ownerDocument.querySelector(".maxa-dropdown-menu")
      expect(content).not.toBeNull()
      expect(content).toHaveClass("custom-menu")
    })
    expect(screen.getByText("Action")).toHaveClass("custom-item")
  })

  it("calls onSelect when an enabled item is selected", async () => {
    const onRequest = vi.fn()
    renderMenu(onRequest)
    openMenu()
    fireEvent.click(await screen.findByText("Request Design"))
    expect(onRequest).toHaveBeenCalledTimes(1)
  })

  it("renders shortcuts", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <button type="button">Open</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Print
            <DropdownMenuShortcut>Cmd+P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    expect(await screen.findByText("Cmd+P")).toHaveClass("maxa-dropdown-menu__shortcut")
  })

  it("renders checkbox and radio menu items", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <button type="button">Open</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>Show archived</DropdownMenuCheckboxItem>
          <DropdownMenuRadioGroup value="pdf">
            <DropdownMenuRadioItem value="pdf">PDF</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="png">PNG</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    expect(await screen.findByText("Show archived")).toBeInTheDocument()
    expect(screen.getByText("Show archived")).toHaveClass("maxa-dropdown-menu__item--checkbox")
    expect(screen.getByText("PDF")).toBeInTheDocument()
    expect(screen.getByText("PDF")).toHaveClass("maxa-dropdown-menu__item--radio")
  })

  it("renders submenu trigger and content", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <button type="button">Open</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Email</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>,
    )

    expect(await screen.findByText("Share")).toBeInTheDocument()
  })

  it("forwards ref to the content element", async () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <button type="button">Open</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent ref={ref}>Content</DropdownMenuContent>
      </DropdownMenu>,
    )

    await waitFor(() => {
      expect(ref.current).toBeInstanceOf(HTMLElement)
    })
    expect(ref.current).toHaveClass("maxa-dropdown-menu")
  })

  it("has no a11y violations when closed", async () => {
    const { container } = renderMenu()
    expect(await axe(container)).toHaveNoViolations()
  })
})
