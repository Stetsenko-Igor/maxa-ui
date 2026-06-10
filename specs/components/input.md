# Input — Component Spec

MAXA input architecture separates field primitives from form-level components.
This avoids a single large universal component with repeated variants while
keeping Figma and React composition aligned.

## Current React scope

The current `@maxa/ui` implementation covers:

- `Input` for text-like single-line fields
- built-in `Input` kinds: `text`, `password`, `search`, `quantity`
- visual states: default, hover, focus, filled, error, disabled, readonly
- form chrome: label, required marker, hint text, error text

Dropdown and date picker are not part of the current `Input` API. They should
be separate form-level components that reuse the same label/helper/error model
and their own field primitives.

TextArea is also a separate component entry. It reuses the same field chrome and
tokens, but it must be documented and discovered as `TextArea`, not as
`Input.kind="textarea"`.

## Figma composition model

Use this mental model when creating or implementing Figma components:

```
Primitives / Text Field
Primitives / Dropdown Field
Primitives / Date Picker Single Field
Primitives / Date Picker Dual Field
Primitives / Label
Primitives / Helper Text

Input Form / Text
Input Form / Dropdown
Input Form / Date Picker
```

`Input Form Universal` may be used as a composition example, but it is not the
target API shape. Prefer separate form components per field family.

## Design decisions

- The field primitive owns the inner control surface, icons, placeholder/value
  text, focus/hover/error/disabled styling, and field-specific affordances.
- The form component owns label, required marker, helper text, error text, and
  vertical spacing around the field.
- `readonly` represents the Figma `Not-Editable` state. It is distinct from
  `disabled`: readonly values remain readable and focusable by browser rules,
  while disabled controls are unavailable.
- Date picker single and dual range fields should share date-picker primitives,
  not be added as more `Input.kind` variants.
- Dropdown should use a dropdown primitive, not `Input.kind="dropdown"`.
- TextArea should use the standalone `TextArea` component, not
  `Input.kind="textarea"`.

## Implementation references

- React component: `packages/ui/src/components/input/`
- Component tokens: `packages/tokens/src/component-input.css`
- Docs page: `apps/docs/app/docs/components/input/page.tsx`
