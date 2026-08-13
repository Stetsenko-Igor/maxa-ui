# MAXA Button v3 Token Simplification

- Date: 2026-08-11
- Status: Implemented
- Scope: Foundation colors, Button component tokens, Button v3 bindings, runtime CSS, and Storybook documentation

## Outcome

Primary, Positive, and Negative buttons use white labels and icons in Light and Dark themes. Their interaction states move through the published standard palette: darker in Light and lighter in Dark.

## Token model

| Layer           | Responsibility                      | Example                                             |
| --------------- | ----------------------------------- | --------------------------------------------------- |
| Primitives      | Raw color and spacing values        | `Colors/Blue/600`                                   |
| Color modes     | Reusable semantic intent            | `action/action-primary-hover`, `text/text-on-color` |
| Component-based | Thin Button implementation contract | `Button/primary/text`, `Button/primary/bg-hover`    |

The collection remains named `Component-based`. Product designers normally use the Button component. Semantic `action/*` is for custom interactive surfaces; `feedback/*` remains independent for status and feedback surfaces.

Link labels and icons use dedicated `text-link*` and `fg-link*` roles. Filled action backgrounds must not be reused as foreground colors because their Dark aliases are intentionally darker.

## Colored action ramps

| Intent   | Light default → hover → active | Dark default → hover → active |
| -------- | ------------------------------ | ----------------------------- |
| Primary  | Blue 500 → 600 → 700           | Blue 600 → 500 → 400          |
| Positive | Green 500 → 600 → 700          | Green 600 → 500 → 400         |
| Negative | Red 500 → 600 → 700            | Red 600 → 500 → 400           |

Button and Link states use only the standard palette steps. The button-only Blue 550, Green 650, Green 750, and Red 550 primitives are removed.

## Active Button contract

- Explicit colored content: `Button/{primary|positive|destructive}/text` and `/fg`; each aliases the shared on-color semantic role.
- Focus keeps the variant border and uses the shared Focus ring effect; no Button-specific focus color token.
- One symmetric `Button/size/{size}/padding-x` token per size: 6 / 8 / 14 / 20px.
- Layout gap and Text padding bind through `Button/size/{size}/gap` and `/text-padding-x`, which alias global Spacing.
- Icon-only width and height reuse `Button/size/{size}/height`.
- Link has zero outer and Text padding and hugs visible content.
- Loading remains fully opaque and non-interactive.

Published v2 variable IDs are preserved in Figma under hidden `Button/legacy/*` names. New component bindings contain no legacy references. Social Button binds its layout directly to shared Spacing variables and owns no component-specific spacing proxies.

## State matrix

Button v3 keeps `Type × Size × State × Icon Only`, with Boolean left/right icon properties. Dropdown is composed through the trailing icon instead of a variant axis. `Selected` is excluded; persistent selection belongs to Toggle Button or Segmented Control.

## Validation

- Figma Button v3: 336 variants, no legacy bindings, shared colored content/focus bindings verified.
- Link variants: zero padding and Hug sizing verified.
- Loading variants: 100% opacity; Disabled variants: 50% opacity.
- Repository: token aliases, component tests, build, and Storybook/docs output are verified before delivery. Contrast is audited separately because the published standard ramps intentionally replace the previous AA-calibrated intermediate steps.
