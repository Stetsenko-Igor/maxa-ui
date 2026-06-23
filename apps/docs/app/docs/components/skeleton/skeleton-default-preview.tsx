"use client"

import { Skeleton } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const SKELETON_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "variant",
      options: [
        { label: "text", value: "text" },
        { label: "rect", value: "rect" },
        { label: "circle", value: "circle" },
      ],
      default: "rect",
    },
    { type: "text", name: "width", default: "200px" },
    { type: "text", name: "height", default: "92px" },
  ],
  render: (v: PlaygroundValues) => (
    <Skeleton
      variant={v.variant as "text" | "rect" | "circle"}
      style={{ width: v.width as string, height: v.height as string }}
    />
  ),
  code: (v: PlaygroundValues) =>
    `<Skeleton variant="${v.variant}" style={{ width: "${v.width}", height: "${v.height}" }} />`,
}

export function SkeletonDefaultPreview() {
  return (
    <ComponentPreview
      code={`<Skeleton style={{ height: 128 }} />\n<Skeleton variant="text" style={{ width: "70%" }} />`}
      playground={SKELETON_PLAYGROUND}
    >
      <div style={{ display: "grid", gap: "12px", width: "260px", padding: "24px" }}>
        <Skeleton style={{ height: 128 }} />
        <Skeleton variant="text" style={{ width: "70%" }} />
        <Skeleton variant="text" style={{ width: "48%" }} />
      </div>
    </ComponentPreview>
  )
}
