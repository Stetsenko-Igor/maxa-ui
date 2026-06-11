# Badge

Status: implemented
Canonical spec for the MAXA `Badge` component. Supersedes the Badge section of the archived `_archive/badge-tag-pill.md` (retained as historical Badge/Tag/Pill research).

## Purpose

Badge is a compact, **non-interactive** indicator for status, count, quality, or metadata. It is not a control. For interactive or removable data labels use `Tag`. Interactive filter controls remain a future pattern decision; do not introduce `Pill` or `FilterChip` as a core component until the product semantics are clearer.

## Anatomy

`[ leading icon? ] [ label ] [ trailing icon? ]` inside a pill container.

- Pill shape (`--radius-full`).
- Optional leading and/or trailing icon (decorative, `aria-hidden`).
- Label text.
- Badge must not render a remove button.

## Props

```ts
type BadgeIntent   = "neutral" | "info" | "success" | "warning" | "error"
type BadgeEmphasis = "low" | "medium" | "high"
type BadgeSize     = "sm" | "md" | "lg"
type BadgeAppearance =
  | "gray" | "red" | "orange" | "amber" | "yellow" | "lime"
  | "green" | "emerald" | "teal" | "cyan" | "sky"
  | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  intent?: BadgeIntent      // default "neutral"
  appearance?: BadgeAppearance
  emphasis?: BadgeEmphasis  // default "low"
  size?: BadgeSize          // default "md"
  asChild?: boolean         // render as a custom element via Radix Slot
  icon?: React.ReactNode
  trailingIcon?: React.ReactNode
}
```

### Intent
`neutral` (default) · `info` · `success` · `warning` · `error`. Naming matches existing semantic tokens (`--color-text-{info,success,warning,error}`).

### Appearance
`gray` · `red` · `orange` · `amber` · `yellow` · `lime` · `green` · `emerald` · `teal` · `cyan` · `sky` · `blue` · `indigo` · `violet` · `purple` · `fuchsia` · `pink` · `rose`.

Use `intent` for semantic state and `appearance` for decorative/product taxonomy color. If both are provided, implementation must define clear precedence; current recommendation is that `appearance` controls visual color.

### Emphasis
- `low` (default) — subtle tinted background, intent-colored text.
- `medium` — muted background (one step stronger), intent-colored text.
- `high` — strong solid background, inverse (white) text.

### Size
- `sm` — height 20px, padding-x 6px, gap 4px, text 12px, icon 12px.
- `md` (default) — height 24px, padding-x 8px, gap 4px, text 12px, icon 14px.
- `lg` — height 28px, padding-x 10px, gap 6px, text 14px (`--text-md`), icon 16px.

## Examples

```tsx
<Badge intent="neutral" emphasis="low">Draft</Badge>
<Badge intent="success" emphasis="medium">Active</Badge>
<Badge intent="error" emphasis="high">Failed</Badge>
<Badge intent="info" icon={<DotIcon />}>New</Badge>
<Badge size="sm" intent="warning">Pending</Badge>
<Badge size="lg" appearance="violet">Premium</Badge>
```

## Color strategy

Badge has two color axes:

- **`intent`** — maps to MAXA's semantic state palette (`--color-bg-{intent}-{subtle,muted,strong}`, `--color-text-{intent-hue}`). Used for status: neutral, info, success, warning, error.
- **`appearance`** — maps to the non-semantic "semantic" hue palette in `semantic.css` (`--color-bg-{hue}-{subtle,muted,strong}` and `--color-text-{hue}`) for decorative/product taxonomy color across 18 hues. Shared with `Tag`.

If `appearance` is set, the component omits `data-intent` and emits `data-appearance` instead, so appearance controls the visual color. If only `intent` is set, `data-intent` is emitted.

Dark mode is automatic for low/medium emphasis: Badge consumes semantic tokens that carry `[data-theme="dark"]` overrides, plus explicit per-intent text overrides in `component-badge.css`. High-emphasis (solid) badges force `--color-base-white` text/icon in both themes so the inverse text never resolves to dark.

## Component tokens (Layer 3)

Defined in `packages/tokens/src/component-badge.css`. The element-level tokens (`--badge-bg`, `--badge-text`, `--badge-icon`, `--badge-border`) are remapped per `[data-intent][data-emphasis]` and per `[data-appearance][data-emphasis]` selectors:

```
--badge-bg, --badge-text, --badge-icon, --badge-border,
--badge-radius, --badge-font-family, --badge-font-weight,
--badge-size-{sm,md,lg}-{height,padding-x,gap,font,icon}
```

> Note: the foreground token is `--badge-text` (text) and `--badge-icon` (icon). There is no `--badge-fg` token — `text`/`icon` are set identically per variant but kept as two tokens.

Mapping rule per intent:
- low    → bg `--color-bg-{intent}-subtle`, text/icon `--color-{hue}-900` (e.g. `--color-blue-900` for info)
- medium → bg `--color-bg-{intent}-muted`,  text/icon `--color-{hue}-900`
- high   → bg `--color-bg-{intent}-strong`,  text/icon `--color-base-white`

(`neutral` uses `--color-bg-neutral-{subtle,muted,strong}` for bg, `--color-gray-900` text/icon for low/medium, `--color-base-white` for high.)

Mapping rule per appearance (18 hues × 3 emphasis):
- low    → bg `--color-bg-{hue}-subtle`, text/icon `--color-text-{hue}`
- medium → bg `--color-bg-{hue}-muted`,  text/icon `--color-text-{hue}`
- high   → bg `--color-bg-{hue}-strong`, text/icon `--color-base-white`

### Shared tokens
```css
--badge-radius:      var(--radius-full);
--badge-font-family: var(--font-body);
--badge-font-weight: var(--font-weight-medium);
```

## Accessibility

- Badge is decorative/informational text; no ARIA role is forced. If a badge conveys state not otherwise available to assistive tech, the **consumer** must provide an accessible label in surrounding content.
- Icons are `aria-hidden` — never rely on icon alone to convey meaning; include a text label.
- Color is never the sole signal: pair intent with the label text.

## Do / Don't

- Do use Badge for static status/count/metadata.
- Do keep labels short (1–2 words).
- Don't attach click handlers or use Badge as a button — compose a dedicated filter/control pattern instead.
- Don't make Badge removable — that is `Tag`.
- Don't merge Badge and Tag. They share anatomy but have different semantics.
- Don't introduce the foreign Figma palette; stay on MAXA semantic tokens.

## Deferred
- Dot-only / count-only variants.
- `border` styling per intent (currently transparent).
- Dedicated dark-mode Figma handoff if design wants values distinct from the automatic semantic overrides.
