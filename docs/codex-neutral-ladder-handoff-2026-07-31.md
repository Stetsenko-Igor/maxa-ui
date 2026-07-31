# Codex handoff: neutral background ladder reconciliation

Status: handoff plan for Claude/Fable execution. Not implemented here.
Date: 2026-07-31.
Repository: `/Users/igorstetsenko/Projects/maxa-ui`.
Related proposal: `docs/plan-neutral-ladder-reconcile-2026-07-31.md`.

## Codex verdict

Claude's plan is directionally correct and should be executed, with two important clarifications:

1. The current problem is not a single bad color value. It is a vocabulary mismatch between CSS, Figma JSON/bundle, and the docs color showcase:
   - CSS has `--color-bg-neutral-on-subtle`, but Figma has `background/bg-neutral-surface`.
   - Figma has `background/bg-neutral-surface` as a duplicate of `background/bg-neutral-subtle`.
   - The docs colors page is hand-maintained and does not prove what is actually exported to CSS/Figma.
2. The final "Separate open item" in Claude's proposal about Alert text is stale as a decision item. The repo has already restored Alert text to `Color modes/text/text-primary`. The old export file `docs/figma-exports/maxa-figma-export-2026-07-31-4.json` still shows six stale live-Figma diffs rebinding Alert text to `text/text-inverse`; do not use those six diffs as desired source-of-truth changes.

## Current verified repo state

Observed on `main`:

- `packages/tokens/src/semantic.css`
  - light: `--color-bg-neutral-subtle: var(--color-neutral-100)`
  - light: `--color-bg-neutral-on-subtle: var(--color-neutral-200)`
  - light: `--color-bg-neutral-muted: var(--color-neutral-200)`
  - light: `--color-bg-neutral-strong: var(--color-neutral-800)`
  - dark: `--color-bg-neutral-subtle: var(--color-neutral-800)`
  - dark: `--color-bg-neutral-on-subtle: var(--color-neutral-700)`
  - dark: `--color-bg-neutral-muted: var(--color-neutral-700)`
  - dark: `--color-bg-neutral-strong: var(--color-neutral-400)`
  - missing: `--color-bg-neutral-on-muted`
- `packages/tokens/figma/import-bundle.json`
  - light: `background/bg-neutral-subtle = {Colors.Neutral.100}`
  - light: `background/bg-neutral-surface = {Colors.Neutral.100}`
  - light: `background/bg-neutral-muted = {Colors.Neutral.200}`
  - light: `background/bg-neutral-strong = {Colors.Neutral.800}`
  - dark: `background/bg-neutral-subtle = {Colors.Neutral.800}`
  - dark: `background/bg-neutral-surface = {Colors.Neutral.800}`
  - dark: `background/bg-neutral-muted = {Colors.Neutral.700}`
  - dark: `background/bg-neutral-strong = {Colors.Neutral.400}`
  - missing: `background/bg-neutral-on-subtle`
  - missing: `background/bg-neutral-on-muted`
- `packages/tokens/src/component-table.css`
  - `--table-header-bg` currently uses `var(--color-bg-muted)`, which resolves to the generic elevation token, not the neutral ladder.
- `packages/tokens/figma/component-table.json`
  - `header-bg` currently uses `var(--color-bg-muted)` and bundle output resolves it to `{Color modes/background/bg-muted}`.
- `.knowledge/Figma Plugins/MAXA Token Importer/code.js`
  - has a `MIGRATIONS.variables` map that can rename variables in-place before import.
  - this should be used to preserve Figma variable IDs.
- `apps/docs/app/docs/foundations/colors/page.tsx`
  - contains hard-coded React arrays (`NEUTRAL_SCALE`, `BG_GROUPS`, etc.).
  - it is not generated from the token source, so it can drift silently.

## Recommended canonical vocabulary

Use one neutral background ladder across CSS, Figma, and docs:

| Role | Light alias | Dark alias | Meaning |
| --- | --- | --- | --- |
| `bg-neutral-subtle` | `Colors.Neutral.100` | `Colors.Neutral.800` | lowest neutral tint |
| `bg-neutral-on-subtle` | `Colors.Neutral.200` | `Colors.Neutral.700` | element placed on subtle neutral |
| `bg-neutral-muted` | `Colors.Neutral.200` | `Colors.Neutral.700` | semantic muted fill; value duplicate accepted for now |
| `bg-neutral-on-muted` | `Colors.Neutral.300` | `Colors.Neutral.600` | new step for table headers / wells |
| `bg-neutral-strong` | `Colors.Neutral.800` | `Colors.Neutral.400` | strong neutral fill |

Do not keep `bg-neutral-surface` as a parallel token. It duplicates `subtle`, conflicts with CSS/docs vocabulary, and currently has no useful consumer role. Rename it in-place to `bg-neutral-on-subtle`.

Important nuance: the `on-subtle` and `muted` value duplication is ugly but intentional for this PR. They are different semantic roles and can be rationalized later only after a live Figma consumer scan. Do not solve that bigger cleanup here.

## Implementation instructions

### 1. Update Figma token sources

Files:

- `packages/tokens/figma/colors-semantic-light.json`
- `packages/tokens/figma/colors-semantic-dark.json`

Change:

- Rename `bg-neutral-surface` to `bg-neutral-on-subtle`.
- Set the renamed token values:
  - light: `{Colors.Neutral.200}`
  - dark: `{Colors.Neutral.700}`
