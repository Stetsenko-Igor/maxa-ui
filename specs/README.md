# MAXA Design System — Specs

This directory is the **agent-readable design system contract**. Before writing any UI code, read the relevant spec files here.

## Why this exists

LLMs fabricate design values. They generate `padding: 13px` or `color: #3b82f6` instead of referencing established tokens. This directory gives agents the context needed to use the correct token for every decision.

> "Documentation tells you what exists. Specs also block what shouldn't exist."

## How to use (for AI agents)

1. **Before writing a component** — read `specs/components/<name>.md`
2. **Before choosing a color** — read `specs/foundations/color.md`
3. **Before choosing spacing/layout** — read `specs/foundations/spacing.md`
4. **Before choosing a radius** — read `specs/foundations/radius.md`
5. **Not sure which button variant?** — read `specs/patterns/interactive-hierarchy.md`
5b. **Naming a color/treatment prop?** — read `specs/patterns/variant-vocabulary.md` (`intent` vs `appearance` vs `emphasis` vs `variant`)
6. **Need a CSS variable name?** — search `specs/tokens-reference.md`
7. **Need package ownership rules?** — read `specs/architecture.md`
8. **Need Figma/Code Connect guidance?** — read `specs/figma-code-connect-readiness.md`
9. **Planning core components?** — read `specs/core-gap-audit.md`
10. **Coverage vs MaxaDevs FSD?** — read `specs/maxadevs-fsd-coverage.md`

## Enforcement

The audit script `scripts/audit-tokens.mjs` scans source files for hardcoded values.

```bash
node scripts/audit-tokens.mjs
```

This runs in CI with `exit 1` on violations. Do not hardcode values that have tokens.

## Directory structure

```
specs/
├── README.md                        ← this file
├── architecture.md                  ← package ownership rules
├── core-gap-audit.md                ← core component gaps vs product patterns
├── maxadevs-fsd-coverage.md         ← kit coverage vs MaxaDevs FSD + roadmap direction
├── figma-code-connect-readiness.md  ← optional Figma Code Connect strategy
├── tokens-reference.md              ← master CSS variable index
├── foundations/
│   ├── color.md                     ← semantic color tokens + surface model
│   ├── spacing.md                   ← spacing scale + layout tokens
│   ├── typography.md                ← type scale + font usage
│   ├── radius.md                    ← radius scale
│   ├── motion.md                    ← duration + easing scale, reduced-motion guard
│   └── breakpoints.md               ← breakpoints + responsive strategy
├── components/
│   ├── button.md                    ← Button variants, sizes, states
│   ├── icon-button.md               ← IconButton (Button + icon-only)
│   ├── input.md                     ← Input primitive + form composition
│   ├── select.md                    ← Select / dropdown
│   ├── date-picker.md               ← DatePicker field composition
│   ├── checkbox.md                  ← Checkbox + states
│   ├── radio.md                     ← Radio + group composition
│   ├── toggle.md                    ← Toggle + states
│   ├── separator.md                 ← Separator (divider rule)
│   ├── alert.md                     ← Alert (callout) + intents
│   ├── tooltip.md                   ← Tooltip (floating hint)
│   ├── popover.md                   ← Popover (interactive floating panel)
│   └── form-field.md                ← FormField label + control + hint + error
└── patterns/
    ├── interactive-hierarchy.md     ← which button variant for which context
    ├── variant-vocabulary.md        ← intent / appearance / emphasis / variant naming axes
    └── toolbar-menus.md             ← toolbar + menu composition
```

## Token layer architecture

```
Primitives (raw values)
    ↓
Semantic tokens (--color-text-primary, --color-action-primary)
    ↓
Component tokens (--button-primary-bg, --button-size-md-height)
    ↓
Component code (reads only component tokens or semantic tokens)
```

**Rule:** Components reference semantic or component-level tokens only. Never raw primitives or hardcoded values.

## Multi-client / white-label readiness

Tokens are brand-agnostic. Two paths exist for serving a second client brand:

- **Path A — re-theme (works today, zero component changes).** A new client brand is created by
  copying `packages/tokens/src/themes/maxa.css` and replacing the `--color-brand-*` hex values.
  Because every component reads only semantic/component tokens, swapping the brand palette
  re-skins the entire system with no component edits.
- **Path B — divergent components (blocked).** For clients that need structurally *different*
  components (not just colors), the blocker is the hardcoded `.maxa-*` CSS class prefix used in
  ~437 places (CSS selectors + cva base classes). Forking component packages would first require
  extracting that prefix into a shared constant/factory.

**Status: DEFERRED.** No action taken. Revisit when a second client's component scope is known.
