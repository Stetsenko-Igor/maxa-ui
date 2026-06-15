# Next Work Plan

Last updated: 2026-06-15

## Default Next Move

Start **Phase 4: MAXA product patterns**.

The component layer is complete enough to stop adding generic primitives by
default. The next value is turning the real MAXA product inventory into reusable
patterns so future product UI work starts from approved MAXA surfaces instead
of generic dashboard shells.

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

## Priority Queue

### 1. Phase 4 Plan: Product Pattern Inventory

Create the first Phase 4 plan before implementing patterns.

Scope:

- Re-read the MAXA product UI inventory and screenshot set.
- Map production screens to reusable pattern candidates.
- Prioritize patterns by product frequency and agent-risk:
  - dashboard toolbar
  - dashboard/template card grid
  - dashboard/sidebar navigation
  - request/support/user dropdown menus
  - template masonry grid
  - AMP/package detail toolbar and card grid
  - editor top bar and tool rail
  - upload/PDF-to-print flow
  - empty states for scheduled/search results
- Decide which patterns are documentation-only compositions and which deserve
  exported React helpers later.

Definition of done:

- `.planning/phases/04-maxa-product-patterns/04-01-PLAN.md` exists.
- Pattern candidates are ranked P0/P1/P2 with product evidence.
- The first implementation tranche is named.

### 2. Phase 4 Tranche 1: Pattern Specs And Docs

Implement the first small product-pattern tranche after `04-01` is accepted.

Recommended first tranche:

- `DashboardToolbar`
- `TemplateCardGrid`
- `SidebarNavigation`

For each pattern:

- add or update a spec under `specs/patterns/`
- add docs examples using existing `@maxa/ui` components
- include responsive behavior for mobile 375, tablet 768, desktop
- reference real MAXA screenshots/routes from the product inventory
- avoid new primitives unless repeated product evidence proves a gap

### 3. Figma Code Connect Prep

Do not start full Phase 5 yet. Prepare only what helps Phase 4:

- identify which shipped components already have stable prop names
- choose 3-5 high-confidence mappings for a pilot
- document any Figma component naming mismatches

### 4. Release Readiness: Keep Guardrails Green

Continue package-readiness work only as maintenance:

- keep `pnpm verify` and GitHub Actions green
- keep pending Changesets as release notes
- do not run `pnpm changeset version`
- do not publish packages
- revisit release only after Phase 4 has real product-pattern value or Igor
  explicitly asks for registry distribution

## Explicit Non-Goals Right Now

- No npm/GitHub Packages publishing.
- No `pnpm changeset version`.
- No Tailwind adapter.
- No generic marketing/landing-page components.
- No new core component unless a Phase 4 pattern proves a real repeated gap.

## Quick Answer

When asked "what next?", answer:

> Plan Phase 4, starting with product pattern inventory and priority map. Then
> ship the first pattern tranche: dashboard toolbar, template card grid, and
> sidebar navigation.
