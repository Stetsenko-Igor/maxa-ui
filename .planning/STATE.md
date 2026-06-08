# Project State

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-06-04)

**Core value:** LLM-generated UI code always conforms to the design system — no hardcoded design values.
**Current focus:** Phase 3 stabilization bridge: benchmark-parity component coverage, naming architecture cleanup, Figma token parity, and visual QA before the product pattern layer.

## Current Position

Phase: 3 of 7 (Application UI component layer)
Plan: Phase 3 stabilization bridge (see `.claude/plans/adaptive-shimmying-pine.md`)
Status: **35 components + 5 product patterns shipped.** Phase 3 stabilization bridge complete. Phase 4 product patterns complete: FilterBar, Sidebar, DesignCard, PageHeader (+ existing Toolbar Menus). Each pattern has a spec in `specs/patterns/` and a docs page in `apps/docs/app/docs/patterns/`. Accordion/Disclosure remains deferred.
Last activity: 2026-06-08 — Phase 4 product patterns shipped. Layout tokens added (`--toolbar-height`, `--toolbar-padding-x`, `--toolbar-gap`, `--sidebar-width`, `--sidebar-width-collapsed`) to `component-nav.css` + Figma JSON + bundle rebuilt. Post-stabilization fixes committed (Figma type sanity, CSS corrections for checkbox/radio/multi-select/utility-button). Phase 4 grounded in real MAXA product inventory — no fabricated values.

Progress: [███████░░░] 70%

## Performance Metrics

**Velocity:**
- Total formal plans completed: 2 (GSD tracking started 2026-05-18; prior v0.x work predates this)
- Phase 2 / early Phase 3 shipped component families since last state update: 16
- Average duration: —
- Total execution time: —

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Dark mode + a11y audit | 2/2 | ~45min | ~22min |
| 2. Base/action component tranche | partial/TBD | — | — |
| 3. Application UI component layer | 0/TBD | — | — |
| 4. MAXA product patterns | 0/TBD | — | — |
| 5. Figma Code Connect | 0/TBD | — | — |
| 6. v1.0 release prep | 0/TBD | — | — |
| 7. Tailwind v4 adapter | 0/TBD | — | — |

**Recent Trend:**
- Last shipped work: motion/foundation tokens, Badge, Tag, Alert, Divider, Toggle, Tooltip, Popover, DropdownMenu, Avatar, Spinner, Skeleton, Progress, Tabs, Segment Control, Breadcrumb, Pagination, Empty, Slider, Figma component token bundle, CI token audit gate.
- Trend: Component surface and token enforcement are moving together. The next planning work must widen the component catalog based on MAXA product inventory plus Untitled UI / shadcn benchmarks.

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
- 2026-06-04: Further product pattern work is paused. The active priority is benchmark-parity component coverage against Untitled UI and shadcn component families.
- 2026-05-18: Adopted GSD with brownfield-filled templates (no `/gsd:new-project` interview).
- v0.x: Surface model = `bg/page` + `bg/surface` + `bg/float` + `bg/muted` (no shadow tokens unless overlay work requires them). The early `bg/elevated` alias was removed 2026-06-05.
- v0.x: `forwardRef + cva + Slot` pattern locked across components where applicable; Radix primitives are preferred for accessible behavior.

### Pending Todos

(From `.planning/todos/pending/` — captured via `/gsd:add-todo`.)

None yet.

### Blockers / Concerns

- CI-local parity depends on `packages/tokens/src/index.test.ts` validating `packages/tokens/figma/manifest.json` as component token files are added.
- Planning files were synced to the 35-component reality on 2026-06-05 (coverage matrix, STATE, naming matrix). `.planning/project-audit-2026-06-05.md` is partly superseded — treat `.claude/plans/adaptive-shimmying-pine.md` as the active stabilization checklist.
- Visual QA sweep (light, dark, page-background; open-state for menus/listboxes) is the remaining P1 before Phase 4.

### Coverage baseline (2026-06-05, @maxa/ui, vitest v8)

- Statements 86.68% · Branches 81.17% · Functions 87.12% · Lines 90.72%
- Thresholds set ~5pts below baseline in `packages/ui/vitest.config.ts` (regression floor). `pnpm test:coverage` runs it; CI enforces via the Coverage step.
- Lowest-covered units to target next: `input.tsx` (64% stmts), `select.tsx` (74%), `context-menu.tsx` (75% / 47% branch).

### Verification status

- CI workflow: ✓ includes Typecheck, Lint, Token audit, Test, Build
- Token audit: ✓ green (`pnpm audit:tokens`)
- TypeScript: ✓ green (`pnpm typecheck`)
- Lint: ✓ green (`pnpm lint`)
- Tests/build: ✓ green via `pnpm typecheck`, `pnpm lint`, `pnpm audit:tokens`, `pnpm test`, and `pnpm build`. A monolithic `pnpm verify` session stopped emitting output after test logs, so the gate was completed through equivalent separate commands.
- Git status before current closeout: dirty with DropdownMenu implementation, docs, tokens, planning updates, and lockfile changes

## Session Continuity

Last session: 2026-06-05
Stopped at: stabilization bridge — B (Divider/Separator), A (planning sync + token cleanup), C (Figma parity) complete; E (coverage) and D (visual QA) remaining
Resume file: `.claude/plans/adaptive-shimmying-pine.md`
