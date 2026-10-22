# Token sync: maxa-ui and the team ui-kit

Date: 2026-10-23. Measured against `gitlab/main` at `25789a55`.
Machine-generated detail: [`ui-kit-token-diff-2026-10-23.md`](./ui-kit-token-diff-2026-10-23.md),
regenerate with `node scripts/diff-ui-kit-tokens.mjs --md <out>`.

## Why this exists

Two repositories hold the same design system:

| | `Stetsenko-Igor/maxa-ui` (GitHub) | `maxa-designs/ui-kit` (GitLab) |
| --- | --- | --- |
| Packages | `@maxa/ui`, `@maxa/tokens`, `@maxa/icons` 0.1.0 | `@maxa-ui/components`, `@maxa-ui/theme`, `@maxa-ui/icons` 2.4.0 |
| Published | no | GitLab Package Registry, CI + Changesets |
| CSS prefix | `--color-*`, `--button-*` | `--maxa-*` |
| Components | 43, authored here | migrated in per ticket by the team |

Their `packages/theme/tokens/` is the same file set as our
`packages/tokens/figma/`, and their `scripts/generateTheme.ts` opens with
`// Figma token JSON -> packages/theme/src. Never edit the generated files by hand.`

The architecture already agrees: this repository is the token source, their
`@maxa-ui/theme` is generated from it. That also matches the division Maxim
stated on 2026-10-21 - tokens and CSS variables from our side, components from
theirs.

A plain text diff made the two look completely divergent, because each side
wrote references in a different notation. Resolving references to the token
they name showed most of it was noise.

## Where it stands now

| | Before 2026-10-23 | After |
| --- | --- | --- |
| Files identical | 21 of 59 | **36 of 59** |
| Notation-only differences | 260 | **6** |
| References pointing elsewhere | 212 | **29** |
| Type mismatches | 9 | **1** |

What was fixed on our side, in commit `6c7afdf2`:

- **Export types.** Shadow tokens were typed `string` or `color` instead of
  `shadow` (calendar, context-menu, date-picker, dialog, drawer, select,
  slider, toast), and `Select/disabled-opacity` was typed `color`. Our CSS was
  correct throughout; only the Figma JSON was wrong.
- **Layer discipline.** 69 component tokens referenced a raw spacing primitive
  (`{Spacing/2}`) where a semantic token exists (`{Spacing/spacing-md}`). Same
  resolved value, correct layer, and the form ui-kit reads.
- **Notation.** 380 remaining `var(--x)` references were rewritten to Figma
  alias syntax, using exactly the values `build-figma-import-bundle.mjs`
  already produces.

That last step is safe by construction: `import-bundle.json` is byte-identical
before and after, so nothing reaching Figma changed. Normalising also resolved
two groups that had looked like design disagreements - 45 input-scoped token
references and 13 line-height shape differences were notation artefacts.

## What is left

### Needs a design decision (29)

- **Semantic value disagreements (24)** - mostly `Button/secondary/*`, where our
  ladder moved on: we point at `action-neutral-control`, they still point at
  `action-neutral`. Our side is newer; the question is when they adopt it.
- **Focus ring naming (5)** - our `focus-ring` against their `border-focus` in
  input and file-input.

### Needs a decision from Igor (4)

**Opacity scale.** `Alert/dismiss/opacity`, `Button/disabled/opacity`,
`Input/disabled/opacity` and `Tag/remove/opacity` are written on a 0-100 scale
(`65`, `50`, `100`) while ui-kit, our own CSS, our specs and even our own
`Slider/disabled-opacity` use 0-1 (`0.65`, `0.5`, `1`). The 0-100 values are
almost certainly a mistake, and `AGENTS.md` records one of them
(`Button/disabled/opacity = 50`) as if it were a decision.

This was left untouched deliberately. Changing it rewrites variables that
already exist in the live Figma file on the next import, and how Figma
interprets those numbers was not verified from here. It needs one check in the
file before it is changed.

### Content, not conflict (101)

61 tokens exist only here, 40 only there. Ours are the newer semantic work -
`text-link*`, `fg-link*`, `action-positive*`, `action-neutral-control*`, the
`Effects/Focus rings` group, `background/bg-on-color-*` and
`Button/destructive-outline`. Theirs are mostly social-button and
dropdown-menu entries plus semantic colours we have since renamed. This is a
delivery question, not a disagreement.

## Remaining order of work

1. Settle the opacity scale (one check in the Figma file, then a small change).
2. Deliver the 61 tokens we are ahead on as a tokens-only change.
3. Agree the focus-ring naming and the `action-neutral-control` ladder with
   whoever owns component tokens on their side.

Steps that were ours alone are done. A tokens MR raised now touches 28 files
for reasons that are all explainable, instead of all 59 for reasons that are
not.

## Note on scope

This document covers tokens only. Component code, package naming (`@maxa/*`
against `@maxa-ui/*`), the CSS prefix (`--maxa-*`) and where packages get
published are separate questions and are not settled here.
