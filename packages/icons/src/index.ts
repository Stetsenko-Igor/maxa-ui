export const version = "0.1.0"

/**
 * Phosphor Icons — the MAXA system icon library.
 *
 * Weight: Regular is the system standard and is Phosphor's default, so no
 * wrapper is needed. Icons render at `currentColor` and inherit text color.
 * Size them via width/height (driven by CSS tokens), never the `size` prop.
 *
 * Import from here instead of "@phosphor-icons/react" directly so the
 * dependency stays owned by the design system:
 *
 *   import { CaretDown, X, Check } from "@maxa/icons"
 *
 * See specs/foundations/icons.md for usage rules.
 */
export * from "@phosphor-icons/react"

/**
 * Social / brand icons (full-color brand marks, not `currentColor`).
 * Namespaced to avoid any collision with Phosphor's own `*Icon` aliases and
 * `*Logo` brand glyphs:
 *
 *   import { social } from "@maxa/icons"
 *   <social.GoogleIcon />
 */
export * as social from "./social"
