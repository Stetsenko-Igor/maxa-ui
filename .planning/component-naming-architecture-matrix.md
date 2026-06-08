# Component Naming Architecture Matrix

Status: active working contract
Last updated: 2026-06-08

## Purpose

This matrix defines the public component names, intent boundaries, and composition rules for MAXA UI. Use it before adding new primitives or renaming existing components.

## Menu And Selection Boundaries

| Component         | User intent                            | Trigger                                     | Selection model                        | Surface                 | Use for                                                                  | Do not use for                                  |
| ----------------- | -------------------------------------- | ------------------------------------------- | -------------------------------------- | ----------------------- | ------------------------------------------------------------------------ | ----------------------------------------------- |
| `DropdownMenu`    | Run an action or navigate to a command | Button, icon button, avatar, toolbar action | Optional checkbox/radio command states | Floating action menu    | Request, Support, Share, user menu, row actions, toolbar menus           | Form value selection                            |
| `ContextMenu`     | Run commands from a right-click target | Right click, keyboard context trigger       | Command activation                     | Pointer-positioned menu | Canvas item actions, file/card/table-row context actions                 | Primary navigation, form fields                 |
| `Select`          | Choose one value in a form             | Input-like field                            | Single value                           | Select/listbox surface  | Plan, country, type, category, sort option when submitted as field value | Action menus, multi-value selection             |
| `MultiSelect`     | Choose multiple values in a form       | Input-like field with chips                 | Multiple values                        | Dropdown checkbox list  | Asset types, tags, audiences, filters saved as field values              | Command menus, right-click actions              |
| `DatePicker`      | Choose one date                        | Input-like field with calendar icon         | Single date                            | Calendar popover        | Due date, publish date, scheduled date                                   | Generic text input, date ranges                 |
| `DateRangePicker` | Enter a date range                     | Input-like range field                      | Start/end text range                   | Calendar/range popover  | Report range, campaign window                                            | Single-date selection                           |
| `Calendar`        | Display/select days in a month         | Embedded or popover child                   | Single day primitive                   | Month grid              | DatePicker internals, scheduling surfaces                                | Standalone form replacement without field shell |

## Dialog Boundaries

| Component     | Use for                                                         | Behavior                                                              |
| ------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- |
| `Dialog`      | Focused modal forms, short decisions, sharing, editing metadata | Non-destructive modal surface with title, description, footer actions |
| `AlertDialog` | Destructive or high-risk confirmation                           | Uses `role="alertdialog"` and must include a clear cancel path        |
| `Popover`     | Lightweight anchored interactive content                        | Non-modal, anchored to a trigger                                      |
| `Tooltip`     | Non-interactive help text                                       | Hover/focus only; no buttons or form fields                           |

## Button Boundaries

| Component       | Use for                                          | Notes                                                       |
| --------------- | ------------------------------------------------ | ----------------------------------------------------------- |
| `Button`        | Text or icon+text commands                       | Primary action primitive                                    |
| `IconButton`    | Icon-only commands with semantic button variants | Requires `aria-label`                                       |
| `UtilityButton` | Dense icon-only toolbar/view controls            | Smaller square utility surface; selected state is allowed   |
| `SocialButton`  | Provider sign-in/account-linking                 | Provider icon, label, size, and full-width auth form layout |

## Navigation Boundaries

| Component          | Use for                                     | Notes                                                            |
| ------------------ | ------------------------------------------- | ---------------------------------------------------------------- |
| `Breadcrumb`       | Hierarchy trail                             | Long paths collapse through ellipsis behavior in examples        |
| `Pagination`       | Page-to-page list navigation                | Use for paged records, not wizard steps                          |
| `Tabs`             | Switch related panels in one surface        | Horizontal only in MAXA UI                                       |
| `SegmentedControl` | Compact mode switch                         | Use for view/mode selection, not page navigation                 |
| `Divider`          | Separate content sections                   | Canonical MAXA primitive name                                    |
| `Separator`        | Compatibility alias for Radix/shadcn naming | Do not create a second visual/token system separate from Divider |

## Data Display Boundaries

| Component                 | Use for                              | Notes                                                                                                                                                                                            |
| ------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Table`                   | Semantic tabular records             | Primitive only: native table parts, row states, alignment, sortable header affordance                                                                                                            |
| `TableRow`                | Table row semantic part              | Public part is required; do not replace with a generic data `Row` abstraction                                                                                                                    |
| `TableHead` / `TableCell` | Header/body/footer cells             | Compose existing components inside cells                                                                                                                                                         |
| `DataTable`               | Client-side data display abstraction | Column definitions, sorting state, row selection state, pagination, loading/empty handling. Use only for small in-memory datasets; compose `Table` + `Pagination` manually for server-side data. |

## Naming Rules

- Public React names must describe user intent, not Figma layer names.
- Keep `DropdownMenu` and `Select` separate even when both visually open a floating list.
- A component that submits or stores a value belongs to the form selection family.
- A component that performs a command belongs to the menu/action family.
- Do not add ambiguous public names like `Dropdown` or `Menu` without a qualifier.
- Prefer adding behavior to the correct primitive over duplicating similar visuals in a new component.
- `Divider` is the canonical public MAXA primitive. `Separator` may be exported for compatibility, but it must stay visually aligned with Divider.
- `Table` is the primitive. Object-driven row/column APIs belong to `DataTable`.

## Current Gaps

- `Select` v2 now uses a custom listbox; continue polishing docs/examples against Figma select variants.
- `MultiSelect` is public and visually corrected, but its internals still need a future Select-like listbox architecture pass.
- `DataTable` is shipped as a client-side abstraction; product-specific table toolbars, filters, bulk actions, and server pagination remain separate future patterns.
- `Accordion/Disclosure` remains intentionally out of scope until a real MAXA product need appears.
