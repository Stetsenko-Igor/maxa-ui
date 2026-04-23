# Component-based Tokens

> Status: Button v1 approved and prepared in token source.
> Purpose: define the component token layer before building Figma components, React components, or documentation.

## Position In The System

Component-based Tokens sit above foundation tokens and below real UI components.

Current layer order:

1. `Primitives`
2. semantic/foundation layers: `Color modes`, `Spacing`, `Radius`, `Typography`, `Layout`, `Breakpoints`
3. `Component-based Tokens`
4. Figma components
5. React components
6. Documentation/catalog

Component-based Tokens describe how a specific component uses the existing foundation layers. They should alias existing semantic/foundation tokens wherever possible.

## What This Layer Is Not

Component-based Tokens are not React primitives.

Do not treat these as Component-based Tokens:

- `Box`
- `Stack`
- `Inline`
- `Text`
- `Heading`
- `Surface`
- `TokenSwatch`

Those may become internal implementation helpers or documentation helpers later, but they are not the component token layer.

Do not build docs preview pages or React components before the relevant Component-based Tokens are agreed.

## First Component Scope

Phase 1 Component-based Tokens:

1. `Button`
2. `Input`
3. `Badge`
4. `Alert`

`Card` is intentionally excluded because MAXA does not currently have an approved Card component.

## Naming Rules

Use a dedicated Figma collection:

- `Component-based Tokens`

Use slash grouping in Figma paths:

- `Button/primary/bg`
- `Button/primary/bg-hover`
- `Button/size/md/height`

Use lowercase token roles after the component group:

- `primary`
- `secondary`
- `bg`
- `text`
- `border`
- `size`
- `sm`
- `md`
- `lg`

Use PascalCase only for component group names:

- `Button`
- `Input`
- `Badge`
- `Alert`

Use hyphens inside a token segment when it expresses one role or state:

- `bg-hover`
- `bg-active`
- `border-focus`
- `padding-x`

Do not add a default suffix for normal/default state:

- Use `Button/primary/bg`
- Do not use `Button/primary/bg-default`

CSS projection should use lowercase hyphenated names:

- `--button-primary-bg`
- `--button-primary-bg-hover`
- `--button-primary-text`
- `--button-size-md-height`

## Button Token Model

Button v1 is approved and prepared in:

- `packages/tokens/figma/component-button-light.json`
- `packages/tokens/figma/component-button-dark.json`

The `Component-based Tokens` Figma collection uses `Light` and `Dark` modes so component color aliases can stay aligned with `Color modes`.

Approved variants:

- `primary` — main primary action, follows `action/primary`
- `secondary` — neutral filled action
- `outline` — bordered neutral action
- `ghost` — transparent/subtle action
- `link` — text-like action button
- `success` — positive/success action
- `danger` — destructive action

Approved sizes:

- `sm`
- `md`
- `lg`

Approved interaction states:

- default: no suffix
- `-hover`
- `-active`
- `-focus`

Focus note:

- keep `border-focus` as the first focus token
- add effect/ring tokens later only if the foundation system gets an Effects collection

Disabled note:

- Button uses one disabled opacity token: `Button/disabled/opacity = 50`
- apply this opacity only to the Button control itself
- do not extrapolate this rule to all components
- future composite form controls may use explicit disabled `bg`, `text`, `border`, and `icon` tokens when the control surface needs tighter contrast control

Approved token names:

```txt
Button/primary/bg
Button/primary/bg-hover
Button/primary/bg-active
Button/primary/text
Button/primary/border
Button/primary/border-hover
Button/primary/border-focus
Button/secondary/bg
Button/secondary/bg-hover
Button/secondary/bg-active
Button/secondary/text
Button/secondary/border
Button/secondary/border-hover
Button/secondary/border-focus
Button/outline/bg
Button/outline/bg-hover
Button/outline/bg-active
Button/outline/text
Button/outline/border
Button/outline/border-hover
Button/outline/border-focus
Button/ghost/bg
Button/ghost/bg-hover
Button/ghost/bg-active
Button/ghost/text
Button/ghost/border
Button/ghost/border-hover
Button/ghost/border-focus
Button/link/bg
Button/link/bg-hover
Button/link/bg-active
Button/link/text
Button/link/text-hover
Button/link/text-active
Button/link/border
Button/link/border-hover
Button/link/border-focus
Button/success/bg
Button/success/bg-hover
Button/success/bg-active
Button/success/text
Button/success/border
Button/success/border-hover
Button/success/border-focus
Button/danger/bg
Button/danger/bg-hover
Button/danger/bg-active
Button/danger/text
Button/danger/border
Button/danger/border-hover
Button/danger/border-focus
Button/disabled/opacity
Button/size/sm/height
Button/size/sm/padding-x
Button/size/sm/gap
Button/size/sm/radius
Button/size/sm/text
Button/size/sm/line-height
Button/size/sm/weight
Button/size/sm/icon-size

Button/size/md/height
Button/size/md/padding-x
Button/size/md/gap
Button/size/md/radius
Button/size/md/text
Button/size/md/line-height
Button/size/md/weight
Button/size/md/icon-size

Button/size/lg/height
Button/size/lg/padding-x
Button/size/lg/gap
Button/size/lg/radius
Button/size/lg/text
Button/size/lg/line-height
Button/size/lg/weight
Button/size/lg/icon-size

Button/icon-only/sm/size
Button/icon-only/md/size
Button/icon-only/lg/size
```

## Button Alias Targets

### Variant Colors

Use `Color modes` aliases as targets.

| Component token | Alias target | Notes |
|---|---|---|
| `Button/primary/bg` | `{action/primary}` | Must follow Action / primary. |
| `Button/primary/bg-hover` | `{action/primary-hover}` |  |
| `Button/primary/bg-active` | `{action/primary-active}` |  |
| `Button/primary/text` | `{text/inverse}` | Needs contrast review against blue primary. |
| `Button/primary/border` | `{action/primary}` | Same color as fill unless product design requires otherwise. |
| `Button/primary/border-hover` | `{action/primary-hover}` |  |
| `Button/primary/border-focus` | `{border/focus}` | Shared focus color. |
| `Button/secondary/bg` | `{action/neutral}` | Neutral filled action. |
| `Button/secondary/bg-hover` | `{action/neutral-hover}` |  |
| `Button/secondary/bg-active` | `{action/neutral-active}` |  |
| `Button/secondary/text` | `{text/primary}` |  |
| `Button/secondary/border` | `{action/neutral}` |  |
| `Button/secondary/border-hover` | `{action/neutral-hover}` |  |
| `Button/secondary/border-focus` | `{border/focus}` |  |
| `Button/outline/bg` | `{bg/secondary}` | Neutral surface, not transparent, so it adapts in dark mode. |
| `Button/outline/bg-hover` | `{action/neutral-subtle-hover}` |  |
| `Button/outline/bg-active` | `{action/neutral-subtle-active}` |  |
| `Button/outline/text` | `{text/primary}` |  |
| `Button/outline/border` | `{border/primary}` |  |
| `Button/outline/border-hover` | `{border/secondary}` |  |
| `Button/outline/border-focus` | `{border/focus}` |  |
| `Button/ghost/bg` | `{Primitives/Colors/Base/Transparent}` |  |
| `Button/ghost/bg-hover` | `{action/neutral-subtle-hover}` |  |
| `Button/ghost/bg-active` | `{action/neutral-subtle-active}` |  |
| `Button/ghost/text` | `{text/secondary}` |  |
| `Button/ghost/border` | `{Primitives/Colors/Base/Transparent}` |  |
| `Button/ghost/border-hover` | `{Primitives/Colors/Base/Transparent}` |  |
| `Button/ghost/border-focus` | `{border/focus}` |  |
| `Button/link/bg` | `{Primitives/Colors/Base/Transparent}` | Text-like button. |
| `Button/link/bg-hover` | `{Primitives/Colors/Base/Transparent}` | Link stays transparent on hover. |
| `Button/link/bg-active` | `{Primitives/Colors/Base/Transparent}` | Link stays transparent on active. |
| `Button/link/text` | `{action/primary}` | Link is an action, not only branded text. |
| `Button/link/text-hover` | `{action/primary-hover}` |  |
| `Button/link/text-active` | `{action/primary-active}` |  |
| `Button/link/border` | `{Primitives/Colors/Base/Transparent}` |  |
| `Button/link/border-hover` | `{Primitives/Colors/Base/Transparent}` |  |
| `Button/link/border-focus` | `{border/focus}` |  |
| `Button/success/bg` | `{action/positive}` | Success/positive filled action. |
| `Button/success/bg-hover` | `{action/positive-hover}` |  |
| `Button/success/bg-active` | `{action/positive-active}` |  |
| `Button/success/text` | `{text/inverse}` | Needs contrast review. |
| `Button/success/border` | `{action/positive}` |  |
| `Button/success/border-hover` | `{action/positive-hover}` |  |
| `Button/success/border-focus` | `{border/focus}` |  |
| `Button/danger/bg` | `{action/negative}` | Destructive filled action. |
| `Button/danger/bg-hover` | `{action/negative-hover}` |  |
| `Button/danger/bg-active` | `{action/negative-active}` |  |
| `Button/danger/text` | `{text/inverse}` | Needs contrast review. |
| `Button/danger/border` | `{action/negative}` |  |
| `Button/danger/border-hover` | `{action/negative-hover}` |  |
| `Button/danger/border-focus` | `{border/focus}` |  |

