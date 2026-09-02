# Client Navigation Page Archetypes — Design Specification

**Date:** 2026-09-02
**Status:** Approved in visual brainstorming; awaiting written-spec review
**Prototype:** `Client Side Updates and Improvements/prototypes/header-settings-explorations`

## 1. Purpose

Replace the prototype's generic navigation fallback with a systematic page model. Every selectable navigation destination must open a product-appropriate skeleton surface while preserving one shared header, toolbar, tab hierarchy, token system, and interaction contract.

The work also restores the page title and right-side actions to top alignment. Page titles must not move vertically when actions are present or absent.

## 2. Source of Truth

Use these sources in order:

1. `~/.claude/knowledge/maxa/ui-inventory.md`
2. `~/Projects/maxa-ui` component specifications, component source, and tokens
3. Production screenshots supplied by Igor and the global Maxa screenshot library
4. The current prototype and its audit verification scripts

The implementation must not invent a new Maxa primitive when an existing design-system component or established product pattern covers the need.

## 3. Goals

- Give each navigation destination the correct product surface instead of reusing one generic design-card grid.
- Keep one universal page-header anatomy across all collection and library pages.
- Keep the title at a stable top position whether actions exist or not.
- Keep the primary action as the last action at the far right.
- Place search on the next row, with filter, sort, and view controls at its right.
- Use both approved navigation-tab treatments where their hierarchy requires them.
- Keep status filtering semantically and visually distinct from navigation tabs.
- Reuse centralized result archetypes and data-driven page configurations.
- Use static image-free preview blocks in `#E7EBF2` throughout the prototype.
- Support populated, empty, and true loading states for every result archetype.
- Preserve the recursive single-column navigation tree and its current interaction behavior.

## 4. Non-goals

- Recreating production screenshots pixel for pixel.
- Adding real customer images or random stock imagery.
- Creating a bespoke renderer for every leaf in the large Templates tree.
- Redesigning the global application header, settings forms, or navigation-tree behavior.
- Adding a permanent shimmer to populated prototype cards. Shimmer belongs only to a true loading state.
- Treating status filters as navigation tabs.

## 5. System Model

The page system has four layers.

### 5.1 Design-system primitives

Use the existing Maxa UI contracts for:

- Button and IconButton
- Input
- Select
- Tabs
- Segmented Control
- Badge and Tag
- Skeleton
- Empty
- Table and DataTable
- Pagination
- Dropdown Menu
- Tooltip

### 5.2 Shared product patterns

The prototype composes those primitives into a small set of shared patterns:

- `PageHeader`
- `ActionToolbar`
- `PrimaryTabs`
- `SecondaryTabs`
- `StatusFilter`
- `ViewSwitch`
- `ResultSummary`
- reusable result-card shells

`SecondaryTabs` is an underlined product pattern visible in production captures. It is not currently a released standalone component in `maxa-ui`, so the prototype must implement it once with Maxa tokens and record the library gap. It must not be reimplemented separately on individual pages.

### 5.3 Result archetypes

Each page selects one result archetype:

- dashboard sections
- design collection
- compliance requests
- scheduled calendar
- manual listing collection
- AMP hub sections
- package collection
- custom package collection
- market-stat form and neighborhood collection
- template masonry
- product collection
- service collection
- tutorial collection
- workspace collection
- table or form surface

### 5.4 Navigation page configurations

Navigation destinations configure the shared patterns and select one result archetype. They do not clone markup from another page.

A page definition conceptually contains:

```js
{
  id,
  title,
  titleIcon,
  breadcrumbs,
  actions: { secondary, primary },
  toolbar: { search, filter, sort, views },
  navigation: { primaryTabs, secondaryTabs },
  filters: { statusSegments },
  results: { archetype, fixture, count },
  states: { populated, empty, loading }
}
```

The renderer owns markup and geometry. The page definition owns labels, available controls, selected state, and fixture data.

## 6. Universal Page Anatomy

Rows appear in this fixed order. Optional rows collapse without leaving empty space.

1. Breadcrumb or back context, only when it adds useful hierarchy.
2. Title row.
3. Search and view-control toolbar.
4. Primary navigation tabs, when present.
5. Secondary navigation tabs, when present.
6. Status or mode filters, when present.
7. Result count or contextual summary, when present.
8. Results.

