---
"@maxa/tokens": patch
---

Replace hardcoded hex colors in Checkbox, Radio, and Toggle component tokens with semantic
token references. These three components shared an identical hardcoded hex family
(`#a1a1a4`, `#c9c9c9`, `#0b73cb`, `#0576da`, `#04549b`, `#e4e4e4`) in both `packages/tokens/src/component-*.css`
and the mirrored Figma JSON, bypassing the semantic layer entirely (a blind spot in
`audit-tokens.mjs`, whose hex check skips token *definition* lines).

Blue interactive states (focus ring, checked/on) now reuse existing `--color-border-focus`,
`--color-action-primary`, and `--color-action-primary-hover` — these already adapt correctly
per theme. Neutral idle/checked states use four new tokens added to the semantic layer
(`--color-control-idle`, `--color-control-idle-hover`, `--color-control-checked`,
`--color-control-checked-hover`), values snapped to the nearest existing primitive step (no
new colors introduced). All three components previously rendered identically in light and
dark; they now get real theme-adapted colors for the first time.