### Disabled Behavior

| Component token | Value | Notes |
|---|---|---|
| `Button/disabled/opacity` | raw `50` | Apply to the Button control itself. Composite form controls should decide disabled surface tokens separately. |

### Size And Shape

Use `Spacing`, `Radius`, and `Typography` aliases as targets.

| Component token | Alias target | Notes |
|---|---|---|
| `Button/size/sm/height` | raw `32` | Figma height token; no existing semantic dimension token yet. |
| `Button/size/sm/padding-x` | `{spacing-lg}` | 12px. |
| `Button/size/sm/gap` | `{spacing-sm}` | 6px. |
| `Button/size/sm/radius` | `{radius-md}` | 8px. |
| `Button/size/sm/text` | `{Font size/text-sm}` | Needs importer alias validation because Typography is grouped. |
| `Button/size/sm/line-height` | `{Line height/text-sm}` |  |
| `Button/size/sm/weight` | `{Font weight/semibold}` |  |
| `Button/size/sm/icon-size` | raw `16` |  |
| `Button/size/md/height` | raw `40` |  |
| `Button/size/md/padding-x` | `{spacing-xl}` | 16px. |
| `Button/size/md/gap` | `{spacing-md}` | 8px. |
| `Button/size/md/radius` | `{radius-md}` | 8px. |
| `Button/size/md/text` | `{Font size/text-md}` |  |
| `Button/size/md/line-height` | `{Line height/text-md}` |  |
| `Button/size/md/weight` | `{Font weight/semibold}` |  |
| `Button/size/md/icon-size` | raw `20` |  |
| `Button/size/lg/height` | raw `48` |  |
| `Button/size/lg/padding-x` | `{spacing-2xl}` | 20px. |
| `Button/size/lg/gap` | `{spacing-md}` | 8px. |
| `Button/size/lg/radius` | `{radius-lg}` | 10px. |
| `Button/size/lg/text` | `{Font size/text-lg}` |  |
| `Button/size/lg/line-height` | `{Line height/text-lg}` |  |
| `Button/size/lg/weight` | `{Font weight/semibold}` |  |
| `Button/size/lg/icon-size` | raw `20` |  |

### Icon-only Button

| Component token | Alias target | Notes |
|---|---|---|
| `Button/icon-only/sm/size` | raw `32` | Square icon-only button size. |
| `Button/icon-only/md/size` | raw `40` | Square icon-only button size. |
| `Button/icon-only/lg/size` | raw `48` | Square icon-only button size. |

## Open Decisions

Deferred beyond Button v1:

- whether filled status buttons (`primary`, `success`, `danger`) need dedicated foreground tokens such as `text/on-primary`, `text/on-success`, `text/on-danger`
- whether focus ring/elevation belongs in a future Effects collection
- whether Button needs additional variants after real Figma component usage

## Implementation Rule

Button v1 implementation checklist:

1. Add source JSON under `packages/tokens/figma/`. Done for Button v1.
2. Add the new collection to `manifest.json`. Done for Button v1.
3. Update the Figma import bundle builder only if needed.
4. Add tests for collection presence, token names, and alias behavior. Done for Button v1.
5. Regenerate `import-bundle.json`. Done for Button v1.

Do not create React components or docs pages until Component-based Tokens are approved.
