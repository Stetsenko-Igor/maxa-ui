# Token diff: maxa-ui vs ui-kit (gitlab/main)

Generated 2026-10-22T21:53:09.691Z by `scripts/diff-ui-kit-tokens.mjs`.

Both sides declare the same token set in two notations. References are resolved to
the token they name before comparing, so `notation` differences are cosmetic and
everything else is a real disagreement that needs a decision.

| Class | Count |
| --- | --- |
| type mismatch | 9 |
| points at a different token | 212 |
| same ratio, different scale | 4 |
| different literal | 1 |
| only in maxa-ui | 61 |
| only in ui-kit | 40 |
| notation only | 260 |
| files identical | 21 |
| files only in maxa-ui | 1 |
| files only in ui-kit | 0 |

## Files needing a decision (28)

### colors-semantic-dark.json

16 only in maxa-ui, 8 only in ui-kit (+5 notation only)

- `text/text-link` - only in maxa-ui: ours "{Color modes/action/action-primary}", ui-kit -
- `text/text-link-hover` - only in maxa-ui: ours "{Color modes/action/action-primary-hover}", ui-kit -
- `text/text-link-active` - only in maxa-ui: ours "{Color modes/action/action-primary-active}", ui-kit -
- `Effects/Focus rings/focus-ring` - only in maxa-ui: ours "{Colors.Blue.400}", ui-kit -
- `Effects/Focus rings/focus-ring-error` - only in maxa-ui: ours "{Colors.Red.400}", ui-kit -
- `action/action-positive` - only in maxa-ui: ours "{Colors.Green.600}", ui-kit -
- `action/action-positive-hover` - only in maxa-ui: ours "{Colors.Green.500}", ui-kit -
- `action/action-positive-active` - only in maxa-ui: ours "{Colors.Green.400}", ui-kit -
- `action/action-neutral-control` - only in maxa-ui: ours "{Colors.Neutral.800}", ui-kit -
- `action/action-neutral-control-hover` - only in maxa-ui: ours "{Colors.Neutral.700}", ui-kit -
- `action/action-neutral-control-active` - only in maxa-ui: ours "{Colors.Neutral.600}", ui-kit -
- `foreground/fg-link` - only in maxa-ui: ours "{Colors.Blue.600}", ui-kit -
- ...and 12 more

### colors-semantic-light.json

16 only in maxa-ui, 8 only in ui-kit (+1 notation only)

- `text/text-link` - only in maxa-ui: ours "{Color modes/action/action-primary}", ui-kit -
- `text/text-link-hover` - only in maxa-ui: ours "{Color modes/action/action-primary-hover}", ui-kit -
- `text/text-link-active` - only in maxa-ui: ours "{Color modes/action/action-primary-active}", ui-kit -
- `Effects/Focus rings/focus-ring` - only in maxa-ui: ours "{Colors.Blue.500}", ui-kit -
- `Effects/Focus rings/focus-ring-error` - only in maxa-ui: ours "{Colors.Red.500}", ui-kit -
- `action/action-positive` - only in maxa-ui: ours "{Colors.Green.500}", ui-kit -
- `action/action-positive-hover` - only in maxa-ui: ours "{Colors.Green.600}", ui-kit -
- `action/action-positive-active` - only in maxa-ui: ours "{Colors.Green.700}", ui-kit -
- `action/action-neutral-control` - only in maxa-ui: ours "{Colors.Gray.200}", ui-kit -
- `action/action-neutral-control-hover` - only in maxa-ui: ours "{Colors.Gray.300}", ui-kit -
- `action/action-neutral-control-active` - only in maxa-ui: ours "{Colors.Gray.400}", ui-kit -
- `foreground/fg-link` - only in maxa-ui: ours "{Colors.Blue.500}", ui-kit -
- ...and 12 more

### component-alert.json

1 same ratio, different scale

- `Alert/dismiss/opacity` - same ratio, different scale: ours 65, ui-kit 0.65

### component-avatar.json

