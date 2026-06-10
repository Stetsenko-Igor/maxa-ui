# Calendar

## Purpose

Calendar renders a single month grid for date pickers, scheduling views, and date popovers.

## Anatomy

- Header with previous and next navigation buttons.
- Month title button with month/year dropdown views.
- Weekday row.
- Day grid with outside, today, and selected states.
- Optional range grid state. In range mode, horizontal date cells touch so the
  selected range reads as a continuous band.

## API

- `month?: Date`
- `defaultMonth?: Date`
- `onMonthChange?: (month: Date) => void`
- `selected?: Date`
- `currentDate?: Date`
- `rangeStart?: Date`
- `rangeEnd?: Date`
- `onDateSelect?: (date: Date) => void`
- `disabledDates?: Date[]`
- `minDate?: Date`
- `maxDate?: Date`
- `disableDate?: (date: Date) => boolean`

## Accessibility

Each day button exposes a full date label. Calendar navigation controls must have accessible names.
The month/year title button must expose an accessible name and keep keyboard
focus visible with the same focus shadow used by day cells.
