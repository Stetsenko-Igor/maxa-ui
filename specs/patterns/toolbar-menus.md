# Toolbar Menus — Product Pattern Spec

Toolbar Menus define how MAXA places action menus in dense product surfaces: global navigation, dashboard toolbars, AMP package toolbars, and editor top bars.

This is a product pattern, not a new primitive. It composes existing primitives such as `Button`, `IconButton`, `Input`, `DropdownMenu`, `Badge`, and future `Avatar`, `Select v2`, `PageHeader`, and `ActionToolbar`.

## Source Evidence

From `~/.claude/knowledge/maxa/ui-inventory.md`:

- Global header: `Request`, `Support`, and user/avatar menu.
- Dashboard toolbar: search, create folder, PDF to Print, tag filter, sort, view toggles.
- Scheduled toolbar: search, sort, view toggles, Content Calendar.
- AMP package detail toolbar: Back, Search in Package, Share, Sort by, view toggles, settings.
- Editor top bar: Close, beta warning, Print, Send to Create, Download, Share, Avatar.

Reference screenshots:

- `24-request-dropdown.png`
- `25-support-dropdown.png`
- `26-user-menu-dropdown.png`
- `01-dashboard.png`
- `30-scheduled.png`
- `40-amp-package-detail.png`
- `50-design-editor.png`

## Pattern Families

### Global Header Menus

Use `DropdownMenu` for:

- Request menu:
  - Request Design
  - Template Requests
  - Concierge Requests
- Support menu:
  - Get Help
  - Contact Print Support
  - Help Center
- User menu:
  - Admin
  - Account
  - My Requests
  - Print
  - Swag
  - Ad Campaigns
  - My Concierge Shop Orders
  - Terms Of Use
  - Logout
  - Dark Mode toggle

Rules:

- Trigger labels include a down chevron.
- User trigger should eventually use `Avatar` plus workspace/account label.
- Keep menu width compact unless the row includes secondary metadata.
- Use separators between functional groups.

### Dashboard Toolbar Menus

Dashboard toolbar contains search, creation actions, filters, sort, and view controls.

Use:

- `Input` for search.
- `Button` for Create Folder and PDF to Print.
- `DropdownMenu` for tag/filter menus and row/card actions.
- Future `Select v2` for persistent sort value selection.
- Future `ToggleGroup` or icon-button group for view density.

Rules:

- Action menus are right aligned to their trigger.
- Sort is a value selector, not an action menu; it should become `Select v2`.
- View controls should not open menus unless there are more than three view modes.

### AMP Package Toolbar Menus

AMP package detail uses a product-density toolbar:

- Back button
- Search in Package
- Share menu
- Sort by selector
- View controls
- Settings action

Rules:

- Share is a `DropdownMenu` because it exposes actions.
- Sort by is `Select v2` because it mutates a persistent ordering value.
- Settings should be an icon action or menu depending on number of actions.

### Editor Top Bar Menus

Editor top bar contains high-frequency actions:

- Close
- Print
- Send to Create
- Download
- Share
- Avatar/user menu

Rules:

- Primary editor actions remain direct buttons when single-action.
- Share can be a `DropdownMenu` when it contains copy link, email, team share, or permission actions.
- Download can become a menu only when format choices are present.

## Component Boundaries

| Need | Component / Pattern |
|------|---------------------|
| Action list from a button | `DropdownMenu` |
| Persistent sort value | `Select v2` |
| Global user account trigger | future `Avatar` + `DropdownMenu` |
| Search in toolbar | `Input` |
| Toolbar layout | future `ActionToolbar` pattern/component |
| Page title + primary actions | future `PageHeader` pattern/component |
| Filter chips / tags | future `FilterBar` pattern/component |
| Right-click menu | future `ContextMenu` |

## Anti-patterns

- Do not use native browser `select` UI as a visual reference for MAXA menus.
- Do not use `DropdownMenu` for persistent form values such as sort.
- Do not hide expected chevrons on triggers that open menus.
- Do not create generic toolbar shells without matching the real MAXA product surface.
- Do not introduce a generic `Card` to solve card action menus; map product card patterns first.

## Follow-up Components

Recommended implementation order after this pattern:

1. `Select v2` / custom accessible listbox.
2. `Avatar` for user menu triggers.
3. `ActionToolbar` pattern for dashboard and AMP toolbars.
4. `PageHeader` pattern for dashboard/package/detail contexts.
5. `Dialog` / `AlertDialog` for actions that need confirmation or form input.
