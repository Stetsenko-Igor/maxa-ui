"use client"

import * as React from "react"
import { MagnifyingGlass, Eye, X, Minus, Plus } from "@maxa/icons"
import { cva, type VariantProps } from "class-variance-authority"
import "./input.css"
import { cn } from "../../lib/cn.js"
import { useFieldId } from "@maxa/hooks"

type InputKind = "text" | "password" | "search" | "quantity"

const inputWrapperVariants = cva("maxa-input-wrapper", {
  variants: {
    size: {
      sm: "maxa-input-wrapper--sm",
      md: "maxa-input-wrapper--md",
      lg: "maxa-input-wrapper--lg",
    },
    status: {
      default: "",
      error:   "maxa-input-wrapper--error",
      success: "maxa-input-wrapper--success",
    },
    visualState: {
      default: "",
      hover:    "maxa-input-wrapper--visual-hover",
      focus:    "maxa-input-wrapper--visual-focus",
      filled:   "maxa-input-wrapper--filled",
      error:    "maxa-input-wrapper--error",
      disabled: "maxa-input-wrapper--disabled",
      readonly: "maxa-input-wrapper--readonly",
    },
  },
  defaultVariants: {
    size: "md",
    status: "default",
    visualState: "default",
  },
})

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputWrapperVariants> {
  kind?: InputKind
  label?: string
  hint?: string
  error?: string
  required?: boolean
  infoIcon?: React.ReactNode
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  onClear?: () => void
  onIncrement?: () => void
  onDecrement?: () => void
  wrapperClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      kind = "text",
      size,
      status,
      visualState,
      label,
      hint,
      error,
      required,
      infoIcon,
      leadingIcon,
      trailingIcon,
      onClear,
      onIncrement,
      onDecrement,
      wrapperClassName,
      disabled,
      readOnly,
      id,
      type,
      value,
      defaultValue,
      tabIndex,
      onFocus,
      onMouseDown,
      ...props
    },
    ref,
  ) => {
    const inputId = useFieldId(id)
    const hasValue = value != null ? String(value).length > 0 : defaultValue != null
    const resolvedStatus = error ? "error" : status
    const resolvedVisualState = disabled ? "disabled"
      : readOnly ? "readonly"
      : (visualState && visualState !== "default") ? visualState
      : error ? "error"
      : hasValue ? "filled"
      : "default"
    const resolvedType = kind === "password" ? "password" : kind === "search" ? "search" : kind === "quantity" ? "number" : type

    const fieldClasses = cn(
      "maxa-input__field",
      `maxa-input__field--${kind}`,
      Boolean(leadingIcon || kind === "search") && "maxa-input__field--has-leading",
      Boolean(trailingIcon || kind === "password" || onClear) && "maxa-input__field--has-trailing",
    )

    function handleMouseDown(event: React.MouseEvent<HTMLInputElement>) {
      if (readOnly) {
        event.preventDefault()
      }
      onMouseDown?.(event)
    }

    function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
      if (readOnly) {
        event.currentTarget.blur()
      }
      onFocus?.(event)
    }

    return (
      <div
        className={cn(
          inputWrapperVariants({ size, status: resolvedStatus, visualState: resolvedVisualState }),
          disabled && "maxa-input-wrapper--disabled",
          readOnly && "maxa-input-wrapper--readonly",
          wrapperClassName,
        )}
      >
        {label && (
          <div className="maxa-input__label-row">
            <label htmlFor={inputId} className="maxa-input__label">
              {label}
            </label>
            {required && <span className="maxa-input__required">*</span>}
            {infoIcon && <span className="maxa-input__info" aria-hidden="true">{infoIcon}</span>}
          </div>
        )}

        <div className={fieldClasses}>
          {kind === "quantity" && (
            <button
              type="button"
              className="maxa-input__stepper maxa-input__stepper--decrement"
              onClick={onDecrement}
              disabled={disabled || readOnly}
              aria-label="Decrease value"
            >
              <MinusIcon />
            </button>
          )}

          {(leadingIcon || kind === "search") && kind !== "quantity" && (
            <span className="maxa-input__icon maxa-input__icon--leading" aria-hidden="true">
              {leadingIcon ?? <SearchIcon />}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn("maxa-input__input", className ?? "")}
            disabled={disabled}
            readOnly={readOnly}
            aria-disabled={readOnly || undefined}
            tabIndex={readOnly ? -1 : tabIndex}
            type={resolvedType}
            value={value}
            defaultValue={defaultValue}
            aria-invalid={resolvedStatus === "error" || undefined}
            aria-describedby={hint || error ? `${inputId}-hint` : undefined}
            onFocus={handleFocus}
            onMouseDown={handleMouseDown}
            {...props}
          />

          {kind === "quantity" && (
            <button
              type="button"
              className="maxa-input__stepper maxa-input__stepper--increment"
              onClick={onIncrement}
              disabled={disabled || readOnly}
              aria-label="Increase value"
            >
              <PlusIcon />
            </button>
          )}

          {kind !== "quantity" && (trailingIcon || kind === "password") && (
            <span className="maxa-input__icon maxa-input__icon--trailing" aria-hidden="true">
              {trailingIcon ?? <EyeIcon />}
            </span>
          )}

          {kind !== "quantity" && onClear && (
            <button
              type="button"
              className="maxa-input__icon maxa-input__icon--trailing maxa-input__clear"
              onClick={onClear}
              disabled={disabled || readOnly}
              aria-label="Clear value"
            >
              <ClearIcon />
            </button>
          )}
        </div>

        {(hint || error) && (
          <span
            id={`${inputId}-hint`}
            className="maxa-input__hint"
            role={error ? "alert" : undefined}
          >
            {error ?? hint}
          </span>
        )}
      </div>
    )
  },
)

