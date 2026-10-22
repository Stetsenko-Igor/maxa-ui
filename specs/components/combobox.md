# Combobox

Editable single selection from a fixed list. Use `Select` when filtering is not needed.

The input reuses Input field chrome, label/required/error tokens and sizes. The popup
reuses the Select listbox/option token contract. Product forms provide options,
placeholder and empty-state copy; they must not style component internals.

Controlled props: `value`, `onValueChange`, `options: string[]`. Supports `label`,
`required`, `disabled`, `error`, `placeholder`, `emptyMessage`, `size` and `className`.
Typed search is temporary and never commits an arbitrary value. Arrow keys move
through results, Enter selects, Escape/Tab/outside blur dismiss and restore the
committed value. The input exposes combobox/listbox ARIA relationships.
