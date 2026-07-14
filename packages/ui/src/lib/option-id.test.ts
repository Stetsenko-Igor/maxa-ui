import { describe, expect, it } from "vitest"

import { optionDomId } from "./option-id.js"

const VALID_ID = /^[A-Za-z][\w-]*$/

describe("optionDomId", () => {
  it("keeps simple values readable", () => {
    expect(optionDomId("field-listbox", 0, "canada")).toBe("field-listbox-option-0-canada")
  })

  it("sanitizes whitespace and special characters", () => {
    const id = optionDomId("field-listbox", 1, "North America")
    expect(id).toBe("field-listbox-option-1-north-america")
    expect(id).toMatch(VALID_ID)
  })

  it("stays a valid id for values with only special characters", () => {
    const id = optionDomId("field-listbox", 2, "!!!")
    expect(id).toBe("field-listbox-option-2")
    expect(id).toMatch(VALID_ID)
  })

  it("disambiguates values that sanitize to the same slug", () => {
    const first = optionDomId("field-listbox", 0, "North America")
    const second = optionDomId("field-listbox", 1, "North_America")
    expect(first).not.toBe(second)
  })

  it("truncates very long values", () => {
    const id = optionDomId("field-listbox", 3, "x".repeat(200))
    expect(id.length).toBeLessThan(80)
    expect(id).toMatch(VALID_ID)
  })
})
