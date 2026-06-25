---
"@maxa/ui": minor
---

**MultiSelect**: rebuilt as a true ARIA listbox/combobox (audit F9).

- Trigger is now `<button role="combobox">` with `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, and `aria-activedescendant`.
- Options render in a `role="listbox" aria-multiselectable="true"` surface as `role="option"` buttons with `aria-selected`, replacing the previous DropdownMenu + `menuitemcheckbox` markup.
- Added full keyboard support: ArrowUp/Down, Home/End, Enter/Space (toggle, listbox stays open for multi-pick), Escape, and outside-pointer-down to close.
- Added a hidden native `<select multiple>` for form-submission compatibility, plus a new `name` prop.
- Added `disabled` support on individual options (`MultiSelectOption.disabled`).
- Moved chip remove controls outside the combobox trigger to avoid nested interactive controls.
- New `--multi-select-listbox-*` / `--multi-select-option-*` tokens alias the Select listbox tokens (single source of truth).
