"use client"

import * as React from "react"
import { Calendar } from "../calendar"
import { FormField, type FormFieldSize } from "../form-field"
import "./date-picker.css"

type DatePickerVisualState = "default" | "hover" | "focus" | "error" | "disabled"

interface DatePickerBaseProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  calendar?: boolean
  error?: string
  hint?: string
  infoIcon?: React.ReactNode
  label?: string
  onDateSelect?: (date: Date) => void
  required?: boolean
  selectedDate?: Date
  size?: FormFieldSize
  visualState?: DatePickerVisualState
  wrapperClassName?: string
}

export type DatePickerProps = DatePickerBaseProps
export interface DateRangePickerProps extends DatePickerBaseProps {
  endDate?: Date
  onRangeApply?: (range: { startDate: Date | undefined; endDate: Date | undefined }) => void
  startDate?: Date
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (props, ref) => <DatePickerField ref={ref} calendar placeholder="mm/dd/yyyy" {...props} />,
)

DatePicker.displayName = "DatePicker"

const DateRangePicker = React.forwardRef<HTMLInputElement, DateRangePickerProps>(
  (props, ref) => <DateRangePickerField ref={ref} placeholder="mm/dd/yyyy - mm/dd/yyyy" {...props} />,
)

DateRangePicker.displayName = "DateRangePicker"

const DatePickerField = React.forwardRef<HTMLInputElement, DatePickerBaseProps>(
  (
    {
      className,
      calendar = false,
      disabled,
      error,
      hint,
      id,
      infoIcon,
      label,
      defaultValue,
      onChange,
      onFocus,
      onDateSelect,
      required,
      selectedDate,
      size = "md",
      value,
      visualState = "default",
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? React.useId()
    const [open, setOpen] = React.useState(false)
    const [uncontrolledValue, setUncontrolledValue] = React.useState(() => String(defaultValue ?? ""))
    const inputValue = value !== undefined ? String(value) : uncontrolledValue
    const resolvedVisualState = disabled ? "disabled" : error ? "error" : visualState
    const selectedCalendarDate = selectedDate ?? parseDateValue(inputValue)
    const calendarMonth = selectedCalendarDate ?? new Date()

    const handleDateSelect = (date: Date) => {
      const nextValue = formatDateValue(date)
      onDateSelect?.(date)
      if (value === undefined) setUncontrolledValue(nextValue)
      setOpen(false)
    }

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
        <div className="maxa-date-picker">
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
              value={inputValue}
              aria-invalid={error ? true : undefined}
              aria-describedby={hint || error ? `${inputId}-hint` : undefined}
              onChange={(event) => {
                onChange?.(event)
                if (value === undefined) setUncontrolledValue(event.target.value)
              }}
              onFocus={(event) => {
                onFocus?.(event)
                if (calendar && !disabled) setOpen(true)
              }}
              {...props}
            />
            <button
              type="button"
              className="maxa-date-picker__icon"
              aria-label="Open calendar"
              aria-expanded={calendar ? open : undefined}
              aria-haspopup={calendar ? "dialog" : undefined}
              disabled={disabled || !calendar}
              tabIndex={calendar ? 0 : -1}
              onClick={() => {
                if (calendar && !disabled) setOpen((current) => !current)
              }}
            >
              <CalendarIcon />
            </button>
          </div>
          {calendar && open && !disabled && (
            <div className="maxa-date-picker__popover" role="dialog" aria-label="Choose date">
              <Calendar
                defaultMonth={calendarMonth}
                {...(selectedCalendarDate ? { selected: selectedCalendarDate } : {})}
                onDateSelect={handleDateSelect}
              />
            </div>
          )}
        </div>
      </FormField>
    )
  },
)

DatePickerField.displayName = "DatePickerField"

const PRESETS = ["Today", "Yesterday", "This Week", "Last 7 days", "This Month", "Last 30 days", "This quarter", "Last quarter", "This Year", "Last Year"]

