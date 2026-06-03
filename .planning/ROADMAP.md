# Roadmap: MAXA UI

## Overview

From a stable Component + Token Parity baseline (May 2026) to a v1.0 release. The path is: harden quality (dark/a11y audit), extend the surface area with the most-requested overlay components, close the design↔code handoff via Figma Code Connect, declare v1.0 with API guarantees, and finally open the door for external consumers via a Tailwind adapter. Phase order is non-binding — `/gsd:insert-phase`, `/gsd:add-phase`, and `/gsd:remove-phase` (Codex: `$gsd-insert-phase`, etc.) let Igor reorder once execution starts.

## Milestones

- ✅ **v0.x — Component + Token Parity** (shipped 2026-05-18)
- 📋 **v1.0 Release** — Phases 1-4 (planned)
- 📋 **v1.1 External Adoption** — Phase 5 (planned)

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

### 📋 v1.0 Release (Phases 1-4, planned)

**Milestone Goal:** Lock a high-quality, accessibility-audited public API with a complete component surface for typical app needs.

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

#### Phase 2: Component surface extension
**Goal**: Ship the v1 application component surface via the existing spec-first workflow.
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
**Status**: In progress. Badge, Tag, Alert, Divider, Switch, Tooltip, and Popover are shipped. Remaining planned v1 components: Tabs and Accordion/Disclosure.
**Plans**: TBD

Plans:
- [x] 02-shipped: Badge, Tag, Alert, Divider, Switch, Tooltip — shipped outside formal GSD plan files
- [x] 02-01: Popover
- [ ] 02-02: Tabs
- [ ] 02-03: Accordion/Disclosure
- [ ] 02-closeout: Phase 2 verification summary and planning-state cleanup

#### Phase 3: Figma Code Connect
**Goal**: Every shipped component in Figma points to its source file in code via Code Connect.
**Depends on**: Phase 2 (so handoff covers the full v1.0 surface, not just the original eight)
**Requirements**: HAND-01
**Success Criteria** (what must be TRUE):
  1. Code Connect JSON mappings registered for every component shipped through Phase 2
  2. Props in Figma map 1:1 to component props
  3. Selecting a component in Figma produces the correct code snippet (verified manually)
  4. Workflow documented in `.knowledge/Figma Plugins/` or `specs/`
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

#### Phase 4: v1.0 release prep
**Goal**: Stable public API, migration guide, clean changelog, validated release flow.
**Depends on**: Phase 3
**Requirements**: REL-01, REL-02, REL-03
**Success Criteria** (what must be TRUE):
  1. Public exports of every package audited and locked
  2. Migration guide written for any breaking changes since `0.x`
  3. Changeset / release flow validated end-to-end on a test bump
  4. CHANGELOG consolidated; README + `llms.txt` finalized
  5. `@maxa/*` packages tagged `1.0.0` and published (private registry is fine if no public release)
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

### 📋 v1.1 External Adoption (Phase 5, planned)

**Milestone Goal:** Make the design system consumable by external teams using Tailwind v4 without losing token fidelity.

#### Phase 5: Tailwind v4 adapter
**Goal**: Ship `@maxa/tailwind` so external consumers using Tailwind get our tokens as utilities.
**Depends on**: Phase 4 (token surface is stable post-v1.0)
**Requirements**: EXT-01
**Success Criteria** (what must be TRUE):
  1. New `packages/tailwind/` workspace with `package.json`, build, and tests
  2. Tokens generated from the same source as `@maxa/tokens` (no manual drift risk)
  3. Example consumer project verifies utilities work
  4. Docs page added in `apps/docs`
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 0a. Token foundation | v0.x | n/a | Complete | 2026-04-23 |
| 0b. Eight core components | v0.x | n/a | Complete | 2026-05-13 |
| 0c. Token polish | v0.x | n/a | Complete | 2026-05-15 |
| 1. Dark mode + a11y audit | v1.0 | 2/2 | Complete | 2026-05-18 |
| 2. Component surface extension | v1.0 | partial/TBD | In progress | — |
| 3. Figma Code Connect | v1.0 | 0/TBD | Not started | — |
| 4. v1.0 release prep | v1.0 | 0/TBD | Not started | — |
| 5. Tailwind v4 adapter | v1.1 | 0/TBD | Not started | — |
