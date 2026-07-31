---
"@maxa/tokens": patch
---

Reconcile the neutral background ladder across CSS, Figma, and the docs showcase, and add
one new step. Figma's `background/bg-neutral-surface` (a dead duplicate of
`bg-neutral-subtle` with zero consumers) is renamed in place to `bg-neutral-on-subtle`
(neutral-200 light / neutral-700 dark) via an importer migration that preserves the Figma
variable ID; the CSS side already used that name. New `bg-neutral-on-muted`
(neutral-300 light / neutral-600 dark) fills the gap between muted and strong; the Table
header background moves from `bg-muted` (neutral-25) to it.

Fixes two more parity gaps found by the new guard: `border-neutral-strong`/`-subtle`
existed only in CSS and now have Figma variables, and the stray `background/bg-gray-muted`
duplicate is gone — the bundle builder now routes decorative hue families
(`bg-{hue}-*`, `text-{hue}`) to `Color modes/utility`, rebinding `Multi Select/chip-bg` to
the utility role (identical resolved color).

The docs Colors page now renders from `tokens.generated.json` — emitted by
`generate-tokens-reference.mjs` from the CSS source and guarded by
`tokens:reference:check` — instead of hand-maintained arrays, and shows resolved
light/dark hex for every token plus the previously missing control and feedback groups.
A new test asserts bidirectional CSS↔Figma name parity for every Color modes group, the
blind spot that let `surface` vs `on-subtle` diverge unnoticed.
