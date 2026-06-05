# Requirements: MAXA UI

**Defined:** 2026-05-18
**Core Value:** LLM-generated UI code always conforms to the design system — no hardcoded design values.

## v1 Requirements

Requirements for v1.0 (current scope). Each maps to a phase in `ROADMAP.md`.

### Quality (QUAL)

- [x] **QUAL-01**: All 8 components pass WCAG AA contrast in dark mode (4.5:1 text / 3:1 large + non-text)
- [x] **QUAL-02**: All 8 components pass WCAG AA contrast in light mode

### Components (COMP)

- [x] **COMP-01**: Tooltip component shipped — spec + implementation + docs page + Figma component tokens
- [x] **COMP-02**: Popover component shipped — spec + implementation + docs page + Figma component tokens
- [x] **COMP-03**: Tabs component shipped — spec + implementation + docs page
- [ ] **COMP-04**: Disclosure / Accordion component shipped — spec + implementation + docs page
- [x] **COMP-05**: Badge component shipped — spec + implementation + docs page + Figma component tokens
- [x] **COMP-06**: Tag component shipped — spec + implementation + docs page + Figma component tokens
- [x] **COMP-07**: Alert component shipped — spec + implementation + docs page + Figma component tokens
- [x] **COMP-08**: Divider component shipped — spec + implementation + docs page + Figma component tokens
- [x] **COMP-09**: Toggle component shipped — spec + implementation + docs page + Figma component tokens

### Design Handoff (HAND)

- [ ] **HAND-01**: Figma Code Connect mappings registered for shipped components and approved product patterns as they enter the v1 platform surface

### Application UI (APP)

- [x] **APP-01**: Component coverage matrix created against MAXA product inventory, Untitled UI, and shadcn/ui
- [ ] **APP-02**: Navigation and wayfinding components selected and partially shipped where needed (Breadcrumb, Pagination, Tabs, and SegmentedControl complete; Sidebar/Nav patterns pending)
- [ ] **APP-03**: Data display components selected and partially shipped where needed (Pagination and Table primitives complete; DataTable and Metrics pending)
- [ ] **APP-04**: Feedback/loading components selected and partially shipped where needed (Skeleton, Progress, Spinner, Alert, Empty complete; Toast/Notification pending)
- [ ] **APP-05**: Overlay/action components selected and shipped where needed (Dialog, AlertDialog, DropdownMenu, ContextMenu, Popover, Tooltip complete; Sheet and Toast pending)
- [ ] **APP-06**: EmptyState and PageHeader patterns/components shipped for product-density app screens
- [ ] **APP-07**: FileUpload shipped if confirmed by MAXA product workflows
- [ ] **APP-08**: Docs/catalog examples use production-like MAXA app contexts rather than generic SaaS placeholders
- [x] **APP-09**: DropdownMenu shipped as a separate overlay/action primitive — spec + implementation + docs page + Figma component tokens
- [x] **APP-10**: Avatar shipped — spec + implementation + docs page + Figma component tokens
- [x] **APP-11**: Select v2 shipped with custom accessible popup/listbox, replacing native browser menu behavior
- [x] **APP-12**: Multi-select shipped as a public form value picker, not a DropdownMenu variant in the component catalog. Internal listbox architecture polish remains tracked separately.
- [x] **APP-13**: Progress, Skeleton, and Spinner shipped for loading and async states
- [x] **APP-14**: Dialog, AlertDialog/Modal, and ContextMenu shipped as overlay primitives
- [x] **APP-15**: Breadcrumb, Pagination, Tabs, Empty, Slider, Social Button, and Utility Button shipped

### Product Patterns (PAT)

- [ ] **PAT-01**: MAXA dashboard grid, design/template card, and scheduled empty-state patterns documented and implemented where reusable
- [ ] **PAT-02**: MAXA sidebar, top navigation, request/support/user-menu, and workspace-switching patterns documented and implemented where reusable
- [ ] **PAT-03**: MAXA editor toolbar/tool-panel and package/detail screen patterns documented and implemented where reusable
- [ ] **PAT-04**: Agent instructions updated so AI workers prefer approved MAXA product patterns before inventing new layout shells

### Release (REL)

- [ ] **REL-01**: Public API of every package audited and locked for v1.0
- [ ] **REL-02**: Migration guide written for any breaking changes since 0.x
- [ ] **REL-03**: v1.0 changelog consolidated; release flow validated end-to-end on a test bump

### External integration (EXT)

- [ ] **EXT-01**: `@maxa/tailwind` adapter package published, mirroring `@maxa/tokens` as Tailwind v4 theme config

## v2 Requirements

Deferred to a future release. Tracked but not in current roadmap.

(None defined yet.)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Shadow / elevation token layer | School A aesthetic — gray page + white surface; revisit only if an overlay component genuinely needs depth |
| Motion / animation tokens | Deferred — no component currently needs guided motion |
| Z-index / stacking tokens | Implicit per component; revisit when overlay components arrive (may flip during Phase 2) |
| Pre-v1.0 semver guarantees | Current version is `0.0.0`; lifted by Phase 4 (REL-01..03) |
| Mobile-native components (Swift / Compose) | Web-first; out of project scope |
| Auth / form-submission logic | Design system has no auth scope |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| QUAL-01 | Phase 1 | Complete |
| QUAL-02 | Phase 1 | Complete |
| COMP-01 | Phase 2 | Complete |
| COMP-02 | Phase 2 | Complete |
| COMP-03 | Phase 2 | Complete |
| COMP-04 | Phase 2 | Pending |
| COMP-05 | Phase 2 | Complete |
| COMP-06 | Phase 2 | Complete |
| COMP-07 | Phase 2 | Complete |
| COMP-08 | Phase 2 | Complete |
| COMP-09 | Phase 2 | Complete |
| APP-01 | Phase 3 | Complete |
| APP-02 | Phase 3 | Pending |
| APP-03 | Phase 3 | Pending |
| APP-04 | Phase 3 | Pending |
| APP-05 | Phase 3 | Pending |
| APP-06 | Phase 3 | Pending |
| APP-07 | Phase 3 | Pending |
| APP-08 | Phase 3 | Pending |
| APP-09 | Phase 3 | Complete |
| APP-10 | Phase 3 | Complete |
| APP-11 | Phase 3 | Complete |
| APP-12 | Phase 3 | Complete |
| APP-13 | Phase 3 | Complete |
| APP-14 | Phase 3 | Complete |
| APP-15 | Phase 3 | Complete |
| PAT-01 | Phase 4 | Pending |
| PAT-02 | Phase 4 | Pending |
| PAT-03 | Phase 4 | Pending |
| PAT-04 | Phase 4 | Pending |
| HAND-01 | Phase 5 | Pending |
| REL-01  | Phase 6 | Pending |
| REL-02  | Phase 6 | Pending |
| REL-03  | Phase 6 | Pending |
| EXT-01  | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 35 total
- Mapped to phases: 35
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-18*
*Last updated: 2026-06-04 after expanding the roadmap toward a full MAXA UI platform*
