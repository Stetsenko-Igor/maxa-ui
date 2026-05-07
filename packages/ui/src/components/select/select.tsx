import * as React from "react"
import { FormField, type FormFieldSize } from "../form-field"
import "./select.css"

type SelectVisualState = "default" | "hover" | "focus" | "error" | "disabled"

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  error?: string
  hint?: string
  infoIcon?: React.ReactNode
  label?: string
  required?: boolean
  size?: FormFieldSize
  visualState?: SelectVisualState
  wrapperClassName?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      children,
      className,
      disabled,
      error,
      hint,
      id,
      infoIcon,
      label,
      required,
      size = "md",
      visualState = "default",
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    const selectId = id ?? React.useId()
    const resolvedVisualState = disabled ? "disabled" : error ? "error" : visualState

    return (
      <FormField
        className={wrapperClassName}
        error={error}
        hint={hint}
        hintId={hint || error ? `${selectId}-hint` : undefined}
        htmlFor={selectId}
        infoIcon={infoIcon}
        label={label}
        required={required}
        size={size}
      >
        <div
          className={[
            "maxa-select__field",
            `maxa-select__field--${size}`,
            `maxa-select__field--visual-${resolvedVisualState}`,
            error ? "maxa-select__field--error" : "",
            disabled ? "maxa-select__field--disabled" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <select
            ref={ref}
            id={selectId}
            className={["maxa-select__select", className ?? ""].filter(Boolean).join(" ")}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={hint || error ? `${selectId}-hint` : undefined}
            {...props}
          >
            {children}
          </select>
          <span className="maxa-select__chevron" aria-hidden="true">
            <ChevronDownIcon />
          </span>
        </div>
      </FormField>
    )
  },
)

Select.displayName = "Select"

export { Select }

function ChevronDownIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
