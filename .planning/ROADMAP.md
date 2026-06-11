# Roadmap: MAXA UI

## Overview

From a stable Component + Token Parity baseline (May 2026) to a full MAXA UI platform: an agent-readable design system with tokens, React components, Figma handoff, docs/catalog pages, and production-grounded MAXA product patterns.

The benchmark is not a small component package. The target is closer in ambition to Untitled UI and shadcn/ui, but filtered through MAXA's real product surface. MAXA UI should cover base components, overlay/action components, application UI patterns, and reusable MAXA product patterns such as dashboard cards, sidebars, editor toolbars, request/support menus, package detail screens, and template grids.

The near-term path is: finish the remaining v1 base/action gaps, extend into the application UI layer, close design↔code handoff via Figma Code Connect, stabilize a v1 API, and only then open the door for external consumers via a Tailwind adapter. Phase order is non-binding — `/gsd:insert-phase`, `/gsd:add-phase`, and `/gsd:remove-phase` (Codex: `$gsd-insert-phase`, etc.) let Igor reorder once execution starts.

## Milestones

- ✅ **v0.x — Component + Token Parity** (shipped 2026-05-18)
- 📋 **v1.0 Core Platform** — Phases 1-6 (planned)
- 📋 **v1.1 External Adoption** — Phase 7 (planned)

## Phases

<details>
<summary>✅ v0.x — Component + Token Parity (SHIPPED 2026-05-18)</summary>

Three reconstructed retro-phases from git history. These predate GSD adoption — phase numbers are nominal.

### Phase 0a: Token foundation (2026-04-21..23)
**Goal**: Three-tier token architecture with audit enforcement, dark-mode runtime, and Figma bundle.

Outcomes:
- [x] Primitives / semantic / component layers separated by file
- [x] `scripts/audit-tokens.mjs` exits non-zero on hardcoded values
- [x] `[data-theme="dark"]` runtime smoke test passes
- [x] Figma layout-token bundle methodology documented
- [x] TypeScript constants for radius / spacing / fontFamily

### Phase 0b: Eight core components (2026-04-24..2026-05-13)
**Goal**: Ship the eight foundational form / action components with full spec + token integration + docs.

Outcomes:
- [x] Button, IconButton, Input, Select, DatePicker, Checkbox, Radio, FormField shipped
- [x] Each has a spec in `specs/components/`
- [x] Each has a docs page in `apps/docs`
- [x] One-primary-button rule documented in `specs/patterns/interactive-hierarchy.md`
- [x] LLM-readable spec layer published

### Phase 0c: Token polish (2026-05-13..15)
**Goal**: Reconcile surface model, neutral palette, semantic spacing, and breakpoints across code + Figma.

Outcomes:
- [x] `bg/white → bg/surface → bg/elevated` rename complete across code + Figma JSON
- [x] Breakpoint tokens (`mobile`, `tablet`, `desktop`)
- [x] Semantic spacing layer synced with Figma
- [x] Layout max-width corrected for tablet (768) and mobile (375)
- [x] Audit pass: docs polish + neutral rename (commit `2f9d627`)

</details>

### 📋 v1.0 Core Platform (Phases 1-6, planned)

**Milestone Goal:** Lock a high-quality, accessibility-audited design-system platform with a complete enough surface for MAXA app work: base components, overlay/action components, application UI components, MAXA product patterns, docs/catalog, and Figma handoff.

#### Phase 1: Dark mode + accessibility audit
**Goal**: Every shipped component renders correctly in dark mode and passes WCAG AA contrast in both themes.
**Depends on**: Nothing (first new phase)
**Requirements**: QUAL-01, QUAL-02
**Success Criteria** (what must be TRUE):
  1. Every text-on-background pair in light theme measures ≥ 4.5:1 (large text / non-text ≥ 3:1)
  2. Every text-on-background pair in dark theme measures the same
  3. Any failing pairs adjusted in `packages/tokens/src/themes/maxa.css`
  4. Audit report committed under `.planning/phase-01-*/` with measured values
**Plans**: 2 plans complete

Plans:
- [x] 01-dark-mode-and-accessibility-audit-01-PLAN.md — Add automated contrast audit script and baseline measured report
- [x] 01-dark-mode-and-accessibility-audit-02-PLAN.md — Apply token fixes and publish final passing audit report

