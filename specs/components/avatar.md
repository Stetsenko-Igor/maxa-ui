# Avatar — Component Spec

`Avatar` represents a person, account, workspace member, or overflow count. Use it in user menus, assignment rows, collaborator groups, and account triggers.

**Component package:** `@maxa/ui` → `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarGroup`

**Pattern:** Radix Avatar (`Root + Image + Fallback`) with MAXA component tokens.

## API

```ts
type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl"
type AvatarShape = "circle" | "square"
type AvatarStatus = "online" | "offline" | "busy" | "away"
type AvatarEmphasis = "strong" | "medium" | "neutral"
type AvatarAppearance =
  | "blue" | "green" | "teal" | "yellow" | "orange" | "red" | "rose" | "violet" | "purple"
```

Prop names follow `specs/patterns/variant-vocabulary.md`: `appearance` is the decorative palette hue, `emphasis` is the visual weight.

Exports:

```tsx
Avatar
AvatarImage
AvatarFallback
AvatarGroup
```

`Avatar` accepts:

- `size`
- `appearance`
- `shape`
- `status`
- `emphasis`

`AvatarGroup` accepts:

- `max`
- `overflow`: `"count"` or `"ellipsis"`

## Usage

```tsx
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@maxa/ui"

<Avatar appearance="blue" emphasis="medium" status="online">
  <AvatarImage alt="Igor Stetsenko" src="/avatar.png" />
  <AvatarFallback>IS</AvatarFallback>
</Avatar>

<AvatarGroup max={3}>
  <Avatar appearance="blue" emphasis="medium"><AvatarFallback>IS</AvatarFallback></Avatar>
  <Avatar appearance="green" emphasis="medium"><AvatarFallback>AV</AvatarFallback></Avatar>
  <Avatar appearance="rose" emphasis="medium"><AvatarFallback>MC</AvatarFallback></Avatar>
  <Avatar appearance="orange" emphasis="medium"><AvatarFallback>JW</AvatarFallback></Avatar>
</AvatarGroup>
```

## Visual Contract

- Sizes: `xs`, `sm`, `md`, `lg`, `xl`
- Shapes: circle by default; square for workspace/object avatars
- Fallback: initials, icon, or short overflow text
- Emphasis: `strong` for high contrast, `medium` for calmer identity chips, `neutral` for low-emphasis placeholders and group overflow
- Status: online/offline/busy/away dot anchored bottom-right
- Group: overlapping avatars with surface ring and count or ellipsis overflow. Do not show status dots inside overlapped groups.

## Accessibility

- `AvatarImage` must include `alt` when the person identity matters.
- Use empty `alt=""` only when adjacent text already names the person.
- Status dots are decorative by default; expose status in adjacent text when status is meaningful to the workflow.
- Overflow avatars in `AvatarGroup` use neutral emphasis and an accessible label such as `3 more`.

## Boundaries

| Need | Use |
|------|-----|
| Person/account identity | `Avatar` |
| Workspace initials/image | `Avatar` with `shape="square"` |
| Multiple collaborators | `AvatarGroup` |
| Action menu trigger | `Avatar` + `DropdownMenuTrigger` |
| File or document icon | Icon component, not Avatar |
