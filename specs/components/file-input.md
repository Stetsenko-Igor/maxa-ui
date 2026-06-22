# FileInput — Component Spec

Status: implemented
Package: `@maxa/ui`
Source: `packages/ui/src/components/file-input`
Token source: `packages/tokens/src/component-file-input.css`

## Overview

FileInput is a styled native file picker: a primary **"Choose File" button** joined
to a **file-name field** that shows the selected file (or a placeholder). It mirrors
the MAXA design-system file uploader. It does not upload files, call APIs, crop
images, or own product-specific validation flows.

Use FileInput underneath product flows such as logo upload, PDF upload, asset
import, and document attachment. Product copy and upload behavior belong outside
this primitive.

## Anatomy

```
Label *                          ← optional label (+ required marker, + info slot)
┌──────────────┬───────────────────────────┐
│ ▣ Choose File │ No File Chosen          🔒 │   ← button + field (+ lock when locked)
└──────────────┴───────────────────────────┘
Error message goes here.                       ← only in the error state
```

- Single-file by design. The native `input[type="file"]` is the real, label-associated
  keyboard control (visually hidden, focusable). The button and field are mouse
  affordances; keyboard focus styling is driven by `:focus-within`.

## Scope

- Native `input[type="file"]` for browser and form compatibility.
- Click (button, field, or label) and keyboard activation open the OS picker.
- Selected file name shown in the field; placeholder when empty.
- Clear button (X) on the right of the field in the filled state resets the field
  (clears the value and calls `onFileChange(null)`). Hidden when disabled or
  not-editable.
- Sizes `sm | md | lg` aligned to Input/Button heights (28 / 36 / 48 px).
- States: default, hover, focus, filled, error, disabled, not-editable.

Not in scope (removed deliberately to match the design system): drag-and-drop
dropzone, multi-file selection, in-component file list, and `maxFiles`/`maxSize`
validation. Do product-level validation at the upload boundary.

## API

Extends native `React.InputHTMLAttributes<HTMLInputElement>` except `type`, `size`,
`value`, `defaultValue`, `onChange`, and `title`. Native file attributes
(`accept`, `multiple`, `name`, …) forward to the hidden input.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | — | Visible label above the control. |
| `buttonLabel` | `ReactNode` | `"Choose File"` | Text inside the action button. |
| `placeholder` | `ReactNode` | `"No File Chosen"` | Field text when no file is chosen. |
| `error` | `ReactNode` | — | Error text below the control; forces error styling and `role="alert"`. |
| `required` | `boolean` | `false` | Renders a required marker and sets the native required state. |
| `info` | `ReactNode` | — | Optional element next to the label (e.g. an info icon). |
| `buttonIcon` | `ReactNode` | image icon | Icon inside the action button. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height, padding, and icon size. |
| `visualState` | `"default" \| "hover" \| "focus" \| "filled" \| "error" \| "disabled" \| "not-editable"` | `"default"` | Controlled state preview for docs/tests. |
| `notEditable` | `boolean` | `false` | Locked/read-only: shows a lock icon, greys the button, blocks selection. |
| `fileName` | `string` | — | Controlled selected file name. |
| `defaultFileName` | `string` | — | Initial uncontrolled file name. |
| `onFileChange` | `(file: File \| null) => void` | — | Called with the selected file (or null). |
| `wrapperClassName` | `string` | — | Extra class for the outer wrapper. |

## Accessibility

- The native file input is the keyboard control: label-associated (`htmlFor`),
  focusable while visually hidden, activatable with Enter/Space.
- The button and field are `aria-hidden` mouse affordances; focus styling uses
  `:focus-within` so the field shows the focus ring when the input is focused.
- Error text uses `role="alert"`; the input gets `aria-invalid` and `aria-describedby`.
- The clear button is a real focusable `<button aria-label="Remove file">`.
- Disabled and not-editable states disable the native input (no click/keyboard/focus).

## Styling

All visual styling is tokenized through `--file-input-*` component tokens. The
button maps to `--color-action-primary` (blue) with `--color-text-inverse` label
(consistent with the primary Button); the field uses input border/surface tokens.

## What NOT to do

| Wrong | Correct |
| --- | --- |
| Uploading directly inside FileInput | Keep network/upload behavior in product code |
| Adding product copy like "Personal Logo" to defaults | Pass product copy through props |
| Re-adding a dropzone or multi-file list here | Keep this a single-file styled picker; compose richer flows in product code |
| Using FileInput for rich media editing/cropping | Compose with a separate editor flow |

## Source files

- Component: `packages/ui/src/components/file-input/file-input.tsx`
- Styles: `packages/ui/src/components/file-input/file-input.css`
- Tokens: `packages/tokens/src/component-file-input.css`
- Tests: `packages/ui/src/components/file-input/file-input.test.tsx`
- Docs: `apps/docs/app/docs/components/file-input/page.tsx`
