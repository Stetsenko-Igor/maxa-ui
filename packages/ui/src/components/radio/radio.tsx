import * as React from "react"
import "./radio.css"
import { cn } from "../../lib/cn.js"
import { useLabelIds } from "@maxa/hooks"

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "type"> {
  children?: React.ReactNode
  containerClassName?: string
  description?: React.ReactNode
  error?: boolean
  helperText?: React.ReactNode
  label?: React.ReactNode
  sideLabel?: React.ReactNode
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      error = false,
      disabled = false,
      label,
      sideLabel,
      children,
      description,
      helperText,
      id,
      className,
      containerClassName,
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref,
  ) => {
    const sideLabelContent = sideLabel ?? children
    const descriptionContent = description ?? helperText
    const { labelId: topLabelId, sideLabelId, descriptionId, labelledBy, describedBy } = useLabelIds({
      label,
      sideLabel: sideLabelContent,
      description: descriptionContent,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
    })
    return (
      <label
        className={cn("maxa-radio", error && "maxa-radio--error", disabled && "maxa-radio--disabled", className, containerClassName)}
        htmlFor={id}
      >
        {label ? <span className="maxa-radio__top-label" id={topLabelId}>{label}</span> : null}
        <span className="maxa-radio__row">
          <span className="maxa-radio__control">
            <input
              ref={ref}
              id={id}
              type="radio"
              className="maxa-radio__input"
              disabled={disabled}
              aria-describedby={describedBy}
              aria-invalid={error || undefined}
              aria-label={ariaLabel}
              aria-labelledby={labelledBy}
              {...props}
            />
            <span className="maxa-radio__circle" aria-hidden="true" />
          </span>
          {(sideLabelContent || descriptionContent) && (
            <span className="maxa-radio__content">
              {sideLabelContent && (
                <span className="maxa-radio__side-label" id={sideLabelId}>{sideLabelContent}</span>
              )}
              {descriptionContent && (
                <span className="maxa-radio__description" id={descriptionId}>
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

Radio.displayName = "Radio"

export { Radio }
