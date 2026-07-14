"use client"

import * as React from "react"
import { CaretDown, Check, X } from "@maxa/icons"
import { FormField, type FormFieldSize } from "../form-field/index.js"
import "./multi-select.css"
import { cn } from "../../lib/cn.js"
import { optionDomId } from "../../lib/option-id.js"
import { useControlledState, useFieldId } from "@maxa/hooks"

export interface MultiSelectOption {
  disabled?: boolean
  label: string
  value: string
}

export interface MultiSelectProps {
  disabled?: boolean
  error?: string
  hint?: string
  label?: string
  name?: string
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
    name,
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
  const fieldId = useFieldId()
  const triggerId = `${fieldId}-trigger`
  const listboxId = `${fieldId}-listbox`
  const hintId = hint || error ? `${fieldId}-hint` : undefined

  const [selectedValues, setValues] = useControlledState({ value, defaultValue, onChange: onValueChange })
  const [open, setOpen] = React.useState(false)
  const [highlightedValue, setHighlightedValue] = React.useState<string | null>(null)
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)

  const enabledOptions = React.useMemo(() => options.filter((option) => !option.disabled), [options])
  const selectedOptions = options.filter((option) => selectedValues.includes(option.value))
  const highlightedIndex = options.findIndex((option) => option.value === highlightedValue)
  const highlightedOption = highlightedIndex === -1 ? undefined : options[highlightedIndex]
  const triggerSummary = selectedOptions.length > 0
    ? selectedOptions.map((option) => option.label).join(", ")
    : placeholder

  React.useEffect(() => {
    if (!open) return

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [open])

  React.useEffect(() => {
    if (!open) return
    setHighlightedValue((current) => {
      if (current && enabledOptions.some((option) => option.value === current)) return current
      const firstSelected = enabledOptions.find((option) => selectedValues.includes(option.value))
      return firstSelected?.value ?? enabledOptions[0]?.value ?? null
    })
  }, [open, enabledOptions, selectedValues])

  function toggleValue(optionValue: string) {
    if (disabled) return
    const option = options.find((item) => item.value === optionValue)
    if (!option || option.disabled) return
    setValues(
      selectedValues.includes(optionValue)
        ? selectedValues.filter((item) => item !== optionValue)
        : [...selectedValues, optionValue],
    )
  }

  function removeValue(optionValue: string) {
    if (disabled) return
    setValues(selectedValues.filter((item) => item !== optionValue))
  }

  function moveHighlight(direction: 1 | -1) {
    if (enabledOptions.length === 0) return
    const currentIndex = enabledOptions.findIndex((option) => option.value === highlightedValue)
    const nextIndex = currentIndex === -1
      ? direction === 1 ? 0 : enabledOptions.length - 1
      : (currentIndex + direction + enabledOptions.length) % enabledOptions.length
    setHighlightedValue(enabledOptions[nextIndex]?.value ?? null)
  }

  function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return

    if (event.key === "ArrowDown") {
      event.preventDefault()
      // First open: the open-effect seeds the highlight (first selected / first
      // enabled), so don't advance past it. Intentionally differs from Select,
      // which advances on open because it is single-pick.
      if (!open) setOpen(true)
      else moveHighlight(1)
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      if (!open) setOpen(true)
      else moveHighlight(-1)
    } else if (event.key === "Home") {
      event.preventDefault()
      setOpen(true)
      setHighlightedValue(enabledOptions[0]?.value ?? null)
    } else if (event.key === "End") {
      event.preventDefault()
      setOpen(true)
      setHighlightedValue(enabledOptions[enabledOptions.length - 1]?.value ?? null)
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      if (open && highlightedValue) toggleValue(highlightedValue)
      else setOpen(true)
    } else if (event.key === "Escape") {
      if (open) {
        event.preventDefault()
        setOpen(false)
      }
    }
  }

  return (
    <FormField
      ref={ref}
      className={wrapperClassName}
      error={error}
      hint={hint}
      hintId={hintId}
      htmlFor={triggerId}
      label={label}
      required={required}
      size={size}
    >
      <div
        ref={rootRef}
        className="maxa-multi-select"
        onBlur={(event) => {
          // Close when focus leaves the component entirely (e.g. Tab away).
          if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
            setOpen(false)
          }
        }}
      >
        <div
          className={cn(
            "maxa-multi-select__trigger",
            `maxa-multi-select__trigger--${size}`,
            error ? "maxa-multi-select__trigger--error" : "",
            disabled ? "maxa-multi-select__trigger--disabled" : "",
          )}
          onClick={() => {
            if (disabled) return
            triggerRef.current?.focus()
            setOpen((isOpen) => !isOpen)
          }}
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
                      event.preventDefault()
                      event.stopPropagation()
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        event.stopPropagation()
                        removeValue(option.value)
                      }
                    }}
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      removeValue(option.value)
                    }}
                  >
                    <CloseIcon />
                  </button>
                </span>
              ))
            )}
          </span>
          <button
            ref={triggerRef}
            id={triggerId}
            type="button"
            aria-activedescendant={open && highlightedOption ? optionDomId(listboxId, highlightedIndex, highlightedOption.value) : undefined}
            aria-controls={open ? listboxId : undefined}
            aria-describedby={hintId}
            // role="combobox" does not take its name from content, so without a
            // FormField label the button would be unnamed. Fall back to the summary.
            aria-label={label ? undefined : triggerSummary}
            aria-disabled={disabled || undefined}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-invalid={error ? true : undefined}
            className="maxa-multi-select__combobox"
            disabled={disabled}
            onClick={(event) => {
              event.stopPropagation()
              if (!disabled) setOpen((isOpen) => !isOpen)
            }}
            onKeyDown={handleTriggerKeyDown}
            role="combobox"
          >
            <span className="maxa-multi-select__trigger-summary">{triggerSummary}</span>
            <span className="maxa-multi-select__chevron" aria-hidden="true"><ChevronDownIcon /></span>
          </button>
        </div>

        <select
          aria-hidden="true"
          className="maxa-multi-select__native"
          disabled={disabled}
          multiple
          name={name}
          onChange={() => {}}
          tabIndex={-1}
          value={selectedValues}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        {open && (
          <div
            id={listboxId}
            aria-multiselectable="true"
            className="maxa-multi-select__listbox"
            role="listbox"
            tabIndex={-1}
          >
            {options.map((option, index) => {
              const selected = selectedValues.includes(option.value)
              const highlighted = option.value === highlightedValue
              return (
                <button
                  key={option.value}
                  id={optionDomId(listboxId, index, option.value)}
                  type="button"
                  aria-disabled={option.disabled || undefined}
                  aria-selected={selected}
                  className={cn(
                    "maxa-multi-select__option",
                    selected ? "maxa-multi-select__option--selected" : "",
                    highlighted ? "maxa-multi-select__option--highlighted" : "",
                  )}
                  disabled={option.disabled}
                  tabIndex={-1}
                  onMouseDown={(event) => {
                    // Keep focus (and aria-activedescendant) on the combobox trigger;
                    // the listbox stays open for multi-pick, so the trigger must not
                    // lose focus to an option button on click.
                    event.preventDefault()
                  }}
                  onClick={() => toggleValue(option.value)}
                  onMouseEnter={() => {
                    if (!option.disabled) setHighlightedValue(option.value)
                  }}
                  role="option"
                >
                  <span className="maxa-multi-select__option-label">{option.label}</span>
                  {selected && (
                    <span className="maxa-multi-select__option-check" aria-hidden="true"><CheckIcon /></span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </FormField>
  )
})

MultiSelect.displayName = "MultiSelect"

export { MultiSelect }

function ChevronDownIcon() {
  return <CaretDown width="100%" height="100%" aria-hidden focusable={false} />
}

function CheckIcon() {
  return <Check width="100%" height="100%" aria-hidden focusable={false} />
}

function CloseIcon() {
  return <X width="100%" height="100%" aria-hidden focusable={false} />
}
