# MAXA Design System — Current State

> Project note for Obsidian and local repository memory.  
> Captures the current agreed foundation-layer state before the next design-system changes.

## 1. General Position

- MAXA is **Design System-first**, not Tailwind-first.
- The source of truth for Figma token import lives in `packages/tokens/figma/`.
- `packages/tokens/figma/import-bundle.json` is treated as a generated build artifact, not as the hand-edited source of truth.
- All persistent documentation and project memory should be written in English.

## 2. Figma Collections

Current collection structure:

- `Primitives`
- `Color modes`
- `Spacing`
- `Radius`
- `Typography`
- `Layout`
- `Breakpoints`

Removed legacy layers:

- old `layout-*` token files
- old responsive typography split that was not aligned with the current modes
- separate `Containers` collection

## 3. Primitives

### Colors

Colors are grouped under one top-level primitive namespace:

- `Colors/Base/...`
- `Colors/Neutral/...`
- `Colors/Neutral (alpha)/...`
- `Colors/Brand/...`
- other hue groups

This follows the Untitled UI-style approach: one color primitive layer inside a single collection.

### Spacing

Spacing primitives live under:

- `Primitives/Spacing/...`

Spacing primitive names are readable and include the pixel value:

- `Spacing/0 (0px)`
- `Spacing/0․5 (2px)`
- `Spacing/1 (4px)`
- `Spacing/1․5 (6px)`
- `Spacing/4 (16px)`
- `Spacing/12 (48px)`

Important:

- Fractional steps use `․` instead of the ASCII dot because the Figma import flow conflicted with `0.5` and `1.5`.

## 4. Semantic Spacing

Semantic spacing lives as a separate layer:

- `spacing-none`
- `spacing-xxs`
- `spacing-xs`
- `spacing-sm`
- ...
- `spacing-11xl`

Semantic spacing aliases point to primitive spacing, for example:

- `spacing-xl -> {Primitives/Spacing/4 (16px)}`

## 5. Layout Methodology

Current accepted Figma methodology:

- `Primitives -> Spacing -> Layout`

Meaning:

- `Primitives` = raw spacing values and color primitives
- `Spacing` = universal semantic spacing scale
- `Layout` = designer-facing usage layer for daily Auto layout decisions

Implications:

- Designers do not work directly with primitive spacing for layout decisions.
- Layout decisions use the separate `Layout` collection.
- `Layout` aliases `Spacing`.

Important:

- `Spacing` is not replaced by `Layout`.
- `Layout` does not replace `Spacing`; it expresses usage intent.
- `Grid/margin` and `Container/padding` are semantically different tokens, even when their values temporarily match.

## 6. Layout Collection

The `Layout` collection uses modes:

- `Desktop`
- `Tablet`
- `Mobile`

Current responsive modes decision:

- `Layout` and `Typography` remain separate collections.
- Both collections use `Desktop / Tablet / Mobile` modes.
- Designers switch the `Layout` and `Typography` modes separately on a frame/page when needed.
- This is an accepted tradeoff at the current stage.

Why we are not merging them into one `Responsive` collection yet:

- Separate collections are clearer as token architecture.
- The structure is easier to synchronize with code.
- Developers can more easily distinguish layout decisions from the type scale.
- Merging `Layout + Typography` into `Responsive` remains a future option only if two manual mode switches become a real team pain point.

The collection uses group-based naming so Figma shows separate groups:

- `Stack/*`
- `Inline/*`
- `Container/*`
- `Grid/*`

Current `Layout` tokens:

- `Stack/tight`
- `Stack/text`
- `Stack/default`
- `Stack/group`
- `Stack/section`
- `Inline/tight`
- `Inline/default`
- `Inline/group`
- `Container/padding`
- `Container/max-width`
- `Grid/gutter`
- `Grid/margin`

Current working values:

| Token | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| `Stack/tight` | `spacing-xs` | `spacing-xs` | `spacing-xs` |
| `Stack/text` | `spacing-lg` | `spacing-lg` | `spacing-lg` |
| `Stack/default` | `spacing-xl` | `spacing-xl` | `spacing-xl` |
| `Stack/group` | `spacing-3xl` | `spacing-3xl` | `spacing-3xl` |
| `Stack/section` | `spacing-8xl` | `spacing-7xl` | `spacing-6xl` |
| `Inline/tight` | `spacing-md` | `spacing-md` | `spacing-md` |
| `Inline/default` | `spacing-lg` | `spacing-lg` | `spacing-lg` |
| `Inline/group` | `spacing-xl` | `spacing-xl` | `spacing-xl` |
| `Container/padding` | `spacing-4xl` | `spacing-3xl` | `spacing-xl` |
| `Container/max-width` | `1568` | `1568` | `1568` |
| `Grid/gutter` | `spacing-3xl` | `spacing-2xl` | `spacing-xl` |
| `Grid/margin` | `Container/padding` | `Container/padding` | `Container/padding` |

These values are accepted as the current working state.

A separate pass over real layouts is expected later. Mapping may be adjusted without changing the methodology.

## 7. Colors / Semantic

The semantic color layer is named:

- `Color modes`

Current modes:

- `Light`
- `Dark`

Semantic colors alias primitive colors from `Primitives/Colors/...`.

Current brand surface decision:

- `bg/brand-solid` must not automatically imply white text on top.
- Text on brand solid surfaces uses a separate foreground token:
  - `text/on-brand`
- Current value:
  - Light: `text/on-brand -> Colors.Neutral.950`
  - Dark: `text/on-brand -> Colors.Neutral.950`

Reason:

- The current MAXA teal is bright enough that white text on `bg/brand-solid` is low contrast.
- The approach follows paired surface/foreground token logic from shadcn-like systems.

Current important semantic values:

- Light `text/primary -> Colors.Neutral.950`
- Light `text/secondary -> Colors.Neutral.800`
- Light `text/tertiary -> Colors.Neutral.600`
- Light `bg/brand-solid -> Colors.Brand.500`
- Dark `text/primary -> Colors.Neutral.100`
- Dark `text/secondary -> Colors.Neutral.200`
- Dark `text/tertiary -> Colors.Neutral.500`
- Dark `bg/brand-solid -> Colors.Brand.600`

## 8. Radius

Current radius scale:

- `radius-none = 0`
- `radius-xxs = 2`
- `radius-xs = 4`
- `radius-sm = 6`
- `radius-md = 8`
- `radius-lg = 10`
- `radius-xl = 12`
- `radius-2xl = 16`
- `radius-3xl = 20`
- `radius-4xl = 24`
- `radius-full = 9999`

## 9. Breakpoints

Current breakpoint names:

- `mobile = 375`
- `tablet = 768`
- `laptop = 1024`
- `desktop = 1280`
- `wide = 1440`
- `ultra = 1680`
- `max = 1920`

Some descriptions include legacy aliases such as:

- `Legacy alias: lg.`

## 10. Typography

### Font Family

Current decision:

- `Font family/body = Montserrat`
- `Font family/mono = Roboto Mono`

Important:

- Display font family tokens are intentionally not used for now.

### Typography Roles

Current agreed structure:

- `heading-2xl`
- `heading-xl`
- `heading-lg`
- `heading-md`
- `heading-sm`
- `heading-xs`
- `text-lg`
- `text-md`
- `text-sm`
- `caption-sm`
- `caption-xs`

### Typography Sizes

Current desktop values:

- `heading-2xl = 40`
- `heading-xl = 32`
- `heading-lg = 26`
- `heading-md = 22`
- `heading-sm = 18`
- `heading-xs = 16`
- `text-lg = 16`
- `text-md = 14`
- `text-sm = 12`
- `caption-sm = 10`
- `caption-xs = 8`

### Typography Line Heights

Current desktop values:

- `heading-2xl = 48`
- `heading-xl = 40`
- `heading-lg = 34`
- `heading-md = 30`
- `heading-sm = 26`
- `heading-xs = 24`
- `text-lg = 24`
- `text-md = 20`
- `text-sm = 18`
- `caption-sm = 16`
- `caption-xs = 12`

### Naming Decisions

- For the SaaS app foundation, we moved away from `display`.
- `label` is not a foundation role for now.
- `label` is closer to the component usage layer.

