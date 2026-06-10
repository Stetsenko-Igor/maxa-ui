# Core Gap Audit

Status: active planning reference
Last reviewed: 2026-06-10

This audit separates core design-system components from Maxa product patterns.

Core components belong in `@maxa/ui` when they are reusable primitives or low-level composed
controls with clear accessibility behavior, token ownership, docs, specs, and tests.

Product patterns belong outside the core package until they prove reusable across multiple product
surfaces. Examples: dashboard toolbars, app shell, top navigation, sidebar category trees, template
cards, workspace switchers, and cart/request/user menus.

## Current Core Coverage

Implemented component entries in `@maxa/ui`:

- Feedback: `Alert`, `AlertDialog`, `Empty`, `Progress`, `Skeleton`, `Spinner`, `Toast`
- Actions: `Button`, `IconButton`, `SocialButton`, `UtilityButton`
- Form controls: `Checkbox`, `DatePicker`, `FormField`, `Input`, `MultiSelect`, `Radio`, `Select`, `Slider`, `TextArea`, `Toggle`
- Overlays and menus: `ContextMenu`, `Dialog`, `DropdownMenu`, `Popover`, `Tooltip`
- Navigation/data display: `Avatar`, `Badge`, `Breadcrumb`, `Calendar`, `DataTable`, `Divider`, `Pagination`, `SegmentedControl`, `Separator`, `Table`, `Tabs`, `Tag`

Known catalog mismatch:

- `TextArea` is implemented and exported from `@maxa/ui`, but it lives under `components/input`, is
  documented on the Input page, and does not have its own component directory/spec/doc route.
- Search and Figma discovery should treat TextArea as a separate component, not as an Input variant.

## Decisions

- Keep `Toggle` naming. Do not add a duplicate `Switch` component.
- Keep product navigation and shell patterns out of core for now.
- Keep `TextArea` as a separate searchable component entry, even if it reuses input wrapper logic.
- Add `FileInput` as a low-level picker/dropzone primitive, not as a product-specific upload flow.
- Treat mobile table behavior as a core data-display concern, but do not solve it with product card
  patterns inside `Table` or `DataTable`.
- Verify Drawer/Sheet source before planning implementation. The need is real, but this repo does
  not currently expose a `Drawer` or `Sheet` component from `@maxa/ui`.

## Priority Gaps

### P0 — TextArea Catalog Split

Current state:

- `TextArea` exists in `packages/ui/src/components/input/input.tsx`.
- It is exported through `packages/ui/src/components/input/index.ts`.
- Docs live under `apps/docs/app/docs/components/input/page.tsx`.
- Spec mentions TextArea under `specs/components/input.md`.

Problem:

- Designers and developers should be able to find TextArea as its own component.
- Figma will likely keep Text Field and Text Area as separate components, not variants of one Input.

Recommended work:

- Add `specs/components/textarea.md`.
- Add `apps/docs/app/docs/components/textarea/page.tsx`.
- Add `packages/ui/src/components/textarea/` as a separate entrypoint.
- Re-export the existing implementation first, then split internals only if needed.
- Keep shared styling/tokens where appropriate; discoverability is the immediate gap.

Non-goal:

- Do not add textarea as `Input.kind="textarea"`.

### P0 — FileInput Primitive

Current state:

- No low-level file input/dropzone component exists in `@maxa/ui`.
- Product inventory includes file/photo/logo/PDF upload surfaces, but those are product flows.

Problem:

- Product-specific upload flows need a reusable accessible primitive underneath them.
- File picking has real accessibility and browser behavior details that should not be reimplemented
  per product surface.

Recommended scope:

- Component: `FileInput`
- Modes: click-to-pick and optional drag/drop zone
- States: default, hover, focus, disabled, error, loading/processing
- Content slots: icon, label, description, accepted formats/help text, selected file list
- Props: `accept`, `multiple`, `disabled`, `error`, `maxFiles`, `maxSize`, `onFilesChange`
- Accessibility: native `input[type="file"]`, keyboard activation, visible label, error text,
  `aria-describedby`, drag/drop not required for keyboard access

Non-goals:

- No direct upload/network behavior.
- No image cropper.
- No product-specific copy like "Personal Logo" or "PDF to Print".
- No assumptions about storage, progress APIs, or validation backend.

### P1 — Drawer / Sheet Verification

Current state:

- No `Drawer` or `Sheet` component directory/export is present in this repo.
- Overlay foundations already mention drawers as an elevation/z-index use case.

Problem:

- Drawer is a core overlay primitive when side panels, mobile panels, or slide-in workflows are
  needed.
- It should not be confused with product app shell/sidebar navigation.

Recommended work:

- First verify whether Drawer exists in another Maxa codebase or Figma library.
- If absent from `@maxa/ui`, define `Drawer` or `Sheet` as an overlay primitive.
- Build on Radix Dialog patterns if possible: focus trap, escape close, overlay, portal, controlled
  and uncontrolled open state.
- Support side placement: `left`, `right`, `bottom` at minimum.

Non-goal:

- Do not build `AppShell`, mobile navigation, or product sidebar as part of Drawer.

### P1 — Responsive Table / DataTable Behavior

Current state:

- `Table` and `DataTable` exist and are documented.
- `--table-min-width: 720px` creates horizontal overflow behavior.
- No explicit mobile behavior policy is documented for `DataTable`.

Problem:

- Mobile handling for tabular data must be deliberate: horizontal scroll, column priority, stacked
  row summaries, or product-specific card alternatives.

Recommended work:

- Document the default mobile policy for `Table` and `DataTable`.
- Keep native table semantics for true tabular data.
- Add examples/tests for horizontal overflow and narrow containers.
- Consider optional column visibility/priority later, but only after real product cases are known.

Non-goal:

- Do not automatically transform all tables into cards inside `DataTable`.
- Do not add dashboard/template card patterns to core data table APIs.

## Watchlist

These may become core later, but should not be prioritized until there is stronger usage evidence:

| Candidate | Current position |
| --- | --- |
| `Combobox` | Consider when `Select` and `MultiSelect` are insufficient for searchable/entity/async selection. |
| `Command` | Defer until there is a real command palette or universal action/search surface. |
| `Accordion` / `Collapsible` | Reasonable core primitive, but lower priority than TextArea/FileInput/Drawer/mobile table policy. |
| `ButtonGroup` / `MenuButton` | Likely composition of existing `Button`, `IconButton`, `DropdownMenu`, and `SegmentedControl`; defer. |

## Explicitly Out of Scope For Core Right Now

- Dashboard toolbar
- Design/template card
- Sidebar category tree
- Top nav / app shell
- Workspace admin overlay
- Product cart/request/user menus
- Product upload flows

These can be documented later as Maxa product patterns once the core layer is stable.
