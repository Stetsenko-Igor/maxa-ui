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

  it("keeps social brand icons decorative by default", () => {
    const icon = social.GoogleIcon({})

    expect(icon.props["aria-hidden"]).toBe(true)
    expect(icon.props.role).toBeUndefined()
  })

  it("allows social brand icons to be named when used standalone", () => {
    const icon = social.GoogleIcon({ "aria-label": "Google" })

    expect(icon.props["aria-hidden"]).toBeUndefined()
    expect(icon.props.role).toBe("img")
    expect(icon.props["aria-label"]).toBe("Google")
  })
})
