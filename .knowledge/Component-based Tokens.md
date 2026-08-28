# Component-based Tokens

> Status: established layer. Button, Input, Avatar, and other approved component contracts are implemented in the token source and Figma import bundle.
> Purpose: define component-specific decisions while continuing to reuse shared semantic and foundation tokens.

## Position In The System

Component-based tokens sit above foundation tokens and below real UI components.

Current layer order:

1. `Primitives`
2. semantic/foundation layers: `Color modes`, `Spacing`, `Radius`, `Typography`, `Layout`, `Breakpoints`
3. `Component-based`
4. Figma components
5. React components
6. Documentation/catalog

Component-based tokens describe how a specific component uses the existing foundation layers. They should alias existing semantic/foundation tokens wherever possible.

## What This Layer Is Not

Component-based tokens are not React primitives.

Do not treat these as Component-based tokens:

- `Box`
- `Stack`
- `Inline`
- `Text`
- `Heading`
- `Surface`
- `TokenSwatch`

Those may become internal implementation helpers or documentation helpers later, but they are not the component token layer.

Before implementing a new component family, agree either its component-token contract or an explicit semantic-token-only strategy. Existing approved components can be maintained without reopening that decision.

## Original Seed Scope

The initial token-layer rollout covered:

1. `Button`
2. `Input`
3. `Badge`
4. `Alert`

`Card` is intentionally excluded because MAXA does not currently have an approved Card component.

## Naming Rules

Use a dedicated Figma collection:

- `Component-based`

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

- `packages/tokens/figma/component-button.json`

The `Component-based` Figma collection uses one `Default` mode. Component color aliases point to `Color modes`, which owns the only Light/Dark switch.

Approved variants:

- `primary` — main blue primary action, follows `action/primary`, not `action/brand`
- `secondary` — neutral filled action, not a white outlined button
- `outline` — bordered neutral action, transparent at rest, with an optional semantic surface fill
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

- use `Effects/Focus rings/focus-ring` for the default keyboard focus color
- use `Effects/Focus rings/focus-ring-error` for invalid controls
- do not place focus roles in the generic `border` group

Disabled note:

- Button uses one disabled opacity token: `Button/disabled/opacity = 50`
- apply this opacity only to the Button control itself
- do not extrapolate this rule to all components
- future composite form controls may use explicit disabled `bg`, `text`, `border`, and `icon` tokens when the control surface needs tighter contrast control

## Figma Button Component Taxonomy

The Button token model may stay unified while the Figma component structure is intentionally split.

Reason:

- one giant `Button` component set becomes slow to browse and maintain
- Figma variant combinations grow too quickly once semantic families, icon patterns, and special-purpose buttons are mixed together
- designers need a predictable library structure more than one mathematically complete mega-component

Approved direction for Figma:

1. `Buttons/Button`
2. `Buttons/Button destructive`
3. `Buttons/Icon button`
4. `Buttons/Button success` only if success proves to be a repeated product pattern
5. `Buttons/Button close` only if close buttons need their own dedicated behavior and layout rules

Structure guidance:

- `Buttons/Button` should contain the primary day-to-day family:
  - `primary`
  - `secondary`
  - `outline`
  - `ghost`
  - `link` only if MAXA treats it as a real button family rather than plain text styling
- `Buttons/Button destructive` should contain destructive/error variants instead of putting them into the base `type` axis
- `Buttons/Icon button` should contain square icon-only controls instead of mixing them into every text-button variant matrix
- `Buttons/Button success` should be added only if product usage confirms that success actions are systemic rather than occasional
- close buttons, dismiss buttons, and similarly specialized controls should not expand the base Button matrix unless they truly share the same API and layout behavior

Do not optimize for one giant property table such as:

- `type = primary | secondary | outline | ghost | link | success | danger | close | icon-only | ...`

Prefer semantic component families over one oversized `type` axis.

Accepted architectural rule:

- token architecture can remain unified under `Component-based/Button/...`
- Figma component sets may be split for performance, discoverability, and designer ergonomics
- React may still expose a more compact API later if that proves useful in code

### Recommended Variant Properties

#### `Buttons/Button`

Recommended properties:

- `variant = primary | secondary | outline | ghost | link`
- `size = sm | md | lg`
- `state = default | hover | active | focus | disabled | loading`
- `icon-leading = true | false`
- `icon-trailing = true | false`

Rules:

- base Button always assumes a text label
- do not add a `label = true | false` toggle
- if there is no label, use `Buttons/Icon button`
- do not include a `dropdown` property in the initial Button foundation
- menu-button/dropdown behavior can be added later as a separate semantic pattern once the base Button taxonomy is stable

