"use client"

import * as React from "react"
import "./checkbox.css"
import { cn } from "../../lib/cn.js"

export type CheckedState = boolean | "indeterminate"

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "checked" | "onChange"> {
  checked?: CheckedState
  children?: React.ReactNode
  containerClassName?: string
  defaultChecked?: boolean
  description?: React.ReactNode
  error?: boolean
  helperText?: React.ReactNode
  onCheckedChange?: (checked: CheckedState) => void
  label?: React.ReactNode
  sideLabel?: React.ReactNode
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      children,
      containerClassName,
      defaultChecked,
      description,
      onCheckedChange,
      error = false,
      disabled = false,
      label,
      sideLabel,
      helperText,
      id,
      className,
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current!)

    const isControlled = checked !== undefined
    const isIndeterminate = checked === "indeterminate"
    const isChecked = checked === true

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = isIndeterminate
      }
    }, [isIndeterminate])

    const reactId = React.useId()
    const sideLabelContent = sideLabel ?? children
    const descriptionContent = description ?? helperText
    const topLabelId = label ? `${reactId}-label` : undefined
    const sideLabelId = sideLabelContent ? `${reactId}-side-label` : undefined
    const descriptionId = descriptionContent ? `${reactId}-description` : undefined
    const labelledBy = ariaLabel || ariaLabelledBy
      ? ariaLabelledBy
      : cn(topLabelId, sideLabelId) || undefined
    const describedBy = cn(ariaDescribedBy, descriptionId) || undefined

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked)
    }

    return (
      <label
        className={cn("maxa-checkbox", error && "maxa-checkbox--error", disabled && "maxa-checkbox--disabled", className, containerClassName)}
        htmlFor={id}
      >
        {label ? <span className="maxa-checkbox__top-label" id={topLabelId}>{label}</span> : null}
        <span className="maxa-checkbox__row">
          <span className="maxa-checkbox__control">
            <input
              ref={inputRef}
              id={id}
              type="checkbox"
              className="maxa-checkbox__input"
              {...(isControlled
                ? { checked: isIndeterminate ? false : isChecked }
                : { defaultChecked })}
              disabled={disabled}
              aria-checked={isIndeterminate ? "mixed" : undefined}
              aria-describedby={describedBy}
              aria-invalid={error || undefined}
              aria-label={ariaLabel}
              aria-labelledby={labelledBy}
              onChange={handleChange}
              {...props}
            />
            <span className="maxa-checkbox__box" aria-hidden="true" />
          </span>
          {(sideLabelContent || descriptionContent) && (
            <span className="maxa-checkbox__content">
              {sideLabelContent && (
                <span className="maxa-checkbox__side-label" id={sideLabelId}>{sideLabelContent}</span>
              )}
              {descriptionContent && (
                <span className="maxa-checkbox__description" id={descriptionId}>
                  {descriptionContent}
                </span>
              )}
            </span>
          )}
        </span>
      </label>
    )
  },
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
