export const version = "0.1.0"

/**
 * Phosphor Icons — the MAXA system icon library.
 *
 * Weight: Regular is the system standard and is Phosphor's default, so no
 * wrapper is needed. Icons render at `currentColor` and inherit text color.
 * Size them via width/height (driven by CSS tokens), never the `size` prop.
 *
 * Import from here instead of "@phosphor-icons/react" directly so the dependency
 * stays owned by the design system. Keep this as a curated surface: add icons
 * here only when a package needs them, and import each icon from Phosphor's
 * direct subpath so tests and consumers do not pay for the full icon barrel.
 *
 *   import { CaretDown, X, Check } from "@maxa/icons"
 *
 * See specs/foundations/icons.md for usage rules.
 */
export { CalendarBlank } from "@phosphor-icons/react/CalendarBlank"
export { CaretDown } from "@phosphor-icons/react/CaretDown"
export { CaretLeft } from "@phosphor-icons/react/CaretLeft"
export { CaretRight } from "@phosphor-icons/react/CaretRight"
export { Check } from "@phosphor-icons/react/Check"
export { CheckCircle } from "@phosphor-icons/react/CheckCircle"
export { Clock } from "@phosphor-icons/react/Clock"
export { Eye } from "@phosphor-icons/react/Eye"
export { Info } from "@phosphor-icons/react/Info"
export { MagnifyingGlass } from "@phosphor-icons/react/MagnifyingGlass"
export { Minus } from "@phosphor-icons/react/Minus"
export { Plus } from "@phosphor-icons/react/Plus"
export { UploadSimple } from "@phosphor-icons/react/UploadSimple"
export { Warning } from "@phosphor-icons/react/Warning"
export { X } from "@phosphor-icons/react/X"
export { XCircle } from "@phosphor-icons/react/XCircle"

/**
 * Social / brand icons (full-color brand marks, not `currentColor`).
 * Namespaced to avoid any collision with Phosphor's own `*Icon` aliases and
 * `*Logo` brand glyphs:
 *
 *   import { social } from "@maxa/icons"
 *   <social.GoogleIcon />
 */
export * as social from "./social.js"
