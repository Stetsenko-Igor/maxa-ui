import { describe, it, expect } from "vitest"
import { version } from "./index"

describe("mcp", () => {
  it("exports version", () => {
    expect(version).toBe("0.0.0")
  })
})