1 only in maxa-ui

- `Avatar/layout/border-width` - only in maxa-ui: ours 1, ui-kit -

### component-breadcrumb.json

1 points at a different token (+9 notation only)

- `Breadcrumb/gap` - points at a different token: ours "2", ui-kit "spacing-md"

### component-button.json

11 points at a different token, 1 same ratio, different scale, 16 only in maxa-ui, 17 only in ui-kit

- `Button/secondary/bg` - points at a different token: ours "action-neutral-control", ui-kit "action-neutral"
- `Button/secondary/bg-hover` - points at a different token: ours "action-neutral-control-hover", ui-kit "action-neutral-hover"
- `Button/secondary/bg-active` - points at a different token: ours "action-neutral-control-active", ui-kit "action-neutral-active"
- `Button/secondary/border` - points at a different token: ours "action-neutral-control", ui-kit "action-neutral"
- `Button/secondary/border-hover` - points at a different token: ours "action-neutral-control-hover", ui-kit "action-neutral-hover"
- `Button/link/text` - points at a different token: ours "text-link", ui-kit "action-primary"
- `Button/link/text-hover` - points at a different token: ours "text-link-hover", ui-kit "action-primary-hover"
- `Button/link/text-active` - points at a different token: ours "text-link-active", ui-kit "action-primary-active"
- `Button/link/fg` - points at a different token: ours "fg-link", ui-kit "action-primary"
- `Button/link/fg-hover` - points at a different token: ours "fg-link-hover", ui-kit "action-primary-hover"
- `Button/link/fg-active` - points at a different token: ours "fg-link-active", ui-kit "action-primary-active"
- `Button/positive/bg` - only in maxa-ui: ours "{Color modes/action/action-positive}", ui-kit -
- ...and 33 more

### component-calendar.json

1 type mismatch, 9 points at a different token (+20 notation only)

- `Calendar/padding` - points at a different token: ours "4", ui-kit "spacing-xl"
- `Calendar/gap` - points at a different token: ours "3", ui-kit "spacing-lg"
- `Calendar/header-gap` - points at a different token: ours "2", ui-kit "spacing-md"
- `Calendar/shadow` - type mismatch: ours "string", ui-kit "shadow"
- `Calendar/shadow` - points at a different token: ours "shadow-sm", ui-kit "sm"
- `Calendar/weekday-height` - points at a different token: ours "6", ui-kit "spacing-3xl"
- `Calendar/cell-gap` - points at a different token: ours "1", ui-kit "spacing-xs"
- `Calendar/nav-size` - points at a different token: ours "8", ui-kit "spacing-4xl"
- `Calendar/day-text-selected` - points at a different token: ours "color-neutral-0", ui-kit "White"
- `Calendar/day-disabled-opacity` - points at a different token: ours "var(--opacity-disabled)", ui-kit 0.5

### component-context-menu.json

1 type mismatch, 21 points at a different token

- `Context Menu/bg` - points at a different token: ours "dropdown-menu-bg", ui-kit "bg"
- `Context Menu/border` - points at a different token: ours "dropdown-menu-border", ui-kit "border"
- `Context Menu/radius` - points at a different token: ours "dropdown-menu-radius", ui-kit "radius"
- `Context Menu/shadow` - type mismatch: ours "color", ui-kit "shadow"
- `Context Menu/shadow` - points at a different token: ours "dropdown-menu-shadow", ui-kit "shadow"
- `Context Menu/padding-y` - points at a different token: ours "dropdown-menu-padding-y", ui-kit "padding-y"
- `Context Menu/item-height` - points at a different token: ours "dropdown-menu-item-height", ui-kit "item-height"
- `Context Menu/item-padding-x` - points at a different token: ours "dropdown-menu-item-padding-x", ui-kit "item-padding-x"
- `Context Menu/item-gap` - points at a different token: ours "dropdown-menu-item-gap", ui-kit "item-gap"
- `Context Menu/item-text` - points at a different token: ours "dropdown-menu-item-text", ui-kit "text"
- `Context Menu/item-text-hover` - points at a different token: ours "dropdown-menu-item-text-hover", ui-kit "text"
- `Context Menu/item-text-disabled` - points at a different token: ours "dropdown-menu-item-text-disabled", ui-kit "text-disabled"
- ...and 10 more