### 6.1 Title row

- Use top alignment (`align-items: flex-start`), not vertical centering.
- The title starts at the same vertical coordinate on pages with and without actions.
- Actions use `margin-left: auto`.
- Secondary actions precede the primary action.
- The primary action is always the last control at the far right.
- Removing an action must not change the title's vertical position.
- Remove the current Variant B action-specific negative margin that compresses only headers containing actions.
- Dashboard uses this same PageHeader. Its personal greeting appears as title metadata; it does not keep a second centered welcome header or a second search field in the page body.

### 6.2 Toolbar row

- Search grows to fill available width.
- Controls remain grouped at the right in this order: Filter, Sort, View.
- The toolbar is always below the title row.
- Page-specific actions such as Create Folder, Create Package, or Content Calendar do not move into the toolbar merely because production placed them there historically.
- Search keeps the released white input surface and border treatment.

### 6.3 Result spacing

- Keep the approved compact result rhythm across populated pages.
- Preserve 24 px before the result count and 12 px between the count and the first result row.
- Do not render an applied-filter chip beside the count unless the product explicitly requires a persistent removable filter. Existing invented category chips remain removed.

## 7. Tab and Filter Taxonomy

### 7.1 Primary Tabs

Use the released filled, joined `Tabs` treatment for sibling library or package destinations, for example:

- Company Package Library / Generated Packages
- My Testimonials / Package Library / Generated Packages
- Custom Library / Custom Default Packages / Generated Packages
- Archive Company / Custom / Market Stats

### 7.2 Secondary Tabs

Use the underlined `SecondaryTabs` product pattern for a second level within the current primary tab, for example:

- Listings / Testimonials / Market Stats / Hybrid within Custom Library

Secondary Tabs are visually lighter and include a shared bottom rule. They never replace the primary filled tabs.

### 7.3 StatusFilter

Use `SegmentedControl` for mutually exclusive filters and modes that change the current result set without changing destination, for example:

- Compliance: All My Requests / Pending / Approved / Denied
- Scheduled: Week / Month / Schedule, where applicable

StatusFilter is not described or styled as a third tab type.

## 8. Page-to-Archetype Matrix

### 8.1 Dashboard group

| Destination | Header controls | Navigation/filter | Result archetype |
|---|---|---|---|
| Dashboard | Shared search row; no primary action | None | Dashboard sections with setup notice, shortcuts, recent designs, packages, templates, features, and activity |
| My Designs | PDF to Print, Batch Actions, Create Folder | None | Mixed folder and design collection |
| Compliance | No primary action | StatusFilter | Compliance request cards |
| Scheduled | Content Calendar as the far-right primary action | Week / Month / Schedule mode control | Calendar with scheduled-post cards |

### 8.2 Main destinations

| Destination | Header controls | Navigation/filter | Result archetype |
|---|---|---|---|
| Manual Listings | Search, Sort, and View; no primary action | None | Property listing cards |
| Automated Packages / AMP Hub | Create Custom Package | None | Notice plus named hub sections and package cards |

### 8.3 Automated Packages children

| Destination | Navigation/filter | Result archetype |
|---|---|---|
| AMP Hub | None | Hub sections |
| My Listings | None | Listing-package cards; the empty state uses the same collection bounds |
| Company | Primary Tabs | Company package cards with approval/status metadata |
| Testimonials | Primary Tabs | Testimonial package cards with collage-like static placeholder anatomy |
| Custom | Primary Tabs + Secondary Tabs | Custom package cards; the empty state uses the same collection bounds |
| Market Stats | None | Location form followed by neighborhood cards |
| Shared with Me | None | Shared package cards with owner metadata |
| Archive | Primary Tabs | Archived package cards and archive metadata |

### 8.4 Templates

| Destination | Result archetype |
|---|---|
| Templates landing and Most Popular Templates | Template masonry |
| Favorites | Template masonry with favorite state |
| Print Templates branches and leaves | Template masonry with print-oriented aspect ratios |
| Digital Templates branches and leaves | Template masonry with digital-oriented aspect ratios |
| AMP Designs branches and leaves | Template masonry with package metadata |
| Admin template branches and leaves | Template masonry with administrative metadata only where documented |
| Swag Shop and its leaves | Product cards |
| Concierge Shop | Service cards |