#### `Buttons/Icon button`

Recommended properties:

- `variant = primary | secondary | outline | ghost`
- `size = sm | md | lg`
- `state = default | hover | active | focus | disabled`

Rules:

- icon-only buttons are square controls with one centered icon
- do not mix icon-only controls into the base `Buttons/Button` set
- `link` is excluded from the initial icon-button foundation

#### `Buttons/Button destructive`

Recommended properties:

- `size = sm | md | lg`
- `state = default | hover | active | focus | disabled | loading`
- `icon-leading = true | false`
- `icon-trailing = true | false`

Rules:

- destructive stays a separate semantic family instead of living inside the base `variant` axis
- the property model should stay parallel to `Buttons/Button` so switching between families is easy for designers

Approved token names:

```txt
Button/primary/bg
Button/primary/bg-hover
Button/primary/bg-active
Button/primary/text
Button/primary/border
Button/primary/border-hover
Button/secondary/bg
Button/secondary/bg-hover
Button/secondary/bg-active
Button/secondary/text
Button/secondary/border
Button/secondary/border-hover
Button/outline/bg
Button/outline/bg-hover
Button/outline/bg-active
Button/outline/text
Button/outline/border
Button/outline/border-hover
Button/ghost/bg
Button/ghost/bg-hover
Button/ghost/bg-active
Button/ghost/text
Button/ghost/border
Button/ghost/border-hover
Button/link/bg
Button/link/bg-hover
Button/link/bg-active
Button/link/text
Button/link/text-hover
Button/link/text-active
Button/link/border
Button/link/border-hover
Button/positive/bg
Button/positive/bg-hover
Button/positive/bg-active
Button/positive/text
Button/positive/fg
Button/positive/border
Button/positive/border-hover
Button/destructive/bg
Button/destructive/bg-hover
Button/destructive/bg-active
Button/destructive/text
Button/destructive/fg
Button/destructive/border
Button/destructive/border-hover
Button/disabled/opacity
Button/size/sm/height
Button/size/sm/padding-x
Button/size/sm/radius
Button/size/sm/text
Button/size/sm/line-height
Button/size/sm/weight
Button/size/sm/icon-size

Button/size/md/height
Button/size/md/padding-x
Button/size/md/radius
Button/size/md/text
Button/size/md/line-height
Button/size/md/weight
Button/size/md/icon-size

Button/size/lg/height
Button/size/lg/padding-x
Button/size/lg/radius
Button/size/lg/text
Button/size/lg/line-height
Button/size/lg/weight
Button/size/lg/icon-size

Button/icon-only/sm/size
Button/icon-only/md/size
Button/icon-only/lg/size
```

## Input Token Model

Input v1 is prepared in:

- `packages/tokens/figma/component-input.json`

The initial Input layer is component-token-first. It gives Figma a stable variable surface before the actual Input component set is rebuilt.

Approved anatomy:

- field surface
- value text
- filled text
- placeholder
- icon
- border
- focus ring
- label
- hint
- error
- success
- disabled
- readonly
- size
- textarea
- typography

Approved token names:

```txt
Input/bg
Input/text
Input/filled-text
Input/placeholder
Input/icon
Input/icon-hover
Input/border
Input/border-hover
Input/border-focus
Input/focus-ring
Input/focus-ring-offset
Input/focus-ring-width
Input/label/text
Input/label/gap
Input/label/weight
Input/hint/text
Input/error/text
Input/error/hint
Input/error/border
Input/error/border-focus
Input/success/hint
Input/success/border
Input/success/border-focus
Input/disabled/bg
Input/disabled/text
Input/disabled/placeholder
Input/disabled/opacity
Input/readonly/bg
Input/readonly/text
Input/size/sm/height
Input/size/sm/padding-x
Input/size/sm/text
Input/size/sm/line-height
Input/size/sm/radius
Input/size/sm/gap
Input/size/sm/icon-size
Input/size/md/height
Input/size/md/padding-x
Input/size/md/text
Input/size/md/line-height
Input/size/md/radius
Input/size/md/gap
Input/size/md/icon-size
Input/size/lg/height
Input/size/lg/padding-x
Input/size/lg/text
Input/size/lg/line-height
Input/size/lg/radius
Input/size/lg/gap
Input/size/lg/icon-size
Input/textarea/sm/min-height
Input/textarea/md/min-height
Input/textarea/lg/min-height
Input/textarea/padding-y
Input/textarea/line-height
Input/font-family
Input/font-weight
```

Figma component guidance:

