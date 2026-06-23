"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

type ItemVariant = "default" | "destructive"

const triggerStyle: React.CSSProperties = {
  width: "320px",
  minHeight: "144px",
  display: "grid",
  placeItems: "center",
  border: "1px dashed var(--color-border-primary)",
  borderRadius: "var(--radius-md)",
  color: "var(--color-text-secondary)",
  fontSize: "var(--text-sm)",
}

const CONTEXT_MENU_PLAYGROUND: PlaygroundConfig = {
  controls: [
    { type: "text", name: "label", default: "Package" },
    {
      type: "select",
      name: "deleteVariant",
      label: "delete variant",
      options: [
        { label: "destructive", value: "destructive" },
        { label: "default", value: "default" },
      ],
      default: "destructive",
    },
    { type: "boolean", name: "duplicateDisabled", label: "disable Duplicate", default: false },
    { type: "boolean", name: "shortcuts", default: true },
  ],
  render: (v: PlaygroundValues) => (
    <ContextMenu>
      <ContextMenuTrigger style={triggerStyle}>Right click area</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>{v.label as string}</ContextMenuLabel>
        <ContextMenuItem>
          Open{v.shortcuts ? <ContextMenuShortcut>Enter</ContextMenuShortcut> : null}
        </ContextMenuItem>
        <ContextMenuItem disabled={v.duplicateDisabled as boolean}>
          Duplicate{v.shortcuts ? <ContextMenuShortcut>Cmd+D</ContextMenuShortcut> : null}
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant={v.deleteVariant as ItemVariant}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  code: (v: PlaygroundValues) => {
    const openShortcut = v.shortcuts ? `<ContextMenuShortcut>Enter</ContextMenuShortcut>` : ""
    const dupShortcut = v.shortcuts ? `<ContextMenuShortcut>Cmd+D</ContextMenuShortcut>` : ""
    const dupAttrs = v.duplicateDisabled ? " disabled" : ""
    return [
      `<ContextMenu>`,
      `  <ContextMenuTrigger>Right click area</ContextMenuTrigger>`,
      `  <ContextMenuContent>`,
      `    <ContextMenuLabel>${v.label}</ContextMenuLabel>`,
      `    <ContextMenuItem>Open${openShortcut}</ContextMenuItem>`,
      `    <ContextMenuItem${dupAttrs}>Duplicate${dupShortcut}</ContextMenuItem>`,
      `    <ContextMenuSeparator />`,
      `    <ContextMenuItem variant="${v.deleteVariant}">Delete</ContextMenuItem>`,
      `  </ContextMenuContent>`,
      `</ContextMenu>`,
    ].join("\n")
  },
}

export function ContextMenuDefaultPreview() {
  return (
    <ComponentPreview
      code={`<ContextMenu>\n  <ContextMenuTrigger>Right click area</ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuLabel>Package</ContextMenuLabel>\n    <ContextMenuItem>Open<ContextMenuShortcut>Enter</ContextMenuShortcut></ContextMenuItem>\n    <ContextMenuItem>Duplicate<ContextMenuShortcut>Cmd+D</ContextMenuShortcut></ContextMenuItem>\n    <ContextMenuSeparator />\n    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`}
      playground={CONTEXT_MENU_PLAYGROUND}
    >
      <div style={{ padding: "32px" }}>
        <ContextMenu>
          <ContextMenuTrigger style={triggerStyle}>Right click area</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Package</ContextMenuLabel>
            <ContextMenuItem>Open<ContextMenuShortcut>Enter</ContextMenuShortcut></ContextMenuItem>
            <ContextMenuItem>Duplicate<ContextMenuShortcut>Cmd+D</ContextMenuShortcut></ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    </ComponentPreview>
  )
}
