# Project Audit: Maxa UI Codex

Date: 2026-06-05
Scope: `packages/ui`, `packages/tokens`, `apps/docs`, `specs`, `.planning`

## Executive Summary

The project is structurally healthy: the UI package, token package, and docs currently pass the main validation suite. The component layer has expanded to 34 component folders and the docs app has 34 component pages. The token audit is green, and the latest Select v2, Multi Select visual pass, Dialog, and Alert Dialog work is integrated.

The main risk is not failing code. The risk is drift: planning files, coverage matrices, Figma token handoff, and a few naming boundaries no longer match what is actually implemented. If this is not corrected before the next layer, we will lose track of what is real, what is provisional, and what is still missing for v1.

## Verification Status

| Check | Status | Notes |
| --- | --- | --- |
| `pnpm test` | Passed | `@maxa/ui`: 35 test files, 334 tests passed. Existing jsdom canvas warnings are non-blocking. |
| `pnpm lint` | Passed | No blocking lint failures. |
| `pnpm typecheck` | Passed | Workspace typecheck passed. |
| `pnpm build` | Passed | Docs build completed. |
| `pnpm audit:tokens` | Passed | No token audit violations. |

Build warnings to keep on the cleanup list:

- Next.js reports that the Next plugin is not detected in the ESLint config.
- Turbo reports no output files found for `@maxa/docs#build`; `turbo.json` outputs should be checked.
- jsdom logs repeated `HTMLCanvasElement.getContext()` warnings during tests; these are noisy but not failing.

## Current Component Inventory

### Core And Form

- `Button`
- `IconButton`
- `Input`
- `FormField`
- `Checkbox`
- `Radio`
- `Toggle`
- `Select`
- `MultiSelect`
- `Calendar`
- `DatePicker`
- `Slider`

### Overlays And Menus

- `DropdownMenu`
- `ContextMenu`
- `Popover`
- `Tooltip`
- `Dialog`
- `AlertDialog`

### Feedback And Loading

- `Alert`
- `Empty`
- `Skeleton`
- `Spinner`
- `Progress`

### Navigation And Structure

- `Breadcrumb`
- `Pagination`
- `Tabs`
- `SegmentedControl`
- `Divider`
- `Separator`

### Identity And Utility

- `Avatar`
- `Badge`
- `Tag`
- `SocialButton`
- `UtilityButton`

## Structural Coverage

Current package scan:

- UI component folders: 34
- Docs component pages: 34
- Sidebar-listed component pages: 32
- Component CSS token families in `packages/tokens/src`: 32
- Component token families in `packages/tokens/figma`: 14

### True Gaps

| Gap | Severity | Why It Matters | Recommendation |
| --- | --- | --- | --- |
| `Divider` and `Separator` overlap | P0 | Two public concepts cover almost the same primitive, and both have token CSS families. This creates naming and migration confusion. | Choose one canonical primitive. Preferred: keep `Divider` if it matches current product language, or adopt `Separator` if we want shadcn/Radix naming. Then alias/deprecate the other deliberately. |
| `Separator` is not exported from `@maxa/ui` | P1 | There is a component folder, docs page, spec, test, and token file, but no package export. | Either export it or remove it from public docs until the Divider/Separator decision is made. |
| `component-separator.css` is not imported by `theme.css` | P1 | Token file exists but is not part of the composed theme. | Import only if `Separator` remains public. Otherwise remove or merge into Divider tokens. |
| `Divider` has no spec and no test | P1 | It is public and documented but less governed than newer primitives. | Add spec/test or fold into Separator. |
| Docs sidebar does not list `FormField` and `Separator` | P2 | Pages exist but are hidden from navigation. | Decide whether they are public docs pages. If yes, add to sidebar; if no, remove pages or mark internal. |
| Figma token JSON is behind CSS tokens | P1 | Design handoff cannot stay aligned if new component tokens only exist in CSS. | Generate/sync Figma token JSON for all current component token families. |
| Planning state is stale | P0 | Roadmap/STATE/coverage matrix mark shipped work as missing. This will cause duplicate work and wrong prioritization. | Update `.planning/STATE.md`, `.planning/REQUIREMENTS.md`, coverage matrix, and naming matrix after this audit. |

### Intentional Shared-Token Exceptions

These are not bugs:

- `AlertDialog` uses Dialog token families.
- `FormField` uses Input/form field token families rather than a separate component family.
- `IconButton` wraps Button and should keep using Button token semantics unless it diverges visually.

## Token Audit

The CSS token system is in good shape and `pnpm audit:tokens` passes. The current issue is export parity, not token validity.

CSS component token families currently missing from `packages/tokens/figma`:

- `breadcrumb`
- `calendar`
- `context-menu`
- `date-picker`
- `dialog`
- `empty`
- `multi-select`
- `nav`
- `pagination`
- `progress`
- `segmented-control`
- `select`
- `separator`
- `skeleton`
- `slider`
- `social-button`
- `spinner`
- `tabs`
- `utility-button`

Extra Figma token family without matching CSS component family:

- `utility`

Recommendation: treat Figma token export parity as a release requirement before v1. The design system cannot be considered complete if Figma and code disagree about component token families.

## Docs And Catalog Audit

The docs app builds and currently exposes the expanded component catalog. The main doc-layer risks are quality and truthfulness:

- Several planning and spec documents still describe Select as a native browser select, even though Select v2 is now a custom listbox.
- The coverage matrix still marks multiple shipped components as missing.
- API tables and code blocks can visually clip or overflow in some pages.
- `New` badge policy needs another cleanup pass: only the latest components from the most recent tranche should remain marked new.
- Some preview pages still need light/dark visual QA after the big component pack.

## Planning Drift

Files that need synchronization:

- `.planning/STATE.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/component-coverage-matrix.md`
- `.planning/component-naming-architecture-matrix.md`
- `specs/components/dropdown-menu.md`
- `specs/tokens-reference.md`
- `specs/foundations/color.md`

Known stale examples:

- Select v2 is still described as upcoming in several planning files.
- Multi Select is implemented and visually corrected, but future architecture notes are not captured.
- Dialog and Alert Dialog are more mature than the roadmap implies.
- Coverage matrix still lists shipped components as missing.
- Deprecated alias `--color-bg-elevated` appears in specs and semantic token references.

## Architecture Assessment

### Strong Areas

- Component implementation follows a consistent package shape.
- Tests are broad for the UI package.
- Token validation is enforced and currently green.
- Select v2 now uses a custom trigger/listbox structure rather than native browser UI.
- Dialog and Alert Dialog now better match product modal references.
- Multi Select visual issues around chevrons, chip remove icons, and error typography were corrected.

### Risk Areas

- Menu/select/listbox boundaries still need explicit architecture notes:
  - `DropdownMenu`: command/action menu.
  - `ContextMenu`: right-click or contextual action surface.
  - `Select`: single-value form listbox.
  - `MultiSelect`: multi-value form listbox/chip field.
- `MultiSelect` still uses DropdownMenu internally. It is visually improved, but long-term it should become a form/listbox sibling of Select rather than an action-menu composition.
- Product pattern components are not yet clearly separated from primitives.
- Figma Code Connect and component mapping are not started.

## Final Target

The v1 finish line should be:

1. A stable primitive/component library with complete docs, tests, specs, and token coverage.
2. A token system that is synchronized across CSS and Figma export artifacts.
3. A product-grounded pattern layer based on actual Maxa surfaces, not generic UI kit examples.
4. A clean naming architecture that avoids duplicate concepts.
5. A release-ready package with public exports, migration notes, changelog, and examples.

## Remaining Work By Priority

### P0: Before Adding More Components

- Sync planning truth with implemented reality.
- Decide and resolve `Divider` vs `Separator`.
- Update coverage and naming matrices.
- Capture Select, Multi Select, DropdownMenu, and ContextMenu boundaries as durable architecture rules.

### P1: Before v1 Release

- Generate missing Figma token JSON for all current CSS component token families.
- Run visual QA for the big component pack across light, dark, and page-background contexts.
- Fix docs overflow/clipping in API tables and long code blocks.
- Add/confirm specs and tests for any public component without governance.
- Remove stale `New` badges according to the agreed policy.
- Update deprecated token references such as `--color-bg-elevated`.

### P1: Product Pattern Layer

These should be grounded in the Maxa product inventory:

- `PageHeader`
- `Toolbar` / `FilterBar`
- `Sidebar` / navigation shell patterns
- `TemplateCard` / design card
- `FileUpload` / upload surface
- `OrderSummary` / cart-like summary pattern

### P2: Next Component Layer

- `Sheet` / slideout panel
- `Toast` / notification surface
- `Table` / data table
- Calendar and DatePicker v2 modes: range polish, month/year/quarter where supported by product need.
- Multi Select architecture v2 with form semantics and listbox behavior.

### Deferred

- `Accordion` / `Disclosure`, until product evidence appears.
- Generic `Card`, unless it is derived from real Maxa product cards.
- `Carousel`, unless product evidence appears.
- Tailwind v4 adapter, after v1 component/token contracts stabilize.

## Recommended Next Sequence

1. Planning hygiene pass: update STATE, REQUIREMENTS, roadmap, coverage matrix, and naming matrix.
2. Resolve Divider/Separator and public exports.
3. Visual QA sweep for fresh components and docs layout overflow.
4. Figma token JSON parity pass.
5. Product pattern tranche: PageHeader, Toolbar/FilterBar, Sidebar, TemplateCard, FileUpload.
6. Next component tranche: Sheet, Toast, Table.
7. Code Connect mappings and release prep.

## Open Questions

- Should the public primitive be named `Divider` because that matches the current Maxa docs/product language, or `Separator` because it matches Radix/shadcn naming?
- Should `FormField` be a public docs component or an internal composition helper?
- Should `MultiSelect` be refactored immediately into a Select-like listbox primitive, or after the current visual QA pass?
- Which components should keep `New` after the next cleanup pass?

