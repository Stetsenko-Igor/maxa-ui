import { renderHook } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { useLabelIds } from "./use-label-ids.js"

describe("useLabelIds", () => {
  it("returns all undefined when no options", () => {
    const { result } = renderHook(() => useLabelIds())
    expect(result.current.labelId).toBeUndefined()
    expect(result.current.sideLabelId).toBeUndefined()
    expect(result.current.descriptionId).toBeUndefined()
    expect(result.current.labelledBy).toBeUndefined()
    expect(result.current.describedBy).toBeUndefined()
  })

  it("generates labelId when label is provided", () => {
    const { result } = renderHook(() => useLabelIds({ label: "Name" }))
    expect(result.current.labelId).toMatch(/-label$/)
    expect(result.current.labelledBy).toBe(result.current.labelId)
  })

  it("generates sideLabelId when sideLabel is provided", () => {
    const { result } = renderHook(() => useLabelIds({ sideLabel: "Side" }))
    expect(result.current.sideLabelId).toMatch(/-side-label$/)
    expect(result.current.labelledBy).toBe(result.current.sideLabelId)
  })

  it("composes labelledBy from label + sideLabel", () => {
    const { result } = renderHook(() => useLabelIds({ label: "Top", sideLabel: "Side" }))
    expect(result.current.labelledBy).toBe(
      `${result.current.labelId} ${result.current.sideLabelId}`,
    )
  })

  it("generates descriptionId when description is provided", () => {
    const { result } = renderHook(() => useLabelIds({ description: "Help text" }))
    expect(result.current.descriptionId).toMatch(/-description$/)
    expect(result.current.describedBy).toBe(result.current.descriptionId)
  })

  it("ariaLabel takes precedence: labelledBy becomes undefined", () => {
    const { result } = renderHook(() =>
      useLabelIds({ label: "Top", ariaLabel: "explicit" }),
    )
    expect(result.current.labelledBy).toBeUndefined()
  })

  it("ariaLabelledBy takes precedence over generated ids", () => {
    const { result } = renderHook(() =>
      useLabelIds({ label: "Top", ariaLabelledBy: "external-id" }),
    )
    expect(result.current.labelledBy).toBe("external-id")
  })

  it("ariaDescribedBy is prepended to describedBy", () => {
    const { result } = renderHook(() =>
      useLabelIds({ description: "Help", ariaDescribedBy: "extra-id" }),
    )
    expect(result.current.describedBy).toBe(`extra-id ${result.current.descriptionId}`)
  })
})
