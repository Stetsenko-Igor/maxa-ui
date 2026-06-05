import "@testing-library/jest-dom"
import { expect } from "vitest"
import * as axeMatchers from "vitest-axe/matchers"

// vitest-axe ships an empty `extend-expect` build, so register its matchers
// (e.g. toHaveNoViolations) explicitly here.
expect.extend(axeMatchers)

if (!("ResizeObserver" in globalThis)) {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  globalThis.ResizeObserver = ResizeObserverStub
}
