# MAXA UI Component Coverage Matrix

**Created:** 2026-06-04  
**Purpose:** Decide the next component and product-pattern work from evidence, not from a generic UI-kit checklist.

## Decision Context

MAXA UI is now targeting a full design-system platform: tokens, React components, docs/catalog, Figma handoff, and MAXA product patterns. The benchmark is the breadth of Untitled UI and shadcn/ui, but every priority must be grounded in real MAXA product screens.

Primary references:

- MAXA product inventory: `~/.claude/knowledge/maxa/ui-inventory.md`
- MAXA screenshots: `~/Library/Mobile Documents/com~apple~CloudDocs/Work/Maxadesigns.com/AI/_Global/screenshots/`
- Current implementation: `packages/ui/src/components/`, `specs/components/`, `apps/docs/app/docs/components/`
- Untitled UI React components: `https://www.untitledui.com/react/components`
- shadcn/ui components: `https://ui.shadcn.com/docs/components`

## Current MAXA UI Coverage

Implemented component families:

Implemented inventory: **37 components** (all with spec, implementation, docs, tests).

| Component                    | Status     | Notes                                                                                                                |
| ---------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------- |
| Alert                        | Shipped    | Spec, implementation, docs, tests                                                                                    |
| AlertDialog                  | Shipped    | Destructive/high-risk confirmation modal                                                                             |
| Avatar                       | Shipped    | Identity primitive with image, fallback, status, group                                                               |
| Badge                        | Shipped    | Separate from Tag; status/count/metadata indicator                                                                   |
| Breadcrumb                   | Shipped    | Hierarchy navigation with long-path ellipsis                                                                         |
| Button                       | Shipped    | Core action primitive                                                                                                |
| Calendar                     | Shipped    | Date grid primitive backing DatePicker                                                                               |
| Checkbox                     | Shipped    | Form primitive                                                                                                       |
| ContextMenu                  | Shipped    | Right-click command menu; separate from DropdownMenu                                                                 |
| DatePicker / DateRangePicker | Shipped    | Form-level component                                                                                                 |
| Dialog                       | Shipped    | Focused modal overlay                                                                                                |
| Divider                      | Shipped    | **Canonical** divide primitive. `Separator` ships as a Radix/shadcn compat alias (tokens reference `--divider-*`)    |
| DropdownMenu                 | Shipped    | Action/command menu; separate from Select and ContextMenu                                                            |
| Empty                        | Shipped    | Empty/no-result state primitive                                                                                      |
| FormField                    | Shipped    | Label/helper/error composition                                                                                       |
| IconButton                   | Shipped    | Utility action primitive                                                                                             |
| Input / TextArea             | Shipped    | TextArea is included in input implementation                                                                         |
| MultiSelect                  | Shipped    | Multi-value chip field; internals still use DropdownMenu (future Select-like refactor)                               |
| Pagination                   | Shipped    | Page navigation; pairs with future DataTable                                                                         |
| Popover                      | Shipped    | Overlay primitive                                                                                                    |
| Progress                     | Shipped    | Determinate/indeterminate progress feedback                                                                          |
| Radio                        | Shipped    | Form primitive                                                                                                       |
| SegmentedControl             | Shipped    | Mode-switch control                                                                                                  |
| Select                       | Shipped v2 | Custom accessible listbox form selector with hidden native select for form compatibility; separate from DropdownMenu |
| Separator                    | Shipped    | Compat alias for Divider (see Divider)                                                                               |
| Skeleton                     | Shipped    | Placeholder loading state                                                                                            |
| Slider                       | Shipped    | Radix-backed numeric range control with marks/value                                                                  |
| SocialButton                 | Shipped    | Provider sign-in button (icon-based, sizes/states)                                                                   |
| Spinner                      | Shipped    | Inline async activity primitive                                                                                      |
| Table                        | Shipped    | Semantic data-table primitive (DataTable abstraction pending)                                                        |
| DataTable                    | Shipped    | Client-side data display layer with sorting, selection, pagination, loading, and empty states                        |
| Tabs                         | Shipped    | Horizontal panel switching                                                                                           |
| Tag                          | Shipped    | Data/category/removable label; no intent API                                                                         |
| Toggle                       | Shipped    | Binary control / toggle button                                                                                       |
| Tooltip                      | Shipped    | Hover/focus assistance                                                                                               |
| Toast                        | Shipped    | Viewport notification primitive with intent variants, action, close, and hook API                                    |
| UtilityButton                | Shipped    | Dense utility action primitive                                                                                       |

