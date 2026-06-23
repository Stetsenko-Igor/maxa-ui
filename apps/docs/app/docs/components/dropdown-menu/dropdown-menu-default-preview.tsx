"use client"

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

type DropdownSide = "top" | "right" | "bottom" | "left"
type DropdownAlign = "start" | "center" | "end"

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

const DROPDOWN_MENU_PLAYGROUND: PlaygroundConfig = {
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
        { label: "end", value: "end" },
        { label: "center", value: "center" },
        { label: "start", value: "start" },
      ],
      default: "end",
    },
    { type: "text", name: "trigger", default: "Actions" },
    { type: "boolean", name: "destructive", label: "destructive Delete", default: true },
    { type: "boolean", name: "disableDuplicate", label: "disable Duplicate", default: false },
  ],
  render: (v: PlaygroundValues) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" iconTrailing={<ChevronDownIcon />}>
          {v.trigger as string}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={v.side as DropdownSide} align={v.align as DropdownAlign}>
        <DropdownMenuItem>Request design</DropdownMenuItem>
        <DropdownMenuItem disabled={v.disableDuplicate as boolean}>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant={v.destructive ? "destructive" : "default"}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  code: (v: PlaygroundValues) => {
    const dupAttrs = v.disableDuplicate ? " disabled" : ""
    const delVariant = v.destructive ? ` variant="destructive"` : ""
    return [
      `<DropdownMenu>`,
      `  <DropdownMenuTrigger asChild>`,
      `    <Button variant="outline">${v.trigger}</Button>`,
      `  </DropdownMenuTrigger>`,
      `  <DropdownMenuContent side="${v.side}" align="${v.align}">`,
      `    <DropdownMenuItem>Request design</DropdownMenuItem>`,
      `    <DropdownMenuItem${dupAttrs}>Duplicate</DropdownMenuItem>`,
      `    <DropdownMenuSeparator />`,
      `    <DropdownMenuItem${delVariant}>Delete</DropdownMenuItem>`,
      `  </DropdownMenuContent>`,
      `</DropdownMenu>`,
    ].join("\n")
  },
}

export function DropdownMenuDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@maxa/ui"\n\n<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button variant="outline">Actions</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent align="end">\n    <DropdownMenuItem>Request design</DropdownMenuItem>\n    <DropdownMenuItem>Duplicate</DropdownMenuItem>\n    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`}
      playground={DROPDOWN_MENU_PLAYGROUND}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" iconTrailing={<ChevronDownIcon />}>Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Request design</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ComponentPreview>
  )
}
