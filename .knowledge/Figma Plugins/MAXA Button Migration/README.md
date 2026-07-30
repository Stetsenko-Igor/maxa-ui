# MAXA Button Migration v2

This plugin migrates legacy MAXA Button component sets to the current Foundation variables.

Current scope:

- analyze existing legacy Button components
- identify likely Button family, size, and state
- detect legacy styling dependencies such as local styles and hardcoded values
- report warnings and confidence before any migration happens
- optionally constrain analysis to one manual target family to reduce ambiguity
- apply the reviewed mapping by binding Button variables to fills, strokes, text, sizing, radius, spacing, and typography fields

Current status:

- `Analyze selection` is implemented
- `Apply mapping` is implemented after analysis
- bindings target the `Component-based` collection, for example `Button/primary/bg`, `Button/size/md/height`, and `Button/font-family`
- `XS`, `Pressed`, `Selected`, `Focus`, `Loading`, `Positive`, and `Negative` values are normalized to the current token model
- `Positive` maps to `Button/success/*`; `Negative` maps to `Button/destructive/*`
- Link labels use `Button/link/text*`, while Link icons use the dedicated `Button/link/fg*` state tokens
- Focus keeps the base background and binds `border-focus`; Pressed and Selected bind active foreground/background tokens
- Loading keeps the base variant styling and applies `Button/disabled/opacity`
- both icons in two-icon variants receive color and size bindings
- the source Button token JSON now aliases through current semantic color variables such as `Color modes/action/action-primary`, `Color modes/text/text-inverse`, and `Color modes/background/bg-surface`

Recommended workflow:

1. Import the latest `packages/tokens/figma/import-bundle.json` with MAXA Token Importer.
2. Keep **Remove stale variables during import** off for migration passes unless you are intentionally cleaning old variables.
3. Make sure the Figma file has access to `🟠 [MAXA] Foundation` and its `Component-based` variable collection.
4. Select Button components or component sets.
5. Run `Analyze selection`, review confidence and warnings, then run `Apply mapping`.

Validation:

- `pnpm audit:tokens` checks that Figma aliases resolve and that semantic color naming is consistent.
- `pnpm --filter @maxa/tokens test` includes regression coverage for Button token aliases.

Supported target families:

- `Buttons/Button`
- `Buttons/Button destructive`
- `Buttons/Icon button`

Supported manual analysis modes:

- `Auto-detect`
- `Primary`
- `Secondary`
- `Outline`
- `Ghost`
- `Link`
- `Success / Positive`
- `Destructive`
- `Icon button`

Validated legacy values:

- types: `Primary`, `Secondary`, `Outline`, `Ghost`, `Link`, `Positive`, `Negative`
- sizes: `XS`, `S`, `M`, `L`
- states: `Default`, `Hover`, `Pressed`, `Selected`, `Focus`, `Loading`, `Disabled`
- icon arrangements: icon-only, left, right, dropdown indicator, and two-icon combinations

Out of scope in v2:

- split buttons and menu-button behavior (a dropdown indicator inside a normal Button is supported)
- close buttons
- non-Button components
