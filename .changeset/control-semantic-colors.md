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

The Figma token schema now keeps theme switching only in `Color modes`. `Component-based`
has one `Default` mode, all 1,026 component variables keep stable IDs, and every component
COLOR value is an alias. Alert retains the published dark palette through dedicated
theme-aware roles, while Dialog, Dropdown Menu, and the extended utility palette follow the
same single-switch architecture. Alert Light retains the deployed Netlify palette, including
intent-colored borders, and Alert Dark retains its existing bespoke palette.

Removed the duplicate `Color modes/component/*` namespace. `Component-based` now points to
reusable feedback and support semantics. Alert Neutral and Emphasize use dedicated feedback roles
that resolve to the current primitive values without coupling the component to shared surface or
page semantics.

`border-focus-soft` now aliases the exact `Colors/Blue/150` primitive in both color modes instead
of storing the same raw hex value twice. Its resolved color remains `#C7E5F0`.

Aligned Figma `Colors/Blue/50` with the deployed CSS primitive (`#E0F2FF`) and routed the Light
Alert info background through that primitive instead of duplicating its hex value.

Moved the exact deployed Dark Alert palette into 16 `Colors/Status/*` reference primitives and
added `Colors/Base/Ink` for the Light feedback text value. All 58 Light/Dark `feedback/*` values
are now aliases, with no visual color changes. The bundle builder rejects future raw feedback
colors so the semantic layer cannot regress to literal hex values.

The export diff tool now compares the full variable contract — values, types, scopes, and
descriptions — with representation-aware normalization: rgba()/hex8 equivalence after
Figma's 8-bit channel quantization, `[]` vs `["ALL_SCOPES"]` scope serialization, alias
path styles, and whitespace-trimmed descriptions. A collection missing from an export is
now reported instead of silently skipped.

The last four raw semantic colors moved behind three new alpha primitives
(`Colors/Neutral (alpha)/Ink/50`, `Black/72`, `White/45`): `bg-overlay-strong` and
`fg-on-inverse-muted` now alias them in both themes with byte-identical resolved colors.
The bundle build now rejects any raw COLOR literal anywhere in Color modes, and stale
compatibility wording was removed from eight border/feedback descriptions.
