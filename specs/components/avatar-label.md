# Avatar Label

Status: implemented

Canonical spec for the MAXA Avatar Label identity composition.

Figma component set: `Avatar Label`, node `867:374` in `ODH3pmxkKyP8pAslgDb15s`.

## Purpose

Avatar Label combines an Avatar with a visible name and optional secondary description. It supports display-only identity and profile navigation without requiring consumers to recreate spacing, typography, focus, or link states.

## Anatomy

```text
[ Avatar ]  [ Label       ]
            [ Description ]
```

- The nested Avatar is required.
- Label is required.
- Description is optional.
- The complete bounds become one link target when `href` is supplied.

## API

```ts
type AvatarLabelSize = "sm" | "md" | "lg" | "xl"

type AvatarLabelProps = {
  avatar: React.ReactElement<AvatarProps>
  label: React.ReactNode
  description?: React.ReactNode
  size?: AvatarLabelSize // default "sm"
  href?: string
}
```

Static usage accepts standard `div` attributes. Linked usage requires `href` and accepts standard anchor attributes such as `target`, `rel`, and `aria-label`. The forwarded ref targets the rendered `div` or `a`.

Avatar Label overrides the supplied Avatar element's `size` so the nested identity and text scale remain synchronized.

## Usage

```tsx
import { Avatar, AvatarFallback, AvatarImage, AvatarLabel } from "@maxa/ui"

<AvatarLabel
  avatar={
    <Avatar>
      <AvatarImage alt="" src="/maxa-design.png" />
      <AvatarFallback>MD</AvatarFallback>
    </Avatar>
  }
  label="Maxa Design"
  description="Product designer"
/>

<AvatarLabel
  avatar={<Avatar><AvatarFallback>MD</AvatarFallback></Avatar>}
  label="Maxa Design"
  description="Product designer"
  href="/profile"
  aria-label="Open Maxa Design profile"
/>
```

The Foundation component does not hard-code `/profile`; that is the confirmed MAXA route example. The consuming product supplies the destination for the represented identity.

## Sizes

| Avatar Label size | Avatar | Label/description typography |
| ----------------- | ------ | ---------------------------- |
| `sm`              | 32 px  | `text-sm`, 12/18             |
| `md`              | 40 px  | `text-sm`, 12/18             |
| `lg`              | 48 px  | `text-md`, 14/20             |
| `xl`              | 64 px  | `text-lg`, 16/24             |

The Avatar-to-text gap is `--spacing-lg` (12 px).

## Interaction Contract

When `href` is absent, Avatar Label renders a non-interactive `div`.

When `href` is present, Avatar Label renders an anchor:

| State         | Label                                  | Description | Avatar | Target                                |
| ------------- | -------------------------------------- | ----------- | ------ | ------------------------------------- |
| Default       | `--color-text-secondary`, no underline | Stable      | Stable | No added surface                      |
| Hover         | `--color-text-link-hover`, underline   | Stable      | Stable | Pointer cursor                        |
| Active        | `--color-text-link-active`, underline  | Stable      | Stable | No geometry shift                     |
| Focus visible | `--color-text-link`, no underline      | Stable      | Stable | 2 px semantic focus ring, 2 px offset |

Focus surrounds the complete Avatar + text target and uses `--radius-sm` without adding padding or changing layout dimensions.

## Token Strategy

Avatar Label does not own component-based tokens. Its identity body inherits the nested Avatar component tokens; link and focus behavior intentionally consumes shared semantic/foundation tokens directly:

- `--color-text-secondary`
- `--color-text-link`
- `--color-text-link-hover`
- `--color-text-link-active`
- `--color-focus-ring`
- `--spacing-lg`
- `--spacing-xxs`
- `--radius-sm`
- `--width-2`

Create Avatar Label component tokens only if the component later needs to diverge from universal MAXA link semantics.

## Accessibility

- Use an anchor for navigation, not a button.
- The complete component is one keyboard-focusable target.
- Ensure the accessible name identifies the represented profile.
- Use empty Avatar image alt text when the adjacent label already communicates the same identity.
- Do not nest other interactive elements inside Avatar Label.
- Do not attach click behavior to the static variant; supply `href` when navigation is intended.

## Boundaries

| Need                             | Use                                                      |
| -------------------------------- | -------------------------------------------------------- |
| Identity image or initials only  | `Avatar`                                                 |
| Identity with visible label      | `AvatarLabel`                                            |
| Identity navigating to a profile | `AvatarLabel href="…"`                                   |
| Editable form row                | A form/list pattern, not Avatar Label                    |
| Action that does not navigate    | A Button or menu trigger                                 |
| Multiple identities              | Product-specific composition; Avatar Group is deprecated |
