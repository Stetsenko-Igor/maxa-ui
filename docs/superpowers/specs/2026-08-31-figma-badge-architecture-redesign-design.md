# Figma Badge Architecture Redesign Design Contract

## Objective

Replace the current icon-driven Badge variant matrix in the MAXA Foundation Figma library with one canonical `.Badge` component set. The new component must preserve the existing MAXA color and size tokens, add Pill and Tag shapes, expose optional leading and trailing icon slots, support a color-aware leading Dot, and retain the removable close control without multiplying the variant matrix for optional content.

This contract applies to the MAXA Foundation Figma file only. React APIs, repository token artifacts, and the existing semantic distinction between Badge and Tag are not changed in this task.

## Sources of Truth

- Figma file: `ODH3pmxkKyP8pAslgDb15s`
- Badge page: `156:58`
- Current Pill set: `170:704` (`.Badge / Pill color`)
- Current Tag-shaped set: `975:66` (`.Badge / Badge color`)
- Button Text padding reference: Figma file `9M6ulX7a6bDlmctFdClAzu`, node `11020:118515`
- MAXA token and component source: this repository

The current Badge size, color, typography, and foreground bindings are canonical. Untitled UI is a behavioral reference for the removable close control, not a source for MAXA color values or tokens.

## Component Architecture

The library exposes one public component set named `.Badge`.

The component anatomy is:

`Left icon -> Text padding -> Right icon -> Close`

The root is a horizontal auto-layout container. The label lives inside its own horizontal `Text padding` auto-layout frame, following the established MAXA Button pattern. The Badge is updated directly; no `_Badge layout` component or other nested layout wrapper is introduced.

Only two private supporting assets remain:

- `_Badge dot`: an icon-compatible Dot asset for the leading icon swap;
- `_Badge close X`: the existing 16 x 16 removable control with `Default` and `Hover` states.

## Variant Contract

The public variant properties are:

- `Shape = Pill | Tag`
- `Emphasis = medium | high`
- `Size = sm - 20 | md - 24 | lg - 28`
- the existing `Intent` and `Appearance` color encoding, preserving all 23 valid color outcomes and their current mutually exclusive behavior

The current `Icon` variant axis is removed. `Emphasis=low` is removed.

The resulting matrix is:

`23 color outcomes x 2 emphasis values x 3 sizes x 2 shapes = 276 variants`

Optional icons, Dot, and removable content are direct component properties and do not multiply the matrix.

## Direct Component Properties

The component set exposes:

- `Label`: text property;
- `Icon left`: Boolean visibility property;
- `Icon left swap`: independent instance swap property;
- `Icon right`: Boolean visibility property;
- `Icon right swap`: independent instance swap property;
- `Removable`: Boolean visibility property for the close control.

The left and right icon swaps must not share one swap property. Changing one slot must not affect the other.

`_Badge dot` is available as a preferred value only for `Icon left swap`. The right icon swap contains ordinary icons only; Dot is not available on the right.

## Shape Contract

- `Pill` binds the root corner radius to `Radius/radius-full` (`9999`).
- `Tag` binds the root corner radius to `Radius/radius-sm` (`6`).

Shape changes only the radius. Height, padding, gap, typography, icon behavior, color behavior, and removable behavior remain identical between Pill and Tag.

## Size and Spacing Contract

Existing Badge height, root padding, root gap, typography, and icon geometry remain canonical. The new Text padding frame adds the approved symmetric 2 px label inset:

| Size value | Height | Root padding X | Root gap | Text padding X | Effective label edge | Effective icon-to-text | Text | Icon |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `sm - 20` | 20 px | 6 px | 4 px | 2 px | 8 px | 6 px | 12 px | 12 px |
| `md - 24` | 24 px | 8 px | 4 px | 2 px | 10 px | 6 px | 12 px | 14 px |
| `lg - 28` | 28 px | 10 px | 6 px | 2 px | 12 px | 8 px | 14 px | 16 px |

`Text padding` uses the existing `Spacing/spacing-xxs` token. No new spacing values are introduced. The separate text frame keeps optical label padding stable when either icon slot is enabled or disabled.

