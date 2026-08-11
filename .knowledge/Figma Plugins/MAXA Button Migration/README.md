# MAXA Button Migration v9

This plugin migrates legacy MAXA Button component sets to the current Foundation variables.

Current scope:

- analyze existing Button instances, legacy components, and component sets
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
- Primary, Success, and Destructive labels/icons use the shared `Button/content/text-on-color` and `Button/content/fg-on-color` tokens; neutral variants keep their local content roles
- Secondary icons resolve through `Button/secondary/fg` to `foreground/fg-primary`
- Link keeps state-aware icon tokens: `Button/link/fg`, `Button/link/fg-hover`, and `Button/link/fg-active`
- Focus keeps the base background and binds the shared `Button/focus/border`; Pressed and Selected bind active foreground/background tokens, including `Button/outline/border-active` for Outline
- Loading keeps the base variant styling at 100% opacity; only Disabled binds `Button/disabled/opacity`
- both icons in two-icon variants receive color and size bindings
- selected Button instances are supported, so already-swapped icons can be rebound and keep their foreground token while Dropdown variants change
- instances with `Icon Left=Yes` are repaired in both `Dropdown=False` and `Dropdown=True` branches, removing legacy branch-specific paint styles before the original variant properties are restored
- icon swaps, labels, and the original Dropdown/right-icon configuration are preserved during the two-branch repair
- normal buttons use one symmetric `padding-x` token regardless of icon presence; the optional label wrapper receives optical inline padding when it exists
- resolved gaps bind directly to the shared spacing scale: `xs=2`, `sm=4`, `md=6`, `lg=4`; label optical padding is `2/2/2/4`
- Link variants use Hug contents on both axes, bind all four paddings to `spacing-none`, and do not use container height, radius, horizontal-padding, or icon-only size tokens
- Link content uses direct spacing aliases for its `4/6/8/8` gaps plus the shared size-specific typography and icon-size tokens
- icon color migration covers existing solid fills and strokes, including Loading Spinner rings
- repeat runs are idempotent: bindings that already target the correct variable are left untouched
- hidden legacy `bgr-filled` layers in Outline variants are migrated to `Button/outline/bg-surface`, which aliases `Color modes/background/bg-surface`
- legacy dependency checks include hidden Outline background layers, so stale paint styles are no longer missed by analysis
- the source Button token JSON now aliases through current semantic color variables such as `Color modes/action/action-primary`, `Color modes/text/text-on-color`, and `Color modes/background/bg-surface`

Recommended workflow:

1. Import the latest `packages/tokens/figma/import-bundle.json` with MAXA Token Importer.
2. Keep **Remove stale variables during import** off for migration passes unless you are intentionally cleaning old variables.
3. Keep **Remove stale collection modes** on so `Component-based` remains a single `Default` mode.
4. Make sure the Figma file has access to `🟠 [MAXA] Foundation` and its `Component-based` variable collection.
5. Select Button instances, components, or component sets.
6. Run `Analyze selection`, review confidence and warnings, then run `Apply mapping`.

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

Out of scope in v8:

- split buttons and menu-button behavior (a dropdown indicator inside a normal Button is supported)
- close buttons
- non-Button components
