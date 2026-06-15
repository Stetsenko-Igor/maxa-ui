import { renderHook, act } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { useControlledState } from "./use-controlled-state.js"

describe("useControlledState", () => {
  it("returns defaultValue when uncontrolled", () => {
    const { result } = renderHook(() =>
      useControlledState({ value: undefined, defaultValue: "a" }),
    )
    expect(result.current[0]).toBe("a")
  })

  it("returns controlled value when provided", () => {
    const { result } = renderHook(() =>
      useControlledState({ value: "controlled", defaultValue: "default" }),
    )
    expect(result.current[0]).toBe("controlled")
  })

  it("updates internal state when uncontrolled", () => {
    const { result } = renderHook(() =>
      useControlledState({ value: undefined, defaultValue: "a" }),
    )
    act(() => result.current[1]("b"))
    expect(result.current[0]).toBe("b")
  })

  it("does not update internal state when controlled", () => {
    const { result } = renderHook(() =>
      useControlledState({ value: "controlled", defaultValue: "default" }),
    )
    act(() => result.current[1]("ignored"))
    expect(result.current[0]).toBe("controlled")
  })

  it("calls onChange in both controlled and uncontrolled modes", () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControlledState({ value: undefined, defaultValue: "a", onChange }),
    )
    act(() => result.current[1]("b"))
    expect(onChange).toHaveBeenCalledWith("b")
  })

  it("calls onChange when controlled", () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControlledState({ value: "x", defaultValue: "default", onChange }),
    )
    act(() => result.current[1]("y"))
    expect(onChange).toHaveBeenCalledWith("y")
  })

  it("works with array values", () => {
    const { result } = renderHook(() =>
      useControlledState<string[]>({ value: undefined, defaultValue: [] }),
    )
    act(() => result.current[1](["a", "b"]))
    expect(result.current[0]).toEqual(["a", "b"])
  })
})