All leaf template categories share the same renderer but provide their own title, result count, representative names, category metadata, and card proportions.

### 8.5 Utility destinations

| Destination | Result archetype |
|---|---|
| Workspaces | Workspace cards with membership or lock metadata where applicable |
| Explore Tags and tag leaves | Template results driven by the selected navigation tag; no duplicated invented filter chip in the page header |
| Tutorials | Video/tutorial cards |
| Support | Support-topic panels for the documented Get Help, Contact Print Support, and Help Center actions |
| Account Settings | Existing settings surface; no generic collection fallback |

## 9. Skeleton and Placeholder Rules

The prototype uses two distinct concepts:

1. **Static image-free preview:** populated representative content with image areas replaced by `--pattern-card-placeholder-bg: #E7EBF2`. This is the default for this review prototype.
2. **Loading skeleton:** the design-system Skeleton component and shimmer behavior, used only in a dedicated loading state.

Static placeholders must:

- use the shared token rather than page-local hex values;
- preserve the source content's expected aspect ratio and card anatomy;
- keep real representative labels and metadata when those are documented;
- avoid random imagery and unverified customer data;
- use internal blocks only when the real card is a collage, multi-design package, folder, or calendar event.

## 10. Interaction Contract

- Selecting any navigation leaf updates the page configuration and result archetype.
- Parent disclosure behavior remains inline in the single scrollable navigation tree.
- Primary Tabs change the sibling library or package destination represented inside the current page.
- Secondary Tabs change the nested content category.
- StatusFilter changes only the current result subset.
- ViewSwitch changes presentation without changing the underlying fixture.
- Search filters the active page fixture.
- Missing or empty data produces the page's bounded Empty state, never a borrowed page from another product family.
- True loading uses the loading state for that same archetype, preserving layout dimensions.

## 11. Accessibility

- Primary and Secondary Tabs use tab semantics only when content is switched in place; route navigation uses links with `aria-current`.
- StatusFilter uses buttons with `aria-pressed` through Segmented Control.
- Search fields have accessible names.
- View controls expose readable labels and pressed state.
- Static preview blocks are decorative and hidden from assistive technology.
- Loading regions expose an appropriate parent loading status while individual Skeleton elements remain decorative.
- Empty states include a heading and concise recovery guidance when an action is available.

## 12. Verification

Extend the prototype verifier to cover every selectable navigation destination and every shared state that the prototype exposes.

Automated checks must verify:

- every leaf resolves to a defined page configuration;
- no destination falls back to the generic Dashboard, Templates, or Custom Packages page solely because of ancestry;
- each destination renders the expected result archetype;
- title rows use top alignment;
- pages with actions keep the same title coordinate as comparable pages without actions;
- the primary action is the rightmost title-row action;
- the toolbar follows the title row;
- toolbar control order is Filter, Sort, View;
- Primary Tabs, Secondary Tabs, and StatusFilter use distinct markup and semantics;
- all static card preview surfaces resolve to `#E7EBF2` through the shared token;
- populated, empty, and loading states do not overflow their content column;
- the prior invented applied-filter chip does not return;
- recursive navigation, rail scrolling, and lower-menu horizontal insets remain unchanged.

Visual checks must include representative screenshots for:

- Dashboard
- My Designs with actions
- Compliance with StatusFilter
- Scheduled calendar
- AMP Hub
- Company with Primary Tabs
- Custom with both tab levels
- Archive
- Most Popular Templates
- one deeply nested Templates leaf
- Swag Shop
- Workspaces

Run the existing full-frame verifier, unit tests, and targeted browser inspection after implementation. Sync the verified prototype to its canonical CloudDocs location and rerun the verifier against the canonical copy before delivery.

## 13. Acceptance Criteria

The design is complete when:

1. The title no longer jumps between pages with and without actions.
2. Every navigation destination displays a product-appropriate page surface.
3. Template leaves share a systemized renderer while still reading as their selected category.
4. The universal title, action, toolbar, tabs, filter, count, and results order is consistent.
5. Both navigation-tab treatments and Segmented Control are used according to their documented roles.
6. All image-free card surfaces use the shared `#E7EBF2` token.
7. Populated, empty, and loading states remain structurally faithful to the selected archetype.
8. Automated and visual verification pass against the canonical prototype.
