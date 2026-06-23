"use client"

import { UtilityButton } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}

const UTILITY_BUTTON_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "icon",
      options: [
        { label: "grid", value: "grid" },
        { label: "list", value: "list" },
      ],
      default: "grid",
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
    { type: "boolean", name: "selected", default: false },
    { type: "boolean", name: "disabled", default: false },
  ],
  render: (v: PlaygroundValues) => (
    <UtilityButton
      aria-label={v.icon === "list" ? "List view" : "Grid view"}
      icon={v.icon === "list" ? <ListIcon /> : <GridIcon />}
      size={v.size as "sm" | "md" | "lg"}
      selected={v.selected as boolean}
      disabled={v.disabled as boolean}
    />
  ),
  code: (v: PlaygroundValues) => {
    const ariaLabel = v.icon === "list" ? "List view" : "Grid view"
    const iconJsx = v.icon === "list" ? "<ListIcon />" : "<GridIcon />"
    const attrs = [`aria-label="${ariaLabel}"`, `icon={${iconJsx}}`, `size="${v.size}"`]
    if (v.selected) attrs.push("selected")
    if (v.disabled) attrs.push("disabled")
    return `<UtilityButton ${attrs.join(" ")} />`
  },
}

export function UtilityButtonDefaultPreview() {
  return (
    <ComponentPreview
      code={`<UtilityButton aria-label="Grid view" icon={<GridIcon />} selected />`}
      playground={UTILITY_BUTTON_PLAYGROUND}
    >
      <div style={{ display: "flex", gap: "8px", padding: "32px" }}>
        <UtilityButton aria-label="Grid view" icon={<GridIcon />} selected />
        <UtilityButton aria-label="List view" icon={<ListIcon />} />
      </div>
    </ComponentPreview>
  )
}
