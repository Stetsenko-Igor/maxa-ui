---
"@maxa/tokens": minor
"@maxa/ui": minor
---

Resolve color token naming to one vocabulary per semantic job. Passive status and validation use `info` / `success` / `warning` / `error`; interactive action intent uses `positive` / `destructive`. This removes the ambiguous overlap between a successful result and a green confirmation action.

**Breaking token renames** (`@maxa/tokens`):
- `--color-fg-positive` → `--color-fg-success`, `--color-fg-negative` → `--color-fg-error`
- `--color-action-success*` → `--color-action-positive*`
- `--color-action-negative*` → `--color-action-destructive*`
- `--color-border-error` → `--color-border-error-strong`; `--color-border-danger-subtle` → `--color-border-error-subtle`
- component tokens: `--alert-danger-*` → `--alert-error-*`, `--button-danger-*` → `--button-destructive-*`, `--button-success-*` → `--button-positive-*`
- remove `--button-content-*`; Primary, Positive, and Destructive now expose explicit `text` and `fg` roles that alias the same on-color semantics

**Breaking component API** (`@maxa/ui`):
- `Button` variant `"danger"` → `"destructive"` (and `IconButton`, which inherits Button variants)
- `Button` variant `"success"` → `"positive"`
- `Alert`/`Toast`-style `intent="danger"` → `intent="error"`; `AlertIntent` type updated
- typed token props: `ForegroundColorToken` `positive`/`negative` → `success`/`error`; `BorderColorToken` `error` → `error-strong` + `error-subtle`

Values are unchanged — this is a pure rename. Deferred: the `bg-{intent}-surface` / `bg-{intent}-subtle` duplication (a separate cleanup, tracked outside this change).
