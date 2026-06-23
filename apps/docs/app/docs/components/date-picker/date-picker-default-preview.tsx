"use client"

import { DatePicker, DateRangePicker, QuarterPicker } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const stack: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "16px", width: "360px" }

type Size = "sm" | "md" | "lg"
type QuickSelect = "inline" | "more"

const DATE_PICKER_PLAYGROUND: PlaygroundConfig = {
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
    {
      type: "select",
      name: "quickSelect",
      label: "quick presets",
      options: [
        { label: "none", value: "none" },
        { label: "inline", value: "inline" },
        { label: "more", value: "more" },
      ],
      default: "none",
    },
    { type: "boolean", name: "confirmSelection", label: "confirm footer", default: false },
    { type: "boolean", name: "timePicker", label: "time picker", default: false },
    { type: "boolean", name: "required", default: false },
    { type: "boolean", name: "disabled", default: false },
  ],
  render: (v: PlaygroundValues) => {
    const quickSelect = v.quickSelect === "none" ? undefined : (v.quickSelect as QuickSelect)
    return (
      <div style={stack}>
        <DatePicker
          label="Date Picker"
          defaultValue="5/9/2025"
          size={v.size as Size}
          confirmSelection={v.confirmSelection as boolean}
          timePicker={v.timePicker as boolean}
          required={v.required as boolean}
          disabled={v.disabled as boolean}
          {...(quickSelect ? { quickSelect } : {})}
        />
      </div>
    )
  },
  code: (v: PlaygroundValues) => {
    const attrs = [`label="Date Picker"`, `defaultValue="5/9/2025"`, `size="${v.size}"`]
    if (v.quickSelect !== "none") attrs.push(`quickSelect="${v.quickSelect}"`)
    if (v.confirmSelection) attrs.push("confirmSelection")
    if (v.timePicker) attrs.push("timePicker")
    if (v.required) attrs.push("required")
    if (v.disabled) attrs.push("disabled")
    return `<DatePicker ${attrs.join(" ")} />`
  },
}

export function DatePickerDefaultPreview() {
  return (
    <ComponentPreview
      code={`import { DatePicker, DateRangePicker, QuarterPicker } from "@maxa/ui"\n\n<DatePicker label="Date Picker" defaultValue="5/9/2025" />\n<DateRangePicker label="Date Picker" defaultValue="5/9/2025 - 6/18/2025" />\n<QuarterPicker label="Quarter Picker" defaultValue="Q1/2025" />`}
      playground={DATE_PICKER_PLAYGROUND}
    >
      <div style={stack}>
        <DatePicker label="Date Picker" defaultValue="5/9/2025" />
        <DateRangePicker label="Date Picker" defaultValue="5/9/2025 - 6/18/2025" />
        <QuarterPicker label="Quarter Picker" defaultValue="Q1/2025" />
      </div>
    </ComponentPreview>
  )
}
