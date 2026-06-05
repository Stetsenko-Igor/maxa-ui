import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./context-menu"

describe("ContextMenu", () => {
  it("opens on context menu", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click target</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Open</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    )
    fireEvent.contextMenu(screen.getByText("Right click target"), { clientX: 10, clientY: 10 })
    expect(screen.getByRole("menu")).toBeInTheDocument()
    expect(screen.getByRole("menuitem", { name: "Open" })).toBeInTheDocument()
  })

  it("opens from keyboard and closes on Escape", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Keyboard target</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Open</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    )
    fireEvent.keyDown(screen.getByText("Keyboard target"), { key: "Enter" })
    expect(screen.getByRole("menu")).toBeInTheDocument()
    fireEvent.keyDown(window, { key: "Escape" })
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
  })
})
