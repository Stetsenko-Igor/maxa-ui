# Typography Tokens — Foundation Spec

## Font Families

| Role | Family | CSS variable | When to use |
|------|--------|-------------|-------------|
| Body | Montserrat | `--font-family-body` | All UI text, headings, labels |
| Mono | Bebas Neue | `--font-family-mono` | Code blocks, technical display |

**Note:** Display font family tokens are intentionally not included. MAXA typography is app-oriented (SaaS UI), not marketing-oriented.

## Type Scale

The scale has three tiers: headings, body text, captions.

### Heading roles

| Role | Desktop | Tablet | Mobile | Line height (desktop) |
|------|---------|--------|--------|----------------------|
| `heading-2xl` | 40px | 36px | 32px | 48px |
| `heading-xl` | 32px | 30px | 28px | 40px |
| `heading-lg` | 26px | 24px | 22px | 34px |
| `heading-md` | 22px | 20px | 19px | 30px |
| `heading-sm` | 18px | 17px | 16px | 26px |
| `heading-xs` | 16px | 15px | 14px | 24px |

### Text roles

| Role | Desktop | Tablet | Mobile | Line height (desktop) |
|------|---------|--------|--------|----------------------|
| `text-lg` | 16px | 15px | 14px | 24px |
| `text-md` | 14px | 14px | 13px | 20px |
| `text-sm` | 12px | 12px | 12px | 18px |

### Caption roles

| Role | Desktop | Tablet | Mobile | Line height (desktop) |
|------|---------|--------|--------|----------------------|
| `caption-sm` | 10px | 10px | 10px | 16px |
| `caption-xs` | 8px | 8px | 8px | 12px |

## Font Weights

| Name | Value | CSS variable | When to use |
|------|-------|-------------|-------------|
| Regular | 400 | `--font-weight-regular` | Body copy |
| Medium | 500 | `--font-weight-medium` | Emphasized body, secondary headings |
| SemiBold | 600 | `--font-weight-semibold` | Button labels, strong UI labels |
| Bold | 700 | `--font-weight-bold` | Primary headings |

Each weight has an italic variant: `--font-weight-regular-italic`, etc.

## Usage Rules

### Heading hierarchy
- One `heading-2xl` or `heading-xl` per view — page title only
- `heading-lg` / `heading-md` — section titles
- `heading-sm` / `heading-xs` — subsections, card titles, sidebar labels

### Body text
- `text-md` (14px) — default body text in app UI
- `text-lg` (16px) — prominent body, introductory paragraphs
- `text-sm` (12px) — secondary/supporting text, helper text under inputs

### Captions
- `caption-sm` / `caption-xs` — timestamps, metadata, badge labels, fine print

### What NOT to do
- Do not use `font-size: 14px` — use `font-size: var(--font-size-text-md)`
- Do not mix heading roles for visual weight — use font-weight instead
- Do not use `display` roles — they are not in this system
- `label` is a component-level concern, not a foundation typography role

## Responsive behaviour

Typography modes (`Desktop` / `Tablet` / `Mobile`) are a separate Figma collection from `Layout`. Designers switch them independently. In code, font sizes can be set responsively via breakpoint media queries using the values from the scale above.

## Source files

- CSS: `packages/tokens/src/typography.css`
- Figma collection: `Typography` (Desktop / Tablet / Mobile modes)
- JSON: `packages/tokens/figma/typography.json`
