# Project State

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-06-04)

**Core value:** LLM-generated UI code always conforms to the design system — no hardcoded design values.
**Current focus:** Phase 4 product patterns. Foundation Excellence P1 + P2 are closed; component layer done (40 components); package readiness hardened. Start with 04-01 inventory + priority map.

## Current Position

Phase: Phase 4 product patterns — ready to start 04-01 inventory + priority map.
Plan: Start Phase 4 product patterns from the real MAXA product inventory/screenshots. Legacy/FSD migration remains a parallel gated track and still needs an explicit Igor go before product-repo migration work starts.
Status: **40 components shipped** (all with spec, implementation, docs, tests). Package readiness hardened without entering release mode (curated `@maxa/icons`, published entrypoint checks, consumer install smoke, Vite bundler smoke, release policy, package contracts, release workflow draft). Foundation audit (`.planning/foundation-excellence-audit.md`): no P0; six P1 + eight P2. **All P1 + P2 now done:** F1-F4 (shared React behavior, `42dfd82`), F13 (PROJECT.md drift), F5+F6 (variant vocabulary glossary + Avatar/Spinner prop alignment, 2026-06-25), F9 (MultiSelect true ARIA listbox rebuild, 2026-06-25), F10-F12 + F14 (P2 cleanup batch, 2026-06-25). Also shipped along the way: React 17 support, FileInput rebuild, docs Playground tab, Button/Input family expansion, FSD coverage gap analysis, legacy/FSD migration matrix.
Last activity: 2026-06-25 — Closed the Foundation Excellence P2 cleanup batch: DataTable sort glyphs now use curated `@maxa/icons`; Tooltip/Slider targeted branches are tested; Motion, Breakpoints, and Interactive Hierarchy docs pages exist; legacy border aliases were removed and consumers moved to canonical border tokens. Gate green: 504 UI tests, 86 token tests, typecheck 12/12, lint 7/7, audit clean, token reference fresh. Not yet committed. Versioning remains gated.

Progress: [██████████] 100%

## Performance Metrics

**Velocity:**

- Total formal plans completed: 2 (GSD tracking started 2026-05-18; prior v0.x work predates this)
- Phase 2 / early Phase 3 shipped component families since last state update: 16
- Average duration: —
- Total execution time: —

**By Phase:**

| Phase                             | Plans    | Total  | Avg/Plan | Status                             |
| --------------------------------- | -------- | ------ | -------- | ---------------------------------- |
| 1. Dark mode + a11y audit         | 2/2      | ~45min | ~22min   | ✅ Complete                        |
| 2. Base/action component tranche  | complete | —      | —        | ✅ Complete                        |
| 3. Application UI component layer | complete | —      | —        | ✅ Component layer + closeout done |
| Foundation Excellence             | —        | —      | —        | ✅ P1 + P2 complete (F1-F6, F9-F14) |
| 4. MAXA product patterns          | 0/TBD    | —      | —        | 🟢 Unblocked; not started |
| 5. Figma Code Connect             | 0/TBD    | —      | —        | ⏳ Not started                     |
| 6. v1.0 release prep              | 0/TBD    | —      | —        | ⏳ Not started                     |
| 7. Tailwind v4 adapter            | —        | —      | —        | ❌ Cancelled — no Tailwind in product stack |

**Recent Trend:**

- Last shipped work: curated icon package adoption, published entrypoint hardening, consumer install smoke, Vite bundler smoke, package contracts, and release workflow guardrails.
- Trend: Component surface is broad enough; the next work should make the foundation feel excellent before turning real MAXA product screens into reusable product patterns.

## Accumulated Context

### Decisions

Decisions are logged in `PROJECT.md` Key Decisions table.
Recent decisions affecting current work:

