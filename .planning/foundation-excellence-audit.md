# Foundation Excellence Audit And Scorecard

Date: 2026-06-15
Author: foundation audit (NEXT.md priority queue item 1)
Status: complete — findings ranked, next tranche named

## Scope And Method

Audit of the foundation layer before any Phase 4 product-pattern work, per
`.planning/NEXT.md`. Areas covered: tokens & semantics, component APIs, reuse
boundaries, icons, docs parity, coverage/verification, and package contracts.

Method: every finding below cites real `file:line` evidence verified by reading
the cited code on 2026-06-15. Verification commands were re-run fresh (not carried
over from prior state). Items already settled in the decision log are recorded
separately under "By design / not a gap" and are **excluded** from the ranked
findings.

Each finding carries exactly one ownership tag:
`tokens` · `ui component` · `ui internal utility` · `hooks` · `icons` · `docs` ·
`tests/verification` · `package contract`.

## Verification Status (freshly run 2026-06-15)

| Check | Command | Result |
| --- | --- | --- |
| Token audit | `node scripts/audit-tokens.mjs` | ✓ exit 0 — "No token violations found." |
| Typecheck | `pnpm typecheck` | ✓ 11/11 tasks pass (turbo FULL TURBO) |
| Token tests | `pnpm --filter @maxa/tokens test` | ✓ 86 passed (1 file) |
| UI tests + coverage | `pnpm --filter @maxa/ui test:coverage` | ✓ 476 passed / 44 files, 8.53s |

Coverage (v8, fresh): All files **90.43%** stmts · 83.66% branch · 92.53% func ·
93.15% lines. The token layer claim of "healthy" is **confirmed by fresh run**,
not assumed: audit + 86 token tests + parity tests all green.

Note: `date-picker.test.tsx` (previously flagged flaky) passed cleanly this run;
the whole UI suite ran in 8.53s. Flakiness was **not reproduced** — tracked as a
watch-item below, not a ranked finding.

## Ranking Rubric

- **P0** — correctness or accessibility break, or blocks product patterns.
- **P1** — cross-component inconsistency or reuse debt that compounds with every
  new component, or a canonical doc feeding agents wrong constraints.
- **P2** — polish, coverage, docs parity, or a localized cleanup.

## Findings

### P0

**None.** No correctness break, no blocking accessibility defect, no token-system
gap. The foundation is structurally sound: 3-layer tokens with full dark coverage,
green audit, 90%+ coverage, all packages typecheck and test clean. This is an
honest result — there is nothing that must be fixed before product patterns can
technically start; the P1 items are about making the system feel like one system.

### P1

| ID | Ownership | Finding | Fix path | Evidence |
| --- | --- | --- | --- | --- |
| F1 | ui internal utility | Class-name joining is hand-rolled as `[...].filter(Boolean).join(" ")` in **30 component files** with no shared helper; `cn`/`clsx` does not exist anywhere in `packages/ui/src`. | Add internal `cn()` helper in `@maxa/ui` (not exported as a hook); adopt across components. | 30 files via `rg "filter(Boolean).join"`; no `cn`/`clsx` match in `packages/ui/src` |
| F2 | ui internal utility | `FOCUSABLE_SELECTOR` (focus-trap query) duplicated **verbatim** between Dialog and Drawer. | Extract a shared internal focus utility in `@maxa/ui`; keep DOM-only (no React state). | `dialog/dialog.tsx:16-23` == `drawer/drawer.tsx:16-23` |
| F3 | hooks | Controlled/uncontrolled state is re-implemented per component (`value ?? internal` + "set only if uncontrolled"). | Extract `useControlledState` into `@maxa/hooks` (genuine reusable React behavior). | `slider/slider.tsx:34-35`, `multi-select/multi-select.tsx:46-49`, `select/select.tsx:74-78`, `segmented-control/segmented-control.tsx:28-46` |
| F4 | hooks | Field-id / label-id derivation via `React.useId` repeated across **12 components**. | Extract `useFieldId` / `useLabelIds` into `@maxa/hooks`. | `useId()` in checkbox, date-picker, dialog, drawer, file-input, input, multi-select, progress, radio, select, slider, toggle |
| F5 | ui component | Variant vocabulary is fragmented: the same "semantic color" axis is `intent` (alert/badge/progress), `appearance` (badge/tag/spinner), and `tone` (avatar/spinner); `variant` means structural/destructive elsewhere (button/menu/skeleton). No documented rule. | Define a naming glossary (intent = semantic meaning, appearance = palette, variant = structural) in a spec/pattern; align props in a follow-up. | `alert.tsx:27`, `badge.tsx:30,32`, `progress.tsx:13`, `tag.tsx:31`, `avatar.tsx:28`, `spinner.tsx:10,12`, `context-menu.tsx:84`, `dropdown-menu.tsx:22`, `skeleton.tsx:7` |
| F9 | ui component | MultiSelect is not a true ARIA listbox/combobox: it nests `DropdownMenu` with a `div role="button"` trigger and checkbox items. Functional and keyboard-reachable, but not the correct pattern; already a known target. | Migrate to a Select-like multi-value listbox/chip field (per decision 2026-06-05). | `multi-select/multi-select.tsx` (DropdownMenu-based trigger + checkbox items) |
| F13 | package contract | `.planning/PROJECT.md` (canonical source-of-truth feeding both Claude and Codex) is **stale vs shipped reality** and asserts wrong constraints: references removed `bg/elevated` token; lists shadow + motion tokens as out-of-scope though both shipped; says "all 8 components" though 40 are shipped. | Update PROJECT.md Requirements / Out-of-Scope / Key Decisions / Context to match shipped reality. | `PROJECT.md:22` & `:74` (`bg/elevated`, removed 2026-06-05 per STATE), `:37` (shadows OOS vs shipped `shadows.css`+`foundations/shadows.md`), `:38` (motion OOS vs shipped `motion.css`+`foundations/motion.md`), `:47` ("all 8 components") |

