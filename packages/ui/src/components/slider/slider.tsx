"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import "./slider.css"
import { cn } from "../../lib/cn.js"

export interface SliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, "children"> {
  label?: string
  showValue?: boolean
  marks?: Array<string | number>
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      label,
      showValue = false,
      marks,
      value,
      defaultValue = [50],
      min = 0,
      max = 100,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const labelId = React.useId()
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const currentValue = value ?? internalValue
    const firstValue = Array.isArray(currentValue) ? currentValue[0] : undefined
    const hasAccessibleName = Boolean(props["aria-label"] || props["aria-labelledby"])
    const labelElementId = label && !hasAccessibleName ? labelId : undefined
    const valueProps:
      Pick<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, "value" | "defaultValue"> =
        value === undefined ? { defaultValue } : { value }

    return (
      <div className="maxa-slider__root">
        {(label || showValue) && (
          <div className="maxa-slider__meta">
            {label && <span id={labelElementId} className="maxa-slider__label">{label}</span>}
            {showValue && typeof firstValue === "number" && (
              <span className="maxa-slider__value">{firstValue}</span>
            )}
          </div>
        )}
        <SliderPrimitive.Root
          ref={ref}
          className={cn("maxa-slider", className)}
          {...valueProps}
          min={min}
          max={max}
          aria-labelledby={labelElementId}
          onValueChange={(nextValue) => {
            if (value === undefined) setInternalValue(nextValue)
            onValueChange?.(nextValue)
          }}
          {...props}
        >
          <SliderPrimitive.Track className="maxa-slider__track">
            <SliderPrimitive.Range className="maxa-slider__range" />
          </SliderPrimitive.Track>
          {currentValue.map((_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              className="maxa-slider__thumb"
              aria-label={getThumbLabel(label, currentValue.length, index)}
              aria-disabled={props.disabled ? true : undefined}
            />
          ))}
        </SliderPrimitive.Root>
        {marks && marks.length > 0 && (
          <div className="maxa-slider__marks" aria-hidden="true">
            {marks.map((mark) => (
              <span key={mark}>{mark}</span>
            ))}
          </div>
        )}
      </div>
    )
  },
)

Slider.displayName = "Slider"

export { Slider }

function getThumbLabel(label: string | undefined, count: number, index: number) {
  if (count === 1) return label ?? "Value"
  if (index === 0) return label ? `${label} minimum` : "Minimum value"
  if (index === count - 1) return label ? `${label} maximum` : "Maximum value"
  return label ? `${label} value ${index + 1}` : `Value ${index + 1}`
}