### component-datatable.json

2 points at a different token

- `DataTable/layout/controls-gap` - points at a different token: ours "3", ui-kit "spacing-lg"
- `DataTable/layout/footer-gap` - points at a different token: ours "3", ui-kit "spacing-lg"

### component-date-picker.json

1 type mismatch, 9 points at a different token (+9 notation only)

- `Date Picker/popover-top` - points at a different token: ours "2", ui-kit "spacing-md"
- `Date Picker/popover-z` - points at a different token: ours "var(--z-popover)", ui-kit 1500
- `Date Picker/range-shadow` - type mismatch: ours "string", ui-kit "shadow"
- `Date Picker/range-shadow` - points at a different token: ours "shadow-sm", ui-kit "sm"
- `Date Picker/range-content-padding` - points at a different token: ours "4", ui-kit "spacing-xl"
- `Date Picker/range-footer-padding` - points at a different token: ours "4", ui-kit "spacing-xl"
- `Date Picker/range-footer-gap` - points at a different token: ours "3", ui-kit "spacing-lg"
- `Date Picker/preset-height` - points at a different token: ours "8", ui-kit "spacing-4xl"
- `Date Picker/preset-padding-x` - points at a different token: ours "4", ui-kit "spacing-xl"
- `Date Picker/icon-hit-area` - points at a different token: ours "var(--touch-target-size)", ui-kit 44

### component-dialog.json

1 type mismatch, 14 points at a different token (+16 notation only)

- `Dialog/content-shadow` - type mismatch: ours "color", ui-kit "shadow"
- `Dialog/header-padding-x` - points at a different token: ours "6", ui-kit "spacing-3xl"
- `Dialog/header-padding-top` - points at a different token: ours "6", ui-kit "spacing-3xl"
- `Dialog/header-padding-bottom` - points at a different token: ours "6", ui-kit "spacing-3xl"
- `Dialog/header-gap` - points at a different token: ours "2", ui-kit "spacing-md"
- `Dialog/body-padding-x` - points at a different token: ours "6", ui-kit "spacing-3xl"
- `Dialog/body-padding-y` - points at a different token: ours "6", ui-kit "spacing-3xl"
- `Dialog/body-line-height` - points at a different token: ours "text-md--line-height", ui-kit "text-md"
- `Dialog/footer-padding-x` - points at a different token: ours "6", ui-kit "spacing-3xl"
- `Dialog/footer-padding-top` - points at a different token: ours "3", ui-kit "spacing-lg"
- `Dialog/footer-padding-bottom` - points at a different token: ours "4", ui-kit "spacing-xl"
- `Dialog/description-line-height` - points at a different token: ours "text-sm--line-height", ui-kit "text-sm"
- ...and 3 more

### component-drawer.json

1 type mismatch, 16 points at a different token (+15 notation only)

- `Drawer/overlay-bg` - points at a different token: ours "dialog-overlay-bg", ui-kit "overlay-bg"
- `Drawer/content-shadow` - type mismatch: ours "string", ui-kit "shadow"
- `Drawer/content-shadow` - points at a different token: ours "shadow-lg", ui-kit "lg"
- `Drawer/header-padding-x` - points at a different token: ours "6", ui-kit "spacing-3xl"
- `Drawer/header-padding-top` - points at a different token: ours "6", ui-kit "spacing-3xl"
- `Drawer/header-padding-bottom` - points at a different token: ours "6", ui-kit "spacing-3xl"
- `Drawer/header-gap` - points at a different token: ours "2", ui-kit "spacing-md"
- `Drawer/body-padding-x` - points at a different token: ours "6", ui-kit "spacing-3xl"
- `Drawer/body-padding-y` - points at a different token: ours "6", ui-kit "spacing-3xl"
- `Drawer/body-line-height` - points at a different token: ours "text-md--line-height", ui-kit "text-md"
- `Drawer/footer-padding-x` - points at a different token: ours "6", ui-kit "spacing-3xl"
- `Drawer/footer-padding-top` - points at a different token: ours "3", ui-kit "spacing-lg"
- ...and 5 more

