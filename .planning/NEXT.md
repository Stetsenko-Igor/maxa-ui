# Next Work Plan

Last updated: 2026-07-14

## Default Next Move

**Phase 4 is in progress.** 04-01 inventory + priority map is complete (`.planning/04-01-pattern-inventory.md`). Next: **04-02 first pattern tranche** — DashboardToolbar, TemplateCardGrid, SidebarNavigation, plus the EmptyState quick win — as documentation-first compositions (spec + docs page, no new exported components). Land the visual-regression pilot before 04-02 pattern implementation so patterns build under a visual gate.

### Closed this milestone

- **F1-F4 + F13** — shared React behavior + UI internal utilities (merge `42dfd82`, 2026-06-16).
- **F9** — MultiSelect rebuilt as a true ARIA listbox/combobox (2026-06-25). New `--multi-select-listbox-*`/`--multi-select-option-*` tokens; hidden native `<select multiple>` + `name`; custom keyboard; `option.disabled`.
- **F9 review follow-up** — MultiSelect chip remove controls moved outside `button[role=combobox]`, removing the nested-interactive structure while preserving the same visual field.
- **F5 + F6** — variant vocabulary glossary `specs/patterns/variant-vocabulary.md`; Avatar `color→appearance`/`tone→emphasis`; Spinner deprecated `tone` removed (2026-06-25).
- **F10-F12 + F14** — P2 cleanup batch closed: DataTable sort icons migrated to `@maxa/icons`, Tooltip/Slider coverage branches tested, Motion/Breakpoints/Interactive Hierarchy docs pages added, border legacy aliases removed in favor of canonical tokens.

### Review follow-ups (from the 2026-06-25 dual review) — closed 2026-07-14

- **Option id sanitization** — done: Select and MultiSelect option ids now go through `optionDomId()` (`packages/ui/src/lib/option-id.ts`), which sanitizes only the DOM id segment and disambiguates by option index; original `option.value` still flows untouched through state, `onValueChange`, and the native `<select>`.
- **Option focus fix on Select** — done: Select options now use `tabIndex={-1}` + `onMouseDown` preventDefault, matching MultiSelect, so focus/`aria-activedescendant` stays on the trigger.

Product patterns (Phase 4) are the default next move.

## New Direction — Legacy / FSD Migration (parallel, gated)

As of 2026-06-23 there is a parallel track: migrating the live product's legacy /
`@/shared/ui` components onto `@maxa/ui`. The working decision matrix is
`.planning/legacy-fsd-component-migration-matrix.md`.

Key decisions:
- Do NOT treat Ilya's legacy component list as a direct `@maxa/ui` backlog.
- Build thin `@/shared/ui` adapters over `@maxa/ui`; migrate consumers feature by feature.
- Candidate new primitives (spec required before build): `ColorPickerInput`, `CopyField`, conditional `Accordion`.
- Open prerequisite: a product-repo usage audit (import counts per legacy entry) — see the matrix's "Recommended Next Step" and "Questions For Ilya".

Foundation Excellence P1 no longer blocks this track; it still needs an explicit Igor go
before product-repo migration work starts. See also `.planning/team-sync-2026-06-19/`
for adoption framing.

## Current Position

- Phase 3 is complete: 40 components shipped with specs, docs, tests, token
  hygiene, coverage gate, visual QA sweep, and package-readiness smoke checks.
- Package readiness is hardened but intentionally not a release:
  - curated `@maxa/icons`
  - published entrypoint checks
  - consumer install smoke
  - Vite bundler smoke
  - release policy and release workflow draft
- Versions are not bumped. Pending `.changeset/*.md` files remain release notes
  for a future explicit release decision.
- Phase 4 product patterns are unblocked; start with 04-01 inventory + priority
  map when Igor chooses that track.

## Priority Queue

### 1. Foundation Audit And Scorecard — ✅ DONE (2026-06-15)

Completed. See `.planning/foundation-excellence-audit.md`.

Result: foundation is structurally sound (no P0; fresh audit/typecheck/coverage all
green, 90.43% stmts). Six P1 findings (reuse debt, variant vocabulary, MultiSelect
a11y, PROJECT.md drift) and eight P2 findings ranked, each with `file:line` evidence
and an ownership tag.

**Named next tranche → "Shared React behavior + UI internal utilities cleanup"**
(split by ownership):

- `@maxa/hooks`: `useControlledState`, `useFieldId`/`useLabelIds`
- `@maxa/ui` internal: `cn()` helper, shared focusable-selector / focus-trap util

Trivial fix to make immediately (outside the tranche): correct the stale
`PROJECT.md` constraints (F13).

### 2. Token And Semantic Cleanup

Tighten the token system before product work depends on it.

Focus:

- confirm primitive → semantic → component boundaries are consistently followed
- remove or document aliases that no longer earn their keep
- make naming consistent across CSS vars, Figma JSON, specs, and docs
- validate component tokens cover real states without leaking raw design values
- keep `packages/tokens/figma/import-bundle.json` and token reference fresh

### 3. Component API And Reuse Polish

Make the 40 shipped components feel like one system, not 40 local decisions.

Focus:

- normalize prop naming and variant semantics
- audit `asChild`, `ref`, controlled/uncontrolled, and accessible-name behavior
- identify repeated internal helpers worth extracting
- reduce duplication where it improves clarity and safety
- keep public APIs stable unless a pre-v1 cleanup is clearly worth it

### 4. Visual QA Polish Pass

Run a visual-quality pass before new pattern work.

Focus:

- dense app surfaces, not marketing layouts
- light/dark/page-background screenshots
- hover/focus/active/disabled states
- overlay/menu/listbox open states
- text fitting, spacing rhythm, icon sizing, and contrast

### 5. Docs And Consumer Experience Polish

Make docs and package consumption boringly clear.

Focus:

- installation and package-readiness docs
- component usage examples
- icon usage rules
- accessibility notes
- package README files included in published files
- `llms.txt` and agent-readable instructions when needed

## Explicit Non-Goals Right Now

- No Phase 4 product pattern implementation yet.
- No registry publishing (GitLab Package Registry or public npm).
- No `pnpm changeset version`.
- No Tailwind adapter.
- No broad redesign of the component library.
- No new core component unless the foundation audit proves a real repeated gap.

## Quick Answer

When asked "what next?", answer:

> Foundation Excellence first: audit tokens, semantics, component APIs, visual
> polish, reuse boundaries, docs, and verification. Then fix the highest-value
> issues before starting product patterns.
