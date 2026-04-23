# Token Structure — Semantic Colors

> **Status:** Agreed (April 2026)  
> **Applies to:** `packages/tokens/figma/colors-semantic-light.json` + `colors-semantic-dark.json`  
> **Figma collection:** `Color modes` — modes `Light / Dark`

---

## Naming Principles

- Groups: `text-`, `bg-`, `border-`, `action-`
- Neutral hierarchy levels: `primary`, `secondary`, `tertiary`
- Status background tint: `-subtle` for weak tints, usually palette 50-100
- Status filled background: `-solid` for saturated fills, usually palette 500
- **Default state has no suffix**: use `action-primary`, not `action-primary-default`
- States: `-hover`, `-active`; active covers both pressed and selected
- Subtle states: `-subtle`, `-subtle-hover`, `-subtle-active`
- Use hyphenated CSS names in code; Figma variables may use grouped slash paths where useful.
- Name = documentation: `action-primary-subtle-hover` communicates action, primary type, subtle variant, hover state.

> **Default/normal suffix decision:** do not add `-default` for now. If Figma becomes hard to scan without an explicit default suffix, add `-default` later. CSS systems such as Radix, shadcn, and GitHub Primer do not use a suffix for default states.

---

## Text

Current Figma names use slash grouping, for example `text/primary`. CSS names may use hyphens, for example `text-primary`.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `text/primary` | neutral-950 `#1B1A1A` | neutral-100 | Headings, main body text |
| `text/secondary` | neutral-800 `#444445` | neutral-200 | Secondary text, labels, descriptions |
| `text/tertiary` | neutral-600 `#8C8C8E` | neutral-500 | Placeholder, hints, low emphasis |
| `text/disabled` | neutral-400 `#D7D5D5` | neutral-700 | Disabled text |
| `text/inverse` | white | neutral-900 | Text on dark/inverse backgrounds |
| `text/on-brand` | neutral-950 | neutral-950 | Foreground on `bg/brand-solid` |
| `text/brand` | brand-600 | brand-400 | Brand accents |
| `text/success` | green-600 | green-400 | Success messages |
| `text/warning` | yellow-600 | yellow-400 | Warning messages |
| `text/error` | red-600 | red-400 | Error messages |
| `text/info` | blue-600 | blue-400 | Info messages |

## Background

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `bg/primary` | neutral-50 `#F5F6FA` | neutral-950 | Page background |
| `bg/secondary` | neutral-25 `#FCFCFC` | neutral-900 | Cards, panels |
| `bg/tertiary` | neutral-100 `#F4F3F3` | neutral-800 | Nested sections |
| `bg/disabled` | neutral-100 | neutral-800 | Disabled fields |
| `bg/overlay` | alpha-black-50 | alpha-black-70 | Modal overlay |
| `bg/inverse` | neutral-950 `#1B1A1A` | neutral-950 | Inverse sections such as navbar-like surfaces |
| `bg/brand-subtle` | brand-50 | brand-950 | Light brand tint |
| `bg/brand` | brand-100 | brand-900 | Brand section/card background |
| `bg/brand-solid` | brand-500 `#31e5c2` | brand-600 | Filled brand badges/buttons/surfaces |
| `bg/success-subtle` | green-50 | green-950 | Success banner background |
| `bg/success-solid` | green-500 | green-500 | Success badge |
| `bg/warning-subtle` | yellow-50 | yellow-950 | Warning banner background |
| `bg/warning-solid` | yellow-500 | yellow-500 | Warning badge |
| `bg/error-subtle` | red-50 | red-950 | Error banner background |
| `bg/error-solid` | red-500 | red-500 | Error badge |
| `bg/info-subtle` | blue-50 | blue-950 | Info banner background |
| `bg/info-solid` | blue-500 | blue-500 | Info badge |

## Border

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `border/primary` | neutral-300 `#E4E4E4` | neutral-700 | Primary borders |
| `border/secondary` | neutral-400 `#D7D5D5` | neutral-800 | Thin dividers |
| `border/disabled` | neutral-200 | neutral-800 | Disabled fields |
| `border/focus` | blue-500 | blue-400 | Focus ring |
| `border/brand` | brand-500 | brand-400 | Brand outlined elements |
| `border/error` | red-500 | red-400 | Error fields |

## Action

Pattern: 6 types x 6 states = **36 tokens**

```text
action/{type}                  <- default, no suffix
action/{type}-hover
action/{type}-active           <- covers pressed + selected

action/{type}-subtle           <- weak tint, default
action/{type}-subtle-hover
action/{type}-subtle-active
```

