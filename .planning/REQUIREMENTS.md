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
- [ ] **COMP-03**: Tabs component shipped — spec + implementation + docs page
- [ ] **COMP-04**: Disclosure / Accordion component shipped — spec + implementation + docs page
- [x] **COMP-05**: Badge component shipped — spec + implementation + docs page + Figma component tokens
- [x] **COMP-06**: Tag component shipped — spec + implementation + docs page + Figma component tokens
- [x] **COMP-07**: Alert component shipped — spec + implementation + docs page + Figma component tokens
- [x] **COMP-08**: Divider component shipped — spec + implementation + docs page + Figma component tokens
- [x] **COMP-09**: Toggle component shipped — spec + implementation + docs page + Figma component tokens

### Design Handoff (HAND)

- [ ] **HAND-01**: Figma Code Connect mappings registered for all 8 existing components (and any new components from Phase 2 if Phase 3 runs after)

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
| COMP-03 | Phase 2 | Pending |
| COMP-04 | Phase 2 | Pending |
| COMP-05 | Phase 2 | Complete |
| COMP-06 | Phase 2 | Complete |
| COMP-07 | Phase 2 | Complete |
| COMP-08 | Phase 2 | Complete |
| COMP-09 | Phase 2 | Complete |
| HAND-01 | Phase 3 | Pending |
| REL-01  | Phase 4 | Pending |
| REL-02  | Phase 4 | Pending |
| REL-03  | Phase 4 | Pending |
| EXT-01  | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 16 total
- Mapped to phases: 16
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-18*
*Last updated: 2026-06-03 after Popover shipment*