### component-dropdown-menu.json

1 only in ui-kit

- `Dropdown Menu/surface/shadow` - only in ui-kit: ours -, ui-kit -

### component-empty.json

4 points at a different token (+7 notation only)

- `Empty/gap` - points at a different token: ours "3", ui-kit "spacing-lg"
- `Empty/padding-sm` - points at a different token: ours "4", ui-kit "spacing-xl"
- `Empty/padding-md` - points at a different token: ours "6", ui-kit "spacing-3xl"
- `Empty/padding-lg` - points at a different token: ours "8", ui-kit "spacing-4xl"

### component-file-input.json

10 points at a different token (+28 notation only)

- `File Input/border-focus` - points at a different token: ours "focus-ring", ui-kit "border-focus"
- `File Input/focus-ring` - points at a different token: ours "focus-ring", ui-kit "border-focus"
- `File Input/label-line-height` - points at a different token: ours "text-sm--line-height", ui-kit "text-sm"
- `File Input/title-line-height` - points at a different token: ours "text-md--line-height", ui-kit "text-md"
- `File Input/description-line-height` - points at a different token: ours "text-sm--line-height", ui-kit "text-sm"
- `File Input/gap` - points at a different token: ours "2", ui-kit "spacing-md"
- `File Input/file-list-gap` - points at a different token: ours "1", ui-kit "spacing-xs"
- `File Input/file-item-gap` - points at a different token: ours "2", ui-kit "spacing-md"
- `File Input/file-item-padding-x` - points at a different token: ours "2", ui-kit "spacing-md"
- `File Input/file-item-padding-y` - points at a different token: ours "1", ui-kit "spacing-xs"

### component-input.json

2 points at a different token, 1 same ratio, different scale

- `Input/border-focus` - points at a different token: ours "focus-ring", ui-kit "border-focus"
- `Input/focus-ring` - points at a different token: ours "focus-ring", ui-kit "border-focus"
- `Input/disabled/opacity` - same ratio, different scale: ours 100, ui-kit 1

### component-multi-select.json

17 points at a different token (+6 notation only)

- `Multi Select/trigger-padding-x` - points at a different token: ours "3", ui-kit "spacing-lg"
- `Multi Select/trigger-padding-y` - points at a different token: ours "2", ui-kit "spacing-md"
- `Multi Select/trigger-gap` - points at a different token: ours "2", ui-kit "spacing-md"
- `Multi Select/trigger-radius` - points at a different token: ours "input-size-md-radius", ui-kit "radius"
- `Multi Select/trigger-border` - points at a different token: ours "input-border", ui-kit "border"
- `Multi Select/trigger-border-hover` - points at a different token: ours "input-border-hover", ui-kit "border-hover"
- `Multi Select/trigger-border-focus` - points at a different token: ours "input-focus-ring", ui-kit "focus-ring"
- `Multi Select/trigger-focus-ring-offset` - points at a different token: ours "input-focus-ring-offset", ui-kit "focus-ring-offset"
- `Multi Select/trigger-focus-ring-width` - points at a different token: ours "input-focus-ring-width", ui-kit "focus-ring-width"
- `Multi Select/trigger-bg` - points at a different token: ours "input-bg", ui-kit "bg"
- `Multi Select/trigger-text` - points at a different token: ours "input-text", ui-kit "text"
- `Multi Select/trigger-font-family` - points at a different token: ours "input-font-family", ui-kit "font-family"
- ...and 5 more

### component-nav.json

1 points at a different token

