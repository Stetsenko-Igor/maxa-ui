"use client"

import * as React from "react"
import "./segmented-control.css"
import { cn } from "../../lib/cn.js"

export interface SegmentedControlProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export interface SegmentedControlItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onChange"> {
  value: string
}

interface SegmentedControlContextValue {
  value: string | undefined
  setValue: (value: string) => void
}

const SegmentedControlContext = React.createContext<SegmentedControlContextValue | null>(null)

const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onValueChange,
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const value = controlledValue ?? uncontrolledValue

    const setValue = React.useCallback(
      (nextValue: string) => {
        if (controlledValue === undefined) {
          setUncontrolledValue(nextValue)
        }
        onValueChange?.(nextValue)
      },
      [controlledValue, onValueChange],
    )

    return (
      <SegmentedControlContext.Provider value={{ value, setValue }}>
        <div
          ref={ref}
          role="group"
          className={cn("maxa-segmented-control", className)}
          {...props}
        >
          {children}
        </div>
      </SegmentedControlContext.Provider>
    )
  },
)
SegmentedControl.displayName = "SegmentedControl"

const SegmentedControlItem = React.forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
  ({ className, value, type = "button", onClick, ...props }, ref) => {
    const context = React.useContext(SegmentedControlContext)
    const selected = context?.value === value

    return (
      <button
        ref={ref}
        type={type}
        className={cn("maxa-segmented-control__item", className)}
        aria-pressed={selected}
        data-state={selected ? "active" : "inactive"}
        onClick={(event) => {
          context?.setValue(value)
          onClick?.(event)
        }}
        {...props}
      />
    )
  },
)
SegmentedControlItem.displayName = "SegmentedControlItem"

export { SegmentedControl, SegmentedControlItem }
