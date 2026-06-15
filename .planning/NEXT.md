# Next Work Plan

Last updated: 2026-06-15

## Default Next Move

**Shared React behavior + UI internal utilities cleanup tranche — ✅ DONE (2026-06-16)**

Next remaining P1s from the audit (`.planning/foundation-excellence-audit.md`):

- **F5 (P1, ui component):** Fragmented variant vocabulary — `intent` / `appearance` / `tone` / `variant` all express the same "semantic color" axis across 9 components. Write a glossary spec in `specs/patterns/`, then align props.
- **F9 (P1, ui component):** MultiSelect not a true ARIA listbox — uses DropdownMenu + `div role="button"`. Rebuild as proper listbox/chip field (per decision 2026-06-05).

Remaining P2s (batch when convenient):
- F10: Replace inline SVGs in `datatable`, `dropdown-menu`, `tag` with `@maxa/icons`.
- F11: Raise coverage for `tooltip.tsx` (75%) and `slider.tsx` (78%).
- F12: Add docs pages for motion + breakpoints foundations and interactive-hierarchy pattern.
- F14: Decide on border legacy aliases at `packages/tokens/src/semantic.css:140-142`.

Product patterns (Phase 4) wait until P1s are addressed.

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
- Phase 4 product patterns are deferred until Foundation Excellence is complete
  enough to trust.

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
- No npm/GitHub Packages publishing.
- No `pnpm changeset version`.
- No Tailwind adapter.
- No broad redesign of the component library.
- No new core component unless the foundation audit proves a real repeated gap.

## Quick Answer

When asked "what next?", answer:

> Foundation Excellence first: audit tokens, semantics, component APIs, visual
> polish, reuse boundaries, docs, and verification. Then fix the highest-value
> issues before starting product patterns.
