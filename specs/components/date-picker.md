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

The first implementation provides the field shell, calendar affordance, label,
hint, error, disabled state, and separate single/range components. Calendar
popover behavior can be layered in later without changing the form composition
model.

## Boundaries

- Do not implement this as `Input kind="date"`.
- Keep single date and range date as separate components: `DatePicker` and
  `DateRangePicker`.
- Keep label, required marker, helper text, and error text in `FormField`.
