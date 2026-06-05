# Select — Component Spec

`Select` is the code name for the form control that Figma may label as
`Input Form / Dropdown`.

Use `Select` when the user chooses one value from a known list. The field looks
like an input with a chevron on the right, but the interaction opens a list of
options rather than accepting free text.

## Figma mapping

```
Primitives / Dropdown Field
Input Form / Dropdown
```

## Code mapping

```
FormField
  Select trigger button
  Hidden native select
  Custom listbox
    Option
```

The public React component is `Select`, not `Dropdown`, because the component's
semantic role is selecting a value. `Dropdown` remains an acceptable visual name
in Figma.

## V2 behavior

- The visible control is a custom `button[role="combobox"]`.
- The popup is a custom `listbox` with `option` rows.
- A hidden native `<select>` remains in the DOM for `name`, `form`, `ref`, and
  `onChange` compatibility.
- Native `<option>` children remain supported.
- The data API also supports `options={[{ label, value, disabled }]}`.
- Keyboard support: Arrow Up/Down, Home/End, Enter/Space, Escape.

## Boundaries

- Do not implement this as `Input kind="dropdown"`.
- Do not use `Select` for generic action menus. Use `DropdownMenu` for command
  lists and navigation menus.
- Keep label, required marker, helper text, and error text in `FormField`.
- Do not expose a public `Dropdown` alias unless the value-selection and
  action-menu boundary is redesigned.
