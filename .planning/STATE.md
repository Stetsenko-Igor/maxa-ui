# Project State

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-06-04)

**Core value:** LLM-generated UI code always conforms to the design system — no hardcoded design values.
**Current focus:** Foundation Excellence. Component layer is done (40 components shipped); package readiness is hardened; next work is a foundation audit and polish pass before MAXA product patterns.

## Current Position

Phase: Foundation Excellence — audit complete, ready to execute the named tranche
Plan: Next plan should be `Shared React behavior + UI internal utilities cleanup`
Status: **40 components shipped** (all with spec, implementation, docs, tests). Package readiness has been hardened without entering release mode: curated `@maxa/icons`, published entrypoint checks, consumer install smoke, Vite bundler smoke, release policy, package contracts, and release workflow draft are in place. Foundation audit complete (`.planning/foundation-excellence-audit.md`): no P0, foundation structurally sound; six P1 + eight P2 findings ranked with evidence. Product patterns remain deferred until the ranked P1 items are addressed.
Last activity: 2026-06-15 — Ran the Foundation Excellence audit. Fresh verification all green (audit:tokens exit 0, typecheck 11/11, 86 token tests, 476 UI tests, 90.43% stmts). Produced ranked scorecard and named the next tranche. `.planning/NEXT.md` updated to point at the tranche. Versioning remains explicitly gated.

Progress: [█████████░] 90%

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
| Foundation Excellence             | 0/TBD    | —      | —        | ⏳ Ready to audit (next milestone) |
| 4. MAXA product patterns          | 0/TBD    | —      | —        | ⏸ Deferred until foundation polish |
| 5. Figma Code Connect             | 0/TBD    | —      | —        | ⏳ Not started                     |
| 6. v1.0 release prep              | 0/TBD    | —      | —        | ⏳ Not started                     |
| 7. Tailwind v4 adapter            | 0/TBD    | —      | —        | ⏳ Not started (post-core)         |

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

### Coverage baseline (2026-06-11, @maxa/ui, vitest v8)

- Statements 90.44% · Branches 83.66% · Functions 92.61% · Lines 93.16%
- Thresholds set ~5pts below baseline in `packages/ui/vitest.config.ts` (regression floor). `pnpm test:coverage` runs it; CI enforces via the Coverage step.
- Lowest-covered units to target next: `tooltip.tsx` (75% stmts), `slider.tsx` (78% stmts).

### Verification status

- CI workflow: ✓ includes Typecheck, Lint, Token audit, Token reference freshness, Test, Coverage, Build
- Token audit: ✓ green (`pnpm audit:tokens`)
- TypeScript: ✓ green (`pnpm typecheck`)
- Lint: ✓ green (`pnpm lint`)
- Tests/build/package smoke: ✓ green via `pnpm verify` on 2026-06-15, including `pack:smoke` and Vite consumer build.
- Git status before current closeout: clean after `3289a83 docs(packages): clarify readiness contracts`

## Session Continuity

Last session: 2026-06-15
Stopped at: Package-readiness hardening complete, release guardrails documented, and future plan captured in `.planning/NEXT.md`.
Resume file: `.planning/NEXT.md`
Next milestone: Foundation Excellence — start with foundation audit and scorecard.