Input.displayName = "Input"

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof inputWrapperVariants> {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  infoIcon?: React.ReactNode
  characterCounter?: boolean
  wrapperClassName?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      size,
      status,
      visualState,
      label,
      hint,
      error,
      required,
      infoIcon,
      characterCounter,
      wrapperClassName,
      disabled,
      readOnly,
      id,
      value,
      defaultValue,
      maxLength,
      tabIndex,
      onFocus,
      onMouseDown,
      ...props
    },
    ref,
  ) => {
    const inputId = useFieldId(id)
    const hasValue = value != null ? String(value).length > 0 : defaultValue != null
    const resolvedStatus = error ? "error" : status
    const resolvedVisualState = disabled ? "disabled"
      : readOnly ? "readonly"
      : (visualState && visualState !== "default") ? visualState
      : error ? "error"
      : hasValue ? "filled"
      : "default"
    const count = value != null ? String(value).length : defaultValue != null ? String(defaultValue).length : 0

    function handleMouseDown(event: React.MouseEvent<HTMLTextAreaElement>) {
      if (readOnly) {
        event.preventDefault()
      }
      onMouseDown?.(event)
    }

    function handleFocus(event: React.FocusEvent<HTMLTextAreaElement>) {
      if (readOnly) {
        event.currentTarget.blur()
      }
      onFocus?.(event)
    }

    return (
      <div
        className={cn(
          inputWrapperVariants({ size, status: resolvedStatus, visualState: resolvedVisualState }),
          "maxa-input-wrapper--textarea",
          disabled && "maxa-input-wrapper--disabled",
          readOnly && "maxa-input-wrapper--readonly",
          wrapperClassName,
        )}
      >
        {label && (
          <div className="maxa-input__label-row">
            <label htmlFor={inputId} className="maxa-input__label">
              {label}
            </label>
            {required && <span className="maxa-input__required">*</span>}
            {infoIcon && <span className="maxa-input__info" aria-hidden="true">{infoIcon}</span>}
          </div>
        )}

        <div className="maxa-input__field maxa-input__field--textarea">
          <textarea
            ref={ref}
            id={inputId}
            className={cn("maxa-input__input maxa-input__textarea", className ?? "")}
            disabled={disabled}
            readOnly={readOnly}
            aria-disabled={readOnly || undefined}
            tabIndex={readOnly ? -1 : tabIndex}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            aria-invalid={resolvedStatus === "error" || undefined}
            aria-describedby={hint || error || characterCounter ? `${inputId}-hint` : undefined}
            onFocus={handleFocus}
            onMouseDown={handleMouseDown}
            {...props}
          />
        </div>

        {(hint || error || characterCounter) && (
          <div id={`${inputId}-hint`} className="maxa-input__footer">
            <span className="maxa-input__hint" role={error ? "alert" : undefined}>
              {error ?? hint}
            </span>
            {characterCounter && maxLength && (
              <span className="maxa-input__counter">
                {count}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    )
  },
)

TextArea.displayName = "TextArea"

export { Input, TextArea, inputWrapperVariants }

function SearchIcon() {
  return <MagnifyingGlass width={16} height={16} aria-hidden focusable={false} />
}

function EyeIcon() {
  return <Eye width={16} height={16} aria-hidden focusable={false} />
}

function ClearIcon() {
  return <X width={14} height={14} aria-hidden focusable={false} />
}

function MinusIcon() {
  return <Minus width={16} height={16} aria-hidden focusable={false} />
}

function PlusIcon() {
  return <Plus width={16} height={16} aria-hidden focusable={false} />
}
