# Badge

Status: implemented
Canonical spec for the MAXA `Badge` component. Supersedes the Badge section of `badge-tag-pill.md` (which remains the broader Badge/Tag/FilterChip handoff).

## Purpose

Badge is a compact, **non-interactive** indicator for status, count, or metadata. It is not a control. For removable labels use `Tag`; for interactive filters use `FilterChip` (both planned, not yet built).

## Anatomy

`[ leading icon? ] [ label ] [ trailing icon? ]` inside a pill container.

- Pill shape (`--radius-full`).
- Optional leading and/or trailing icon (decorative, `aria-hidden`).
- Label text (Montserrat Medium, 12px).

## Props

```ts
type BadgeIntent   = "neutral" | "info" | "success" | "warning" | "error"
type BadgeEmphasis = "low" | "medium" | "high"
type BadgeSize     = "sm" | "md"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  intent?: BadgeIntent      // default "neutral"
  emphasis?: BadgeEmphasis  // default "low"
  size?: BadgeSize          // default "md"
  asChild?: boolean         // render as a custom element via Radix Slot
  icon?: React.ReactNode
  trailingIcon?: React.ReactNode
}
```

### Intent
`neutral` (default) · `info` · `success` · `warning` · `error`. Naming matches existing semantic tokens (`--color-text-{info,success,warning,error}`).

### Emphasis
- `low` (default) — subtle tinted background, intent-colored text.
- `medium` — muted background (one step stronger), intent-colored text.
- `high` — strong solid background, inverse (white) text.

### Size
- `sm` — height 20px, padding-x 6px, icon 12px.
- `md` (default) — height 24px, padding-x 8px, gap 4px, icon 14px.

## Examples

```tsx
<Badge intent="neutral" emphasis="low">Draft</Badge>
<Badge intent="success" emphasis="medium">Active</Badge>
<Badge intent="error" emphasis="high">Failed</Badge>
<Badge intent="info" icon={<DotIcon />}>New</Badge>
<Badge size="sm" intent="warning">Pending</Badge>
```

## Color strategy

Badge uses **MAXA's existing semantic palette** — the same Tailwind-derived intent colors used across the project (consistent with UntitledUI-OSS, which also uses Tailwind for status). The palette in the source Figma reference (`6020:18341`) came from a foreign design system (`nonSemantic-*` variables) and was **intentionally not adopted**.

The only token added is a `muted` (medium-emphasis) tier, aliasing existing primitives — no new color values:

```
--color-bg-{intent}-muted   /* {hue}-100 light / {hue}-900 dark */
```

Dark mode is automatic: Badge consumes semantic tokens that already carry `[data-theme="dark"]` overrides.

## Component tokens (Layer 3)

Defined in `packages/tokens/src/component-badge.css`, mapped per `[data-intent][data-emphasis]`:

```
--badge-bg, --badge-fg, --badge-icon, --badge-border,
--badge-radius, --badge-font-family, --badge-font-weight,
--badge-size-{sm,md}-{height,padding-x,gap,font,icon}
```

Mapping rule per intent:
- low    → bg `--color-bg-{intent}-subtle`, fg `--color-text-{intent}`
- medium → bg `--color-bg-{intent}-muted`,  fg `--color-text-{intent}`
- high   → bg `--color-bg-{intent}-strong`,  fg `--color-text-inverse`

(`neutral` low/medium use `--color-text-secondary` / `--color-text-primary`.)

## Accessibility

- Badge is decorative/informational text; no ARIA role is forced. If a badge conveys state not otherwise available to assistive tech, the **consumer** must provide an accessible label in surrounding content.
- Icons are `aria-hidden` — never rely on icon alone to convey meaning; include a text label.
- Color is never the sole signal: pair intent with the label text.

## Do / Don't

- Do use Badge for static status/count/metadata.
- Do keep labels short (1–2 words).
- Don't attach click handlers or use Badge as a button — use `Button`/`FilterChip`.
- Don't make Badge removable — that is `Tag`.
- Don't introduce the foreign Figma palette; stay on MAXA semantic tokens.

## Deferred
- Dot-only / count-only variants.
- `border` styling per intent (currently transparent).
- Dedicated dark-mode Figma handoff if design wants values distinct from the automatic semantic overrides.