## Select vs DropdownMenu

These are not interchangeable.

| Component    | Job                                                  | Data model                        | Typical MAXA usage                                                                    | Should close Phase 2?                  |
| ------------ | ---------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------- |
| Select       | Choose one value from known options                  | A form field value                | Sort by, language, form dropdown, quantity-like known option selection                | Shipped v2 (custom accessible listbox) |
| DropdownMenu | Show actions, navigation, or commands from a trigger | Usually no persistent field value | Request menu, Support menu, user/avatar menu, Share menu, card actions, toolbar menus | Yes, high priority                     |

Rule: if the trigger opens choices that mutate a form value, use `Select`. If it opens commands, routes, account actions, destructive actions, or grouped menu items, use `DropdownMenu`.

## Product Need Matrix

Priority scale:

- **P0**: Blocks accurate production-like MAXA screens
- **P1**: Important soon for common app flows
- **P2**: Useful, but can wait
- **Deferred**: Do not build until a real MAXA usage appears

| Need / Component                | MAXA evidence                                                                                 | Current MAXA UI             | Untitled UI reference                        | shadcn reference                         | Priority       | Decision                                                                   |
| ------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------- | -------------------------------------------- | ---------------------------------------- | -------------- | -------------------------------------------------------------------------- |
| DropdownMenu                    | Top nav Request, Support, User menu; editor Share; package Share                              | Shipped                     | Dropdowns, command menus, header navigations | Dropdown Menu, Context Menu, Menubar     | P0             | Built before Accordion                                                     |
| Tabs                            | Likely needed for dense catalog/docs and future settings/product areas; benchmark-standard    | Shipped                     | Tabs                                         | Tabs                                     | P1             | Horizontal MAXA tabs shipped; continue visual QA                           |
| Dialog / Modal                  | Workspace admin overlay, account/order flows, destructive confirmations                       | Shipped                     | Modals                                       | Dialog, Alert Dialog                     | P0             | Dialog and AlertDialog shipped; Sheet remains pending                      |
| Select v2 / Custom listbox      | Existing Select opened a native browser menu and did not show MAXA item states/variants       | Shipped v2                  | Select, combobox, select menu item           | Select                                   | P0 quality fix | Custom listbox shipped; continue visual polish against Figma variants      |
| Multi-select                    | Tag/filter and assignment workflows need multi-value selection                                | Shipped                     | Multi-select                                 | Combobox/custom                          | P0             | Public component shipped; internal listbox architecture polish remains     |
| Progress                        | Upload, print, generation, and async workflows need progress feedback                         | Shipped                     | Progress indicator                           | Progress                                 | P1             | Keep realistic upload/workflow examples in docs                            |
| Skeleton                        | Dashboard/template/package loading states need placeholder loading                            | Shipped                     | Loading indicators                           | Skeleton                                 | P1             | Visual QA complete enough for component layer; product examples pending    |
| Spinner                         | Buttons and async surfaces need inline activity state                                         | Shipped                     | Loading indicators                           | Spinner                                  | P1             | Shared async primitive                                                     |
| Alert Dialog / Modal            | Destructive confirmations and blocking decisions                                              | Shipped                     | Modals                                       | Alert Dialog                             | P0             | Build Sheet/Toast next, not another modal primitive                        |
| Context Menu                    | Right-click/secondary action menu for dense editor or card surfaces                           | Shipped                     | Context menu                                 | Context Menu                             | P1             | Separate from DropdownMenu                                                 |
| Breadcrumb                      | Package/detail hierarchy and back navigation                                                  | Shipped                     | Breadcrumbs                                  | Breadcrumb                               | P2             | Includes long-path ellipsis examples                                       |
| Pagination                      | Tables/template lists may need page navigation                                                | Shipped                     | Paginations                                  | Pagination                               | P2             | Pair with future Table/DataTable                                           |
| Slider                          | Benchmark gap for numeric settings such as opacity, zoom, density                             | Shipped 2026-06-04          | Sliders                                      | Slider                                   | P2             | Radix-backed range control with marks/value examples                       |
| Social Button                   | Login and external auth flows include Facebook sign-in                                        | Shipped                     | Social buttons                               | Button variants/custom                   | P2             | Provider sign-in button with icons, sizes, full-width, disabled state      |
| Utility Button                  | Icon/action utility affordance gap vs Untitled UI                                             | Shipped                     | Utility button                               | Button/IconButton                        | P2             | Dense utility action primitive                                             |
| Sheet / Slideout                | Side panels, editor/tool settings, responsive menus                                           | Missing                     | Slideout menus                               | Sheet, Drawer                            | P1             | Build after Dialog/Menu/DataTable basics                                   |
| Toast / Notification            | Save/download/share feedback and async workflow status                                        | Shipped                     | Notifications, alerts                        | Sonner, Toast                            | P1             | Viewport notification primitive shipped                                    |
| Table / DataTable               | Orders, admin/account lists, request lists likely need structured data                        | Shipped                     | Tables                                       | Table, Data Table                        | P1             | Table primitive and client-side DataTable abstraction shipped              |
| Sidebar / Navigation primitives | Dashboard left sidebar, AMP package sidebar                                                   | Missing as reusable pattern | Sidebar navigations, header navigations      | Sidebar, Navigation Menu                 | P0 pattern     | Treat as product pattern first, componentize primitives as needed          |
| PageHeader                      | Dashboard/category/package headings and toolbars                                              | Missing                     | Page headers                                 | Item / layout patterns, blocks           | P0 pattern     | Product pattern priority                                                   |
| FilterBar / Toolbar             | Dashboard search/sort/view toggle/tag filters, package toolbar                                | Missing                     | Filter bars                                  | Input Group, Toggle Group, Dropdown Menu | P0 pattern     | Product pattern priority                                                   |
| EmptyState                      | Scheduled empty state and no-result screens                                                   | Missing                     | Empty states                                 | Empty                                    | P0 pattern     | Product pattern priority                                                   |
| DesignCard / TemplateCard       | Dashboard cards, template masonry, AMP cards                                                  | Missing                     | Card headers / app examples                  | Card                                     | P0 pattern     | Product-specific pattern before generic Card                               |
| Avatar / User trigger           | Top nav avatar/user menu                                                                      | Shipped                     | Avatars                                      | Avatar                                   | P1             | Use with DropdownMenu; user-trigger composition still needs product polish |
| Breadcrumbs                     | Back navigation/package/detail hierarchy may need it, but current app often uses Back buttons | Shipped                     | Breadcrumbs                                  | Breadcrumb                               | P2             | Use where hierarchy is explicit; otherwise prefer product Back button      |
| Pagination                      | Tables/template lists may need it; current captured screens emphasize grids/sort/search       | Shipped                     | Paginations                                  | Pagination                               | P2             | Pair with DataTable or template grid work                                  |
| Skeleton / Loading              | Useful for async dashboard and editor surfaces                                                | Shipped                     | Loading indicators                           | Skeleton, Spinner                        | P1             | Product loading examples pending                                           |
| Progress                        | Uploads, file/PDF/import workflows                                                            | Shipped                     | Progress indicators, progress steps          | Progress                                 | P2             | Product upload/import examples pending                                     |
| FileUpload                      | PDF to Print and Upload workflows exist in product shell                                      | Missing                     | File uploaders                               | Input + custom patterns                  | P1             | Needs Maxa-specific upload pattern                                         |
| CommandMenu                     | Useful for power search/actions, but not visible in current inventory                         | Missing                     | Command menus                                | Command                                  | P2             | Do not build before visible menu/dialog needs                              |
| Accordion / Disclosure          | No confirmed high-frequency MAXA production need in current inventory                         | Missing                     | FAQ/marketing, tree/details patterns         | Accordion, Collapsible                   | Deferred       | Do not build now                                                           |
| Card                            | Product has cards, but generic Card risks wrong abstraction                                   | Missing generic component   | Card headers, app examples                   | Card                                     | Deferred       | Prefer `DesignCard`, `ServiceCard`, `PublicationCard`, etc. patterns       |
| Carousel                        | Not visible as core MAXA app need                                                             | Missing                     | Carousels                                    | Carousel                                 | Deferred       | Wait                                                                       |

