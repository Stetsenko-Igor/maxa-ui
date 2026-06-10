# Date Picker — Component Spec

Date picker fields are separate form-level components, not variants of `Input`.

## Figma mapping

```
Primitives / Date Picker Single Field
Primitives / Date Picker Dual Field
Input Form / Date Picker
```

## Code mapping

```
FormField
  DatePicker field primitive

FormField
  DateRangePicker field primitive

FormField
  QuarterPicker field primitive
```

## Current React scope

The implementation provides the field shell, calendar affordance, label, hint,
error, disabled state, and separate single/range/quarter components. `DatePicker`
opens the shared `Calendar` primitive for single-date selection and supports
single-day variants with inline presets, a More preset menu, confirmation footer,
and optional time selection. `DateRangePicker`
opens the two-month range dropdown from the layout reference: presets on the
left, two months, footer inputs, and Cancel/Apply actions. `QuarterPicker` opens
the quarter dropdown with year navigation and year selection.

## Boundaries

- Do not implement this as `Input kind="date"`.
- Keep single date, range date, and quarter date as separate components:
  `DatePicker`, `DateRangePicker`, and `QuarterPicker`.
- Keep label, required marker, helper text, and error text in `FormField`.
