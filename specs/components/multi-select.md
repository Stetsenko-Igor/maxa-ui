# Multi Select

## Purpose

Multi Select is an input-like selector for choosing multiple values from a known list.

## Anatomy

- Optional label.
- Trigger field with selected chips or placeholder.
- Dropdown menu surface.
- Checkbox menu items.
- Error and hint text through `FormField`.
- Removable selected chips.

## API

- `options: { label: string; value: string }[]`
- `value?: string[]`
- `defaultValue?: string[]`
- `onValueChange?: (value: string[]) => void`
- `placeholder?: string`
- `error?: string`
- `hint?: string`
- `disabled?: boolean`
- `size?: "sm" | "md" | "lg"`

## Boundaries

Use `Select` for a single form value and `DropdownMenu` for action menus. Multi Select is only for multi-value form selection.
