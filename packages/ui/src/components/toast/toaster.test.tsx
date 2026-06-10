import { describe, it, expect } from "vitest"
import { act, fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react"
import { Toaster } from "./toaster"
import { ToastAction } from "./toast"
import { useToast } from "./use-toast"

async function flushToasts(result: { current: ReturnType<typeof useToast> }) {
  act(() => {
    result.current.dismiss()
  })
  await waitFor(() => expect(result.current.toasts).toHaveLength(0))
}

describe("Toaster", () => {
  it("renders toasts created through the imperative API", async () => {
    render(<Toaster />)
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({
        title: "Saved",
        description: "Your changes were stored.",
        intent: "success",
        action: <ToastAction altText="Undo save">Undo</ToastAction>,
      })
    })

    expect(screen.getByText("Saved")).toBeInTheDocument()
    expect(screen.getByText("Your changes were stored.")).toBeInTheDocument()
    expect(screen.getByText("Undo")).toBeInTheDocument()
    expect(document.querySelector(".maxa-toast--success")).toBeInTheDocument()

    await flushToasts(result)
  })

  it("removes the toast when the close button is clicked", async () => {
    render(<Toaster />)
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({ title: "Heads up" })
    })

    expect(screen.getByText("Heads up")).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText("Dismiss notification"))

    await waitFor(() => expect(screen.queryByText("Heads up")).not.toBeInTheDocument())
    await waitFor(() => expect(result.current.toasts).toHaveLength(0))
  })

  it("renders a toast without optional title or action", async () => {
    render(<Toaster />)
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({ description: "Description only" })
    })

    expect(screen.getByText("Description only")).toBeInTheDocument()
    expect(document.querySelector(".maxa-toast__title")).not.toBeInTheDocument()

    await flushToasts(result)
  })
})
