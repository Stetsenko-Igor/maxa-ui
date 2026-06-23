"use client"

import { SegmentedControl, SegmentedControlItem } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

type SegmentItem = { value: string; label: string }

const ITEM_SETS: Record<string, SegmentItem[]> = {
  "2": [
    { value: "grid", label: "Grid" },
    { value: "list", label: "List" },
  ],
  "3": [
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
  ],
  "4": [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
  ],
}

const DEFAULT_ITEMS: SegmentItem[] = ITEM_SETS["3"]!

function resolveItems(count: unknown): SegmentItem[] {
  const items = ITEM_SETS[String(count)]
  return items ?? DEFAULT_ITEMS
}

const SEGMENTED_CONTROL_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "count",
      label: "items",
      options: [
        { label: "2 items", value: "2" },
        { label: "3 items", value: "3" },
        { label: "4 items", value: "4" },
      ],
      default: "3",
    },
    {
      type: "select",
      name: "value",
      options: [
        { label: "first", value: "0" },
        { label: "second", value: "1" },
        { label: "third", value: "2" },
        { label: "fourth", value: "3" },
      ],
      default: "1",
    },
  ],
  render: (v: PlaygroundValues) => {
    const items = resolveItems(v.count)
    const index = Math.min(Number(v.value), items.length - 1)
    const activeValue = items[index]?.value ?? items[0]!.value
    return (
      <SegmentedControl value={activeValue} aria-label="Mode">
        {items.map((item) => (
          <SegmentedControlItem key={item.value} value={item.value}>
            {item.label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
    )
  },
  code: (v: PlaygroundValues) => {
    const items = resolveItems(v.count)
    const index = Math.min(Number(v.value), items.length - 1)
    const activeValue = items[index]?.value ?? items[0]!.value
    const itemLines = items
      .map((item) => `  <SegmentedControlItem value="${item.value}">${item.label}</SegmentedControlItem>`)
      .join("\n")
    return `<SegmentedControl defaultValue="${activeValue}" aria-label="Mode">\n${itemLines}\n</SegmentedControl>`
  },
}

export function SegmentedControlDefaultPreview() {
  return (
    <ComponentPreview
      code={`<SegmentedControl defaultValue="center" aria-label="Alignment">\n  <SegmentedControlItem value="left">Left</SegmentedControlItem>\n  <SegmentedControlItem value="center">Center</SegmentedControlItem>\n  <SegmentedControlItem value="right">Right</SegmentedControlItem>\n</SegmentedControl>`}
      playground={SEGMENTED_CONTROL_PLAYGROUND}
    >
      <div style={{ padding: "32px" }}>
        <SegmentedControl defaultValue="center" aria-label="Alignment">
          <SegmentedControlItem value="left">Left</SegmentedControlItem>
          <SegmentedControlItem value="center">Center</SegmentedControlItem>
          <SegmentedControlItem value="right">Right</SegmentedControlItem>
        </SegmentedControl>
      </div>
    </ComponentPreview>
  )
}
