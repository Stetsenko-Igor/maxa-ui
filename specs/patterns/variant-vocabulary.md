# Variant Vocabulary — Pattern Spec

## Why this exists

Across components the same idea — "what color/treatment does this take" — has been
expressed under four different prop names (`intent`, `appearance`, `tone`, `variant`).
With no documented rule, every new component re-decides the name, and consumers cannot
predict the prop. This spec defines the **canonical axes** so the 40-component surface
reads like one system. Audit reference: `.planning/foundation-excellence-audit.md` (F5).

## The axes

Each visual prop expresses exactly **one** of these axes. Pick the axis first, then the
prop name follows from it.

| Axis | Prop name | Means | Allowed-value shape | Examples |
| --- | --- | --- | --- | --- |
| **Semantic meaning** | `intent` | The color *carries meaning* about status/outcome. Changing it changes what the UI says, not just how it looks. | A small closed set of status words | `neutral \| info \| success \| warning \| danger`/`error`, plus `brand` where a brand-colored state is meaningful |
| **Decorative palette** | `appearance` | A named, non-semantic color treatment chosen for categorization/identity/contrast. No semantic meaning — swapping it does not change meaning. Usually the shared hue palette; a component may define its own treatment set when the shared hues do not apply (e.g. Spinner's surface-contrast set). | Shared categorical hues, or a documented component-local set | `gray \| red \| … \| rose` (badge/tag); `white \| primary \| greyscale \| inverted` (spinner) |
| **Visual weight** | `emphasis` | How strong/loud the treatment is at a fixed meaning. | An ordinal scale | `low \| medium \| high` |
| **Structure** | `variant` | A structural/treatment choice that is **not** about color meaning. | Component-specific structural words | button hierarchy (`primary \| secondary \| outline \| ghost \| link`), menu item (`default \| destructive`), skeleton (`text \| rect \| circle`) |
| **Dimension** | `size` | Physical scale. | `xs \| sm \| md \| lg \| xl` | every sized component |
| **Form** | `shape` | Geometric form. | `circle \| square \| …` | avatar |

### Naming rules

1. **`intent` = meaning, `appearance` = palette.** If removing the prop would change what
   the UI *communicates*, it is `intent`. If it only changes which decorative hue is shown,
   it is `appearance`.
2. **`tone` is retired.** It previously straddled both "weight" and "palette". Use
   `emphasis` for weight and `appearance` for palette. Do not introduce new `tone` props.
3. **`variant` is for structure, never for semantic color.** Status colors belong in
   `intent`. The one documented exception is Button (below).
4. **Closed value sets per axis are consistent.** When two components share an axis, prefer
   the same value words (e.g. both `intent` sets use `success`/`warning`). Add a value only
   when the component genuinely needs it (`brand` on progress, `neutral` on badge).
5. **One axis per prop.** Do not fold meaning + palette into a single prop.

## Current mapping

Status of every color/treatment prop on the public surface against the axes above.

| Component | Prop | Axis | Aligned? |
| --- | --- | --- | --- |
| Alert | `intent` | semantic meaning | ✅ |
| Badge | `intent` | semantic meaning | ✅ |
| Badge | `appearance` | decorative palette | ✅ |
| Badge | `emphasis` | visual weight | ✅ |
| Progress | `intent` | semantic meaning | ✅ |
| Tag | `appearance` | decorative palette | ✅ |
| Tag | `emphasis` | visual weight | ✅ |
| Context Menu (item) | `variant` (`default \| destructive`) | structure | ✅ |
| Dropdown Menu (item) | `variant` (`default \| destructive`) | structure | ✅ |
| Skeleton | `variant` (`text \| rect \| circle`) | structure (shape-as-variant) | ✅ |
| Button | `variant` (hierarchy + status) | structure — **documented exception** | ⚠️ exception |
| Avatar | `appearance` (9 hues) | decorative palette | ✅ |
| Avatar | `emphasis` (`strong \| medium \| neutral`) | visual weight | ✅ |
| Spinner | `appearance` (`white \| primary \| greyscale \| inverted`) | non-semantic color treatment (component-local set) | ✅ |

### Button — intentional exception

Button keeps a single `variant` prop that mixes structural hierarchy (`primary`,
`secondary`, `outline`, `ghost`, `link`) with status (`success`, `danger`, `warning`).
This matches the shadcn/Radix convention consumers expect and is governed by
`specs/patterns/interactive-hierarchy.md` (one-primary-per-view). It is **not** split into
`variant` + `intent`. New components must not copy this fusion; it is grandfathered for
Button only.

## Alignment status

All previously-fragmented props are now aligned to the glossary (2026-06-25, breaking,
pre-v1):

- **Avatar**: `color` → `appearance` (decorative palette) and `tone` → `emphasis` (visual
  weight). `data-color`/`data-tone` selectors became `data-appearance`/`data-emphasis`.
- **Spinner**: deprecated `tone` shim removed (closes audit F6); `appearance` retained and
  documented as a non-semantic component-local color treatment set.

Button's fused `variant` remains the single grandfathered exception (above). No open
fragmentation debt remains on the public surface.

## Checklist for any new component

- [ ] Does a color prop carry meaning? → name it `intent`, reuse the shared status words.
- [ ] Is it a decorative hue with no meaning? → name it `appearance`, reuse the palette.
- [ ] Is it loudness at fixed meaning? → name it `emphasis` (`low \| medium \| high`).
- [ ] Is it a structural treatment, not color? → name it `variant`.
- [ ] Never name a new prop `tone`.
- [ ] Do not fuse two axes into one prop (Button is the only grandfathered exception).
