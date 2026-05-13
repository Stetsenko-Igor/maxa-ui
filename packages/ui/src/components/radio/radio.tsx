import * as React from "react"
import "./radio.css"

export type RadioSize = "sm" | "md"

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: RadioSize
  error?: boolean
  label?: React.ReactNode
  helperText?: string
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
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
    const wrapperClasses = [
      "maxa-radio",
      `maxa-radio--${size}`,
      error && "maxa-radio--error",
      disabled && "maxa-radio--disabled",
    ]
      .filter(Boolean)
      .join(" ")

    return (
      <label className={[wrapperClasses, className].filter(Boolean).join(" ")} htmlFor={id}>
        <span className="maxa-radio__control">
          <input
            ref={ref}
            id={id}
            type="radio"
            className="maxa-radio__input"
            disabled={disabled}
            aria-invalid={error || undefined}
            {...props}
          />
          <span className="maxa-radio__circle" aria-hidden="true" />
        </span>
        {(label || helperText) && (
          <span className="maxa-radio__content">
            {label && <span className="maxa-radio__label">{label}</span>}
            {helperText && (
              <span className="maxa-radio__helper">{helperText}</span>
            )}
          </span>
        )}
      </label>
    )
  },
)

Radio.displayName = "Radio"

export { Radio }