## Color and Token Roles

Every visual property continues to use MAXA tokens. Untitled UI colors must not be copied.

- Badge background uses the existing `bg-*` role for the selected color and emphasis.
- Label text uses `text-*` roles only.
- Leading icon, trailing icon, Dot, and close control use `fg-*` roles only.
- High emphasis uses the existing `text-on-color` and `fg-on-color` roles.

Text must never bind to an `fg` token. Icons, Dot, and close must never bind to a `text` token.

For every one of the 276 variants, the parent Badge supplies the correct foreground override to both icon slots and the removable control. Swapping the leading icon to `_Badge dot` must retain that foreground binding.

## Dot Contract

`_Badge dot` is an icon-compatible private asset, not a Badge variant and not a layout component.

- slot: 8 x 8;
- visible ellipse: 6 x 6, centered in the slot;
- color: inherited from the current Badge `fg-*` role;
- availability: leading icon swap only.

The Dot asset must use a compatible internal foreground layer structure so the leading icon slot's foreground override survives an instance swap. If the initial swap test does not preserve the binding, the canonical Badge must not be replaced until the Dot layer structure is corrected and verified.

## Removable Contract

`Removable=false` hides the close control. `Removable=true` reveals `_Badge close X` after the optional right icon.

The close control remains 16 x 16 and owns two interactive variants:

- `State=Default`
- `State=Hover`

The close icon inherits the current Badge foreground role. Only the close control has hover behavior. The Badge root does not receive Hover, Pressed, Disabled, or other interaction states in this task.

## Migration Strategy

The existing Badge masters are the implementation base. The migration must not introduce a new public wrapper or a separate layout component.

1. Inventory existing Badge instances in the file before deleting variants.
2. Reuse the current no-icon variants as canonical masters where possible.
3. Merge Pill and Tag-shaped masters into one `.Badge` set and add `Shape`.
4. Add the direct Text, Boolean, and independent instance swap properties.
5. Validate the new icon and Dot color propagation on real instances.
6. Remap in-file instances that use old icon or low-emphasis variants.
7. Remove the old `Icon` axis, redundant icon variants, `Emphasis=low` variants, and obsolete public sets only after validation passes.

Preserve existing component identities where feasible. Any temporary migration copy is non-publishable and must be removed after successful validation.

## Out of Scope

- Border styling or a `Border` property
- New utility border tokens
- Root-level Badge Hover
- Pressed, Disabled, Focus, or other Badge states
- Dot in the trailing icon slot
- A separate `_Badge layout` component
- React component or token-package changes
- Repository Badge/Tag semantic reconciliation

## Validation

The Figma update is complete when:

1. `.Badge` contains exactly 276 variants.
2. The variant values are exactly `Shape=Pill|Tag`, `Emphasis=medium|high`, and `Size=sm - 20|md - 24|lg - 28`, plus the unchanged valid Intent/Appearance color encoding.
3. `Icon left`, `Icon right`, and `Removable` toggle independently on real Badge instances.
4. The leading and trailing slots expose independent instance swap properties.
5. Dot is available only in the leading swap and remains a centered 6 x 6 ellipse in an 8 x 8 slot.
6. Switching Intent, Appearance, Emphasis, Shape, or Size keeps label, icons, Dot, and close on the correct token roles.
7. All label layers use `text-*`; all icons, Dot, and close layers use `fg-*`.
8. Swapping an ordinary leading icon to Dot preserves the resolved Badge foreground color for every color outcome and both emphasis values.
9. Pill uses `radius-full`; Tag uses `radius-sm`.
10. Existing size heights, outer padding, gap, typography, and icon sizes remain unchanged.
11. The close control changes from Default to Hover; the Badge root has no interaction states.
12. Metadata inspection reports no obsolete Icon or Low variants, no shared left/right swap property, no missing component-property references, and no unresolved token bindings.
13. Screenshots of representative color outcomes across both shapes, both emphasis values, and all sizes show no clipping, asymmetric padding, gray fallback icons, or geometry regressions.