## Priority Map

### Immediate Next Work

1. **DropdownMenu** — completed 2026-06-04
   - Why: directly maps to visible MAXA navigation/actions: Request, Support, User menu, Share menu, toolbar/card actions.
   - Scope: spec, component tokens, Radix-backed implementation, tests, docs page, Figma token files/import bundle, examples using MAXA nav/action menus.
   - Research: `.planning/dropdown-menu-architecture-research.md`.
   - Related components: `Avatar` can be scoped as a lightweight follow-up if the user menu trigger needs it.

2. **Product toolbar/menu pattern pass** — completed 2026-06-04
   - Why: MAXA dashboard/editor/package screens rely on search, sort, view toggles, Share, Request, Support, and account menus.
   - Scope: documented `Toolbar Menus` across global header, dashboard toolbar, AMP package toolbar, and editor top bar in `specs/patterns/toolbar-menus.md` and `/docs/patterns/toolbar-menus`.

3. **Select v2 / Custom listbox** — completed 2026-06-05
   - Why: the previous `Select` field used a native browser popup, so it could not show MAXA item variants, selected states, dark hover states, or Figma-compatible menu rows.
   - Scope: `Select` remains distinct from `DropdownMenu`, now using a custom combobox/listbox model with a hidden native select for form compatibility.

