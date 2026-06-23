"use client"

import { IconButton } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

const ICON_BUTTON_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "variant",
      options: [
        { label: "primary", value: "primary" },
        { label: "secondary", value: "secondary" },
        { label: "outline", value: "outline" },
        { label: "ghost", value: "ghost" },
        { label: "danger", value: "danger" },
      ],
      default: "secondary",
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
      default: "md",
    },
    { type: "boolean", name: "loading", default: false },
    { type: "boolean", name: "disabled", default: false },
    { type: "text", name: "label", default: "Add" },
  ],
  render: (v: PlaygroundValues) => (
    <IconButton
      icon={<PlusIcon />}
      aria-label={v.label as string}
      variant={v.variant as "primary" | "secondary" | "outline" | "ghost" | "danger"}
      size={v.size as "xs" | "sm" | "md" | "lg"}
      loading={v.loading as boolean}
      disabled={v.disabled as boolean}
    />
  ),
  code: (v: PlaygroundValues) => {
    const attrs = [`icon={<PlusIcon />}`, `aria-label="${v.label}"`, `variant="${v.variant}"`, `size="${v.size}"`]
    if (v.loading) attrs.push("loading")
    if (v.disabled) attrs.push("disabled")
    return `<IconButton ${attrs.join(" ")} />`
  },
}

export function IconButtonDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { IconButton } from "@maxa/ui"\n\n<IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" />`}
      playground={ICON_BUTTON_PLAYGROUND}
    >
      <IconButton icon={<PlusIcon />} aria-label="Add" variant="secondary" />
    </ComponentPreview>
  )
}