- build a new Input component set on top of these variables instead of migrating an old component
- avoid one huge variant matrix; use component properties for label, helper text, leading icon, trailing action, and required marker
- recommended variant axes: `size = sm | md | lg`, `state = default | hover | focus | error | success | disabled | readonly`
- keep `Select` and `DatePicker` as separate component families even if they reuse Input-like tokens in code

## Avatar Token Model

Avatar is synchronized across the MAXA Foundation Figma library, token source, React package, documentation, and MCP component registry.

Canonical Figma sources:

- `Avatar`: node `818:774`
- `Avatar Label`: node `867:374`

Approved Avatar shape and border tokens:

| Token                         | Value or alias                          | Figma contract                                               |
| ----------------------------- | --------------------------------------- | ------------------------------------------------------------ |
| `Avatar/surface/border`       | `{Color modes/border/border-secondary}` | Bound to the Avatar body stroke                              |
| `Avatar/layout/border-width`  | `1`                                     | Bound to all four inside stroke widths; scope `STROKE_FLOAT` |
| `Avatar/layout/radius-circle` | `{Radius/radius-full}`                  | Bound to rounded Avatar variants                             |
| `Avatar/layout/radius-square` | `{Radius/radius-md}`                    | Bound to square Avatar variants                              |

The CSS projection is:

- `--avatar-border: var(--color-border-secondary)`
- `--avatar-border-width: 1px`
- `--avatar-radius-circle: var(--radius-full)`
- `--avatar-radius-square: var(--radius-md)`

Avatar Label intentionally does not own component-specific interaction tokens. It combines the nested Avatar contract with shared semantic link and focus tokens. Add Avatar Label component tokens only if its behavior must diverge from universal MAXA interaction semantics.

AvatarGroup is hidden in Figma and deprecated in React. Keep its export only for backwards compatibility and do not promote it in the public catalog.

## Button Alias Targets

### Variant Colors

Use `Color modes` aliases as targets.

| Component token                   | Alias target                           | Notes                                                                   |
| --------------------------------- | -------------------------------------- | ----------------------------------------------------------------------- |
| `Button/primary/bg`               | `{action/primary}`                     | Must follow blue Action / primary, not brand.                           |
| `Button/primary/bg-hover`         | `{action/primary-hover}`               |                                                                         |
| `Button/primary/bg-active`        | `{action/primary-active}`              |                                                                         |
| `Button/primary/text`             | `{text/text-on-color}`                 | White in every theme and state.                                         |
| `Button/primary/fg`               | `{foreground/fg-on-color}`             | White icon foreground in every theme and state.                         |
| `Button/primary/border`           | `{action/primary}`                     | Same color as fill unless product design requires otherwise.            |
| `Button/primary/border-hover`     | `{action/primary-hover}`               |                                                                         |
| `Button/secondary/bg`             | `{action/neutral}`                     | Neutral filled action; do not render as an outline style.               |
| `Button/secondary/bg-hover`       | `{action/neutral-hover}`               |                                                                         |
| `Button/secondary/bg-active`      | `{action/neutral-active}`              |                                                                         |
| `Button/secondary/text`           | `{text/primary}`                       |                                                                         |
| `Button/secondary/border`         | `{action/neutral}`                     |                                                                         |
| `Button/secondary/border-hover`   | `{action/neutral-hover}`               |                                                                         |
| `Button/outline/bg`               | `{Primitives/Colors/Base/Transparent}` | Default border-only outline surface.                                    |
| `Button/outline/bg-surface`       | `{background/bg-surface}`              | Optional theme-aware surface fill.                                      |
| `Button/outline/bg-hover`         | `{action/neutral-subtle-hover}`        |                                                                         |
| `Button/outline/bg-active`        | `{action/neutral-subtle-active}`       |                                                                         |
| `Button/outline/text`             | `{text/primary}`                       |                                                                         |
| `Button/outline/border`           | `{border/primary}`                     |                                                                         |
| `Button/outline/border-hover`     | `{border/secondary}`                   |                                                                         |
| `Button/ghost/bg`                 | `{Primitives/Colors/Base/Transparent}` |                                                                         |
| `Button/ghost/bg-hover`           | `{action/neutral-subtle-hover}`        |                                                                         |
| `Button/ghost/bg-active`          | `{action/neutral-subtle-active}`       |                                                                         |
| `Button/ghost/text`               | `{text/secondary}`                     |                                                                         |
| `Button/ghost/border`             | `{Primitives/Colors/Base/Transparent}` |                                                                         |
| `Button/ghost/border-hover`       | `{Primitives/Colors/Base/Transparent}` |                                                                         |
| `Button/link/bg`                  | `{Primitives/Colors/Base/Transparent}` | Text-like button.                                                       |
| `Button/link/bg-hover`            | `{Primitives/Colors/Base/Transparent}` | Link stays transparent on hover.                                        |
| `Button/link/bg-active`           | `{Primitives/Colors/Base/Transparent}` | Link stays transparent on active.                                       |
| `Button/link/text`                | `{action/primary}`                     | Link is an action, not only branded text.                               |
| `Button/link/text-hover`          | `{action/primary-hover}`               |                                                                         |
| `Button/link/text-active`         | `{action/primary-active}`              |                                                                         |
| `Button/link/border`              | `{Primitives/Colors/Base/Transparent}` |                                                                         |
| `Button/link/border-hover`        | `{Primitives/Colors/Base/Transparent}` |                                                                         |
| `Button/positive/bg`              | `{action/positive}`                    | Positive filled action; `success` remains reserved for feedback status. |
| `Button/positive/bg-hover`        | `{action/positive-hover}`              |                                                                         |
| `Button/positive/bg-active`       | `{action/positive-active}`             |                                                                         |
| `Button/positive/text`            | `{text/text-on-color}`                 | White in every theme and state.                                         |
| `Button/positive/fg`              | `{foreground/fg-on-color}`             | White icon foreground in every theme and state.                         |
| `Button/positive/border`          | `{action/positive}`                    |                                                                         |
| `Button/positive/border-hover`    | `{action/positive-hover}`              |                                                                         |
| `Button/destructive/bg`           | `{action/destructive}`                 | Destructive filled action.                                              |
| `Button/destructive/bg-hover`     | `{action/destructive-hover}`           |                                                                         |
| `Button/destructive/bg-active`    | `{action/destructive-active}`          |                                                                         |
| `Button/destructive/text`         | `{text/text-on-color}`                 | White in every theme and state.                                         |
| `Button/destructive/fg`           | `{foreground/fg-on-color}`             | White icon foreground in every theme and state.                         |
| `Button/destructive/border`       | `{action/destructive}`                 |                                                                         |
| `Button/destructive/border-hover` | `{action/destructive-hover}`           |                                                                         |

