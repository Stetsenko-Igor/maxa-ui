# 04-01 — Product Pattern Inventory and Priority Map

**Phase:** 4 (MAXA product patterns) · **Status:** Complete · **Date:** 2026-07-14

## Method and sources

Grounded in the captured production surface, not a generic UI-kit checklist:

- `~/.claude/knowledge/maxa/ui-inventory.md` (2026-06-04 capture of storage.maxadesigns.com — routes, shell, screens, UI patterns)
- 42 screenshots in `AI/_Global/screenshots/` (referenced per pattern below)
- `.planning/component-coverage-matrix.md` ("Missing as reusable pattern" rows)
- `.planning/legacy-fsd-component-migration-matrix.md` (product-repo component names that map to these patterns)

> **Priority disclaimer:** P0/P1/P2 ranks are an **inference from screen presence and
> cross-surface reuse in the captured inventory** — no product usage analytics exist.
> When Ilya's `shared/ui` inventory + usage audit arrives, re-check the ranking.

## Decision: what a "pattern" ships as

**Documentation-first compositions.** Each approved pattern ships as:

1. A spec in `specs/patterns/<name>.md` (anatomy, composition rules, product evidence with screenshot refs, responsive behavior, do/don't)
2. A docs page in `apps/docs/app/docs/patterns/<name>/` with a working composition example built ONLY from shipped `@maxa/ui` components and tokens
3. **No new exported React components in this phase.** Promotion to an exported helper in `@maxa/ui` happens only when a pattern proves stable across 2+ real product adoptions (mirrors the legacy-matrix guidance: "Build app patterns; do not make generic before product audit").

Rationale: the product repo already has bespoke implementations (`Sidebar.tsx`, `Filter*`, `ImageUploader`...). Docs-first lets agents and devs compose correctly today without freezing a premature public API.

## Inventory and priority map

| # | Pattern | Product evidence (screenshots) | Composes (shipped components) | Priority | Rationale (inference) |
|---|---------|-------------------------------|-------------------------------|----------|----------------------|
| 1 | **DashboardToolbar** (search / actions / sort / view toggle) | `01-dashboard.png`, `30-scheduled.png`, `40-amp-package-detail.png`, `31-templates-popular.png` | Input (search), Button, UtilityButton, Select (Sort by), SegmentedControl or IconButton pair (grid/list), Tag (filter), DropdownMenu (Share) | **P0** | Appears on every list surface captured: dashboard, scheduled, AMP detail, templates. Highest cross-surface reuse. |
| 2 | **TemplateCardGrid / DesignCard** | `01-dashboard.png`, `28-design-card-hover.png`, `10-templates-grid.png`, `40-amp-package-detail.png` | Badge ("New"), Tag ("Auto-Created"), IconButton (heart on hover), Skeleton (loading) | **P0** | Core content object of the product; card anatomy (thumbnail + title + subtitle + badges + hover actions) repeats on 4+ surfaces. Blocks generic-Card temptation. |
| 3 | **SidebarNavigation** | Global shell sidebar (`01-dashboard.png`), AMP context sidebar (`20-marketing-packages-amp.png`, `61-marketing-packages-list.png`) | Input (quick search), Badge (count), Divider, Tooltip (info icons) | **P0** | Persistent shell element with documented active/folder/sub-item states (blue-tint active bg, count badges, expand arrows). Two variants: dashboard + AMP context. |
| 4 | **EmptyState usage** | `22-print-cart.png`, `23-swag-cart.png`, `30-scheduled.png` | Empty (shipped 2026-06) | **P0 (quick win)** | Component already exists — the pattern work is mapping the product's two captured variants (icon + message, e.g. "Your cart is empty", "Scheduled Post Not Found") into spec'd examples. Small effort. |
| 5 | **PageHeader** (heading + back nav + meta) | `22-print-cart.png` ("< Dashboard" + h1), `40-amp-package-detail.png` (back + label + created date), `36-email-campaigns.png` (title + subtitle + link) | Button (ghost back), Breadcrumb (where hierarchy explicit) | **P1** | Repeats across sub-pages but is structurally simple; product mostly uses Back buttons, not breadcrumbs. Fold into tranche 2. |
| 6 | **TopNavMenus** (Request / Support / User menu) | `24-request-dropdown.png`, `25-support-dropdown.png`, `26-user-menu-dropdown.png`, `51-user-menu-open.png` | DropdownMenu, Avatar, Toggle (Dark Mode item) | **P1** | Thin composition over shipped DropdownMenu — pattern value is documenting exact product menu contents/order, incl. the user-trigger (avatar + name + chevron) composition noted as needing polish in the coverage matrix. |
| 7 | **TemplateMasonryGrid** | `31-templates-popular.png`, `02-templates.png` | Same card anatomy as #2 + masonry layout | **P1** | Variant of #2 with mixed-aspect layout; do after TemplateCardGrid so the card spec is shared, not duplicated. |
| 8 | **AMPPackageDetail** | `40-amp-package-detail.png` | Composition of #1 + #2 + #5 (+ Tooltip on package-type info icons) | **P1** | Mostly assembled from patterns 1/2/5 — spec it as a page-level composition example, not a new pattern primitive. |
| 9 | **UploadFlow** (PDF-to-print / image upload) | `62-pdf-to-print.png` | FileInput, Progress, Dialog, Button | **P1 (blocked)** | Legacy matrix ranks product upload pattern P1 (`ImageUploader`, `MultiFileUploader`, `ImagePreviewModal`), but the captured screenshot is thin — needs the product-repo usage audit / Ilya input before speccing. |
| 10 | **EditorChrome** (top bar + tool rail) | `50-design-editor.png` | IconButton, Button, Tooltip, Avatar, Divider, Toast | **P2** | High value but single-surface (Designer 3.0 editor) and deepest unknowns (right panel not captured, beta banner semantics). Do after list surfaces; may warrant its own phase slice. |

Deferred (unchanged from coverage matrix): CommandMenu, Accordion/Disclosure, generic Card, Carousel — no captured product need.

## First implementation tranche (04-02) — confirmed

ROADMAP's recommendation stands, with one addition:

1. **DashboardToolbar** — spec `specs/patterns/dashboard-toolbar.md` + docs page
2. **TemplateCardGrid** — spec `specs/patterns/template-card-grid.md` + docs page (card anatomy is the core deliverable; masonry variant deferred to tranche 2)
3. **SidebarNavigation** — spec `specs/patterns/sidebar-navigation.md` + docs page (dashboard + AMP variants)
4. **EmptyState usage** — added as a quick win: extend `specs/components/empty.md` (or a small pattern spec) with the two captured product variants

Each pattern spec must include: product evidence (screenshot refs), component composition table, token usage, responsive behavior, and explicit do/don't (e.g. "one primary action per toolbar" per `interactive-hierarchy`).

Tranche 2 candidates (order by this map): PageHeader → TopNavMenus → TemplateMasonryGrid → AMPPackageDetail.

## Open inputs that can re-rank this map

- Ilya's `shared/ui` inventory + non-standard props list (`.planning/team-sync-2026-06-19/request-shared-ui.md`)
- Product-repo usage audit of the 87 legacy entries (`legacy-fsd-component-migration-matrix.md`)
- UploadFlow (#9) is explicitly blocked on the above.
