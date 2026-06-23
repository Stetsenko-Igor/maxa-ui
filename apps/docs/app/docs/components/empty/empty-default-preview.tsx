"use client"

import { Button, Empty } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

const EMPTY_PLAYGROUND: PlaygroundConfig = {
  controls: [
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
    { type: "boolean", name: "icon", default: true },
    { type: "boolean", name: "action", default: true },
    { type: "text", name: "title", default: "Scheduled Post Not Found" },
    { type: "text", name: "description", default: "Try another search or clear the current filters." },
  ],
  render: (v: PlaygroundValues) => {
    const optional: {
      icon?: React.ReactNode
      description?: React.ReactNode
      action?: React.ReactNode
    } = {}
    if (v.icon) optional.icon = <SearchIcon />
    if (v.description) optional.description = v.description as string
    if (v.action) optional.action = <Button variant="secondary">Clear search</Button>
    return (
      <div style={{ width: "420px" }}>
        <Empty size={v.size as "sm" | "md" | "lg"} title={v.title as string} {...optional} />
      </div>
    )
  },
  code: (v: PlaygroundValues) => {
    const lines = [`<Empty`, `  size="${v.size}"`]
    if (v.icon) lines.push(`  icon={<SearchIcon />}`)
    lines.push(`  title="${v.title}"`)
    if (v.description) lines.push(`  description="${v.description}"`)
    if (v.action) lines.push(`  action={<Button variant="secondary">Clear search</Button>}`)
    lines.push(`/>`)
    return lines.join("\n")
  },
}

export function EmptyDefaultPreview() {
  return (
    <ComponentPreview
      code={`<Empty\n  title="Scheduled Post Not Found"\n  description="Try another search or clear the current filters."\n  action={<Button variant="secondary">Clear search</Button>}\n/>`}
      playground={EMPTY_PLAYGROUND}
    >
      <div style={{ width: "420px" }}>
        <Empty
          icon={<SearchIcon />}
          title="Scheduled Post Not Found"
          description="Try another search or clear the current filters."
          action={<Button variant="secondary">Clear search</Button>}
        />
      </div>
    </ComponentPreview>
  )
}
