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
```

## Current React scope

The implementation provides the field shell, calendar affordance, label, hint,
error, disabled state, and separate single/range components. `DatePicker` opens
the shared `Calendar` primitive for single-date selection. `DateRangePicker`
opens the two-month range dropdown from the layout reference: presets on the
left, two months, footer inputs, and Cancel/Apply actions.

## Boundaries

- Do not implement this as `Input kind="date"`.
- Keep single date and range date as separate components: `DatePicker` and
  `DateRangePicker`.
- Keep label, required marker, helper text, and error text in `FormField`.
