# FileInput — Component Spec

Status: implemented
Package: `@maxa/ui`
Source: `packages/ui/src/components/file-input`
Token source: `packages/tokens/src/component-file-input.css`

## Overview

FileInput is a low-level file picker and optional dropzone primitive. It provides accessible file selection UI and selected-file display, but does not upload files, call APIs, crop images, or own product-specific validation flows.

Use FileInput underneath product flows such as profile photo upload, logo upload, PDF upload, asset import, and document attachment. Product copy and upload behavior belong outside this primitive.

## Scope

- Native `input[type="file"]` for browser and form compatibility.
- Click-to-pick file selection.
- Optional drag/drop zone.
- Single or multiple file selection.
- Selected file list with file size metadata.
- Validation hooks for `maxFiles` and `maxSize`.
- Error, disabled, focus, hover, and dragging states.

## API

Extends native `React.InputHTMLAttributes<HTMLInputElement>` except `type`, `size`, `value`, `defaultValue`, `onChange`, `title`, and drag/drop handlers. The `title` and drag/drop props belong to the visible picker surface, while other native file input attributes are forwarded to the hidden input.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | — | Visible label above the picker. |
| `title` | `ReactNode` | `"Choose files"` | Primary text inside the picker surface. |
| `description` | `ReactNode` | `"Drag and drop files here, or click to browse."` | Supporting text inside the picker surface. |
| `hint` | `ReactNode` | — | Helper text below the picker. |
| `error` | `ReactNode` | — | Error text; forces error styling and `role="alert"`. |
| `required` | `boolean` | `false` | Renders a required marker and sets the native input required state. |
| `icon` | `ReactNode` | upload icon | Icon shown inside the picker surface. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Controls padding, min-height, and icon size. |
| `visualState` | `"default" \| "hover" \| "focus" \| "dragging" \| "error" \| "disabled"` | `"default"` | Controlled state preview for docs/tests. |
| `files` | `File[]` | — | Controlled selected file list. |
| `defaultFiles` | `File[]` | — | Initial uncontrolled selected file list. |
| `multiple` | `boolean` | `false` | Allows more than one selected file. |
| `accept` | `string` | — | Native accept filter. |
| `maxFiles` | `number` | — | Maximum accepted files. Extra files are rejected. |
| `maxSize` | `number` | — | Maximum file size in bytes. Oversized files are rejected. |
| `enableDropzone` | `boolean` | `true` | Enables drag/drop behavior. |
| `onFilesChange` | `(files: File[]) => void` | — | Called with accepted files after input change or drop. |
| `onFilesReject` | `(rejections) => void` | — | Called with rejected files and reasons. |
| `wrapperClassName` | `string` | — | Extra class for the outer wrapper. |

## Accessibility

- Uses a native file input for browser behavior and form submission.
- The visible picker surface is keyboard activatable with Enter and Space.
- The surface has `role="button"` and readable title/description wiring.
- Error text uses `role="alert"`.
- Drag/drop is an enhancement only. Keyboard and click selection must remain fully usable.
- Disabled state prevents click, keyboard activation, and drop handling.

## Validation

`maxFiles` and `maxSize` are primitive-level guards only. Product-level validation should still happen at the upload boundary.

Accepted files are sent through `onFilesChange`. Rejected files are sent through `onFilesReject` with one of:

- `max-files`
- `max-size`

## Styling

All visual styling is tokenized through `--file-input-*` component tokens.

## What NOT to do

| Wrong | Correct |
| --- | --- |
| Uploading directly inside FileInput | Keep network/upload behavior in product code |
| Adding product copy like "Personal Logo" to defaults | Pass product copy through props |
| Making drag/drop the only interaction | Keep native click/keyboard picker usable |
| Using FileInput for rich media editing/cropping | Compose with a separate editor flow |

## Source files

- Component: `packages/ui/src/components/file-input/file-input.tsx`
- Styles: `packages/ui/src/components/file-input/file-input.css`
- Tokens: `packages/tokens/src/component-file-input.css`
- Tests: `packages/ui/src/components/file-input/file-input.test.tsx`
- Docs: `apps/docs/app/docs/components/file-input/page.tsx`
