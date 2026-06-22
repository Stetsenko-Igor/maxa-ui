"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { useId } from "@maxa/hooks"
import "./progress.css"

export type ProgressSize = "sm" | "md"
export type ProgressIntent = "brand" | "success" | "warning" | "error"

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  size?: ProgressSize
  intent?: ProgressIntent
  label?: string
  showValue?: boolean
  value?: number | null
  max?: number
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      size = "md",
      intent = "brand",
      label,
      showValue = false,
      value = 0,
      max = 100,
      ...props
    },
    ref,
  ) => {
    const labelId = useId()
    const boundedValue = typeof value === "number" ? Math.min(Math.max(value, 0), max) : null
    const percent = boundedValue === null ? 0 : Math.round((boundedValue / max) * 100)
    const hasAccessibleName = Boolean(props["aria-label"] || props["aria-labelledby"])
    const labelElementId = label && !hasAccessibleName ? labelId : undefined

    return (
      <div className="maxa-progress__root">
        {(label || showValue) && (
          <div className="maxa-progress__meta">
            {label && <span id={labelElementId} className="maxa-progress__label">{label}</span>}
            {showValue && <span className="maxa-progress__value">{percent}%</span>}
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={[
            "maxa-progress",
            `maxa-progress--${size}`,
            `maxa-progress--${intent}`,
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          value={boundedValue}
          max={max}
          aria-labelledby={labelElementId}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className="maxa-progress__indicator"
            style={{ transform: `translateX(-${100 - percent}%)` }}
          />
        </ProgressPrimitive.Root>
      </div>
    )
  },
)

Progress.displayName = "Progress"

export { Progress }
