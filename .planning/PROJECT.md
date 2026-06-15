# MAXA UI

## What This Is

An agent-readable design-system platform for MAXA: design tokens, React components, LLM-readable specs, docs/catalog pages, Figma handoff, and production-grounded MAXA product patterns that together prevent agents and humans from fabricating design values or generic UI surfaces. Distributed as a private monorepo with public packages (`@maxa/ui`, `@maxa/tokens`, `@maxa/icons`, `@maxa/hooks`, `@maxa/cli`, `@maxa/mcp`).

## Core Value

LLM-generated UI code always conforms to the design system and the real MAXA product surface — no `padding: 13px`, no `#3b82f6`, no off-scale radius, no generic dashboard shells when a MAXA pattern exists. Every design value resolves to a documented token, and every reusable layout should resolve to an approved component or product pattern.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ **Three-tier token architecture** (primitives → semantic → component) — shipped in M0 (2026-04-21..23)
- ✓ **Eight core components** (Button, IconButton, Input, Select, DatePicker, Checkbox, Radio, FormField) — shipped in M1 (2026-04-24..2026-05-13)
- ✓ **Audit script** (`scripts/audit-tokens.mjs`) blocks hardcoded design values in CI — shipped in M0
- ✓ **Dark mode runtime** via `[data-theme="dark"]` with token overrides in `packages/tokens/src/themes/maxa.css` — shipped in M0
- ✓ **Figma token bundle** (`pnpm figma:bundle` → `packages/tokens/figma/import-bundle.json`) — shipped in M0
- ✓ **Surface model + neutral palette polish** (`bg/surface`, `bg/elevated`, semantic spacing, breakpoints, border-subtle) — shipped in M2 (2026-05-13..15)
- ✓ **LLM-readable spec layer** at `specs/` (foundations, components, patterns, tokens-reference) — shipped in M1

### Active

<!-- Current scope. Building toward these. Populated when Igor picks Phase 1 work. -->

- **Phase 4: MAXA product patterns** — active next scope. Start with product pattern inventory and priority map, then implement the first product-pattern tranche grounded in real MAXA screenshots/routes.
- **Expanded platform target** — accepted 2026-06-04. MAXA UI should be closer in ambition to Untitled UI / shadcn/ui, but grounded in MAXA's production product inventory. The current component layer is complete; the roadmap now moves into MAXA product patterns, Figma Code Connect, and release stabilization. The Tailwind adapter is post-core adoption work, not the next main objective.
- **CI quality gate** — `pnpm verify` mirrors GitHub Actions: `typecheck → lint → audit:tokens → tokens:reference:check → test → build → pack:smoke`. Token audit blocks hardcoded hex values and direct primitive-token usage in component code. `pack:smoke` verifies packed entrypoints plus a temporary Vite consumer build.

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- **Shadow / elevation tokens** — design intentionally uses "gray page + white surface" hierarchy (School A aesthetic). Revisit only if an overlay component genuinely needs depth (e.g., during Phase 2 Popover/Tooltip work).
- **Motion / animation tokens** — deferred until a component needs guided motion. Premature to define without a use case.
- **Z-index / stacking-context tokens** — implicit per component today. Revisit when overlay components arrive.
- **Registry release / versioning** — do not run `pnpm changeset version` or publish packages unless Igor explicitly enters release mode and names the target registry/package set. Pending Changesets are release notes only.
- **OAuth / external auth tokens** — design system has no auth scope. Out of project bounds.

## Context

- **Repo:** Turborepo + pnpm workspaces, Node ≥ 20. Private GitHub repo.
- **Packages:** `@maxa/ui` (React components), `@maxa/tokens` (CSS variables + TS constants), `@maxa/icons`, `@maxa/hooks`, `@maxa/cli`, `@maxa/mcp`.
- **Apps:** `apps/docs` — Next.js 15 + Tailwind v4, live previews for foundations and all 8 components.
- **Design contracts:** live in `specs/` (foundations, components, patterns). `specs/` says **what**; `.planning/` says **when / in what order**.
- **Product reference:** MAXA product UI inventory and screenshots are mandatory context before creating app-level components or product patterns. The design system must model the real product, not generic SaaS placeholders.
- **Figma:** token source lives in `packages/tokens/figma/`. The MAXA Token Importer plugin (`.knowledge/Figma Plugins/MAXA Token Importer/`) fetches `import-bundle.json` from GitHub Raw — push first, then import.
- **Release flow:** Changesets (`@changesets/cli`). Pending entries are allowed as release notes, but versioning/publishing is gated by `docs/release-policy.md`.
- **Parallel agents:** Both Claude Code and Codex operate on this repo. Both read `.planning/` and `specs/` at session start.

## Constraints

- **Tech stack:** Turborepo + pnpm ≥ 9 + Node ≥ 20 — locked.
- **Component pattern:** `forwardRef + cva + Slot` (Radix). Reference implementation: `packages/ui/src/components/button/`.
- **Styling:** CSS custom properties only. No inline styles for design values. No Tailwind utility classes for design values inside `@maxa/ui` (Tailwind is allowed in `apps/docs` consumption).
- **Token hygiene:** Components consume semantic or component tokens only — never raw primitives or hardcoded values. Enforced by `scripts/audit-tokens.mjs`.
- **One primary button per view** — see `specs/patterns/interactive-hierarchy.md`.
- **Spec-first workflow:** before writing any component, the spec file in `specs/components/<name>.md` must exist.
- **Dark mode contract:** token overrides live in `[data-theme="dark"]` selector inside `packages/tokens/src/themes/`. Components never write dark selectors.

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision                                                                                                          | Rationale                                                                                                                                                                  | Outcome              |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Three-tier tokens (primitive → semantic → component)                                                              | Prevents agents from referencing raw values; gives a stable rename surface                                                                                                 | ✓ Good               |
| Spec-first workflow under `specs/`                                                                                | LLMs fabricate design values; specs give grounded context                                                                                                                  | ✓ Good               |
| `forwardRef + cva + Slot` pattern across all components                                                           | Single shape simplifies review, audit, and authoring                                                                                                                       | ✓ Good               |
| CSS custom properties as runtime contract (no CSS-in-JS)                                                          | Universal consumer support; trivial theme switching                                                                                                                        | ✓ Good               |
| Surface model: `bg/surface` (white) + `bg/elevated` (one step up) — no shadows                                    | School A aesthetic; testable without elevation tokens                                                                                                                      | ✓ Good               |
| `pnpm verify` mirrors CI (`typecheck && lint && audit:tokens && test && build`)                                   | One local command answers "will this pass GitHub Actions?"                                                                                                                 | ✓ Good               |
| Brownfield GSD initialization (templates filled manually from existing reality, not `/gsd:new-project` interview) | Existing code and specs already encode requirements; the interview would re-derive what's already known                                                                    | — Pending evaluation |
| MAXA UI targets a full design-system platform, not a minimal component package                                    | Igor accepted the Untitled UI / shadcn-level ambition on 2026-06-04; MAXA needs base components, app components, product patterns, docs/catalog, and Figma handoff         | Accepted             |
| Tailwind adapter is post-core adoption work                                                                       | It helps external consumers use MAXA tokens in Tailwind, but it does not replace the core component/pattern catalog                                                        | Accepted             |
| Package readiness is not release mode                                                                             | Igor explicitly stopped accidental versioning on 2026-06-15; package smoke/docs can improve, but `pnpm changeset version` and publishing require explicit release approval | Accepted             |

---

_Last updated: 2026-06-15 after package-readiness hardening and Phase 4 next-plan sync_
