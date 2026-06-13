"use client"

import * as React from "react"
import { CaretDown, Check } from "@maxa/icons"
import { FormField, type FormFieldSize } from "../form-field/index.js"
import "./select.css"

type SelectVisualState = "default" | "hover" | "focus" | "error" | "disabled" | "open"

type SelectOption = {
  disabled?: boolean
  label: string
  value: string
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children" | "defaultValue" | "multiple" | "onChange" | "size" | "value"> {
  children?: React.ReactNode
  defaultOpen?: boolean
  defaultValue?: string
  error?: string
  hint?: string
  infoIcon?: React.ReactNode
  label?: string
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
  onValueChange?: (value: string) => void
  options?: SelectOption[]
  placeholder?: string
  required?: boolean
  size?: FormFieldSize
  value?: string
  visualState?: SelectVisualState
  wrapperClassName?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      children,
      className,
      defaultValue,
      defaultOpen = false,
      disabled,
      error,
      hint,
      id,
      infoIcon,
      label,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onValueChange,
      options,
      placeholder = "Select an option",
      required,
      size = "md",
      value,
      visualState = "default",
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId()
    const selectId = id ?? reactId
    const triggerId = `${selectId}-trigger`
    const listboxId = `${selectId}-listbox`
    const hintId = hint || error ? `${selectId}-hint` : undefined
    const parsedOptions = React.useMemo(() => options ?? optionsFromChildren(children), [children, options])
    const enabledOptions = React.useMemo(() => parsedOptions.filter((option) => !option.disabled), [parsedOptions])
    const initialValue = defaultValue ?? parsedOptions.find((option) => !option.disabled)?.value ?? ""
    const [internalValue, setInternalValue] = React.useState(initialValue)
    const [open, setOpen] = React.useState(defaultOpen)
    const [highlightedValue, setHighlightedValue] = React.useState<string | null>(null)
    const rootRef = React.useRef<HTMLDivElement | null>(null)
    const selectRef = React.useRef<HTMLSelectElement | null>(null)
    const currentValue = value ?? internalValue
    const selectedOption = parsedOptions.find((option) => option.value === currentValue)
    const showPlaceholder = !selectedOption || (selectedOption.disabled && selectedOption.value === "")
    const highlightedOption = parsedOptions.find((option) => option.value === highlightedValue)
    const resolvedVisualState = disabled ? "disabled" : error ? "error" : open ? "open" : visualState

    React.useImperativeHandle(ref, () => selectRef.current as HTMLSelectElement)

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
      const nextHighlightedValue = currentValue && !selectedOption?.disabled
        ? currentValue
        : enabledOptions[0]?.value ?? null
      setHighlightedValue((current) => current === nextHighlightedValue ? current : nextHighlightedValue)
    }, [currentValue, enabledOptions, open, selectedOption?.disabled])

    function commitValue(nextValue: string) {
      if (disabled) return
      const nextOption = parsedOptions.find((option) => option.value === nextValue)
      if (!nextOption || nextOption.disabled) return

      onValueChange?.(nextValue)
      if (value === undefined) setInternalValue(nextValue)

      if (selectRef.current) {
        selectRef.current.value = nextValue
        onChange?.({
          currentTarget: selectRef.current,
          target: selectRef.current,
        } as React.ChangeEvent<HTMLSelectElement>)
      }

      setOpen(false)
      setHighlightedValue(nextValue)
    }

    function moveHighlight(direction: 1 | -1) {
      if (enabledOptions.length === 0) return
      const currentIndex = enabledOptions.findIndex((option) => option.value === (highlightedValue ?? currentValue))
      const nextIndex = currentIndex === -1
        ? direction === 1 ? 0 : enabledOptions.length - 1
        : (currentIndex + direction + enabledOptions.length) % enabledOptions.length
      setHighlightedValue(enabledOptions[nextIndex]?.value ?? null)
    }

    function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
      onKeyDown?.(event as unknown as React.KeyboardEvent<HTMLSelectElement>)
      if (event.defaultPrevented || disabled) return

      if (event.key === "ArrowDown") {
        event.preventDefault()
        if (!open) setOpen(true)
        moveHighlight(1)
      } else if (event.key === "ArrowUp") {
        event.preventDefault()
        if (!open) setOpen(true)
        moveHighlight(-1)
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
        if (open && highlightedValue) commitValue(highlightedValue)
        else setOpen(true)
      } else if (event.key === "Escape") {
        event.preventDefault()
        setOpen(false)
      }
    }

    return (
      <FormField
        className={wrapperClassName}
        error={error}
        hint={hint}
        hintId={hintId}
        htmlFor={triggerId}
        infoIcon={infoIcon}
        label={label}
        required={required}
        size={size}
      >
        <div ref={rootRef} className="maxa-select">
          <button
            id={triggerId}
            type="button"
            aria-activedescendant={open && highlightedOption ? `${listboxId}-${highlightedOption.value}` : undefined}
            aria-controls={listboxId}
            aria-describedby={hintId}
            aria-disabled={disabled || undefined}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-invalid={error ? true : undefined}
            className={[
              "maxa-select__field",
              `maxa-select__field--${size}`,
              `maxa-select__field--visual-${resolvedVisualState}`,
              error ? "maxa-select__field--error" : "",
              disabled ? "maxa-select__field--disabled" : "",
              className ?? "",
            ].filter(Boolean).join(" ")}
            disabled={disabled}
            onBlur={(event) => onBlur?.(event as unknown as React.FocusEvent<HTMLSelectElement>)}
            onClick={() => {
              if (!disabled) setOpen((isOpen) => !isOpen)
            }}
            onFocus={(event) => onFocus?.(event as unknown as React.FocusEvent<HTMLSelectElement>)}
            onKeyDown={handleTriggerKeyDown}
            role="combobox"
          >
            <span className={showPlaceholder ? "maxa-select__placeholder" : "maxa-select__value"}>
              {selectedOption?.label ?? placeholder}
            </span>
            <span className="maxa-select__chevron" aria-hidden="true">
              <ChevronDownIcon />
            </span>
          </button>

          <select
            ref={selectRef}
            id={selectId}
            aria-hidden="true"
            className="maxa-select__native"
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={onChange ?? (value !== undefined ? () => {} : undefined)}
            tabIndex={-1}
            value={value}
            {...props}
          >
            {children ?? parsedOptions.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>

          {open && (
            <div id={listboxId} className="maxa-select__listbox" role="listbox" tabIndex={-1}>
              {parsedOptions.map((option) => {
                const selected = option.value === currentValue
                const highlighted = option.value === highlightedValue
                return (
                  <button
                    key={option.value}
                    id={`${listboxId}-${option.value}`}
                    type="button"
                    aria-disabled={option.disabled || undefined}
                    aria-selected={selected}
                    className={[
                      "maxa-select__option",
                      selected ? "maxa-select__option--selected" : "",
                      highlighted ? "maxa-select__option--highlighted" : "",
                    ].filter(Boolean).join(" ")}
                    disabled={option.disabled}
                    onClick={() => commitValue(option.value)}
                    onMouseEnter={() => {
                      if (!option.disabled) setHighlightedValue(option.value)
                    }}
                    role="option"
                  >
                    <span className="maxa-select__option-label">{option.label}</span>
                    {selected && <span className="maxa-select__option-check" aria-hidden="true"><CheckIcon /></span>}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </FormField>
    )
  },
)

Select.displayName = "Select"

export { Select }

function optionsFromChildren(children: React.ReactNode): SelectOption[] {
  const parsedOptions: SelectOption[] = []

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement<React.OptionHTMLAttributes<HTMLOptionElement>>(child)) return
    if (child.type !== "option") return

    const value = child.props.value == null ? textFromNode(child.props.children) : String(child.props.value)
    parsedOptions.push({
      ...(child.props.disabled !== undefined ? { disabled: child.props.disabled } : {}),
      label: textFromNode(child.props.children),
      value,
    })
  })

  return parsedOptions
}

function textFromNode(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textFromNode).join("")
  return ""
}

function ChevronDownIcon() {
  return <CaretDown width="100%" height="100%" aria-hidden focusable={false} />
}

function CheckIcon() {
  return <Check width="100%" height="100%" aria-hidden focusable={false} />
}
