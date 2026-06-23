"use client"

import { Button, Tooltip, TooltipProvider } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

type TooltipSide = "top" | "right" | "bottom" | "left"
type TooltipAlign = "start" | "center" | "end"

const TOOLTIP_PLAYGROUND: PlaygroundConfig = {
  controls: [
    { type: "text", name: "content", default: "Copy to clipboard" },
    {
      type: "select",
      name: "side",
      options: [
        { label: "top", value: "top" },
        { label: "right", value: "right" },
        { label: "bottom", value: "bottom" },
        { label: "left", value: "left" },
      ],
      default: "top",
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
    {
      type: "select",
      name: "delay",
      options: [
        { label: "instant (0ms)", value: "0" },
        { label: "default (200ms)", value: "200" },
        { label: "slow (700ms)", value: "700" },
      ],
      default: "200",
    },
    { type: "text", name: "trigger", default: "Hover me" },
  ],
  render: (v: PlaygroundValues) => (
    <TooltipProvider>
      <Tooltip
        content={v.content as string}
        side={v.side as TooltipSide}
        align={v.align as TooltipAlign}
        delayDuration={Number(v.delay)}
      >
        <Button variant="outline">{v.trigger as string}</Button>
      </Tooltip>
    </TooltipProvider>
  ),
  code: (v: PlaygroundValues) =>
    [
      `<TooltipProvider>`,
      `  <Tooltip content="${v.content}" side="${v.side}" align="${v.align}" delayDuration={${Number(v.delay)}}>`,
      `    <Button variant="outline">${v.trigger}</Button>`,
      `  </Tooltip>`,
      `</TooltipProvider>`,
    ].join("\n"),
}

export function TooltipDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { Tooltip, TooltipProvider } from "@maxa/ui"\n\n<TooltipProvider>\n  <Tooltip content="Copy to clipboard">\n    <Button variant="outline">Copy</Button>\n  </Tooltip>\n</TooltipProvider>`}
      playground={TOOLTIP_PLAYGROUND}
    >
      <TooltipProvider>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <Tooltip content="Copy to clipboard">
            <Button variant="outline">Hover me</Button>
          </Tooltip>
        </div>
      </TooltipProvider>
    </ComponentPreview>
  )
}
