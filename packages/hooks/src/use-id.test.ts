import { renderHook } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { useId } from "./use-id.js"

describe("useId", () => {
  it("returns a non-empty string", () => {
    const { result } = renderHook(() => useId())
    expect(typeof result.current).toBe("string")
    expect(result.current.length).toBeGreaterThan(0)
  })

  it("returns a stable id across re-renders", () => {
    const { result, rerender } = renderHook(() => useId())
    const first = result.current
    rerender()
    expect(result.current).toBe(first)
  })

  it("returns unique ids across separate instances", () => {
    const a = renderHook(() => useId())
    const b = renderHook(() => useId())
    expect(a.result.current).not.toBe(b.result.current)
  })
})
