# Design Card — Product Pattern Spec

A DesignCard is the thumbnail-first content card used in the MAXA dashboard and template galleries. A TemplateCard is its masonry-layout variant. Neither is a generic `<Card>` — they are product-specific compositions grounded in the MAXA content model.

There is no `<DesignCard>` or `<TemplateCard>` component exported from `@maxa/ui`. These are pattern compositions using existing tokens.

## Source Evidence

From `~/.claude/knowledge/maxa/ui-inventory.md`:

**Dashboard DesignCard:**
- Thumbnail image (aspect ratio ~4:3)
- Title (single line, semibold)
- Subtitle: `type · dimensions` (e.g., "Social Media · 1200×628px")
- Optional badges: "New" (blue), "Auto-Created" (neutral/gray)
- Optional AMP overlay icon (orange package icon, bottom-left of thumbnail)
- Hover state: card slightly raised shadow, heart icon appears top-right

**Template Masonry Card (Popular Templates page):**
- Variable aspect ratio images (Pinterest-style masonry)
- Title below image
- Category label (small, tertiary color)

Reference screenshots:
- `01-dashboard.png` (DesignCard grid)
- `10-templates-popular.png` (masonry TemplateCards)

## Anatomy — DesignCard

```
┌──────────────────────────┐
│                          │  ← thumbnail (aspect-ratio: 4/3, radius-xl on top)
│      [🏷 badge]          │  ← "New" badge top-left over thumbnail
│                   [♥ ]   │  ← heart on hover, top-right
│ [📦 AMP overlay]         │  ← optional AMP icon bottom-left
└──────────────────────────┘
│ Title                    │  --text-md, --font-weight-semibold
│ Social Media · 1200×628px│  --text-sm, --color-text-tertiary
│ [Auto-Created]           │  optional Badge, intent="neutral"
└──────────────────────────┘
```

## Anatomy — TemplateCard

```
┌──────────────────────────┐
│                          │  ← variable height image (masonry)
└──────────────────────────┘
│ Template name            │  --text-sm, --font-weight-medium
│ Social Media             │  --text-sm, --color-text-tertiary
└──────────────────────────┘
```

## Token Usage

| Element | Token |
|---------|-------|
| Card radius | `var(--radius-2xl)` on the card; thumbnail top corners `var(--radius-2xl)` |
| Rest shadow | `var(--shadow-sm)` |
| Hover shadow | `var(--shadow-md)` |
| Title | `var(--text-md)` + `var(--font-weight-semibold)` + `var(--color-text-primary)` |
| Subtitle | `var(--text-sm)` + `var(--color-text-tertiary)` |
| "New" badge | `<Badge intent="info" size="sm">` |
| "Auto-Created" badge | `<Badge intent="neutral" size="sm">` |
| Card background | `var(--color-bg-surface)` |
| Card border | `1px solid var(--color-border-secondary)` |
| Hover transition | `transition: box-shadow var(--duration-base) var(--easing-standard)` |

Zero new tokens needed — all values exist in the token system.

## DesignCard Code Sketch

```tsx
<article
  style={{
    borderRadius: "var(--radius-2xl)",
    overflow: "hidden",
    background: "var(--color-bg-surface)",
    border: "1px solid var(--color-border-secondary)",
    boxShadow: "var(--shadow-sm)",
    transition: "box-shadow var(--duration-base) var(--easing-standard)",
  }}
  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "var(--shadow-md)"}
  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "var(--shadow-sm)"}
>
  {/* Thumbnail */}
  <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "var(--color-bg-muted)" }}>
    <img src={thumbnail} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    {isNew && (
      <div style={{ position: "absolute", top: "8px", left: "8px" }}>
        <Badge intent="info" size="sm">New</Badge>
      </div>
    )}
  </div>

  {/* Meta */}
  <div style={{ padding: "12px 14px 14px" }}>
    <p style={{ margin: 0, fontSize: "var(--text-md)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)" }}>{title}</p>
    <p style={{ margin: "2px 0 0", fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)" }}>{subtitle}</p>
    {isAutoCreated && <Badge intent="neutral" size="sm" style={{ marginTop: "6px" }}>Auto-Created</Badge>}
  </div>
</article>
```

## Masonry Grid

TemplateCards use CSS `columns` for masonry layout — no JS library needed for static demos:

```css
.masonry-grid {
  columns: 3;
  gap: var(--spacing-4);  /* 16px */
}
.masonry-grid > * {
  break-inside: avoid;
  margin-bottom: var(--spacing-4);
}
```

## Anti-patterns

- Do not add `<DesignCard>` or `<TemplateCard>` to `@maxa/ui` — the content model is too MAXA-specific. Building a generic Card primitive risks producing wrong-abstraction code.
- Do not use `--radius-full` on card corners — use `--radius-2xl`.
- Do not hardcode `box-shadow: 0 4px 8px rgba(0,0,0,0.12)` — use `var(--shadow-sm)` / `var(--shadow-md)`.
- Do not add a generic `<Card>` and wrap DesignCard in it — one pattern, not two layers.
- "Auto-Created" label is informational, not actionable — Badge with `intent="neutral"`, no dismiss/click handler.

## Follow-up Patterns

- `PageHeader` — the header + FilterBar that precedes the card grid on dashboard/category screens
- `Sidebar` — the navigation that frames the card grid on dashboard
