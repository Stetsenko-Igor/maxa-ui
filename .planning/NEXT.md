# Next Work Plan

Last updated: 2026-06-15

## Default Next Move

Start **Foundation Excellence** before Phase 4 product patterns.

The product-pattern layer should wait until the foundation feels excellent:
tokens, semantic naming, component APIs, visual quality, docs, reuse, package
boundaries, and verification should all feel boringly reliable. The goal is to
make the core system sharp enough that product patterns can be built without
dragging foundational uncertainty forward.

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

### 1. Foundation Audit And Scorecard

Create a focused audit of the foundation layer before changing more code.

Audit areas:

- token naming and semantic layering
- component-token coverage and drift between CSS/Figma JSON/docs
- component API consistency across size, variant, state, ref, Slot/asChild, and
  accessibility props
- visual polish across light/dark/theme backgrounds
- docs accuracy and example quality
- reuse boundaries: what belongs in `@maxa/ui`, `@maxa/tokens`,
  `@maxa/icons`, `@maxa/hooks`, `@maxa/cli`, and `@maxa/mcp`
- test/coverage gaps and slow/flaky checks

Definition of done:

- `.planning/foundation-excellence-audit.md` exists.
- Findings are ranked P0/P1/P2.
- Each finding has an owner area and suggested fix path.
- The next implementation tranche is named.

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
