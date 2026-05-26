# MAXA Button Migration v1

This plugin is the first migration tool for the MAXA design system.

Current scope:

- analyze existing legacy Button components
- identify likely Button family, size, and state
- detect legacy styling dependencies such as local styles and hardcoded values
- report warnings and confidence before any migration happens
- optionally constrain analysis to one manual target family to reduce ambiguity
- apply the reviewed mapping by binding Button variables to fills, strokes, text, sizing, radius, spacing, and typography fields

Phase 1 status:

- `Analyze selection` is implemented
- `Apply mapping` is implemented after analysis
- bindings target the `Component-based Tokens` collection, for example `Button/primary/bg`, `Button/size/md/height`, and `Button/font-family`
- the source Button token JSON now aliases through current semantic color variables such as `Color modes/action/action-primary`, `Color modes/text/text-inverse`, and `Color modes/background/bg-surface`

Recommended workflow:

1. Import the latest `packages/tokens/figma/import-bundle.json` with MAXA Token Importer.
2. Keep **Remove stale variables during import** off for migration passes unless you are intentionally cleaning old variables.
3. Make sure the Figma file has access to the MAXA `Component-based Tokens` variable collection.
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
- `Destructive`
- `Icon button`

Out of scope in v1:

- dropdown/menu buttons
- split buttons
- close buttons
- non-Button components
