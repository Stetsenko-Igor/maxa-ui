# MAXA Action Color and Token Cleanup Design

- Date: 2026-08-11
- Status: Approved direction; implementation pending
- Scope: Foundation color variables, component tokens, Button v3 bindings, generated token packages, and Storybook validation

## Goals

1. Make Primary, Positive, and Negative filled buttons use white labels and icons in both Light and Dark themes.
2. Replace large hover and active color jumps with smaller GitHub-like steps: darker in Light mode and lighter in Dark mode.
3. Give designers one clear token choice for each intent and remove unnecessary duplication from the public token experience.
4. Preserve component-level indirection so components can evolve without coupling their implementation directly to global semantic tokens.
5. Avoid breaking already published Figma variables or existing component instances during cleanup.

## Non-goals

- Redesigning neutral, outline, ghost, or link button colors.
- Removing the component-token layer.
- Deleting published variables before their Figma and code usage has been verified.
- Combining action and feedback semantics merely because some current values match.

## Current problems

- `foreground/fg-on-color` resolves to a dark neutral in Dark mode, so colored buttons can receive dark icons.
- Filled button state colors jump too far in Dark mode, currently using broad 400 to 300 to 200 steps.
- `action/*`, `feedback/*`, and `Button/*` expose similar names without explaining their different ownership.
- Unused subtle action tokens and redundant per-state Button text tokens add noise.
- Designers can manually select implementation-only component tokens even though product designs should normally use the Button component itself.

## Token architecture

| Layer | Purpose | Who selects it directly |
| --- | --- | --- |
| Primitive colors | Raw palette values and scales | Design-system maintainers only |
| Semantic `action/*` | Interactive color intent independent of a component | Designers building a custom interactive control that no existing component covers |
| Semantic `feedback/*` | Status and feedback surfaces such as alerts | Feedback component authors and exceptional custom feedback surfaces |
| `Button/*` component tokens | Internal Button implementation contract | Button maintainers only; product designers use the component instead |

Designer decision rule:

1. If the design needs a button, use the Button component and do not assign a color token manually.
2. If it is a custom interactive surface, use `action/*`.
3. If it communicates status or feedback, use `feedback/*`.
4. Do not use `Button/*` outside the Button component source.

## Approved on-color contract

- Add `text/text-on-color`, resolving to White in Light and Dark modes.
- Update `foreground/fg-on-color` to resolve to White in Light and Dark modes.
- Bind Primary, Positive, and Negative filled Button labels to `text/text-on-color`.
- Bind their icons to `foreground/fg-on-color`.
- Do not reuse inverse tokens for this purpose. `inverse` describes theme inversion; `on-color` describes content placed on a saturated background.

## Approved filled action states

| Intent | Light default | Light hover | Light active | Dark default | Dark hover | Dark active |
| --- | --- | --- | --- | --- | --- | --- |
| Primary | Blue 500 | Blue 550 | Blue 600 | Blue 600 | Blue 550 | Blue 500 |
| Positive | Green 650 | Green 700 | Green 750 | Green 750 | Green 700 | Green 650 |
| Negative | Red 500 | Red 550 | Red 600 | Red 600 | Red 550 | Red 500 |

Required new primitive values:

| Primitive | Value |
| --- | --- |
| Blue 550 | `#056DC9` |
| Red 550 | `#C6140F` |
| Green 650 | `#25843E` |
| Green 750 | `#206D35` |

The state direction is intentionally theme-aware. Light mode becomes slightly darker on interaction; Dark mode becomes slightly lighter. White content must retain at least WCAG AA 4.5:1 contrast in every state.

## Cleanup decisions

### Keep

- `action/action-primary`, `action/action-primary-hover`, and `action/action-primary-active`.
- `action/action-success`, `action/action-success-hover`, and `action/action-success-active`.
- `action/action-destructive`, `action/action-destructive-hover`, and `action/action-destructive-active`.
- `feedback/{status}/bg`, `border`, `accent`, `action`, and `action-hover`. These belong to feedback surfaces and remain independent from action tokens even when values overlap.
- The `Button/*` component-token layer. It is a useful boundary between semantic intent and component implementation.

### Rename and document

- Rename the Figma collection `Component-based` to `Component tokens · Internal`.
- Add concise descriptions to all public semantic groups:
  - `action/*`: “Interactive controls and custom action surfaces.”
  - `feedback/*`: “Status and feedback surfaces only.”
  - `Button/*`: “Internal Button component token. Do not apply in product layouts.”
- Describe `on-color` tokens as content colors for saturated or brand-colored backgrounds in both themes.

### Deprecate first

- Mark currently unconsumed `action-success-subtle`, `action-success-subtle-hover`, and `action-success-subtle-active` as deprecated.
- Apply the same treatment to the destructive subtle family only if the final Figma usage audit also confirms no consumers.
- Deprecation keeps the current variable identity and name, adds a `[Deprecated]` description, and removes the token from all new component bindings.
- Do not delete these variables in the same release. Remove them only in a later breaking cleanup after checking published design usage.

### Consolidate after reference audit

- Replace identical colored Button state text aliases such as `Button/success/text-hover` and `Button/success/text-active` with one `Button/{intent}/text` token.
- Apply the same consolidation to Primary and Negative only where default, hover, and active aliases are identical.
- Keep disabled text and foreground tokens separate because disabled behavior is semantically different.
- Do not collapse background state tokens; they intentionally differ by state and theme.
- Do not collapse `padding-x` and `padding-x-icon`: text buttons and icon-only buttons have different layout contracts even when a value happens to match.

## Compatibility and migration

The cleanup must be staged because published Figma variables may be used outside the repository:

1. Update values, aliases, collection naming, and descriptions without deleting published variable identities.
2. Rebind Button v3 and confirm every variant uses the intended component tokens.
3. Export Foundation and component variables, then regenerate the code token artifacts.
4. Search Figma libraries and the repository for deprecated or redundant token references.
5. Remove redundant component aliases only after all bindings have migrated.
6. Remove deprecated semantic tokens in a later breaking token release when external usage is known to be zero.

Changing shared `action/*` values can affect consumers beyond Button, including form controls, progress indicators, pagination, calendar interactions, and other action-colored components. Those consumers require visual regression checks in both themes.

## Validation

- Verify White label and icon bindings for Primary, Positive, and Negative Button variants in both themes.
- Verify default, hover, active, loading, focus, and disabled states independently.
- Confirm loading remains at 100% opacity and does not respond to pointer or keyboard activation.
- Confirm every filled state has at least 4.5:1 contrast against White content.
- Confirm no Button variant points directly to primitive colors.
- Confirm no product-facing component uses `Button/*` outside the Button implementation.
- Confirm deprecated tokens have no new aliases or bindings.
- Regenerate token outputs and run repository tests, lint, build, and Storybook visual checks.
- Compare Figma Button v3 and Storybook in Light and Dark themes before publication.

## Delivery order

1. Foundation Figma variables and descriptions.
2. Foundation publication and fresh JSON export.
3. Component-token bindings and Button v3 migration.
4. Repository token generation and runtime Button updates.
5. Storybook documentation and visual regression validation.
6. Deprecation report for the next breaking cleanup release.

## Result

The public mental model becomes intent-based and short: component first, `action/*` for custom interaction, and `feedback/*` for status surfaces. Component aliases remain available where they provide architectural value, while redundant state aliases and unused semantic variants are removed through a compatibility-safe migration.
