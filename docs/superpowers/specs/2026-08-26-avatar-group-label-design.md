# Avatar Group and Avatar Label Design Contract

## Scope

Extend the existing `Avatar` family in the MAXA Foundation Figma file with two reusable component families:

- `Avatar Group`
- `Avatar Label`

The work stays in the existing Foundation file and reuses the redesigned `Avatar` component set at node `818:774` as the identity primitive. The implementation must use nested Avatar instances instead of duplicating Avatar internals.

Figma file: `ODH3pmxkKyP8pAslgDb15s`

## Source of Truth

The existing `Avatar` component set provides:

- Types: Neutral, Image, and Colored
- Shapes: Rounded and Square
- Sizes: xs, sm, md, lg, and xl
- Optional status dot
- Editable initials
- Decorative appearance variants

The code and component tokens define the canonical size mapping:

| Size | Value |
| --- | ---: |
| xs | 24 px |
| sm | 32 px |
| md | 40 px |
| lg | 48 px |
| xl | 64 px |

The current Figma variant labels incorrectly identify 48 px as `xl` and 64 px as `lg`. Rename those two options to match the canonical mapping without changing geometry or token bindings.

## Component Architecture

### Avatar Group

`Avatar Group` represents a compact overlapping collection of collaborators or assignees.

Variant properties:

- `Size`: `xs - 24`, `sm - 32`, `md - 40`, `lg - 48`, `xl - 64`
- `Visible avatars`: `2`, `3`, `4`, `5`

Component properties:

- `Has overflow`: Boolean, default `false`
- `Overflow count`: Text, default `+4`

Composition rules:

- Every visible member is a nested instance of the existing `Avatar` component.
- Image and medium-emphasis colored avatars are the default presentation.
- The overflow item uses the neutral Avatar appearance.
- Overflow is appended after the visible members and does not replace the final member.
- The overflow label remains editable and includes the leading `+`.
- Members overlap horizontally while preserving the first member as the leading visual item.
- A surface-colored ring separates adjacent avatars and keeps image edges legible.
- The component hugs its contents and must not impose a fixed container width.

Token mapping:

| Role | Token |
| --- | --- |
| Avatar size | `Avatar/layout/size-*` |
| Overlap magnitude | `Avatar/layout/group-overlap` |
| Member ring color | semantic surface background token |
| Member ring width | existing border-width primitive, 2 px equivalent |
| Overflow background and text | existing neutral Avatar token bindings |
| Shape | existing Avatar radius bindings |

No raw color values may be introduced. If the negative overlap cannot be directly alias-bound in Figma, its magnitude must still resolve from `Avatar/layout/group-overlap`, and the implementation decision must be documented in the component description.

### Avatar Label

`Avatar Label` combines an identity avatar with a primary label and an optional secondary description. It replaces separate `Avatar label` and `Avatar label group` families.

Variant properties:

- `Size`: `md - 40`, `lg - 48`, `xl - 64`

Component properties:

- `Has description`: Boolean, default `false`
- `Label`: Text, default `Olivia Rhye`
- `Description`: Text, default `olivia@untitledui.com`

Composition rules:

- The leading visual is a nested instance of the existing `Avatar` component.
- The nested Avatar keeps its editable image, initials, appearance, and status behavior.
- Label and description are arranged in a vertical auto-layout text stack.
- The component uses horizontal auto layout and hugs its contents.
- Label and description stay left aligned.
- The description layer is hidden when `Has description` is false.
- The three component sizes use Avatar sizes md, lg, and xl respectively.
- Typography scales by component size while preserving the existing Foundation hierarchy.

Token mapping:

| Role | Token family |
| --- | --- |
| Primary label | semantic primary text + existing body/label typography |
| Description | semantic secondary text + existing body typography |
| Avatar-to-copy gap | existing spacing primitive |
| Label-to-description gap | existing spacing primitive |
| Avatar geometry and status | existing Avatar component bindings |

No raw color, radius, size, spacing, or typography values may be introduced when a matching Foundation token or style exists.

## Naming and Library Behavior

- Component set names: `Avatar Group` and `Avatar Label`
- Property labels use sentence case and the vocabulary already used by the Avatar family.
- Each component set receives a concise description that explains intended usage, overflow behavior, and accessibility expectations.
- Nested Avatar instances remain replaceable and configurable for realistic user identities.
- Examples or showcase frames may accompany the masters, but they must be visually separated from the publishable component sets.

## Accessibility and Usage

- Avatar images require meaningful alt text when the adjacent label does not already identify the person.
- Presence dots remain decorative unless the product also exposes the status in text.
- Overflow communicates hidden member count; consumers should expose the full member list through surrounding UI when it affects a workflow.
- `Avatar Label` should not be used as an interactive control by itself. Interaction semantics belong to the consuming button, link, menu item, or row.

## Validation Criteria

The work is complete when:

1. Both component sets exist in the same Foundation file as the current Avatar set.
2. All children are nested Avatar instances rather than copied Avatar geometry.
3. Size names and dimensions resolve to the canonical 24/32/40/48/64 scale.
4. `Avatar Group` supports 2–5 visible members and optional editable overflow.
5. `Avatar Label` supports label-only and label-with-description states through one component family.
6. Colors, typography, spacing, radii, and size values are bound to existing Foundation variables or styles wherever supported by Figma.
7. Component properties work on instances and do not expose irrelevant controls.
8. Component-set metadata and screenshots confirm correct layout, sizing, overlap, and visibility behavior.

## Out of Scope

- React API or CSS changes in `@maxa/ui`
- New Avatar visual appearances
- Changes to Avatar status semantics
- New primitive or semantic token collections unless a required binding is genuinely missing and is approved separately
