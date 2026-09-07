# @maxa/ui

Accessible React components for the Maxa design system. Every component is styled exclusively through `@maxa/tokens` CSS variables - no hardcoded design values - and follows the `forwardRef + cva + Radix Slot` pattern.

## Requirements

- React 17, 18, or 19 (peer dependency). On React 17 a `useId` ponyfill from `@maxa/hooks` is used automatically.
- `@maxa/tokens` is a direct dependency; the consuming app must still import its theme CSS once at the document root.
- Tailwind is optional and no adapter is supplied. The host owns its global reset and font loading.
- React 16 is unsupported; historical Localist React 16 apps are not automatically compatible.
- `@maxa/icons` is a direct dependency because components import curated system icons at runtime

## Usage inside this workspace

Add the workspace dependency and import:

```jsonc
// package.json
"dependencies": { "@maxa/ui": "workspace:^", "@maxa/tokens": "workspace:^" }
```

```tsx
import "@maxa/tokens/theme.css"
import { Button, Dialog, Select } from "@maxa/ui"
```

## Usage from GitHub (no npm registry)

Packages are not published to a registry yet. Build the checkout and pack UI together with its workspace dependencies:

```bash
pnpm install
pnpm build
mkdir -p /absolute/path/to/consumer/vendor/maxa
pnpm --filter '@maxa/ui...' -r exec pnpm pack --pack-destination /absolute/path/to/consumer/vendor/maxa
```

Install the resulting tarballs with local overrides for UI, tokens, icons, and hooks, as shown in the root [external consumption recipe](../../README.md#in-an-external-project). Overrides prevent unpublished transitive dependencies from resolving against a registry. The consuming app supplies React/React DOM 17–19. Adjust paths and versions to the pack output; direct source-directory `file:` links are not the verified route.

## Exports

Single entry point (`@maxa/ui`) exporting:

- **Layout/typography primitives** - `Box`, `Stack`, `Inline`, `Text`, `Heading`, `Surface`, `TokenSwatch`, plus type-safe token prop types (`TextColorToken`, `BackgroundColorToken`, `BorderColorToken`, `SpaceToken`, `RadiusToken`, ...)
- **Components** - Alert, AlertDialog, Avatar, AvatarLabel, Badge, Breadcrumb, Button, Calendar, Checkbox, ContextMenu, CurrencyInput, DataTable, DatePicker, Dialog, Divider, Drawer, DropdownMenu, Empty, FileInput, FormField, IconButton, Input, MultiSelect, NumberInput, Pagination, PhoneInput, Popover, Progress, Radio, SegmentedControl, Select, Separator, Skeleton, Slider, SocialButton, Spinner, Table, Tabs, Tag, TextArea, Toast, Toggle, Tooltip, UtilityButton

## HTML and Rails ERB styles

Load `@maxa/tokens/theme.css` followed by `@maxa/ui/styles.css` through the host asset pipeline. The aggregate stylesheet has no JavaScript requirement and includes component CSS only. Use each component’s documented markup and state attributes. CSS alone does not supply React/Radix behavior, keyboard handling, focus management, or accessibility; the host must implement and verify these.

A static field and button can use ordinary HTML (or the same markup from ERB):

```css
/* App stylesheet, resolved through the host asset pipeline. */
@import "@maxa/tokens/theme.css";
@import "@maxa/ui/styles.css";
```

```html
<div class="maxa-input-wrapper maxa-input-wrapper--md">
  <label class="maxa-input__label" for="email">Email</label>
  <div class="maxa-input__field">
    <input id="email" name="email" type="email" class="maxa-input__input">
  </div>
</div>
<button type="submit" class="maxa-button maxa-button--primary maxa-button--md">
  <span class="maxa-button__label">Save</span>
</button>
```

Native form semantics work without React. Composite interactive components still need their behavior implemented by the host.

React consumers retain the existing `@maxa/ui` import and do not need the aggregate import. Both paths include component-local `box-sizing: border-box` for MAXA classes and their pseudo-elements, so borders stay within token dimensions. This does not reset document headings, lists, or other host elements.

Custom themes use `@maxa/tokens/core.css` plus a complete root-level client theme; see the [tokens README](../tokens/README.md). Whole-app themes are supported; nested theme scopes and portal inheritance across them are not.

## Example

```tsx
import { Button, FormField, Input } from "@maxa/ui"

<FormField label="Email" htmlFor="email">
  <Input id="email" type="email" placeholder="you@maxa.com" />
</FormField>
<Button variant="primary" size="md">Save</Button>
```

Dark mode: set `data-theme="dark"` on `<html>`. Components react via token overrides - no component-level dark selectors.

## Rules

- One `primary` button per view - see `specs/patterns/interactive-hierarchy.md`
- `Button` supports `warning`, `text`, and `fullWidth` in addition to the core action variants.
- Use `NumberInput`, `CurrencyInput`, and `PhoneInput` for formatted fields; do not add formatting modes to `Input.kind`.
- Component anatomy, variants, and states are specified in `specs/components/`
- Look up CSS variable names in `specs/tokens-reference.md` before styling
