---
"@maxa/tokens": patch
---

Apply Igor's Figma table refinements. The dark neutral background ladder shifts one step
deeper (surface 950, subtle 900, muted 800, on-muted 700; strong stays 400), the Table
header background moves from `bg-neutral-on-muted` to `bg-neutral-muted`, and the header
text settles on `text-secondary` — which also resolves a pre-existing CSS/JSON divergence
where the CSS said `text-primary` while the Figma source said `text-tertiary`.