| Type | Color | Solid Usage | Subtle Usage |
|------|-------|-------------|--------------|
| `primary` | blue | Primary buttons, links | Row hover/selected, active item |
| `brand` | teal | Brand buttons | Brand hover area |
| `positive` | green | Success buttons | Success row, active filter |
| `negative` | red | Danger buttons | Error row, delete confirmation |
| `warning` | yellow | Warning buttons | Warning row |
| `neutral` | neutral | Secondary buttons | Neutral hover |

### Action / Primary (blue)

| Token | Light | Dark |
|-------|-------|------|
| `action/primary` | blue-500 | blue-400 |
| `action/primary-hover` | blue-600 | blue-300 |
| `action/primary-active` | blue-700 | blue-200 |
| `action/primary-subtle` | blue-50 | blue-950 |
| `action/primary-subtle-hover` | blue-50 | blue-950 |
| `action/primary-subtle-active` | blue-200 | blue-900 |

### Action / Brand (teal)

| Token | Light | Dark |
|-------|-------|------|
| `action/brand` | brand-500 `#31e5c2` | brand-600 |
| `action/brand-hover` | brand-600 `#15cba8` | brand-500 |
| `action/brand-active` | brand-700 | brand-400 |
| `action/brand-subtle` | brand-50 | brand-950 |
| `action/brand-subtle-hover` | brand-50 | brand-950 |
| `action/brand-subtle-active` | brand-200 | brand-900 |

### Action / Positive, Negative, Warning, Neutral

The same pattern applies to the green, red, yellow, and neutral scales respectively.

---

## Removed From the Old Figma Semantic Color System

| Removed | Reason |
|---------|--------|
| `Action/Inverted` | Button style, not color; belongs at component level |
| `Action/Ghost` | Button style; belongs at component level |
| `Action/Outline` | Button style; belongs at component level |
| `Action/Reverse Inverted` | Button style; belongs at component level |
| `selected` state | Visually equivalent to `active`; `active` covers both cases |
| `bg-nav` | Component token; replaced by `bg/inverse` |
| `interactive-*` group | Renamed to `action-*`, which is more precise and understandable |

---

## Primitive Structure

```text
Colors/
  Base/          -> white, black, transparent
  Neutral/       -> 25, 50-950
  Neutral (alpha)/
    White/       -> alpha white 10 ... 100
    Black/       -> alpha black 10 ... 100
  Brand/         -> 50-950 (#31e5c2 = 500, #15cba8 = 600)

  Tailwind palette:
  Slate, Gray, Zinc, Stone,
  Red, Orange, Amber, Yellow, Lime, Green,
  Emerald, Teal, Cyan, Sky, Blue, Indigo,
  Violet, Purple, Fuchsia, Pink, Rose
```

### Neutral Scale

| Stop | Hex | System Usage |
|------|-----|--------------|
| 25 | `#FCFCFC` | `bg/secondary` |
| 50 | `#F5F6FA` | `bg/primary` |
| 100 | `#F4F3F3` | `bg/tertiary`, `bg/disabled` |
| 200 | `#E9EAEF` | `border/disabled` |
| 300 | `#E4E4E4` | `border/primary` |
| 400 | `#D7D5D5` | `border/secondary`, `text/disabled` |
| 500 | `#A1A1A4` | `text/tertiary` in older state; currently dark tertiary |
| 600 | `#8C8C8E` | `text/tertiary` light |
| 700 | `#6B6B6D` | dark disabled text |
| 800 | `#444445` | `text/secondary` light |
| 900 | `#2A2A2B` | dark inverse text |
| 950 | `#1B1A1A` | `text/primary` light, `bg/inverse` |

### Brand Scale

| Stop | Hex | System Usage |
|------|-----|--------------|
| 50 | `#f0fdfb` | `bg/brand-subtle`, `action/brand-subtle` |
| 100 | `#ccfbf4` | `bg/brand` |
| 500 | `#31e5c2` | `bg/brand-solid` light, `action/brand` light |
| 600 | `#15cba8` | `bg/brand-solid` dark, `action/brand` dark, `text/brand` light |
| 950 | `#053d35` | `bg/brand-subtle` dark |

---

## Architecture Decisions

**Tailwind is not a separate collection**: MAXA is Design System-first, not Tailwind-first.  
**Tailwind neutral is not duplicated**: MAXA `Neutral` is the main neutral scale.  
**`bg-nav` was removed from semantic colors**: it is a component token; navbar-like surfaces use `bg/inverse`.  
**`action-` replaced `interactive-`**: it describes the purpose more clearly.
