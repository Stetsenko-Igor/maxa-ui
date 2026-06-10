"use client"

import * as React from "react"
import "./calendar.css"

export interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultMonth?: Date
  disableDate?: (date: Date) => boolean
  disabledDates?: Date[]
  maxDate?: Date
  minDate?: Date
  month?: Date
  onMonthChange?: (month: Date) => void
  currentDate?: Date
  rangeEnd?: Date
  rangeStart?: Date
  selected?: Date
  onDateSelect?: (date: Date) => void
}

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function isSameDay(a: Date | undefined, b: Date) {
  return Boolean(a && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate())
}

function isBeforeDay(a: Date, b: Date) {
  return new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime() < new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime()
}

function isAfterDay(a: Date, b: Date) {
  return new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime() > new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime()
}

function isInRange(date: Date, start: Date | undefined, end: Date | undefined) {
  if (!start || !end) return false
  return !isBeforeDay(date, start) && !isAfterDay(date, end)
}

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function Calendar({
  className,
  defaultMonth = new Date(2026, 5, 1),
  disableDate,
  disabledDates = [],
  maxDate,
  minDate,
  month: controlledMonth,
  onDateSelect,
  onMonthChange,
  currentDate = new Date(),
  rangeEnd,
  rangeStart,
  selected,
  ...props
}: CalendarProps) {
  const [uncontrolledMonth, setUncontrolledMonth] = React.useState(getMonthStart(defaultMonth))
  const [view, setView] = React.useState<"days" | "months" | "years">("days")
  const [yearPageStart, setYearPageStart] = React.useState(() => defaultMonth.getFullYear() - 10)
  const month = getMonthStart(controlledMonth ?? uncontrolledMonth)
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const startOffset = (first.getDay() + 6) % 7
  const start = new Date(first)
  start.setDate(first.getDate() - startOffset)
  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return date
  })
  const today = new Date()
  const setVisibleMonth = (nextMonth: Date) => {
    const resolvedMonth = getMonthStart(nextMonth)
    onMonthChange?.(resolvedMonth)
    if (!controlledMonth) setUncontrolledMonth(resolvedMonth)
  }

  const openMonthPicker = () => {
    setYearPageStart(month.getFullYear() - 10)
    setView("months")
  }

  const selectMonth = (monthIndex: number) => {
    setVisibleMonth(new Date(month.getFullYear(), monthIndex, 1))
    setView("days")
  }

  const selectYear = (year: number) => {
    setVisibleMonth(new Date(year, month.getMonth(), 1))
    setYearPageStart(year - 10)
    setView("months")
  }

  const getDisabled = (date: Date) => Boolean(
    disabledDates.some((disabledDate) => isSameDay(disabledDate, date)) ||
    (minDate && isBeforeDay(date, minDate)) ||
    (maxDate && isAfterDay(date, maxDate)) ||
    disableDate?.(date),
  )

  const hasRange = Boolean(rangeStart || rangeEnd)

  return (
    <div
      className={["maxa-calendar", className].filter(Boolean).join(" ")}
      data-range={hasRange || undefined}
      {...props}
    >
      <div className="maxa-calendar__header">
        <button
          className="maxa-calendar__nav"
          type="button"
          aria-label={
            view === "years" ? "Previous year range" : view === "months" ? "Previous year" : "Previous month"
          }
          onClick={() => {
            if (view === "years") {
              setYearPageStart((current) => current - 12)
              return
            }
            if (view === "months") {
              setVisibleMonth(new Date(month.getFullYear() - 1, month.getMonth(), 1))
              setYearPageStart((current) => current - 1)
              return
            }
            setVisibleMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
          }}
        >
          <ChevronLeftIcon />
        </button>
        {view === "days" ? (
          <button
            className="maxa-calendar__title-button"
            type="button"
            aria-label="Choose month and year"
            onClick={openMonthPicker}
          >
            <span className="maxa-calendar__title">
              {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <ChevronDownIcon />
          </button>
        ) : view === "months" ? (
          <button
            className="maxa-calendar__title-button"
            type="button"
            aria-label="Choose year"
            onClick={() => {
              setYearPageStart(month.getFullYear() - 10)
              setView("years")
            }}
          >
            <span className="maxa-calendar__title">{month.getFullYear()}</span>
            <ChevronDownIcon />
          </button>
        ) : (
          <h2 className="maxa-calendar__title">
            {yearPageStart} - {yearPageStart + 11}
          </h2>
        )}
        <button
          className="maxa-calendar__nav"
          type="button"
          aria-label={view === "years" ? "Next year range" : view === "months" ? "Next year" : "Next month"}
          onClick={() => {
            if (view === "years") {
              setYearPageStart((current) => current + 12)
              return
            }
            if (view === "months") {
              setVisibleMonth(new Date(month.getFullYear() + 1, month.getMonth(), 1))
              setYearPageStart((current) => current + 1)
              return
            }
            setVisibleMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
          }}
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div className="maxa-calendar__grid" role="grid" aria-label="Calendar">
        {WEEKDAYS.map((weekday) => <div key={weekday} className="maxa-calendar__weekday">{weekday}</div>)}
        {days.map((date) => {
          const dateLabel = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
          const disabled = getDisabled(date)
          const rangeStartDay = isSameDay(rangeStart, date)
          const rangeEndDay = isSameDay(rangeEnd, date)
          const rangeBoundary = rangeStartDay || rangeEndDay
          const inRange = isInRange(date, rangeStart, rangeEnd)

          return (
            <button
              key={date.toISOString()}
              type="button"
              aria-label={dateLabel}
              className="maxa-calendar__day"
              data-outside={date.getMonth() !== month.getMonth() || undefined}
              data-current={isSameDay(currentDate ?? today, date) || undefined}
              data-in-range={inRange && !rangeBoundary || undefined}
              data-range-boundary={rangeBoundary || undefined}
              data-range-start={rangeStartDay || undefined}
              data-range-end={rangeEndDay || undefined}
              data-selected={isSameDay(selected, date) || rangeBoundary || undefined}
              disabled={disabled}
              onClick={() => onDateSelect?.(date)}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
      {view !== "days" && (
        <div className="maxa-calendar__picker-panel">
          {view === "months" ? (
            <div className="maxa-calendar__picker-grid" role="grid" aria-label="Choose month">
              {MONTHS.map((monthName, index) => (
                <button
                  key={monthName}
                  type="button"
                  className="maxa-calendar__picker-item"
                  data-selected={month.getMonth() === index || undefined}
                  onClick={() => selectMonth(index)}
                >
                  {monthName}
                </button>
              ))}
            </div>
          ) : (
            <div className="maxa-calendar__picker-grid" role="grid" aria-label="Choose year">
              {Array.from({ length: 12 }, (_, index) => yearPageStart + index).map((year) => (
                <button
                  key={year}
                  type="button"
                  className="maxa-calendar__picker-item"
                  data-current={new Date().getFullYear() === year || undefined}
                  data-selected={month.getFullYear() === year || undefined}
                  onClick={() => selectYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { Calendar }

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
