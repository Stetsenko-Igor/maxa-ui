# TextArea — Component Spec

Status: implemented
Package: `@maxa/ui`
Source: `packages/ui/src/components/textarea`
Shared implementation: `packages/ui/src/components/input`
Token source: `packages/tokens/src/component-input.css`

## Overview

TextArea is a multiline text-entry control for descriptions, bios, notes, disclaimers, and other long-form values.

TextArea is a separate component entry, not an `Input` variant. This keeps code search, docs navigation, and Figma component discovery aligned: Text Field and Text Area are separate components even though they share field chrome and styling primitives.

## Current React Scope

- `TextArea` for multiline text entry
- sizes: `sm`, `md`, `lg`
- visual states: default, hover, focus, filled, error, disabled, readonly
- form chrome: label, required marker, hint text, error text
- optional character counter when `characterCounter` and `maxLength` are provided

## Figma Mapping

Use a standalone Figma component for Text Area.

Do not model Text Area as a variant of Text Field/Input in Figma. Figma component search should return Text Area directly.

Recommended Figma properties:

| Figma property | Code prop |
| --- | --- |
| `Label` | `label` |
| `Placeholder` | `placeholder` |
| `Size: Small / Medium / Large` | `size="sm" | "md" | "lg"` |
| `State: Default / Hover / Focus / Filled / Error / Disabled / Not Editable` | native state or `visualState` for docs |
| `Required` | `required` |
| `Helper Text` | `hint` |
| `Error Text` | `error` |
| `Character Counter` | `characterCounter` + `maxLength` |

## API

Extends native `React.TextareaHTMLAttributes<HTMLTextAreaElement>` except native `size`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Controls min-height, padding, and font size. |
| `status` | `"default" \| "error" \| "success"` | `"default"` | Visual validation state. |
| `visualState` | `"default" \| "hover" \| "focus" \| "filled" \| "error" \| "disabled" \| "readonly"` | `"default"` | Controlled state preview for docs and tests. |
| `label` | `string` | — | Accessible label rendered above the textarea. |
| `hint` | `string` | — | Helper text rendered below the textarea. |
| `error` | `string` | — | Error message; forces error styling and `aria-invalid`. |
| `required` | `boolean` | `false` | Renders the required marker next to the label. |
| `infoIcon` | `ReactNode` | — | Icon next to the label, aria-hidden. |
| `characterCounter` | `boolean` | `false` | Shows current count when `maxLength` is provided. |
| `wrapperClassName` | `string` | — | Extra class for the outer wrapper. |

## Accessibility

- Label is associated with the native `<textarea>` via `htmlFor`.
- Error text uses `role="alert"`.
- Helper/error/counter content is wired via `aria-describedby`.
- `readOnly` is distinct from `disabled`: readonly values are visible but not editable.
- Disabled textareas are unavailable and receive disabled styling.

## Styling

TextArea currently reuses Input field tokens and wrapper classes:

```css
--input-textarea-sm-min-height
--input-textarea-md-min-height
--input-textarea-lg-min-height
--input-textarea-padding-y
--input-textarea-line-height
```

This is intentional for now. Token reuse is allowed when the visual model is shared. The component still has its own public entry, docs route, and spec.

## What NOT to do

| Wrong | Correct |
| --- | --- |
| Adding `Input.kind="textarea"` | Use `<TextArea />` |
| Hiding TextArea only inside Input docs | Give TextArea its own docs/spec/catalog entry |
| Using TextArea for rich text editing | Use a dedicated editor component/pattern later |
| Implementing product upload/disclaimer flows in TextArea | Compose TextArea in product code |

## Source files

- Component entry: `packages/ui/src/components/textarea`
- Shared implementation: `packages/ui/src/components/input/input.tsx`
- Styles: `packages/ui/src/components/input/input.css`
- Tokens: `packages/tokens/src/component-input.css`
- Docs: `apps/docs/app/docs/components/textarea/page.tsx`
