# Plan: reconcile the neutral bg ladder, add on-muted(300), regenerate the docs color showcase

Status: PROPOSAL — not implemented. For independent review (Codex) before any execution.
Author: Claude (Fable 5), 2026-07-31.

## Problem (verified against repo + live export)

Three surfaces disagree about the neutral background ladder:

| Role                    | CSS `semantic.css`      | Figma (JSON/bundle/live lib)     | Docs colors page        |
| ----------------------- | ----------------------- | -------------------------------- | ----------------------- |
| `bg-neutral-subtle`     | neutral-100             | neutral-100                      | listed, no value shown  |
| `bg-neutral-on-subtle`  | neutral-200             | **absent**                       | listed, no value shown  |
| `bg-neutral-surface`    | **absent**              | neutral-100 (duplicate of subtle) | absent                  |
| `bg-neutral-muted`      | neutral-200             | neutral-200                      | **missing from page**   |
| `bg-neutral-strong`     | neutral-800             | neutral-800                      | listed                  |

Facts established:

- `bg-neutral-surface` (Figma side) has **zero consumers**: nothing in the import bundle
  aliases it, and no CSS/component references exist. It is a dead duplicate of
  `bg-neutral-subtle` (same value in both modes: 100 light / 800 dark).
- `bg-neutral-on-subtle` (CSS side) exists only in `semantic.css` and the hand-written
  docs listing; no component consumes it yet.
- CSS `on-subtle`(200) and `muted`(200) are value-duplicates of each other in both themes
  (200 light / 700 dark). Deduplicating them is explicitly OUT of scope here (see
  Non-goals) — it belongs to the long-deferred intent `-surface` duplicate cleanup.
- The export↔repo zero-drift check cannot catch this class of divergence: it compares the
  Figma export against `import-bundle.json`, and both are generated from the same
  `figma/*.json` sources. CSS↔JSON **name parity is unchecked** — that is the blind spot.
- The docs colors page (`apps/docs/app/docs/foundations/colors/page.tsx`) is a
  hand-maintained static array: stale relative to CSS (missing `bg-neutral-muted`, the
  whole intent `-muted` family, feedback/control groups) and shows no resolved values.
- New product need: a neutral-300 background tier (table header), darker than muted(200),
  lighter than strong(800).

## Part 1 — one ladder vocabulary (no deletions, all Figma variable IDs preserved)

Canonical ladder after this change:
`subtle`(100) → `on-subtle`(200) → `muted`(200) → **`on-muted`(300 light / 600 dark, NEW)**
→ `strong`(800). Dark values follow the ladder's existing inversion
(subtle 800 → on-subtle 700 → muted 700 → on-muted 600 → strong 400).

Changes:

1. `packages/tokens/figma/colors-semantic-light.json` + `colors-semantic-dark.json`
   - Rename key `background/bg-neutral-surface` → `background/bg-neutral-on-subtle`;
     set values `{Colors.Neutral.200}` light / `{Colors.Neutral.700}` dark (matches CSS).
     Note: this is a rename **plus** a value change (100→200) — the old Figma variable was
     a subtle-duplicate; the renamed role adopts the CSS meaning.
   - Add `background/bg-neutral-on-muted` → `{Colors.Neutral.300}` light /
     `{Colors.Neutral.600}` dark, description: "Structural fill one step above muted —
     table headers, wells."
2. `.knowledge/Figma Plugins/MAXA Token Importer/code.js` — MIGRATIONS map entry:
   `'Color modes/background/bg-neutral-surface': 'Color modes/background/bg-neutral-on-subtle'`
   so the live Figma variable is renamed in place (ID preserved, existing node bindings
   survive) instead of being recreated.
3. `packages/tokens/src/semantic.css` — add `--color-bg-neutral-on-muted:
   var(--color-neutral-300);` (light block) and `var(--color-neutral-600)` (dark block),
   placed with the neutral ladder.
4. Table header rebind (the product need that started this):
   - `packages/tokens/src/component-table.css`: both `--table-header-bg` declarations
     (currently `var(--color-bg-muted)` = neutral-25) → `var(--color-bg-neutral-on-muted)`.
   - `packages/tokens/figma/component-table.json`: `header-bg` →
     `{Color modes/background/bg-neutral-on-muted}`.

Non-goals (deliberately excluded):
- No deletion of the `on-subtle`/`muted` value duplication.
- No touch of the broader intent `-surface` duplicate family
  (`bg-info-surface`, `bg-success-surface`, `bg-warning-surface`, `bg-error-surface`,
  `bg-brand-surface`) — same known debt, needs a live-Figma consumer scan first,
  separate PR.
- No changes to the Utility `bg-gray-*` hue family (wrong family for this use case:
  Tailwind gray, decorative Badge/Tag palette; 18-hue tier symmetry must stay intact).

## Part 2 — docs colors showcase becomes generated (kills the third divergence)

1. Extend `scripts/generate-tokens-reference.mjs` (its CSS parser already extracts every
   semantic var and its value) to additionally emit machine-readable data for the docs
   page: token name, group, resolved light hex, resolved dark hex.
2. Rewrite `apps/docs/app/docs/foundations/colors/page.tsx` to render from that generated
   data — swatch, CSS var name, resolved light/dark values. Delete the hand-maintained
   arrays.
3. Emit as part of the existing `tokens:reference` script so the already-wired
   `tokens:reference:check` in `pnpm verify` and the pre-push hook also guards the docs
   data from going stale.

## Part 3 — parity guard (closes the blind spot permanently)

New test in `packages/tokens/src/index.test.ts`: for every `Color modes` group with a CSS
counterpart (text, border, action, foreground, background, control — mapping rule =
`SEMANTIC_COLOR_GROUPS` in `build-figma-import-bundle.mjs`), assert bidirectional name
parity: every Figma JSON leaf has a matching `--color-*` custom property in
`semantic.css`, and vice versa. This test fails on today's tree (surface vs on-subtle)
and passes after Part 1 — which is itself the proof it catches this class of drift.
(feedback/utility groups may need an allowlist for CSS-side roles that intentionally have
no Figma counterpart or vice versa; keep the allowlist explicit and empty if possible.)

## Verification

- New parity test: red before Part 1, green after.
- `pnpm verify` fully green (typecheck, lint, audit, bundle check, reference check,
  importer tests, tests, build, pack smoke).
- Expected next Figma import delta, exactly:
  - 1 rename with value change: `bg-neutral-surface` → `bg-neutral-on-subtle` (100→200);
  - +1 variable: `bg-neutral-on-muted`;
  - 1 rebind: `Component-based/Table/header-bg`;
  - 0 deletions, 0 recreations, 0 mode/type changes.
- Docs page shows the full ladder including muted/on-muted with hex values in both themes.
- Changeset (patch `@maxa/tokens`); branch → PR → CI green → Igor review → merge; then the
  standard import (stale variables OFF / stale modes ON / recreate OFF) → re-export →
  zero-drift check.

## Separate open item (not part of this plan)

Export `maxa-figma-export-2026-07-31-4.json` contains 6 pending live-Figma edits: all
`Alert/color/*/text` roles rebound from `text/text-primary` to `text/text-inverse`.
Flagged as visually suspect (Light: white text on pastel backgrounds; Dark: dark text on
dark backgrounds — broken in both themes unless Alert backgrounds change too). NOT
transferred to code; Igor to confirm intent. Everything else in export -4 matches the
repo exactly.
