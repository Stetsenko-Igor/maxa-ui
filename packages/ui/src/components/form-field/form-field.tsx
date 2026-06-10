import * as React from "react"
import "./form-field.css"

export type FormFieldSize = "sm" | "md" | "lg"
export type FormFieldStatus = "default" | "error" | "success"

export interface FormFieldProps {
  children: React.ReactNode
  className?: string | undefined
  error?: string | undefined
  footerEnd?: React.ReactNode | undefined
  hint?: string | undefined
  hintId?: string | undefined
  htmlFor?: string | undefined
  infoIcon?: React.ReactNode | undefined
  label?: string | undefined
  required?: boolean | undefined
  size?: FormFieldSize
  status?: FormFieldStatus
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  {
    children,
    className,
    error,
    footerEnd,
    hint,
    hintId,
    htmlFor,
    infoIcon,
    label,
    required,
    size = "md",
    status = "default",
  },
  ref,
) {
  const resolvedStatus = error ? "error" : status

  return (
    <div
      ref={ref}
      className={[
        "maxa-form-field",
        `maxa-form-field--${size}`,
        `maxa-form-field--${resolvedStatus}`,
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <div className="maxa-form-field__label-row">
          <label htmlFor={htmlFor} className="maxa-form-field__label">
            {label}
          </label>
          {required && <span className="maxa-form-field__required">*</span>}
          {infoIcon && (
            <span className="maxa-form-field__info" aria-hidden="true">
              {infoIcon}
            </span>
          )}
        </div>
      )}

      {children}

      {(hint || error || footerEnd) && (
        <div className="maxa-form-field__footer">
          <span
            id={hintId}
            className="maxa-form-field__hint"
            role={error ? "alert" : undefined}
          >
            {error ?? hint}
          </span>
          {footerEnd && <span className="maxa-form-field__footer-end">{footerEnd}</span>}
        </div>
      )}
    </div>
  )
})

FormField.displayName = "FormField"