const DateRangePickerField = React.forwardRef<HTMLInputElement, DateRangePickerProps>(
  (
    {
      className,
      disabled,
      endDate,
      error,
      hint,
      id,
      infoIcon,
      label,
      defaultValue,
      onChange,
      onFocus,
      onRangeApply,
      required,
      size = "md",
      startDate,
      value,
      visualState = "default",
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? React.useId()
    const [open, setOpen] = React.useState(false)
    const [uncontrolledValue, setUncontrolledValue] = React.useState(() => String(defaultValue ?? ""))
    const inputValue = value !== undefined ? String(value) : uncontrolledValue
    const parsedRange = parseRangeValue(inputValue)
    const resolvedStart = startDate ?? parsedRange.startDate
    const resolvedEnd = endDate ?? parsedRange.endDate
    const [draftStart, setDraftStart] = React.useState<Date | undefined>(resolvedStart)
    const [draftEnd, setDraftEnd] = React.useState<Date | undefined>(resolvedEnd)
    const [leftMonth, setLeftMonth] = React.useState(getMonthStart(resolvedStart ?? new Date(2025, 4, 1)))
    const resolvedVisualState = disabled ? "disabled" : error ? "error" : visualState

    React.useEffect(() => {
      if (!open) return
      const nextLeftMonth = getMonthStart(resolvedStart ?? new Date(2025, 4, 1))
      setDraftStart((current) => isSameDay(current, resolvedStart) ? current : resolvedStart)
      setDraftEnd((current) => isSameDay(current, resolvedEnd) ? current : resolvedEnd)
      setLeftMonth((current) => isSameMonth(current, nextLeftMonth) ? current : nextLeftMonth)
    }, [open, resolvedStart, resolvedEnd])

    const rightMonth = new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1, 1)
    const applyRange = () => {
      const nextValue = formatRangeValue(draftStart, draftEnd)
      onRangeApply?.({ startDate: draftStart, endDate: draftEnd })
      if (value === undefined) setUncontrolledValue(nextValue)
      setOpen(false)
    }
    const selectRangeDate = (date: Date) => {
      if (!draftStart || draftEnd) {
        setDraftStart(date)
        setDraftEnd(undefined)
        return
      }
      if (isBeforeDay(date, draftStart)) {
        setDraftStart(date)
        setDraftEnd(undefined)
        return
      }
      setDraftEnd(date)
    }

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
        <div className="maxa-date-picker">
          <div
            className={[
              "maxa-date-picker__field",
              `maxa-date-picker__field--${size}`,
              `maxa-date-picker__field--visual-${resolvedVisualState}`,
              error ? "maxa-date-picker__field--error" : "",
              disabled ? "maxa-date-picker__field--disabled" : "",
            ].filter(Boolean).join(" ")}
          >
            <input
              ref={ref}
              id={inputId}
              className={["maxa-date-picker__input", className ?? ""].filter(Boolean).join(" ")}
              disabled={disabled}
              inputMode="numeric"
              value={inputValue}
              aria-invalid={error ? true : undefined}
              aria-describedby={hint || error ? `${inputId}-hint` : undefined}
              onChange={(event) => {
                onChange?.(event)
                if (value === undefined) setUncontrolledValue(event.target.value)
              }}
              onFocus={(event) => {
                onFocus?.(event)
                if (!disabled) setOpen(true)
              }}
              {...props}
            />
            <button
              type="button"
              className="maxa-date-picker__icon"
              aria-label="Open date range calendar"
              aria-expanded={open}
              aria-haspopup="dialog"
              disabled={disabled}
              onClick={() => {
                if (!disabled) setOpen((current) => !current)
              }}
            >
              <CalendarIcon />
            </button>
          </div>
          {open && !disabled && (
            <div className="maxa-date-picker__range-popover" role="dialog" aria-label="Choose date range">
              <div className="maxa-date-picker__presets">
                {PRESETS.map((preset) => (
                  <button key={preset} className="maxa-date-picker__preset" type="button">{preset}</button>
                ))}
              </div>
              <div className="maxa-date-picker__range-body">
                <Calendar
                  month={leftMonth}
                  onMonthChange={setLeftMonth}
                  currentDate={new Date(2025, 4, 15)}
                  {...(draftStart ? { rangeStart: draftStart } : {})}
                  {...(draftEnd ? { rangeEnd: draftEnd } : {})}
                  onDateSelect={selectRangeDate}
                />
                <Calendar
                  month={rightMonth}
                  onMonthChange={(month) => setLeftMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                  currentDate={new Date(2025, 4, 15)}
                  {...(draftStart ? { rangeStart: draftStart } : {})}
                  {...(draftEnd ? { rangeEnd: draftEnd } : {})}
                  onDateSelect={selectRangeDate}
                />
              </div>
              <div className="maxa-date-picker__range-footer">
                <input className="maxa-date-picker__range-input" readOnly value={draftStart ? formatDateValue(draftStart) : ""} placeholder="mm/dd/yyyy" />
                <span className="maxa-date-picker__range-separator">-</span>
                <input className="maxa-date-picker__range-input" readOnly value={draftEnd ? formatDateValue(draftEnd) : ""} placeholder="mm/dd/yyyy" />
                <div className="maxa-date-picker__range-actions">
                  <button className="maxa-button maxa-button--secondary maxa-button--md" type="button" onClick={() => setOpen(false)}>Cancel</button>
                  <button className="maxa-button maxa-button--primary maxa-button--md" type="button" onClick={applyRange}>Apply</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </FormField>
    )
  },
)

DateRangePickerField.displayName = "DateRangePickerField"

export { DatePicker, DateRangePicker }

function formatDateValue(date: Date) {
  return date.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })
}

function parseDateValue(value: string) {
  const [month, day, year] = value.split("/").map((part) => Number(part))
  if (!month || !day || !year) return undefined
  const date = new Date(year, month - 1, day)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return undefined
  return date
}

function parseRangeValue(value: string) {
  const [startValue, endValue] = value.split(" - ")
  return {
    startDate: parseDateValue(startValue ?? ""),
    endDate: parseDateValue(endValue ?? ""),
  }
}

function formatRangeValue(startDate: Date | undefined, endDate: Date | undefined) {
  if (!startDate && !endDate) return ""
  return `${startDate ? formatDateValue(startDate) : ""} - ${endDate ? formatDateValue(endDate) : ""}`
}

function isBeforeDay(a: Date, b: Date) {
  return new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime() < new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime()
}

function isSameDay(a: Date | undefined, b: Date | undefined) {
  if (!a || !b) return a === b
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

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
