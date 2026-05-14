# Color Tokens — Foundation Spec

## Architecture

Three layers. Never skip a layer downward.

```
Primitives  →  Semantic tokens  →  Component tokens  →  Code
#1B1A1A         --color-text-primary   --button-primary-text   color: var(--button-primary-text)
```

**Rule:** UI code must only reference semantic or component tokens. Never reference primitives directly in components.

## Semantic Token Groups

### Text / Foreground

| Token | Light value | Dark value | When to use |
|-------|-------------|------------|-------------|
| `--color-text-primary` | Neutral/950 | Neutral/100 | Main body text, headings |
| `--color-text-secondary` | Neutral/800 | Neutral/200 | Supporting text, labels |
| `--color-text-tertiary` | Neutral/600 | Neutral/500 | Captions, metadata, placeholder |
| `--color-text-disabled` | Neutral/400 | Neutral/700 | Disabled form labels |
| `--color-text-inverse` | White | Neutral/900 | Text on dark/colored surfaces |
| `--color-text-on-brand` | Neutral/950 | Neutral/950 | Text on `bg/brand-solid` (teal is bright → use dark text) |
| `--color-text-brand` | Brand/600 | Brand/400 | Brand-colored labels, links |
| `--color-text-info` | Blue/600 | Blue/400 | Informational copy |
| `--color-text-success` | Green/600 | Green/400 | Success messages |
| `--color-text-error` | Red/600 | Red/400 | Error messages, validation |
| `--color-text-warning` | Yellow/600 | Yellow/400 | Warning messages |

**Critical:** `--color-text-inverse` is for text on dark backgrounds. `--color-text-on-brand` is specifically for text on `bg/brand-solid` — do NOT use `text-inverse` there because MAXA teal is bright and requires dark text for contrast.

### Background / Surface

| Token | Light value | Dark value | When to use |
|-------|-------------|------------|-------------|
| `--color-bg-page` | White | Neutral/1000 | Page/viewport canvas |
| `--color-bg-elevated` | White | Neutral/900 | Inputs, cards, raised elements |
| `--color-bg-primary` | Neutral/50 | Neutral/950 | Main app surface |
| `--color-bg-secondary` | Neutral/25 | Neutral/900 | Secondary surface |
| `--color-bg-tertiary` | Neutral/100 | Neutral/800 | Recessed/inset areas |
| `--color-bg-neutral-subtle` | Neutral/100 | Neutral/900 | Subtle section backgrounds |
| `--color-bg-disabled` | Neutral/100 | Neutral/800 | Disabled input backgrounds |
| `--color-bg-overlay` | Black/50% | Black/70% | Modal/drawer backdrops |
| `--color-bg-nav` | #1b1a1a | #1b1a1a | Navigation bar (always dark — no dark override) |
| `--color-bg-brand-subtle` | Brand/50 | Brand/950 | Brand-tinted section backgrounds |
| `--color-bg-brand` | Brand/100 | Brand/900 | Brand surface |
| `--color-bg-brand-solid` | Brand/500 | Brand/600 | Solid brand-colored surfaces |

### Border

| Token | Light value | Dark value | When to use |
|-------|-------------|------------|-------------|
| `--color-border-primary` | Neutral/300 | Neutral/700 | Default input, card borders |
| `--color-border-secondary` | Neutral/400 | Neutral/800 | Stronger borders |
| `--color-border-subtle` | Neutral/200 | Neutral/800 | Dividers, subtle separators |
| `--color-border-focus` | Blue/500 | Blue/400 | Focus rings on interactive elements |
| `--color-border-brand` | Brand/500 | Brand/400 | Brand-accented borders |
| `--color-border-error` | Red/500 | Red/400 | Invalid input borders |

### Action (interactive backgrounds)

Action tokens drive button and interactive element surfaces. Always use action tokens for interactive backgrounds — not bg tokens.

| Group | Tokens | Use case |
|-------|--------|---------|
| `action/primary` | `--color-action-primary` + hover/active variants | Primary CTA, blue buttons |
| `action/neutral` | `--color-action-neutral` + hover/active variants | Secondary / neutral buttons |
| `action/brand` | `--color-action-brand` + hover/active variants | Brand-teal interactive elements |
| `action/positive` | `--color-action-positive` + hover/active variants | Success/confirm actions |
| `action/negative` | `--color-action-negative` + hover/active variants | Destructive/danger actions |
| `action/warning` | `--color-action-warning` + hover/active variants | Warning actions |

Each group has: default, `-hover`, `-active`, `-subtle`, `-subtle-hover`, `-subtle-active`.

## Common Mistakes to Avoid

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `color: #1B1A1A` | `color: var(--color-text-primary)` |
| `background: #0265DC` | `background: var(--color-action-primary)` |
| `border-color: #E4E4E4` | `border-color: var(--color-border-primary)` |
| `color: var(--color-gray-950)` directly in component | `color: var(--color-text-primary)` |
| White text on brand solid | `color: var(--color-text-on-brand)` (dark text, not white) |

## Dark mode

Dark mode is applied via `data-theme="dark"` on `<html>`. All semantic tokens automatically switch. Do not write separate dark mode selectors for color — they are handled at the token level.

```html
<html data-theme="dark">
```

## Source files

- CSS: `packages/tokens/src/semantic.css`
- Figma collection: `Color modes` (Light / Dark modes)
- Primitives: `packages/tokens/src/primitives.css`