#### Phase 2: Base/action component tranche
**Goal**: Ship the next base/action components via the existing spec-first workflow.
**Depends on**: Phase 1 (audit complete so new components inherit verified tokens)
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06, COMP-07, COMP-08, COMP-09
**Success Criteria** (what must be TRUE):
  1. Each new component has a spec in `specs/components/`
  2. Each implemented in `packages/ui/src/components/` following `forwardRef + cva + Slot`
  3. Each exported from `@maxa/ui`
  4. Each has a docs page in `apps/docs`
  5. Component tokens are included in `packages/tokens/src/` and the Figma import bundle when visual decisions are component-specific
  6. `pnpm verify` mirrors CI and is green (`typecheck && lint && audit:tokens && test && build`)
  7. Changeset added for each public package affected
**Status**: ✅ Complete. Badge, Tag, Alert, Divider, Toggle, Tooltip, Popover, DropdownMenu, and Tabs are shipped. Accordion/Disclosure is deferred until real MAXA evidence appears. Closed out as part of the 2026-06-11 Phase 3 closeout.
**Plans**: complete

Plans:
- [x] 02-shipped: Badge, Tag, Alert, Divider, Toggle, Tooltip — shipped outside formal GSD plan files
- [x] 02-01: Popover
- [x] 02-02: DropdownMenu
- [x] 02-03: Tabs
- [x] 02-closeout: rolled into the 2026-06-11 Phase 3 closeout (planning-state cleanup + verification)

#### Phase 3: Application UI component layer
**Goal**: Add the reusable application components needed to build production-like MAXA screens without one-off local UI.
**Depends on**: Phase 2
**Requirements**: APP-01, APP-02, APP-03, APP-04, APP-05, APP-06, APP-07, APP-08
**Success Criteria** (what must be TRUE):
  1. Specs exist before implementation for each selected application component
  2. Components follow the existing `@maxa/ui` architecture and token hygiene
  3. Docs pages show realistic product-density examples, not generic marketing samples
  4. `pnpm verify` is green after every shipped tranche
  5. Selection is grounded in MAXA product inventory and benchmarked against Untitled UI / shadcn coverage
**Initial candidate scope**:
  - Avatar — shipped 2026-06-04
  - Select v2 / custom listbox — shipped 2026-06-05
  - Multi-select — shipped 2026-06-05; internal listbox architecture polish remains
  - Skeleton / loading indicators — shipped 2026-06-04
  - Spinner — shipped 2026-06-04
  - Progress — shipped 2026-06-04
  - Breadcrumbs — shipped 2026-06-04
  - Pagination — shipped 2026-06-04
  - Tabs — shipped 2026-06-04
  - Segment Control — shipped 2026-06-04
  - Slider — shipped 2026-06-04
  - Empty — shipped 2026-06-04
  - Table — shipped 2026-06-05
  - DataTable — shipped 2026-06-10
  - FileUpload (FileInput primitive) — shipped 2026-06-10
  - Dialog / Modal — shipped 2026-06-05
  - AlertDialog — shipped 2026-06-05
  - DropdownMenu — shipped 2026-06-04
  - ContextMenu — shipped 2026-06-05
  - Sheet / Slideout (Drawer) — shipped 2026-06-10
  - Toast / Notification — shipped 2026-06-08
  - TextArea (split entry sharing Input internals) — shipped 2026-06-10
  - Social Button — shipped 2026-06-05
  - Utility Button — shipped 2026-06-05
  - EmptyState, PageHeader, FilterBar, Sidebar / Navigation, CommandMenu — deferred to Phase 4 product patterns (composition of shipped primitives, not core components — see `specs/core-gap-audit.md`)
**Status**: ✅ Component layer complete. 40 components shipped with spec + implementation + docs + tests. Closed out 2026-06-11.
**Plans**: complete

Plans:
- [x] 03-01: Component coverage matrix vs MAXA product inventory, Untitled UI, and shadcn/ui — `.planning/component-coverage-matrix.md`
- [x] 03-02: Avatar
- [x] 03-03: Select v2 / custom listbox
- [x] 03-04: Multi-select
- [x] 03-05: Progress + Skeleton + Spinner
- [x] 03-06: Dialog + AlertDialog + ContextMenu
- [x] 03-07: Social Button + Utility Button
- [x] 03-08: Table primitive
- [x] 03-stabilization (bridge — `.claude/plans/adaptive-shimmying-pine.md`):
  - [x] Divider/Separator resolved (Divider canonical; Separator token-aliased compat alias; both have spec + tests)
  - [x] Planning truth sync to 35-component reality + deprecated `--color-bg-elevated` removed
  - [x] Figma token parity (34 component families synced; stub JSON filled; bundle rebuilt)
  - [x] Coverage measurement (vitest v8) + CI step — baseline 90.44/83.66/92.61/93.16 enforced via CI Coverage step
  - [x] Visual QA sweep (light/dark/page-background; open-state for menus/listboxes) — completed 2026-06-11, see `.planning/phases/03-application-ui-component-layer/visual-qa-sweep.md`
