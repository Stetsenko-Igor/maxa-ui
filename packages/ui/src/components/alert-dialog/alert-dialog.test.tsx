import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { axe } from "vitest-axe"
import { AlertDialog, AlertDialogBody, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./alert-dialog"

describe("AlertDialog", () => {
  it("renders alertdialog role", () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete design</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogBody>
            <p>The selected design will be removed from this package.</p>
          </AlertDialogBody>
          <AlertDialogFooter>
            <AlertDialogCancel inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    )
    fireEvent.click(screen.getByText("Delete"))
    expect(screen.getByRole("alertdialog", { name: "Delete design" })).toBeInTheDocument()
  })

  it("has no accessibility violations when open", async () => {
    // Dialog content renders in a portal, so run axe on baseElement to include it.
    const { baseElement } = render(
      <AlertDialog>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete design</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogBody>
            <p>The selected design will be removed from this package.</p>
          </AlertDialogBody>
          <AlertDialogFooter>
            <AlertDialogCancel inline className="maxa-button maxa-button--secondary maxa-button--md">Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    )
    fireEvent.click(screen.getByText("Delete"))
    expect(screen.getByRole("alertdialog", { name: "Delete design" })).toBeInTheDocument()
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})
