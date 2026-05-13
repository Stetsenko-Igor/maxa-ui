"use client"

import * as React from "react"
import "./checkbox.css"

export type CheckboxSize = "sm" | "md"
export type CheckedState = boolean | "indeterminate"

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "checked" | "onChange"> {
  checked?: CheckedState
  defaultChecked?: boolean
  onCheckedChange?: (checked: CheckedState) => void
  size?: CheckboxSize
  error?: boolean
  label?: React.ReactNode
  helperText?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      onCheckedChange,
      size = "md",
      error = false,
      disabled = false,
      label,
      helperText,
      id,
      className,
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

    const wrapperClasses = [
      "maxa-checkbox",
      `maxa-checkbox--${size}`,
      error && "maxa-checkbox--error",
      disabled && "maxa-checkbox--disabled",
    ]
      .filter(Boolean)
      .join(" ")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked)
    }

    return (
      <label className={[wrapperClasses, className].filter(Boolean).join(" ")} htmlFor={id}>
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
            aria-invalid={error || undefined}
            onChange={handleChange}
            {...props}
          />
          <span className="maxa-checkbox__box" aria-hidden="true" />
        </span>
        {(label || helperText) && (
          <span className="maxa-checkbox__content">
            {label && <span className="maxa-checkbox__label">{label}</span>}
            {helperText && (
              <span className="maxa-checkbox__helper">{helperText}</span>
            )}
          </span>
        )}
      </label>
    )
  },
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
