"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-switch"
import "./toggle.css"
import { useLabelIds } from "@maxa/hooks"

export interface ToggleProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>, "children"> {
  children?: React.ReactNode
  containerClassName?: string
  description?: React.ReactNode
  error?: boolean
  label?: React.ReactNode
  sideLabel?: React.ReactNode
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  children,
  className,
  containerClassName,
  description,
  disabled,
  error = false,
  label,
  sideLabel,
  ...props
}, ref) => {
  const { labelId: topLabelId, sideLabelId, descriptionId, labelledBy, describedBy } = useLabelIds({
    label,
    sideLabel: sideLabel ?? children,
    description,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
  })
  const sideLabelContent = sideLabel ?? children
  const hasFieldContent = Boolean(label || sideLabelContent || description)

  return (
    <div
      className={`maxa-toggle-field${containerClassName ? ` ${containerClassName}` : ""}`}
      data-disabled={disabled || undefined}
    >
      {label ? (
        <div className="maxa-toggle-field__label-row">
          <span className="maxa-toggle-field__label" id={topLabelId}>
            {label}
          </span>
        </div>
      ) : null}
      <div className="maxa-toggle-field__row">
        <TogglePrimitive.Root
          ref={ref}
          className={`maxa-toggle${className ? ` ${className}` : ""}`}
          data-error={error || undefined}
          aria-describedby={describedBy}
          aria-invalid={error || undefined}
          aria-label={ariaLabel}
          aria-labelledby={labelledBy}
          disabled={disabled}
          {...props}
        >
          <TogglePrimitive.Thumb className="maxa-toggle__thumb" />
        </TogglePrimitive.Root>
        {hasFieldContent && (sideLabelContent || description) ? (
          <div className="maxa-toggle-field__content">
            {sideLabelContent ? (
              <span className="maxa-toggle-field__side-label" id={sideLabelId}>
                {sideLabelContent}
              </span>
            ) : null}
            {description ? (
              <span className="maxa-toggle-field__description" id={descriptionId}>
                {description}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
})

Toggle.displayName = "Toggle"

export { Toggle }
