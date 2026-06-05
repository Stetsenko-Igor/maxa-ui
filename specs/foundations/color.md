# Color Tokens — Foundation Spec

## Architecture

Three layers. Never skip a layer downward.

```
Primitives  →  Semantic tokens  →  Component tokens  →  Code
#1B1A1A         --color-text-primary   --button-primary-text   color: var(--button-primary-text)
```

**Rule:** UI code must only reference semantic or component tokens. Never reference primitives directly in components.

## Semantic Token Groups

### Text

| Token | Light value | Dark value | When to use |
|-------|-------------|------------|-------------|
| `--color-text-primary` | Neutral/950 | Neutral/100 | Main body text, headings |
| `--color-text-secondary` | Neutral/800 | Neutral/200 | Supporting text, labels |
| `--color-text-tertiary` | Neutral/600 | Neutral/500 | Captions, metadata, placeholder |
| `--color-text-disabled` | Neutral/400 | Neutral/700 | Disabled form labels |
| `--color-text-inverse` | White | Neutral/900 | Text on dark/colored surfaces |
| `--color-text-on-brand` | Neutral/950 | Neutral/950 | Text on `bg-brand-strong` (teal is bright → use dark text) |
| `--color-text-brand` | Brand/600 | Brand/400 | Brand-colored labels, links |
| `--color-text-info` | Blue/600 | Blue/400 | Informational copy |
| `--color-text-success` | Green/600 | Green/400 | Success messages |
| `--color-text-error` | Red/600 | Red/400 | Error messages, validation |
| `--color-text-warning` | Yellow/600 | Yellow/400 | Warning messages |

**Critical:** `--color-text-inverse` is for text on dark backgrounds. `--color-text-on-brand` is specifically for text on `bg-brand-strong` — do NOT use `text-inverse` there because MAXA teal is bright and requires dark text for contrast.

### Foreground

Foreground tokens are for icons, SVG strokes/fills, decorative marks, and other non-text foreground elements. Do not use `text-*` tokens for icons unless the icon must exactly inherit adjacent text color.

| Token | Light value | Dark value | When to use |
|-------|-------------|------------|-------------|
| `--color-fg-primary` | Neutral/950 | Neutral/100 | Highest-emphasis icons and non-text foreground |
| `--color-fg-secondary` | Neutral/800 | Neutral/200 | Supporting icons |
| `--color-fg-tertiary` | Neutral/600 | Neutral/500 | Low-emphasis icons, placeholders, subtle controls |
| `--color-fg-disabled` | Neutral/400 | Neutral/700 | Disabled icons |
| `--color-fg-inverse` | White | Neutral/900 | Icons on dark/inverted surfaces |
| `--color-fg-on-brand` | Neutral/950 | Neutral/950 | Icons on `bg-brand-strong` |
| `--color-fg-brand` | Brand/600 | Brand/400 | Brand-colored icons |
| `--color-fg-info` | Blue/600 | Blue/400 | Informational icons |
| `--color-fg-positive` | Green/700 | Green/400 | Success icons |
| `--color-fg-negative` | Red/700 | Red/400 | Error/destructive icons |
| `--color-fg-warning` | Yellow/600 | Yellow/400 | Warning icons |

### Background / Surface

**Surface elevation model — page + surface + float + muted + overlay.**

The visual hierarchy comes from elevation, not shadow: the page is gray, content-bearing surfaces sit above it, floating UI can have its own surface token, and recessed zones (code blocks, search-fields-in-sidebars) sink below the page color.

