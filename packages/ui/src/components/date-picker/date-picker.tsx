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

export interface DatePickerProps extends DatePickerBaseProps {
  calendarCurrentDate?: Date
  defaultCalendarMonth?: Date
  confirmSelection?: boolean
  defaultOpen?: boolean
  defaultMoreOpen?: boolean
  defaultTime?: string
  defaultTimeDropdownOpen?: boolean
  onDateApply?: (selection: { date: Date | undefined; time: string | undefined }) => void
  quickSelect?: "inline" | "more"
  timePicker?: boolean
}
export interface DateRangePickerProps extends DatePickerBaseProps {
  endDate?: Date
  onRangeApply?: (range: { startDate: Date | undefined; endDate: Date | undefined }) => void
  startDate?: Date
}
export interface QuarterPickerProps extends DatePickerBaseProps {
  onQuarterSelect?: (selection: { quarter: number; year: number }) => void
  quarter?: number
  year?: number
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (props, ref) => <DatePickerField ref={ref} calendar placeholder="mm/dd/yyyy" {...props} />,
)

DatePicker.displayName = "DatePicker"

const DateRangePicker = React.forwardRef<HTMLInputElement, DateRangePickerProps>(
  (props, ref) => <DateRangePickerField ref={ref} placeholder="mm/dd/yyyy - mm/dd/yyyy" {...props} />,
)

DateRangePicker.displayName = "DateRangePicker"

const QuarterPicker = React.forwardRef<HTMLInputElement, QuarterPickerProps>(
  (props, ref) => <QuarterPickerField ref={ref} placeholder="Q1/yyyy" {...props} />,
)

QuarterPicker.displayName = "QuarterPicker"