- 2026-06-03: GitHub Actions CI gate is canonical: `typecheck → lint → audit:tokens → test → build`.
- 2026-06-03: `pnpm verify` mirrors the full CI gate locally; `pnpm ci` aliases `pnpm verify`.
- 2026-06-03: Token audit is mandatory in CI and blocks hardcoded hex values or direct primitive-token usage in components.
- 2026-06-03: Badge, Tag, Alert, Divider, Toggle, Tooltip, and Popover are treated as shipped public component additions.
- 2026-06-03: Remaining Phase 2 component scope is Tabs and Accordion/Disclosure.
- 2026-06-04: Roadmap target expanded from a minimal v1 component package to a full MAXA UI platform: base components, application UI components, MAXA product patterns, docs/catalog, Figma Code Connect, and release stabilization.
- 2026-06-04: Tailwind v4 adapter remains useful but is post-core adoption work, not the next main objective.
- 2026-06-04: Select and DropdownMenu are distinct. Select is for form value selection; DropdownMenu is for actions/navigation/commands. DropdownMenu is P0 because MAXA has Request, Support, User, Share, toolbar, and card action menus.
- 2026-06-04: Accordion/Disclosure is deferred until a real MAXA workflow requires expandable content.
- 2026-06-04: Public React name for the menu component should be `DropdownMenu`, not `Dropdown`. MAXA Figma has a broad `Dropdown` page, Untitled UI separates Dropdown/Select/Multi-select/Context menu, and shadcn separates Dropdown Menu/Select/Context Menu.
- 2026-06-04: DropdownMenu shipped with shadcn/Radix-style part names and MAXA component tokens. `Select`, future `ContextMenu`, future `MultiSelect`, and future `Combobox` remain separate APIs.
- 2026-06-05: `Select` v2 shipped as a custom accessible combobox/listbox with hidden native select compatibility. It remains separate from `DropdownMenu`.
- 2026-06-05: `MultiSelect` is visually corrected but still uses `DropdownMenu` internally. Long-term architecture should move it toward a Select-like multi-value listbox/chip field.
- 2026-06-05: `Divider` is the canonical MAXA public primitive. `Separator` remains as a Radix/shadcn compatibility alias whose tokens reference `--divider-*` (single source of truth); it is not a second visual system. Both now have spec + tests.
- 2026-06-05: Figma component-token parity achieved — all CSS component token families have matching light/dark JSON entries in `packages/tokens/figma`. `utility` is an intentional Figma-only group (no CSS counterpart), documented in the figma README.
- 2026-06-05: Deprecated `--color-bg-elevated` alias removed (zero source consumers); migrate any external use to `--color-bg-surface`.
- 2026-06-11: Phase 3 closed out. Component layer declared complete at 40 components. `badge-tag-pill.md` archived to `specs/_archive/` (superseded by canonical `badge.md`/`tag.md`). `@maxa/icons` + `@maxa/hooks` kept as documented reserved placeholders, not removed. Phase 4 (product patterns) is the next milestone but intentionally not started.
- 2026-06-15: Package readiness hardened without release: `@maxa/icons` is real and curated, published package entrypoints are smoke-tested, packed tarballs install in a temporary consumer project, and a Vite React consumer build verifies `@maxa/tokens/theme.css` + `@maxa/ui`.
- 2026-06-15: Release/versioning guardrail adopted. Pending Changesets are release notes only; do not run `pnpm changeset version` or publish packages without an explicit release decision.
- 2026-06-15: Current default next move captured in `.planning/NEXT.md`: Foundation Excellence first, then Phase 4 product patterns.
- 2026-06-15: Foundation Excellence audit complete (`.planning/foundation-excellence-audit.md`). No P0. Fresh verification green (audit:tokens, typecheck 11/11, 86 token tests, 476 UI tests, coverage 90.43% stmts). Six P1 findings (F1 `cn` helper across 30 files, F2 duplicated focus-trap selector, F3 `useControlledState`, F4 field/label-id hooks, F5 fragmented variant vocabulary intent/appearance/tone/variant, F9 MultiSelect not a true listbox, F13 stale PROJECT.md constraints) + eight P2. Named next tranche: **Shared React behavior + UI internal utilities cleanup** — `useControlledState`/`useFieldId`/`useLabelIds` → `@maxa/hooks`; `cn()`/focus-trap util → `@maxa/ui` internal (ownership split intentional; hooks package is not a generic utility dump). Variant glossary (F5) and MultiSelect rebuild (F9) are separate later tranches.
- 2026-06-15: Igor explicitly deferred product patterns until the foundation is polished: tokens, semantics, components, visual quality, reuse, docs, and verification.
- 2026-06-16: Shared-react-behavior tranche merged (`feat/shared-react-behavior-cleanup`, `42dfd82`). `useControlledState`, `useFieldId`/`useLabelIds` → `@maxa/hooks`; `cn()`, `useFocusTrap` → `@maxa/ui` internal. Closes audit F1-F4. F13 (stale PROJECT.md constraints) also fixed.
- 2026-06-17: React 17 supported via `useId` ponyfill (`@maxa/ui`); docs + `@maxa/hooks` README updated.
- 2026-06-23: Legacy/FSD migration decision recorded in `.planning/legacy-fsd-component-migration-matrix.md`. Do NOT treat Ilya's legacy component list as a direct `@maxa/ui` backlog; build thin `@/shared/ui` adapters over `@maxa/ui` and migrate consumers feature by feature. Candidate new primitives (each needs a spec first): `ColorPickerInput`, `CopyField`, conditional `Accordion`. Foundation Excellence no longer blocks this track; it still needs an explicit Igor go before product-repo migration work starts.
- 2026-06-24: Dropped `-codex` suffix from project references (`eb3ea68`); Button + Input family expanded, Alert/Textarea/IconButton refined (`8a7cc1b`).
- 2026-06-25: F9 closed — MultiSelect rebuilt as a true ARIA listbox/combobox (button[combobox] → div[listbox] → button[option], hidden native `<select multiple>` for form compat + `name` prop, custom keyboard, `option.disabled`). New `--multi-select-listbox-*`/`--multi-select-option-*` tokens alias the Select tokens (single source of truth). DropdownMenu dependency removed.
- 2026-06-25: F5+F6 closed — `specs/patterns/variant-vocabulary.md` defines the canonical axes (`intent`=meaning, `appearance`=palette, `emphasis`=weight, `variant`=structure). Breaking renames: Avatar `color→appearance`, `tone→emphasis`; Spinner deprecated `tone` shim removed. Button keeps its fused `variant` as the single grandfathered exception.
- 2026-06-25: Pre-commit discipline — ran an independent dual review (Codex adversarial + reviewer subagent) on the uncommitted F5+F9 diff; fixed the combobox focus-management findings before declaring done. Documented review follow-ups in `NEXT.md`.
- 2026-06-04: Further product pattern work is paused. The active priority is benchmark-parity component coverage against Untitled UI and shadcn component families.
- 2026-05-18: Adopted GSD with brownfield-filled templates (no `/gsd:new-project` interview).
- v0.x: Surface model = `bg/page` + `bg/surface` + `bg/float` + `bg/muted` (no shadow tokens unless overlay work requires them). The early `bg/elevated` alias was removed 2026-06-05.
- v0.x: `forwardRef + cva + Slot` pattern locked across components where applicable; Radix primitives are preferred for accessible behavior.

