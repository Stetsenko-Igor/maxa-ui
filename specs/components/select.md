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
  Select field primitive
```

The public React component is `Select`, not `Dropdown`, because the component's
semantic role is selecting a value. `Dropdown` remains an acceptable visual name
in Figma.

## Boundaries

- Do not implement this as `Input kind="dropdown"`.
- Do not use `Select` for generic action menus. Use a future menu/dropdown-menu
  component for command lists and navigation menus.
- Keep label, required marker, helper text, and error text in `FormField`.
