# MAXA Button v3 Token Simplification

- Date: 2026-08-11
- Status: Implemented
- Scope: Foundation colors, Button component tokens, Button v3 bindings, runtime CSS, and Storybook documentation

## Outcome

Primary, Positive, and Negative buttons use white labels and icons in Light and Dark themes. Their interaction states move in small steps: darker in Light and lighter in Dark. Every colored state remains at or above WCAG AA 4.5:1 contrast against white.

## Token model

| Layer           | Responsibility                      | Example                                                   |
| --------------- | ----------------------------------- | --------------------------------------------------------- |
| Primitives      | Raw color and spacing values        | `Colors/Blue/550`                                         |
| Color modes     | Reusable semantic intent            | `action/action-primary-hover`, `text/text-on-color`       |
| Component-based | Thin Button implementation contract | `Button/content/text-on-color`, `Button/primary/bg-hover` |

The collection remains named `Component-based`. Product designers normally use the Button component. Semantic `action/*` is for custom interactive surfaces; `feedback/*` remains independent for status and feedback surfaces.

Link labels and icons use dedicated `text-link*` and `fg-link*` roles. Filled action backgrounds must not be reused as foreground colors because their Dark aliases are intentionally darker.

## Colored action ramps

| Intent   | Light default → hover → active | Dark default → hover → active |
| -------- | ------------------------------ | ----------------------------- |
| Primary  | Blue 500 → 550 → 600           | Blue 600 → 550 → 500          |
| Positive | Green 650 → 700 → 750          | Green 750 → 700 → 650         |
| Negative | Red 500 → 550 → 600            | Red 600 → 550 → 500           |

New primitives: Blue 550 `#056DC9`, Green 650 `#25843E`, Green 750 `#206D35`, Red 550 `#C6140F`.

## Active Button contract

- Shared colored content: `Button/content/text-on-color`, `Button/content/fg-on-color`.
- Shared focus color: `Button/focus/border`.
- One symmetric `Button/size/{size}/padding-x` token per size: 6 / 8 / 14 / 20px.
- Layout gap and Text padding bind directly to global Spacing.
- Icon-only width and height reuse `Button/size/{size}/height`.
- Link has zero outer and Text padding and hugs visible content.
- Loading remains fully opaque and non-interactive.

Published v2 variable IDs are preserved in Figma under hidden `Button/legacy/*` names. New component bindings contain no legacy references. Social Button owns its original 10 / 16 / 24px horizontal padding instead of inheriting Button spacing.

## State matrix

Button v3 keeps `Type × Size × State × Icon Only`, with Boolean left/right icon properties. Dropdown is composed through the trailing icon instead of a variant axis. `Selected` is excluded; persistent selection belongs to Toggle Button or Segmented Control.

## Validation

- Figma Button v3: 336 variants, no legacy bindings, shared colored content/focus bindings verified.
- Link variants: zero padding and Hug sizing verified.
- Loading variants: 100% opacity; Disabled variants: 50% opacity.
- Repository: token aliases, contrast, component tests, build, and Storybook/docs output are verified before delivery.
