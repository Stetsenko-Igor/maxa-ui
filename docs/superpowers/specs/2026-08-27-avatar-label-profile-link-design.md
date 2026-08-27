# Avatar Label Profile Link Design Contract

## Scope

Extend the existing `Avatar Label` component set in the MAXA Foundation Figma file with an optional profile-link interaction. The entire `Avatar + label + optional description` area acts as one link that navigates to a user profile when a consuming screen supplies a destination.

Figma file: `ODH3pmxkKyP8pAslgDb15s`

Target component set: `Avatar Label`, node `867:374`

The hidden `Avatar Group` component is not part of this work and must not be modified or revealed.

## Existing Component Contract

Preserve the user-updated Avatar Label design and all of its existing bindings and editable properties:

- the current four size values, from the 32 px default through 40, 48, and 64 px;
- `Has description` Boolean property;
- editable `Label` and `Description` text properties;
- the nested Avatar instance and its exposed identity properties;
- existing typography, color, spacing, alignment, and Avatar token bindings.

This work adds interaction behavior without changing default geometry, content, or the nested Avatar appearance.

## Component Architecture

Add these variant properties to the existing component set:

- `Interaction`: `Static` or `Link`
- `State`: `Default`, `Hover`, `Pressed`, or `Focus`

`Static` supports only `State=Default`. `Link` supports all four states for every existing size. With four sizes, the component set contains 20 component variants:

- 4 static default variants;
- 16 link variants.

Do not model interactivity as a Boolean component property. A Boolean property can expose or hide layers but does not clearly express the semantic role or interactive state matrix. `Interaction=Static|Link` makes the library behavior explicit and keeps the static use case intact.

Preserve the current component-property labels and nested Avatar configuration across every new variant. Instances must not expose controls that are irrelevant to Avatar Label content.

## Visual State Contract

The selected visual direction is `Text link`: the label communicates interaction through link color and underline, while the Avatar and optional description remain visually stable.

| State | Label | Description | Avatar | Root target |
| --- | --- | --- | --- | --- |
| Default | Existing `text/text-secondary` binding, no underline | Existing `text/text-secondary` binding | Unchanged | No additional surface styling |
| Hover | `text/text-link-hover`, underline | Unchanged | Unchanged | Pointer interaction, no background or border |
| Pressed | `text/text-link-active`, underline | Unchanged | Unchanged | No geometry shift |
| Focus | `text/text-link`, no required underline | Unchanged | Unchanged | 2 px focus ring with 2 px offset around the entire link target |

Focus uses `Effects/Focus rings/focus-ring`. Its width and offset follow the existing MAXA link/control focus pattern and should resolve through existing width and spacing primitives wherever Figma supports the binding.

The root target retains the existing auto-layout dimensions in every state. Hover, pressed, and focus styling must not add padding, change gaps, resize the component, or move surrounding layout. The focus ring renders outside the target bounds.

## Token Strategy

Use existing semantic tokens directly for the new interaction states:

- `text/text-secondary`
- `text/text-link`
- `text/text-link-hover`
- `text/text-link-active`
- `Effects/Focus rings/focus-ring`

Do not introduce a new Avatar Label component-token collection. These values intentionally inherit the universal link and focus semantics, and component aliases would only duplicate the existing mappings without adding an independent theming decision.

The nested Avatar continues to use the existing Avatar component-based tokens. Existing typography, spacing, radius, and size variables remain unchanged.

A dedicated Avatar Label token layer may be introduced later only if the component needs to diverge from standard link semantics or acquire independent theme behavior.

## Interaction and Navigation

The Figma component set documents and previews interaction states:

- `Link / Default` changes to `Link / Hover` while hovering;
- `Link / Hover` changes to `Link / Pressed` while pressing;
- the interaction returns to the appropriate non-pressed state when the pointer is released or leaves the target;
- `Link / Focus` remains an explicit library state for documentation and handoff because Figma prototypes do not reproduce browser `:focus-visible` behavior reliably.

The Foundation component must not hard-code a specific profile frame or URL. Profile destinations depend on the user represented by each instance and belong to the consuming product screen. Product instances provide the destination; a future code implementation exposes it as `href` and renders a semantic anchor.

The entire Avatar Label bounds form one interactive target. Clicking the Avatar, label, or description must lead to the same profile destination.

## Accessibility and Handoff

- The code counterpart is a semantic `<a>`, not a button, because the action navigates to another page.
- Keyboard focus uses `:focus-visible` and is visible around the entire target.
- The adjacent label identifies the Avatar; duplicated image alternative text should be avoided when it would create redundant screen-reader output.
- The destination must identify the represented profile in its accessible name.
- Link styling must maintain token-defined contrast in every supported color mode.
- The smallest existing 32 px Avatar Label target remains above the 24 px WCAG 2.2 minimum target size; surrounding product layout is responsible for avoiding overlapping adjacent targets.

## Component Description

Update the Avatar Label library description to communicate the new contract:

> Identity avatar with an editable label and optional description. Use `Interaction=Static` for display-only identity and `Interaction=Link` when the entire component navigates to the represented profile. Product instances provide the destination.

Remove or replace any previous description that says interaction must always belong to an external wrapper.

## Validation Criteria

The design is complete when:

1. The existing user-updated Avatar Label appearance remains unchanged in `Static / Default`.
2. Every existing size supports `Link / Default`, `Hover`, `Pressed`, and `Focus`.
3. Hover and pressed affect only the label link styling; Avatar and description remain stable.
4. Focus uses the existing focus-ring semantic around the complete target without changing layout dimensions.
5. All new colors use existing semantic variables and no raw color values are introduced.
6. No Avatar Label component-token collection is created.
7. Existing text, description, and nested Avatar properties remain editable on instances.
8. Interactive variants preview hover and pressed behavior without hard-coded navigation.
9. The component description documents static versus profile-link usage and destination ownership.
10. Avatar Group remains hidden and unchanged.

## Out of Scope

- React, CSS, Storybook, or package API implementation
- A hard-coded profile route or Figma destination
- Changes to the current Avatar visuals or tokens
- Changes to Avatar Group
- New primitive, semantic, or Avatar Label component-based tokens
