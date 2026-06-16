---
"@maxa/hooks": minor
"@maxa/ui": patch
---

**@maxa/hooks**: First real payload — add `useControlledState`, `useFieldId`, and `useLabelIds` hooks.

- `useControlledState<T>` — controlled/uncontrolled state pattern (value/defaultValue/onChange)
- `useFieldId` — stable field id (user-provided or React.useId() fallback)
- `useLabelIds` — aria-name composition for top-label / side-label / description fields

**@maxa/ui**: Internal refactor — no public API change.

- Extract `cn()` class-join helper to `lib/cn.ts` (adopted in all 30+ components)
- Extract `useFocusTrap` to `lib/use-focus-trap.ts` (adopted in Dialog and Drawer)
- Adopt `useControlledState` in Slider, MultiSelect, Select, SegmentedControl
- Adopt `useFieldId` in Input and Select
- Adopt `useLabelIds` in Checkbox, Radio, Toggle
