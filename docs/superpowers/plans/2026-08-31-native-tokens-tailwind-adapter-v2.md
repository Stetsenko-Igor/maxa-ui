> **Supersedes** `2026-08-31-native-tokens-tailwind-adapter.md` (v1) after codebase review.
> v1 is still required: this revision reuses its verbatim test fixtures, generator code, and adapter package manifest.
> Where this file says "take the original plan's Task N as written", read v1.

# Browser-Native Tokens, White-Label Unblock, and a Deferred Tailwind Adapter

Revision of `docs/superpowers/plans/2026-08-31-native-tokens-tailwind-adapter.md` after codebase review.
Rollback tag `pre-tailwind-token-refactor-2026-08-29` verified present locally and on `origin` (annotated `8b49ba1`, commit `825c7e6`).

---

## Context

### The defect is real

`packages/tokens/src/primitives.css:5`, `themes/maxa.css:5`, `dimensions.css:5`, and `typography.css:5` declare foundation variables inside Tailwind v4 `@theme {}` blocks. A browser without a Tailwind build treats `@theme` as an unknown at-rule and drops the whole block. That kills 226 primitive declarations plus the 11-value brand scale, so the 242 semantic roles in `semantic.css` and the 1145 component tokens across 38 files all resolve to nothing. The system is silently unstyled for any consumer that is not running Tailwind v4.

Both test suites hide this by rewriting the at-rule before injecting CSS: `packages/tokens/src/index.test.ts:1871` and `packages/ui/src/base-tokens.test.tsx:33` both do `.replace(/@theme\s*\{/g, ":root {")`.

### Igor's question: does going native move us away from Untitled UI?

No. That move already happened, and this plan does not deepen it.

Untitled UI React is Tailwind-utilities-in-JSX plus copy-owned source distributed by a CLI. MAXA UI is none of that, already:

- 42 components, 90 `.tsx` files: **zero** Tailwind utility classes. Styling is strict BEM (`maxa-button--primary`), cva maps modifier to modifier (`packages/ui/src/components/button/button.tsx:9-46`), runtime state lives in `data-*` attributes.
- 39 co-located component stylesheets: `var(--token)` only, **zero** `@apply` anywhere in the repo.
- `packages/ui/package.json`: `tailwindcss` is not a dependency, peer, or devDependency. No PostCSS in its build (`tsc` + `scripts/copy-css-assets.mjs`). No `tailwind.config.*` exists in the repo.
- `apps/docs`, the only Tailwind consumer, uses **zero** Tailwind utility classes in its 113 `.tsx` files. Every `className` is a `maxa-*` or `docs-*` class; layout is inline `style={{}}` over CSS variables. Tailwind's only jobs there are preflight reset and making `@theme` emit.

What MAXA actually inherits from Untitled UI is the **design language and token taxonomy**, and this refactor touches none of it: the 7-level shadow scale (`packages/tokens/src/shadows.css:2`), the `text/fg/bg/border` role model (`docs/color-token-naming-migration-2026-07.md:20`), size-based type naming, `primary/secondary/tertiary` neutral hierarchy. Those are the parts worth keeping. `@theme` is not one of them — it is a build-tool at-rule that leaked into the published contract.

### Why native CSS makes the external-product goal more achievable, not less

Igor's own prior decision already says this, in `.knowledge/Docs Layout Unification — Session 2026-05-07.md:72`: "MAXA is currently token-first, not Tailwind-first. This is correct for a reusable design system intended to be adapted to other brands or clients."

Concretely, for handing the system to a client:

- Token-first plus native `:root` runs in React, Vue, Angular, Rails, Astro, plain HTML. Tailwind-first only runs where the client has adopted Tailwind v4.
- Re-branding is already designed as an 11-value swap. `--color-brand-*` is defined only in `themes/maxa.css` and referenced only by 26 lines of `semantic.css`; **no** `component-*.css` file references it. But today that swap requires the client to run Tailwind, because the values it must override live in `@theme`. With `:root`, an override file is a plain CSS import and CSS custom properties resolve at use time, so declaration order does not even matter. **The native conversion is what turns documented white-label intent into a deliverable feature.**

### What actually blocks selling this outside MAXA (none of it is Tailwind)

