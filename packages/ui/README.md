# @maxa/ui

Accessible React components for the Maxa design system. Every component is styled exclusively through `@maxa/tokens` CSS variables - no hardcoded design values - and follows the `forwardRef + cva + Radix Slot` pattern.

## Requirements

- React 18 or 19 (peer dependency)
- `@maxa/tokens` (peer dependency) - the theme CSS must be loaded once at the app root

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

This repo is distributed via GitHub only. Clone, build, then link with the `file:` protocol:

```bash
git clone https://github.com/Stetsenko-Igor/maxa-ui.git
cd maxa-ui && pnpm install && pnpm build
# in your project:
pnpm add file:../maxa-ui/packages/ui file:../maxa-ui/packages/tokens
```

See the root [README](../../README.md) for the full distribution options and caveats.

## Exports

Single entry point (`@maxa/ui`) exporting:

- **Layout/typography primitives** - `Box`, `Stack`, `Inline`, `Text`, `Heading`, `Surface`, `TokenSwatch`, plus type-safe token prop types (`TextColorToken`, `BackgroundColorToken`, `BorderColorToken`, `SpaceToken`, `RadiusToken`, ...)
- **Components** - Alert, AlertDialog, Avatar, Badge, Breadcrumb, Button, Calendar, Checkbox, ContextMenu, DataTable, DatePicker, Dialog, Divider, DropdownMenu, Empty, FormField, IconButton, Input, MultiSelect, Pagination, Popover, Progress, Radio, SegmentedControl, Select, Separator, Skeleton, Slider, SocialButton, Spinner, Table, Tabs, Tag, Toast, Toggle, Tooltip, UtilityButton

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
- Component anatomy, variants, and states are specified in `specs/components/`
- Look up CSS variable names in `specs/tokens-reference.md` before styling
