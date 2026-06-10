import { describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Button } from "../button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer"

function DemoDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Package settings</DrawerTitle>
          <DrawerDescription>Update package metadata and visibility.</DrawerDescription>
          <DrawerClose aria-label="Close" />
        </DrawerHeader>
        <DrawerBody>
          <button type="button">First action</button>
          <button type="button">Last action</button>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</DrawerClose>
          <Button>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

describe("Drawer", () => {
  it("opens and closes", () => {
    render(<DemoDrawer />)
    fireEvent.click(screen.getByText("Open drawer"))
    expect(screen.getByRole("dialog", { name: "Package settings" })).toBeInTheDocument()
    fireEvent.click(screen.getByText("Cancel"))
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("closes with Escape and returns focus to the trigger", () => {
    render(<DemoDrawer />)
    const trigger = screen.getByText("Open drawer")

    trigger.focus()
    fireEvent.click(trigger)
    const drawer = screen.getByRole("dialog", { name: "Package settings" })
    fireEvent.keyDown(drawer, { key: "Escape" })

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it("supports controlled open state", () => {
    const onOpenChange = vi.fn()
    render(
      <Drawer open onOpenChange={onOpenChange}>
        <DrawerContent side="left" size="lg">
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>Choose visible fields.</DrawerDescription>
        </DrawerContent>
      </Drawer>,
    )

    const drawer = screen.getByRole("dialog", { name: "Filters" })
    expect(drawer).toHaveAttribute("data-side", "left")
    expect(drawer).toHaveAttribute("data-size", "lg")

    fireEvent.keyDown(drawer, { key: "Escape" })
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(screen.getByRole("dialog", { name: "Filters" })).toBeInTheDocument()
  })

  it("traps focus inside the drawer", () => {
    render(<DemoDrawer />)
    fireEvent.click(screen.getByText("Open drawer"))

    const drawer = screen.getByRole("dialog", { name: "Package settings" })
    const close = screen.getByLabelText("Close")
    const save = screen.getByRole("button", { name: "Save" })

    close.focus()
    fireEvent.keyDown(drawer, { key: "Tab", shiftKey: true })
    expect(save).toHaveFocus()

    fireEvent.keyDown(drawer, { key: "Tab" })
    expect(close).toHaveFocus()
  })

  it("has no accessibility violations when open", async () => {
    const { container } = render(<DemoDrawer />)
    fireEvent.click(screen.getByText("Open drawer"))
    expect(await axe(container)).toHaveNoViolations()
  })
})