1. Nothing is published to any registry, and `README.md:117` documents that the obvious git install does not work because `dist/` is built by repo-level scripts.
2. The `.maxa-*` class prefix is hardcoded in ~437 places. A client can re-colour but cannot re-name or fork components. Formally DEFERRED at `specs/README.md:87-105`.
3. The custom-brand recipe printed in `packages/tokens/src/theme.css:4-9` cannot be executed: the exports map omits `motion.css` and all 38 `component-*.css`, so a client following it gets unstyled components.
4. `@maxa/tokens` is a **devDependency** of `@maxa/ui` while `docs/package-contracts.md` and `packages/ui/README.md:8` both call it a peer. A client installing `@maxa/ui` gets no styles and no warning.
5. Nothing ships a reset. Preflight exists only inside `apps/docs`.
6. `packages/tokens/src/tokens.ts` is a hand-maintained duplicate of the CSS values, brand-unaware, with no generator.
7. Token names occupy Tailwind's own namespace (`--color-*`, `--text-*`, `--spacing-*`, `--radius-*`, `--font-*`, `--breakpoint-*`), so a client with their own Tailwind theme gets a split brain.

Items 3, 4, and 5 are cheap and land here. Items 1, 2, 6, 7 stay out of scope and are recorded below.

### Verdict on the original plan

The diagnosis, rollback discipline, and zero-diff gates are all sound and are kept. Four changes:

- **Split into two PRs.** The original Task 5 moves `apps/docs` onto the new adapter, which imports both a native `:root` layer and a Tailwind-generated `@theme` layer. That is the only step in the plan carrying real regression risk, and it buys dogfooding rather than correctness. Since docs uses zero Tailwind utilities, it should render identically after the native conversion with no change at all — which PR1 verifies as a gate rather than assumes.
- **Resolve the contradiction the plan walks past.** `.planning/PROJECT.md:33` states "The Tailwind adapter is **cancelled** — the MAXA product stack has no Tailwind (confirmed with the product team)", and `specs/architecture.md:51` states "Do not create `@maxa/tailwind` yet." The plan proposes building it without acknowledging either. PR2 must reverse both records explicitly, justified by the external-client goal rather than by an internal need.
- **Fix a masked regression risk.** The original Task 2 deletes the duplicate `:root` block in `typography.css:36`. That block is not redundant; the comment at `typography.css:32-35` records it as a workaround for Tailwind v4 compounding `@theme` font-size entries into `"size / line-height"`, which is invalid in `font-size: var(--text-sm)`. Deleting it is safe in PR1 (no `@theme` remains). PR2 reintroduces the exposure and must assert against it.
- **Add the white-label items.** Items 3, 4, 5 above, plus a Chromium test that actually swaps a brand.

Confirmed as correct in the original plan: plain `@theme` over `@theme static` in the adapter (native `:root` guarantees every runtime variable, so tree-shaking utilities is the right default — this is also why `dimensions.css:66-68` had to hoist non-utility tokens out of `@theme`), and the explicit semantic-utility allowlist over exposing semantic roles through Tailwind's generic colour namespace.

---

## PR 1 — Browser-native tokens and white-label delivery

Goal: `@maxa/tokens` is valid, complete, framework-independent CSS, and a client can re-brand it. No Tailwind package, no docs migration, no visual change.

### Task 1.1 — Red tests for the native contract

Files: `packages/tokens/src/index.test.ts`, `packages/ui/src/base-tokens.test.tsx`, create `packages/tokens/e2e/native-runtime.spec.ts` and `packages/tokens/playwright.config.ts`, `packages/tokens/package.json`.

- Structural test: each of `primitives.css`, `themes/maxa.css`, `dimensions.css`, `typography.css` matches `:root\s*\{` and does not match `/@theme\b/`.
- Delete the `@theme` → `:root` substitution from `packages/tokens/src/index.test.ts:1871` and from `packages/ui/src/base-tokens.test.tsx:33`. These substitutions are the reason the defect survived.
- Chromium spec against built `dist/`, fixture importing only `/theme.css`, no Tailwind and no MAXA JavaScript. Assert `--color-bg-page` → `rgb(245, 246, 250)`, `--color-text-primary`, `--button-primary-bg`, `--button-size-md-radius` → `4px`, `--button-size-md-text` → `12px`. Use the original plan's `page.route` fixture verbatim, including its `startsWith(distRoot + sep)` traversal guard.
- Add `@playwright/test` to the package and a `test:browser` script.
- Run and confirm the intended failure before touching any CSS. Commit red.