### Pending Todos

(From `.planning/todos/pending/` — captured via `/gsd:add-todo`.)

None yet.

### Blockers / Concerns

- CI-local parity depends on `packages/tokens/src/index.test.ts` validating `packages/tokens/figma/manifest.json` as component token files are added.
- `pnpm verify` now includes `pnpm pack:smoke`, which performs packed tarball checks plus a temporary Vite consumer build. This can take longer than the older smoke, but it is the intended package-readiness gate.
- Planning files were synced to the 40-component reality on 2026-06-11 (STATE, ROADMAP, REQUIREMENTS, coverage matrix). Older audit/plan artifacts (`.planning/project-audit-2026-06-05.md`, `.claude/plans/adaptive-shimmying-pine.md`) are superseded by the Phase 3 closeout.
- Visual QA sweep (light, dark, page-background; open-state for menus/listboxes) completed 2026-06-11 — see `.planning/phases/03-application-ui-component-layer/visual-qa-sweep.md`.

### Coverage baseline (2026-07-14, @maxa/ui, vitest v8)

- Statements 91.27% · Branches 84.35% · Functions 92.07% · Lines 93.96% (526 tests / 47 files)
- axe assertions now cover 40/40 components (2026-07-14 expansion closed the last 9: context-menu, date-picker, calendar, textarea, multi-select, file-input, social-button, alert-dialog, utility-button). Real finding fixed along the way: calendar/date-picker `role="grid"` panels had no row/gridcell structure — switched to `role="group"`.
- Thresholds set ~5pts below baseline in `packages/ui/vitest.config.ts` (regression floor). `pnpm test:coverage` runs it; CI enforces via the Coverage step.
- Previous baseline (2026-06-11): Statements 90.44% · Branches 83.66% · Functions 92.61% · Lines 93.16%.

### Verification status

- CI workflow: ✓ includes Typecheck, Lint, Token audit, Token reference freshness, Test, Coverage, Build
- Token audit: ✓ green (`pnpm audit:tokens` — "No token violations found", 2026-06-24)
- TypeScript: ✓ green (`pnpm typecheck` — 11/11 tasks, 2026-06-24)
- Tests: ✓ green (`pnpm --filter @maxa/ui test` — 504 UI tests across 46 files; `@maxa/tokens` 86 tests, 2026-06-25). Up from 476 on 2026-06-15.
- Token reference: ✓ fresh (`pnpm tokens:reference:check` — up to date after F9 token additions + rename, 2026-06-25).
- Lint: ✓ green (`pnpm --filter @maxa/ui lint`, 2026-06-25).
- Coverage: last measured 90.43% stmts on 2026-06-15; NOT re-measured this pass (`pnpm test` ≠ `pnpm test:coverage`). Re-run `pnpm test:coverage` before relying on a fresh number.
- Build / package smoke: not re-run this pass; last green via `pnpm verify` on 2026-06-15 (incl. `pack:smoke` + Vite consumer build).

## Session Continuity

Last session: 2026-06-25
Stopped at: Foundation Excellence P1 + P2 closed, reviewed, gate green. Changes uncommitted — Igor to trigger commit. Phase 4 product patterns is the next default move.
Resume file: `.planning/NEXT.md`
Next milestone: Phase 4 product patterns — start 04-01 inventory + priority map.
