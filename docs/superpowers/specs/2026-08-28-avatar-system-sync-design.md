# Avatar System Synchronization Design Contract

## Objective

Synchronize the user-updated Avatar and Avatar Label work across the MAXA Foundation Figma library, token artifacts, React package, canonical specs, agent knowledge, and public documentation. The result must make the current border and radius decisions explicit, publish Avatar Label as a supported component, and remove Avatar Group from recommended public usage without breaking existing consumers.

## Sources of Truth

- Figma file: `ODH3pmxkKyP8pAslgDb15s`
- Avatar component set: `818:774`
- Avatar Label component set: `867:374`
- Code and documentation: this repository
- Product navigation: the consuming screen supplies a profile URL; `/profile` is the confirmed MAXA profile route, not a value hard-coded by the component.

Figma is canonical for the current visual contract. The repository remains canonical for distributable token syntax, React APIs, tests, and agent-readable documentation.

## Avatar Token Contract

The Avatar body uses component-based tokens so the component can change independently while still resolving to shared semantic and foundation tokens:

| Component token | Value | Scope | Web syntax |
| --- | --- | --- | --- |
| `Avatar/surface/border` | `{Color modes/border/border-secondary}` | `STROKE_COLOR` | `var(--avatar-border)` |
| `Avatar/layout/border-width` | `1` | `STROKE_FLOAT` | `var(--avatar-border-width)` |
| `Avatar/layout/radius-circle` | `{Radius/radius-full}` | `CORNER_RADIUS` | `var(--avatar-radius)` |
| `Avatar/layout/radius-square` | `{Radius/radius-md}` | `CORNER_RADIUS` | `var(--avatar-radius-square)` |

Every Avatar `Container` receives an inside stroke bound to the border color token and a stroke weight bound to the border-width token. Rounded Avatars retain the full-radius alias and square Avatars retain the medium-radius alias.

Avatar Label inherits these decisions from its nested Avatar instance. It must not duplicate border or radius tokens.

## Avatar Visual API

The approved Figma library contains Image, Neutral, and Colored Avatar types in five sizes and two shapes. Colored variants use medium surfaces. The React component therefore defaults to the neutral presentation and documents medium as the approved colored fallback treatment.

The existing `strong` emphasis remains available as a compatibility API because removing it would be a breaking change. It is no longer presented as the default or recommended Figma-aligned treatment.

React must expose every colored appearance present in Figma: `amber`, `blue`, `cyan`, `emerald`, `fuchsia`, `green`, `indigo`, `lime`, `orange`, `pink`, `purple`, `red`, `rose`, `teal`, `violet`, and `yellow`.

## Avatar Label Component Contract

Avatar Label is a composition of one Avatar and a text stack:

- sizes: `sm`, `md`, `lg`, `xl`, matching 32, 40, 48, and 64 px Avatars;
- editable label;
- optional description;
- static display or profile link;
- the entire Avatar + text area is one interaction target when a destination is supplied.

The React API accepts an Avatar element, enforces the selected size on that element, and renders:

- a semantic `div` when `href` is absent;
- a semantic `a` when `href` is present.

The linked variant uses existing semantic tokens directly:

- default label: `--color-text-secondary`;
- hover label: `--color-text-link-hover` plus underline;
- active label: `--color-text-link-active` plus underline;
- focus-visible label: `--color-text-link`;
- focus ring: `--color-focus-ring`, 2 px wide with a 2 px offset;
- target radius: `--radius-sm`.

No Avatar Label component-based token layer is introduced. The interaction intentionally follows universal link and focus semantics.

## Avatar Group Compatibility Policy

Avatar Group is currently hidden in Figma and is not an active product need. It is removed from the public documentation catalog and marked deprecated in TypeScript, but its exports and behavior remain available for compatibility. Existing applications continue to compile; new usage is directed to individual Avatar or Avatar Label components.

## Documentation and Agent Discovery

The completed system must include:

- canonical `specs/components/avatar-label.md`;
- an updated Avatar spec describing border/radius tokens, Figma-aligned appearances, and Avatar Group deprecation;
- generated token reference and Figma import bundle;
- a public Avatar Label docs page and catalog entry;
- updated README component count and deployment links;
- current Avatar/Avatar Label status in `AGENT.md` and `.knowledge` files.

These artifacts are the fallback discovery path for MCP and agents because Code Connect is unavailable on the current Figma plan/seat.

## Validation

The work is complete when:

1. All 180 Avatar containers in Figma use the border color, border width, and correct shape-radius bindings.
2. All 20 Avatar Label variants inherit the updated nested Avatar without geometry regressions.
3. Local token JSON, CSS, import bundle, and generated reference agree with Figma.
4. Avatar defaults to neutral in React and supports the complete Figma appearance set.
5. Avatar Label passes rendering, sizing, link semantics, state styling, and ref/attribute tests.
6. Avatar Group remains exported but is absent from the public catalog and documented as deprecated.
7. Package tests, token audits, builds, accessibility checks, and visual regression pass.
8. GitHub, GitHub Pages, and Netlify serve the updated documentation.

