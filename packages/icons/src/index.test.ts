import { describe, it, expect } from "vitest"
import { version, X, CaretDown, Check, social } from "./index"

describe("icons", () => {
  it("exports version", () => {
    expect(version).toBe("0.1.0")
  })

  it("re-exports Phosphor system icons", () => {
    expect(typeof X).toBe("object")
    expect(typeof CaretDown).toBe("object")
    expect(typeof Check).toBe("object")
  })

  it("exports social brand icons under the social namespace", () => {
    expect(typeof social.GoogleIcon).toBe("function")
    expect(typeof social.AppleIcon).toBe("function")
  })
})
