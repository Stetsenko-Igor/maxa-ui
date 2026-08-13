---
"@maxa/tokens": patch
"@maxa/ui": patch
---

Replace hardcoded hex colors in Checkbox, Radio, and Toggle component tokens with semantic
token references. These three components shared an identical hardcoded hex family
(`#a1a1a4`, `#c9c9c9`, `#0b73cb`, `#0576da`, `#04549b`, `#e4e4e4`) in both `packages/tokens/src/component-*.css`
and the mirrored Figma JSON, bypassing the semantic layer entirely (a blind spot in
`audit-tokens.mjs`, whose hex check skips token _definition_ lines).

Blue interactive states now reuse `--color-focus-ring` for focus and existing control roles for checked/on,
`--color-action-primary`, and `--color-action-primary-hover` — these already adapt correctly
per theme. Neutral idle/checked states use four new tokens added to the semantic layer
(`--color-control-idle`, `--color-control-idle-hover`, `--color-control-checked`,
`--color-control-checked-hover`), values snapped to the nearest existing primitive step (no
new colors introduced). All three components previously rendered identically in light and
dark; they now get real theme-adapted colors for the first time.

The Figma token schema now keeps theme switching only in `Color modes`. `Component-based`
has one `Default` mode, all 1,026 component variables keep stable IDs, and every component
COLOR value is an alias. Alert keeps dedicated theme-aware roles, while Dialog, Dropdown Menu,
and the extended utility palette follow the same single-switch architecture. Alert Light retains
the deployed Netlify palette, including intent-colored borders. Alert Dark now uses the same
canonical primitive palettes as the rest of the semantic color system instead of maintaining a
separate feedback-only palette.

Removed the duplicate `Color modes/component/*` namespace. `Component-based` now points to
reusable feedback and support semantics. Alert Neutral and Emphasize use dedicated feedback roles
that resolve to the current primitive values without coupling the component to shared surface or
page semantics.

`border-focus-soft` now aliases the exact `Colors/Blue/150` primitive in both color modes instead
of storing the same raw hex value twice. Its resolved color remains `#C7E5F0`.

Aligned Figma `Colors/Blue/50` with the deployed CSS primitive (`#E0F2FF`) and routed the Light
Alert info background through that primitive instead of duplicating its hex value.

Added `Colors/Base/Ink` for the Light feedback text value and routed all 58 Light/Dark
`feedback/*` values directly to canonical primitives. Dark feedback reuses the existing
Blue, Green, Yellow/Orange, and Red palettes; no duplicate `Colors/Status/*` reference family
is retained. The bundle builder rejects future raw feedback colors so the semantic layer
cannot regress to literal hex values.

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

Removed the redundant `Button/focus/border` component token. Button focus now preserves each
variant's normal border: Figma uses the shared Focus ring effect, while the React Button outline
references `--color-focus-ring` directly. The Button migration plugin follows the same contract.

Separated action intent from feedback status: green interactive actions now use
`action-positive` and `Button/positive/*`, while validation and feedback retain `success`.
Primary, Positive, and Destructive expose explicit `text` and `fg` component roles that remain
white in both themes. Social Button gap and horizontal padding now reference shared Spacing
tokens directly; its redundant component spacing proxies were removed.

Aligned Primary, Positive, Destructive, and Link states with the republished Foundation library.
Their Light/Dark action ramps now use only standard palette steps, and Link text aliases the shared
primary action states. Removed the unused button-only `Blue/550`, `Green/650`, `Green/750`, and
`Red/550` primitives from CSS and the Figma import source.