4. **Dialog / AlertDialog / ContextMenu** — completed 2026-06-05
   - Why: modal decisions, destructive confirmations, and contextual action surfaces are benchmark-standard and match MAXA product patterns.
   - Scope: overlay primitives shipped with docs, specs, tests, and tokenized modal/action surfaces.

5. **SocialButton / UtilityButton** — completed 2026-06-05
   - Why: closes Untitled UI parity gaps and supports auth/tooling surfaces.
   - Scope: provider sign-in button upgraded to icon-based variants; utility action primitive shipped.

### Next App-Layer Tranche

Recommended stabilization order after the shipped component pack:

1. Planning truth sync and naming architecture cleanup
2. Visual QA for shipped components across light, dark, and page-background contexts
3. Figma token JSON parity and importer handoff polish
4. PageHeader + FilterBar / Toolbar patterns
5. Sidebar / Navigation pattern
6. Sheet / Slideout
7. FileUpload
8. Product table/list examples using DataTable
9. Package publishing readiness / external consumer smoke test

### Explicitly Deferred

- Accordion / Disclosure
- Generic Card
- Carousel
- CommandMenu, until there is a visible command-palette or power-action workflow

## Working Rules

- Do not implement a benchmark component only because Untitled UI or shadcn has it.
- Do not implement `Accordion/Disclosure` until a real MAXA workflow needs expandable content.
- Do not use `Select` for action menus.
- Do not leave `Select` as a native browser popup for v1 if it is used as a visual reference component.
- Do not create a generic `Card` before product-specific card patterns are mapped.
- Every new component starts with `specs/components/<name>.md`.
- Every product pattern starts from the MAXA product inventory and screenshots.
