"use client"

import { Button, Popover, PopoverContent, PopoverTrigger } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

type PopoverSide = "top" | "right" | "bottom" | "left"
type PopoverAlign = "start" | "center" | "end"

const panel: React.CSSProperties = { display: "grid", gap: "12px" }
const panelTitle: React.CSSProperties = {
  margin: 0,
  fontSize: "var(--text-sm)",
  lineHeight: "var(--text-sm--line-height)",
  fontWeight: "var(--font-weight-semibold)",
  color: "var(--color-text-primary)",
}
const panelText: React.CSSProperties = {
  margin: 0,
  fontSize: "var(--text-sm)",
  lineHeight: "var(--text-sm--line-height)",
  color: "var(--color-text-secondary)",
}

const POPOVER_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "side",
      options: [
        { label: "bottom", value: "bottom" },
        { label: "top", value: "top" },
        { label: "right", value: "right" },
        { label: "left", value: "left" },
      ],
      default: "bottom",
    },
    {
      type: "select",
      name: "align",
      options: [
        { label: "center", value: "center" },
        { label: "start", value: "start" },
        { label: "end", value: "end" },
      ],
      default: "center",
    },
    { type: "boolean", name: "arrow", default: true },
    { type: "text", name: "trigger", default: "Open popover" },
  ],
  render: (v: PlaygroundValues) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{v.trigger as string}</Button>
      </PopoverTrigger>
      <PopoverContent side={v.side as PopoverSide} align={v.align as PopoverAlign} arrow={v.arrow as boolean}>
        <div style={panel}>
          <p style={panelTitle}>Filters</p>
          <p style={panelText}>Choose the segment and apply the view.</p>
          <Button size="sm">Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
  code: (v: PlaygroundValues) => {
    const attrs = [`side="${v.side}"`, `align="${v.align}"`]
    if (!v.arrow) attrs.push("arrow={false}")
    return [
      `<Popover>`,
      `  <PopoverTrigger asChild>`,
      `    <Button variant="outline">${v.trigger}</Button>`,
      `  </PopoverTrigger>`,
      `  <PopoverContent ${attrs.join(" ")}>`,
      `    <p>Choose the segment and apply the view.</p>`,
      `    <Button size="sm">Apply</Button>`,
      `  </PopoverContent>`,
      `</Popover>`,
    ].join("\n")
  },
}

export function PopoverDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { Button, Popover, PopoverContent, PopoverTrigger } from "@maxa/ui"\n\n<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="outline">Open popover</Button>\n  </PopoverTrigger>\n  <PopoverContent>\n    <p>Interactive content belongs here.</p>\n  </PopoverContent>\n</Popover>`}
      playground={POPOVER_PLAYGROUND}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div style={panel}>
              <p style={panelTitle}>Filters</p>
              <p style={panelText}>Choose the segment and apply the view.</p>
              <Button size="sm">Apply</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </ComponentPreview>
  )
}