const DatePickerField = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      calendar = false,
      calendarCurrentDate,
      confirmSelection = false,
      disabled,
      error,
      hint,
      id,
      infoIcon,
      label,
      defaultValue,
      defaultCalendarMonth,
      defaultOpen = false,
      defaultMoreOpen = false,
      defaultTime = "8:00 am",
      defaultTimeDropdownOpen = false,
      onChange,
      onFocus,
      onDateApply,
      onDateSelect,
      quickSelect,
      required,
      selectedDate,
      size = "md",
      timePicker = false,
      value,
      visualState = "default",
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? React.useId()
    const rootRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [open, setOpen] = React.useState(defaultOpen)
    const [moreOpen, setMoreOpen] = React.useState(defaultMoreOpen)
    const [timeDropdownOpen, setTimeDropdownOpen] = React.useState(defaultTimeDropdownOpen)
    const [timeValue, setTimeValue] = React.useState(defaultTime)
    const [uncontrolledValue, setUncontrolledValue] = React.useState(() => String(defaultValue ?? ""))
    const inputValue = value !== undefined ? String(value) : uncontrolledValue
    const resolvedVisualState = disabled ? "disabled" : error ? "error" : visualState
    const parsedInputDate = React.useMemo(() => parseDateValue(inputValue), [inputValue])
    const selectedCalendarDate = selectedDate ?? parsedInputDate
    const [draftDate, setDraftDate] = React.useState<Date | undefined>(selectedCalendarDate)
    const confirmMode = confirmSelection || timePicker || Boolean(quickSelect)
    const calendarMonth = defaultCalendarMonth ?? draftDate ?? selectedCalendarDate ?? new Date(2025, 4, 1)

    React.useEffect(() => {
      if (!open) return
      setDraftDate(selectedCalendarDate)
      setMoreOpen(defaultMoreOpen)
      setTimeDropdownOpen(defaultTimeDropdownOpen)
    }, [defaultMoreOpen, defaultTimeDropdownOpen, open, selectedCalendarDate])

    const handleDateSelect = (date: Date) => {
      const nextValue = formatDateValue(date)
      onDateSelect?.(date)
      if (confirmMode) {
        setDraftDate(date)
        return
      }
      if (value === undefined) setUncontrolledValue(nextValue)
      setOpen(false)
    }
    const selectSinglePreset = (preset: string) => {
      const date = getSinglePresetDate(preset, new Date(2025, 4, 15))
      setDraftDate(date)
      setMoreOpen(false)
    }
    const applySelection = () => {
      const nextDate = draftDate
      if (nextDate && value === undefined) {
        setUncontrolledValue(timePicker ? formatDateTimeValue(nextDate, timeValue) : formatDateValue(nextDate))
      }
      if (nextDate) onDateSelect?.(nextDate)
      onDateApply?.({ date: nextDate, time: timePicker ? timeValue : undefined })
      setOpen(false)
    }
    const cancelSelection = () => {
      setDraftDate(selectedCalendarDate)
      setOpen(false)
    }

    useCloseOnOutsidePointerDown(rootRef, open, () => setOpen(false))
    const setInputRef = useMergedInputRef(ref, inputRef)

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
        <div ref={rootRef} className="maxa-date-picker">
          <div
            className={[
              "maxa-date-picker__field",
              `maxa-date-picker__field--${size}`,
              `maxa-date-picker__field--visual-${resolvedVisualState}`,
              open ? "maxa-date-picker__field--open" : "",
              error ? "maxa-date-picker__field--error" : "",
              disabled ? "maxa-date-picker__field--disabled" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <input
              ref={setInputRef}
              id={inputId}
              className={["maxa-date-picker__input", className ?? ""].filter(Boolean).join(" ")}
              disabled={disabled}
              inputMode="numeric"
              value={inputValue}
              aria-invalid={error ? true : undefined}
              aria-describedby={hint || error ? `${inputId}-hint` : undefined}
              onChange={(event) => {
                onChange?.(event)
                if (value === undefined) setUncontrolledValue(formatDateTypingValue(event.target.value))
              }}
              onKeyDown={(event) => {
                handleDateTypingKeyDown(event, {
                  mode: "single",
                  setValue: (nextValue) => {
                    if (value === undefined) setUncontrolledValue(nextValue)
                  },
                })
              }}
              onFocus={(event) => {
                onFocus?.(event)
                if (calendar && !disabled) setOpen(true)
                selectDateInputSegment(event.currentTarget, 0, "month")
              }}
              onPaste={(event) => {
                handleDateTypingPaste(event, {
                  mode: "single",
                  setValue: (nextValue) => {
                    if (value === undefined) setUncontrolledValue(nextValue)
                  },
                })
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
            <div
              className={[
                "maxa-date-picker__single-popover",
                confirmMode ? "maxa-date-picker__single-popover--confirm" : "",
              ].filter(Boolean).join(" ")}
              role="dialog"
              aria-label="Choose date"
              onPointerDownCapture={(event) => {
                const target = event.target as HTMLElement
                if (moreOpen && !target.closest(".maxa-date-picker__more")) setMoreOpen(false)
                if (timeDropdownOpen && !target.closest(".maxa-date-picker__time-control")) {
                  setTimeDropdownOpen(false)
                }
              }}
            >
              {quickSelect && (
                <div className="maxa-date-picker__quickbar">
                  {(quickSelect === "inline" ? SINGLE_INLINE_PRESETS : ["Yesterday", "Today"]).map((preset) => (
                    <button
                      key={preset}
                      className="maxa-date-picker__quickbar-item"
                      type="button"
                      onClick={() => selectSinglePreset(preset)}
                    >
                      {preset}
                    </button>
                  ))}
                  {quickSelect === "more" && (
                    <div className="maxa-date-picker__more">
                      <button
                        className="maxa-date-picker__quickbar-item maxa-date-picker__more-trigger"
                        type="button"
                        aria-expanded={moreOpen}
                        aria-haspopup="menu"
                        onClick={() => setMoreOpen((current) => !current)}
                      >
                        More
                        <ChevronDownIcon />
                      </button>
                      {moreOpen && (
                        <div className="maxa-date-picker__more-menu" role="menu">
                          {SINGLE_MORE_PRESETS.map((preset) => (
                            <button
                              key={preset}
                              className="maxa-date-picker__more-item"
                              type="button"
                              role="menuitem"
                              onClick={() => selectSinglePreset(preset)}
                            >
                              {preset}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              <Calendar
                defaultMonth={calendarMonth}
                {...(calendarCurrentDate ? { currentDate: calendarCurrentDate } : {})}
                {...(draftDate ? { selected: draftDate } : selectedCalendarDate ? { selected: selectedCalendarDate } : {})}
                onDateSelect={handleDateSelect}
              />
              {timePicker && (
                <div className="maxa-date-picker__time">
                  <label className="maxa-date-picker__time-label" htmlFor={`${inputId}-time`}>Time</label>
                  <div className="maxa-date-picker__time-control">
                    <input
                      id={`${inputId}-time`}
                      className="maxa-date-picker__time-input"
                      value={timeValue}
                      onChange={(event) => setTimeValue(event.target.value)}
                      onFocus={() => setTimeDropdownOpen(true)}
                      onClick={() => setTimeDropdownOpen(true)}
                    />
                    <button
                      className="maxa-date-picker__time-icon"
                      type="button"
                      aria-label="Open time picker"
                      aria-expanded={timeDropdownOpen}
                      onClick={() => setTimeDropdownOpen((current) => !current)}
                    >
                      <ClockIcon />
                    </button>
                    {timeDropdownOpen && (
                      <div className="maxa-date-picker__time-menu" role="listbox">
                        {TIME_OPTIONS.map((time) => (
                          <button
                            key={time}
                            className="maxa-date-picker__time-option"
                            data-selected={time === timeValue || undefined}
                            type="button"
                            role="option"
                            aria-selected={time === timeValue}
                            onClick={() => {
                              setTimeValue(time)
                              setTimeDropdownOpen(false)
                            }}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {confirmMode && (
                <div className="maxa-date-picker__single-footer">
                  <button className="maxa-button maxa-button--secondary maxa-button--md" type="button" onClick={cancelSelection}>Cancel</button>
                  <button className="maxa-button maxa-button--primary maxa-button--md" type="button" onClick={applySelection}>Apply</button>
                </div>
              )}
            </div>
          )}
        </div>
      </FormField>
    )
  },
)

DatePickerField.displayName = "DatePickerField"

const PRESETS = ["Today", "Yesterday", "This Week", "Last 7 days", "This Month", "Last 30 days", "This quarter", "Last quarter", "This Year", "Last Year"]
const SINGLE_INLINE_PRESETS = ["Yesterday", "Today", "Tomorrow"]
const SINGLE_MORE_PRESETS = ["Yesterday", "This Week", "Last 7 days", "This Month", "Last 30 days", "This quarter", "Last quarter", "This Year", "Last Year"]
const TIME_OPTIONS = ["6:00 am", "6:30 am", "7:00 am", "7:30 am", "8:00 am", "8:30 am", "9:00 am", "9:30 am"]

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
    const rootRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const [open, setOpen] = React.useState(false)
    const [uncontrolledValue, setUncontrolledValue] = React.useState(() => String(defaultValue ?? ""))
    const inputValue = value !== undefined ? String(value) : uncontrolledValue
    const parsedRange = React.useMemo(() => parseRangeValue(inputValue), [inputValue])
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
    const updateDraftRange = (nextStart: Date | undefined, nextEnd: Date | undefined) => {
      setDraftStart(nextStart)
      setDraftEnd(nextEnd)
      setLeftMonth(getMonthStart(nextStart ?? new Date(2025, 4, 1)))
    }

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
    const selectPreset = (preset: string) => {
      const range = getPresetRange(preset, new Date(2025, 4, 15))
      updateDraftRange(range.startDate, range.endDate)
    }

    useCloseOnOutsidePointerDown(rootRef, open, () => setOpen(false))
    const setInputRef = useMergedInputRef(ref, inputRef)

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
        <div ref={rootRef} className="maxa-date-picker">
          <div
            className={[
              "maxa-date-picker__field",
              `maxa-date-picker__field--${size}`,
              `maxa-date-picker__field--visual-${resolvedVisualState}`,
              open ? "maxa-date-picker__field--open" : "",
              error ? "maxa-date-picker__field--error" : "",
              disabled ? "maxa-date-picker__field--disabled" : "",
            ].filter(Boolean).join(" ")}
          >
            <input
              ref={setInputRef}
              id={inputId}
              className={["maxa-date-picker__input", className ?? ""].filter(Boolean).join(" ")}
              disabled={disabled}
              inputMode="numeric"
              value={inputValue}
              aria-invalid={error ? true : undefined}
              aria-describedby={hint || error ? `${inputId}-hint` : undefined}
              onChange={(event) => {
                onChange?.(event)
                if (value === undefined) setUncontrolledValue(formatDateRangeTypingValue(event.target.value))
              }}
              onKeyDown={(event) => {
                handleDateTypingKeyDown(event, {
                  mode: "range",
                  setValue: (nextValue) => {
                    if (value === undefined) setUncontrolledValue(nextValue)
                  },
                })
              }}
              onFocus={(event) => {
                onFocus?.(event)
                if (!disabled) setOpen(true)
                selectDateInputSegment(event.currentTarget, 0, "month")
              }}
              onPaste={(event) => {
                handleDateTypingPaste(event, {
                  mode: "range",
                  setValue: (nextValue) => {
                    if (value === undefined) setUncontrolledValue(nextValue)
                  },
                })
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
                  <button
                    key={preset}
                    className="maxa-date-picker__preset"
                    type="button"
                    data-selected={isPresetSelected(preset, draftStart, draftEnd) || undefined}
                    onClick={() => selectPreset(preset)}
                  >
                    {preset}
                  </button>
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

const QuarterPickerField = React.forwardRef<HTMLInputElement, QuarterPickerProps>(
  (
    {
      className,
      disabled,
      error,
      hint,
      id,
      infoIcon,
      label,
      defaultValue,
      onChange,
      onFocus,
      onQuarterSelect,
      quarter,
      required,
      size = "md",
      value,
      visualState = "default",
      wrapperClassName,
      year,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? React.useId()
    const rootRef = React.useRef<HTMLDivElement>(null)
    const [open, setOpen] = React.useState(false)
    const [yearPickerOpen, setYearPickerOpen] = React.useState(false)
    const [uncontrolledValue, setUncontrolledValue] = React.useState(() => String(defaultValue ?? ""))
    const inputValue = value !== undefined ? String(value) : uncontrolledValue
    const parsed = parseQuarterValue(inputValue)
    const resolvedQuarter = quarter ?? parsed?.quarter
    const resolvedYear = year ?? parsed?.year ?? new Date().getFullYear()
    const [visibleYear, setVisibleYear] = React.useState(resolvedYear)
    const [yearPageStart, setYearPageStart] = React.useState(resolvedYear - 10)
    const resolvedVisualState = disabled ? "disabled" : error ? "error" : visualState

    React.useEffect(() => {
      if (!open) return
      setVisibleYear(resolvedYear)
      setYearPageStart(resolvedYear - 10)
      setYearPickerOpen(false)
    }, [open, resolvedYear])

    const selectQuarter = (nextQuarter: number) => {
      const nextValue = formatQuarterValue(nextQuarter, visibleYear)
      onQuarterSelect?.({ quarter: nextQuarter, year: visibleYear })
      if (value === undefined) setUncontrolledValue(nextValue)
      setOpen(false)
    }

    useCloseOnOutsidePointerDown(rootRef, open, () => setOpen(false))

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
        <div ref={rootRef} className="maxa-date-picker">
          <div
            className={[
              "maxa-date-picker__field",
              `maxa-date-picker__field--${size}`,
              `maxa-date-picker__field--visual-${resolvedVisualState}`,
              open ? "maxa-date-picker__field--open" : "",
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
              aria-label="Open quarter picker"
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
            <div className="maxa-date-picker__quarter-popover" role="dialog" aria-label="Choose quarter">
              <div className="maxa-date-picker__quarter-header">
                <button
                  className="maxa-date-picker__quarter-nav"
                  type="button"
                  aria-label={yearPickerOpen ? "Previous year range" : "Previous year"}
                  onClick={() => {
                    if (yearPickerOpen) {
                      setYearPageStart((current) => current - 12)
                    } else {
                      setVisibleYear((current) => current - 1)
                      setYearPageStart((current) => current - 1)
                    }
                  }}
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  className={[
                    "maxa-date-picker__quarter-title",
                    yearPickerOpen ? "maxa-date-picker__quarter-title--active" : "",
                  ].filter(Boolean).join(" ")}
                  type="button"
                  aria-label="Choose quarter year"
                  onClick={() => setYearPickerOpen((current) => !current)}
                >
                  {visibleYear}
                  <ChevronDownIcon />
                </button>
                <button
                  className="maxa-date-picker__quarter-nav"
                  type="button"
                  aria-label={yearPickerOpen ? "Next year range" : "Next year"}
                  onClick={() => {
                    if (yearPickerOpen) {
                      setYearPageStart((current) => current + 12)
                    } else {
                      setVisibleYear((current) => current + 1)
                      setYearPageStart((current) => current + 1)
                    }
                  }}
                >
                  <ChevronRightIcon />
                </button>
              </div>
              <div className="maxa-date-picker__quarter-grid" role="grid" aria-label="Choose quarter">
                {[1, 2, 3, 4].map((candidateQuarter) => (
                  <button
                    key={candidateQuarter}
                    className="maxa-date-picker__quarter-item"
                    data-selected={
                      candidateQuarter === resolvedQuarter && visibleYear === resolvedYear
                        ? true
                        : undefined
                    }
                    type="button"
                    onClick={() => selectQuarter(candidateQuarter)}
                  >
                    Q{candidateQuarter}
                  </button>
                ))}
              </div>
              {yearPickerOpen && (
                <div className="maxa-date-picker__quarter-year-panel" role="dialog" aria-label="Choose quarter year">
                  <div className="maxa-date-picker__quarter-year-panel-header">
                    <button
                      className="maxa-date-picker__quarter-nav"
                      type="button"
                      aria-label="Previous year range"
                      onClick={() => setYearPageStart((current) => current - 12)}
                    >
                      <ChevronLeftIcon />
                    </button>
                    <div className="maxa-date-picker__quarter-year-title">
                      {yearPageStart} - {yearPageStart + 11}
                    </div>
                    <button
                      className="maxa-date-picker__quarter-nav"
                      type="button"
                      aria-label="Next year range"
                      onClick={() => setYearPageStart((current) => current + 12)}
                    >
                      <ChevronRightIcon />
                    </button>
                  </div>
                  <div className="maxa-date-picker__year-grid" role="grid" aria-label="Choose quarter year">
                    {Array.from({ length: 12 }, (_, index) => yearPageStart + index).map((candidateYear) => (
                      <button
                        key={candidateYear}
                        className="maxa-date-picker__year-item"
                        data-selected={candidateYear === visibleYear || undefined}
                        data-accent={
                          candidateYear === resolvedYear && candidateYear !== visibleYear ? "outline" : undefined
                        }
                        type="button"
                        onClick={() => {
                          setVisibleYear(candidateYear)
                          setYearPickerOpen(false)
                        }}
                      >
                        {candidateYear}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </FormField>
    )
  },
)

QuarterPickerField.displayName = "QuarterPickerField"

export { DatePicker, DateRangePicker, QuarterPicker }

type DateInputSegment = "month" | "day" | "year"
type DateInputMode = "single" | "range"

interface DateTypingOptions {
  mode: DateInputMode
  setValue: (value: string) => void
}

interface DateParts {
  month: string
  day: string
  year: string
}

function useMergedInputRef(
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
  localRef: React.RefObject<HTMLInputElement | null>,
) {
  return React.useCallback((node: HTMLInputElement | null) => {
    localRef.current = node

    if (typeof forwardedRef === "function") {
      forwardedRef(node)
      return
    }

    if (forwardedRef) {
      forwardedRef.current = node
    }
  }, [forwardedRef, localRef])
}

function handleDateTypingKeyDown(event: React.KeyboardEvent<HTMLInputElement>, options: DateTypingOptions) {
  if (event.metaKey || event.ctrlKey || event.altKey) return

  const input = event.currentTarget
  const active = getActiveDateSegment(input)

  if (/^\d$/.test(event.key)) {
    event.preventDefault()
    const state = parseDateInputState(input.value, options.mode)
    const replaceSegment = isSegmentSelected(input, active.dateIndex, active.segment)
    const result = applyDateSegmentDigit(
      state.dates[active.dateIndex] ?? createEmptyDateParts(),
      active.segment,
      event.key,
      replaceSegment,
    )
    state.dates[active.dateIndex] = result.parts

    if (result.carry) {
      const carried = applyDateSegmentDigit(result.parts, result.nextSegment, result.carry, true)
      state.dates[active.dateIndex] = carried.parts
      result.nextSegment = carried.nextSegment
      result.selectNextSegment = carried.selectNextSegment
    }

    const nextValue = formatDateInputState(state, options.mode)
    options.setValue(nextValue)
    input.value = nextValue
    setDateSegmentSelection(input, active.dateIndex, result.nextSegment, result.selectNextSegment)
    return
  }

  if (event.key === "Backspace" || event.key === "Delete") {
    event.preventDefault()
    const state = parseDateInputState(input.value, options.mode)
    const target = isSegmentSelected(input, active.dateIndex, active.segment)
      ? active
      : event.key === "Backspace"
        ? getPreviousDateSegment(active, options.mode)
        : active
    const parts = state.dates[target.dateIndex] ?? createEmptyDateParts()
    parts[target.segment] = ""
    state.dates[target.dateIndex] = parts

    const nextValue = formatDateInputState(state, options.mode)
    options.setValue(nextValue)
    input.value = nextValue
    setDateSegmentSelection(input, target.dateIndex, target.segment, false)
    return
  }

  if (event.key === "/" || event.key === "ArrowRight") {
    event.preventDefault()
    const next = getNextDateSegment(active, options.mode)
    setDateSegmentSelection(input, next.dateIndex, next.segment, true)
    return
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault()
    const previous = getPreviousDateSegment(active, options.mode)
    setDateSegmentSelection(input, previous.dateIndex, previous.segment, true)
  }
}

function handleDateTypingPaste(event: React.ClipboardEvent<HTMLInputElement>, options: DateTypingOptions) {
  const digits = event.clipboardData.getData("text").replace(/\D/g, "")
  if (!digits) return

  event.preventDefault()
  const dates = options.mode === "range"
    ? [buildDatePartsFromDigits(digits.slice(0, 8)), buildDatePartsFromDigits(digits.slice(8, 16))]
    : [buildDatePartsFromDigits(digits.slice(0, 8))]

  const nextValue = formatDateInputState({ dates }, options.mode)
  options.setValue(nextValue)
  event.currentTarget.value = nextValue
  setDateSegmentSelection(event.currentTarget, 0, "month", true)
}

function formatDateTypingValue(value: string) {
  return formatDateInputState({ dates: [buildDatePartsFromDigits(value.replace(/\D/g, "").slice(0, 8))] }, "single")
}

function formatDateRangeTypingValue(value: string) {
  const digits = value.replace(/\D/g, "")
  return formatDateInputState({
    dates: [buildDatePartsFromDigits(digits.slice(0, 8)), buildDatePartsFromDigits(digits.slice(8, 16))],
  }, "range")
}

function buildDatePartsFromDigits(digits: string) {
  let parts = createEmptyDateParts()
  let segment: DateInputSegment = "month"

  for (const digit of digits) {
    const result = applyDateSegmentDigit(parts, segment, digit, false)
    parts = result.parts
    segment = result.nextSegment

    if (result.carry) {
      const carried = applyDateSegmentDigit(parts, segment, result.carry, true)
      parts = carried.parts
      segment = carried.nextSegment
    }
  }

  return parts
}

function applyDateSegmentDigit(
  currentParts: DateParts,
  segment: DateInputSegment,
  digit: string,
  replaceSegment: boolean,
) {
  const parts = { ...currentParts }
  const base = replaceSegment ? "" : parts[segment]
  let nextSegment = segment
  let selectNextSegment = false
  let carry = ""

  if (segment === "month") {
    if (!base || base.length >= 2) {
      parts.month = digit
      if (Number(digit) > 1) {
        nextSegment = "day"
        selectNextSegment = true
      }
      return { parts, nextSegment, selectNextSegment, carry }
    }

    const candidate = `${base}${digit}`
    if (Number(candidate) >= 1 && Number(candidate) <= 12) {
      parts.month = String(Number(candidate))
      nextSegment = "day"
      selectNextSegment = true
      return { parts, nextSegment, selectNextSegment, carry }
    }

    parts.month = base
    nextSegment = "day"
    carry = digit
    return { parts, nextSegment, selectNextSegment, carry }
  }

  if (segment === "day") {
    if (!base || base.length >= 2) {
      parts.day = digit
      if (Number(digit) > 3) {
        nextSegment = "year"
        selectNextSegment = true
      }
      return { parts, nextSegment, selectNextSegment, carry }
    }

    const candidate = `${base}${digit}`
    if (Number(candidate) >= 1 && Number(candidate) <= 31) {
      parts.day = String(Number(candidate))
      nextSegment = "year"
      selectNextSegment = true
      return { parts, nextSegment, selectNextSegment, carry }
    }

    parts.day = base
    nextSegment = "year"
    carry = digit
    return { parts, nextSegment, selectNextSegment, carry }
  }

  parts.year = `${base}${digit}`.slice(0, 4)
  return { parts, nextSegment, selectNextSegment, carry }
}

function createEmptyDateParts(): DateParts {
  return { month: "", day: "", year: "" }
}

function parseDateInputState(value: string, mode: DateInputMode) {
  if (mode === "range") {
    const [startValue = "", endValue = ""] = value.split(" - ")
    return { dates: [parseDateParts(startValue), parseDateParts(endValue)] }
  }

  return { dates: [parseDateParts(value)] }
}

function parseDateParts(value: string): DateParts {
  const [month = "", day = "", year = ""] = value.split("/")
  return {
    month: month.replace(/\D/g, "").slice(0, 2),
    day: day.replace(/\D/g, "").slice(0, 2),
    year: year.replace(/\D/g, "").slice(0, 4),
  }
}

function formatDateInputState(state: { dates: DateParts[] }, mode: DateInputMode) {
  const start = formatDateParts(state.dates[0] ?? createEmptyDateParts())
  if (mode === "single") return start

  const end = formatDateParts(state.dates[1] ?? createEmptyDateParts())
  return end ? `${start} - ${end}` : `${start} - `
}

function formatDateParts(parts: DateParts) {
  if (!parts.month && !parts.day && !parts.year) return ""
  if (!parts.day && !parts.year) {
    const monthComplete = parts.month.length >= 2 || Number(parts.month) > 1
    return monthComplete ? `${parts.month}/` : parts.month
  }
  if (!parts.year) {
    const dayComplete = parts.day.length >= 2 || Number(parts.day) > 3
    return dayComplete ? `${parts.month}/${parts.day}/` : `${parts.month}/${parts.day}`
  }
  return `${parts.month}/${parts.day}/${parts.year}`
}

function getActiveDateSegment(input: HTMLInputElement) {
  const cursor = input.selectionStart ?? input.value.length
  const separatorIndex = input.value.indexOf(" - ")
  const dateIndex = separatorIndex >= 0 && cursor > separatorIndex + 2 ? 1 : 0
  const offset = dateIndex === 1 && separatorIndex >= 0 ? separatorIndex + 3 : 0
  const dateValue = dateIndex === 1 && separatorIndex >= 0
    ? input.value.slice(offset)
    : input.value.slice(0, separatorIndex >= 0 ? separatorIndex : undefined)
  const localCursor = Math.max(0, cursor - offset)
  const firstSlash = dateValue.indexOf("/")
  const secondSlash = firstSlash >= 0 ? dateValue.indexOf("/", firstSlash + 1) : -1

  let segment: DateInputSegment = "month"
  if (firstSlash >= 0 && localCursor > firstSlash) segment = "day"
  if (secondSlash >= 0 && localCursor > secondSlash) segment = "year"

  return { dateIndex, segment }
}

function getNextDateSegment(active: { dateIndex: number; segment: DateInputSegment }, mode: DateInputMode) {
  if (active.segment === "month") return { dateIndex: active.dateIndex, segment: "day" as const }
  if (active.segment === "day") return { dateIndex: active.dateIndex, segment: "year" as const }
  if (mode === "range" && active.dateIndex === 0) return { dateIndex: 1, segment: "month" as const }
  return active
}

function getPreviousDateSegment(active: { dateIndex: number; segment: DateInputSegment }, mode: DateInputMode) {
  if (active.segment === "year") return { dateIndex: active.dateIndex, segment: "day" as const }
  if (active.segment === "day") return { dateIndex: active.dateIndex, segment: "month" as const }
  if (mode === "range" && active.dateIndex === 1) return { dateIndex: 0, segment: "year" as const }
  return active
}

function isSegmentSelected(input: HTMLInputElement, dateIndex: number, segment: DateInputSegment) {
  const range = getDateSegmentRange(input.value, dateIndex, segment)
  return input.selectionStart === range.start && input.selectionEnd === range.end && range.end > range.start
}

function selectDateInputSegment(input: HTMLInputElement, dateIndex: number, segment: DateInputSegment) {
  setDateSegmentSelection(input, dateIndex, segment, true)
}

function setDateSegmentSelection(
  input: HTMLInputElement,
  dateIndex: number,
  segment: DateInputSegment,
  selectSegment: boolean,
) {
  const range = getDateSegmentRange(input.value, dateIndex, segment)
  if (selectSegment && range.end > range.start) {
    input.setSelectionRange(range.start, range.end)
    return
  }

  input.setSelectionRange(range.end, range.end)
}

function getDateSegmentRange(value: string, dateIndex: number, segment: DateInputSegment) {
  const separatorIndex = value.indexOf(" - ")
  const offset = dateIndex === 1 && separatorIndex >= 0 ? separatorIndex + 3 : 0
  const dateValue = dateIndex === 1 && separatorIndex >= 0
    ? value.slice(offset)
    : value.slice(0, separatorIndex >= 0 ? separatorIndex : undefined)
  const firstSlash = dateValue.indexOf("/")
  const secondSlash = firstSlash >= 0 ? dateValue.indexOf("/", firstSlash + 1) : -1

  if (segment === "month") {
    return { start: offset, end: offset + (firstSlash >= 0 ? firstSlash : dateValue.length) }
  }

  if (segment === "day") {
    const start = offset + (firstSlash >= 0 ? firstSlash + 1 : dateValue.length)
    const end = offset + (secondSlash >= 0 ? secondSlash : dateValue.length)
    return { start, end: Math.max(start, end) }
  }

  const start = offset + (secondSlash >= 0 ? secondSlash + 1 : dateValue.length)
  return { start, end: offset + dateValue.length }
}

function useCloseOnOutsidePointerDown(
  rootRef: React.RefObject<HTMLElement | null>,
  open: boolean,
  onClose: () => void,
) {
  React.useEffect(() => {
    if (!open) return

    const handleOutsideInteraction = (event: PointerEvent | MouseEvent | TouchEvent) => {
      const root = rootRef.current
      if (!root) return

      const path = typeof event.composedPath === "function" ? event.composedPath() : []
      if (path.length > 0 ? path.includes(root) : root.contains(event.target as Node)) return

      onClose()
    }

    document.addEventListener("pointerdown", handleOutsideInteraction, true)
    document.addEventListener("mousedown", handleOutsideInteraction, true)
    document.addEventListener("touchstart", handleOutsideInteraction, true)

    return () => {
      document.removeEventListener("pointerdown", handleOutsideInteraction, true)
      document.removeEventListener("mousedown", handleOutsideInteraction, true)
      document.removeEventListener("touchstart", handleOutsideInteraction, true)
    }
  }, [onClose, open, rootRef])
}

function formatDateValue(date: Date) {
  return date.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })
}

function formatDateTimeValue(date: Date, time: string) {
  return `${formatDateValue(date)} ${time}`
}

function parseDateValue(value: string) {
  const dateMatch = value.match(/^\s*(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{4})/)
  if (!dateMatch) return undefined
  const [, monthPart, dayPart, yearPart] = dateMatch
  const month = Number(monthPart)
  const day = Number(dayPart)
  const year = Number(yearPart)
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

function getPresetRange(preset: string, today: Date) {
  const currentDay = getDayStart(today)
  const currentMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1)
  const currentQuarter = Math.floor(currentDay.getMonth() / 3)
  const currentQuarterStart = new Date(currentDay.getFullYear(), currentQuarter * 3, 1)
  const lastQuarterStart = new Date(currentDay.getFullYear(), currentQuarter * 3 - 3, 1)

  switch (preset) {
    case "Today":
      return { startDate: currentDay, endDate: currentDay }
    case "Yesterday": {
      const yesterday = addDays(currentDay, -1)
      return { startDate: yesterday, endDate: yesterday }
    }
    case "This Week":
      return { startDate: addDays(currentDay, -((currentDay.getDay() + 6) % 7)), endDate: currentDay }
    case "Last 7 days":
      return { startDate: addDays(currentDay, -6), endDate: currentDay }
    case "This Month":
      return { startDate: currentMonth, endDate: currentDay }
    case "Last 30 days":
      return { startDate: addDays(currentDay, -29), endDate: currentDay }
    case "This quarter":
      return { startDate: currentQuarterStart, endDate: currentDay }
    case "Last quarter":
      return { startDate: lastQuarterStart, endDate: addDays(currentQuarterStart, -1) }
    case "This Year":
      return { startDate: new Date(currentDay.getFullYear(), 0, 1), endDate: currentDay }
    case "Last Year":
      return {
        startDate: new Date(currentDay.getFullYear() - 1, 0, 1),
        endDate: new Date(currentDay.getFullYear() - 1, 11, 31),
      }
    default:
      return { startDate: undefined, endDate: undefined }
  }
}

function getSinglePresetDate(preset: string, today: Date) {
  const currentDay = getDayStart(today)

  switch (preset) {
    case "Yesterday":
      return addDays(currentDay, -1)
    case "Tomorrow":
      return addDays(currentDay, 1)
    case "This Week":
    case "Last 7 days":
    case "This Month":
    case "Last 30 days":
    case "This quarter":
    case "Last quarter":
    case "This Year":
    case "Last Year":
      return getPresetRange(preset, currentDay).startDate ?? currentDay
    case "Today":
    default:
      return currentDay
  }
}

function isPresetSelected(preset: string, startDate: Date | undefined, endDate: Date | undefined) {
  const range = getPresetRange(preset, new Date(2025, 4, 15))
  return isSameDay(startDate, range.startDate) && isSameDay(endDate, range.endDate)
}

function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)
}

function getDayStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function parseQuarterValue(value: string) {
  const match = value.trim().match(/^Q([1-4])\s*\/\s*(\d{4})$/i)
  if (!match) return undefined
  return { quarter: Number(match[1]), year: Number(match[2]) }
}

function formatQuarterValue(quarter: number, year: number) {
  return `Q${quarter}/${year}`
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

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m10 12-4-4 4-4"
      />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m6 4 4 4-4 4"
      />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m4 6 4 4 4-4"
      />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
