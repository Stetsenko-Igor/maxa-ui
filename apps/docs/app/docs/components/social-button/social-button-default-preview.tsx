"use client"

import { SocialButton } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const SOCIAL_BUTTON_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "provider",
      options: [
        { label: "google", value: "google" },
        { label: "apple", value: "apple" },
        { label: "facebook", value: "facebook" },
        { label: "github", value: "github" },
        { label: "linkedin", value: "linkedin" },
        { label: "x", value: "x" },
        { label: "youtube", value: "youtube" },
      ],
      default: "google",
    },
    {
      type: "select",
      name: "size",
      options: [
        { label: "sm", value: "sm" },
        { label: "md", value: "md" },
        { label: "lg", value: "lg" },
      ],
      default: "md",
    },
    { type: "boolean", name: "fullWidth", default: false },
    { type: "boolean", name: "disabled", default: false },
    { type: "text", name: "label", default: "Sign in with Google" },
  ],
  render: (v: PlaygroundValues) => (
    <SocialButton
      provider={v.provider as "apple" | "facebook" | "github" | "google" | "linkedin" | "x" | "youtube"}
      size={v.size as "sm" | "md" | "lg"}
      fullWidth={v.fullWidth as boolean}
      disabled={v.disabled as boolean}
      {...((v.label as string) ? { label: v.label as string } : {})}
    />
  ),
  code: (v: PlaygroundValues) => {
    const attrs = [`provider="${v.provider}"`, `size="${v.size}"`]
    if (v.fullWidth) attrs.push("fullWidth")
    if (v.disabled) attrs.push("disabled")
    if (v.label) attrs.push(`label="${v.label}"`)
    return `<SocialButton ${attrs.join(" ")} />`
  },
}

export function SocialButtonDefaultPreview() {
  return (
    <ComponentPreview
      code={`<SocialButton provider="google" label="Sign in with Google" />`}
      playground={SOCIAL_BUTTON_PLAYGROUND}
    >
      <div style={{ padding: "32px", display: "flex", justifyContent: "center" }}>
        <SocialButton provider="google" label="Sign in with Google" />
      </div>
    </ComponentPreview>
  )
}
