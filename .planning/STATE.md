# Project State

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-06-04)

**Core value:** LLM-generated UI code always conforms to the design system — no hardcoded design values.
**Current focus:** Phase 3 closeout complete. Component layer is done (40 components shipped); next milestone is Phase 4 (MAXA product patterns), explicitly not started yet.

## Current Position

Phase: 3 of 7 (Application UI component layer) — component layer complete, closed out
Plan: Phase 3 closeout + cleanup (see `.claude/plans/goofy-doodling-gadget.md`)
Status: **40 components shipped** (all with spec, implementation, docs, tests). Roadmap expanded on 2026-06-04 to include application UI components, MAXA product patterns, Figma Code Connect, v1.0 release prep, and post-core Tailwind adapter work. Beyond the 35-component bridge: TextArea (split into its own entry sharing Input internals), FileInput (low-level picker/dropzone primitive), Drawer (side-panel overlay), Empty, and the full overlay/menu set are shipped. Accordion/Disclosure and Combobox/Command remain deferred (see `specs/core-gap-audit.md`).
Last activity: 2026-06-11 — Phase 3 closeout. Visual QA sweep run across all 40 component doc pages (light/dark/page-background + open-state overlays). Superseded `badge-tag-pill.md` archived to `specs/_archive/`. `@maxa/icons` and `@maxa/hooks` confirmed as documented reserved placeholders. Stray `next-env.d.ts` dev artifact reverted. Planning docs synced to the 40-component reality.

Progress: [█████████░] 90%

## Performance Metrics

**Velocity:**
- Total formal plans completed: 2 (GSD tracking started 2026-05-18; prior v0.x work predates this)
- Phase 2 / early Phase 3 shipped component families since last state update: 16
- Average duration: —
- Total execution time: —

**By Phase:**

| Phase | Plans | Total | Avg/Plan | Status |
|-------|-------|-------|----------|--------|
| 1. Dark mode + a11y audit | 2/2 | ~45min | ~22min | ✅ Complete |
| 2. Base/action component tranche | complete | — | — | ✅ Complete |
| 3. Application UI component layer | complete | — | — | ✅ Component layer + closeout done |
| 4. MAXA product patterns | 0/TBD | — | — | ⏳ Not started (next milestone) |
| 5. Figma Code Connect | 0/TBD | — | — | ⏳ Not started |
| 6. v1.0 release prep | 0/TBD | — | — | ⏳ Not started |
| 7. Tailwind v4 adapter | 0/TBD | — | — | ⏳ Not started (post-core) |

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
- 2026-06-11: Phase 3 closed out. Component layer declared complete at 40 components. `badge-tag-pill.md` archived to `specs/_archive/` (superseded by canonical `badge.md`/`tag.md`). `@maxa/icons` + `@maxa/hooks` kept as documented reserved placeholders, not removed. Phase 4 (product patterns) is the next milestone but intentionally not started.
- 2026-06-04: Further product pattern work is paused. The active priority is benchmark-parity component coverage against Untitled UI and shadcn component families.
- 2026-05-18: Adopted GSD with brownfield-filled templates (no `/gsd:new-project` interview).
- v0.x: Surface model = `bg/page` + `bg/surface` + `bg/float` + `bg/muted` (no shadow tokens unless overlay work requires them). The early `bg/elevated` alias was removed 2026-06-05.
- v0.x: `forwardRef + cva + Slot` pattern locked across components where applicable; Radix primitives are preferred for accessible behavior.

### Pending Todos

(From `.planning/todos/pending/` — captured via `/gsd:add-todo`.)

None yet.

### Blockers / Concerns

- CI-local parity depends on `packages/tokens/src/index.test.ts` validating `packages/tokens/figma/manifest.json` as component token files are added.
- Planning files were synced to the 40-component reality on 2026-06-11 (STATE, ROADMAP, REQUIREMENTS, coverage matrix). Older audit/plan artifacts (`.planning/project-audit-2026-06-05.md`, `.claude/plans/adaptive-shimmying-pine.md`) are superseded by the Phase 3 closeout.
- Visual QA sweep (light, dark, page-background; open-state for menus/listboxes) completed 2026-06-11 — see `.planning/phases/03-application-ui-component-layer/visual-qa-sweep.md`.

### Coverage baseline (2026-06-11, @maxa/ui, vitest v8)

- Statements 90.44% · Branches 83.66% · Functions 92.61% · Lines 93.16%
- Thresholds set ~5pts below baseline in `packages/ui/vitest.config.ts` (regression floor). `pnpm test:coverage` runs it; CI enforces via the Coverage step.
- Lowest-covered units to target next: `tooltip.tsx` (75% stmts), `slider.tsx` (78% stmts).

### Verification status

- CI workflow: ✓ includes Typecheck, Lint, Token audit, Test, Build
- Token audit: ✓ green (`pnpm audit:tokens`)
- TypeScript: ✓ green (`pnpm typecheck`)
- Lint: ✓ green (`pnpm lint`)
- Tests/build: ✓ green via `pnpm typecheck`, `pnpm lint`, `pnpm audit:tokens`, `pnpm test`, and `pnpm build`. A monolithic `pnpm verify` session stopped emitting output after test logs, so the gate was completed through equivalent separate commands.
- Git status before current closeout: dirty with DropdownMenu implementation, docs, tokens, planning updates, and lockfile changes

## Session Continuity

Last session: 2026-06-11
Stopped at: Phase 3 closeout complete — visual QA sweep done, planning docs synced to 40 components, superseded spec archived, placeholders confirmed, dev artifact reverted. Component layer is closed.
Resume file: `.claude/plans/goofy-doodling-gadget.md`
Next milestone: Phase 4 (MAXA product patterns) — not started, awaiting go-ahead.
