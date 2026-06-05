# Dropdown Menu Architecture Research

**Created:** 2026-06-04  
**Status:** Architecture recommendation before implementation  
**Decision:** Build `DropdownMenu`, not `Dropdown`, and do not merge it with `Select`.

## Why This Research Exists

MAXA already has a Figma component/page named `Dropdown`, and `@maxa/ui` already has a React `Select`. Before implementing another dropdown-like component, we need to avoid a naming and API mistake.

The key distinction:

- `Select` is a form value picker.
- `DropdownMenu` is an action/navigation/command menu opened from a trigger.
- `ContextMenu` is a right-click/long-press action menu. It is related, but should be a separate component later.
- `MultiSelect` is a multi-value form picker. It is related to `Select`, not to `DropdownMenu`.

## MAXA Figma: Existing `Dropdown`

Source: `04 Components Reusable UI Elements`, node `546:7897`, frame name `Dropdown`.

Observed structure from Figma metadata:

- Top-level frame: `Dropdown`
- Includes an item layer:
  - `Item - Dopdown / Light Mode` (typo exists in source)
  - Item variants include:
    - `Type=Selectable`
    - `Type=Radiobutton`
    - `Type=Text`
    - `Type=w Icon`
    - `Type=w Icon w Dropdown`
    - `Type=Text + Text`
    - `Type=Title`
    - `Type=Title + Links`
    - `Type=Select User`
    - `Type=Icon + Text + Text`
  - Item states include:
    - `Default`
    - `Hover`
    - `Pressed`
    - `Selected`
    - `Disabled`
    - `Error`
- Includes an organism layer:
  - `Organism - Dropdown 1.0 / Light Mode`
  - Variants include item count via `Dropdowns=1` through `Dropdowns=10+`
  - Variants include `Title`, `Title Links`, and `Search`

Interpretation:

The current MAXA Figma `Dropdown` is a broad visual menu system: item rows plus menu surfaces with optional title/search/links. It is not equivalent to the current React `Select`, and it is too broad/ambiguous to copy directly as a public React component named `Dropdown`.

Recommendation:

- Keep the Figma source in mind as the visual menu reference.
- Public React API should be named `DropdownMenu`.
- If Figma gets renamed later, prefer `Dropdown Menu` or `Menu` for the action-menu family.
- Do not retrofit the existing React `Select` to cover this Figma page.

## Untitled UI: Naming and Structure

Sources:

- Website: `Dropdown components`
- Repo folder: `components/base/dropdown`
- Website: `Select components`
- Repo folder: `components/base/select`
- Figma nodes reviewed:
  - `Dropdown menu`
  - `Context menu`
  - `Select`
  - `Multi-select`
  - `_Select menu item`

Observed website naming:

- Untitled UI has a base component page named `Dropdowns`.
- Untitled UI has separate base component pages for `Select` and `Multi-select`.
- Untitled UI's global component catalog also lists application UI `Command menus`, `Filter bars`, `Modals`, `Notifications`, `Page headers`, `Tables`, and `Tabs`.

Observed repo structure:

```txt
components/base/dropdown/
  dropdown.tsx
  dropdown-button-simple.tsx
  dropdown-button-advanced.tsx
  dropdown-button-link.tsx
  dropdown-icon-simple.tsx
  dropdown-icon-advanced.tsx
  dropdown-search-simple.tsx
  dropdown-search-advanced.tsx
  dropdown-integration.tsx
  dropdown-avatar.tsx
  dropdown-account-button.tsx
  dropdown-account-card-xs.tsx
  dropdown-account-card-sm.tsx
  dropdown-account-card-md.tsx
  dropdown-account-breadcrumb.tsx
```

Core API pattern in `dropdown.tsx`:

```tsx
Dropdown.Root
Dropdown.Popover
Dropdown.Menu
Dropdown.Section
Dropdown.SectionHeader
Dropdown.Item
Dropdown.Separator
Dropdown.DotsButton
```

Implementation basis:

- Uses React Aria components:
  - `MenuTrigger`
  - `Popover`
  - `Menu`
  - `MenuSection`
  - `MenuItem`
  - `Separator`
- Item supports:
  - `label`
  - `addon`
  - `icon`
  - `avatarUrl`
  - `selectionIndicator`: `checkmark`, `checkbox`, `radio`, `toggle`, `none`
  - `unstyled`
- Popover supports placement and animation through React Aria state/classes.

Select repo structure:

```txt
components/base/select/
  select.tsx
  select-item.tsx
  select-native.tsx
  select-shared.tsx
  combobox.tsx
  popover.tsx
  multi-select.tsx
  tag-select.tsx
```

Untitled UI separates:

- `Dropdown` for action/menu surfaces.
- `Select` for single-value form selection.
- `MultiSelect` for multi-value selection with search/footer/empty state.
- `Context menu` in Figma as a separate component from `Dropdown menu`.

Lesson for MAXA:

Untitled's implementation uses the short namespace `Dropdown`, but MAXA should not copy that public name because our system already has an ambiguous Figma `Dropdown` and a code-level `Select` whose Figma visual name may be `Input Form / Dropdown`.

## shadcn/ui: Naming and Structure

Sources:

- Website: `Dropdown Menu`
- Website: `Select`
- Website: `Context Menu`
- Repo files:
  - `apps/v4/registry/new-york-v4/ui/dropdown-menu.tsx`
  - `apps/v4/registry/new-york-v4/ui/select.tsx`
  - `apps/v4/registry/new-york-v4/ui/context-menu.tsx`

