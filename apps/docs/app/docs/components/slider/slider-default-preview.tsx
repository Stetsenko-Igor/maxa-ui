"use client"

import { Slider } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const SLIDER_PLAYGROUND: PlaygroundConfig = {
  controls: [
    { type: "text", name: "label", default: "Opacity" },
    {
      type: "select",
      name: "max",
      options: [
        { label: "10", value: "10" },
        { label: "100", value: "100" },
        { label: "255", value: "255" },
      ],
      default: "100",
    },
    {
      type: "select",
      name: "step",
      options: [
        { label: "1", value: "1" },
        { label: "5", value: "5" },
        { label: "10", value: "10" },
      ],
      default: "1",
    },
    { type: "boolean", name: "showValue", default: true },
    { type: "boolean", name: "disabled", default: false },
  ],
  render: (v: PlaygroundValues) => (
    <div style={{ width: "320px" }}>
      <Slider
        label={v.label as string}
        defaultValue={[64]}
        min={0}
        max={Number(v.max)}
        step={Number(v.step)}
        showValue={v.showValue as boolean}
        disabled={v.disabled as boolean}
      />
    </div>
  ),
  code: (v: PlaygroundValues) => {
    const attrs = [`label="${v.label}"`, `defaultValue={[64]}`, `max={${v.max}}`, `step={${v.step}}`]
    if (v.showValue) attrs.push("showValue")
    if (v.disabled) attrs.push("disabled")
    return `<Slider ${attrs.join(" ")} />`
  },
}

export function SliderDefaultPreview() {
  return (
    <ComponentPreview
      code={`<Slider label="Opacity" defaultValue={[64]} showValue />`}
      playground={SLIDER_PLAYGROUND}
    >
      <div style={{ width: "360px", padding: "32px" }}>
        <Slider label="Opacity" defaultValue={[64]} showValue />
      </div>
    </ComponentPreview>
  )
}