### P2

| ID | Ownership | Finding | Fix path | Evidence |
| --- | --- | --- | --- | --- |
| F6 | ui component | Spinner carries both deprecated `tone` and `appearance` with a `mapToneToAppearance` shim — migration debt. | Remove `tone` (pre-v1 cleanup) or document the deprecation window. | `spinner/spinner.tsx:10,12,56` |
| F7 | ui component | Controlled-callback naming varies: `onValueChange` / native `onChange` / `onCheckedChange` / `onDateApply`. | Document the convention; align where cheap and pre-v1. | select/slider/segmented-control vs input vs checkbox vs date-picker |
| F8 | ui component | Size scale is `xs\|sm\|md\|lg` but input / file-input / alert-action drop `xs`. | Confirm intentional and document, or add `xs`. | input/file-input/alert size unions |
| F10 | icons | Inline `<svg>` remains after the `@maxa/icons` migration in 3 components (input is already clean). | Replace with `@maxa/icons` or document why inline (e.g. sort glyphs). | `datatable/datatable.tsx`, `dropdown-menu/dropdown-menu.tsx`, `tag/tag.tsx` |
| F11 | tests/verification | Lowest-covered units: `tooltip.tsx` 75% stmts (uncovered 84-86), `slider.tsx` 78.26% stmts (uncovered 96-98). | Add targeted tests for the uncovered branches. | fresh coverage run 2026-06-15 |
| F12 | docs | `motion` and `breakpoints` foundation specs exist but have no `apps/docs` pages; `interactive-hierarchy` pattern spec has no doc page. | Add the three missing doc pages for spec↔docs parity. | `specs/foundations/{motion,breakpoints}.md`, `specs/patterns/interactive-hierarchy.md` with no matching `apps/docs` page |
| F14 | tokens | Border legacy aliases kept "1 release" (default→primary, brand-strong→brand, error-strong→error) — decision pending. | Decide remove vs keep; if remove, confirm zero consumers first. | `packages/tokens/src/semantic.css:140-142` |

## By Design / Not A Gap (excluded from ranked findings)

- **Divider/Separator "duplication"** — intentional. Decision 2026-06-05: `Separator`
  is a Radix/shadcn compatibility alias whose tokens reference `--divider-*` (single
  source of truth), not a second visual system. Not a defect.
- **Coverage thresholds ~5pt below baseline** — intentional regression floor in
  `packages/ui/vitest.config.ts`, not a quality target.
- **`@maxa/hooks` skeleton** — intentional Phase 2 placeholder; README states it.
  (F3/F4 are the first real payload, not a fix to the skeleton itself.)
- **White-label `.maxa-*` prefix (~437 places)** — deferred until a real
  multi-client scope exists (`specs/README.md`). Out of scope now.
- **Shadow + motion tokens existing** — shipping these was correct (overlay work
  needed shadows; reduced-motion needed motion). The gap is only that PROJECT.md was
  not updated to reflect it — captured as F13, not as a token defect.

## Watch-items (monitor, not ranked)

- `date-picker.test.tsx` flakiness did not reproduce this run; keep an eye on CI.

## Candidate Next Tranches (pre-ranking list)

1. Shared React behavior + UI internal utilities cleanup (F1-F4, F2)
2. Component API vocabulary alignment (F5, F6, F7, F8)
3. MultiSelect listbox/chip-field rebuild (F9)
4. Docs + coverage parity (F10, F11, F12)
5. Token alias + PROJECT.md hygiene (F13, F14)

## Named Next Tranche (derived from the ranking above)

**Shared React behavior + UI internal utilities cleanup.**

This is the top result because the reuse debt is the largest compounding P1: it
spans 30+ files, repeats with every new component, and currently has no home. The
tranche is split strictly by ownership so `@maxa/hooks` does not become a generic
utility dump:

- → **`@maxa/hooks` (reusable React behavior):**
  - `useControlledState` — collapses F3 (slider, multi-select, select, segmented-control).
  - `useFieldId` / `useLabelIds` — collapses F4 (12 components).
- → **`@maxa/ui` internal utilities (non-React / DOM, not exported as hooks):**
  - `cn()` class-join helper — collapses F1 (30 files).
  - shared focusable-selector / focus-trap utility — collapses F2 (Dialog/Drawer).

Explicitly **not** in this tranche: the variant glossary (F5) and MultiSelect
rebuild (F9) are separate API tranches; this tranche is reuse extraction + adoption
only, with public component APIs kept stable.

**Trivial fix to make immediately (outside the tranche):** F13 PROJECT.md drift is
a near-zero-cost doc correction that currently feeds agents wrong constraints — fix
it now rather than queuing it.

## Definition Of Done Check

- [x] `.planning/foundation-excellence-audit.md` exists.
- [x] Findings ranked P0/P1/P2, each citing real `file:line` evidence.
- [x] Each finding carries one ownership tag from the fixed set + a fix path.
- [x] "By design" decisions listed separately and excluded from P-findings.
- [x] Next tranche named **after** ranking, derived from it.
