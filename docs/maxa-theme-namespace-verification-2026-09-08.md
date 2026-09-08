# MAXA theme and namespace verification — 2026-09-08

## Recovery and delivery

Checkpoint: `pre-maxa-theme-namespace-2026-09-08` at `80a2bd7`.
Work branch: `refactor/maxa-theme-namespace`.

The new distribution is additive. Canonical token declarations, Figma identities/values,
existing React APIs and generic package exports are unchanged. The documentation
app continues using its existing generic delivery; new clients can opt into the
matched namespaced entries.

## Architecture verified

- Rule-only `packages/tokens/theme-ownership.json` partitions all 1,740 logical
  tokens: 1,079 shared palette/component recipes and 661 complete MAXA choices.
  No token belongs to both outputs. Choices include brand, action mappings,
  typography, geometry, shadows and component literals/direct palette selections.
- Generated `@maxa/tokens/namespaced/core.css` plus
  `@maxa/tokens/namespaced/themes/maxa.css` exactly reconstruct both source modes.
  `@maxa/tokens/namespaced/theme.css` composes them.
- Owned custom properties use `--maxa-*`, including private component variables
  and inline/dynamic React helper references. Radix variables remain external.
- `@maxa/ui/namespaced` is generated from the same compiled implementation with
  matching CSS, declarations and retained side-effect metadata. Legacy source maps
  are not attached to transformed files. HTML uses the matching styles.css export.
- `data-maxa-theme` decouples the library theme from host `data-theme`. Toast
  animation identifiers are prefixed; reduced-motion behavior is scoped to MAXA
  component classes in the new distribution.
- Build scripts participate in Turbo's global cache inputs, preventing stale
  projections when generators change.

## Verification

- `pnpm verify` passed: workspace types/lint, token audit, 17 CSS/generator contract
  tests, Figma/reference freshness, Figma plugin checks, workspace tests, production
  builds and installed-package smoke. Workspace suites: 788 tests across 62 files.
- Packed browser smoke passed against installed artifacts, including legacy React,
  plain HTML and custom-theme consumers plus four namespaced fixtures (HTML/React,
  host CSS before/after). Coverage includes conflicting host colors/fonts/spacing,
  independent light/dark modes, Button/Input/Alert values and geometry, Box/Text
  dynamic variables, DataTable inline column/SVG sizing and actual Popover portals.
- Namespaced browser checks additionally verify that changing brand does not change
  primary action, while an explicit primary-action override updates the button and
  leaves host styles unchanged.
- Source comparison against checkpoint shows no changes to Figma or UI source.
  Token source changes only clarify the legacy brand-file comments; no token
  declarations or visual design values were edited. Browser checks
  validate representative rendered styles; full screenshot baselines were not updated.
- Independent review found no blocking correctness/security issue in the namespace
  transform, generated imports, side effects, theme split or documented boundaries.

## Remaining client work

Concept3D's actual theme and application integration are not fabricated here. Build
those from confirmed Localist/Room Reservations design and stack references.
The namespace identifies the library, not the client's brand. A complete theme still
needs approved palette, action states, fonts and geometry choices. Only one UI delivery
variant per document is supported because class names are shared. Nested theme scopes,
React 16 support and protection from arbitrary hostile global selectors are not added.

No remote push, registry publication, Netlify deployment or client-project copy.