Observed website naming:

- `Dropdown Menu`: "Displays a menu to the user — such as a set of actions or functions — triggered by a button."
- `Select`: "Displays a list of options for the user to pick from—triggered by a button."
- `Context Menu`: "Displays a menu of actions triggered by a right click."

Dropdown Menu composition:

```tsx
DropdownMenu
├── DropdownMenuTrigger
└── DropdownMenuContent
    ├── DropdownMenuGroup
    │   ├── DropdownMenuLabel
    │   ├── DropdownMenuItem
    │   └── DropdownMenuItem
    ├── DropdownMenuSeparator
    ├── DropdownMenuCheckboxItem
    ├── DropdownMenuRadioGroup
    │   └── DropdownMenuRadioItem
    └── DropdownMenuSub
        ├── DropdownMenuSubTrigger
        └── DropdownMenuSubContent
```

Select composition:

```tsx
Select
├── SelectTrigger
│   └── SelectValue
└── SelectContent
    ├── SelectGroup
    │   ├── SelectLabel
    │   └── SelectItem
    ├── SelectSeparator
    └── SelectGroup
```

Context Menu composition mirrors Dropdown Menu but uses a right-click/long-press trigger:

```tsx
ContextMenu
├── ContextMenuTrigger
└── ContextMenuContent
    ├── ContextMenuGroup
    ├── ContextMenuItem
    ├── ContextMenuCheckboxItem
    ├── ContextMenuRadioItem
    ├── ContextMenuSeparator
    └── ContextMenuSub
```

Implementation basis:

- shadcn uses Radix primitives for all three:
  - `DropdownMenuPrimitive`
  - `SelectPrimitive`
  - `ContextMenuPrimitive`
- Dropdown and Context Menu share almost the same menu subcomponent vocabulary.
- Select has a separate trigger/value/content/item vocabulary because it owns selection value state.

Lesson for MAXA:

Use shadcn naming for our public React API: `DropdownMenu`. It is explicit and avoids ambiguity with form dropdown/select.

## Recommended MAXA Architecture

### Public React names

Build now:

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

Keep existing:

```tsx
Select
```

Do later:

```tsx
ContextMenu
MultiSelect
Combobox
CommandMenu
```

### Naming rules

- Do not export a public React component named `Dropdown`.
- Do not rename the current React `Select` to `Dropdown`.
- Do not use `Select` for Request, Support, User, Share, toolbar, row-action, or card-action menus.
- Do not build `ContextMenu` as part of the first `DropdownMenu` implementation.
- Keep `ContextMenu` as a separate future component because its trigger semantics are right-click/long-press, not button click.

### Figma mapping

| Figma source | React target | Notes |
|--------------|--------------|-------|
| MAXA `Dropdown` item rows | `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, internal menu row styles | Action/menu item family |
| MAXA `Dropdown` organism | `DropdownMenuContent` plus grouped items/title/search variants | Menu surface family |
| Untitled `Dropdown menu` | `DropdownMenu` | Good conceptual match |
| Untitled `Context menu` | future `ContextMenu` | Separate component |
| Untitled `Select` | existing/future richer `Select` | Form selection |
| Untitled `Multi-select` | future `MultiSelect` | Form multi-selection |
| shadcn `Dropdown Menu` | `DropdownMenu` | Strong API naming model |
| shadcn `Select` | `Select` | Separate from menu |
| shadcn `Context Menu` | future `ContextMenu` | Separate from menu |

### Implementation basis

Use Radix for MAXA `DropdownMenu`, consistent with current `@maxa/ui` direction and shadcn's proven API shape:

```txt
@radix-ui/react-dropdown-menu
```

If the repo already uses the consolidated `radix-ui` import style later, follow the repo's local convention. Today existing overlay work should be checked first, especially `Popover`.

### Scope for first implementation

First pass should support:

- Trigger via `asChild`
- Content with `side`, `align`, `sideOffset`
- Item
- Label
- Group
- Separator
- Shortcut/addon slot
- Icon slot
- Destructive item variant
- Disabled state
- Checkbox item
- Radio group/item
- Submenu, if Radix integration is simple and tests remain clean

Defer:

- Searchable dropdown menu
- Account card dropdown patterns
- Integration picker
- Context menu
- Multi-select
- Combobox

## Risks

- **Name collision risk:** `Dropdown` is too ambiguous in MAXA because Figma uses it broadly and React already uses `Select` for form dropdowns.
- **Abstraction risk:** a shared low-level `MenuItem` might be tempting, but select items and action-menu items have different semantics. Start with `DropdownMenuItem`; extract an internal primitive only if `ContextMenu` proves the duplication is real.
- **Dialog interaction risk:** Radix dropdown menus can conflict with dialogs when a menu item opens a modal. Add a note in docs/tests when Dialog work begins; consider exposing `modal={false}` passthrough if needed.
- **Scope creep risk:** Untitled's dropdown family includes many product-ready variants. Do not build all of them now. Build the primitive API plus MAXA examples.

## Final Recommendation

Proceed with a `DropdownMenu` spec and implementation. Use shadcn's public naming shape, Untitled's richer item lessons, and MAXA's Figma `Dropdown` page as visual evidence for item variants and organism/menu surfaces.

Do not implement `Accordion/Disclosure` now. Do not rename or overload `Select`.
