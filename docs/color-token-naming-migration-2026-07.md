# Color Token Naming Migration (2026-07)

Status: merged to `main` in PR [#13](https://github.com/Stetsenko-Igor/maxa-ui/pull/13) and
[#14](https://github.com/Stetsenko-Igor/maxa-ui/pull/14). Not yet published to any registry —
this is a breaking change staged behind Changesets until a release is explicitly approved.

## Why

A naming audit found the same concept (red/green status) expressed **three different ways**
depending on which layer you were in:

| Concept | Old words in use |
|---|---|
| Red status | `error` (text/bg/border) · `negative` (fg/action) · `danger` (border-subtle, Alert/Button component tokens) |
| Green status | `success` (text/bg) · `positive` (fg/action) |

Root cause: the `fg` (icon color) layer wrongly borrowed the interactive `positive`/`negative`
words instead of the status words `text`/`bg`/`border` already used.

This was checked against a 89-system design-system research corpus. **Untitled UI — the
system our `text/fg/bg/border` model is derived from — uses `error`/`success`/`warning`
uniformly across every passive layer, including `fg`.** Our `fg-positive`/`fg-negative` was
drift from that source model, not an intentional choice. This migration re-aligns to it.

## The rule going forward

- **Passive layers** (`text`, `fg`, `border`, `bg` — feedback/status color) → one vocabulary:
  **`info` · `success` · `warning` · `error`**. Never `positive`/`negative`/`danger` here.
- **Interactive action layer** (buttons) → **`success`** (confirm, green) / **`destructive`**
  (delete/remove, red). `destructive` describes an *action*, not a status — a feedback
  component (Alert, Toast) never uses `destructive`, it uses `error`.

## Exact renames

### CSS custom properties (`@maxa/tokens`)

| Old | New |
|---|---|
| `--color-fg-positive` | `--color-fg-success` |
| `--color-fg-negative` | `--color-fg-error` |
| `--color-action-positive` (+ `-hover`, `-active`, `-subtle`, `-subtle-hover`, `-subtle-active`) | `--color-action-success` (same suffix set) |
| `--color-action-negative` (+ same 5 suffixes) | `--color-action-destructive` (same suffix set) |
| `--color-border-error` | `--color-border-error-strong` |
| `--color-border-danger-subtle` | `--color-border-error-subtle` |

`--color-border-*` for `info`/`success`/`warning` were already `-strong`/`-subtle` pairs —
`error` now matches that pattern instead of being the odd one out.

### Component tokens

| Old | New |
|---|---|
| `--alert-danger-bg` / `-border` / `-text` / `-title` / `-icon` / `-strip` / `-action` / `-action-hover` | `--alert-error-*` (same 8 suffixes) |
| `--button-danger-bg` / `-bg-hover` / `-bg-active` / `-text` / `-border` / `-border-hover` / `-border-focus` | `--button-destructive-*` (same 7 suffixes) |

### Public component API (`@maxa/ui`) — **breaking**

| Component | Old | New |
|---|---|---|
| `Button`, `IconButton` | `variant="danger"` | `variant="destructive"` |
| `Alert` | `intent="danger"` | `intent="error"` |
| `Alert` | `AlertIntent = "info" \| "success" \| "warning" \| "danger"` | `AlertIntent = "info" \| "success" \| "warning" \| "error"` |
| CSS class | `.maxa-button--danger` | `.maxa-button--destructive` |
| CSS class | `.maxa-alert--danger` | `.maxa-alert--error` |

### TypeScript token prop types (`base-tokens.tsx`)

| Type | Old members | New members |
|---|---|---|
| `ForegroundColorToken` | `positive`, `negative` | `success`, `error` |
| `BorderColorToken` | `error` | `error-strong`, `error-subtle` |

## What did NOT change

- **Token values.** This is a pure rename — every renamed token still resolves to the exact
  same color in both light and dark mode. Verified with a visual-regression pass: 11 of 12
  pilot screenshots were byte-identical after the rename; only the `colors` foundations docs
  page changed (because its swatch *labels* were updated).
- **`--color-bg-{info,success,warning,error}-surface`.** These duplicate their `-subtle`
  siblings exactly (same value in both light and dark) — a real cleanup opportunity, but it
  conflicts with the token-audit script's uniform-suffix model and needs its own follow-up.
  Not touched in this migration.
- **Warning hue.** Status `warning` is orange (light) → yellow (dark); the interactive
  `--color-action-warning` is yellow in both modes. This is documented as intentional in
  `specs/foundations/color.md`, not changed here.

## Migration steps for consumers

Find/replace across your codebase (CSS and TSX):

```bash
# CSS custom properties
--color-fg-positive        → --color-fg-success
--color-fg-negative        → --color-fg-error
--color-action-positive    → --color-action-success
--color-action-negative    → --color-action-destructive
--color-border-error       → --color-border-error-strong   (careful: don't touch *-strong/-subtle already suffixed)
--color-border-danger-subtle → --color-border-error-subtle
--alert-danger-            → --alert-error-
--button-danger-           → --button-destructive-

# Component props
variant="danger"  (Button/IconButton) → variant="destructive"
intent="danger"   (Alert)             → intent="error"
```

Since this hasn't been published to a registry yet, there is no npm version bump to pin —
just pull the latest `main` once it's released, or point your local workspace dependency at
this commit if you're testing early.

## Bonus: Figma sync

PR #14 also fixed two related gaps, relevant if you touch the Figma token workflow:

1. **Variable descriptions** ("How to use this variable") were blank for all semantic and
   component color tokens in Figma. They're now populated (95 semantic + 1035 component
   tokens) via `$description` in the token JSON, applied by the MAXA Token Importer plugin.
2. **Safe rename migration.** The plugin's migration map now includes all the renames above,
   so importing the latest bundle **renames existing Figma variables in place** (preserving
   their IDs, so all bindings survive) instead of leaving orphaned old variables or creating
   duplicates. Import with **"Remove stale variables during import" left unchecked**.

## Reference

- Rename PR: [#13 — resolve color naming to one vocabulary](https://github.com/Stetsenko-Igor/maxa-ui/pull/13)
- Figma sync PR: [#14 — Figma variable descriptions + safe rename migration](https://github.com/Stetsenko-Igor/maxa-ui/pull/14)
- Full status vocabulary rule: `specs/foundations/color.md`
- Variant-naming boundary (`intent` vs `appearance`, Button's exception): `specs/patterns/variant-vocabulary.md`
- Changesets: `.changeset/color-token-naming-resolution.md`, `.changeset/token-descriptions-figma-migration.md`
