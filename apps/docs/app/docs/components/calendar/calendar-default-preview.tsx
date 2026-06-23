"use client"

import { useState } from "react"
import { Calendar } from "@maxa/ui"
import { ComponentPreview } from "../../../_components/component-preview"
import type { PlaygroundConfig, PlaygroundValues } from "../../../_components/playground"

const DEFAULT_MONTH = new Date(2025, 4, 1)
const CURRENT_DATE = new Date(2025, 4, 15)
const INITIAL_SELECTED = new Date(2025, 4, 9)
const RANGE_START = new Date(2025, 4, 9)
const RANGE_END = new Date(2025, 5, 18)
const DISABLED_DATES = [new Date(2025, 4, 12), new Date(2025, 4, 13)]

function CalendarDemo({ values }: { values: PlaygroundValues }) {
  const [selected, setSelected] = useState<Date>(INITIAL_SELECTED)
  const isRange = values.mode === "range"
  const showCurrent = values.showCurrent as boolean
  const withDisabled = values.withDisabled as boolean

  return (
    <Calendar
      defaultMonth={DEFAULT_MONTH}
      {...(showCurrent ? { currentDate: CURRENT_DATE } : {})}
      {...(withDisabled ? { disabledDates: DISABLED_DATES } : {})}
      {...(isRange
        ? { rangeStart: RANGE_START, rangeEnd: RANGE_END }
        : { selected, onDateSelect: setSelected })}
    />
  )
}

const CALENDAR_PLAYGROUND: PlaygroundConfig = {
  controls: [
    {
      type: "select",
      name: "mode",
      options: [
        { label: "single", value: "single" },
        { label: "range", value: "range" },
      ],
      default: "single",
    },
    { type: "boolean", name: "showCurrent", label: "mark current day", default: true },
    { type: "boolean", name: "withDisabled", label: "disabled dates", default: false },
  ],
  render: (v: PlaygroundValues) => <CalendarDemo values={v} />,
  code: (v: PlaygroundValues) => {
    const lines = [`  defaultMonth={new Date(2025, 4, 1)}`]
    if (v.showCurrent) lines.push(`  currentDate={new Date(2025, 4, 15)}`)
    if (v.mode === "range") {
      lines.push(`  rangeStart={new Date(2025, 4, 9)}`)
      lines.push(`  rangeEnd={new Date(2025, 5, 18)}`)
    } else {
      lines.push(`  selected={selected}`)
      lines.push(`  onDateSelect={setSelected}`)
    }
    if (v.withDisabled) lines.push(`  disabledDates={[new Date(2025, 4, 12), new Date(2025, 4, 13)]}`)
    return `<Calendar\n${lines.join("\n")}\n/>`
  },
}

export function CalendarDefaultPreview() {
  return (
    <ComponentPreview
      code={`<Calendar\n  defaultMonth={new Date(2025, 4, 1)}\n  selected={new Date(2025, 4, 9)}\n  currentDate={new Date(2025, 4, 15)}\n  onDateSelect={(date) => console.log(date)}\n/>`}
      playground={CALENDAR_PLAYGROUND}
    >
      <div style={{ padding: "32px" }}>
        <Calendar defaultMonth={DEFAULT_MONTH} selected={INITIAL_SELECTED} currentDate={CURRENT_DATE} />
      </div>
    </ComponentPreview>
  )
}