- `Nav/bg` - points at a different token: ours "color-neutral-950", ui-kit "950"

### component-pagination.json

3 points at a different token (+7 notation only)

- `Pagination/gap` - points at a different token: ours "1", ui-kit "spacing-xs"
- `Pagination/item-padding-x` - points at a different token: ours "3", ui-kit "spacing-lg"
- `Pagination/item-border-active` - points at a different token: ours "focus-ring", ui-kit "border-focus"

### component-segmented-control.json

5 points at a different token, 11 only in maxa-ui (+9 notation only)

- `Segmented Control/bg` - points at a different token: ours "action-neutral-control", ui-kit "bg-muted"
- `Segmented Control/padding` - points at a different token: ours "1", ui-kit "spacing-xs"
- `Segmented Control/gap` - points at a different token: ours "1", ui-kit "spacing-xs"
- `Segmented Control/item-height` - points at a different token: ours "var(--spacing-9)", ui-kit 36
- `Segmented Control/item-padding-x` - points at a different token: ours "4", ui-kit "spacing-xl"
- `Segmented Control/pill-border-width` - only in maxa-ui: ours 0, ui-kit -
- `Segmented Control/pill-radius` - only in maxa-ui: ours "var(--radius-full)", ui-kit -
- `Segmented Control/pill-padding` - only in maxa-ui: ours "var(--spacing-1)", ui-kit -
- `Segmented Control/pill-gap` - only in maxa-ui: ours "var(--spacing-2)", ui-kit -
- `Segmented Control/pill-item-radius` - only in maxa-ui: ours "var(--radius-full)", ui-kit -
- `Segmented Control/pill-item-height` - only in maxa-ui: ours 30, ui-kit -
- `Segmented Control/pill-item-padding-x` - only in maxa-ui: ours "var(--spacing-3)", ui-kit -
- ...and 4 more

### component-select.json

1 type mismatch, 55 points at a different token (+3 notation only)

- `Select/bg` - points at a different token: ours "input-bg", ui-kit "bg"
- `Select/border` - points at a different token: ours "input-border", ui-kit "border"
- `Select/border-hover` - points at a different token: ours "input-border-hover", ui-kit "border-hover"
- `Select/border-focus` - points at a different token: ours "input-border-focus", ui-kit "border-focus"
- `Select/error-border` - points at a different token: ours "input-error-border", ui-kit "border"
- `Select/focus-ring` - points at a different token: ours "input-focus-ring", ui-kit "focus-ring"
- `Select/focus-ring-offset` - points at a different token: ours "input-focus-ring-offset", ui-kit "focus-ring-offset"
- `Select/focus-ring-width` - points at a different token: ours "input-focus-ring-width", ui-kit "focus-ring-width"
- `Select/text` - points at a different token: ours "input-text", ui-kit "text"
- `Select/placeholder` - points at a different token: ours "input-placeholder", ui-kit "placeholder"
- `Select/disabled-bg` - points at a different token: ours "input-disabled-bg", ui-kit "bg"
- `Select/disabled-text` - points at a different token: ours "input-disabled-text", ui-kit "text"
- ...and 44 more

### component-slider.json

2 type mismatch, 3 points at a different token (+11 notation only)

- `Slider/thumb-hit-area` - points at a different token: ours "var(--touch-target-size)", ui-kit 44
- `Slider/thumb-shadow` - type mismatch: ours "string", ui-kit "shadow"
- `Slider/thumb-shadow` - points at a different token: ours "shadow-sm", ui-kit "sm"
- `Slider/thumb-shadow-hover` - type mismatch: ours "string", ui-kit "shadow"
- `Slider/thumb-shadow-hover` - points at a different token: ours "shadow-md", ui-kit "md"

### component-social-button.json

11 points at a different token, 1 different literal, 6 only in ui-kit (+5 notation only)