## 11. Figma Import Plugin

The local Figma plugin projects live in:

- `.knowledge/Figma Plugins/`

Current importer plugin lives in:

- `.knowledge/Figma Plugins/MAXA Token Importer/`

Current plugin state:

- version: `MAXA Token Importer v6`
- can load the latest pushed `import-bundle.json` from GitHub Raw via `Load latest from GitHub`
- can import `import-bundle.json`
- supports drag-and-drop:
  - `import-bundle.json`
  - or `manifest.json` + referenced token files
- shows import progress
- autoscrolls the log to the latest entry

Current migration plugin project:

- `.knowledge/Figma Plugins/MAXA Button Migration/`
- version: `MAXA Button Migration v1`
- current scope: analyze AND apply Component-based Token variables to legacy Button components
- binds all 13 token roles: surface, border, label color, leading/trailing icon color, height, padding-x, gap, radius, fontSize, lineHeight, fontStyle, fontFamily
- supports COMPONENT and COMPONENT_SET selections
- requires MAXA Component-based Tokens published as Team Library in the target Figma file
- full technical notes in `.knowledge/Button Migration Plugin — Phase 1.md`

Fast local workflow for iterations:

1. Run `pnpm figma:bundle` from the repo root.
2. In the plugin, click `Choose files` or drag `packages/tokens/figma/import-bundle.json`.
3. Click `Import tokens + styles`.

Published workflow for shared/stable imports:

1. Run `pnpm figma:bundle` from the repo root.
2. Commit and push changes to `main`.
3. In the Figma plugin, click `Load latest from GitHub`.
4. Click `Import tokens + styles`.

Fallback:

- If GitHub Raw is unavailable, import the fresh `packages/tokens/figma/import-bundle.json` through drag-and-drop or paste.

## 12. Not Implemented Yet

Currently not implemented, only discussed or intentionally deferred:

- client-specific typography modes
- more precise calibration of `Layout` values against real layouts
- possible mapping refinements for `Stack/tight`, `Stack/group`, and `Grid/gutter`

Responsive typography modes are already implemented.

## 13. Basic Tokens Components

Current status: draft / not approved yet.

Important:

- The exact Basic Tokens component set has not been decided yet.
- `packages/ui/src/base-tokens.tsx` currently contains a first exploratory React implementation.
- This implementation should be treated as a proposal for discussion, not as a final API.
- Do not build docs preview pages for Basic Tokens until the component direction is decided.

Current draft exports from `@maxa/ui`:

- `Box`
- `Stack`
- `Inline`
- `Text`
- `Heading`
- `Surface`
- `TokenSwatch`

Purpose:

- explore approved React primitives on top of MAXA CSS variables
- clarify whether Basic Tokens should mean documentation components, internal React primitives, or both
- keep spacing, radius, color, and typography usage tied to named tokens if this direction is accepted

Current docs app state:

- Basic Tokens docs preview is intentionally paused.
- `apps/docs/app/page.tsx` should remain neutral until the component direction is decided.

Validation:

- `pnpm --filter @maxa/ui test`
- `pnpm --filter @maxa/ui typecheck`
- `pnpm --filter @maxa/ui lint`
- `pnpm --filter @maxa/ui build`
- `pnpm --filter @maxa/docs typecheck`
- `pnpm --filter @maxa/docs lint`

## 14. Component-based Tokens

Current status: direction approved, implementation not started.

Component-based Tokens are the next design-system layer.

Layer order:

1. foundation tokens
2. `Component-based Tokens`
3. Figma components
4. React components
5. documentation/catalog

Important:

- Component-based Tokens are not React primitives.
- Do not treat `Box`, `Stack`, `Inline`, `Text`, `Heading`, `Surface`, or `TokenSwatch` as Component-based Tokens.
- Do not build React components or docs preview pages until Component-based Tokens are agreed.
- Full working notes live in `.knowledge/Component-based Tokens.md`.

Phase 1 Component-based Tokens:

- `Button`
- `Input`
- `Badge`
- `Alert`

`Card` is intentionally excluded because MAXA does not currently have an approved Card component.

Naming direction:

- Figma collection: `Component-based Tokens`
- Figma paths use slash grouping, for example `Button/primary/bg-hover`.
- Component group names use PascalCase, for example `Button`.
- Token roles use lowercase, for example `primary`, `bg`, `text`, `border`, `size`, `md`.
- Hyphens are used inside one segment for state or axis, for example `bg-hover`, `padding-x`.
- Default state has no `default` suffix.
- CSS projection uses lowercase hyphenated names, for example `--button-primary-bg-hover`.

Current Button direction:

- recommended variants: `primary`, `secondary`, `outline`, `ghost`, `link`, `success`, `danger`
- recommended sizes: `sm`, `md`, `lg`
- recommended states: default, `hover`, `active`, `disabled`, `focus`
- `primary` must follow blue `action/primary`, not teal `action/brand`
- `secondary` is a filled neutral button using `action/neutral`; do not render it as a white outlined button
- `outline` is the bordered neutral button using `bg/secondary` and `border/primary`
- `success` should follow `action/positive`
- `danger` should follow `action/negative`
- Button disabled uses `Button/disabled/opacity = 50`
- composite form controls may use explicit disabled surface/text/border tokens instead of opacity
- focus starts with `border-focus`; effect/ring tokens are deferred until the system has an Effects layer
- `ghost` uses transparent base/border and neutral subtle hover/active
- `link` stays transparent and uses `action/primary` for text
- Button sizes include text, line-height, weight, icon-size, and icon-only square size tokens
- Button v1 source files are `component-button-light.json` and `component-button-dark.json`
- Figma component structure should be split by semantic family instead of one oversized Button set
- current preferred Figma structure:
  - `Buttons/Button`
  - `Buttons/Button destructive`
  - `Buttons/Icon button`
  - `Buttons/Button success` only if product usage proves it is systemic
  - `Buttons/Button close` only if it needs dedicated behavior/layout rules
- current preferred base properties for `Buttons/Button`:
  - `variant = primary | secondary | outline | ghost | link`
  - `size = sm | md | lg`
  - `state = default | hover | active | focus | disabled | loading`
  - `icon-leading = true | false`
  - `icon-trailing = true | false`
- `Buttons/Button` always assumes a text label
- no `label` toggle should exist in the base Button set
- if there is no label, use `Buttons/Icon button`
- `dropdown` is intentionally excluded from the initial Button foundation and can be added later as a separate semantic pattern

Deferred Button decisions:

- whether filled status buttons need dedicated foreground tokens such as `text/on-primary`, `text/on-success`, `text/on-danger`
- whether focus ring/elevation belongs in a future Effects collection
- whether Button needs additional variants after real Figma component usage

## 15. Project Narrative

Short English explanation for team communication:

> I started this because we need one shared language between Figma, code, and AI.
>
> Right now, the same things like spacing, colors, typography, and layout can be understood a bit differently by designers and developers. I want to turn these decisions into reusable tokens, so we do not solve the same problems again and again.
>
> This is not only about Figma. MAXA UI is planned as an installable package built around Tailwind, TypeScript, and React.
>
> So the same system we use in design should also be easy for developers to install and use in real projects. The React components I prepare will also be documented on a separate site and available in the repository, so developers do not need to recreate components in their own way, like they usually do. They can take the approved version and use it as we intended.
>
> I am also preparing instructions for AI agents, so AI can understand our system and build with our components instead of creating random patterns. This is a problem I currently run into regularly.
>
> This should help us work faster, keep things more consistent, and reduce the gap between design and code.
>
> Later, I will add examples, explanations, and visual guides, so everyone can understand how and where to use tokens, components, and patterns.
>
> For me this is not just a cleanup. It is the foundation for how we will design and build MAXA UI going forward.

## 16. Next Conversation Starting Point

Continue the next chat from **Component-based Tokens / Button**.

Goal for the next stage:

- validate and import Button v1 Component-based Tokens into Figma
- do not create React components or docs/catalog until the Figma component-token layer is validated
- keep React components and docs/catalog paused until Component-based Tokens are approved
- keep Figma variables, React components, Tailwind tokens, documentation, and AI-agent instructions aligned
- reduce the design/code gap by giving developers approved components instead of asking them to recreate UI from interpretation