### Focus Behavior

Button focus preserves the normal border token for its variant. Figma components use the shared Focus ring effect, while code uses `--color-focus-ring` directly for the keyboard-focus outline. Do not add `Button/focus/*` or per-variant `border-focus` color tokens.

### Disabled Behavior

| Component token           | Value    | Notes                                                                                                         |
| ------------------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| `Button/disabled/opacity` | raw `50` | Apply to the Button control itself. Composite form controls should decide disabled surface tokens separately. |

### Size And Shape

Use `Spacing`, `Radius`, and `Typography` aliases as targets.

| Size | Height | `Button/size/*/padding-x` | Radius | Text / line | Icon |
| ---- | ------ | ------------------------- | ------ | ----------- | ---- |
| XS   | 24px   | 6px                       | 4px    | 12 / 14px   | 12px |
| S    | 28px   | 8px                       | 4px    | 12 / 14px   | 16px |
| M    | 36px   | 14px                      | 4px    | 12 / 14px   | 16px |
| L    | 48px   | 20px                      | 6px    | 14 / 20px   | 20px |

Root gap and Text padding bind through `Button/size/*/gap` and `Button/size/*/text-padding-x`.
These component roles alias shared `Spacing/*` variables so the Button layout can be tuned centrally.
Link is the exception: it uses zero padding, Hug sizing, and shared Spacing directly for its gap.

### Icon-only Button

Icon Only width and height reuse `Button/size/{size}/height`; no separate Icon Only size family exists.

### Social Button spacing

Social Button owns no component-specific gap or padding tokens. Its master variants bind directly
to the shared Spacing collection (`spacing-md` gap and `spacing-xl` horizontal padding for the
published medium master). Runtime size modifiers also reference shared spacing variables directly.

## Resolved decisions

- Primary, Positive, and Destructive use explicit per-variant `text` and `fg` roles, all aliasing on-color semantics.
- Focus rings live in the shared Effects group, not under Button.
- Button v3 keeps Icon Only in the same component set and uses Boolean left/right icon properties.

## Implementation Rule

For a new component family:

1. Inspect the live Figma component and existing product use.
2. Approve either a component-token contract or an explicit semantic-token-only strategy.
3. Add or update source JSON under `packages/tokens/figma/` when component tokens are needed.
4. Add collection entries and bundle-builder support only when required.
5. Add tests for token names, aliases, and CSS projection.
6. Regenerate `import-bundle.json` and token reference documentation.
7. Keep Figma bindings, React behavior, public docs, canonical specs, MCP, and agent guidance synchronized.
