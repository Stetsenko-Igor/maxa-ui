import * as React from "react"
import { FormField, type FormFieldSize } from "../form-field"
import "./date-picker.css"

type DatePickerVisualState = "default" | "hover" | "focus" | "error" | "disabled"

interface DatePickerBaseProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  error?: string
  hint?: string
  infoIcon?: React.ReactNode
  label?: string
  required?: boolean
  size?: FormFieldSize
  visualState?: DatePickerVisualState
  wrapperClassName?: string
}

export type DatePickerProps = DatePickerBaseProps
export type DateRangePickerProps = DatePickerBaseProps

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (props, ref) => <DatePickerField ref={ref} placeholder="mm/dd/yyyy" {...props} />,
)

DatePicker.displayName = "DatePicker"

const DateRangePicker = React.forwardRef<HTMLInputElement, DateRangePickerProps>(
  (props, ref) => <DatePickerField ref={ref} placeholder="mm/dd/yyyy - mm/dd/yyyy" {...props} />,
)

DateRangePicker.displayName = "DateRangePicker"

const DatePickerField = React.forwardRef<HTMLInputElement, DatePickerBaseProps>(
  (
    {
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
    const inputId = id ?? React.useId()
    const resolvedVisualState = disabled ? "disabled" : error ? "error" : visualState

    return (
      <FormField
        className={wrapperClassName}
        error={error}
        hint={hint}
        hintId={hint || error ? `${inputId}-hint` : undefined}
        htmlFor={inputId}
        infoIcon={infoIcon}
        label={label}
        required={required}
        size={size}
      >
        <div
          className={[
            "maxa-date-picker__field",
            `maxa-date-picker__field--${size}`,
            `maxa-date-picker__field--visual-${resolvedVisualState}`,
            error ? "maxa-date-picker__field--error" : "",
            disabled ? "maxa-date-picker__field--disabled" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <input
            ref={ref}
            id={inputId}
            className={["maxa-date-picker__input", className ?? ""].filter(Boolean).join(" ")}
            disabled={disabled}
            inputMode="numeric"
            aria-invalid={error ? true : undefined}
            aria-describedby={hint || error ? `${inputId}-hint` : undefined}
            {...props}
          />
          <span className="maxa-date-picker__icon" aria-hidden="true">
            <CalendarIcon />
          </span>
        </div>
      </FormField>
    )
  },
)

DatePickerField.displayName = "DatePickerField"

export { DatePicker, DateRangePicker }

function CalendarIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
