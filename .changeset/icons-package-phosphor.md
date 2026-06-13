---
"@maxa/icons": minor
"@maxa/ui": patch
---

Ship the real `@maxa/icons` package and adopt it across the component library.

`@maxa/icons` now exports the curated Phosphor Icons used by the MAXA component library (Regular weight is the system standard) plus a `social` namespace with the 14 full-color brand marks extracted from SocialButton. Import system icons from `@maxa/icons` instead of `@phosphor-icons/react` directly; add new icons as direct subpath exports instead of exposing the full Phosphor barrel.

All 18 hand-drawn inline SVGs across 10 components (Dialog, Drawer, Alert, Input, Select, MultiSelect, DropdownMenu, Calendar, DatePicker, FileInput) were migrated to Phosphor icons for a consistent icon set. SocialButton now renders its brand icons from the `social` namespace. Social icons are decorative by default and become named images only when passed an accessible name. Two shapes stay inline (DataTable bidirectional sort caret, DropdownMenu radio dot) as they have no Phosphor equivalent. New spec: `specs/foundations/icons.md`.
