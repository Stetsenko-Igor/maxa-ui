"use client"

import { Button } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const BUTTON_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "variant",
      options: [
        { label: "primary", value: "primary" },
        { label: "secondary", value: "secondary" },
        { label: "outline", value: "outline" },
        { label: "ghost", value: "ghost" },
        { label: "link", value: "link" },
        { label: "positive", value: "positive" },
        { label: "destructive", value: "destructive" },
      ],
      default: "primary",
    },
    {
      type: "select",
      name: "size",
      options: [
        { label: "xs", value: "xs" },
        { label: "sm", value: "sm" },
        { label: "md", value: "md" },
        { label: "lg", value: "lg" },
      ],
      default: "lg",
    },
    { type: "boolean", name: "loading", default: false },
    { type: "boolean", name: "disabled", default: false },
    { type: "boolean", name: "hasBackground", default: false },
    { type: "text", name: "label", default: "Create project" },
  ],
  render: (v: PlaygroundValues) => (
    <Button
      variant={
        v.variant as
          | "primary"
          | "secondary"
          | "outline"
          | "ghost"
          | "link"
          | "positive"
          | "destructive"
      }
      size={v.size as "xs" | "sm" | "md" | "lg"}
      loading={v.loading as boolean}
      disabled={v.disabled as boolean}
      hasBackground={v.hasBackground as boolean}
    >
      {v.label as string}
    </Button>
  ),
  code: (v: PlaygroundValues) => {
    const attrs = [`variant="${v.variant}"`, `size="${v.size}"`]
    if (v.loading) attrs.push("loading")
    if (v.disabled) attrs.push("disabled")
    if (v.hasBackground) attrs.push("hasBackground")
    return `<Button ${attrs.join(" ")}>${v.label}</Button>`
  },
}

export function ButtonDefaultPreview() {
  return (
    <ComponentPreview
      code={`<Button variant="primary">Create project</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="outline">Learn more</Button>
<Button variant="outline" hasBackground>On a surface</Button>`}
      playground={BUTTON_PLAYGROUND}
    >
      <Button variant="primary">Create project</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="outline">Learn more</Button>
      <Button variant="outline" hasBackground>
        On a surface
      </Button>
    </ComponentPreview>
  )
}
