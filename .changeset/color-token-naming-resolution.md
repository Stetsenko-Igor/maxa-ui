---
"@maxa/tokens": minor
"@maxa/ui": minor
---

Resolve color token naming to a single vocabulary (Scheme B). Status color now uses one word set — `info` / `success` / `warning` / `error` — across every passive layer (`text`, `fg`, `border`, `bg`), matching the Untitled UI model MAXA's foundation is derived from. The interactive action layer uses `destructive` (red) and `success` (green). This ends a three-way split where the same concept was `error` / `negative` / `danger`.

**Breaking token renames** (`@maxa/tokens`):
- `--color-fg-positive` → `--color-fg-success`, `--color-fg-negative` → `--color-fg-error`
- `--color-action-positive*` → `--color-action-success*`
- `--color-action-negative*` → `--color-action-destructive*`
- `--color-border-error` → `--color-border-error-strong`; `--color-border-danger-subtle` → `--color-border-error-subtle`
- component tokens: `--alert-danger-*` → `--alert-error-*`, `--button-danger-*` → `--button-destructive-*`

**Breaking component API** (`@maxa/ui`):
- `Button` variant `"danger"` → `"destructive"` (and `IconButton`, which inherits Button variants)
- `Alert`/`Toast`-style `intent="danger"` → `intent="error"`; `AlertIntent` type updated
- typed token props: `ForegroundColorToken` `positive`/`negative` → `success`/`error`; `BorderColorToken` `error` → `error-strong` + `error-subtle`

Values are unchanged — this is a pure rename. Deferred: the `bg-{intent}-surface` / `bg-{intent}-subtle` duplication (a separate cleanup, tracked outside this change).
