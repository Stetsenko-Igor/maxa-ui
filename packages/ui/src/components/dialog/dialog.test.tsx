import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { Button } from "../button"
import { Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"

function DemoDialog() {
  return (
    <Dialog>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share package</DialogTitle>
          <DialogDescription>Invite teammates to review this package.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p>Confirm access before sharing the package with teammates.</p>
        </DialogBody>
        <DialogFooter>
          <DialogClose inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</DialogClose>
          <Button>Share</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

describe("Dialog", () => {
  it("opens and closes", () => {
    render(<DemoDialog />)
    fireEvent.click(screen.getByText("Open dialog"))
    expect(screen.getByRole("dialog", { name: "Share package" })).toBeInTheDocument()
    fireEvent.click(screen.getByText("Cancel"))
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("has no accessibility violations when open", async () => {
    const { container } = render(<DemoDialog />)
    fireEvent.click(screen.getByText("Open dialog"))
    expect(await axe(container)).toHaveNoViolations()
  })
})