| Token | Light value | Dark value | When to use |
|-------|-------------|------------|-------------|
| `--color-bg-page` | Neutral/50 (#F5F6FA) | Neutral/1000 (#0D0D0D) | Lowest layer — the page/viewport canvas itself. Everything else floats on top. |
| `--color-bg-surface` | Base white (#FFFFFF) | Neutral/900 (#2A2A2B) | **Default for raised content.** Use for: inputs, cards, modals, sidebar/drawer, table rows, content containers. |
| `--color-bg-float` | Base white (#FFFFFF) | Neutral/800 (#444445) | Floating surfaces that sit above regular surfaces: dropdown menus, popovers, tooltips, floating command palettes. |
| `--color-bg-muted` | Neutral/25 (#F8F8F8) | Neutral/975 (#161616) | Recessed/sunken zones. Use for: code blocks, wells, table fill (under white rows), search-fields embedded in dark sidebars, disabled-input fill alternative. |
| `--color-bg-overlay` | Black/50% | Black/70% | Modal/drawer scrim. |
| `--color-bg-inverse` | Neutral/950 | Neutral/950 | Inverted surface (dark even on light theme). |
| `--color-bg-disabled` | Neutral/100 | Neutral/800 | Disabled input/control backgrounds. |

**Decision tree — choosing a surface token:**

1. Is this the page/viewport background itself? → `bg/page`
2. Is this a regular interactive or content-bearing surface above the page (card, input, modal, sidebar)? → `bg/surface`
3. Is this a floating layer above other surfaces (dropdown, popover, tooltip, floating command palette)? → `bg/float`
4. Is this a recessed/inset zone (code block, well, table-fill under rows)? → `bg/muted`
5. Is this a modal scrim? → `bg/overlay`
6. None of the above — it's status/intent (success, error, brand, etc.)? → use the status bg tokens below, not the elevation tier.

**Examples:**

| Element | Token |
|---------|-------|
| Body of every docs/app page | `bg/page` |
| Card on a docs page | `bg/surface` |
| Modal panel | `bg/surface` |
| Input field | `bg/surface` |
| Dropdown menu | `bg/float` |
| Tooltip / Popover panel | `bg/float` |
| Sidebar / Drawer | `bg/surface` |
| Table row | `bg/surface` |
| Table outer area / gaps between rows | `bg/muted` or `bg/page` (match the page) |
| Code block (`<pre>`) inside a card | `bg/muted` |
| Search-field embedded in a dark sidebar | `bg/muted` |
| Modal backdrop | `bg/overlay` |

**Component-specific bg:** `--nav-bg` lives in the **component layer** (`component-nav.css`), not semantic. Navigation surface is always dark regardless of theme.

### Status / intent backgrounds (orthogonal to elevation)

These are colored fills for tags, alerts, badges, and intent feedback. They are orthogonal to the surface elevation tier above — you may layer them on a `bg/surface` or `bg/page`.

`{intent}` in the naming pattern means one of the supported semantic intents: `neutral`, `brand`, `info`, `success`, `warning`, or `error`. For example, `--color-bg-{intent}-subtle` becomes `--color-bg-success-subtle` or `--color-bg-error-subtle`.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--color-bg-neutral-subtle` | Neutral/100 | Neutral/800 | Subtle section background |
| `--color-bg-neutral-on-subtle` | Neutral/200 | Neutral/700 | Slightly stronger neutral |
| `--color-bg-neutral-strong` | Neutral/800 | Neutral/400 | Strong neutral (inverse) |
| `--color-bg-brand-subtle` | Brand/50 | Brand/950 | Brand-tinted section |
| `--color-bg-brand-surface` | Brand/100 | Brand/900 | Brand surface |
| `--color-bg-brand-strong` | Brand/500 | Brand/600 | Strong brand fill |
| `--color-bg-info-subtle` | Blue/50 | Blue/950 | Info section bg |
| `--color-bg-info-surface` | Blue/50 | Blue/950 | Info surface fill |
| `--color-bg-info-strong` | Blue/700 | Blue/500 | Strong info fill |
| `--color-bg-success-subtle` | Green/50 | Green/950 | Success section bg |
| `--color-bg-success-surface` | Green/50 | Green/950 | Success surface fill |
| `--color-bg-success-strong` | Green/700 | Green/500 | Strong success fill |
| `--color-bg-error-subtle` | Red/50 | Red/950 | Error section bg |
| `--color-bg-error-surface` | Red/50 | Red/950 | Error surface fill |
| `--color-bg-error-strong` | Red/700 | Red/500 | Strong error fill |
| `--color-bg-warning-subtle` | Orange/50 | Yellow/950 | Warning section bg |
| `--color-bg-warning-surface` | Orange/50 | Yellow/950 | Warning surface fill |
| `--color-bg-warning-strong` | Orange/600 | Orange/500 | Strong warning fill |

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
| `color: var(--color-neutral-950)` directly in component | `color: var(--color-text-primary)` |
| Icon uses `var(--color-text-secondary)` by default | Use `var(--color-fg-secondary)` unless it intentionally inherits text |
| White text on brand solid | `color: var(--color-text-on-brand)` (dark text, not white) |
| `background: var(--color-bg-primary)` / `-secondary` / `-tertiary` | Pick `bg/page`, `bg/surface`, `bg/float`, or `bg/muted` by intent |
| Hardcoded shadow to separate a card from page in light mode | Use the gray page (`bg/page`) + white surface (`bg/surface`) — hierarchy is built-in |

## Dark mode

Dark mode is applied via `data-theme="dark"` on `<html>`. All semantic tokens automatically switch. Do not write separate dark mode selectors for color — they are handled at the token level.

```html
<html data-theme="dark">
```

## Source files

- CSS: `packages/tokens/src/semantic.css`
- Figma collection: `Color modes` (Light / Dark modes)
- Primitives: `packages/tokens/src/primitives.css`
