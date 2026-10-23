// url=https://www.figma.com/design/9M6ulX7a6bDlmctFdClAzu/?node-id=11020-118515
// source=packages/ui/src/components/button/button.tsx
// component=Button
//
// Code Connect template for "🟢 Button v3" in 04_Components (Reusable UI Elements).
// It teaches Figma's Dev Mode and any MCP-connected coding agent what this
// component is in code, so selecting a button in Figma yields the real @maxa/ui
// snippet with the right props instead of a guessed one.
//
// Figma property -> code prop coverage is asserted by button.figma.test.ts.
import figma from "figma"

const instance = figma.selectedInstance

const label = instance.getString("✏️ Text")

// Figma "Type" and our `variant` prop. Figma has no destructive-outline yet;
// see docs/figma-code-connect-button-2026-10-23.md for the open gap.
const variant = instance.getEnum("Type", {
  Primary: "primary",
  Secondary: "secondary",
  Outline: "outline",
  Ghost: "ghost",
  Positive: "positive",
  Destructive: "destructive",
  Link: "link",
})

// Figma carries the pixel height in the option label; code takes the step only.
const size = instance.getEnum("📐 Size", {
  "lg - 40": "lg",
  "md - 36": "md",
  "sm - 28": "sm",
  "xs - 24": "xs",
})

// Figma models interaction states as variants. Hover, Active and Focus are
// rendering states with no code prop - the browser owns them - so only Loading
// and Disabled map onto props.
const state = instance.getEnum("State", {
  Default: "default",
  Hover: "default",
  Active: "default",
  Focus: "default",
  Loading: "loading",
  Disabled: "disabled",
})

const iconOnly = instance.getEnum("Icon Only", { True: true, False: false })
const hasBackground = instance.getBoolean("Has Background")
const showIconLeft = instance.getBoolean("⬅️ Icon Left")
const showIconRight = instance.getBoolean("➡️ Icon Right")

const iconLeft = showIconLeft ? instance.getInstanceSwap("🔀 Icon Left Swap") : null
let iconLeftCode
if (iconLeft && iconLeft.type === "INSTANCE") {
  iconLeftCode = iconLeft.executeTemplate().example
}

const iconRight = showIconRight ? instance.getInstanceSwap("🔀 Icon Right Swap") : null
let iconRightCode
if (iconRight && iconRight.type === "INSTANCE") {
  iconRightCode = iconRight.executeTemplate().example
}

const iconOnlyGlyph = iconOnly ? instance.getInstanceSwap("🔀 Icon Only Swap") : null
let iconOnlyCode
if (iconOnlyGlyph && iconOnlyGlyph.type === "INSTANCE") {
  iconOnlyCode = iconOnlyGlyph.executeTemplate().example
}

export default {
  example: figma.code`
<Button
  variant="${variant}"
  size="${size}"
  ${iconOnly ? "iconOnly" : ""}
  ${hasBackground ? "hasBackground" : ""}
  ${state === "loading" ? "loading" : ""}
  ${state === "disabled" ? "disabled" : ""}
  ${iconLeftCode ? figma.code`iconLeading={${iconLeftCode}}` : ""}
  ${iconRightCode ? figma.code`iconTrailing={${iconRightCode}}` : ""}
>
  ${iconOnly ? iconOnlyCode : label}
</Button>
`,
  imports: ['import { Button } from "@maxa/ui"'],
  id: "button",
  metadata: { nestable: true },
}
