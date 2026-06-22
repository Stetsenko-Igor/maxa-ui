"use client"

import * as React from "react"
import { CaretDown, X } from "@maxa/icons"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../dropdown-menu/index.js"
import { FormField, type FormFieldSize } from "../form-field/index.js"
import "./multi-select.css"
import { cn } from "../../lib/cn.js"
import { useControlledState, useFieldId } from "@maxa/hooks"

export interface MultiSelectOption {
  label: string
  value: string
}

export interface MultiSelectProps {
  disabled?: boolean
  error?: string
  hint?: string
  label?: string
  options: MultiSelectOption[]
  placeholder?: string
  required?: boolean
  size?: FormFieldSize
  value?: string[]
  defaultValue?: string[]
  wrapperClassName?: string
  onValueChange?: (value: string[]) => void
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(function MultiSelect(
  {
    defaultValue = [],
    disabled,
    error,
    hint,
    label,
    onValueChange,
    options,
    placeholder = "Select options",
    required,
    size = "md",
    value,
    wrapperClassName,
  },
  ref,
) {
  const [selectedValues, setValues] = useControlledState({ value, defaultValue, onChange: onValueChange })
  const inputId = useFieldId()
  const hintId = hint || error ? `${inputId}-hint` : undefined
  const selectedOptions = options.filter((option) => selectedValues.includes(option.value))

  const setSelectedValues = (nextValue: string[]) => {
    if (disabled) return
    setValues(nextValue)
  }

  const toggleValue = (optionValue: string) => {
    setSelectedValues(
      selectedValues.includes(optionValue)
        ? selectedValues.filter((item) => item !== optionValue)
        : [...selectedValues, optionValue],
    )
  }

  return (
    <FormField
      ref={ref}
      className={wrapperClassName}
      error={error}
      hint={hint}
      hintId={hintId}
      htmlFor={inputId}
      label={label}
      required={required}
      size={size}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            id={inputId}
            aria-describedby={hintId}
            aria-disabled={disabled || undefined}
            aria-invalid={error ? true : undefined}
            className={cn(
              "maxa-multi-select__trigger",
              `maxa-multi-select__trigger--${size}`,
              error ? "maxa-multi-select__trigger--error" : "",
              disabled ? "maxa-multi-select__trigger--disabled" : "",
            )}
            role="button"
            tabIndex={disabled ? -1 : 0}
          >
            <span className="maxa-multi-select__value">
              {selectedOptions.length === 0 ? (
                <span className="maxa-multi-select__placeholder">{placeholder}</span>
              ) : (
                selectedOptions.map((option) => (
                  <span key={option.value} className="maxa-multi-select__chip">
                    <span>{option.label}</span>
                    <button
                      type="button"
                      aria-label={`Remove ${option.label}`}
                      className="maxa-multi-select__chip-remove"
                      disabled={disabled}
                      onPointerDown={(event) => {
                        // Radix opens the menu on pointerdown; stop it here so the
                        // remove button doesn't also toggle the dropdown.
                        event.preventDefault()
                        event.stopPropagation()
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.stopPropagation()
                        }
                      }}
                      onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        toggleValue(option.value)
                      }}
                    >
                      <CloseIcon />
                    </button>
                  </span>
                ))
              )}
            </span>
            <span className="maxa-multi-select__chevron" aria-hidden="true"><ChevronDownIcon /></span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="maxa-multi-select__menu">
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={selectedValues.includes(option.value)}
              onSelect={(event) => {
                event.preventDefault()
                toggleValue(option.value)
              }}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </FormField>
  )
})

MultiSelect.displayName = "MultiSelect"

export { MultiSelect }

function ChevronDownIcon() {
  return <CaretDown width="100%" height="100%" aria-hidden focusable={false} />
}

function CloseIcon() {
  return <X width="100%" height="100%" aria-hidden focusable={false} />
}