- `Social Button/height-lg` - points at a different token: ours "button-size-lg-height", ui-kit "height"
- `Social Button/shadow` - points at a different token: ours "shadow-sm", ui-kit "sm"
- `Social Button/shadow-hover` - points at a different token: ours "shadow-sm", ui-kit "sm"
- `Social Button/shadow-focus` - different literal: ours "0 0 0 3px var(--social-button-border-focus)", ui-kit "0 0 0 3px {Component-based/Social Button/border-focus}"
- `Social Button/font-size-sm` - points at a different token: ours "button-size-sm-text", ui-kit "text"
- `Social Button/font-size` - points at a different token: ours "button-size-md-text", ui-kit "text"
- `Social Button/font-size-lg` - points at a different token: ours "button-size-lg-text", ui-kit "text"
- `Social Button/line-height-sm` - points at a different token: ours "button-size-sm-line-height", ui-kit "line-height"
- `Social Button/line-height` - points at a different token: ours "button-size-md-line-height", ui-kit "line-height"
- `Social Button/line-height-lg` - points at a different token: ours "button-size-lg-line-height", ui-kit "line-height"
- `Social Button/font-weight` - points at a different token: ours "button-size-md-weight", ui-kit "weight"
- `Social Button/disabled-opacity` - points at a different token: ours "var(--opacity-disabled)", ui-kit 0.5
- ...and 6 more

### component-spinner.json

2 points at a different token, 1 only in maxa-ui (+5 notation only)

- `Spinner/color` - points at a different token: ours "spinner-primary-color", ui-kit "primary-color"
- `Spinner/white-color` - points at a different token: ours "color-neutral-0", ui-kit "White"
- `Spinner/stroke-width-xl` - only in maxa-ui: ours 4, ui-kit -

### component-table.json

8 points at a different token (+25 notation only)

- `Table/line-height` - points at a different token: ours "text-sm--line-height", ui-kit "text-sm"
- `Table/header-line-height` - points at a different token: ours "text-caption-sm--line-height", ui-kit "caption-sm"
- `Table/head-gap` - points at a different token: ours "1", ui-kit "spacing-xs"
- `Table/cell-padding-x` - points at a different token: ours "4", ui-kit "spacing-xl"
- `Table/cell-padding-y-sm` - points at a different token: ours "2", ui-kit "spacing-md"
- `Table/cell-padding-y` - points at a different token: ours "3", ui-kit "spacing-lg"
- `Table/cell-padding-y-lg` - points at a different token: ours "4", ui-kit "spacing-xl"
- `Table/caption-padding-y` - points at a different token: ours "3", ui-kit "spacing-lg"

### component-tabs.json

4 points at a different token (+12 notation only)

- `Tabs/trigger-bg` - points at a different token: ours "action-neutral-control", ui-kit "action-neutral-subtle"
- `Tabs/trigger-bg-hover` - points at a different token: ours "action-neutral-control-hover", ui-kit "action-neutral-subtle-hover"
- `Tabs/trigger-padding-x` - points at a different token: ours "5", ui-kit "spacing-2xl"
- `Tabs/trigger-gap` - points at a different token: ours "2", ui-kit "spacing-md"

### component-tag.json

1 same ratio, different scale

- `Tag/remove/opacity` - same ratio, different scale: ours 65, ui-kit 0.65

### component-toast.json

1 type mismatch, 4 points at a different token (+10 notation only)

- `Toast/layout/padding-x` - points at a different token: ours "4", ui-kit "spacing-xl"
- `Toast/layout/padding-y` - points at a different token: ours "3", ui-kit "spacing-lg"
- `Toast/layout/gap` - points at a different token: ours "2", ui-kit "spacing-md"
- `Toast/shadow` - type mismatch: ours "string", ui-kit "shadow"
- `Toast/shadow` - points at a different token: ours "shadow-lg", ui-kit "lg"

## Notation only, safe to normalise (8)

- component-checkbox.json (15)
- component-divider.json (1)
- component-progress.json (7)
- component-radio.json (16)
- component-separator.json (1)
- component-skeleton.json (3)
- component-toggle.json (6)
- component-utility-button.json (8)
