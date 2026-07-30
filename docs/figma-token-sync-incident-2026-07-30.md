# Figma token architecture repair — 2026-07-30

## Outcome

The repository and the live `[MAXA] Foundation` Figma file now use one theme switch:

- `Primitives`: one `Value` mode
- `Color modes`: `Light` and `Dark`
- `Component-based`: one `Default` mode

Live Figma validation after the migration:

- 8 collections
- 1,634 variables
- 233 variables in `Color modes`
- 1,026 variables in `Component-based`
- 0 missing `Component-based / Default` values
- 0 raw Component-based COLOR values
- 0 literal CSS `var(--...)` strings in Component-based
- all 1,026 Component-based variable IDs preserved

The generated repository bundle contains the same collection counts and mode structure:

- 1,634 variables
- 1,955 per-mode values
- 1,265 alias values
- 0 unresolved CSS expressions

## Where colors are changed now

Theme selection belongs only to `Color modes`.

- Shared semantic roles: `colors-semantic-light.json` and `colors-semantic-dark.json`
- Theme-aware component roles: `colors-component-light.json` and `colors-component-dark.json`
- Extended hue roles: `colors-utility-light.json` and `colors-utility-dark.json`
- Stable component aliases and layout/typography values: mode-neutral `component-*.json` files

For example:

`Component-based/Alert/color/info/bg`
→ `Color modes/component/alert/info/bg`
→ a Light semantic alias or the approved Dark color

Switching `Color modes` is therefore sufficient. `Component-based` no longer has a second theme switch.

## Why two Component-based modes existed

This was not introduced only in the live Figma file and was not created today.

- Commit `f85bb91` (2026-04-23) introduced the component token collection with separate Button Light/Dark JSON files.
- Commit `0b6e67e` (2026-05-31) renamed the collection to `Component-based` and moved the extended utility palette into it, while retaining both modes.

That design was workable but redundant. Most component values referenced the same semantic alias in both modes; the real theme difference already lived in `Color modes`. Before this repair, 969 of 1,026 Component-based variables had identical Light/Dark values. The remaining differences were concentrated in Utility, Dialog overlay, and two Dropdown Menu states.

## Why values appeared as text

The component JSON mixed Figma alias syntax (`{Collection/path}`) with CSS syntax (`var(--token)`). The old bundle generator converted only part of the CSS references and discarded some declared token types. The importer then created remaining expressions as Figma `STRING` variables.

The importer also previously:

1. assigned mixed alias/literal values based on the first mode;
2. failed safely when a stale variable existed with the wrong type;
3. could add and rename modes but could not remove stale modes.

Importer v11 now performs typed preflight, resolves known CSS references, assigns every mode independently, and can remove modes missing from the source bundle.

## Alert visual parity

The published Alert dark theme uses a bespoke palette. Replacing it with the nearest shared semantic colors changed the visual result and was therefore incorrect.

The repaired Color modes roles preserve the published values:

| Intent | Background | Border | Accent | Text |
| --- | --- | --- | --- | --- |
| Info | `#003877` | `#0059C2` | `#54A3F6` | `#F4F3F3` |
| Success | `#044329` | `#006D0F` | `#2BB47D` | `#F4F3F3` |
| Warning | `#521D00` | `#B44E00` | `#E16D00` | `#F4F3F3` |
| Error | `#7B0000` | `#D71913` | `#FF755E` | `#F4F3F3` |

Neutral and Emphasize values are also preserved exactly. Alert component variables now alias these theme-aware Color modes roles in the single Default mode.

## Live Figma migration safety

Before mutation, the Foundation file was scanned for mode and variable consumers:

- no node explicitly applied `Component-based / Dark`;
- 12 Alert layers directly referenced four `border-*-subtle` compatibility variables;
- those four variables were retained to avoid breaking existing node bindings;
- no component masters or test components were edited during this migration.

Because named version-history creation is unavailable in the current Figma plugin runtime, a rollback snapshot was stored locally at:

`/private/tmp/maxa-foundation-restore-2026-07-30/`

The migration then:

- created 37 theme-aware component roles in `Color modes`;
- created 89 extended utility roles in `Color modes`;
- rebound 131 existing Component-based variables without recreating them;
- renamed `Component-based / Light` to `Default`, preserving mode ID `14:0`;
- removed the redundant `Component-based / Dark` mode;
- preserved all 1,026 Component-based variable IDs.

## Repository safeguards

`build-figma-import-bundle.mjs` now rejects:

- any Component-based mode structure other than one `Default` mode;
- legacy `component-*-light.json` and `component-*-dark.json` sources;
- raw Component-based COLOR values;
- missing modes, unresolved aliases, alias cycles, type drift, and unsupported CSS expressions.

MAXA Token Importer v11 adds explicit stale-mode cleanup. A regression test verifies that Light/Dark collapses to Default without recreating variables.

## Review of Claude's changes today

### PR #16 — partial CSS-reference conversion and export/diff workflow

Correct direction: it identified literal `var(--...)` values, fixed several alias conversions, and introduced a useful read-only Figma export/diff workflow.

Gap: unresolved cross-component/scalar references and incomplete type information were still allowed into the generated bundle. The current builder makes those conditions build failures.

### PR #17 — confirmed manual primitive, semantic, and Layout edits

Correct. Confirmed primitive values, the dark `bg-page` alias, and Layout naming changes were applied to code.

### PR #18 — missing Utility dark-mode values

Correct diagnosis for the old two-mode architecture: Figma has no CSS cascade, so every mode needed an explicit value. The cleaner repair moves those theme differences into `Color modes` and keeps Component-based Utility IDs as single-mode aliases.

### PR #19 — stale-type recreation and per-mode assignment

Per-mode assignment was correct and is retained. Wrong-type recreation is now guarded by preflight and explicit opt-in because recreating a variable changes its ID.

### PR #20 — semantic control colors and Alert follow-up

Checkbox, Radio, and Toggle correctly moved toward semantic control roles. The first Alert follow-up removed raw colors but mapped them to approximate shared roles, changing the published dark appearance. The final repair keeps the clean alias chain while preserving the exact Alert palette in theme-aware Color modes roles.

## Publishing

The Foundation file contains unpublished library changes. Publishing remains a manual Figma action. The repository branch and PR must be reviewed and pushed before using **Load latest from GitHub** in the importer; the importer URL intentionally reads `main`.
