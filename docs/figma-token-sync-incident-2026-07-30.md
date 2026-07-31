# Figma token architecture repair — 2026-07-30

## Outcome

The repository and the live `[MAXA] Foundation` Figma file now use one theme switch:

- `Primitives`: one `Value` mode
- `Color modes`: `Light` and `Dark`
- `Component-based`: one `Default` mode

Live Figma validation after the migration:

- 8 collections
- 1,632 variables
- 230 variables in `Color modes`
- 1,026 variables in `Component-based`
- 0 missing `Component-based / Default` values
- 0 raw Component-based COLOR values
- 0 literal CSS `var(--...)` strings in Component-based
- all 1,026 Component-based variable IDs preserved

The generated repository bundle contains the same collection counts and mode structure:

- 1,632 variables
- 1,950 per-mode values
- 1,271 alias values
- 0 unresolved CSS expressions

## Where colors are changed now

Theme selection belongs only to `Color modes`.

- Shared semantic roles: `colors-semantic-light.json` and `colors-semantic-dark.json`
- Reusable feedback and component-support roles: `colors-feedback-light.json` and `colors-feedback-dark.json`
- Extended hue roles: `colors-utility-light.json` and `colors-utility-dark.json`
- Stable component aliases and layout/typography values: mode-neutral `component-*.json` files

For example:

`Component-based/Alert/color/info/bg`
→ `Color modes/feedback/info/bg`
→ a Light semantic alias or the approved Dark color

Neutral and Emphasize use dedicated feedback roles so shared background-token changes cannot accidentally restyle Alert:

- `Component-based/Alert/color/neutral/bg` → `Color modes/feedback/neutral/bg` → `Primitives/Colors/Base/White` in Light and `Primitives/Colors/Neutral/900` in Dark
- `Component-based/Alert/color/emphasize/bg` → `Color modes/feedback/emphasize/bg` → `Primitives/Colors/Neutral/50` in Light and `Primitives/Colors/Neutral/950` in Dark

The shared soft-focus border keeps its exact deployed color through an explicit primitive:

- `Color modes/border/border-focus-soft` → `Primitives/Colors/Blue/150` (`#C7E5F0`) in both modes

The Light info background now also resolves through the deployed primitive value:

- `Color modes/feedback/info/bg` → `Primitives/Colors/Blue/50` (`#E0F2FF`)

The Figma primitive previously stored `#EFF6FF`, while the CSS source and deployed Netlify build
used `#E0F2FF`. Updating the primitive closes that drift for all five Light semantic consumers.

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

The published Alert uses an established palette in both themes. Replacing it with the nearest shared semantic colors changed the visual result and was therefore incorrect. The repaired component roles preserve the deployed Netlify appearance without reintroducing a second Component-based mode.

Published Light values:

| Intent | Background | Border | Accent | Text |
| --- | --- | --- | --- | --- |
| Info | `#E0F2FF` | `#96CEFD` | `#0054B6` | `#1B1A1A` |
| Success | `#F0FDF4` | `#86EFAC` | `#166534` | `#1B1A1A` |
| Warning | `#FFF7ED` | `#FED7AA` | `#C2410C` | `#1B1A1A` |
| Error | `#FEF2F2` | `#FECACA` | `#B91C1C` | `#1B1A1A` |

Published Dark values:

| Intent | Background | Border | Accent | Text |
| --- | --- | --- | --- | --- |
| Info | `#003877` | `#0059C2` | `#54A3F6` | `#F4F3F3` |
| Success | `#044329` | `#006D0F` | `#2BB47D` | `#F4F3F3` |
| Warning | `#521D00` | `#B44E00` | `#E16D00` | `#F4F3F3` |
| Error | `#7B0000` | `#D71913` | `#FF755E` | `#F4F3F3` |

The four intent feedback roles preserve their approved values exactly. Neutral and Emphasize preserve their current appearance through dedicated reusable feedback roles:

- Neutral background resolves directly from primitives to `#FFFFFF` in Light and `#2A2A2B` in Dark;
- Emphasize background resolves directly from primitives to `#F5F6FA` in Light and `#1A1919` in Dark.

This deliberately avoids transitive coupling to `background/bg-surface` and `background/bg-page`.

Alert component variables expose these roles through the single `Component-based / Default` mode.

## Live Figma migration safety

Before mutation, the Foundation file was scanned for mode and variable consumers:

- no node explicitly applied `Component-based / Dark`;
- 12 Alert layers directly referenced four `border-*-subtle` compatibility variables;
- those four variables were retained to avoid breaking existing node bindings;
- the duplicate `Color modes/component/*` variables were consumed only by two local Alert test sets: one Light set and one Dark set, with 12 variants each;
- these page-level test components are compatibility fixtures, not the production Alert source of truth;
- a third test set linked to external library variables did not consume the duplicate namespace and was left untouched.

Because named version-history creation is unavailable in the current Figma plugin runtime, a rollback snapshot was stored locally at:

`/private/tmp/maxa-foundation-restore-2026-07-30/`

The migration then:

- replaced 37 duplicate `Color modes/component/*` variables with 34 reusable semantic feedback and support roles;
- created 89 extended utility roles in `Color modes`;
- rebound 131 existing Component-based variables without recreating them;
- renamed `Component-based / Light` to `Default`, preserving mode ID `14:0`;
- removed the redundant `Component-based / Dark` mode;
- preserved all 1,026 Component-based variable IDs;
- rebound only the color properties of the 24 local Alert test variants to `Component-based/Alert` variables, including root fills, borders, accent vectors, and text;
- deleted the 37 duplicate variables only after a scan of all eight pages reported zero alias consumers and zero canvas consumers.

No Alert structure, layout, content, component properties, or variants were changed. The test page is not used to define or validate the production Alert component; the token files and variable alias graph are the source of truth for this migration.

## Repository safeguards

`build-figma-import-bundle.mjs` now rejects:

- any Component-based mode structure other than one `Default` mode;
- legacy `component-*-light.json` and `component-*-dark.json` sources;
- raw Component-based COLOR values;
- missing modes, unresolved aliases, alias cycles, type drift, and unsupported CSS expressions.

MAXA Token Importer v11 adds explicit stale-mode cleanup. A regression test verifies that Light/Dark collapses to Default without recreating variables.

The bundle builder also rejects any future `component/*` namespace inside `Color modes`, so component names remain exclusively in `Component-based`.

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
