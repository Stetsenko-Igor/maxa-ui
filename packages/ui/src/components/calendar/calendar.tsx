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

  const getDisabled = (date: Date) => Boolean(
    disabledDates.some((disabledDate) => isSameDay(disabledDate, date)) ||
    (minDate && isBeforeDay(date, minDate)) ||
    (maxDate && isAfterDay(date, maxDate)) ||
    disableDate?.(date),
  )

  return (
    <div className={["maxa-calendar", className].filter(Boolean).join(" ")} {...props}>
      <div className="maxa-calendar__header">
        <button
          className="maxa-calendar__nav"
          type="button"
          aria-label="Previous month"
          onClick={() => setVisibleMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
        >
          ‹
        </button>
        <h2 className="maxa-calendar__title">{month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h2>
        <button
          className="maxa-calendar__nav"
          type="button"
          aria-label="Next month"
          onClick={() => setVisibleMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
        >
          ›
        </button>
      </div>
      <div className="maxa-calendar__grid" role="grid" aria-label="Calendar">
        {WEEKDAYS.map((weekday) => <div key={weekday} className="maxa-calendar__weekday">{weekday}</div>)}
        {days.map((date) => {
          const dateLabel = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
          const disabled = getDisabled(date)
          const rangeBoundary = isSameDay(rangeStart, date) || isSameDay(rangeEnd, date)
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
              data-selected={isSameDay(selected, date) || rangeBoundary || undefined}
              disabled={disabled}
              onClick={() => onDateSelect?.(date)}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { Calendar }
