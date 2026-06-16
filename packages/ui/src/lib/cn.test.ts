import { describe, it, expect } from "vitest"
import { cn } from "./cn.js"

describe("cn", () => {
  it("returns empty string when called with no args", () => {
    expect(cn()).toBe("")
  })

  it("joins multiple strings with a space", () => {
    expect(cn("a", "b")).toBe("a b")
  })

  it("filters out false", () => {
    expect(cn("a", false, "b")).toBe("a b")
  })

  it("filters out undefined", () => {
    expect(cn("a", undefined, "b")).toBe("a b")
  })

  it("filters out null", () => {
    expect(cn("a", null, "b")).toBe("a b")
  })

  it("filters out 0", () => {
    expect(cn("a", 0, "b")).toBe("a b")
  })

  it("supports conditional class with &&", () => {
    expect(cn("base", true && "active")).toBe("base active")
  })
})
