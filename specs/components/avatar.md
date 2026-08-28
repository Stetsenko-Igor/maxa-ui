# Avatar

Status: implemented

Canonical spec for the MAXA identity Avatar.

Figma component set: `Avatar`, node `818:774` in `ODH3pmxkKyP8pAslgDb15s`.

## Purpose

Avatar represents a person, account, workspace member, or workspace object. Use it in user menus, assignment rows, account triggers, and as the identity primitive inside Avatar Label.

## Exports

```tsx
Avatar
AvatarImage
AvatarFallback
AvatarGroup // deprecated compatibility export
```

The component uses the Radix Avatar `Root + Image + Fallback` composition.

## API

```ts
type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl"
type AvatarShape = "circle" | "square"
type AvatarStatus = "online" | "offline" | "busy" | "away"
type AvatarEmphasis = "strong" | "medium" | "neutral"
type AvatarAppearance =
  | "amber"
  | "blue"
  | "cyan"
  | "emerald"
  | "fuchsia"
  | "green"
  | "indigo"
  | "lime"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "rose"
  | "teal"
  | "violet"
  | "yellow"
```

Defaults:

- `size="md"`
- `shape="circle"`
- `appearance="blue"`
- `emphasis="neutral"`

`appearance` selects a decorative hue and has no semantic meaning. The Figma-approved colored fallback treatment uses `emphasis="medium"`. `strong` remains available for backward compatibility but is not the default Figma presentation.

## Usage

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@maxa/ui"

<Avatar status="online">
  <AvatarImage alt="Igor Stetsenko" src="/avatar.png" />
  <AvatarFallback>IS</AvatarFallback>
</Avatar>

<Avatar appearance="violet" emphasis="medium" shape="square">
  <AvatarFallback>MW</AvatarFallback>
</Avatar>
```

## Visual Contract

- Sizes: `xs=24`, `sm=32`, `md=40`, `lg=48`, `xl=64`.
- Rounded is the default shape. Square is intended for workspace or object identity.
- Neutral is the default fallback treatment.
- Colored fallbacks use the complete 16-hue Figma palette and medium emphasis.
- Status dots are anchored to the bottom-right corner.
- Image and fallback content inherit the root shape.

## Component Tokens

Avatar owns a component token layer because its body border and shape may evolve independently of generic surfaces:

| Token                    | Value                           |
| ------------------------ | ------------------------------- |
| `--avatar-border`        | `var(--color-border-secondary)` |
| `--avatar-border-width`  | `1px`                           |
| `--avatar-radius`        | `var(--radius-full)`            |
| `--avatar-radius-square` | `var(--radius-md)`              |

Figma equivalents:

| Variable                      | Alias/value                             | Scope           |
| ----------------------------- | --------------------------------------- | --------------- |
| `Avatar/surface/border`       | `{Color modes/border/border-secondary}` | `STROKE_COLOR`  |
| `Avatar/layout/border-width`  | `1`                                     | `STROKE_FLOAT`  |
| `Avatar/layout/radius-circle` | `{Radius/radius-full}`                  | `CORNER_RADIUS` |
| `Avatar/layout/radius-square` | `{Radius/radius-md}`                    | `CORNER_RADIUS` |

Every Figma Avatar container binds all four stroke sides to the same border-width token. This is required because Figma frame-like nodes expose individual stroke-side bindings.

## Avatar Group Compatibility

`AvatarGroup` is hidden in Figma and is not an active product component. It remains exported only to avoid breaking existing consumers.

- Do not introduce new Avatar Group usage.
- Do not show Avatar Group in the public component catalog.
- Prefer individual Avatar components or Avatar Label.
- A future group pattern requires a new product requirement and design review.

## Accessibility

- `AvatarImage` must include meaningful `alt` text when the image is the only identity label.
- Use `alt=""` when adjacent text, such as Avatar Label, already names the person.
- Status dots are decorative. Communicate meaningful presence state in adjacent text.
- Do not rely on decorative hue alone to identify a person.

## Boundaries

| Need                             | Use                                                       |
| -------------------------------- | --------------------------------------------------------- |
| Person or account identity       | `Avatar`                                                  |
| Workspace initials or image      | `Avatar shape="square"`                                   |
| Avatar plus visible name/details | `AvatarLabel`                                             |
| Profile navigation               | `AvatarLabel href="…"`                                    |
| Multiple collaborators           | Product-specific composition; `AvatarGroup` is deprecated |
| Action menu trigger              | `Avatar` composed with the menu trigger                   |
| File or document identity        | Approved icon or thumbnail component                      |
