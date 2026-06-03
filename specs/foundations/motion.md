# Motion Tokens — Foundation Spec

## Architecture

Two scales: **durations** (how long) and **easings** (the acceleration curve). Both are
mode-independent primitives defined in `@theme {}`. Components reference these tokens in
`transition` / `animation` declarations — never hardcode `ms` values or raw `cubic-bezier()`.

**Rule:** In code, use the CSS motion variables. Never hardcode duration or easing values.

## Duration Scale

| Token | Value | CSS variable | When to use |
|-------|-------|-------------|-------------|
| `duration-instant` | 50ms | `--duration-instant` | Near-immediate feedback (tap highlights) |
| `duration-fast` | 100ms | `--duration-fast` | Micro hover / state changes (color, opacity) |
| `duration-base` | 150ms | `--duration-base` | Standard interactive transitions (default) |
| `duration-slow` | 250ms | `--duration-slow` | Overlays, larger movement (popovers, sheets) |
| `duration-slower` | 400ms | `--duration-slower` | Large / expressive movement (modal entrance) |

## Easing Scale

| Token | Value | CSS variable | When to use |
|-------|-------|-------------|-------------|
| `easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | `--easing-standard` | Default for most transitions |
| `easing-emphasized` | `cubic-bezier(0.3, 0, 0, 1)` | `--easing-emphasized` | Emphasized / expressive motion |
| `easing-decelerate` | `cubic-bezier(0, 0, 0, 1)` | `--easing-decelerate` | Entering elements — decelerate to rest |

## Usage Guidelines

- **Hover / focus / pressed states** → `--duration-fast` (100ms) with `--easing-standard`.
- **Standard interactive transitions** (toggles, accordions, inline reveals) → `--duration-base`
  (150ms) with `--easing-standard`.
- **Overlays and larger movement** (dropdowns, popovers, tooltips, sheets) → `--duration-slow`
  (250ms). Use `--easing-decelerate` for entrance, `--easing-standard` for exit.
- **Large or expressive movement** (full modal/drawer entrance) → `--duration-slower` (400ms)
  with `--easing-emphasized`.
- **Instant feedback** → `--duration-instant` (50ms) only for the smallest acknowledgement cues.

Keep durations short. Most UI motion should land in the 100–250ms range; reserve `slower`
for deliberately expressive, large-surface transitions.

```css
.example {
  transition:
    background-color var(--duration-fast) var(--easing-standard),
    transform var(--duration-base) var(--easing-standard);
}
```

## Reduced Motion (global guard)

`packages/tokens/src/motion.css` ships a global `@media (prefers-reduced-motion: reduce)`
guard. When the OS "reduce motion" setting is on, it neutralizes all animation and transition
durations (down to `0.01ms`), forces a single animation iteration, and sets `scroll-behavior: auto`.

This honors WCAG 2.3.3. Because it operates on `animation-duration` / `transition-duration`
rather than removing the tokens, components keep their motion declarations intact — they simply
collapse to near-zero when the user prefers reduced motion. No per-component handling is needed.

## Common Mistakes to Avoid

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `transition: 200ms` | `transition: var(--duration-slow) var(--easing-standard)` |
| `transition-duration: 150ms` | `transition-duration: var(--duration-base)` |
| `cubic-bezier(0.4, 0, 0.2, 1)` | `var(--easing-standard)` |
| Per-component reduced-motion media query | Rely on the global guard in `motion.css` |

## Source files

- CSS (tokens): `packages/tokens/src/dimensions.css` (`@theme {}` — durations + easings)
- CSS (guard): `packages/tokens/src/motion.css` (`prefers-reduced-motion` global guard)
