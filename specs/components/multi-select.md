# Multi Select

## Purpose

Multi Select is an input-like selector for choosing multiple values from a known list.

## Anatomy

- Optional label.
- Combobox trigger (`<button role="combobox" aria-haspopup="listbox">`) showing selected chips or placeholder.
- Listbox surface (`role="listbox" aria-multiselectable="true"`) opened on demand.
- Options (`role="option"` with `aria-selected`) showing a check when selected.
- Hidden native `<select multiple>` for form submission compatibility.
- Removable selected chips.
- Error and hint text through `FormField`.

## API

- `options: { label: string; value: string; disabled?: boolean }[]`
- `value?: string[]`
- `defaultValue?: string[]`
- `onValueChange?: (value: string[]) => void`
- `name?: string` — applied to the hidden native `<select multiple>` for form submission
- `placeholder?: string`
- `error?: string`
- `hint?: string`
- `disabled?: boolean`
- `required?: boolean`
- `size?: "sm" | "md" | "lg"`

## Interaction

- Click the trigger to open/close the listbox.
- Arrow Up/Down move the active option; Home/End jump to first/last enabled option.
- Enter or Space toggle the active option and keep the listbox open so multiple values can be picked in one pass.
- Escape closes the listbox; a pointer down outside also closes it.
- Disabled options are skipped by keyboard and ignored on click.

## Boundaries

Multi Select is a true multi-value listbox/combobox, aligned with `Select` (single-value listbox). Use `Select` for a single form value and `DropdownMenu` for action menus. Multi Select is only for multi-value form selection.
