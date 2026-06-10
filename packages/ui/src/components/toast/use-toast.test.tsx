import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { act, renderHook } from "@testing-library/react"
import { reducer, useToast, type ToasterToast } from "./use-toast"

type ToastHandle = ReturnType<ReturnType<typeof useToast>["toast"]>

function makeToast(id: string, title = `Toast ${id}`): ToasterToast {
  return { id, title, open: true }
}

describe("toast reducer", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    act(() => {
      vi.runAllTimers()
    })
    vi.useRealTimers()
  })

  it("adds a toast to the front of the list", () => {
    const first = reducer({ toasts: [] }, { type: "ADD_TOAST", toast: makeToast("a") })
    expect(first.toasts).toHaveLength(1)

    const second = reducer(first, { type: "ADD_TOAST", toast: makeToast("b") })
    expect(second.toasts.map((t) => t.id)).toEqual(["b", "a"])
  })

  it("evicts the oldest toast beyond the limit", () => {
    let state: { toasts: ToasterToast[] } = { toasts: [] }
    for (const id of ["a", "b", "c", "d"]) {
      state = reducer(state, { type: "ADD_TOAST", toast: makeToast(id) })
    }

    expect(state.toasts.map((t) => t.id)).toEqual(["d", "c", "b"])
  })

  it("updates only the matching toast", () => {
    const state = { toasts: [makeToast("a"), makeToast("b")] }
    const next = reducer(state, { type: "UPDATE_TOAST", toast: { id: "a", title: "Updated" } })

    expect(next.toasts[0]?.title).toBe("Updated")
    expect(next.toasts[1]?.title).toBe("Toast b")
  })

  it("dismisses a single toast by id", () => {
    const state = { toasts: [makeToast("a"), makeToast("b")] }
    const next = reducer(state, { type: "DISMISS_TOAST", toastId: "a" })

    expect(next.toasts[0]?.open).toBe(false)
    expect(next.toasts[1]?.open).toBe(true)
  })

  it("dismisses every toast when no id is given", () => {
    const state = { toasts: [makeToast("a"), makeToast("b")] }
    const next = reducer(state, { type: "DISMISS_TOAST" })

    expect(next.toasts).toHaveLength(2)
    expect(next.toasts.every((t) => t.open === false)).toBe(true)
  })

  it("removes a toast by id", () => {
    const state = { toasts: [makeToast("a"), makeToast("b")] }
    const next = reducer(state, { type: "REMOVE_TOAST", toastId: "a" })

    expect(next.toasts.map((t) => t.id)).toEqual(["b"])
  })

  it("removes all toasts when no id is given", () => {
    const state = { toasts: [makeToast("a"), makeToast("b")] }
    const next = reducer(state, { type: "REMOVE_TOAST" })

    expect(next.toasts).toHaveLength(0)
  })
})

describe("useToast", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Reset shared module state between tests.
    const { result, unmount } = renderHook(() => useToast())
    act(() => {
      result.current.dismiss()
    })
    act(() => {
      vi.runAllTimers()
    })
    unmount()
    vi.useRealTimers()
  })

  it("adds a toast and returns imperative controls", () => {
    const { result } = renderHook(() => useToast())
    let handle!: ToastHandle

    act(() => {
      handle = result.current.toast({ title: "Saved" })
    })

    expect(handle.id).toBeTruthy()
    expect(typeof handle.dismiss).toBe("function")
    expect(typeof handle.update).toBe("function")
    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0]?.title).toBe("Saved")
    expect(result.current.toasts[0]?.open).toBe(true)
  })

  it("updates a toast through the returned handle", () => {
    const { result } = renderHook(() => useToast())
    let handle!: ToastHandle

    act(() => {
      handle = result.current.toast({ title: "Saving" })
    })
    act(() => {
      handle.update({ title: "Saved", description: "All good" })
    })

    expect(result.current.toasts[0]?.title).toBe("Saved")
    expect(result.current.toasts[0]?.description).toBe("All good")
  })

  it("dismisses a toast and removes it after the delay", () => {
    const { result } = renderHook(() => useToast())
    let handle!: ToastHandle

    act(() => {
      handle = result.current.toast({ title: "Bye" })
    })
    act(() => {
      handle.dismiss()
    })

    expect(result.current.toasts[0]?.open).toBe(false)

    act(() => {
      vi.advanceTimersByTime(150)
    })

    expect(result.current.toasts).toHaveLength(0)
  })

  it("does not double-schedule removal when dismissed twice", () => {
    const { result } = renderHook(() => useToast())
    let handle!: ToastHandle

    act(() => {
      handle = result.current.toast({ title: "Twice" })
    })
    act(() => {
      handle.dismiss()
      handle.dismiss()
    })
    act(() => {
      vi.advanceTimersByTime(150)
    })

    expect(result.current.toasts).toHaveLength(0)
  })

  it("dismisses all toasts via the hook dismiss without an id", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({ title: "One" })
      result.current.toast({ title: "Two" })
    })
    act(() => {
      result.current.dismiss()
    })

    expect(result.current.toasts).toHaveLength(2)
    expect(result.current.toasts.every((t) => t.open === false)).toBe(true)

    act(() => {
      vi.advanceTimersByTime(150)
    })

    expect(result.current.toasts).toHaveLength(0)
  })

  it("dismisses a specific toast via the hook dismiss", () => {
    const { result } = renderHook(() => useToast())
    let firstId = ""

    act(() => {
      firstId = result.current.toast({ title: "One" }).id
      result.current.toast({ title: "Two" })
    })
    act(() => {
      result.current.dismiss(firstId)
    })

    const first = result.current.toasts.find((t) => t.id === firstId)
    const second = result.current.toasts.find((t) => t.id !== firstId)
    expect(first?.open).toBe(false)
    expect(second?.open).toBe(true)
  })

  it("keeps at most three toasts", () => {
    const { result } = renderHook(() => useToast())
    let firstId = ""

    act(() => {
      firstId = result.current.toast({ title: "1" }).id
      result.current.toast({ title: "2" })
      result.current.toast({ title: "3" })
      result.current.toast({ title: "4" })
    })

    expect(result.current.toasts).toHaveLength(3)
    expect(result.current.toasts.some((t) => t.id === firstId)).toBe(false)
  })

  it("dismisses when onOpenChange reports closing", () => {
    const { result } = renderHook(() => useToast())

    act(() => {
      result.current.toast({ title: "Auto" })
    })
    act(() => {
      result.current.toasts[0]?.onOpenChange?.(true)
    })

    expect(result.current.toasts[0]?.open).toBe(true)

    act(() => {
      result.current.toasts[0]?.onOpenChange?.(false)
    })

    expect(result.current.toasts[0]?.open).toBe(false)
  })

  it("stops notifying unmounted subscribers", () => {
    const first = renderHook(() => useToast())
    const second = renderHook(() => useToast())

    second.unmount()

    act(() => {
      first.result.current.toast({ title: "After unmount" })
    })

    expect(first.result.current.toasts).toHaveLength(1)
    expect(second.result.current.toasts).toHaveLength(0)
  })
})
