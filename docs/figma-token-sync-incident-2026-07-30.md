# Figma token sync incident — 2026-07-30

## Outcome

The repository bundle and the live `[MAXA] Foundation` Figma file are reconciled. A read-only comparison of the original 1,504 variables reported zero differences in variable type, per-mode value, or alias target. After the Alert follow-up, the 28-variable delta was validated separately: 24 existing Alert variables retain their IDs and resolve through semantic aliases in both modes, while 4 new semantic border variables resolve to primitives.

The generated bundle now contains:

- 8 collections
- 1,508 variables
- 2,729 per-mode values
- 1,806 real aliases
- 0 unresolved CSS expressions

## What happened

The component Figma JSON used both Figma alias syntax (`{Collection/path}`) and CSS syntax (`var(--token)`). The bundle generator only converted part of the CSS references and discarded declared token types. The importer then inferred every remaining non-hex string as a Figma `STRING`, so text such as `var(--dropdown-menu-bg)` was stored literally instead of becoming a variable alias.

CSS and Figma also have different mode behavior. CSS can inherit an unchanged light value into a dark selector through the cascade; a Figma variable collection requires an explicit value for every mode. Missing dark values therefore appeared as Figma defaults, including white.

The importer compounded the problem in two ways:

1. It used the first mode to decide whether a variable was literal or aliased, so mixed tokens such as an aliased light value plus a bespoke dark literal were only partially assigned.
2. It looked up existing variables by the desired type, so a stale `STRING` variable was invisible when the same path needed to become `COLOR` or `FLOAT`. Creating the replacement then failed with a duplicate-name error.

Seeing the same alias label in both Light and Dark columns is not itself an error. A component token should normally reference the same semantic variable in both modes; the semantic variable resolves to a different primitive in each mode. Literal `var(--...)` text, a wrong Figma type, an unresolved alias, or a missing per-mode value is an error.

## Live Figma repair

The migration was preceded by a read-only consumer scan. No variable aliases, node bindings, or style bindings in the Foundation file referenced the variables that required destructive type replacement.

The repair:

- created 8 missing semantic color variables;
- recreated 116 stale wrong-type variables with explicit Figma types and scopes;
- removed 12 shadow pseudo-variables that belong as Effect Styles, not text variables;
- restored 58 per-mode alias bindings on 29 existing variables;
- replaced 24 bespoke Alert dark-mode literals with semantic aliases while preserving the existing Alert variable IDs;
- added 4 missing semantic subtle-border variables for info, success, warning, and error;
- preserved 1,026 variables in `Component-based` and brought `Color modes` to 107 variables.

Recreated variables receive new Figma IDs by definition. The local consumer scan was therefore a required safety gate. Consumers in other Figma files cannot be inspected from the Foundation file API; publishing the repaired library remains an explicit manual action in Figma.

## Repository safeguards

`build-figma-import-bundle.mjs` now:

- preserves explicit token types and scopes;
- resolves the known cross-component references;
- converts supported CSS references to Figma aliases;
- resolves Figma-compatible scalar values such as opacity, touch target, spacing, and z-index;
- excludes shadow tokens from Variables;
- rejects missing modes, unresolved aliases, alias cycles, unsupported CSS expressions, and type drift;
- supports `--check` so CI fails when the committed bundle is stale.

MAXA Token Importer v10 now:

- accepts only the generated import bundle shape;
- runs a complete, non-mutating preflight before import;
- creates all typed variables before assigning aliases, so forward references are safe;
- processes each token/mode value independently;
- keeps wrong-type recreation disabled unless the user explicitly enables it;
- exports types and scopes as well as values;
- handles transparent, RGB, RGBA, literals, and aliases consistently.

The token audit and test suite now validate the final generated artifact, not only the raw source JSON.

An exact Figma-to-bundle match is necessary but not sufficient when the bundle itself can encode an architectural violation. A focused regression test now requires every `Alert/color/*` value in both modes to be a `Color modes` alias, preventing raw component-level color literals from returning.

## Review of Claude's changes today

### PR #16 — partial CSS-reference conversion and export/diff workflow

Correct direction: it identified the literal `var(--...)` failure, converted many semantic and primitive references, fixed cross-collection alias export, and introduced a useful read-only Figma export/diff workflow.

Gap: the converter intentionally left cross-component, scalar, z-index, opacity, and shadow references unresolved. The generated bundle was still accepted even though it contained CSS expressions and incomplete type information. Tests verified the known partial result instead of making unresolved expressions a build failure.

### PR #17 — confirmed manual primitive, semantic, and Layout edits

Correct. The confirmed primitive values, dark `bg-page` alias, and Layout naming changes were applied to code. The diff workflow still contained representation noise, which made manual filtering necessary.

### PR #18 — missing Utility dark-mode values

Correct. It identified the CSS-cascade/Figma-mode mismatch and added explicit dark values plus light/dark key-parity tests. This was an important regression guard.

### PR #19 — stale-type recreation and per-mode assignment

The per-mode assignment fix was correct and is retained. Automatic deletion and recreation of every wrong-type variable was too destructive without a preflight, consumer scan, and explicit user opt-in. v10 keeps recreation behind a checkbox and validates the complete bundle before making changes.

### PR #20 — semantic control colors

The CSS direction was correct: Checkbox, Radio, and Toggle now use semantic control roles and gain real dark-mode behavior. The Figma JSON initially bypassed those new semantic variables by pointing component tokens directly at primitives. The repaired source and live library now use `Color modes/control/*` aliases, preserving the intended component → semantic → primitive chain.

## Required publishing step

The Foundation file is repaired but library publishing is controlled by Figma. Open the Foundation file, review the pending library changes, and publish them so consuming files receive the new variables and replacement IDs.
