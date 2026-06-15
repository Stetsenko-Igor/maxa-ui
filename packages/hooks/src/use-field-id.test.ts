import { renderHook } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { useFieldId } from "./use-field-id.js"

describe("useFieldId", () => {
  it("returns the provided id when given", () => {
    const { result } = renderHook(() => useFieldId("my-id"))
    expect(result.current).toBe("my-id")
  })

  it("returns a stable generated id when no id provided", () => {
    const { result, rerender } = renderHook(() => useFieldId())
    const first = result.current
    rerender()
    expect(result.current).toBe(first)
    expect(typeof result.current).toBe("string")
    expect(result.current.length).toBeGreaterThan(0)
  })

  it("prefers provided id over generated", () => {
    const { result } = renderHook(() => useFieldId("explicit"))
    expect(result.current).toBe("explicit")
  })
})
