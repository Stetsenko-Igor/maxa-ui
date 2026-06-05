# Dropdown Menu — Component Spec

`DropdownMenu` is the action and navigation menu opened from a trigger. Use it for Request, Support, user/account, Share, toolbar, row-action, and card-action menus.

Do not use `DropdownMenu` for form value selection. Use `Select` for one-value form fields and a future `MultiSelect` for multi-value form fields.

**Component package:** `@maxa/ui` → `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, and related menu primitives

**Pattern:** Radix Dropdown Menu (`Root + Trigger + Portal + Content + Item`) with MAXA component tokens.

## Figma mapping

```txt
04 Components Reusable UI Elements / Dropdown
  Item - Dopdown / Light Mode
  Organism - Dropdown 1.0 / Light Mode
```

The Figma source is named `Dropdown`, but the public React API is `DropdownMenu` to avoid ambiguity with form dropdown/select fields.

## API

```ts
type DropdownMenuSide = "top" | "right" | "bottom" | "left"
type DropdownMenuAlign = "start" | "center" | "end"

type DropdownMenuItemVariant = "default" | "destructive"
```

Root and primitive exports:

```tsx
DropdownMenu
DropdownMenuTrigger
DropdownMenuContent
DropdownMenuGroup
DropdownMenuLabel
DropdownMenuItem
DropdownMenuSeparator
DropdownMenuCheckboxItem
DropdownMenuRadioGroup
DropdownMenuRadioItem
DropdownMenuShortcut
DropdownMenuSub
DropdownMenuSubTrigger
DropdownMenuSubContent
```

`DropdownMenuContent` accepts Radix content props plus:

- `side`
- `align`
- `sideOffset`

`DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, and `DropdownMenuSubTrigger` accept:

- `variant?: "default" | "destructive"`
- `inset?: boolean`

## Usage

```tsx
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@maxa/ui"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Request</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Request</DropdownMenuLabel>
    <DropdownMenuItem>Request Design</DropdownMenuItem>
    <DropdownMenuItem>Template Requests</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Concierge Requests</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Visual Contract

- Surface: `--dropdown-menu-bg` aliases `bg/float`
- Text: `--dropdown-menu-item-text` aliases `text/primary`
- Border: `--dropdown-menu-border` aliases `border/primary`
- Shadow: `--dropdown-menu-shadow` aliases `shadow-sm`
- Radius: `radius-md`
- Z-index: `z-dropdown`
- Item height is compact and product-density friendly.

## Behavior

- Opens from trigger click or controlled state.
- Closes on escape, outside click, or item activation.
- Supports keyboard navigation.
- Supports disabled, destructive, checkbox, radio, and submenu items.
- Content is portaled by default.

## Accessibility

- Trigger must have an accessible name.
- Item labels must be clear actions or destinations.
- Use destructive styling only for irreversible or risky actions.
- Do not put form submit flows inside a dropdown menu; open a Dialog or Sheet instead.

## Boundaries

| Need | Use |
|------|-----|
| One-value form field | `Select` |
| Multi-value form field | `MultiSelect` |
| Searchable command palette | future `CommandMenu` |
| Right-click / long-press menu | `ContextMenu` |
| Button-triggered action menu | `DropdownMenu` |

## Anti-patterns

- Do not export or import a public `Dropdown` React component.
- Do not use `Select` for Request, Support, User, Share, toolbar, row-action, or card-action menus.
- Do not build ContextMenu behavior into DropdownMenu.
- Do not add searchable/account-card variants until the core menu API is stable.
- Do not treat the current native `Select` popup as the visual model for dropdown menus. `Select` needs its own custom listbox/menu surface in a separate v2 pass.