### Task 1.2 — Convert the four foundation files

Files: `packages/tokens/src/primitives.css`, `themes/maxa.css`, `dimensions.css`, `typography.css`.

- Replace `@theme {` with `:root {` in all four. **Do not merge, reorder, or reflow the adjacent `:root` blocks** in `dimensions.css:70` and `typography.css:36` — a one-line change per file keeps the diff auditable and the zero-diff gates meaningful.
- In `typography.css`, after the wrapper change the later block becomes a byte-identical duplicate; delete it in a **separate commit** so the wrapper change stays reviewable on its own, and re-run `tokens:reference:check` after.
- Update only wrapper-adjacent comments. Specifically retire the now-false lines: `primitives.css:3` "Defined in `@theme {}` — becomes Tailwind utilities if needed", `dimensions.css:2`, `typography.css:2`, and the tree-shaking rationale at `dimensions.css:66-68`.
- Verify no declaration changed: `git diff --word-diff=porcelain` over the four files must show only wrapper and comment words.
- Gates: `pnpm --filter @maxa/tokens test`, `pnpm --filter @maxa/ui test -- base-tokens`, build, `test:browser`, then `pnpm audit:tokens`, `pnpm --filter @maxa/tokens figma:bundle:check`, `pnpm tokens:reference:check`, and `git diff --exit-code -- packages/tokens/figma specs/tokens-reference.md`.

### Task 1.3 — Guard the boundary

Files: `scripts/audit-tokens.mjs`, create `scripts/lib/audit-native-css-directives.mjs` and its `.test.mjs`, `package.json`.

- Pure helper scanning `packages/tokens/src/**/*.css` recursively, reporting every `@theme` and `@utility` as a violation; allowed only under `packages/tailwind`. Take the original plan's implementation.
- Unit test the helper on in-memory samples (one `@theme` sample expects a violation, one `:root` sample expects none).
- Root script `test:audit-native-css` via `node --test`, inserted into `verify` immediately after `audit:tokens`.

### Task 1.4 — Verify docs needs no change (gate, not a change)

Files: none expected.

- Build `@maxa/tokens`, then `pnpm --filter @maxa/docs build`, then `pnpm --filter @maxa/docs test:visual` with `apps/docs/app/globals.css` untouched. The two existing imports stay as they are.
- Expected: static export succeeds and every screenshot passes, because docs uses no Tailwind utilities and Tailwind still supplies preflight while primitives now arrive from `:root`.
- **If any screenshot diffs, stop.** The diff is diagnostic: it means the docs app depended on `@theme` in a way this review did not find, and the adapter question moves back into PR1. Do not update baselines.

### Task 1.5 — Make the custom-brand recipe executable

Files: `packages/tokens/package.json`, create `packages/tokens/src/core.css`, `packages/tokens/src/reset.css`, `packages/tokens/e2e/brand-override.spec.ts`, `packages/tokens/README.md`, `packages/tokens/src/theme.css`.

- Create `core.css`: every import currently in `theme.css` **except** `./themes/maxa.css`. Rewrite `theme.css` as `@import "./core.css"; @import "./themes/maxa.css";` so the two entry points cannot drift. Keep `theme.css` byte-compatible in effect; `index.test.ts` asserts import order, so update that assertion to follow the indirection.
- Extend the exports map with `./core.css`, `./reset.css`, `./motion.css`, and each `./component-*.css`. Generate the component entries from the directory listing in a script rather than hand-listing 38 paths, and assert in `index.test.ts` that every `src/*.css` file has an export entry — that assertion is what stops the next file from being forgotten.
- Create an **opt-in** `reset.css`: `box-sizing: border-box` inheritance, zeroed default margins on heading/paragraph/list elements, `list-style: none` on `ul`/`ol`, `font: inherit` on form controls, `display: block` plus `max-width: 100%` on replaced elements. Keep it minimal and never reference brand or semantic tokens, so it stays safe to load inside a client's existing app. It is not imported by `theme.css` or `core.css`.
- Chromium `brand-override.spec.ts`: fixture imports `/core.css` then an inline `:root { --color-brand-500: #FF6600; --color-brand-600: #CC5200; }`, and asserts an element using `var(--color-text-brand)` computes to the Acme orange rather than MAXA teal. **This is the regression test for the white-label product promise** — it proves a client re-brand works without Tailwind and without touching a component.
- Rewrite the recipe comment at `theme.css:4-9` to the two-line `core.css` + brand form, and mirror it in the README.