- Add `bg-neutral-on-muted`:
  - light: `{Colors.Neutral.300}`
  - dark: `{Colors.Neutral.600}`
- Keep `bg-neutral-subtle`, `bg-neutral-muted`, and `bg-neutral-strong`.
- Keep descriptions concise and semantic. Suggested:
  - `bg-neutral-on-subtle`: `Neutral fill placed on a subtle neutral background.`
  - `bg-neutral-on-muted`: `Neutral fill one step above muted, used for table headers and wells.`

### 2. Update CSS semantic tokens

File:

- `packages/tokens/src/semantic.css`

Change:

- Add `--color-bg-neutral-on-muted: var(--color-neutral-300);` in the light neutral ladder.
- Add `--color-bg-neutral-on-muted: var(--color-neutral-600);` in the dark neutral ladder.
- Keep `--color-bg-neutral-on-subtle` as-is.
- Do not add `--color-bg-neutral-surface`.

### 3. Rebind Table header to the new ladder step

Files:

- `packages/tokens/src/component-table.css`
- `packages/tokens/figma/component-table.json`

Change:

- Replace both `--table-header-bg: var(--color-bg-muted)` declarations with `--table-header-bg: var(--color-bg-neutral-on-muted)`.
- Replace Table `header-bg` source with the same semantic role so bundle output becomes:
  - `{Color modes/background/bg-neutral-on-muted}`

### 4. Add importer migration for live Figma ID preservation

File:

- `.knowledge/Figma Plugins/MAXA Token Importer/code.js`

Add to `MIGRATIONS.variables`:

```js
'Color modes/background/bg-neutral-surface': 'Color modes/background/bg-neutral-on-subtle',
```

This must run before the import creates/updates variables. If the plugin logs that the migration was skipped because the target already exists, stop and inspect live Figma before publishing. That would mean the library has both old and new variables and needs a manual merge decision.

### 5. Regenerate bundle/reference artifacts

Run:

```bash
pnpm figma:bundle
pnpm tokens:reference
```

Expected bundle facts after regeneration:

- `background/bg-neutral-surface` no longer exists.
- `background/bg-neutral-on-subtle` exists in Light and Dark.
- `background/bg-neutral-on-muted` exists in Light and Dark.
- `Component-based/Table/header-bg` aliases `{Color modes/background/bg-neutral-on-muted}`.

### 6. Make the docs colors page trustworthy

Preferred implementation:

- Extend `scripts/generate-tokens-reference.mjs` to emit generated color-doc data from token sources.
- Render `apps/docs/app/docs/foundations/colors/page.tsx` from that generated data instead of hand-maintained arrays.
- The page must show at least:
  - CSS variable name
  - semantic group
  - light alias / resolved hex
  - dark alias / resolved hex
  - the neutral ladder including `neutral-on-muted`

If this feels too large for the same PR, split it into a second PR. But do not claim the Storybook/Netlify colors page is fixed until the docs page is generated or otherwise guarded by tests.

### 7. Add tests/guards

Add or update tests in `packages/tokens/src/index.test.ts`:

- Background parity:
  - CSS has `--color-bg-neutral-on-subtle` and Figma has `background/bg-neutral-on-subtle`.
  - CSS has `--color-bg-neutral-on-muted` and Figma has `background/bg-neutral-on-muted`.
  - neither CSS nor Figma has `bg-neutral-surface`.
- Table header:
  - CSS uses `var(--color-bg-neutral-on-muted)`.
  - bundle has `Component-based/Table/header-bg = {Color modes/background/bg-neutral-on-muted}`.
- Broader semantic parity, if low-risk:
  - for text, border, action, foreground, background, and control, assert bidirectional CSS/Figma name parity.
  - keep any exceptions explicit and documented; do not silently allow whole groups to drift.

Existing tests already guard that Color modes COLOR values are aliases rather than raw literals. Keep that guard.

## Verification commands

Run:

```bash
pnpm verify
```

Also run targeted checks:

```bash
node packages/tokens/scripts/diff-figma-export.mjs docs/figma-exports/maxa-figma-export-2026-07-31-4.json
```

Before the next Figma import, this diff may still show the six stale Alert text diffs from the old export. Do not treat those as desired changes. After Igor imports the updated bundle with the plugin and exports again, the final diff against the fresh export must be zero in all categories.

## Expected Figma workflow after merge

1. Merge PR.
2. Igor opens plugin and runs `Load latest from GitHub`.
3. Import settings:
   - stale variables: OFF
   - stale modes: ON
   - recreate wrong type: OFF
4. Confirm importer log:
   - migration from `Color modes/background/bg-neutral-surface` to `Color modes/background/bg-neutral-on-subtle` ran, or source did not exist anymore.
   - no skipped migration due to target collision.
   - no recreated variables.
5. Export variables from Figma.
6. Run diff against the fresh export.
7. Required final result:
   - `0 collection`
   - `0 mode`
   - `0 value`
   - `0 type`
   - `0 scope`
   - `0 description`
8. Only then publish Foundation and verify one consuming file.

## What not to do

- Do not add `bg-neutral-surface` to CSS just to match Figma. That would preserve the wrong duplicate.
- Do not delete/recreate live Figma variables manually. Use the importer migration to preserve IDs.
- Do not touch Alert text aliases in this PR.
- Do not clean up all `*-surface` intent tokens in this PR.
- Do not touch Utility color families.
- Do not treat the current docs colors page as a source of truth until it is generated or guarded.
