# Token Naming — Research & Decisions

> **Status:** Research complete (April 2026)  
> **Goal:** Choose the best semantic token naming strategy for the MAXA Design System.

---

## Comparison of Leading Design Systems

### shadcn / Radix UI

- **Pattern:** flat names, for example `background`, `foreground`, `card`, `muted`, `destructive`
- **Pros:** simple and developer-readable
- **Cons:** too abstract; names like `muted` and `accent` do not say where the token should be used. An AI agent will not infer the usage context reliably.
- **Suffixes:** `-foreground` for text on top, `-muted` for subdued colors
- **Status naming:** `destructive` for danger

### GitHub Primer

- **Pattern:** `{property}-{role}-{emphasis}`, for example `bgColor-danger-emphasis`, `fgColor-success-muted`
- **Pros:** highly self-documenting and very useful for AI agents
- **Cons:** verbose; `bgColor` is redundant if the group already defines the context
- **Suffixes:** `-muted` for weak tints, `-emphasis` for saturated variants
- **Status naming:** `danger`, `success`, `attention`, `done`, `open`, `closed`

### Atlassian Design System

- **Pattern:** `color.text`, `color.bg`, `color.border` + modifiers
- **Pros:** names like `color.text-subtle` are very clear
- **Cons:** dot notation such as `color.text.success` maps poorly to CSS variables

### Material Design 3

- **Pattern:** `surface`, `on-surface`, `primary-container`, `on-error`
- **Pros:** the `on-*` pattern is excellent because every surface can have a matching foreground
- **Cons:** less familiar for web developers and not a direct Tailwind mapping

### Untitled UI (PRO VARIABLES v8.0)

- **Collections:** `_Primitives` (343), `1. Color modes` (273), `2. Radius`, `3. Spacing`, `4. Widths`, `5. Containers`, `6. Typography`
- **Color modes groups:** Text, Border, Foreground, Background, Effects, Component colors
- **Component colors:** Alpha (`alpha-white-10...100`, `alpha-black-10...100`), Utility (`utility-neutral-50...900`, `utility-brand-50...`)
- **Suffixes:** `solid` for fully opaque filled surfaces such as badges/buttons; `primary / secondary / tertiary` for hierarchy levels
- **Not used:** `-subtle` (Radix/shadcn naming), `-muted` (GitHub Primer naming)

---

## Key Insights

### Avoid

- Do not use `-subtle` as the only variant. That mixes Radix and Untitled UI concepts too loosely.
- Do not use `content-` instead of `text-`; it is less intuitive for developers and AI agents.
- Do not use slash notation for CSS token names such as `bg/overlay`; use hyphenated names in CSS such as `bg-overlay`.
- Do not copy a Tailwind-first structure. shadcn does that because it is Tailwind-first; MAXA is Design System-first.
- Do not store Tailwind colors in a separate collection; they are part of the primitive palette.

### Do

- Use the `text-` prefix. It is closer to CSS `color:` and clearer for AI agents than `content-`.
- Use `primary / secondary / tertiary` for neutral hierarchy levels, following the Untitled UI standard.
- Use `-subtle` for weak tints. It is widely understood among developers through Radix/shadcn.
- Use `-solid` for saturated filled surfaces, following Untitled UI patterns for buttons and badges.
- Avoid `-alt` and `_alt`; they add ambiguity.
- Make each token name read like documentation. `bg-error-subtle` immediately communicates background, error, weak tint.

### Why `-subtle` and `-solid` Work Together

| Suffix | Meaning | Example Usage |
|--------|---------|---------------|
| `-subtle` | Weak color tint, usually palette 50-100 | Banner background, hover highlight |
| no suffix | Main/default color | Text, icons |
| `-solid` | Fully filled saturated color | Filled badge, filled button |

### Why Tailwind Colors Are Not a Separate Collection

shadcn uses a separate "TailwindCSS" collection because it is **Tailwind-first**. Its system mirrors Tailwind values. MAXA is **Design System-first**; Tailwind is only the rendering/tooling layer. Tailwind colors are part of the primitive palette, not a separate token layer.

---

## Sources

- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming)
- [GitHub Primer Color Overview](https://primer.style/foundations/color/overview/)
- [Atlassian Design Tokens](https://atlassian.design/foundations/design-tokens/)
- [Material Design 3 Color Roles](https://m3.material.io/styles/color/roles)
- Untitled UI PRO VARIABLES v8.0, Figma Variables screenshots, April 2026
