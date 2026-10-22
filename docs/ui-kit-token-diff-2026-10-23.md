# Token diff: maxa-ui vs ui-kit (gitlab/main)

Generated 2026-10-22T22:45:32.626Z by `scripts/diff-ui-kit-tokens.mjs`.

Both sides declare the same token set in two notations. References are resolved to
the token they name before comparing, so `notation` differences are cosmetic and
everything else is a real disagreement that needs a decision.

| Class | Count |
| --- | --- |
| type mismatch | 1 |
| points at a different token | 29 |
| same ratio, different scale | 4 |
| different literal | 1 |
| only in maxa-ui | 61 |
| only in ui-kit | 40 |
| notation only | 6 |
| files identical | 36 |
| files only in maxa-ui | 1 |
| files only in ui-kit | 0 |

## Files needing a decision (21)

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

1 points at a different token

- `Calendar/shadow` - points at a different token: ours "shadow-sm", ui-kit "sm"

### component-context-menu.json

1 points at a different token

- `Context Menu/shadow` - points at a different token: ours "dropdown-menu-shadow", ui-kit "shadow"

### component-date-picker.json

1 points at a different token

- `Date Picker/range-shadow` - points at a different token: ours "shadow-sm", ui-kit "sm"

### component-drawer.json

1 points at a different token

- `Drawer/content-shadow` - points at a different token: ours "shadow-lg", ui-kit "lg"

### component-dropdown-menu.json

1 only in ui-kit

- `Dropdown Menu/surface/shadow` - only in ui-kit: ours -, ui-kit -

### component-file-input.json

2 points at a different token

- `File Input/border-focus` - points at a different token: ours "focus-ring", ui-kit "border-focus"
- `File Input/focus-ring` - points at a different token: ours "focus-ring", ui-kit "border-focus"

### component-input.json

2 points at a different token, 1 same ratio, different scale

- `Input/border-focus` - points at a different token: ours "focus-ring", ui-kit "border-focus"
- `Input/focus-ring` - points at a different token: ours "focus-ring", ui-kit "border-focus"
- `Input/disabled/opacity` - same ratio, different scale: ours 100, ui-kit 1

### component-pagination.json

1 points at a different token

- `Pagination/item-border-active` - points at a different token: ours "focus-ring", ui-kit "border-focus"

### component-segmented-control.json

1 points at a different token, 11 only in maxa-ui

- `Segmented Control/bg` - points at a different token: ours "action-neutral-control", ui-kit "bg-muted"
- `Segmented Control/pill-border-width` - only in maxa-ui: ours 0, ui-kit -
- `Segmented Control/pill-radius` - only in maxa-ui: ours "{Radius/radius-full}", ui-kit -
- `Segmented Control/pill-padding` - only in maxa-ui: ours "{Spacing/spacing-xs}", ui-kit -
- `Segmented Control/pill-gap` - only in maxa-ui: ours "{Spacing/spacing-md}", ui-kit -
- `Segmented Control/pill-item-radius` - only in maxa-ui: ours "{Radius/radius-full}", ui-kit -
- `Segmented Control/pill-item-height` - only in maxa-ui: ours 30, ui-kit -
- `Segmented Control/pill-item-padding-x` - only in maxa-ui: ours "{Spacing/spacing-lg}", ui-kit -
- `Segmented Control/pill-item-bg-active` - only in maxa-ui: ours "{Color modes/background/bg-surface}", ui-kit -
- `Segmented Control/pill-item-text-active` - only in maxa-ui: ours "{Color modes/text/text-secondary}", ui-kit -
- `Segmented Control/pill-item-font-size` - only in maxa-ui: ours "{Typography/Font size/text-sm}", ui-kit -
- `Segmented Control/pill-item-font-weight` - only in maxa-ui: ours "{Typography/Font weight/semibold}", ui-kit -

### component-select.json

1 type mismatch, 1 points at a different token

- `Select/disabled-opacity` - type mismatch: ours "number", ui-kit "color"
- `Select/listbox-shadow` - points at a different token: ours "dropdown-menu-shadow", ui-kit "shadow"

### component-slider.json

2 points at a different token

- `Slider/thumb-shadow` - points at a different token: ours "shadow-sm", ui-kit "sm"
- `Slider/thumb-shadow-hover` - points at a different token: ours "shadow-md", ui-kit "md"

### component-social-button.json

2 points at a different token, 1 different literal, 6 only in ui-kit

- `Social Button/shadow` - points at a different token: ours "shadow-sm", ui-kit "sm"
- `Social Button/shadow-hover` - points at a different token: ours "shadow-sm", ui-kit "sm"
- `Social Button/shadow-focus` - different literal: ours "0 0 0 3px var(--social-button-border-focus)", ui-kit "0 0 0 3px {Component-based/Social Button/border-focus}"
- `Social Button/padding-x-sm` - only in ui-kit: ours -, ui-kit -
- `Social Button/padding-x` - only in ui-kit: ours -, ui-kit -
- `Social Button/padding-x-lg` - only in ui-kit: ours -, ui-kit -
- `Social Button/gap-sm` - only in ui-kit: ours -, ui-kit -
- `Social Button/gap` - only in ui-kit: ours -, ui-kit -
- `Social Button/gap-lg` - only in ui-kit: ours -, ui-kit -

### component-spinner.json

1 only in maxa-ui

- `Spinner/stroke-width-xl` - only in maxa-ui: ours 4, ui-kit -

### component-tabs.json

2 points at a different token

- `Tabs/trigger-bg` - points at a different token: ours "action-neutral-control", ui-kit "action-neutral-subtle"
- `Tabs/trigger-bg-hover` - points at a different token: ours "action-neutral-control-hover", ui-kit "action-neutral-subtle-hover"

### component-tag.json

1 same ratio, different scale

- `Tag/remove/opacity` - same ratio, different scale: ours 65, ui-kit 0.65

### component-toast.json

1 points at a different token

- `Toast/shadow` - points at a different token: ours "shadow-lg", ui-kit "lg"

## Notation only, safe to normalise (0)

