# Token sync: maxa-ui and the team ui-kit

Date: 2026-10-22. Measured against `gitlab/main` at `25789a55`.
Machine-generated detail: [`ui-kit-token-diff-2026-10-22.md`](./ui-kit-token-diff-2026-10-22.md),
regenerate with `node scripts/diff-ui-kit-tokens.mjs --md <out>`.

## Why this exists

Two repositories now hold the same design system:

| | `Stetsenko-Igor/maxa-ui` (GitHub) | `maxa-designs/ui-kit` (GitLab) |
| --- | --- | --- |
| Packages | `@maxa/ui`, `@maxa/tokens`, `@maxa/icons` 0.1.0 | `@maxa-ui/components`, `@maxa-ui/theme`, `@maxa-ui/icons` 2.4.0 |
| Published | no | GitLab Package Registry, CI + Changesets |
| CSS prefix | `--color-*`, `--button-*` | `--maxa-*` |
| Components | 43, authored here | migrated in per ticket by the team |

Their `packages/theme/tokens/` is the same file set as our `packages/tokens/figma/`,
and their `scripts/generateTheme.ts` opens with
`// Figma token JSON -> packages/theme/src. Never edit the generated files by hand.`

So the architecture already agrees: this repository is the token source, their
`@maxa-ui/theme` is generated from it. That is also the division Maxim stated on
2026-10-21 - tokens and CSS variables from our side, components from theirs.

A plain text diff makes the two sides look completely divergent, because each
writes references in a different notation (`{Color modes/action/action-primary}`
against `var(--color-action-primary)`). Resolving references to the token they
name shows the real picture.

## The real picture

**The foundation is already identical.** 21 of 59 files match byte for byte,
including every scale: `primitives`, `spacing`, `radius`, `typography`,
`typography-tablet`, `typography-mobile`, `layout-*`, `breakpoints`,
`effects-shadows`, and the `colors-feedback`, `colors-support` and
`colors-utility` sets. Nothing to negotiate there.

A further 8 files differ only in notation and are mechanically convertible:
checkbox, radio, toggle, divider, separator, progress, skeleton, utility-button.

That leaves 28 component and semantic-colour files with real differences, and
they fall into five groups.

### 1. Our export is wrong - fix on our side (13 findings)

| Problem | Count | Example |
| --- | --- | --- |
| Shadow tokens typed `string` or `color` instead of `shadow` | 9 | `Toast/shadow` is `{"$value": "var(--shadow-lg)", "$type": "string"}`; ui-kit has `"$type": "shadow"` |
| Opacity emitted on a 0-100 scale instead of 0-1 | 4 | `Button/disabled/opacity` is `50`; our own CSS says `0.5`, ui-kit says `0.5` |

Both are generator defects, not design decisions. Our CSS is correct in every
case, only the Figma JSON is wrong, so the fix is in the export step and costs
nothing in design terms. Affected: calendar, context-menu, date-picker, dialog,
drawer, select, slider, toast shadows; alert, button, input, tag opacity.

### 2. We reference primitives where they reference semantics (66 findings)

We emit `{Spacing/2}`, they emit `{Spacing/spacing-md}`. Same rendered value,
different layer. Their form is the one our own architecture asks for - the
semantic layer exists precisely so components do not name raw steps. Worth
adopting on our side.

### 3. Different composition models (63 findings)

These are genuine design-system decisions, not defects, and need an owner:

- **input-scoped versus shared tokens (45)** - we use `input-size-md-radius`
  and `input-border` inside Multi Select and Select; they use the shared
  `radius` and `border`.
- **line-height shape (13)** - we carry a separate `text-md--line-height`
  token; their typography token `text-md` already carries its line height.
- **focus ring naming (5)** - our `focus-ring` against their `border-focus`.

### 4. We are ahead on content (61 tokens only here, 40 only there)

Tokens that exist only in maxa-ui are the newer semantic work: `text-link*`,
`fg-link*`, `action-positive*`, `action-neutral-control*`, the `Effects/Focus
rings` group, and, as of today, `background/bg-on-color-hover|active` and the
`Button/destructive-outline` group. The 40 tokens only on their side are mostly
social-button and dropdown-menu entries plus semantic colours we have since
renamed.

### 5. Genuine value disagreements (83 findings)

Mostly Button and the semantic colour files, where our ladder moved on: for
example `Button/secondary/bg` is `action-neutral-control` here and
`action-neutral` there. These need a design call per token, and they are the
only group that genuinely needs discussion.

## What this means

Both sides are partly right. We are ahead on design content; their copy is
more correct where our export misbehaves. The sync is therefore two-way, but
asymmetric, and it has a natural order.

## Suggested order

1. **Fix the export defects** (group 1). Self-contained, no design input, removes
   13 differences and stops shipping bad `$type` and opacity values into Figma.
2. **Move component references from primitives to semantics** (group 2). Removes
   66 differences and aligns with our own documented layering.
3. **Normalise notation** (the 8 notation-only files plus the notation findings
   elsewhere). Mechanical, removes 260 differences and is what makes any future
   MR readable.
4. **Decide the composition models** (group 3) - one decision each for
   input-scoped tokens, line-height shape and focus-ring naming.
5. **Ship the content we are ahead on** (group 4) as a tokens-only change.
6. **Resolve the per-token value disagreements** (group 5) last, with design.

Steps 1 to 3 are ours alone and account for 339 of the 527 findings. Doing them
first is also what prevents the problem Maxim raised on 2026-10-21: a tokens MR
that touches every file for reasons that have nothing to do with design.

## Note on scope

This document covers tokens only. Component code, package naming (`@maxa/*`
against `@maxa-ui/*`), the CSS prefix (`--maxa-*`) and where packages get
published are separate questions and are not settled here.
