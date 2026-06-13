---
"@maxa/icons": minor
"@maxa/ui": patch
---

Ship the real `@maxa/icons` package and adopt it across the component library.

`@maxa/icons` now re-exports all Phosphor Icons (Regular weight is the system standard) plus a `social` namespace with the 14 full-color brand marks extracted from SocialButton. Import system icons from `@maxa/icons` instead of `@phosphor-icons/react` directly.

All 18 hand-drawn inline SVGs across 10 components (Dialog, Drawer, Alert, Input, Select, MultiSelect, DropdownMenu, Calendar, DatePicker, FileInput) were migrated to Phosphor icons for a consistent icon set. SocialButton now renders its brand icons from `@maxa/icons/social`. Two shapes stay inline (DataTable bidirectional sort caret, DropdownMenu radio dot) as they have no Phosphor equivalent. New spec: `specs/foundations/icons.md`.
