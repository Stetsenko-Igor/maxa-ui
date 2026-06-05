# Slider — Component Spec

`Slider` lets users choose a numeric value from a bounded range. Use it for density, zoom, volume, opacity, and other continuous settings.

**Component package:** `@maxa/ui` → `Slider`

**Pattern:** Radix Slider primitive with MAXA component tokens.

## API

```ts
type SliderProps = {
  label?: string
  showValue?: boolean
  marks?: Array<string | number>
  value?: number[]
  defaultValue?: number[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}
```

## Usage

```tsx
import { Slider } from "@maxa/ui"

<Slider label="Opacity" defaultValue={[64]} showValue />
<Slider label="Range" defaultValue={[24, 72]} marks={[0, 50, 100]} />
```

## Accessibility

- Provide a visible `label` or an `aria-label`.
- Use `showValue` when the exact number matters.
- Marks are visual hints; they are not interactive controls.
- Disabled sliders must preserve visible disabled state and Radix keyboard semantics.

## Related

| Need | Use |
| --- | --- |
| User changes a numeric setting | `Slider` |
| System shows completion | `Progress` |
| User chooses one listed option | `Select` or `Radio` |
