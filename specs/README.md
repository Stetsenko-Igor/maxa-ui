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
6. **Need a CSS variable name?** — search `specs/tokens-reference.md`

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
├── tokens-reference.md              ← master CSS variable index
├── foundations/
│   ├── color.md                     ← semantic color tokens + usage rules
│   ├── spacing.md                   ← spacing scale + layout tokens
│   ├── typography.md                ← type scale + font usage
│   ├── radius.md                    ← radius scale
│   └── breakpoints.md               ← breakpoints + responsive strategy
├── components/
│   └── button.md                    ← Button variants, sizes, states, intent
└── patterns/
    └── interactive-hierarchy.md     ← which button variant for which context
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
