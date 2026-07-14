---
"@maxa/ui": patch
---

Fix Select and MultiSelect option ids for values with whitespace or special characters. Option DOM ids are now built via a sanitizing helper (`optionDomId`), so `aria-activedescendant` always references a valid id; the original option value is unchanged in state, `onValueChange`, and native form submission. Select options also adopt the MultiSelect focus pattern (`tabIndex={-1}` + `mousedown` preventDefault) so clicking an option no longer moves focus off the combobox trigger.