- [x] 03-closeout (`.claude/plans/goofy-doodling-gadget.md`): planning sync to 40 components, superseded spec archived, placeholders confirmed, dev artifact reverted

#### Phase 4: MAXA product patterns
**Goal**: Capture reusable patterns from the real MAXA app so agents and developers build actual MAXA surfaces, not generic task-shell prototypes.
**Depends on**: Phase 3 can run in parallel where component dependencies are satisfied
**Requirements**: PAT-01, PAT-02, PAT-03, PAT-04
**Success Criteria** (what must be TRUE):
  1. Pattern specs reference the live MAXA product inventory and screenshots
  2. Pattern docs include production-like examples for dashboard grid, template cards, sidebars, editor toolbar, request/support menus, package detail screens, and related flows
  3. Patterns use only approved MAXA tokens and components
  4. Agents are instructed to prefer these patterns before inventing new layout shells
**Plans**: TBD

Plans:
- [ ] 04-01: Product pattern inventory and priority map
- [ ] 04-02: First pattern implementation tranche

#### Phase 5: Figma Code Connect
**Goal**: Every shipped component and approved product pattern in Figma points to its source file in code via Code Connect.
**Depends on**: Phase 2 for base components; Phase 3/4 mappings can be added incrementally
**Requirements**: HAND-01
**Success Criteria** (what must be TRUE):
  1. Code Connect mappings registered for every component shipped through Phase 2
  2. Props in Figma map 1:1 to component props
  3. Selecting a component in Figma produces the correct code snippet (verified manually)
  4. Workflow documented in `.knowledge/Figma Plugins/` or `specs/`
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

#### Phase 6: v1.0 release prep
**Goal**: Stable public API, migration guide, clean changelog, validated release flow.
**Depends on**: Phase 5
**Requirements**: REL-01, REL-02, REL-03
**Success Criteria** (what must be TRUE):
  1. Public exports of every package audited and locked
  2. Migration guide written for any breaking changes since `0.x`
  3. Changeset / release flow validated end-to-end on a test bump
  4. CHANGELOG consolidated; README + `llms.txt` finalized
  5. `@maxa/*` packages tagged `1.0.0` and published (private registry is fine if no public release)
**Plans**: TBD

Plans:
- [ ] 06-01: TBD
- [ ] 06-02: TBD

### 📋 v1.1 External Adoption (Phase 7, planned)

**Milestone Goal:** Make the design system consumable by external teams using Tailwind v4 without losing token fidelity.

#### Phase 7: Tailwind v4 adapter
**Goal**: Ship `@maxa/tailwind` so external consumers using Tailwind get our tokens as utilities.
**Depends on**: Phase 6 (token surface is stable post-v1.0)
**Requirements**: EXT-01
**Success Criteria** (what must be TRUE):
  1. New `packages/tailwind/` workspace with `package.json`, build, and tests
  2. Tokens generated from the same source as `@maxa/tokens` (no manual drift risk)
  3. Example consumer project verifies utilities work
  4. Docs page added in `apps/docs`
**Plans**: TBD

Plans:
- [ ] 07-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order by default: 1 → 2 → 3 → 4 → 5 → 6 → 7. Phase 4 product patterns may run in parallel with Phase 3 once its dependent components exist.

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 0a. Token foundation | v0.x | n/a | Complete | 2026-04-23 |
| 0b. Eight core components | v0.x | n/a | Complete | 2026-05-13 |
| 0c. Token polish | v0.x | n/a | Complete | 2026-05-15 |
| 1. Dark mode + a11y audit | v1.0 | 2/2 | Complete | 2026-05-18 |
| 2. Base/action component tranche | v1.0 | complete | Complete | 2026-06-11 |
| 3. Application UI component layer | v1.0 | complete | Complete (40 components + closeout) | 2026-06-11 |
| 4. MAXA product patterns | v1.0 | 0/TBD | Not started (next milestone) | — |
| 5. Figma Code Connect | v1.0 | 0/TBD | Not started | — |
| 6. v1.0 release prep | v1.0 | 0/TBD | Not started | — |
| 7. Tailwind v4 adapter | v1.1 | 0/TBD | Not started | — |
