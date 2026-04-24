# Breakpoints — Foundation Spec

## Values

| Name | Value | When it starts |
|------|-------|---------------|
| `mobile` | 375px | Base / default (mobile-first) |
| `tablet` | 768px | Tablet portrait and up |
| `laptop` | 1024px | Small laptops, landscape tablet |
| `desktop` | 1280px | Standard desktop |
| `wide` | 1440px | Wide desktop / large monitor |
| `ultra` | 1680px | Ultra-wide |
| `max` | 1920px | Full HD and up |

## Strategy

MAXA uses **mobile-first** breakpoints. Write base styles for mobile, then override upward.

```css
/* ✅ Correct — mobile-first */
.element {
  padding: var(--spacing-xl);       /* mobile: 16px */
}
@media (min-width: 768px) {
  .element {
    padding: var(--spacing-3xl);    /* tablet+: 24px */
  }
}
@media (min-width: 1280px) {
  .element {
    padding: var(--spacing-4xl);    /* desktop+: 32px */
  }
}
```

## Responsive layout token mapping

Layout tokens use Desktop / Tablet / Mobile modes. Key responsive differences:

| Token | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| `Container/padding` | 16px | 24px | 32px |
| `Stack/section` | 48px | 64px | 80px |
| `Grid/gutter` | 16px | 20px | 24px |

Use these values when translating responsive layout tokens to CSS.

## Common breakpoint patterns

### Container max-width
Max content width is `1568px` across all breakpoints. Use this as `max-width` on the container, combined with `Container/padding` on the sides.

### Typography
Typography is separately responsive via the `Typography` Figma collection (Desktop / Tablet / Mobile). Apply font-size changes at the `tablet` (768px) and `desktop` (1280px) breakpoints.

## Source files

- Figma collection: `Breakpoints`
- JSON: `packages/tokens/figma/breakpoints.json`