### Task 1.6 — Fix the `@maxa/ui` dependency contract

Files: `packages/ui/package.json`, `scripts/smoke-package-entrypoints.mjs`.

- Move `@maxa/tokens` from `devDependencies` to `peerDependencies` (with a `peerDependenciesMeta` entry only if the type-only import at `packages/ui/src/base-tokens.tsx:3` needs it optional at runtime; it does not, so prefer a hard peer). Keep it in `devDependencies` as well for workspace typechecking if pnpm requires it.
- Assert in `pack:smoke` that the packed `@maxa/ui` manifest declares `@maxa/tokens` as a peer with a released range and leaks no `workspace:`, matching the contract already written in `docs/package-contracts.md`.

### Task 1.7 — Documentation

Files: `README.md`, `packages/tokens/README.md`, `packages/ui/README.md`, `docs/package-contracts.md`, `specs/README.md`, `AGENT.md`, `apps/docs/app/docs/introduction/page.tsx`, `apps/docs/app/docs/installation/page.tsx`, `.changeset/browser-native-tokens.md`.

- Default install path is framework-independent: `pnpm add @maxa/ui @maxa/tokens`, then `import "@maxa/tokens/theme.css"`. Answer "Do I need Tailwind?" with "No" in one sentence, at the top.
- Document the client re-brand path as supported: `@maxa/tokens/core.css` + your own brand file, with the 11 `--color-brand-*` values listed.
- Document `reset.css` as opt-in and say what it changes.
- Fix `AGENT.md:5`, which still describes the library as "React + TypeScript + Radix UI + Tailwind v4". After this PR that is wrong in the load-bearing direction.
- Update the Path A paragraph in `specs/README.md:87-105`: Path A is now tested, not merely asserted. Leave Path B DEFERRED and leave the `.maxa-*` prefix untouched.
- Record why variables are not renamed to `--maxa-*`: current names are the existing public contract and a mass rename does not solve the runtime defect. Also record the cost being deferred — these names are Tailwind's namespace, so a client running their own Tailwind gets divergent values for the same key (`--text-sm` is 12px here, `0.875rem` there). Open a separate ADR before any 1.0.
- Changeset: `@maxa/tokens` minor. Describe native CSS behaviour, `core.css`, `reset.css`, new exports. Describe no token or visual change, because none is authorized.

### Task 1.8 — Parity proof and review

- Zero-diff against the rollback tag for `packages/tokens/figma`, `specs/tokens-reference.md`, `packages/ui/src/components`, `packages/ui/src/index.ts`, `apps/docs/e2e/__screenshots__`.
- `pnpm verify`, `pnpm --filter @maxa/tokens test:browser`, `pnpm --filter @maxa/docs test:visual`, `git diff --check`.
- Manual light/dark inspection of the built docs. Confirm dark mode specifically: `[data-theme="dark"]` and `:root` carry identical specificity, so any reordering introduced by the conversion would show up here first. The 201 dark declarations at `semantic.css:293` and the 10 component dark blocks are the surface to check.
- Independent code review, plus a security review of the Playwright `page.route` fixture path handling.

---

## PR 2 — `@maxa/tailwind`, gated on the product decision

Do not start until PR 1 is merged and green. This PR is a bet on external Tailwind-using clients, not on an internal need: `apps/docs` uses zero Tailwind utilities, so there is no in-repo consumer to serve.

### Prerequisite: reverse the existing decisions on the record

- `.planning/PROJECT.md:33` says the adapter is **cancelled**. `specs/architecture.md:47-51` says do not create it yet. Both must be edited to say the adapter exists for external Tailwind consumers as a distribution feature, with the date and the reason. Do not build the package while three contradictory records stand.

### Task 2.1 — Package and generator

Take the original plan's Task 4 as written, with four changes:

- **Split the entry points.** `@maxa/tailwind/theme.css` exports theme mappings only; `@maxa/tailwind/utilities.css` exports the semantic utility allowlist, opt-in. The proposed names (`bg-page`, `bg-muted`, `text-primary`, `border-primary`) are also shadcn/ui's conventions, so a client with an existing shadcn setup would collide. Splitting lets them take MAXA values without the utility names. Document the collision either way.
- **Decide whether to clear Tailwind's defaults.** With `@import "tailwindcss"` followed by the adapter, MAXA's `@theme` overrides matching keys but every non-overlapping Tailwind default survives, so `bg-lime-400` still works and leaks non-MAXA colour into a client's product. Either emit `--color-*: initial;` (and the same for `--text-*`, `--radius-*`, `--spacing-*`, `--font-*`, `--breakpoint-*`) at the top of the generated theme, or document explicitly that Tailwind defaults remain available. Make it a recorded choice, not an omission.
- **Assert against the compound font-size regression.** The generated `@theme` re-emits `--text-sm: 12px` and `--text-sm--line-height: 18px`, which is exactly what the duplicate `:root` block deleted in Task 1.2 existed to guard against. The PostCSS test must assert that compiled output yields a plain `--text-sm: 12px`, and the browser test must assert a real element with `font-size: var(--text-sm)` computes to `12px` under the adapter. Without this, the workaround is removed and its reason forgotten.
- Keep plain `@theme` (not `@theme static`), keep the generator as the only source of adapter values, keep `--check` for drift, keep `@maxa/tokens` as a runtime dependency and `tailwindcss` as a peer.

### Task 2.2 — Test the adapter without migrating docs

- The adapter's own PostCSS compilation test, plus a dedicated Tailwind e2e fixture (its own tiny Vite or PostCSS app) that renders a MAXA component and asserts computed styles.
- Extend `pack:smoke` for the adapter: export resolution ends at `/dist/theme.css`, packed manifest carries a released `@maxa/tokens` range with no `workspace:` leak, and every relative CSS import inside the packed adapter resolves in the installed consumer.
- Migrating `apps/docs` onto the adapter is **optional dogfooding**, and only worth it if the visual baselines pass unchanged. If they diff, keep docs on `tokens/theme.css` and rely on the dedicated fixture. Do not update baselines to make a migration pass.

### Task 2.3 — Docs and release

Tailwind as an optional adapter, never a requirement. Migration note for consumers who currently do `@import "tailwindcss"; @import "@maxa/tokens/theme.css"`: that combination now yields Tailwind's default theme values alongside MAXA variables in `:root`, which is a silent split brain — switch to the adapter or drop Tailwind. Changeset: `@maxa/tailwind` minor from `0.0.0` to `0.1.0`.

---

## Verification

PR 1, in order:

```bash
pnpm --filter @maxa/tokens test            # structural + cross-layer, substitutions removed
pnpm --filter @maxa/ui test -- base-tokens
pnpm --filter @maxa/tokens build
pnpm --filter @maxa/tokens test:browser    # native runtime + brand override, real Chromium
pnpm audit:tokens && pnpm test:audit-native-css
pnpm --filter @maxa/tokens figma:bundle:check && pnpm tokens:reference:check
pnpm --filter @maxa/docs build && pnpm --filter @maxa/docs test:visual   # Task 1.4 gate
pnpm verify && pnpm pack:smoke
git diff --exit-code pre-tailwind-token-refactor-2026-08-29 -- \
  packages/tokens/figma specs/tokens-reference.md \
  packages/ui/src/components packages/ui/src/index.ts apps/docs/e2e/__screenshots__
```

Then deploy through the existing `deploy-docs.yml` workflow and confirm on `https://maxa-ui.netlify.app`: home page renders, installation page shows the framework-independent path first, component pages visually unchanged, browser console free of unresolved CSS import or custom-property errors.

## Out of scope, recorded

Renaming variables to `--maxa-*` (open an ADR before 1.0 — the Tailwind-namespace collision is a real future support cost). Extracting the `.maxa-*` prefix from ~437 places; Path B in `specs/README.md` stays DEFERRED. Generating `packages/tokens/src/tokens.ts` from the CSS instead of hand-maintaining it. Publishing to a registry. Copy-owned component distribution or a MAXA `init`/`add` CLI. Tailwind v3. Any change to token names, token values, Figma JSON, component APIs, or visual baselines.
